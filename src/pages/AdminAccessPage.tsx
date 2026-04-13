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
  const { hasAdminAccess } = useAccess();

  if (!hasAdminAccess) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="headline-md text-white">DDA Admin Tool Access</h1>
      <p className="text-sm text-slate-300">
        This page is only available to password-authenticated admin sessions validated server-side.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.href} className="rounded-lg border border-slate-700 bg-slate-900 p-4 space-y-3">
            <h2 className="headline-sm text-white">{tool.name}</h2>
            <p className="text-sm text-slate-300">{tool.description}</p>
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
