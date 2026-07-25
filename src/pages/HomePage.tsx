import { getEmailAddress } from '@/lib/email';
import { Link } from 'react-router-dom';

const services = [
  ['Economic & Regional Strategy', 'Growth frameworks, labour market plans, and economic strategies built from named primary sources. The source and release date sit with each key figure.'],
  ['Land Use & Planning Analysis', "Employment lands reviews, housing needs assessments, and community plans that identify where policy assumptions diverge from what the data actually shows."],
  ['Labour Market & Workforce Risk', 'Supply analysis for operators making capital commitments that depend on people being available to do the work — by trade, by timeline, by cost scenario.'],
  ['Regulatory & Institutional Cost Analysis', 'Structural cost modelling built from what regulators publish about themselves — not industry averages, not internal estimates.'],
  ['Financial & Policy Modelling', 'Royalty structures, fiscal impact frameworks, and sector scenario engines for decisions where the downstream consequences are significant.'],
  ['Public Interest Analysis', 'Independent, sourced analysis of institutional behaviour for journalists, advocates, oversight bodies, and legal teams.'],
];

const HomePage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)] space-y-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="headline-lg">When the numbers need to hold up.</h1>
      </div>
      <p className="text-[18px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
        Careful analysis for decisions that depend on the numbers being right.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto space-y-5">
      <h2 className="headline-md">What DDA Does</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        Organizations make expensive decisions using figures they haven&apos;t checked. A strategy can reach a board, council, or regulator before anyone asks where a key number came from.
      </p>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA checks the inputs, records the source and date, and explains the assumptions behind the result. Public datasets don&apos;t always match the geography or reporting period a decision requires. When they don&apos;t, the analysis says what was estimated and how much that choice affects the result.
      </p>
      <Link to="/method" className="btn-ghost">How we work →</Link>
    </section>

    <section className="max-w-[900px] mx-auto space-y-6">
      <h2 className="headline-md">Services</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map(([title, body]) => (
          <article key={title} className="card space-y-3">
            <h3 className="text-[18px] font-medium leading-[1.3]">{title}</h3>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{body}</p>
          </article>
        ))}
      </div>
      <Link to="/services" className="btn-ghost">All services →</Link>
    </section>

    <section className="max-w-[900px] mx-auto space-y-4">
      <h2 className="headline-md">Who This Is For</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA works with municipalities, regional governments, resource sector operators, government bodies, legal and advisory teams, journalists, and oversight bodies. The common need is straightforward: you&apos;re making a decision or publishing a finding, and you need to know which figures are supported, which are estimates, and which questions the available data can&apos;t answer.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto card space-y-4">
      <h2 className="headline-sm">Contact</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Tell us about the decision and the numbers you need checked.</p>
      <Link to="/contact" className="btn-primary">Get in touch →</Link>
    </section>

    <footer className="max-w-[900px] mx-auto text-[13px] leading-[1.7]" style={{ color: 'var(--text-tertiary)' }}>
      <p><em>DDA — Diagnostics, Dataflow, Analysis</em></p>
      <p><em>Metro Vancouver, BC — Operating nationally</em></p>
      <p><em>{getEmailAddress('primary')}</em></p>
    </footer>
  </div>
);

export default HomePage;
