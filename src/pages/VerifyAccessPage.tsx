import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

export default function VerifyAccessPage() {
  const [searchParams] = useSearchParams();
  const { refreshAccess } = useAccess();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      const response = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        navigate('/login?error=invalid_token', { replace: true });
        return;
      }

      await refreshAccess();
      navigate('/diagnostics', { replace: true });
    };

    void run();
  }, [navigate, refreshAccess, token]);

  return <div className="px-6 py-16">Verifying your access…</div>;
}
