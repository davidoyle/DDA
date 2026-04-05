import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';
import { serviceTiers } from '../lib/serviceTiers';

const header = {
  eyebrow: 'Services',
  headline: 'Three tiers. One method.',
  body: "The scope changes. The approach doesn't. Every engagement is public-evidence synthesis — systematic, sourced, verifiable.",
};

const specializedServices = [
  {
    title: 'Litigation support',
    body: 'Structured synthesis of publicly available evidence. Comparative institutional analysis. Scenario modeling of policy impacts. For law firms and legal counsel.',
  },
  {
    title: 'Policy and legislative analysis',
    body: 'Public-evidence assessment of bill or policy implications. Stakeholder incentive analysis. Comparative policy modeling. For government bodies and committees.',
  },
  {
    title: 'Investigative research',
    body: 'Deep multi-source synthesis on systemic issues. Pattern identification across institutional data. Publication-ready documentation. For journalists and oversight bodies.',
  },
  {
    title: 'Licensed analysis',
    body: 'Sector-specific analysis delivered under your brand to your clients. For advisory firms, consultants, and law firms with employer or institutional client bases.',
  },
];

const included = [
  'Systematic synthesis of public evidence',
  'Structural pattern analysis',
  'Reported vs. observable outcome comparison',
  'Scenario modeling of changes',
  'Comparative benchmarking',
  'Evidence-based decision framing',
  'Clear statement of limitations and unknowns',
];

const notIncluded = [
  'Not included (Standard Tiers): Consulting retainers',
  'Not included (Standard Tiers): Meeting-based engagements',
  'Not included (Standard Tiers): Regulatory or legal opinions',
  'Not included (Standard Tiers): Subjective recommendations',
];

const ServicesPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="brand-panel space-y-4 max-w-5xl">
        <DdaLogo compact className="mb-4" />
        <p className="eyebrow">{header.eyebrow}</p>
        <h1 className="headline-md">{header.headline}</h1>
        <p className="text-xl text-[#F3EFE6]/85">{header.body}</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Service tiers</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <article
              key={tier.id}
              className={`card space-y-4 ${tier.featured ? 'border-2 border-[#6FC3D0]' : 'border border-[#F3EFE6]/12'}`}
            >
              {tier.featured && tier.featuredLabel ? (
                <span className="tier-featured-badge">{tier.featuredLabel}</span>
              ) : null}
              <p className="eyebrow">{tier.tier}</p>
              <h3 className="font-heading text-2xl">{tier.name}</h3>
              <p className="text-sm text-[#F3EFE6]/70">Timeline: {tier.timeline}</p>
              <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
                {tier.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Specialized services</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {specializedServices.map((service) => (
            <article key={service.title} className="card space-y-3">
              <h3 className="text-[15px] font-medium">{service.title}</h3>
              <p className="text-[13px] text-[#F3EFE6]/72">{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">What&apos;s included</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card space-y-3">
            <p className="font-semibold">Included</p>
            <ul className="space-y-2 text-[#F3EFE6]/85 list-disc list-inside">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card space-y-3">
            <p className="font-semibold">Not included</p>
            <ul className="space-y-2 text-[#F3EFE6]/75 list-disc list-inside">
              {notIncluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-xs text-[#F3EFE6]/70">
              <strong>Exception for Municipal &amp; Public Sector Contracts:</strong> When engaged for comprehensive strategic planning
              (e.g., Urban Growth Strategies), DDA includes public participation programs, facilitated workshops, council
              presentations, and data-driven scenario recommendations as defined by the specific RFP. See our{' '}
              <Link className="underline underline-offset-2 hover:text-[#D4A03A]" to="/public-sector">
                Public Sector Engagements
              </Link>{' '}
              page for details.
            </p>
          </article>
        </div>
        <p className="text-sm text-[#F3EFE6]/70">The analysis is delivered. The client uses it. Done.</p>

        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">
            Describe your system
          </Link>
          <Link to="/work" className="btn-secondary">
            See examples of work
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
