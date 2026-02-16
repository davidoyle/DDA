import { Link } from 'react-router-dom';

const sectors = [
  {
    title: 'Municipalities',
    copy: "Your budget projections are incomplete. You need to see what's coming.",
    path: '/consultation/municipality',
  },
  {
    title: 'Unions',
    copy: 'Your members are losing. You need to know why.',
    path: '/consultation/union',
  },
  {
    title: 'Law Firms',
    copy: 'Your cases need evidence. You need it fast.',
    path: '/consultation/law-firm',
  },
  {
    title: 'Contractors',
    copy: 'Your exposure is invisible. You need to see it.',
    path: '/consultation/contractor',
  },
  {
    title: 'Associations',
    copy: 'Your members are questioning value. You need proof.',
    path: '/consultation/association',
  },
  {
    title: 'Journalists',
    copy: 'Your story needs depth. You need it sourced.',
    path: '/consultation/journalist',
  },
];

const processSteps = [
  {
    title: 'Step 1: You Tell Me The Problem',
    copy: "Use the contact form. Tell me what's happening in your system. Your timeline. Your budget.",
  },
  {
    title: 'Step 2: I Analyze The Public Data',
    copy: 'I read the documents your organization publishes. Annual reports. Budgets. Policy. Decisions. I find the pattern.',
  },
  {
    title: 'Step 3: You Get The Numbers',
    copy: 'I give you a document. With evidence. With numbers. With what needs to change.',
  },
];

const serviceTiers = [
  {
    title: 'Quick Assessment',
    points: [
      'One-page summary of your specific problem.',
      '30-minute call to understand what it means.',
      'You decide if you want to go deeper.',
    ],
  },
  {
    title: 'Full Diagnostic',
    points: [
      '50+ page report with analysis, context, and what needs to change.',
      'Comparative data showing how you compare to peers.',
      'Implementation recommendations grounded in evidence.',
    ],
  },
  {
    title: 'Strategic Analysis',
    points: [
      'Multiple systems analyzed together.',
      '3-5 year projections of where the pressure comes.',
      'Complete roadmap for structural reform.',
      'Ongoing support as you implement.',
    ],
  },
];

const HomePage = () => {
  return (
    <div className="pt-24 pb-20 px-6 lg:px-[8vw] space-y-20">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="space-y-6 max-w-3xl">
          <p className="eyebrow">DDA</p>
          <h1 className="headline-lg">I find what&apos;s broken in your system.</h1>
          <p className="text-xl text-[#F3EFE6]/85 max-w-2xl">You get the numbers. You decide what to do.</p>
          <p className="body-text body-text-secondary max-w-2xl">
            Most organizations operate on assumptions about how their systems work. When reality diverges from those assumptions, the cost compounds silently until crisis forces recognition.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">
            I reverse-engineer that gap. I use public data—the documents your organization publishes but never looks at as a whole. I find the patterns. I quantify the impact. I hand you the evidence.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">Then you decide.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/services" className="btn-primary">See How It Works</Link>
            <Link to="/contact" className="btn-secondary">Tell Me Your Problem</Link>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="font-heading text-2xl mb-3">Assumed Performance vs Actual Performance</h2>
          <p className="text-sm text-[#F3EFE6]/70 mb-6">The hidden gap is where pressure builds.</p>
          <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="Graph showing a widening gap between assumed and actual performance">
            <line x1="30" y1="20" x2="30" y2="190" stroke="rgba(243,239,230,0.35)" strokeWidth="2" />
            <line x1="30" y1="190" x2="300" y2="190" stroke="rgba(243,239,230,0.35)" strokeWidth="2" />

            <polyline
              points="40,150 95,132 150,112 205,90 260,70"
              fill="none"
              stroke="#D4A03A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polyline
              points="40,165 95,165 150,160 205,152 260,140"
              fill="none"
              stroke="#6FC3D0"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <text x="44" y="112" fill="#D4A03A" fontSize="11">Assumed Performance</text>
            <text x="44" y="182" fill="#6FC3D0" fontSize="11">Actual Performance</text>
          </svg>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-3xl">
          <h2 className="headline-md">You have a specific problem.</h2>
          <p className="text-xl text-[#F3EFE6]/85">These people do too.</p>
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
        <div className="space-y-3 max-w-3xl">
          <h2 className="headline-md">The process is simple.</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {processSteps.map((step) => (
            <article key={step.title} className="card space-y-3">
              <h3 className="font-heading text-xl">{step.title}</h3>
              <p className="text-[#F3EFE6]/80">{step.copy}</p>
            </article>
          ))}
        </div>

        <p className="text-lg text-[#F3EFE6]/85">You don&apos;t get a consulting project. You get an answer.</p>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-3xl">
          <h2 className="headline-md">What you&apos;re actually buying.</h2>
        </div>

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

      <section className="space-y-6 max-w-4xl">
        <h2 className="headline-md">Who I am.</h2>
        <p className="body-text body-text-secondary">
          I&apos;m a forensic institutional analyst. I read public documents. I find patterns others miss. I quantify what&apos;s actually happening. I tell you the truth about your systems.
        </p>
        <p className="body-text body-text-secondary">I don&apos;t do consulting. I don&apos;t do meetings. I don&apos;t do &quot;stakeholder alignment.&quot;</p>
        <p className="body-text body-text-secondary">I read. I analyze. I write. I deliver.</p>
        <p className="body-text body-text-secondary">
          I work at speed because I don&apos;t have overhead. I work alone. I work from public data. Every claim I make is sourced. Every number is verifiable.
        </p>
        <p className="body-text body-text-secondary">
          I&apos;ve been inside broken systems. I know what they cost. I know how to find the gap between what people think is happening and what&apos;s actually happening.
        </p>
        <p className="body-text body-text-secondary">That&apos;s what I do.</p>
        <Link to="/about" className="btn-secondary">Learn More</Link>
      </section>

      <section className="card space-y-4 max-w-4xl">
        <h2 className="headline-md">You know what you need.</h2>
        <p className="text-[#F3EFE6]/80">
          Tell me about your problem. Your timeline. Your budget range. I&apos;ll respond within 48 hours with a preliminary assessment and scope options.
        </p>
        <p className="text-[#F3EFE6]/80">No sales call. No pitch deck. No discovery session.</p>
        <p className="text-[#F3EFE6]/80">Just a conversation about whether I can help.</p>
        <div>
          <Link to="/contact" className="btn-primary">Tell Me Your Problem</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
