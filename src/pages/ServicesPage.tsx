import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Economic & Regional Strategy',
    href: '/services/economic-regional-strategy',
    body: 'Growth frameworks, economic development strategies, labour market plans, and regional investment frameworks built from primary-source data — Statistics Canada, CMHC, provincial databases, municipal records — with a complete audit trail on every number in the document. Decision-makers receive a strategy they can defend at a council table, a board meeting, or a public hearing.',
  },
  {
    title: 'Land Use & Planning Analysis',
    href: '/services/land-use-planning',
    body: "Employment lands reviews, official community plans, housing needs assessments, and urban growth frameworks. The work identifies where current policy is built on data that no longer reflects ground conditions — mismatched density assumptions, stale land inventories, supply calculations that assume capacity that doesn't exist. Clients receive a precise account of what the evidence shows, including what it does not yet support.",
  },
  {
    title: 'Labour Market & Workforce Risk',
    href: '/services/labour-market-workforce-risk',
    body: 'Workforce supply analysis for operators and project proponents making capital commitments that depend on having people available to do the work. DDA quantifies what a regional labour market can and cannot deliver — across specific trades, specific timelines, and specific cost scenarios — before commitments are made.',
  },
  {
    title: 'Regulatory & Institutional Cost Analysis',
    href: '/services/regulatory-institutional-cost',
    body: "Structural cost modelling built from the primary data that regulators publish about themselves. What an organization is actually paying, why the number moves, and what is genuinely within management's control versus what is systemic. Built from the published record, not from industry benchmarks or internal assumptions.",
  },
  {
    title: 'Financial & Policy Modelling',
    href: '/services/financial-policy-modelling',
    body: 'Large-scale financial and economic models for complex policy environments — royalty structures, sector scenario engines, jurisdiction benchmarks, fiscal impact frameworks. Work structured to inform decisions where the downstream consequences are significant and the inputs need to be defensible.',
  },
  {
    title: 'Public Interest Analysis',
    href: '/public-interest',
    body: 'Independent analysis of institutional behaviour where the subject matter is a matter of public record and public consequence. Built to the same evidentiary standard as commissioned work. Used by journalists, advocates, oversight bodies, policymakers, and legal teams who need findings they can stand behind.',
  },
];

const ServicesPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-5 pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
      <h1 className="headline-md">Services</h1>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA produces analytical work product for organizations whose decisions will be scrutinized — by a council, a board, a regulator, a court, or the public. Every engagement is built to the same standard: named primary sources, declared data gaps, assumptions labelled as verified or modelled. The analysis holds up because it was designed to.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto mt-[var(--space-7)] space-y-8">
      {services.map((service) => (
        <article key={service.title} className="space-y-3 pb-8 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="headline-sm">{service.title}</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{service.body}</p>
          <Link to={service.href} className="btn-ghost">{service.title} →</Link>
        </article>
      ))}
    </section>

    <section className="max-w-[900px] mx-auto mt-[var(--space-8)] card space-y-4">
      <p className="text-[16px]">Describe what you need to defend.</p>
      <Link to="/contact" className="btn-primary">Contact →</Link>
    </section>
  </div>
);

export default ServicesPage;
