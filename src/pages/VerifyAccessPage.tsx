import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

type ParsedToken =
  | { state: 'ok'; email: string; plan: 'free' | 'pro' | 'enterprise' }
  | { state: 'missing' | 'invalid' | 'expired' };

function parseToken(token: string | null): ParsedToken {
  if (!token) return { state: 'missing' };

  try {
    const decoded = atob(token);
    const [email, plan, expiresAt] = decoded.split(':');

    if (!expiresAt || Date.now() > Number.parseInt(expiresAt, 10)) {
      return { state: 'expired' };
    }

    const normalizedPlan = (plan === 'enterprise' ? 'enterprise' : plan === 'pro' ? 'pro' : 'free');
    return { state: 'ok', email: email || '', plan: normalizedPlan };
  } catch {
    return { state: 'invalid' };
  }
}

export default function VerifyAccessPage() {
  const [searchParams] = useSearchParams();
  const parsed = useMemo(() => parseToken(searchParams.get('token')), [searchParams]);
  const { setPlanTier } = useAccess();
  const navigate = useNavigate();

  useEffect(() => {
    if (parsed.state !== 'ok') return;
    setPlanTier(parsed.plan);
    localStorage.setItem('dda_access_email', parsed.email);
    localStorage.setItem('dda_access_granted', Date.now().toString());
    localStorage.setItem('dda_session', JSON.stringify({
      sessionToken: crypto.randomUUID(),
      email: parsed.email,
      orgId: parsed.email.split('@')[1] || 'default-org',
      plan: parsed.plan,
      updatedAt: Date.now(),
    }));
    navigate('/diagnostics?access=granted');
  }, [parsed, setPlanTier, navigate]);

  if (parsed.state === 'ok') {
    return <div className="px-6 py-16">Verifying your access...</div>;
  }

  const message = parsed.state === 'expired'
    ? 'Access link has expired. Please contact support.'
    : 'Invalid access link';

  return (
    <div className="px-6 py-16 space-y-3">
      <h1 className="headline-md">Access Error</h1>
      <p>{message}</p>
      <a className="btn-primary" href="/contact">Contact Support</a>
    </div>
  );
}
