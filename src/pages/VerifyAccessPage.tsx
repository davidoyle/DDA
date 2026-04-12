import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

type VerifyState = 'loading' | 'invalid' | 'expired' | 'error';

export default function VerifyAccessPage() {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState<VerifyState>('loading');
  const navigate = useNavigate();
  const { refreshSession } = useAccess();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setState('invalid');
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch('/api/auth/magic-link/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          await refreshSession();
          navigate('/diagnostics', { replace: true });
          return;
        }

        if (response.status === 410) {
          setState('expired');
          return;
        }

        setState('invalid');
      } catch {
        setState('error');
      }
    };

    void verify();
  }, [navigate, refreshSession, searchParams]);

  if (state === 'loading') {
    return <div className="px-6 py-16">Verifying your access...</div>;
  }

  const message = state === 'expired'
    ? 'Access link has expired. Please contact support.'
    : state === 'error'
      ? 'Unable to verify access right now. Please try again.'
      : 'Invalid access link';

  return (
    <div className="px-6 py-16 space-y-3">
      <h1 className="headline-md">Access Error</h1>
      <p>{message}</p>
      <a className="btn-primary" href="/contact">Contact Support</a>
    </div>
  );
}
