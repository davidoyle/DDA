import { Link } from 'react-router-dom';

const MethodPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="headline-md">How the work is done</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>The numbers need to be solid enough to stand up when someone asks how they were produced. DDA keeps the source, release date, calculation, and limitations with the analysis so you can answer that question directly.</p>
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
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Findings separate what the records show from what has been inferred. Sometimes a public series ends before the period under review, or a regulator publishes a system-wide total but not the local breakdown. In those cases, the work can give you a range or a proxy. It can&apos;t turn an unavailable local figure into a known fact.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">What you receive</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>You receive the analysis and the working record behind it. A reviewer can follow a result back to the relevant input, source, and calculation. If an assumption changes later, you can see which outputs need to be updated.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">David Doyle</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>David Doyle is a data analyst based in Metro Vancouver, BC. He works on planning, labour market, regulatory cost, and financial questions for public and private organizations across Canada.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>David writes and checks each DDA deliverable himself, from the first data pull through the final submission.</p>
      </section>
      <Link to="/contact" className="btn-primary">Contact David →</Link>
    </article>
  </div>
);

export default MethodPage;
