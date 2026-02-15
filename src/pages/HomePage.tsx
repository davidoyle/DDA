import { Link } from 'react-router-dom';

const serviceCategories = [
  {
    title: 'Regulatory & Compliance Systems',
    audience: 'Government agencies, regulatory bodies, compliance-driven organizations',
    analysis: 'Enforcement effectiveness, policy implementation, systemic bias',
    work: 'WorkSafeBC enforcement analysis, penalty pattern identification, regulatory capture documentation.',
  },
  {
    title: 'Financial & Operational Systems',
    audience: 'Public and private sector leaders, CFOs, budget authorities',
    analysis: 'Cost structures, budget impacts, financial sustainability',
    work: 'Municipal repricing analysis, Manulife risk diagnostic, $570M surplus gap, $10B cost-shift to taxpayers.',
  },
  {
    title: 'Organizational & Advocacy Systems',
    audience: 'Unions, associations, membership organizations',
    analysis: 'Member outcomes, advocacy effectiveness, strategic alignment',
    work: 'CFIB value audit (35% alignment), BCTF member ROI (0.0015), union acceptance gap ($111M), ILWU differential.',
  },
];

const HomePage = () => {
  return (
    <div className="pt-24 pb-20 px-6 lg:px-[8vw] space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="space-y-6 max-w-3xl">
          <p className="eyebrow">DDA</p>
          <h1 className="headline-lg">Institutional Systems Analysis</h1>
          <p className="text-xl text-[#F3EFE6]/85 max-w-2xl">
            Evidence-based diagnostics for public and private sector leaders.
          </p>
          <p className="body-text body-text-secondary max-w-2xl">
            Organizations operate on assumptions about how their systems work. When those assumptions diverge from reality, the cost compounds silently until crisis forces recognition. DDA provides forensic institutional analysis: we identify systemic failures, quantify their impact, and recommend structural reforms grounded in verifiable evidence.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link to="/services" className="btn-primary">View Service Offerings</Link>
            <Link to="/contact" className="btn-secondary">Request a Preliminary Assessment</Link>
          </div>
        </div>
        <div className="card p-8">
          <h2 className="font-heading text-2xl mb-6">Assumed vs. Actual Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-[#F3EFE6]/70 mb-2">
                <span>Assumed performance</span>
                <span>89%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#F3EFE6]/10 overflow-hidden">
                <div className="h-full w-[89%] bg-[#D4A03A]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-[#F3EFE6]/70 mb-2">
                <span>Actual performance</span>
                <span>52%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#F3EFE6]/10 overflow-hidden">
                <div className="h-full w-[52%] bg-[#6FC3D0]" />
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-[#F3EFE6]/65">
            DDA quantifies hidden deltas between expected system outcomes and measurable institutional results.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3 max-w-3xl">
          <p className="eyebrow">Three Service Categories</p>
          <h2 className="headline-md">Diagnostics aligned to institutional risk domains</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <article key={category.title} className="card space-y-4">
              <h3 className="font-heading text-xl">{category.title}</h3>
              <p className="text-sm text-[#F3EFE6]/75"><strong>For:</strong> {category.audience}</p>
              <p className="text-sm text-[#F3EFE6]/75"><strong>We analyze:</strong> {category.analysis}</p>
              <p className="text-sm text-[#F3EFE6]/75"><strong>DDA examples:</strong> {category.work}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
