import { getEmailAddress } from '@/lib/email';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Economic & Regional Strategy',
    body: 'Khan leads municipal economic development work, with Doyle responsible for the supporting analysis. We prepare growth frameworks, labour market plans, and economic strategies from named public sources.',
    lead: 'Led by Khan, Municipal Economic Development',
  },
  {
    title: 'Land Use & Planning Analysis',
    body: 'Callihoo leads employment lands reviews, housing needs assessments, and community planning work. We check policy assumptions against current land, housing, and population records.',
    lead: 'Led by Callihoo, RPP, MCIP',
  },
  {
    title: 'Labour Market & Workforce Risk',
    body: 'Doyle leads supply analysis for projects that depend on workers being available by trade, place, and date. Public occupation data cannot confirm whether a qualified worker is available for a particular site or shift, so we state where the result remains an estimate.',
    lead: 'Led by Doyle, Data Analyst',
  },
  {
    title: 'Regulatory & Institutional Cost Analysis',
    body: 'Callihoo leads the regulatory work and Doyle builds the cost analysis. We use published rate schedules, financial statements, decisions, and legislation rather than treating an industry average as a firm-specific result.',
    lead: 'Led by Callihoo, RPP, MCIP, with Doyle, Data Analyst',
  },
  {
    title: 'Financial & Policy Modelling',
    body: 'Doyle builds royalty, fiscal impact, and policy models. Inputs link back to a source or a stated assumption, and the files show how results change when those inputs move.',
    lead: 'Led by Doyle, Data Analyst',
  },
  {
    title: 'Public Interest & Engagement',
    body: 'Carroll Goldman leads engagement and communications, and Doyle handles the analysis. We prepare sourced public-record analysis and explain the findings in language people can use in a meeting, submission, or public report.',
    lead: 'Led by Carroll Goldman, Engagement and Communications, with Doyle, Data Analyst',
  },
];

const HomePage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)] space-y-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="headline-lg">When the numbers need to hold up.</h1>
      </div>
      <p className="text-[18px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
        DDA is a small, credentialed firm with planning, economic development, analysis, and engagement professionals. We prepare source-traced work for public decisions that will be questioned.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto space-y-5">
      <h2 className="headline-md">What DDA Does</h2>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        If you&apos;re spending public money, the work may go before council, an auditor, or an access-to-information reviewer. We build the record with that in mind. A reader can trace a key figure to its source, date, and calculation instead of relying on a polished summary alone.
      </p>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA checks the inputs, records the source and date, and explains the assumptions behind the result. Public datasets don&apos;t always match the geography or reporting period a decision requires. When they don&apos;t, the analysis says what was estimated and how much that choice affects the result.
      </p>
      <Link to="/method" className="btn-ghost">How we work →</Link>
    </section>

    <section id="services" className="max-w-[900px] mx-auto space-y-6 scroll-mt-20">
      <h2 className="headline-md">Services</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="card space-y-3">
            <h3 className="text-[18px] font-medium leading-[1.3]">{service.title}</h3>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{service.body}</p>
            <p className="text-[12px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{service.lead}</p>
          </article>
        ))}
      </div>
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
