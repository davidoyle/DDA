import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { refreshSession } = useAccess();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError('Invalid credentials.');
        return;
      }

      await refreshSession();
      navigate('/admin-access', { replace: true });
    } catch {
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-16 max-w-lg mx-auto space-y-6">
      <h1 className="headline-md">Admin sign in</h1>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        Sign in with your admin credentials. SSO providers can be connected at <code>/api/auth/sso/:provider</code>.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
