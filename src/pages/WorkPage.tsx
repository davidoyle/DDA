import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

const documents = [
  {
    title: 'Public safety response chronology',
    clientType: 'Municipal / regional oversight',
    date: '2026',
    tag: 'Institutional response',
    description: 'A sourced chronology of public safety response signals, coordination points, and detection lag across a municipal-regional incident record.',
  },
  {
    title: 'Education workforce strain synthesis',
    clientType: 'Public-sector workforce',
    date: '2026',
    tag: 'System strain',
    description: 'A multi-source analysis of workload, attrition replacement pressure, funding position, and support-staff investment corridors.',
  },
  {
    title: 'Procurement pathway bottleneck review',
    clientType: 'Institutional procurement',
    date: '2026',
    tag: 'Cost and accountability',
    description: 'A review of approval-gate queueing, emergency procurement utilization, vendor concentration, and preventable delay costs.',
  },
];

type WorkDocument = (typeof documents)[number];

function PdfPreview({ document, onClose }: { document: WorkDocument; onClose: () => void }) {
  const { canAccessDiagnostics, accessMode, userEmail } = useAccess();
  const canViewFullDocument = canAccessDiagnostics && accessMode !== 'demo';
  const pages = canViewFullDocument ? [1, 2, 3, 4] : [1, 2, 3];

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-slate-950/70 px-4 py-8" role="dialog" aria-modal="true">
      <div className="mx-auto max-w-[900px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col gap-4 border-b pb-4 md:flex-row md:items-start md:justify-between" style={{ borderColor: 'var(--border)' }}>
          <div>
            <p className="case-tag">{document.tag}</p>
            <h2 className="mt-2 headline-sm">{document.title}</h2>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{document.clientType} · {document.date}</p>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
        </div>

        <div className="mt-6 space-y-5">
          {pages.map((page) => {
            const locked = !canViewFullDocument && page > 2;
            return (
              <section key={page} className="relative min-h-[360px] overflow-hidden rounded-xl border bg-slate-50 p-8" style={{ borderColor: 'var(--border)' }}>
                <div className={locked ? 'blur-sm' : ''}>
                  <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--text-tertiary)' }}>Page {page}</p>
                  <h3 className="mt-8 text-2xl font-semibold">{page === 1 ? document.title : page === 2 ? 'Initial findings' : 'Methodology, data sources, and findings'}</h3>
                  <p className="mt-4 max-w-[620px] leading-7" style={{ color: 'var(--text-secondary)' }}>
                    {page === 1
                      ? `${document.clientType} analysis prepared for a defensibility review. ${document.description}`
                      : page === 2
                        ? 'This preview page shows the first content page, including the issue framing, evidence boundary, and summary of what the record supports.'
                        : 'Subscriber-only pages include the full methodology, source register, limitation notes, detailed findings, and decision implications.'}
                  </p>
                  {canViewFullDocument && userEmail ? <p className="absolute bottom-4 right-6 text-xs text-slate-300">Watermark: {userEmail}</p> : null}
                </div>
                {locked ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/75 p-6 text-center backdrop-blur-[2px]">
                    <div className="max-w-[560px] rounded-xl border bg-white p-6 shadow-lg" style={{ borderColor: 'var(--border)' }}>
                      <p className="text-[15px] leading-7" style={{ color: 'var(--text-secondary)' }}>
                        The complete analysis is available to subscribers. Subscribe to access the full document, including methodology, data sources, and findings.
                      </p>
                      <Link to="/diagnostics/subscribe" className="btn-primary mt-4 inline-flex">View Subscription Options →</Link>
                    </div>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const WorkPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<WorkDocument | null>(null);

  return (
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
            <p className="text-[12px] font-mono uppercase tracking-[0.14em]" style={{ color: 'var(--text-tertiary)' }}>{document.clientType} · {document.date}</p>
            <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{document.description}</p>
            <button type="button" onClick={() => setSelectedDocument(document)} className="btn-ghost">Preview analysis →</button>
          </article>
        ))}
      </section>

      <section className="max-w-[900px] mx-auto mt-[var(--space-8)] card space-y-4">
        <p className="text-[16px]">Interested in what DDA can produce for your organization or your investigation?</p>
        <Link to="/contact" className="btn-primary">Contact →</Link>
      </section>

      {selectedDocument ? <PdfPreview document={selectedDocument} onClose={() => setSelectedDocument(null)} /> : null}
    </div>
  );
};

export default WorkPage;
