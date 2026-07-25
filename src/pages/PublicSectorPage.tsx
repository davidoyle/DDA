import { Link } from 'react-router-dom';

const deliverables = [
  {
    title: 'A planning document ready for use',
    body: 'The final strategy sets out the preferred direction, planning choices, performance measures, responsibilities, and a sequence for implementation. Supporting material is prepared for council review and the statutory process required by the scope.',
  },
  {
    title: 'Growth and land-use models',
    body: 'Forecast and demand results are connected to allocation and feasibility across the spatial options under review. Capacity and infrastructure constraints remain visible, and projections stop at the documented study endpoint.',
  },
  {
    title: 'Council and public materials',
    body: 'The engagement can include council orientation, scenario workshops, and public-facing material in both official languages when required. The format and timing are agreed at the start of the assignment.',
  },
  {
    title: 'An evidence record',
    body: 'Key numbers point to their sources and calculations. Geographic boundaries and adjustments are documented so a census subdivision is not treated as though it were the same as a larger metropolitan area.',
  },
];

const PublicSectorPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <section className="max-w-[800px] mx-auto space-y-4 py-[var(--space-7)] border-y" style={{ borderColor: 'var(--border-strong)' }}>
      <h1 className="headline-md">A municipal plan with a clear path to implementation.</h1>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        DDA prepares growth strategies and planning recommendations that council can use to choose a direction. You receive the decision document, the supporting models, and practical guidance for what happens next.
      </p>
    </section>

    <section className="max-w-[800px] mx-auto py-[var(--space-9)] space-y-[var(--space-6)]">
      {deliverables.map((deliverable) => (
        <article key={deliverable.title} className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-[18px] font-medium">{deliverable.title}</h2>
          <p className="text-[15px] leading-[1.7] mt-3" style={{ color: 'var(--text-secondary)' }}>{deliverable.body}</p>
        </article>
      ))}
    </section>

    <section className="max-w-[800px] mx-auto constraint-block space-y-3">
      <h2 className="text-[18px] font-medium">What the record can support</h2>
      <p>Municipal parcel, permit, servicing, and infrastructure records depend on local data-sharing timelines. Where a current record is not available, the plan states the gap and shows how it affects the recommendation. The result is intended to be reliable, not more certain than the source material allows.</p>
      <Link to="/method" className="btn-ghost">Read about the method →</Link>
    </section>

    <section className="max-w-[800px] mx-auto mt-[var(--space-7)] flex justify-center">
      <Link to="/contact?context=Public%20sector%20%E2%80%94%20RFP%20or%20municipal%20engagement" className="btn-primary">
        Discuss an RFP →
      </Link>
    </section>
  </div>
);

export default PublicSectorPage;
