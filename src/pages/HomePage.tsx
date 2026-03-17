import { Link } from 'react-router-dom';

const hero = {
  eyebrow: 'Public-evidence systems analysis',
  headline: 'We read what institutions publish.\nWe show you what it reveals.',
  body: [
    'Every organization produces data. Annual reports. Budgets. Policy manuals. Enforcement records. Tribunal decisions.',
    'Most people read these separately. We read them as a system — across years, across departments — and find what fragmented reading misses.',
  ],
  ctas: [
    { label: 'See the work', href: '/work', variant: 'primary' },
    { label: 'How it works', href: '/services', variant: 'secondary' },
  ],
};

const metaStrip = [
  {
    label: 'Source types',
    value: 'Annual reports, budgets, policy docs, tribunal records, enforcement data',
  },
  { label: 'Deliverable', value: 'Evidence. Not advice.' },
];

const methodSection = {
  eyebrow: 'What the method finds',
  headline: 'The gap between what institutions report and what they produce',
  body: "When an institution's reported outcomes don't match its observable system behavior, the gap is meaningful. We find it, quantify it, and show you what it indicates.",
  pillars: [
    {
      label: 'Multi-source synthesis',
      body: 'We read across years, departments, and document types simultaneously. Patterns that single-source analysis misses become visible.',
    },
    {
      label: 'Structural consistency',
      body: 'We compare reported outcomes against observable system behavior. When these diverge, we quantify the gap.',
    },
    {
      label: 'Decision framing',
      body: 'Findings are presented as structured choices. If you want X, the evidence suggests Y. Explicit trade-offs, not abstract debate.',
    },
  ],
};

const audienceCards = [
  {
    title: 'Organizations',
    body: 'Municipalities, health authorities, associations, unions — any organization that needs to understand what their system actually produces versus what it claims to produce.',
  },
  {
    title: 'Legal and advisory',
    body: 'Law firms, consultants, and advisors who need structured analysis of publicly available evidence — sourced, verifiable, and replicable.',
  },
  {
    title: 'Oversight and journalism',
    body: 'Journalists and oversight bodies who need deep, multi-source synthesis of public evidence — publication-ready, fully documented.',
  },
  {
    title: 'Business leaders',
    body: "CFOs, finance directors, and operators who need to understand structural cost flows and what's actually controllable before it hits the budget.",
  },
];

const HomePage = () => {
  return (
    <div className="pt-24 pb-20 px-6 lg:px-[8vw] space-y-20">
      <section className="space-y-6 max-w-5xl">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 className="headline-lg whitespace-pre-line">{hero.headline}</h1>
        {hero.body.map((paragraph) => (
          <p key={paragraph} className="body-text body-text-secondary max-w-3xl">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap gap-4 pt-2">
          {hero.ctas.map((cta) => (
            <Link
              key={cta.label}
              to={cta.href}
              className={cta.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
            >
              {cta.label}
            </Link>
          ))}
        </div>
        <div className="meta-strip">
          {metaStrip.map((item) => (
            <p key={item.label} className="meta-strip-item">
              {item.label}: <span>{item.value}</span>
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-8 max-w-6xl">
        <div className="space-y-4 max-w-4xl">
          <p className="eyebrow">{methodSection.eyebrow}</p>
          <h2 className="headline-md">{methodSection.headline}</h2>
          <p className="text-[#F3EFE6]/85">{methodSection.body}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {methodSection.pillars.map((pillar) => (
            <div key={pillar.label} className="space-y-3">
              <p className="eyebrow text-[#D4A03A]">{pillar.label}</p>
              <p className="text-[#F3EFE6]/80">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-4xl">
          <h2 className="headline-md">Who uses this</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {audienceCards.map((audience) => (
            <article key={audience.title} className="card space-y-3">
              <h3 className="text-[15px] font-medium">{audience.title}</h3>
              <p className="text-[13px] text-[#F3EFE6]/72">{audience.body}</p>
            </article>
          ))}
        </div>

        <Link to="/contact" className="btn-primary">
          Describe your system
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
