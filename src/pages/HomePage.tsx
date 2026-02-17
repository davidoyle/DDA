import { Link } from 'react-router-dom';

const sectors = [
  {
    title: 'Municipalities',
    copy: 'Need to understand structural cost pressures before budget decisions lock in wrong assumptions.',
    path: '/consultation/municipality',
  },
  {
    title: 'Unions',
    copy: 'Need to see member-outcome patterns to understand where the system is actually failing them.',
    path: '/consultation/union',
  },
  {
    title: 'Law Firms',
    copy: 'Need structured public-evidence analysis for litigation support.',
    path: '/consultation/law-firm',
  },
  {
    title: 'Contractors',
    copy: 'Need to understand systemic enforcement patterns and exposure trajectories.',
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
    copy: "I don't read your annual report. I read your annual reports (10 years), your budgets (5 years), your policy manuals, your enforcement data, your tribunal decisions, your legislative history. All simultaneously. I synthesize across sources to find what single-source analysis misses.",
    example:
      'Example: Surrey extortion surge—no single document reveals the institutional response failure. But annual police reports + task force announcements + victim testimony + emergency service dispatch patterns + provincial budget documents = clear structural contradiction.',
  },
  {
    title: 'Structural Consistency Analysis',
    copy: "I compare reported outcomes against observable system behavior. When these don't align, the gap is meaningful.",
    example:
      'Example: BC education system reports adequate teacher support. But 50.6% of teachers report workload increases, 14% plan to leave, 15% experience workplace violence. The gap between reported and actual = $85-121M annually in measurable costs.',
  },
  {
    title: 'Scenario Modeling',
    copy: 'I model how policy changes cascade through the system using cost flows, institutional routing, and sector interactions.',
    example:
      'Example: If Surrey implemented the five recommended reforms, incident trajectory drops 25-40%, victim confidence restores, and annual costs drop $800K-900K while improving outcomes. I quantify what “better” actually costs and what it actually delivers.',
  },
];

const processSteps = [
  {
    title: 'Intake',
    copy: 'You describe your system and what you need to understand.',
  },
  {
    title: 'Multi-Source Analysis',
    copy: 'I read what your organization publishes—across years, across departments. I synthesize systematically.',
  },
  {
    title: 'Structural Assessment',
    copy: 'I identify patterns. I expose inconsistencies. I model consequences.',
  },
  {
    title: 'Evidence Deliverable',
    copy: 'You get the findings, the supporting evidence, and the decision implications. You use it. You decide. You move on.',
  },
];

const serviceTiers = [
  {
    title: 'Quick Assessment',
    points: [
      'One-page summary of structural pattern you asked about.',
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
      'Complete evaluation architecture (what data would actually validate claims).',
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
          <h1 className="headline-lg">Systems Analysis Using Public Evidence</h1>
          <p className="text-xl text-[#F3EFE6]/85 max-w-2xl">I synthesize what your organization publishes. I show you what it reveals.</p>
          <p className="body-text body-text-secondary max-w-2xl">
            Every organization publishes the data it produces. Annual reports. Budgets. Policy manuals. Tribunal decisions. Legislative records. Enforcement data.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">Most people read these separately. I read them systemically.</p>
          <p className="body-text body-text-secondary max-w-2xl">
            I synthesize across documents. I identify structural patterns. I expose inconsistencies between reported outcomes and observable system behavior. I quantify what those inconsistencies mean.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">Then I tell you what the evidence actually shows—not what the narrative claims.</p>
          <p className="body-text body-text-secondary max-w-2xl">This is not consulting. This is public-evidence analysis.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/services" className="btn-primary">See What I Analyze</Link>
            <Link to="/contact" className="btn-secondary">Tell Me Your System</Link>
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
          <p className="text-xl text-[#F3EFE6]/85">Each sector gets the same thing: evidence-based system analysis using what your organization already publishes.</p>
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
        <h2 className="headline-md">What This Work Is (Concrete Examples)</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {whatThisWorkIs.map((item) => (
            <article key={item.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="text-[#F3EFE6]/80">{item.copy}</p>
              <p className="text-[#F3EFE6]/70 italic">{item.example}</p>
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
        <h2 className="headline-md">About Me</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">I synthesize public evidence systematically.</p>
          <p className="text-[#F3EFE6]/80">
            Most organizations publish extensive information about themselves. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement data. But this information is scattered, published separately, and rarely read as a coherent system.
          </p>
          <p className="text-[#F3EFE6]/80">
            I read it all together. I find patterns. I expose where reported outcomes don&apos;t match observable behavior. I quantify what that means.
          </p>
          <p className="text-[#F3EFE6]/80">I work from public documents only. Everything I find is verifiable. Everything is replicable.</p>
          <p className="text-[#F3EFE6]/80">I don&apos;t tell you what to think. I show you what the evidence reveals and what the structural implications are.</p>
        </div>
        <Link to="/contact" className="btn-primary">Tell Me Your System</Link>
      </section>
    </div>
  );
};

export default HomePage;
