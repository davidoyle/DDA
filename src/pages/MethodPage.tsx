import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Data Lexicon protocol',
    body: 'Every number entering a model or analysis is tagged ACTUAL, PROXY, or FLAG. Each entry includes source, release date, and lag. The Lexicon is delivered to the client and built to survive cross-examination.',
  },
  {
    title: 'Systematic synthesis',
    body: 'Documents are read as an integrated system across years, departments, and institutions — not as isolated artifacts. Pattern detection comes from integration, not excerpt selection.',
  },
  {
    title: 'Structural vs. reported outcomes',
    body: 'Institutions make claims. DDA measures what the system actually produces. Divergence is quantified and assessed for what it indicates about structural behaviour.',
  },
  {
    title: 'Scenario modelling',
    body: 'Policy and structural changes are modelled through cost flows, institutional routing, and sector interactions. The output is consequence mapping, not rhetorical forecast.',
  },
  {
    title: 'Uncertainty standards',
    body: 'Every finding is classified as directly supported, strongly suggested, or unknowable given available evidence. No confidence inflation.',
  },
];

const MethodPage = () => {
  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[800px] mx-auto">
        <h1 className="headline-md">Method</h1>
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-6)]">
        {sections.map((section) => (
          <article key={section.title} className="pt-8 mt-8 border-t" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-[24px] font-medium leading-[1.3]">{section.title}</h2>
            <p className="text-[15px] leading-[1.7] mt-3" style={{ color: 'var(--text-secondary)' }}>{section.body}</p>
          </article>
        ))}

        <article className="pt-8 mt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-[24px] font-medium leading-[1.3]">Service tiers</h2>
          <div className="mt-4 text-[15px]">
            {[
              ['Rapid diagnostic', '1–2 weeks', 'Bounded investigation for immediate structural signal.'],
              ['Comprehensive analysis', '4–8 weeks', 'Full synthesis with quantified findings and scenario implications.'],
              ['Strategic systems assessment', '8–12 weeks', 'Extended multi-system architecture assessment under documented constraints.'],
            ].map(([name, timeline, desc]) => (
              <div key={name} className="py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <p><strong>{name}</strong> — {timeline}</p>
                <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[15px]" style={{ color: 'var(--text-secondary)' }}>
            Note: Full-scope public sector engagements (municipal growth strategies, official plan reviews) operate under a separate structure. See Public sector.
          </p>
        </article>
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-7)] constraint-block">
        Analytical methodologies, models, and tools developed by DDA remain DDA&apos;s intellectual property. Deliverables become the client&apos;s property upon final payment.
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-8)] flex justify-center">
        <Link to="/contact" className="btn-primary">Describe your situation →</Link>
      </section>
    </div>
  );
};

export default MethodPage;
