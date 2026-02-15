const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="space-y-4 max-w-4xl">
        <p className="eyebrow">About DDA</p>
        <h1 className="headline-md">Who We Are</h1>
        <p className="body-text body-text-secondary">
          DDA conducts forensic institutional analysis for public sector leaders, regulatory bodies, legal counsel, and advocacy organizations. Our work begins with a simple premise: systems that fail workers, members, or constituents do so not by accident, but by design—often invisible design.
        </p>
        <p className="body-text body-text-secondary">
          We identify that design. We quantify its cost. We recommend structural remedies grounded in evidence, not ideology.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <article className="card space-y-4">
          <h2 className="font-heading text-2xl">Our Approach</h2>
          <p className="text-[#F3EFE6]/80">
            All analysis begins with publicly available data: government records, tribunal decisions, legislative history, published financial statements.
          </p>
          <p className="text-[#F3EFE6]/80">
            We synthesize across sources to identify patterns that individual actors cannot see from within their own systems. Our reports are evidence-based, methodology-transparent, and actionable.
          </p>
        </article>

        <article className="card space-y-4">
          <h2 className="font-heading text-2xl">Founder</h2>
          <p className="text-[#F3EFE6]/80">
            David Doyle is a constitutional scholar and policy analyst specializing in institutional failure analysis. His work spans workers' compensation systems, municipal finance, regulatory effectiveness, and organizational governance.
          </p>
          <p className="text-[#F3EFE6]/80">
            He brings lived experience, combined with forensic research capability and structural reform expertise.
          </p>
        </article>
      </section>
    </div>
  );
};

export default AboutPage;
