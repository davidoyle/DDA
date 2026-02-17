import { Link } from 'react-router-dom';

const sectors = [
  {
    title: 'Municipalities',
    copy: 'Need to understand structural cost pressures before they force budget decisions.',
    path: '/consultation/municipality',
  },
  {
    title: 'Unions',
    copy: 'Need to see member-outcome patterns and compare to peer organizations.',
    path: '/consultation/union',
  },
  {
    title: 'Law Firms',
    copy: 'Need structured analysis of publicly available evidence for litigation support.',
    path: '/consultation/law-firm',
  },
  {
    title: 'Contractors',
    copy: 'Need to understand systemic enforcement and penalty patterns in their sector.',
    path: '/consultation/contractor',
  },
  {
    title: 'Associations',
    copy: 'Need honest assessment of whether member outcomes match member needs.',
    path: '/consultation/association',
  },
  {
    title: 'Journalists',
    copy: 'Need deep, sourced analysis of systemic patterns in public institutions.',
    path: '/consultation/journalist',
  },
  {
    title: 'Small Business Owners',
    copy: "Need to understand structural cost flows and what's actually controllable.",
    path: '/consultation/small-business',
  },
];

const whatThisWorkIs = [
  {
    title: 'Multi-Source Synthesis',
    copy: 'We read multiple documents simultaneously. Annual reports across years. Budgets. Policy statements. Enforcement data. Public decisions. We find patterns that single-source analysis misses.',
  },
  {
    title: 'Structural Consistency Analysis',
    copy: "We compare reported outcomes against observable system behavior. When these don't align, the gap is meaningful. We quantify it.",
  },
  {
    title: 'Evidence-Based Assessment',
    copy: "Every claim is grounded in public documents. No speculation. No inference beyond what the evidence permits. We separate what's known, what's strongly suggested, and what remains unknowable.",
  },
  {
    title: 'Scenario Modeling',
    copy: 'We model how structural changes would cascade across the system using cost flows, routing patterns, and sector interactions. This shows what policies actually cost.',
  },
  {
    title: 'Decision-Support Framing',
    copy: 'We present findings as structured choices: If you want X, the evidence suggests Y. This forces explicit trade-offs instead of abstract debate.',
  },
];

const processSteps = [
  {
    title: 'Intake',
    copy: 'Describe the system and what needs to be understood.',
  },
  {
    title: 'Multi-Source Analysis',
    copy: 'We read what the organization publishes—across years, across departments. We synthesize systematically.',
  },
  {
    title: 'Structural Assessment',
    copy: 'We identify patterns. We expose inconsistencies. We model consequences.',
  },
  {
    title: 'Evidence Deliverable',
    copy: 'The findings, supporting evidence, and decision implications. Use it. Decide. Move on.',
  },
];

const serviceTiers = [
  {
    title: 'Quick Assessment',
    points: [
      'One-page summary of the structural pattern in question.',
      '30-minute call to review the evidence.',
      'Timeline: 1-2 weeks.',
    ],
  },
  {
    title: 'Comprehensive Analysis',
    points: [
      '40-50 page public-evidence assessment.',
      'Multi-source synthesis across years and domains.',
      'Structural pattern identification.',
      'Scenario modeling of policy changes.',
      'Comparative benchmarking (peer organizations).',
      'Decision framing and implications.',
      'Timeline: 4-8 weeks.',
    ],
  },
  {
    title: 'Strategic Systems Assessment',
    points: [
      'Multiple interconnected systems analyzed together.',
      'Long-term structural risk modeling (3-5 year horizons).',
      'Complete evaluation architecture (what data would validate claims).',
      'Reform pathway modeling.',
      'Timeline: 8-12 weeks.',
    ],
  },
];

