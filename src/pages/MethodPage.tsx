import { Link } from 'react-router-dom';

const MethodPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="headline-md">How the work is done</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          You receive a strategy, plan, model, or set of recommendations suited to the decision. The working record behind it shows why the direction is reliable and what may need to change when new information arrives.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="headline-sm">From question to recommendation</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          The engagement begins by defining the decision, the output you need, and who will use it. The analysis then tests the available options and leads to recommendations, responsibilities, measures, and an implementation sequence where the scope calls for them.
        </p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          Each key figure points to a named primary document, such as a Statistics Canada table, CMHC report, regulatory filing, or municipal budget. Its release date, calculation, and relevant limits stay with the record. This makes the advice clear about what the evidence does and does not support.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="headline-sm">How we keep claims traceable</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          An actual is taken directly from a named, dated source. A proxy is an estimate built from sourced inputs, with the calculation shown. A flag marks an input for which a reliable source is not available and records how that gap could affect the answer.
        </p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          These labels sit in the input register delivered with the work. They are a practical way to find the basis for a number and to identify which results should be updated if an assumption changes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="headline-sm">Where the data falls short</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          Public labour-market releases can describe conditions six to twelve months earlier, so they may not capture a recent plant opening or project delay. Land-use work depends on the timing and completeness of municipal parcel, permit, and servicing data. Where current local information is unavailable, the deliverable uses a range or a stated estimate rather than presenting an unknown figure as fact.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="headline-sm">David Doyle</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          David Doyle builds strategies and gives direction on planning, labour-market, regulatory-cost, and financial questions. He uses analysis that can be traced back to named sources so organisations can act on what the evidence actually shows.
        </p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
          DDA is a sole-principal practice. David assembles project-specific teams from an associate network when a scope needs added expertise. Those sub-consultants are independent senior associates, not a standing workforce, and are identified in bids with their availability confirmed.
        </p>
      </section>

      <section className="card space-y-4">
        <h2 className="headline-sm">Discuss an engagement</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Tell David what you need to decide and what deliverable would help you act.</p>
        <Link to="/contact" className="btn-primary">Contact David →</Link>
      </section>
    </article>
  </div>
);

export default MethodPage;
