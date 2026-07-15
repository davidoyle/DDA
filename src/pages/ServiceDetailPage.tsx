import { Link, Navigate, useParams } from 'react-router-dom';

type ServiceDetail = {
  title: string;
  whatItIs: string;
  builtFrom: string[];
  receives: string;
  needed: string;
};

const serviceDetails: Record<string, ServiceDetail> = {
  'economic-regional-strategy': {
    title: 'Economic & Regional Strategy',
    whatItIs: 'Economic development strategies, labour market plans, regional growth frameworks, and investment attraction analyses. These are the documents that governments and regional bodies use to set direction, allocate resources, and make the case to external stakeholders that their region is a credible place to invest, operate, or build.',
    builtFrom: ['Statistics Canada Census and custom tabulations', 'CMHC rental market reports and housing data', 'BC Stats municipal population estimates', 'Provincial employment and labour force data', 'Federal and provincial funding program records', 'Municipal budgets, official plans, and zoning instruments', 'Industry-specific databases where primary sources exist'],
    receives: "A strategy document that can survive a hard question from a council member, a provincial reviewer, or a competing interest — because every claim in it is traceable to a named source with a release date, and every limitation in the data is declared rather than concealed. Not a consulting template with the client's name substituted in. An analytical instrument.",
    needed: 'Before a major economic strategy renewal. Before a significant capital or infrastructure decision that depends on regional growth assumptions. When a previous strategy has been challenged and the evidentiary foundation needs to be rebuilt. When a funding submission requires defensible economic analysis.',
  },
  'land-use-planning': {
    title: 'Land Use & Planning Analysis',
    whatItIs: 'Employment lands reviews, official community plans, housing needs assessments, capacity analyses, and urban growth frameworks. The work that determines what a community can build, where, at what density, and on what timeline — and whether the policy instruments in place are consistent with what the underlying data actually shows.',
    builtFrom: ['Municipal OCP and zoning bylaws', 'Provincial housing needs report templates and data', 'Statistics Canada Census and National Household Survey data', 'CMHC building permit and housing start data', 'Regional district planning documents', 'Parcel fabric and land registry records', 'Servicing capacity assessments', 'Environmental constraint mapping', 'Historical development permit and building permit records'],
    receives: 'Analysis that identifies precisely where policy assumptions diverge from ground conditions — where density targets are not being met and why, where land supply calculations overstate functional availability, where zoning instruments and OCP designations are internally inconsistent. Delivered in a format that is ready for council presentation, provincial compliance review, or public hearing.',
    needed: 'Before an OCP review or update. When a housing needs assessment is required under provincial statute. When employment land conversion pressure requires a defensible supply analysis. When a development application or policy challenge requires independent analysis of what the planning record actually shows.',
  },
  'labour-market-workforce-risk': {
    title: 'Labour Market & Workforce Risk',
    whatItIs: 'Workforce supply analysis for capital projects, resource operations, and large employers whose ability to execute depends on having the right people available in the right place at the right time. DDA quantifies what a regional labour market can and cannot deliver — not in aggregate, but by trade, by certification level, by timeline, and by dollar cost of failure.',
    builtFrom: ['BuildForce Canada trade labour demand and supply projections', 'Statistics Canada Labour Force Survey and Census occupation data', 'Employment and Social Development Canada apprenticeship and certification records', 'Regional college and trades training program data', 'Indigenous labour force participation data', 'Project pipeline data for competing capital projects in the same region drawing from the same labour pool'],
    receives: 'A labour risk assessment that identifies the specific trades where supply constraints will bind, the timeline at which each constraint becomes critical, the cost of schedule delay under multiple slip scenarios, and the specific mitigation actions — training partnerships, Indigenous workforce programs, housing strategy — that alter the risk profile before it becomes a cost. Three-audience versions available: board level, operational level, financing/regulatory level.',
    needed: 'Before a major capital commitment in a region with constrained labour supply. When a project financing or regulatory submission requires a credible workforce supply analysis. When previous labour projections have proven optimistic and the project is approaching the critical path.',
  },
  'regulatory-institutional-cost': {
    title: 'Regulatory & Institutional Cost Analysis',
    whatItIs: "Structural cost modelling of regulatory environments — workers' compensation systems, provincial tax regimes, licensing frameworks, compliance obligations — built from the primary data those regulators publish about themselves. What an organization is actually paying into these systems, why that number moves, and what is genuinely within management's control versus what is systemic and non-negotiable.",
    builtFrom: ['Regulatory body annual reports, financial statements, and actuarial valuations', 'Rate schedules, classification unit experience data, and sector benchmarks', 'Provincial tax legislation and administrative guidance', 'Enforcement records and decision databases', 'Jurisdiction comparisons using equivalent primary sources across provinces'],
    receives: 'A cost model that distinguishes what is systemic from what is controllable — and quantifies both. Not an industry average. Not an internal estimate. A model built from what the regulator publishes about itself, with explicit confidence levels on every figure and explicit flags where the published record is insufficient to support a reliable estimate.',
    needed: 'When an organization needs to understand why its regulatory cost exposure differs from sector norms. When a significant policy change — rate adjustments, legislative amendments, classification changes — requires a credible assessment of financial impact. When a legal or advocacy proceeding requires independent analysis of institutional cost structures.',
  },
  'financial-policy-modelling': {
    title: 'Financial & Policy Modelling',
    whatItIs: 'Large-scale financial and economic models for government bodies, Crown corporations, and major institutional clients making policy decisions with significant fiscal consequences. Royalty structures and revenue modelling. Sector scenario engines. Jurisdiction benchmarking. Fiscal impact frameworks. Models built to inform decisions, survive audit, and be handed to a successor analyst without losing integrity.',
    builtFrom: ['Government financial statements and public accounts', 'Federal and provincial fiscal framework documents', 'Industry financial data from regulatory filings', 'Jurisdiction comparisons from equivalent primary sources', 'Economic modelling grounded in named assumptions with explicit sensitivity analysis showing how outputs change when inputs change'],
    receives: 'A model that is transparent about its own architecture — where the assumptions are, what happens when they move, and what the published evidence does and does not support. Delivered with full documentation so that the model can be interrogated, stress-tested, and updated as conditions change. Not a black box.',
    needed: 'When a major policy decision requires an economic model that can be defended under scrutiny. When a royalty framework, fiscal regime, or sector strategy requires independent analysis of revenue and cost scenarios. When a government body needs a modelling tool that will outlast the engagement and remain useful as the underlying data changes.',
  },
};

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const service = serviceSlug ? serviceDetails[serviceSlug] : undefined;

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <article className="max-w-[900px] mx-auto space-y-8">
        <h1 className="headline-md">{service.title}</h1>
        <section className="space-y-3">
          <h2 className="headline-sm">What it is</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{service.whatItIs}</p>
        </section>
        <section className="space-y-3">
          <h2 className="headline-sm">What it&apos;s built from</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{service.builtFrom.join('. ')}.</p>
          {serviceSlug === 'economic-regional-strategy' ? (
            <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
              Every number that enters the analysis is registered in a Data Lexicon — a sourced, auditable record that identifies whether each figure is an actual extract from a named document, a derived proxy with the derivation shown step by step, or a declared gap where no reliable source exists. The Lexicon is delivered as a standard appendix to every engagement.
            </p>
          ) : null}
        </section>
        <section className="space-y-3">
          <h2 className="headline-sm">What the client receives</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{service.receives}</p>
        </section>
        <section className="space-y-3">
          <h2 className="headline-sm">When it&apos;s needed</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>{service.needed}</p>
        </section>
        <Link to="/contact" className="btn-primary">Contact DDA about this service →</Link>
      </article>
    </div>
  );
};

export default ServiceDetailPage;
