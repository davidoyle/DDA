import { getStripePublishableKey, getPriceIdOrThrow, isStripeConfigured } from './config';
import { trackEvent } from '@/lib/analytics';

type StripeRedirectResult = { error?: { message?: string } };
type StripeClient = { redirectToCheckout: (options: { sessionId: string }) => Promise<StripeRedirectResult> };

declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeClient;
  }
}

export class CheckoutError extends Error {
  code: string;
  userFriendlyMessage: string;

  constructor(message: string, code: string, userFriendlyMessage: string) {
    super(message);
    this.name = 'CheckoutError';
    this.code = code;
    this.userFriendlyMessage = userFriendlyMessage;
  }
}

async function loadStripeClient(): Promise<StripeClient | null> {
  if (typeof window === 'undefined') return null;

  if (!window.Stripe) {
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector('script[data-stripe-js="true"]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Failed to load Stripe.js')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.dataset.stripeJs = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Stripe.js'));
      document.head.appendChild(script);
    });
  }

  if (!window.Stripe) return null;
  return window.Stripe(getStripePublishableKey());
}

export interface CheckoutOptions {
  plan: 'pro' | 'enterprise';
  interval: 'monthly' | 'annual';
  returnTo?: 'diagnostics' | 'dashboard';
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export async function redirectToCheckout(options: CheckoutOptions) {
  const {
    plan,
    interval,
    returnTo = 'diagnostics',
    customerEmail,
    metadata = {},
  } = options;

  try {
    if (!isStripeConfigured()) {
      throw new CheckoutError(
        'Stripe not configured',
        'CONFIG_ERROR',
        'Payment system is being set up. Please contact us directly at hello@dda.ca',
      );
    }

    const priceId = getPriceIdOrThrow(plan, interval);

    trackEvent('checkout_initiated', {
      plan,
      interval,
      price_id: priceId,
      ...metadata,
    });

    const stripe = await loadStripeClient();
    if (!stripe) {
      throw new CheckoutError(
        'Stripe failed to load',
        'STRIPE_LOAD_ERROR',
        'Unable to load payment system. Please refresh the page or contact support.',
      );
    }

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        returnTo,
        customerEmail,
        metadata: { plan, interval, ...metadata },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new CheckoutError(
        error.message || 'Failed to create checkout session',
        'SESSION_CREATION_ERROR',
        'Unable to start checkout. Please try again or contact support.',
      );
    }

    const { sessionId } = await response.json();

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw new CheckoutError(
        error.message || 'Checkout redirect failed',
        'REDIRECT_ERROR',
        'Unable to complete checkout. Please try again.',
      );
    }
  } catch (err) {
    if (err instanceof CheckoutError) {
      trackEvent('checkout_error', {
        error_code: err.code,
        error_message: err.message,
        plan,
        interval,
      });
      throw err;
    }

    trackEvent('checkout_error', {
      error_code: 'UNKNOWN',
      error_message: String(err),
      plan,
      interval,
    });

    throw new CheckoutError(
      String(err),
      'UNKNOWN_ERROR',
      'An unexpected error occurred. Please contact support at hello@dda.ca',
    );
  }
}
