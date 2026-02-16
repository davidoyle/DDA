import { Link } from 'react-router-dom';

const tiers = [
  {
    title: 'Quick Assessment',
    price: '$5,000',
    bullets: [
      'One-page summary of your specific problem.',
      '30-minute call to understand what it means.',
      'You decide if you want to go deeper.',
      'Scope: Single system, immediate insight.',
      'Timeline: 1-2 weeks.',
    ],
  },
  {
    title: 'Full Diagnostic',
    price: '$15,000',
    bullets: [
      '50+ page report with complete analysis and context.',
      'Comparative data showing how you compare to peers.',
      'Implementation recommendations grounded in evidence.',
      'Scope: Deep dive into one or multiple interconnected systems.',
      'Timeline: 4-8 weeks.',
    ],
  },
  {
    title: 'Strategic Analysis',
    price: '$25,000',
    bullets: [
      'Multiple systems analyzed together.',
      '3-5 year projections of where the pressure comes.',
      'Complete roadmap for structural reform.',
      'Ongoing support as you implement.',
      'Scope: Enterprise-level institutional reform planning.',
      'Timeline: 8-12 weeks.',
    ],
  },
];

const specializedServices = [
  {
    title: 'Litigation Support',
    bullets: [
      'Comprehensive evidentiary synthesis.',
      'Precedent mapping across tribunal decisions.',
      'Expert witness coordination and briefing.',
      'For: Law firms, legal counsel, litigants.',
      'Scope: Case-specific institutional analysis.',
    ],
  },
  {
    title: 'Legislative & Policy Analysis',
    bullets: [
      'Bill/policy impact assessment.',
      'Stakeholder analysis and reform recommendations.',
      'Legislative briefing materials.',
      'For: Government bodies, advocacy organizations, legislators.',
      'Scope: Policy development and reform planning.',
    ],
  },
  {
    title: 'Investigative Research',
    bullets: [
      'Multi-source synthesis and analysis.',
      'Data visualizations and graphics.',
      'Publication-ready findings with full source documentation.',
      'For: Journalists, media organizations, oversight bodies.',
      'Scope: Deep investigations into systemic failures.',
    ],
  },
];

const included = [
  'Evidence-based analysis using public data',
  'Sourced and verifiable findings',
  'Clear quantification of impact',
  'Actionable recommendations',
  'Full documentation and methodology',
];

const notIncluded = [
  'Ongoing consulting retainers',
  'Meeting-heavy engagement models',
  '"Strategic advisory" relationships',
  'Long-term consulting projects',
];

const ServicesPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">Services</p>
        <h1 className="headline-md">How This Actually Works</h1>
        <p className="text-xl text-[#F3EFE6]/85">Three tiers. One process.</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">The Process</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Step 1: You Tell Me The Problem</h3>
            <p className="text-[#F3EFE6]/80">
              Use the contact form. Describe what&apos;s happening in your system. Your timeline. Your budget range.
            </p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Step 2: I Analyze The Public Data</h3>
            <p className="text-[#F3EFE6]/80">
              I read what your organization publishes. Annual reports. Budgets. Policy manuals. Decisions. Enforcement data. Legislative records. Whatever exists in the public domain.
            </p>
            <p className="text-[#F3EFE6]/80">
              I find the pattern. The gap between what you think is happening and what the data proves is happening.
            </p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Step 3: You Get The Numbers</h3>
            <p className="text-[#F3EFE6]/80">
              I deliver a document. Evidence. Numbers. What needs to change. You own it. You use it. You decide what to do.
            </p>
          </article>
        </div>
        <p className="text-lg text-[#F3EFE6]/85">You don&apos;t get a consulting project. You get an answer.</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Three Service Tiers</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.title} className="card space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-2xl">{tier.title.toUpperCase()}</h3>
                <span className="text-[#D4A03A] font-semibold">{tier.price}</span>
              </div>
              <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
                {tier.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Specialized Services</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {specializedServices.map((service) => (
            <article key={service.title} className="card space-y-4">
              <h3 className="font-heading text-2xl">{service.title.toUpperCase()}</h3>
              <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">What&apos;s Included</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card space-y-4">
            <h3 className="font-heading text-2xl">All deliverables:</h3>
            <ul className="space-y-2 text-[#F3EFE6]/80">
              {included.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </article>
          <article className="card space-y-4">
            <h3 className="font-heading text-2xl">What&apos;s not included:</h3>
            <ul className="space-y-2 text-[#F3EFE6]/80">
              {notIncluded.map((item) => (
                <li key={item}>✗ {item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="text-lg text-[#F3EFE6]/85">You get the answer. You move on.</p>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Tell Me Your Problem</Link>
      </section>
    </div>
  );
};

export default ServicesPage;
