import { Link } from 'react-router-dom';

const frames = [
  {
    title: 'You need numbers that survive scrutiny',
    body: 'Municipal planning, public sector strategy, council presentations. Growth models, scenario analysis, fiscal impact.',
    href: '/public-sector',
    label: 'Public sector',
  },
  {
    title: 'You need to understand what a system is actually doing',
    body: 'Institutional accountability, policy analysis, investigative research. Pattern identification across public records.',
    href: '/analysis',
    label: 'Analysis',
  },
  {
    title: 'You need evidence that can go into a legal or regulatory proceeding',
    body: 'Litigation support, structured synthesis, comparative institutional analysis.',
    href: '/contact?context=Litigation%20or%20regulatory%20proceeding',
    label: 'Contact',
  },
];

const proofPoints = [
  'Public safety response analysis documented a three-month detection lag between surge onset and formal coordination action.',
  'Education system synthesis quantified attrition replacement pressure above $85M annually against reported recovery-era commitments.',
  'Procurement analysis isolated repeat approval-gate bottlenecks and measured avoidable emergency spend tied to process drift.',
];

const HomePage = () => {
  return (
    <div className="px-6 lg:px-16">
      <section className="min-h-[calc(100vh-56px)] flex items-center max-w-[1120px] mx-auto py-[var(--space-10)]">
        <div>
          <h1 className="headline-lg max-w-[720px]">When the numbers have to hold up.</h1>
          <p className="mt-6 text-[17px] leading-[1.7] max-w-[540px]" style={{ color: 'var(--text-secondary)' }}>
            DDA produces evidence-led analysis for institutions, legal teams, and public agencies where the stakes of a
            wrong answer are documented.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/analysis" className="btn-primary">See the work →</Link>
            <Link to="/contact" className="btn-ghost">Describe your situation →</Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto py-[var(--space-9)] grid gap-6 lg:grid-cols-3">
        {frames.map((frame) => (
          <article key={frame.title} className="pl-6 border-l-2" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-[18px] font-medium leading-[1.3]">{frame.title}</h3>
            <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{frame.body}</p>
            <Link to={frame.href} className="btn-ghost mt-3">→ {frame.label}</Link>
          </article>
        ))}
      </section>

      <section className="max-w-[680px] mx-auto py-[var(--space-9)]">
        <p className="eyebrow">Demonstrated outcomes</p>
        <div className="mt-4 space-y-4">
          {proofPoints.map((point) => (
            <p key={point} className="text-[15px] leading-[1.7] border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              {point}{' '}
              <Link to="/analysis" className="underline decoration-transparent hover:decoration-current" style={{ color: 'var(--text-primary)' }}>
                See full analysis
              </Link>
            </p>
          ))}
        </div>
      </section>

      <section className="max-w-[1120px] mx-auto py-[var(--space-8)] px-6 card grid gap-6 lg:grid-cols-[1fr_auto] items-center">
        <div>
          <h2 className="headline-sm">Nine diagnostic tools for operators, HR, and risk functions.</h2>
          <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            Built from the same public-evidence method. Self-serve.
          </p>
        </div>
        <Link to="/diagnostics" className="btn-primary">Open diagnostics →</Link>
      </section>
    </div>
  );
};

export default HomePage;
