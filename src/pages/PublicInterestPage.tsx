import { Link } from 'react-router-dom';

const examples = [
  ['Institutional response analysis.', 'When a public safety crisis, a policy failure, or a systemic breakdown generates a public record — enforcement logs, coordination records, public communications, budget allocations — DDA synthesizes that record to identify what actually happened, when, and what the structural causes were. Detection lags. Coordination failures. The gap between what was reported and what was produced.'],
  ['System strain analysis.', "When an institution's published data — staffing ratios, funding levels, attrition rates, outcome measures — tells a different story than its public communications, DDA quantifies the gap. What the data shows about workload, capacity, and the conditions that produce failure."],
  ['Cost and accountability analysis.', 'When public costs are distributed across systems in ways that obscure accountability — regulatory cost structures, institutional spending patterns, fiscal transfers — DDA maps what the published record reveals about who bears the cost and what drives it.'],
];

const PublicInterestPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <article className="max-w-[900px] mx-auto space-y-8">
      <h1 className="headline-md">Public Interest Analysis</h1>
      <section className="space-y-4 text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        <p>Some of the most important analytical work doesn&apos;t come with a client and a contract. It comes from a question that the public record can answer — if someone is willing to read it carefully enough.</p>
        <p>DDA produces independent analysis of institutional behaviour where the subject is a matter of public record and public consequence. Enforcement gaps. Resource allocation failures. Policy design failures. Cost structures that the public bears but no single body is accountable for. System responses that the data shows diverged from what institutions reported.</p>
      </section>
      <section className="space-y-4">
        <h2 className="headline-sm">The Standard</h2>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>This work is built to the same evidentiary standard as every DDA commissioned engagement. Every claim is sourced to a named primary document. Every limitation in the evidence is declared. The distinction between what the data shows, what it suggests, and where it is silent is maintained throughout.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>The analysis is designed for use. By journalists who need findings they can publish and defend. By advocates who need an evidentiary foundation for submissions and interventions. By oversight bodies and policymakers who need a structured account of what the institutional record actually shows. By legal teams who need analysis built from verifiable public records.</p>
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
