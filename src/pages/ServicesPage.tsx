import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Economic & Regional Strategy',
    href: '/services/economic-regional-strategy',
    body: 'Growth frameworks, economic development strategies, labour market plans, and regional investment frameworks using Statistics Canada, CMHC, provincial databases, and municipal records. Key figures include the source and release date. Where those sources cover different periods or boundaries, the work explains the adjustment rather than treating them as directly comparable.',
  },
  {
    title: 'Land Use & Planning Analysis',
    href: '/services/land-use-planning',
    body: "Employment lands reviews, official community plans, housing needs assessments, and urban growth frameworks. The work checks whether density assumptions, land inventories, and supply calculations still match current records. Parcel inventories can lag recent approvals, so the result identifies the inventory date and any capacity that could not be verified.",
  },
  {
    title: 'Labour Market & Workforce Risk',
    href: '/services/labour-market-workforce-risk',
    body: 'Workforce supply analysis for operators and project proponents making capital commitments that depend on having people available to do the work. DDA estimates supply by trade, timeline, and cost scenario before commitments are made. Public occupation data rarely shows whether a qualified worker is available for a particular shift or site, so that part remains an estimate.',
  },
  {
    title: 'Regulatory & Institutional Cost Analysis',
    href: '/services/regulatory-institutional-cost',
    body: "Cost modelling based on regulators' published data. It shows what an organization is paying, why the amount moves, and which inputs management can change. Published totals don't always include firm-level or rate-group detail. Where that detail is unavailable, the model labels the estimate and shows the range it creates.",
  },
  {
    title: 'Financial & Policy Modelling',
    href: '/services/financial-policy-modelling',
    body: 'Financial and economic models for royalty structures, sector scenarios, jurisdiction comparisons, and fiscal impacts. Inputs are linked to their sources, and modelled values are kept separate from reported figures so you can see what drives the result.',
  },
  {
    title: 'Public Interest Analysis',
    href: '/public-interest',
    body: 'Independent analysis of public records for journalists, advocates, oversight bodies, policymakers, and legal teams. The work sets out what the records show and where the available material is incomplete.',
  },
];

const ServicesPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-5 pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
      <h1 className="headline-md">Services</h1>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA produces analysis for decisions going to a council, board, regulator, court, or the public. Key figures point to named primary sources. Assumptions are labelled as reported or modelled, and missing data is stated plainly.
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
      <p className="text-[16px]">Tell us about the decision and the numbers you need checked.</p>
      <Link to="/contact" className="btn-primary">Contact →</Link>
    </section>
  </div>
);

export default ServicesPage;
