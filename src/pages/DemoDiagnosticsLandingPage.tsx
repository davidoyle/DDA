import { Link } from 'react-router-dom';

const tools = [
  ['PST Tool', '/diagnostics/demo/pst-diagnostic'],
  ['WorkSafeBC', '/diagnostics/demo/worksafe-repricing'],
  ['Comparator', '/diagnostics/demo/province-comparator'],
  ['Rating', '/diagnostics/demo/experience-rating'],
  ['Audit', '/diagnostics/demo/suppression-audit'],
  ['Mental Health', '/diagnostics/demo/mental-health-forecaster'],
  ['Surplus Alert', '/diagnostics/demo/surplus-alert'],
  ['BC Decarbonization', '/diagnostics/demo/bc-decarbonization-model'],
  ['Executive Brief', '/diagnostics/demo/executive-risk-brief'],
] as const;

export default function DemoDiagnosticsLandingPage() {
  return (
    <div className="px-6 lg:px-16 py-12 space-y-6">
      <h1 className="headline-md">Try Our Diagnostic Tools (Demo Mode)</h1>
      <p className="max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
        Explore how our tools work with pre-loaded demo data. Subscribe to unlock custom inputs and full features.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {tools.map(([label, href]) => (
          <article key={href} className="card space-y-3">
            <h2 className="headline-sm">{label}</h2>
            <Link to={href} className="btn-primary">Try Demo</Link>
          </article>
        ))}
      </div>
      <div className="card">
        <p className="font-medium mb-2">What you can&apos;t do in demo mode:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Enter fully custom data</li>
          <li>Export results</li>
          <li>Save scenarios</li>
          <li>Access full methodology</li>
        </ul>
        <div className="mt-4 flex gap-3">
          <Link to="/diagnostics/subscribe" className="btn-primary">View Pricing</Link>
          <Link to="/contact" className="btn-secondary">Contact Sales</Link>
        </div>
      </div>
    </div>
  );
}
