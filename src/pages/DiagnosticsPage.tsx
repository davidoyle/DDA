import { Link } from 'react-router-dom';

const DiagnosticsPage = () => {
  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Diagnostics</p>
        <h1 className="headline-lg max-w-4xl">Diagnostic Tools</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-5">
          Access our growing library of diagnostics. Start with the WorkSafeBC repricing diagnostic below.
        </p>
      </section>

      <section className="px-6 lg:px-[8vw] py-14">
        <article className="card space-y-4 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">Available now</p>
          <h2 className="font-heading text-3xl">WorkSafeBC Repricing Risk Diagnostic</h2>
          <p className="text-[#F3EFE6]/80">
            Model repricing exposure using scenario pathways, sector benchmarks, and firm-specific inputs.
          </p>
          <div>
            <Link to="/worksafebc-repricing-risk-diagnostic" className="btn-primary">
              Open WorkSafeBC Repricing Diagnostic
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default DiagnosticsPage;
