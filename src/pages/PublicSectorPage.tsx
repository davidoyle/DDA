import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Data Lexicon protocol',
    body: 'Every number is sourced, every proxy is flagged, and every gap is named before it becomes a liability in Council or statutory hearing. Delivered as a named, auditable register.',
    labels: ['ACTUAL', 'PROXY', 'FLAG'],
  },
  {
    title: 'CSD-anchored geography discipline',
    body: 'Primary model geography is anchored to Census Subdivision boundaries, not conflated with CMA-level rollups. The distinction is documented and defended.',
  },
  {
    title: 'Two-model architecture',
    body: 'Model 1 handles forecast and demand. Model 2 handles allocation and feasibility across three spatial plans with capacity and infrastructure constraints. Projections are capped at documented study endpoints.',
  },
  {
    title: 'Four-phase engagement system',
    body: 'Council orientation occurs before public materials. Scenario workshop structure makes Council the author of the preferred scenario rather than the ratifier of a pre-selected path.',
  },
  {
    title: 'Bilingual delivery',
    body: 'Public-facing engagement materials are produced in both official languages as baseline delivery, not as an add-on.',
  },
];

const PublicSectorPage = () => {
  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[680px] mx-auto py-[var(--space-7)] border-y" style={{ borderColor: 'var(--border-strong)' }}>
        <h2 className="text-[24px] leading-[1.3] font-medium">
          Municipal planning decisions go to Council. Council decisions go to statutory hearings. The numbers have to hold up at every stage.
        </h2>
      </section>

      <section className="max-w-[800px] mx-auto py-[var(--space-9)] space-y-[var(--space-6)]">
        {features.map((feature) => (
          <article key={feature.title} className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-[18px] font-medium">{feature.title}</h3>
            {feature.labels ? (
              <div className="flex gap-2 mt-2">
                <span className="status-label status-actual">ACTUAL</span>
                <span className="status-label status-proxy">PROXY</span>
                <span className="status-label status-flag">FLAG</span>
              </div>
            ) : null}
            <p className="text-[15px] leading-[1.7] mt-3" style={{ color: 'var(--text-secondary)' }}>{feature.body}</p>
          </article>
        ))}
      </section>

      <p className="max-w-[800px] mx-auto text-[13px] font-mono" style={{ color: 'var(--text-secondary)' }}>
        Urban growth strategy — Atlantic Canada municipality, 2026.
      </p>

      <section className="max-w-[800px] mx-auto mt-[var(--space-7)] constraint-block">
        Projections are capped at documented study endpoints. Proxies are labelled. Data gaps are named, not papered over. The models produce defensible outputs, not certain ones. If your procurement process requires certainty where evidence does not support it, DDA is not the right fit.
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-7)] flex justify-center">
        <Link to="/contact?context=Public%20sector%20%E2%80%94%20RFP%20or%20municipal%20engagement" className="btn-primary">
          Discuss an RFP →
        </Link>
      </section>
    </div>
  );
};

export default PublicSectorPage;
