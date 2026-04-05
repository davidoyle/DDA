import { Link } from 'react-router-dom';

const methodSections = [
  {
    title: 'Data Lexicon protocol',
    body: 'Every number entering a model or analysis carries an explicit status: ACTUAL (direct extract from named primary source), PROXY (derived from primary items with derivation shown), or FLAG (gap named where no extract exists). Entries include source, release date, and data lag. The Lexicon is delivered to the client.',
  },
  {
    title: 'Systematic synthesis',
    body: 'Documents are read as an integrated system across years, departments, and institutions — not as isolated pieces. Patterns emerge from this integration that fragmented analysis misses.',
  },
  {
    title: 'Structural vs. reported outcomes',
    body: 'Institutions make claims about outcomes. DDA measures what the system actually produces. When they diverge, the gap is quantified and assessed for what it indicates about structural behaviour.',
  },
  {
    title: 'Scenario modelling',
    body: 'Policy and structural changes are modelled through cost flows, institutional routing, and sector interactions. This surfaces actual consequences rather than theoretical ones.',
  },
  {
    title: 'Uncertainty standards',
    body: 'Findings are classified into three tiers: directly supported by public evidence, strongly suggested by pattern, or unknowable given available information. No confidence inflation.',
  },
  {
    title: 'Service tiers',
    body: 'Rapid diagnostic (1–2 weeks). Comprehensive analysis (4–8 weeks). Strategic systems assessment (8–12 weeks). Fixed scope, fixed price, no retainers. Pricing is discussed after preliminary assessment because scope determines cost.',
  },
];

const MethodPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <p className="eyebrow">Method</p>
        <h1 className="headline-md">How the numbers are built to hold up.</h1>
      </section>

      <section className="grid gap-6 lg:grid-cols-2 max-w-6xl">
        {methodSections.map((section) => (
          <article key={section.title} className="card space-y-3">
            <h2 className="font-heading text-2xl">{section.title}</h2>
            <p className="text-[#F3EFE6]/82">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="text-[#F3EFE6]/82">
          Note: Full-scope public sector engagements (municipal growth strategies, official plan reviews) operate under
          a separate structure. See the Public sector page.
        </p>
      </section>

      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">Intellectual property</h2>
        <p className="text-[#F3EFE6]/82">
          Analytical methodologies, models, and tools developed by DDA remain DDA&apos;s intellectual property.
          Deliverables become the client&apos;s property upon final payment.
        </p>
      </section>

      <section className="max-w-5xl">
        <Link to="/contact" className="btn-primary">
          Describe your situation →
        </Link>
      </section>
    </div>
  );
};

export default MethodPage;
