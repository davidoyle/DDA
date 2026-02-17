import { Link } from 'react-router-dom';

const approachItems = [
  {
    title: 'Multi-Source Synthesis',
    copy: 'Single documents tell incomplete stories. I read across multiple sources simultaneously—years of reports, policy statements, enforcement data, sector comparisons. Patterns emerge that single-source analysis misses.',
  },
  {
    title: 'Structural Consistency Analysis',
    copy: 'Organizations report outcomes. But do those outcomes match what the system actually produces? When reported claims and observable patterns diverge, I quantify the gap and assess what it indicates.',
  },
  {
    title: 'Scenario Modeling',
    copy: 'I model how structural changes cascade across your system using cost flows, institutional routing, and sector interactions. This shows actual costs, not theoretical ones.',
  },
  {
    title: 'Comparative Assessment',
    copy: "I benchmark your system against peer organizations using the same public-evidence methodology. This shows where you're structural outlier and why.",
  },
  {
    title: 'Evidence-Based Reasoning',
    copy: "Every finding is grounded in public documents. I separate clearly what's directly supported by evidence, what's strongly suggested, and what remains unknowable given available information.",
  },
];

const serviceTiers = [
  {
    title: 'Quick Assessment',
    items: [
      'Scope: Single structural pattern or system element',
      'Deliverable: One-page evidence summary + 30-minute structural assessment call',
      'Timeline: 1-2 weeks',
      'Use case: Immediate problem understanding',
    ],
  },
  {
    title: 'Comprehensive Analysis',
    items: [
      'Scope: Full system assessment with multi-source synthesis and modeling',
      'Deliverable: 40-50 page analysis including multi-source evidence synthesis, structural pattern identification, reported vs. observable outcome analysis, scenario modeling, comparative benchmarking, and decision implications with trade-offs',
      'Timeline: 4-8 weeks',
      'Use case: Major institutional decisions, reform planning, external validation',
    ],
  },
  {
    title: 'Strategic Systems Assessment',
    items: [
      'Scope: Multiple interconnected systems with long-term horizon modeling',
      'Deliverable: Enterprise-level analysis including cross-system structural analysis, 3-5 year scenario modeling, evaluation architecture design, reform pathway modeling, and ongoing assessment support during implementation',
      'Timeline: 8-12 weeks',
      'Use case: Major organizational transformation, policy reform, institutional redesign',
    ],
  },
];

const specializedServices = [
  {
    title: 'Litigation Support Analysis',
    copy: 'Structured synthesis of publicly available evidence. Comparative institutional analysis. Scenario modeling of policy impacts.',
    audience: 'For: Law firms, legal counsel, litigants needing external systems analysis.',
  },
  {
    title: 'Policy & Legislative Analysis',
    copy: 'Public-evidence assessment of bill or policy implications. Stakeholder incentive analysis. Comparative policy modeling.',
    audience: 'For: Government bodies, legislative committees, advocacy organizations.',
  },
  {
    title: 'Investigative Research',
    copy: 'Deep, multi-source synthesis of public evidence on systemic issues. Pattern identification across institutional data. Scenario and structural modeling. Publication-ready documentation.',
    audience: 'For: Journalists, media organizations, oversight bodies.',
  },
];

const included = [
  'Systematic synthesis of public evidence',
  'Structural pattern analysis',
  'Reported vs. observable outcome comparison',
  'Scenario modeling of changes',
  'Comparative benchmarking',
  'Evidence-based decision framing',
  'Clear limitations and unknowns',
];

const excluded = [
  'Consulting retainers',
  'Ongoing advisory relationships',
  'Meeting-based engagements',
  'Regulatory or legal opinions',
];

const ServicesPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="space-y-4 max-w-5xl">
        <p className="eyebrow">Services</p>
        <h1 className="headline-md">Public-Evidence Systems Analysis</h1>
        <p className="text-xl text-[#F3EFE6]/85">Structured synthesis of what your organization publishes. Evidence-based assessment of what it reveals.</p>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">How This Works</h2>
        <div className="grid gap-6">
          <article className="card space-y-3">
            <h3 className="font-heading text-xl uppercase tracking-wide">Phase 1: Intake</h3>
            <p className="text-[#F3EFE6]/80">You describe your system. What you need to understand. Timeline and scope.</p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl uppercase tracking-wide">Phase 2: Systematic Analysis</h3>
            <p className="text-[#F3EFE6]/80">I read everything your organization publishes. Annual reports. Budgets. Policy statements. Tribunal decisions. Enforcement data. Legislative records.</p>
            <p className="text-[#F3EFE6]/80">I read them systematically—across years, across departments, as an integrated system. I identify structural patterns. I note where reported outcomes don&apos;t match observable behavior. I model the implications.</p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl uppercase tracking-wide">Phase 3: Evidence Delivery</h3>
            <p className="text-[#F3EFE6]/80">You receive structured analysis. What the evidence shows. What it suggests about system behavior. What remains unknowable (clearly stated). Scenario models (if you changed X, what cascades). Decision implications.</p>
            <p className="text-[#F3EFE6]/80">You own the findings. You decide what to do with them.</p>
          </article>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">The Analytical Approach</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {approachItems.map((item) => (
            <article key={item.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="text-[#F3EFE6]/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Three Service Tiers</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <article key={tier.title} className="card space-y-4">
              <h3 className="font-heading text-2xl">{tier.title}</h3>
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
        <h2 className="headline-md">Specialized Analysis Services</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {specializedServices.map((service) => (
            <article key={service.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{service.title}</h3>
              <p className="text-[#F3EFE6]/80">{service.copy}</p>
              <p className="text-[#F3EFE6]/70">{service.audience}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">What You&apos;re Getting</h2>
        <div className="card space-y-6">
          <ul className="space-y-2 text-[#F3EFE6]/85 list-disc list-inside">
            {included.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <div className="space-y-2">
            <p className="text-[#F3EFE6]/80">What you&apos;re not getting:</p>
            <ul className="space-y-2 text-[#F3EFE6]/75 list-disc list-inside">
              {excluded.map((item) => (
                <li key={item}>✗ {item}</li>
              ))}
            </ul>
          </div>
          <p className="text-[#F3EFE6]/80">You get the analysis. You use it. Done.</p>
        </div>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Tell Me Your System</Link>
      </section>
    </div>
  );
};

export default ServicesPage;
