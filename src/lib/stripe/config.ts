export function getStripePublishableKey(): string {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!key) {
    const isDev = import.meta.env.DEV;
    if (isDev) {
      console.warn('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY - using test fallback');
      return 'pk_test_fallback_key_only_for_development';
    }
    throw new Error('Stripe publishable key is not configured');
  }

  return key;
}

export const STRIPE_PRICES = {
  pro_monthly: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY || import.meta.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || 'price_pro_monthly_placeholder',
  pro_annual: import.meta.env.VITE_STRIPE_PRICE_PRO_ANNUAL || import.meta.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_ANNUAL || 'price_pro_annual_placeholder',
  enterprise_monthly: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_MONTHLY || import.meta.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY || 'price_enterprise_monthly_placeholder',
  enterprise_annual: import.meta.env.VITE_STRIPE_PRICE_ENTERPRISE_ANNUAL || import.meta.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_ANNUAL || 'price_enterprise_annual_placeholder',
} as const;

export function validatePriceId(priceId: string): boolean {
  const isValid = Object.values(STRIPE_PRICES).includes(priceId as (typeof STRIPE_PRICES)[keyof typeof STRIPE_PRICES]);
  if (!isValid && !priceId.includes('placeholder')) {
    console.error(`Invalid price ID: ${priceId}`);
  }
  return isValid;
}

export function getPriceIdOrThrow(plan: 'pro' | 'enterprise', interval: 'monthly' | 'annual'): string {
  const key = `${plan}_${interval}` as keyof typeof STRIPE_PRICES;
  const priceId = STRIPE_PRICES[key];

  if (priceId.includes('placeholder')) {
    throw new Error(
      `Stripe price ID not configured for ${plan} ${interval}. Please set environment variable NEXT_PUBLIC_STRIPE_PRICE_${key.toUpperCase()}`,
    );
  }

  return priceId;
}

export const isStripeConfigured = (): boolean => {
  const hasPublishableKey = !!(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const hasRealPriceIds = !Object.values(STRIPE_PRICES).some((id) => id.includes('placeholder'));
  return hasPublishableKey && hasRealPriceIds;
};
