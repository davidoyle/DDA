import { Link } from 'react-router-dom';

const examples = [
  ['Institutional response analysis.', 'For a typical public safety or policy review, DDA compares enforcement logs, coordination records, public communications, and budget allocations. The record may show when an agency acted and what it reported. It may not show why an individual decision was made, especially when internal records have not been released.'],
  ['System strain analysis.', "When an institution's published data — staffing ratios, funding levels, attrition rates, outcome measures — tells a different story than its public communications, DDA quantifies the gap. What the data shows about workload, capacity, and the conditions that produce failure."],
  ['Cost and accountability analysis.', 'When public costs are distributed across systems in ways that obscure accountability — regulatory cost structures, institutional spending patterns, fiscal transfers — DDA maps what the published record reveals about who bears the cost and what drives it.'],
];

const PublicInterestPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <h1 className="headline-md">Public Interest Analysis</h1>
      <section className="space-y-4 text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        <p>Some of the most important analytical work doesn&apos;t come with a client and a contract. It comes from a question that the public record can answer — if someone is willing to read it carefully enough.</p>
        <p>DDA produces independent analysis of public records on institutional decisions, resource allocation, policy design, and public costs. The work compares what an institution reported with what its published data and records show.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">How sources are handled</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Claims point to named primary documents. The analysis separates what a record says from what can reasonably be inferred from it. Access-to-information responses can contain redactions, and published datasets may omit local or case-level detail. Those gaps limit the conclusions. They aren&apos;t filled with assumptions presented as facts.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Journalists, advocates, oversight bodies, policymakers, and legal teams can use the source record to check a finding before relying on it in a story, submission, review, or case.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">What This Work Looks Like</h2>
        {examples.map(([title, body]) => (
          <p key={title} className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--text-primary)' }}>{title}</strong> {body}</p>
        ))}
      </section>
      <section className="card space-y-4">
        <h2 className="headline-sm">Access</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Public interest analyses are available for download. Title and first content page are visible to all visitors. Full documents are available to subscribers.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Where analysis is produced in response to a specific request from a journalist, advocacy organization, or oversight body, direct access can be arranged. Contact DDA to discuss.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/analysis" className="btn-primary">Browse available analyses →</Link>
          <Link to="/contact" className="btn-secondary">Contact DDA →</Link>
        </div>
      </section>
    </article>
  </div>
);

export default PublicInterestPage;
