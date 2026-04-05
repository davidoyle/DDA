import { Link } from 'react-router-dom';

const methodSections = [
  {
    title: 'Data Lexicon protocol',
    body: 'Every number is named, sourced, and tagged as ACTUAL, PROXY, or FLAG. Every output is traceable to a primary source before it reaches a decision table.',
  },
  {
    title: 'Systematic synthesis',
    body: 'Documents are read as an integrated system across years, departments, and institutional boundaries. This surfaces structural patterns that fragmented reviews miss.',
  },
  {
    title: 'Structural vs. reported outcomes',
    body: 'Institutions publish claims. DDA measures what the system actually produces. When those diverge, the gap is quantified and documented.',
  },
  {
    title: 'Scenario modelling',
    body: 'Policy changes are modelled through cost flows, institutional routing, and sector interactions to show operational consequences, not abstract theory.',
  },
  {
    title: 'Uncertainty standards',
    body: 'Findings are classified into three tiers: directly supported, strongly suggested, or unknowable given available evidence. No confidence inflation.',
  },
];

const MethodPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel space-y-4 max-w-5xl">
        <p className="eyebrow">Method</p>
        <h1 className="headline-md">How the numbers are built to hold up.</h1>
        <p className="text-xl text-[#F3EFE6]/85 max-w-4xl">
          This is a process page, not a biography. The work is designed for decisions that may face council review,
          regulatory challenge, or statutory scrutiny.
        </p>
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
