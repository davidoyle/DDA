import { Link } from 'react-router-dom';
import DdaLogo from '../components/DdaLogo';

const services = [
  ['Economic & Regional Strategy', 'Growth frameworks, labour market plans, and economic strategies built from primary sources with a complete audit trail on every number.'],
  ['Land Use & Planning Analysis', "Employment lands reviews, housing needs assessments, and community plans that identify where policy assumptions diverge from what the data actually shows."],
  ['Labour Market & Workforce Risk', 'Supply analysis for operators making capital commitments that depend on people being available to do the work — by trade, by timeline, by cost scenario.'],
  ['Regulatory & Institutional Cost Analysis', 'Structural cost modelling built from what regulators publish about themselves — not industry averages, not internal estimates.'],
  ['Financial & Policy Modelling', 'Royalty structures, fiscal impact frameworks, and sector scenario engines for decisions where the downstream consequences are significant.'],
  ['Public Interest Analysis', 'Independent, sourced analysis of institutional behaviour for journalists, advocates, oversight bodies, and legal teams.'],
];

const HomePage = () => (
  <div className="overflow-hidden">
    <section className="relative px-6 py-20 sm:py-24 lg:px-16 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(26,25,22,0.10),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(115,130,182,0.18),transparent_32%)]" />
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <DdaLogo className="text-[var(--text-primary)]" />
          <div className="space-y-5">
            <p className="eyebrow">Diagnostics, Dataflow, Analysis</p>
            <h1 className="headline-lg max-w-[780px]">When the numbers need to hold up.</h1>
            <p className="max-w-[560px] text-[20px] leading-[1.65]" style={{ color: 'var(--text-secondary)' }}>
              Every input sourced. Every assumption named. Every gap declared.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">Describe your situation →</Link>
            <Link to="/method" className="btn-secondary">How we work</Link>
          </div>
        </div>

        <div className="card relative overflow-hidden p-0 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
          <div className="border-b px-6 py-4" style={{ borderColor: 'var(--border)' }}>
            <p className="eyebrow">Analytical chain of custody</p>
          </div>
          <div className="space-y-0 divide-y" style={{ borderColor: 'var(--border)' }}>
            {['Every input sourced.', 'Every assumption named.', 'Every gap declared.'].map((item, index) => (
              <div key={item} className="flex items-center gap-4 px-6 py-6" style={{ borderColor: 'var(--border)' }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-secondary)' }}>
                  0{index + 1}
                </span>
                <p className="text-xl font-medium tracking-[-0.02em]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 py-16 lg:px-16">
      <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-3">What DDA Does</p>
          <h2 className="headline-md">What DDA Does</h2>
        </div>
        <div className="space-y-6">
          <p className="text-[17px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            Organizations make expensive decisions based on numbers they haven&apos;t verified. Strategies go to a board, a council, or a regulator — and fall apart the moment someone asks a hard question about where the figures came from.
          </p>
          <p className="text-[17px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            DDA produces the analytical foundation those decisions should be built on. The work is forensic: every number is traced to a named primary source, every limitation in the data is stated explicitly, and the analysis is structured to hold up when it&apos;s challenged — because it was built to be challenged.
          </p>
          <Link to="/method" className="btn-ghost">How we work →</Link>
        </div>
      </div>
    </section>

    <section className="px-6 py-16 lg:px-16" style={{ background: 'var(--bg-surface)' }}>
      <div className="mx-auto max-w-[1120px] space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-3">Services</p>
            <h2 className="headline-md">Services</h2>
          </div>
          <Link to="/services" className="btn-ghost">All services →</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map(([title, body]) => (
            <article key={title} className="card group h-full space-y-4 transition duration-150 hover:-translate-y-1 hover:border-[var(--border-strong)]">
              <div className="h-1 w-12 rounded-full bg-[var(--text-primary)] opacity-70 transition group-hover:w-20" />
              <h3 className="text-[19px] font-medium leading-[1.3] tracking-[-0.01em]">{title}</h3>
              <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-6 py-16 lg:px-16">
      <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-3">Who This Is For</p>
          <h2 className="headline-md">Who This Is For</h2>
        </div>
        <p className="text-[17px] leading-[1.85]" style={{ color: 'var(--text-secondary)' }}>
          Municipalities and regional governments that need planning documents built to survive scrutiny. Resource sector operators whose capital projects depend on assumptions that need to be tested before commitments are made. Government bodies that need independent modelling with a clear chain of custody on every input. Legal and advisory teams that need institutional analysis sourced entirely from verifiable public records. Journalists and oversight bodies that need findings they can stand behind.
        </p>
      </div>
    </section>

    <section className="px-6 py-16 lg:px-16">
      <div className="mx-auto grid max-w-[1120px] gap-6 rounded-lg border p-8 md:grid-cols-[1fr_auto] md:items-center" style={{ background: 'var(--text-primary)', borderColor: 'var(--text-primary)', color: 'var(--bg-base)' }}>
        <div className="space-y-3">
          <h2 className="headline-sm">Contact</h2>
          <p className="max-w-[620px] opacity-80">Describe what&apos;s at stake and what kind of analysis you need to defend.</p>
        </div>
        <Link to="/contact" className="btn-secondary border-[var(--bg-base)] text-[var(--bg-base)] hover:bg-[var(--bg-base)] hover:text-[var(--text-primary)]">Get in touch →</Link>
      </div>
    </section>

    <footer className="mx-auto max-w-[1120px] px-6 pb-16 text-[13px] leading-[1.7] lg:px-16" style={{ color: 'var(--text-tertiary)' }}>
      <DdaLogo compact className="mb-5 text-[var(--text-primary)]" />
      <p><em>DDA — Diagnostics, Dataflow, Analysis</em></p>
      <p><em>Metro Vancouver, BC — Operating nationally</em></p>
      <p><em>david.doyle@ddanalytics.ca</em></p>
    </footer>
  </div>
);

export default HomePage;
