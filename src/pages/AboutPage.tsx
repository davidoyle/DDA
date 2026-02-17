import { Link } from 'react-router-dom';

const approach = [
  {
    title: 'Systematic Synthesis',
    copy: 'Most analysis reads documents separately. We read them as an integrated system—across years, across departments, as interconnected evidence. Patterns emerge that fragmented analysis misses.',
  },
  {
    title: 'Structural Assessment',
    copy: 'Every institution makes claims about its outcomes. We compare those claims to what the system actually produces. When these diverge, we quantify the gap and assess what it indicates about structural behavior.',
  },
  {
    title: 'Scenario Modeling',
    copy: 'We model how policy or structural changes would cascade through the system using cost flows, institutional routing, and sector interactions. This shows actual consequences, not theoretical ones.',
  },
  {
    title: 'Comparative Analysis',
    copy: "We benchmark the system against peer institutions using the same methodology. This reveals where it's a structural outlier and why.",
  },
  {
    title: 'Evidence-Based Reasoning',
    copy: "Every finding is grounded in public documents. We're explicit about what's directly supported, what's strongly suggested, and what remains unknowable given available information.",
  },
];

const examples = [
  {
    title: 'Surrey Extortion Crisis (Institutional Response Analysis)',
    copy: 'Multi-source synthesis revealed: Detection lag of 3 months from surge onset to formal coordination. Evidence showed: Provincial-local messaging divergence eroding credibility while enforcement activity continued. Structural analysis demonstrated: System design failures (no forecasting, ad-hoc task force assembly, no throughput transparency).',
    result:
      "Result: Complete policy redesign framework with phased implementation, cost estimates, and scenario modeling for what happens if recommendations aren't implemented.",
  },
  {
    title: 'BC Teacher Workload & Attrition (System Strain Analysis)',
    copy: 'Synthesized: BCTF membership survey data, resignation rates, funding comparisons, staffing ratios. Found: 50.6% workload increases despite post-pandemic recovery; reported commitment to EAs in every K-3 classroom unfulfilled. Comparative analysis showed: BC ranks 8th in per-student funding, below national average. Scenario modeling revealed: Attrition and replacement costs exceed $85-121 million annually; targeted $50-75M investment in support staffing could yield measurable ROI.',
    result:
      'Result: Policy framework tying funding increases to measurable accountability benchmarks and staffing targets.',
  },
  {
    title: 'WorkSafeBC System Analysis (Cost-Shift and Outcomes Quantification)',
    copy: 'Multi-source assessment of: Claims data, denial patterns, acceptance rate differentials, enforcement trajectories, cost flows to taxpayer systems. Found: $570M annual surplus gap, 129,786 missing claims documented. Demonstrated: Unionized workers receive 85% acceptance vs. 72% for non-union workers under identical system. Quantified: $10B cost-shift to provincial health and disability systems.',
    result:
      'Result: Evidence framework used by municipalities for budget modeling, unions for bargaining leverage, law firms for litigation support.',
  },
];

const audiences = [
  'Government bodies assessing policy implementation.',
  'Oversight committees validating institutional claims.',
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
        <p className="text-[#F3EFE6]/80">We synthesize public evidence systematically.</p>
        <p className="text-[#F3EFE6]/80">Most institutions publish extensive information about themselves. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement records. Sector data.</p>
        <p className="text-[#F3EFE6]/80">This information is rarely read as an integrated system. It&apos;s scattered across documents, published separately, designed for compliance not clarity.</p>
        <p className="text-[#F3EFE6]/80">We read it all together. We find structural patterns. We identify where reported outcomes don&apos;t match observable system behavior. We quantify the implications.</p>
        <p className="text-[#F3EFE6]/80">Then we tell you what the evidence reveals.</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Our Approach</h2>
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
          <p className="text-[#F3EFE6]/80">We work from public evidence only. Nothing requires leaked documents, whistleblowers, or privileged access. Everything is verifiable and replicable.</p>
          <p className="text-[#F3EFE6]/80">We work systematically. We don&apos;t cherry-pick documents or select convenient evidence. We synthesize across all available public information to find structural patterns.</p>
          <p className="text-[#F3EFE6]/80">We work precisely. We separate what&apos;s known from what&apos;s strongly suggested from what remains unknowable. We communicate uncertainty clearly instead of collapsing it.</p>
          <p className="text-[#F3EFE6]/80">We work at speed. What takes traditional analysis teams weeks takes systematic synthesis of available public records in days because there&apos;s no organizational friction. Synthesis, modeling, and delivery without meetings about meetings.</p>
          <p className="text-[#F3EFE6]/80">We operate at decision-architecture level. Not persuasion. Not advice. Structured evidence that forces institutional clarity by making choices explicit and unavoidable.</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Examples of Work</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {examples.map((example) => (
            <article key={example.title} className="card space-y-3">
              <h3 className="font-heading text-xl">{example.title}</h3>
              <p className="text-[#F3EFE6]/80">{example.copy}</p>
              <p className="text-[#F3EFE6]/75">{example.result}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">Who Hires This Work</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">Organizations that need to understand their systems from an external, evidence-based perspective.</p>
          <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
            {audiences.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
          <p className="text-[#F3EFE6]/80">You have a system. You need to understand what it actually produces versus what it claims to produce.</p>
          <p className="text-[#F3EFE6]/80">We synthesize the evidence. We show you the gap. We model the implications.</p>
          <p className="text-[#F3EFE6]/80">Then you decide what to do.</p>
        </div>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Describe Your System</Link>
      </section>
    </div>
  );
};

export default AboutPage;
