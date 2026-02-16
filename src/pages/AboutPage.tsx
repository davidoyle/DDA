import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">About</p>
        <h1 className="headline-md">Who I am.</h1>
        <p className="body-text body-text-secondary">
          I&apos;m a forensic institutional analyst. I read public documents. I find patterns others miss. I quantify what&apos;s actually happening. I tell you the truth about your systems.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card space-y-4">
          <h2 className="font-heading text-2xl">How I Work</h2>
          <p className="text-[#F3EFE6]/80">I work from public data: annual reports, budgets, policy documents, decisions, and records that already exist.</p>
          <p className="text-[#F3EFE6]/80">Every claim is sourced. Every number is verifiable. Every conclusion ties back to evidence.</p>
          <p className="text-[#F3EFE6]/80">I don&apos;t do consulting projects. I deliver clear analysis you can act on.</p>
        </article>

        <article className="card space-y-4">
          <h2 className="font-heading text-2xl">Why It Matters</h2>
          <p className="text-[#F3EFE6]/80">Broken systems hide behind assumptions. The gap between what people think is happening and what is actually happening creates real financial, legal, and human costs.</p>
          <p className="text-[#F3EFE6]/80">I focus on making that gap visible so decision-makers can choose what to fix.</p>
        </article>
      </section>

      <section>
        <Link to="/contact" className="btn-primary">Tell Me Your Problem</Link>
      </section>
    </div>
  );
};

export default AboutPage;
