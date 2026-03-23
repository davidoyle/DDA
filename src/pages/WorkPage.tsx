import DdaLogo from '../components/DdaLogo';
import { Link } from 'react-router-dom';

const header = {
  eyebrow: 'Examples of work',
  headline: 'What the method produces',
  body: 'Three analyses across different sectors and institution types. Each one built from public documents only. Each one verifiable.',
};

const caseStudies = [
  {
    tag: 'Institutional response analysis — public safety',
    title: 'Surrey Extortion Crisis',
    description:
      'Multi-source synthesis of institutional response data, enforcement records, and public communications across the 2023–2024 crisis period.',
    finding:
      'Detection lag of three months from surge onset to formal coordination. Provincial-local messaging divergence eroding credibility while enforcement activity continued. System design failures: no forecasting mechanism, ad-hoc task force assembly, no throughput transparency. Complete policy redesign framework produced with phased implementation, cost estimates, and scenario modeling.',
  },
  {
    tag: 'System strain analysis — education',
    title: 'BC Teacher Workload and Attrition',
    description:
      'Synthesis of membership survey data, resignation rates, funding comparisons, and staffing ratios across the BC education system.',
    finding:
      '50.6% workload increases despite post-pandemic recovery. Reported commitments to EA coverage unfulfilled in data. BC ranks 8th in per-student funding, below national average. Attrition and replacement costs exceed $85–121M annually. Targeted $50–75M investment in support staffing identified as yielding measurable ROI. Policy framework produced tying funding to measurable accountability benchmarks.',
  },
  {
    tag: 'Service delivery analysis — procurement',
    title: 'Regional Procurement Bottleneck',
    description:
      'Assessment of procurement logs, bid-cycle durations, vendor concentration, and contract amendments across interconnected departments.',
    finding:
      'Repeated queue bottlenecks at approval gates. Recurring emergency procurement spend tied to preventable scheduling drift. Avoidable administrative overhead and delivery delays quantified across departments. Evidence framework used by operational leaders to redesign approval pathways and improve delivery reliability.',
  },
];

const workFooter = {
  body: 'Every analysis is built from public documents. No privileged access required. Everything is verifiable and replicable.',
  ctas: [
    { label: 'Describe your system', href: '/contact', variant: 'primary' },
    { label: 'See service tiers', href: '/services', variant: 'secondary' },
  ],
};

const WorkPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel max-w-5xl space-y-4">
        <DdaLogo compact className="mb-4" />
        <p className="eyebrow">{header.eyebrow}</p>
        <h1 className="headline-md">{header.headline}</h1>
        <p className="text-xl text-[#F3EFE6]/85">{header.body}</p>
      </section>

      <section className="max-w-5xl space-y-8">
        {caseStudies.map((study, index) => (
          <section key={study.title} className="space-y-3">
            <p className="case-tag">{study.tag}</p>
            <h2 className="font-heading text-3xl">{study.title}</h2>
            <p className="text-[#F3EFE6]/85">{study.description}</p>
            <div className="finding-block">
              <p className="finding-label">What the analysis found</p>
              <p>{study.finding}</p>
            </div>
            {index < caseStudies.length - 1 ? <hr className="border-[#F3EFE6]/20" /> : null}
          </section>
        ))}
      </section>

      <section className="max-w-5xl card space-y-5">
        <p className="text-[#F3EFE6]/85">{workFooter.body}</p>
        <div className="flex flex-wrap gap-3">
          {workFooter.ctas.map((cta) => (
            <Link
              key={cta.label}
              to={cta.href}
              className={cta.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
