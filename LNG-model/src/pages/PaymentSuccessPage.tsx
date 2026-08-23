import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const { canAccessDiagnostics, refreshSession } = useAccess();

  const plan = searchParams.get('plan');
  const interval = searchParams.get('interval');
  const sessionId = searchParams.get('session_id');

  const planLabel = useMemo(() => {
    if (plan === 'enterprise') return 'Enterprise';
    if (plan === 'pro') return 'Pro';
    return 'selected';
  }, [plan]);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession, sessionId]);

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[900px] mx-auto space-y-6">
        <h1 className="headline-md">Payment successful</h1>
        <div className="card space-y-3">
          <p>
            Thanks for subscribing to the {planLabel} plan
            {interval ? ` (${interval})` : ''}.
          </p>
          <p>Your access is being activated now.</p>
          {canAccessDiagnostics ? (
            <Link className="btn-primary inline-flex" to="/dashboard">
              Go to dashboard
            </Link>
          ) : (
            <p className="text-sm">
              If access is not available in a few moments, refresh this page or{' '}
              <Link className="underline" to="/contact?context=payment_success">
                contact support
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
