import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckoutErrorBoundary } from '@/components/CheckoutErrorBoundary';
import { redirectToCheckout, CheckoutError } from '@/lib/stripe/checkout';

function SubscribeContent() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cancelled = searchParams.get('checkout') === 'cancelled';
  const expired = searchParams.get('sub') === 'expired';

  const handleSubscribe = async (plan: 'pro' | 'enterprise', interval: 'monthly' | 'annual') => {
    setLoading(`${plan}_${interval}`);
    setError(null);

    try {
      await redirectToCheckout({ plan, interval });
    } catch (err) {
      if (err instanceof CheckoutError) {
        setError(err.userFriendlyMessage);
      } else {
        setError('Unable to start checkout. Please try again or contact support.');
      }
      setLoading(null);
    }
  };

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[900px] mx-auto space-y-6">
        <h1 className="headline-md">Subscribe to Diagnostic Tools</h1>

        {cancelled && <div className="card">Checkout was cancelled. You can try again or contact us for assistance.</div>}
        {expired && <div className="card">Your subscription has expired. Please renew to regain access.</div>}

        {error && (
          <div className="card">
            {error}
            <br />
            <a href="/contact?context=payment_error">Contact Support</a>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card space-y-3">
            <h2 className="headline-sm">Pro Plan</h2>
            <p>For individual consultants and small firms.</p>
            <button className="btn-primary" onClick={() => handleSubscribe('pro', 'monthly')} disabled={loading !== null}>
              {loading === 'pro_monthly' ? 'Processing...' : '$XX/mo'}
            </button>
            <button className="btn-secondary" onClick={() => handleSubscribe('pro', 'annual')} disabled={loading !== null}>
              {loading === 'pro_annual' ? 'Processing...' : '$XX/yr (2 months free)'}
            </button>
          </div>

          <div className="card space-y-3 border-2 border-[#6FC3D0]">
            <h2 className="headline-sm">Enterprise Plan</h2>
            <p>For organizations and coalition members.</p>
            <button className="btn-primary" onClick={() => handleSubscribe('enterprise', 'monthly')} disabled={loading !== null}>
              {loading === 'enterprise_monthly' ? 'Processing...' : 'Contact Sales'}
            </button>
            <button className="btn-secondary" onClick={() => handleSubscribe('enterprise', 'annual')} disabled={loading !== null}>
              {loading === 'enterprise_annual' ? 'Processing...' : 'Annual Billing'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DiagnosticsSubscribePage() {
  return (
    <CheckoutErrorBoundary>
      <SubscribeContent />
    </CheckoutErrorBoundary>
  );
}
