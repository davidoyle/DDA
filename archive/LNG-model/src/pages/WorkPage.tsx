import { Link } from 'react-router-dom';

const WorkPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <section className="space-y-5 pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
        <h1 className="headline-md">Analysis</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          Selected PDF reports and work samples will be displayed here as they are prepared for publication.
        </p>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          Each sample will show the type of decision it addressed, the deliverable provided, and the sources and limits that shaped the recommendations.
        </p>
      </section>

      <section className="card space-y-4">
        <h2 className="headline-sm">Discuss your project</h2>
        <p className="text-[16px]" style={{ color: 'var(--text-secondary)' }}>
          If you need a strategy, plan, model, or set of recommendations now, describe the decision and the output you need.
        </p>
        <Link to="/contact" className="btn-primary">Contact David →</Link>
      </section>
    </article>
  </div>
);

export default WorkPage;
