import { Link } from 'react-router-dom';

const approach = [
  {
    title: 'Systematic Synthesis',
    copy: 'Most analysis reads documents separately. I read them as an integrated system—across years, across departments, as interconnected evidence. Patterns emerge that fragmented analysis misses.',
  },
  {
    title: 'Structural Assessment',
    copy: 'Every institution makes claims about its outcomes. I compare those claims to what the system actually produces. When these diverge, I quantify the gap and assess what it indicates about structural behavior.',
  },
  {
    title: 'Scenario Modeling',
    copy: 'I model how policy or structural changes would cascade through your system using cost flows, institutional routing, and sector interactions. This shows actual consequences, not theoretical ones.',
  },
  {
    title: 'Comparative Analysis',
    copy: "I benchmark your system against peer institutions using the same methodology. This reveals where you're structural outlier and why.",
  },
  {
    title: 'Evidence-Based Reasoning',
    copy: "Every finding is grounded in public documents. I'm explicit about what's directly supported, what's strongly suggested, and what remains unknowable given available information.",
  },
];

const audiences = [
  'Government bodies assessing policy implementation.',
  'Oversight committees validating claims.',
  'Unions understanding member outcomes.',
  'Associations benchmarking effectiveness.',
  'Law firms needing systems analysis for litigation.',
  'Journalists analyzing institutional patterns.',
  'Business leaders understanding structural costs.',
];

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="space-y-4 max-w-5xl">
        <p className="eyebrow">About</p>
        <h1 className="headline-md">Public-Evidence Systems Analysis</h1>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="text-[#F3EFE6]/80">I started doing this because I watched what happens when systems go unexamined.</p>
        <p className="text-[#F3EFE6]/80">Most institutions publish extensive information about themselves. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement records. Sector data.</p>
        <p className="text-[#F3EFE6]/80">This information is rarely read as an integrated system. It&apos;s scattered across documents, published separately, designed for compliance not clarity.</p>
        <p className="text-[#F3EFE6]/80">I read it systematically. I find structural patterns. I identify where reported outcomes don&apos;t match observable system behavior. I quantify the implications.</p>
        <p className="text-[#F3EFE6]/80">Then I tell you what the evidence reveals.</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">My Approach</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {approach.map((item) => (
            <article key={item.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="text-[#F3EFE6]/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">What Distinguishes This Work</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">I work from public evidence only. Nothing I find requires leaked documents, whistleblowers, or privileged access. Everything is verifiable and replicable.</p>
          <p className="text-[#F3EFE6]/80">I work systematically. I don&apos;t cherry-pick documents or select convenient evidence. I synthesize across all available public information to find structural patterns.</p>
          <p className="text-[#F3EFE6]/80">I work precisely. I separate what&apos;s known from what&apos;s strongly suggested from what remains unknowable. I communicate uncertainty clearly instead of collapsing it.</p>
          <p className="text-[#F3EFE6]/80">I work independently. I have no institutional relationships to protect. No repeat clients to manage. No reputation constraints that force vagueness. I tell you what the evidence shows.</p>
          <p className="text-[#F3EFE6]/80">I work at speed. What takes traditional analysis teams weeks takes me days because I don&apos;t have organizational friction. I synthesize, model, and deliver without meetings about meetings.</p>
        </div>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">Who Hires Me</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">Organizations that need to understand their systems from an external, evidence-based perspective.</p>
          <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
            {audiences.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
          <p className="text-[#F3EFE6]/80">You have a system. You need to understand what it actually produces versus what it claims to produce.</p>
          <p className="text-[#F3EFE6]/80">I synthesize the evidence. I show you the gap. I model the implications.</p>
          <p className="text-[#F3EFE6]/80">Then you decide what to do.</p>
        </div>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Tell Me Your System</Link>
      </section>
    </div>
  );
};

export default AboutPage;
