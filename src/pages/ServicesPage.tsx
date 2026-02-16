import { Link } from 'react-router-dom';

const tiers = [
  {
    tier: 'Quick Assessment',
    scope: 'Focused analysis of one specific problem area.',
    deliverable: 'One-page summary and a 30-minute walkthrough call.',
    fit: 'Best when you need fast clarity before committing to a larger project.',
  },
  {
    tier: 'Full Diagnostic',
    scope: 'Deep analysis of a full institutional system.',
    deliverable: '50+ page report with quantified findings, comparative context, and recommendations.',
    fit: 'Best when you need evidence, detail, and a clear change path.',
  },
  {
    tier: 'Strategic Analysis',
    scope: 'Cross-system analysis with forward pressure mapping.',
    deliverable: 'Multi-system report, 3-5 year projections, structural reform roadmap, and support.',
    fit: 'Best when your problem spans multiple institutions and timelines.',
  },
];

const ServicesPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">Services</p>
        <h1 className="headline-md">What you&apos;re actually buying.</h1>
        <p className="body-text body-text-secondary">
          Every engagement starts with your problem. I scope the work around the system you need to understand, the timeline you&apos;re working under, and the decision you need to make.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {tiers.map((item) => (
          <article key={item.tier} className="card space-y-4">
            <h2 className="font-heading text-2xl">{item.tier}</h2>
            <p className="text-[#F3EFE6]/80"><strong>Scope:</strong> {item.scope}</p>
            <p className="text-[#F3EFE6]/80"><strong>Deliverable:</strong> {item.deliverable}</p>
            <p className="text-[#F3EFE6]/80"><strong>Best fit:</strong> {item.fit}</p>
          </article>
        ))}
      </section>

      <section className="card space-y-4 max-w-4xl">
        <h2 className="headline-md">Need sector-specific context first?</h2>
        <p className="text-[#F3EFE6]/80">
          If you&apos;re in a municipality, union, law firm, contractor team, association, or newsroom, I have sector-specific pages with examples of how the analysis applies.
        </p>
        <div>
          <Link to="/consultation" className="btn-secondary">View Sector Pages</Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
