import { Link } from 'react-router-dom';

type WorkDocument = {
  title: string;
  tag: string;
  description: string;
  previewHref: string;
};

const documents: WorkDocument[] = [];

const WorkPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-5 pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
      <h1 className="headline-md">Work Library</h1>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        Completed DDA analyses will appear here as document cards, each with a two-page preview before subscription access is required.
      </p>
      <p className="text-[13px] italic" style={{ color: 'var(--text-secondary)' }}>
        The first two pages of each analysis are free to preview. Full documents — including methodology, data sources, and complete findings — require a subscription.
      </p>
    </section>

    {documents.length > 0 ? (
      <section className="max-w-[900px] mx-auto mt-[var(--space-7)] grid gap-5 md:grid-cols-3">
        {documents.map((document) => (
          <article key={document.title} className="card space-y-3">
            <p className="case-tag">{document.tag}</p>
            <h2 className="text-[18px] font-medium leading-[1.3]">{document.title}</h2>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{document.description}</p>
            <Link to={document.previewHref} className="btn-ghost">Preview analysis →</Link>
          </article>
        ))}
      </section>
    ) : (
      <section className="max-w-[900px] mx-auto mt-[var(--space-7)]">
        <div className="card mx-auto max-w-[520px] space-y-5 text-center">
          <h2 className="headline-sm">No documents published yet.</h2>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            Completed analyses will appear here with a two-page preview. Subscribe to access full documents when they&apos;re available.
          </p>
          <Link to="/diagnostics/subscribe" className="btn-primary">View Subscription Options →</Link>
        </div>
      </section>
    )}
  </div>
);

export default WorkPage;
