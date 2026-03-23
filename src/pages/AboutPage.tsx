import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';

const methodology = [
  {
    title: 'Systematic synthesis',
    copy: 'Most analysis reads documents separately. We read them as an integrated system—across years, across departments, as interconnected evidence. Patterns emerge that fragmented analysis misses.',
  },
  {
    title: 'Structural assessment',
    copy: 'Every institution makes claims about its outcomes. We compare those claims to what the system actually produces. When these diverge, we quantify the gap and assess what it indicates about structural behavior.',
  },
  {
    title: 'Scenario modeling',
    copy: 'We model how policy or structural changes would cascade through the system using cost flows, institutional routing, and sector interactions. This shows actual consequences, not theoretical ones.',
  },
  {
    title: 'Comparative analysis',
    copy: "We benchmark the system against peer institutions using the same methodology. This reveals where it's a structural outlier and why.",
  },
  {
    title: 'Evidence-based reasoning',
    copy: "Every finding is grounded in public documents. We're explicit about what's directly supported, what's strongly suggested, and what remains unknowable given available information.",
  },
];

const differentiators = [
  {
    label: 'Public evidence only',
    body: 'Nothing requires leaked documents, whistleblowers, or privileged access. Everything is verifiable and replicable.',
  },
  {
    label: 'Systematic, not selective',
    body: "We synthesize across all available public information. We don't cherry-pick documents or select convenient evidence.",
  },
  {
    label: 'Precise about uncertainty',
    body: "We separate what's known from what's strongly suggested from what remains unknowable. Uncertainty is communicated clearly, not collapsed.",
  },
  {
    label: 'Analysis, not advice',
    body: 'We show you what the evidence reveals. What you do with it is your decision.',
  },
];

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <DdaLogo compact className="mb-4" />
        <p className="eyebrow">About</p>
        <h1 className="headline-md">Public-evidence systems analysis</h1>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="text-[#F3EFE6]/80">Every institution publishes extensive information about itself. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement records. Sector data.</p>
        <p className="text-[#F3EFE6]/80">This information is usually read as disconnected pieces. We read it as an integrated system.</p>
        <p className="text-[#F3EFE6]/80">Patterns become visible. Structural gaps become measurable. Decision implications become explicit.</p>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Methodology</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {methodology.map((item) => (
            <article key={item.title} className="card space-y-3">
              <h3 className="font-heading text-2xl">{item.title}</h3>
              <p className="text-[#F3EFE6]/80">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6 max-w-5xl">
        <h2 className="headline-md">What distinguishes this work</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {differentiators.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="eyebrow">{item.label}</p>
              <p className="text-[#F3EFE6]/80">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl">
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

export default AboutPage;
