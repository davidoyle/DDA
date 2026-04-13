import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';
import { getAdminSetupStatus, setupFirstAdmin } from '@/lib/api/auth';

export default function AdminSetupPage() {
  const navigate = useNavigate();
  const { refreshSession } = useAccess();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getAdminSetupStatus();
        if (!status.setupRequired) {
          navigate('/admin/login', { replace: true });
          return;
        }
      } catch {
        setError('Unable to verify setup status right now.');
      } finally {
        setLoading(false);
      }
    };

    void checkStatus();
  }, [navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await setupFirstAdmin({ email, password, confirmPassword });
      if (response.status === 409) {
        navigate('/admin/login', { replace: true });
        return;
      }

      if (!response.ok) {
        setError('Invalid setup details. Please verify your email and password.');
        return;
      }

      await refreshSession();
      navigate('/admin', { replace: true });
    } catch {
      setError('Unable to create admin account right now.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Checking setup status…</div>;
  }

  return (
    <section className="space-y-6">
      <h1 className="headline-md text-white">Initial Admin Setup</h1>
      <p className="text-sm text-slate-300">Create the first admin account for this environment. This can only be done once.</p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <label className="block space-y-1">
          <span className="text-sm text-slate-200">Admin email</span>
          <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <label className="block space-y-1">
          <span className="text-sm text-slate-200">Password</span>
          <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} />
        </label>

        <label className="block space-y-1">
          <span className="text-sm text-slate-200">Confirm password</span>
          <input className="w-full rounded border border-slate-600 bg-slate-900 px-3 py-2" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required minLength={8} />
        </label>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Creating admin…' : 'Create admin account'}
        </button>
      </form>
    </section>
  );
}
