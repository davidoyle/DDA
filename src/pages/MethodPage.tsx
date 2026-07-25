import { Link } from 'react-router-dom';

const MethodPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="headline-md">How the work is done</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>DDA&apos;s team keeps the source, release date, calculation, and limitations with the analysis. That record matters when the work goes to council, an auditor, or an access-to-information reviewer. It lets you answer questions about a number directly.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">How It Works</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Each key number points to a named primary document, such as a Statistics Canada table, CMHC report, regulatory filing, or municipal budget. The record includes the release date and calculation. Source dates can differ, and geographic boundaries can change between releases, so some figures can&apos;t be combined without an adjustment. That adjustment is shown.</p>
        <div className="space-y-3">
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Inputs are labelled in three categories:</p>
          <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Actual</strong>: a figure taken directly from a named, dated primary source.</li>
            <li><strong>Proxy</strong>: an estimate derived from other sourced inputs. The calculation is included.</li>
            <li><strong>Flag</strong>: an input for which no reliable source is available. The record explains what is missing, how it affects the result, and what would be needed to replace it.</li>
          </ul>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>The three labels appear in the input register delivered with the work. If a reviewer asks where a number came from, you can find the source or calculation there. A Flag doesn&apos;t make uncertainty disappear. It shows where better information could change the answer.</p>
        </div>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Findings separate what the records show from what we have inferred. The quality of the output depends on the source data. For example, a regulator may publish a system-wide total but not the local breakdown the decision requires. We can provide a range or a Proxy in that case, but we say so in the deliverable. We don&apos;t present the unavailable local figure as a known fact.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">What you receive</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>You receive the analysis and the working record behind it. A reviewer can follow a result back to the relevant input, source, and calculation. If an assumption changes later, you can see which outputs need to be updated.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">The team</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Callihoo, RPP, MCIP, leads land-use planning and regulatory work. Khan leads municipal economic development. Doyle is DDA&apos;s data analyst and builds the models and source records. Carroll Goldman leads engagement and communications. The team assigned to a project depends on the scope, and the named lead remains visible in the deliverable.</p>
      </section>
      <Link to="/contact" className="btn-primary">Contact DDA →</Link>
    </article>
  </div>
);

export default MethodPage;
