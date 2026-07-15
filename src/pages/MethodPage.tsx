import { Link } from 'react-router-dom';

const MethodPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <section className="space-y-4">
        <h1 className="headline-md">The Standard</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>DDA operates to a single analytical standard across every engagement: adversarial resilience.</p>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>The question behind every piece of work is not whether the analysis looks credible. It is whether the analysis holds when someone who disagrees with the conclusion tries to take it apart. That requires a different approach than most analytical work, and it produces a different kind of deliverable.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">How It Works</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Every number has a source.</strong> Not a category. Not a data provider. A named primary document — a Statistics Canada table, a CMHC report, a regulatory filing, a municipal budget — with a release date and an explicit note on data lag. If the number is derived from multiple sources, the derivation is shown step by step.</p>
        <div className="space-y-3">
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Every assumption is labelled.</strong> DDA uses a three-tier classification for every input in an engagement:</p>
          <ul className="list-disc pl-6 space-y-2 text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Actual</strong> — a direct extract from a named primary source, verified and dated</li>
            <li><strong>Proxy</strong> — derived from two or more primary inputs, with the derivation documented</li>
            <li><strong>Flag</strong> — no reliable source exists; the gap is named, its implications for the analysis are stated, and resolution paths are identified</li>
          </ul>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>This register — the Data Lexicon — is delivered as a standard appendix to every engagement. It is the analytical contract between DDA and the client. It is also what makes the work defensible: when a council member, a provincial reviewer, or opposing counsel asks where a number came from, the answer is in the document.</p>
        </div>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>Every gap is declared.</strong> Most analytical work papers over data limitations. DDA names them. Where the evidence does not support a reliable estimate, that is stated — along with what the absence of evidence means for the decision at hand. A declared gap is more useful than a false confidence interval.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>The distinction between what is known and what is inferred is maintained throughout.</strong> Findings are framed as: here is what the evidence shows, here is what it suggests, and here is where it is silent. Decision-makers receive a precise account of the evidentiary basis for every conclusion. They are not asked to trust the analyst. They are given the tools to verify.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">Why It Matters</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Analysis that cannot be defended under pressure is not useful at the moment it is needed most. A strategy that unravels at a council hearing, a financial model that cannot survive an audit, a workforce assessment that turns out to have been built on assumptions that were never tested — these do not just fail analytically. They fail the organizations that relied on them.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>DDA&apos;s work is built for the moment when it will be challenged. That is the only standard worth holding.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">David Doyle — Principal</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>David Doyle is a forensic data analyst and evidence synthesis specialist based in Metro Vancouver, BC.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>His work spans economic and regional strategy, land use and planning analysis, labour market and workforce risk, regulatory cost modelling, and large-scale financial and policy modelling. He has produced analytical work for municipal and regional governments, resource sector operators, government bodies, legal teams, and public interest organizations across Canada.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Every piece of DDA work is written, analysed, and quality-controlled by the Principal. There are no junior analysts on DDA deliverables. No handoffs. Single accountability from the first data pull to the final submission.</p>
      </section>
      <Link to="/contact" className="btn-primary">Contact David →</Link>
    </article>
  </div>
);

export default MethodPage;