const HomePage = () => {
  return (
    <div className="pt-24 pb-20 px-6 lg:px-[8vw] space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="space-y-6 max-w-3xl">
          <p className="eyebrow">DDA</p>
          <h1 className="headline-lg">Public-Evidence Systems Analysis</h1>
          <p className="text-xl text-[#F3EFE6]/85 max-w-2xl">We synthesize what institutions publish. We show you what it reveals.</p>
          <p className="body-text body-text-secondary max-w-2xl">
            Every organization publishes the data it produces. Annual reports. Budgets. Policy manuals. Tribunal decisions. Legislative records. Enforcement data.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">Most people read these separately. We read them systemically.</p>
          <p className="body-text body-text-secondary max-w-2xl">
            We synthesize across documents and years. We identify structural patterns. We expose inconsistencies between reported outcomes and observable system behavior. We quantify what those inconsistencies mean.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">Then we tell you what the evidence actually shows—not what the narrative claims.</p>
          <p className="body-text body-text-secondary max-w-2xl">This is not consulting. This is public-evidence analysis.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/services" className="btn-primary">See What We Analyze</Link>
            <Link to="/contact" className="btn-secondary">Describe Your System</Link>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="font-heading text-2xl mb-3">Reported vs. Structural</h2>
          <p className="text-sm text-[#F3EFE6]/70 mb-6">Pattern visualization of reported outcomes versus structural system behavior.</p>
          <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="Graph showing reported outcomes diverging from structural behavior over time">
            <line x1="30" y1="20" x2="30" y2="190" stroke="rgba(243,239,230,0.35)" strokeWidth="2" />
            <line x1="30" y1="190" x2="300" y2="190" stroke="rgba(243,239,230,0.35)" strokeWidth="2" />

            <polyline
              points="40,150 95,130 150,108 205,87 260,72"
              fill="none"
              stroke="#D4A03A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polyline
              points="40,165 95,162 150,157 205,147 260,134"
              fill="none"
              stroke="#6FC3D0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <text x="44" y="111" fill="#D4A03A" fontSize="11">Reported Outcome</text>
            <text x="44" y="182" fill="#6FC3D0" fontSize="11">Structural Behavior</text>
          </svg>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-4xl">
          <h2 className="headline-md">Who Uses This Work</h2>
          <p className="text-xl text-[#F3EFE6]/85">Each sector gets the same thing: evidence-based system analysis using what institutions already publish.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <article key={sector.title} className="card space-y-5">
              <h3 className="font-heading text-2xl">{sector.title}</h3>
              <p className="text-[#F3EFE6]/80">{sector.copy}</p>
              <Link to={sector.path} className="btn-secondary">Learn More</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="headline-md">What This Work Is</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {whatThisWorkIs.map((item) => (
            <article key={item.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="text-[#F3EFE6]/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="headline-md">The Process</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {processSteps.map((step) => (
            <article key={step.title} className="card space-y-3">
              <h3 className="font-heading text-xl uppercase tracking-wide">{step.title}</h3>
              <p className="text-[#F3EFE6]/80">{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="headline-md">Three Tiers</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {serviceTiers.map((tier) => (
            <article key={tier.title} className="card space-y-4">
              <h3 className="font-heading text-2xl">{tier.title}</h3>
              <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
                {tier.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">About Us</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">We synthesize public evidence systematically.</p>
          <p className="text-[#F3EFE6]/80">
            Most institutions publish extensive information about themselves. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement records. Sector data.
          </p>
          <p className="text-[#F3EFE6]/80">This information is rarely read as an integrated system. It&apos;s scattered across documents, published separately, designed for compliance not clarity.</p>
          <p className="text-[#F3EFE6]/80">
            We read it all together. We find structural patterns. We identify where reported outcomes don&apos;t match observable system behavior. We quantify the implications.
          </p>
          <p className="text-[#F3EFE6]/80">Then we tell you what the evidence reveals.</p>
          <p className="text-[#F3EFE6]/80">We work from public documents only. Everything we find is verifiable. Everything is replicable.</p>
          <p className="text-[#F3EFE6]/80">We don&apos;t tell you what to think. We show you what the evidence reveals and what the structural implications are.</p>
        </div>
        <Link to="/contact" className="btn-primary">Describe Your System</Link>
      </section>
    </div>
  );
};

export default HomePage;
