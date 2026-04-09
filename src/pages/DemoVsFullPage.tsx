import { Link } from 'react-router-dom';

const rows = [
  ['Access all tools', '✓', '✓', '✓'],
  ['Custom data entry', '✗', '✓', '✓'],
  ['Export results', '✗', '✓', '✓'],
  ['Save scenarios', '✗', '✓', '✓'],
  ['Remove watermarks', '✗', '✓', '✓'],
  ['API access', '✗', '✗', '✓'],
  ['White-label branding', '✗', '✗', '✓'],
  ['Unlimited users', '✗', '✗', '✓'],
];

export default function DemoVsFullPage() {
  return (
    <div className="px-6 lg:px-16 py-12 space-y-6">
      <h1 className="headline-md">Demo vs Full Access</h1>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Feature</th><th>Demo</th><th>Pro</th><th>White-Label</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t" style={{ borderColor: 'var(--border)' }}>
                <td className="py-2">{row[0]}</td><td className="text-center">{row[1]}</td><td className="text-center">{row[2]}</td><td className="text-center">{row[3]}</td>
              </tr>
            ))}
            <tr className="border-t" style={{ borderColor: 'var(--border)' }}><td className="py-2">Pricing</td><td className="text-center">Free</td><td className="text-center">$299/mo</td><td className="text-center">$3,000/yr</td></tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-3">
        <Link to="/diagnostics/subscribe" className="btn-primary">Subscribe to Pro</Link>
        <Link to="/contact" className="btn-secondary">Contact Sales for White-Label</Link>
      </div>
    </div>
  );
}
