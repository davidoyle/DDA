import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

const tools = [
  { name: 'PST Diagnostic', description: 'Quick impact calc', href: '/diagnostics/pst-diagnostic' },
  { name: 'WorkSafe Repricing', description: 'Rate change modeling', href: '/diagnostics/worksafe-repricing' },
  { name: 'Experience Rating', description: 'Optimize classification', href: '/diagnostics/experience-rating' },
  { name: 'Province Comparator', description: 'Compare jurisdictions', href: '/diagnostics/province-comparator' },
  { name: 'Suppression Audit', description: 'Claim management', href: '/diagnostics/suppression-audit' },
  { name: 'Mental Health', description: 'Workforce forecasting', href: '/diagnostics/mental-health-forecaster' },
  { name: 'Surplus Alert', description: 'Premium tracking', href: '/diagnostics/surplus-alert' },
  { name: 'BC Decarbonization', description: 'Carbon modeling', href: '/diagnostics/bc-decarbonization-model' },
  { name: 'Executive Risk Brief', description: 'Leadership briefing', href: '/diagnostics/executive-risk-brief' },
];

export default function AdminAccessPage() {
  const { hasAdminAccess, isAdminModeActive, refreshAccess } = useAccess();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      await refreshAccess();
    } catch {
      setError('Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!hasAdminAccess) {
    return (
      <div className="px-6 lg:px-16 py-12 max-w-xl space-y-4">
        <h1 className="headline-md">Admin Access</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Enter admin password to enable internal tool access.</p>
        <input className="w-full rounded-md border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn-primary" onClick={submit} disabled={loading || !password}>{loading ? 'Checking...' : 'Enter Admin Mode'}</button>
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }

  if (!isAdminModeActive) {
    return <Navigate to="/diagnostics" replace />;
  }

  return (
    <div className="px-6 lg:px-16 py-12 space-y-6">
      <h1 className="headline-md">DDA Admin Tool Access</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.href} className="card space-y-3">
            <h2 className="headline-sm">{tool.name}</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tool.description}</p>
            <div className="flex gap-2">
              <Link to={tool.href} className="btn-primary">Launch Tool</Link>
              <a href={tool.href} target="_blank" rel="noreferrer" className="btn-secondary">Open in New Tab</a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
