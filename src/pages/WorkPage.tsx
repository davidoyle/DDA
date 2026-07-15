import { Link } from 'react-router-dom';

const documents = [
  {
    title: 'Public safety response chronology',
    tag: 'Institutional response',
    description: 'A sourced chronology of public safety response signals, coordination points, and detection lag across a municipal-regional incident record.',
  },
  {
    title: 'Education workforce strain synthesis',
    tag: 'System strain',
    description: 'A multi-source analysis of workload, attrition replacement pressure, funding position, and support-staff investment corridors.',
  },
  {
    title: 'Procurement pathway bottleneck review',
    tag: 'Cost and accountability',
    description: 'A review of approval-gate queueing, emergency procurement utilization, vendor concentration, and preventable delay costs.',
  },
];

const WorkPage = () => (
  <div className="px-6 lg:px-16 py-[var(--space-10)]">
    <section className="max-w-[900px] mx-auto space-y-5 pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
      <h1 className="headline-md">Analysis</h1>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        The work below represents DDA&apos;s analytical output across sectors and engagement types. Each document is built from named primary sources. Each one is verifiable.
      </p>
      <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
        Title page and first content page are visible below. Full documents are available to subscribers.
      </p>
    </section>

    <section className="max-w-[900px] mx-auto mt-[var(--space-7)] grid gap-5 md:grid-cols-3">
      {documents.map((document) => (
        <article key={document.title} className="card space-y-3">
          <p className="case-tag">{document.tag}</p>
          <h2 className="text-[18px] font-medium leading-[1.3]">{document.title}</h2>
          <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{document.description}</p>
          <Link to="/diagnostics/subscribe" className="btn-ghost">Preview analysis →</Link>
        </article>
      ))}
    </section>

    <section className="max-w-[900px] mx-auto mt-[var(--space-8)] card space-y-4">
      <p className="text-[16px]">Interested in what DDA can produce for your organization or your investigation?</p>
      <Link to="/contact" className="btn-primary">Contact →</Link>
    </section>
  </div>
);

export default WorkPage;
