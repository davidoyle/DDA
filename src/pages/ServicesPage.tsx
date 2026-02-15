const diagnosticTiers = [
  {
    tier: 'Standard Diagnostic',
    scope: 'Single institutional system',
    deliverable: '20-30 page evidence-based report with quantified findings',
    timeline: '3-4 weeks',
    price: '$5,000',
  },
  {
    tier: 'Comprehensive Diagnostic',
    scope: 'System + comparative analysis + stakeholder context',
    deliverable: '50+ page report with implementation recommendations',
    timeline: '6-8 weeks',
    price: '$15,000',
  },
  {
    tier: 'Strategic Assessment',
    scope: 'Multiple systems + systemic interdependencies + 3-5 year projections',
    deliverable: 'Executive brief + full technical report + implementation roadmap',
    timeline: '8-12 weeks',
    price: '$25,000',
  },
];

const specializedServices = [
  {
    service: 'Litigation Support',
    description: 'Comprehensive evidentiary synthesis, precedent mapping, expert witness coordination',
    range: '$12,000-$25,000',
  },
  {
    service: 'Legislative & Policy Analysis',
    description: 'Bill/policy impact assessment, stakeholder analysis, reform recommendations',
    range: '$10,000-$20,000',
  },
  {
    service: 'Investigative Research',
    description: 'Multi-source synthesis, data visualization, publication-ready findings',
    range: '$2,000-$5,000 per investigation',
  },
];

const ServicesPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">Service Offerings</p>
        <h1 className="headline-md">Diagnostic Assessments (Entry Point)</h1>
        <p className="body-text body-text-secondary">
          Every engagement begins with a scoped diagnostic. From there, DDA maps inquiry patterns to the right product pathway and implementation depth.
        </p>
      </section>

      <section className="overflow-x-auto">
        <table className="min-w-full border border-[#F3EFE6]/20 rounded-xl overflow-hidden text-left">
          <thead className="bg-[#F3EFE6]/10">
            <tr>
              <th className="p-4">Tier</th>
              <th className="p-4">Scope</th>
              <th className="p-4">Deliverable</th>
              <th className="p-4">Timeline</th>
              <th className="p-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {diagnosticTiers.map((item) => (
              <tr key={item.tier} className="border-t border-[#F3EFE6]/15 align-top">
                <td className="p-4 font-semibold">{item.tier}</td>
                <td className="p-4 text-[#F3EFE6]/80">{item.scope}</td>
                <td className="p-4 text-[#F3EFE6]/80">{item.deliverable}</td>
                <td className="p-4 text-[#F3EFE6]/80">{item.timeline}</td>
                <td className="p-4 text-[#D4A03A] font-semibold">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">Specialized Services</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {specializedServices.map((item) => (
            <article key={item.service} className="card space-y-3">
              <h3 className="font-heading text-xl">{item.service}</h3>
              <p className="text-[#F3EFE6]/80 text-sm">{item.description}</p>
              <p className="text-[#D4A03A] font-semibold">{item.range}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
