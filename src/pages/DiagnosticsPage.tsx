import { Link, useLocation } from 'react-router-dom';

const tools = [
  { name: 'WorkSafeBC Repricing Risk Diagnostic', href: '/worksafebc-repricing-risk-diagnostic', status: 'Live', desc: 'Model repricing exposure using scenario pathways and sector benchmarks.' },
  { name: 'PST Diagnostic Tool', href: '/tools/pst-diagnostic', status: 'Live', desc: 'Quantify BC PST expansion cost impacts and behavioural response scenarios.' },
  { name: 'Mental Health Claims Surge Forecaster', href: '/tools/mental-health-forecaster', status: 'Live', desc: 'Forecast accepted claim volume, projected costs, and mitigation actions.' },
  { name: 'Multi-Province Surplus & Rate Comparator', href: '/tools/province-comparator', status: 'Live', desc: 'Compare rates, funded ratios, surpluses, and cross-province differentials.' },
  { name: 'Claims Suppression Self-Audit', href: '/tools/suppression-audit', status: 'Live', desc: 'Run a 15-question audit with suppression risk and Section 73 exposure range.' },
  { name: 'Experience Rating Optimizer', href: '/tools/experience-rating-optimizer', status: 'Live', desc: 'Estimate true risk-adjusted rate and identify appeal/RTW action triggers.' },
  { name: 'Surplus Run-Down Early-Warning Alert Service', href: '/tools/surplus-alert', status: 'Coming Soon', desc: 'Track funded-ratio erosion and prepare for threshold-triggered repricing shifts.' },
];

const DiagnosticsPage = () => {
  const location = useLocation();

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Diagnostics</p>
        <h1 className="headline-lg max-w-4xl">Diagnostic Tools</h1>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 grid gap-6">
        {tools.map((tool) => (
          <article className="card space-y-4 max-w-4xl" key={tool.name}>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">{tool.status}</p>
            <h2 className="font-heading text-3xl">{tool.name}</h2>
            <p className="text-[#F3EFE6]/80">{tool.desc}</p>
            <div>
              <Link to={tool.href} state={{ from: location.pathname }} className="btn-primary">Open tool</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DiagnosticsPage;
