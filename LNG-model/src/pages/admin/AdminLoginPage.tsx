import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';
import { getAdminSetupStatus, loginAdmin } from '@/lib/api/auth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { refreshSession } = useAccess();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getAdminSetupStatus();
        if (status.setupRequired) {
          navigate('/admin/setup', { replace: true });
        }
      } catch {
        // Ignore and allow login attempt.
      }
    };

    void checkStatus();
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await loginAdmin({ email, password });
      if (response.status === 403) {
        navigate('/admin/setup', { replace: true });
        return;
      }

      if (!response.ok) {
        setError('Invalid credentials.');
        return;
      }

      await refreshSession();
      navigate('/admin', { replace: true });
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <h1 className="headline-md text-white">Admin Login</h1>
      <p className="text-sm text-slate-300">Sign in with your admin email and password.</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <label className="block space-y-1">
          <span className="text-sm text-slate-200">Email</span>
          <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label className="block space-y-1">
          <span className="text-sm text-slate-200">Password</span>
          <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-sm text-slate-300">
        Need user access instead? <Link to="/access" className="underline">Go to magic-link access</Link>.
      </p>
    </section>
  );
}
