import { Link } from 'react-router-dom';

const services = [
  ['Economic & Regional Strategy', 'Growth frameworks, labour market plans, and economic strategies built from primary sources with a complete audit trail on every number.'],
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
        Every input sourced. Every assumption named. Every gap declared.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto space-y-5">
      <h2 className="headline-md">What DDA Does</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        Organizations make expensive decisions based on numbers they haven&apos;t verified. Strategies go to a board, a council, or a regulator — and fall apart the moment someone asks a hard question about where the figures came from.
      </p>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA produces the analytical foundation those decisions should be built on. The work is forensic: every number is traced to a named primary source, every limitation in the data is stated explicitly, and the analysis is structured to hold up when it&apos;s challenged — because it was built to be challenged.
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
        Municipalities and regional governments that need planning documents built to survive scrutiny. Resource sector operators whose capital projects depend on assumptions that need to be tested before commitments are made. Government bodies that need independent modelling with a clear chain of custody on every input. Legal and advisory teams that need institutional analysis sourced entirely from verifiable public records. Journalists and oversight bodies that need findings they can stand behind.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto card space-y-4">
      <h2 className="headline-sm">Contact</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Describe what&apos;s at stake and what kind of analysis you need to defend.</p>
      <Link to="/contact" className="btn-primary">Get in touch →</Link>
    </section>

    <footer className="max-w-[900px] mx-auto text-[13px] leading-[1.7]" style={{ color: 'var(--text-tertiary)' }}>
      <p><em>DDA — Diagnostics, Dataflow, Analysis</em></p>
      <p><em>Metro Vancouver, BC — Operating nationally</em></p>
      <p><em>david.doyle@ddanalytics.ca</em></p>
    </footer>
  </div>
);

export default HomePage;
