import { Link } from 'react-router-dom';

const findings = [
  "Workers' compensation systems ($570M surplus gaps, 129,786 missing claims, systemic denial patterns)",
  'Municipal finance ($37.6M cost downloading, hidden budget liabilities, repricing exposure)',
  'Regulatory capture (enforcement bias, penalty pattern analysis, policy implementation failure)',
  'Organizational effectiveness (member outcome analysis, advocacy impact, ROI auditing)',
  'Institutional governance (decision-making patterns, accountability mechanisms, systemic bias)',
];

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">About</p>
        <h1 className="headline-md">Who I Am</h1>
      </section>

      <section className="card space-y-4 max-w-4xl">
        <p className="body-text body-text-secondary">I&apos;m a forensic institutional analyst.</p>
        <p className="body-text body-text-secondary">I read public documents. I find patterns others miss. I quantify what&apos;s actually happening. I tell you the truth about your systems.</p>
        <p className="body-text body-text-secondary">I don&apos;t do consulting. I don&apos;t do meetings. I don&apos;t do &quot;stakeholder alignment.&quot;</p>
        <p className="body-text body-text-secondary">I read. I analyze. I write. I deliver.</p>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">My Method</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">
            Every organization publishes documents. Annual reports. Budgets. Policy manuals. Tribunal decisions. Enforcement records. Inspection data. Legislative debates. Lobbying registries.
          </p>
          <p className="text-[#F3EFE6]/80">These documents tell the truth about how your system actually works.</p>
          <p className="text-[#F3EFE6]/80">Most people don&apos;t read them. They&apos;re long. They&apos;re dense. They&apos;re buried.</p>
          <p className="text-[#F3EFE6]/80">
            I read them. All of them. I synthesize across sources, across years, across departments. I find the patterns that individual actors inside the system cannot see because they&apos;re too close, too busy, or too invested in not seeing.
          </p>
          <p className="text-[#F3EFE6]/80">Then I tell you what I found.</p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="headline-md">My Competitive Advantages</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Speed</h3>
            <p className="text-[#F3EFE6]/80">I work alone. No overhead. No meetings. No committee approvals. What takes a consulting firm three months takes me three weeks.</p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Rigor</h3>
            <p className="text-[#F3EFE6]/80">Every claim I make is sourced. Every number is verifiable. Every conclusion is replicable. You&apos;re not buying my opinion. You&apos;re buying evidence.</p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Independence</h3>
            <p className="text-[#F3EFE6]/80">I don&apos;t have partners to satisfy. I don&apos;t have repeat clients to protect. I don&apos;t have institutional relationships to maintain. I tell you the truth.</p>
          </article>
          <article className="card space-y-3">
            <h3 className="font-heading text-xl">Access</h3>
            <p className="text-[#F3EFE6]/80">I work from public data. No leaks. No whistleblowers. No insider access. Everything I find is available to you. I just synthesize it faster.</p>
          </article>
          <article className="card space-y-3 md:col-span-2 lg:col-span-2">
            <h3 className="font-heading text-xl">Experience</h3>
            <p className="text-[#F3EFE6]/80">I&apos;ve been inside broken systems. I know what they cost. I know how to find the gap between what people think is happening and what&apos;s actually happening.</p>
          </article>
        </div>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">What I&apos;ve Found</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">I&apos;ve analyzed:</p>
          <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
            {findings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
          <p className="text-[#F3EFE6]/80">Every analysis starts the same way: public documents. Patterns. Numbers. Truth.</p>
        </div>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">Why People Hire Me</h2>
        <div className="card space-y-4">
          <p className="text-[#F3EFE6]/80">
            You have a problem you can&apos;t solve internally.
          </p>
          <p className="text-[#F3EFE6]/80">
            Your assumptions don&apos;t match reality. Your budget is bleeding and you don&apos;t know where. Your members are losing and you don&apos;t know why. Your cases are failing and you don&apos;t have the evidence. Your system is broken and you need to see exactly how.
          </p>
          <p className="text-[#F3EFE6]/80">I find the answer. I put it in your hands. You implement it. You move on.</p>
          <p className="text-[#F3EFE6]/80">No bullshit. No overhead. No long-term contracts.</p>
          <p className="text-[#F3EFE6]/80">Just the truth. Quantified. Actionable. Delivered.</p>
        </div>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Tell Me Your Problem</Link>
      </section>
    </div>
  );
};

export default AboutPage;
