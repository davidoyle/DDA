import { getEmailAddress } from '@/lib/email';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Economic and regional strategy',
    body: 'An economic development strategy with priorities, a KPI framework, and sequenced implementation steps. Recommendations identify who should lead each action and when it should happen.',
  },
  {
    title: 'Land-use planning',
    body: 'An employment lands review, housing needs assessment, community plan, or growth framework that sets out the planning choices and the evidence behind them.',
  },
  {
    title: 'Labour market and workforce planning',
    body: 'A workforce plan that identifies likely shortages by occupation and timing, estimates the effect on delivery, and recommends practical responses.',
  },
  {
    title: 'Regulatory and institutional costs',
    body: 'A cost assessment that shows what is driving the amount you pay, which factors you can change, and where a policy or operational intervention is worthwhile.',
  },
  {
    title: 'Financial and policy modelling',
    body: 'A documented model, scenario results, and recommendations for decisions about fiscal impacts, royalty structures, or policy options.',
  },
  {
    title: 'Public-interest analysis',
    body: 'A clear account of what public records support, what remains uncertain, and what those findings mean for a policy, legal, or reporting decision.',
  },
];

const HomePage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)] space-y-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-6">
      <h1 className="headline-lg">Strategy and direction you can act on.</h1>
      <p className="text-[18px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
        DDA builds strategies, plans, KPI frameworks, and recommendations with clear owners and timelines. You receive practical direction for the decision in front of you, not analysis without a next step.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto space-y-5">
      <h2 className="headline-md">Why you can rely on it</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        The advice is based on analysis that can be traced back to named sources. DDA records assumptions, calculations, dates, and gaps so you can see what the evidence supports and where judgement is still required.
      </p>
      <Link to="/method" className="btn-ghost">Read about the method →</Link>
    </section>

    <section className="max-w-[900px] mx-auto space-y-6">
      <h2 className="headline-md">What you can get</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map(({ title, body }) => (
          <article key={title} className="card space-y-3">
            <h3 className="text-[18px] font-medium leading-[1.3]">{title}</h3>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{body}</p>
          </article>
        ))}
      </div>
    </section>

    <section className="max-w-[900px] mx-auto space-y-4">
      <h2 className="headline-md">Who this is for</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA works with municipalities, regional governments, public bodies, resource operators, legal and advisory practices, journalists, and oversight bodies. The work starts with a decision you need to make and ends with a plan or set of recommendations you can use.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto card space-y-4">
      <h2 className="headline-sm">Start a conversation</h2>
      <p style={{ color: 'var(--text-secondary)' }}>Tell David what decision you are facing and what you need to have in hand.</p>
      <Link to="/contact" className="btn-primary">Get in touch →</Link>
    </section>

    <footer className="max-w-[900px] mx-auto text-[13px] leading-[1.7]" style={{ color: 'var(--text-tertiary)' }}>
      <p><em>DDA, Diagnostics, Dataflow, Analysis</em></p>
      <p><em>Metro Vancouver, BC. Operating nationally.</em></p>
      <p><em>{getEmailAddress('primary')}</em></p>
    </footer>
  </div>
);

export default HomePage;
