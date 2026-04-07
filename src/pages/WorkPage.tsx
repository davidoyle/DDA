import { useState } from 'react';
import { Link } from 'react-router-dom';

type AnalysisCard = {
  sector: string;
  question: string;
  findings: string[];
  enabled: string;
  method: string;
};

const analyses: AnalysisCard[] = [
  {
    sector: 'Public safety system | municipal-regional context',
    question: 'Where did institutional response structure fail during an extortion surge, and what was the measurable operational impact?',
    findings: [
      'Three-month lag between surge onset and formal multi-agency coordination.',
      'Provincial-municipal messaging divergence reduced signal clarity during active enforcement periods.',
      'No pre-existing forecasting mechanism and no transparent incident throughput reporting.',
      'Escalation protocol redesign points were identified with staged oversight checkpoints.',
    ],
    enabled: 'Enabled a structured reform pathway for response governance and escalation accountability.',
    method: 'Source set included incident timelines, public enforcement notices, council records, and intergovernmental disclosures. Synthesis used integrated chronology testing against declared protocols. Uncertainty around non-public operational capacity was explicitly classified as unknowable.',
  },
  {
    sector: 'Education system | provincial institution set',
    question: 'What explains the persistence of workforce strain despite recovery-era funding narratives?',
    findings: [
      '50.6% workload increase reported in teacher population samples post-peak disruption period.',
      'Attrition replacement burden estimated above $85M annually, with upside beyond $121M under continued loss rates.',
      'Per-student funding position remained below national average despite headline commitment framing.',
      'Support-staff investment corridor ($50M–$75M) mapped to measurable retention outcomes.',
    ],
    enabled: 'Enabled a quantified funding-accountability argument tied to retention and classroom-capacity outcomes.',
    method: 'The synthesis combined public funding releases, workforce indicators, attrition disclosures, and comparative provincial data in a harmonized baseline. Structural outcomes were measured against reported commitments. Missing denominator detail in some series was retained as FLAG, not inferred.',
  },
  {
    sector: 'Procurement operations | multi-department service delivery',
    question: 'Which structural choke points are driving emergency procurement spend and delivery instability?',
    findings: [
      'Repeated approval-gate queueing created predictable cycle-time drag across recurring categories.',
      'Emergency procurement utilization tracked to preventable scheduling drift rather than exogenous shocks.',
      'Vendor concentration patterns increased amendment frequency under timeline pressure.',
      'Administrative overhead and delay costs were quantified across pathway variants.',
    ],
    enabled: 'Enabled leadership teams to redesign approval pathways and reduce avoidable emergency spend.',
    method: 'Method integrated procurement logs, amendment records, and cycle-time markers across linked departments. Comparative pathway testing isolated preventable versus externally forced spend. Vendor-level private negotiation factors were marked non-observable and excluded.',
  },
];

const WorkPage = () => {
  const [openMethod, setOpenMethod] = useState<number | null>(null);

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[680px] mx-auto pb-[var(--space-7)] border-b" style={{ borderColor: 'var(--border)' }}>
        <h1 className="headline-md">Analysis</h1>
        <p className="text-[17px] leading-[1.7] mt-4" style={{ color: 'var(--text-secondary)' }}>
          Every analysis is built from public documents. No privileged access. Everything verifiable.
        </p>
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-7)] space-y-[var(--space-7)]">
        {analyses.map((analysis, index) => {
          const isOpen = openMethod === index;
          return (
            <article key={analysis.question} className="card">
              <p className="case-tag">{analysis.sector}</p>
              <h3 className="text-[18px] font-medium leading-[1.3] mt-3">{analysis.question}</h3>
              <div className="finding-block mt-4">
                <ul className="space-y-2 text-[13px] leading-[1.7]">
                  {analysis.findings.map((finding) => (
                    <li key={finding}>{finding}</li>
                  ))}
                </ul>
              </div>
              <p className="text-[13px] leading-[1.7] italic mt-4" style={{ color: 'var(--text-secondary)' }}>
                {analysis.enabled}
              </p>
              <button
                type="button"
                className="mt-4 text-[13px] font-mono"
                style={{ color: 'var(--text-secondary)' }}
                onClick={() => setOpenMethod(isOpen ? null : index)}
              >
                {isOpen ? '− method' : '+ method'}
              </button>
              {isOpen ? (
                <div className="mt-3 p-4 rounded-[4px] text-[13px] leading-[1.5] font-mono" style={{ background: 'var(--bg-inset)' }}>
                  {analysis.method}
                </div>
              ) : null}
            </article>
          );
        })}
      </section>

      <section className="max-w-[800px] mx-auto mt-[var(--space-8)] flex flex-wrap justify-center gap-3">
        <Link to="/contact?context=Interested%20in%20similar%20analysis" className="btn-primary">Describe your situation →</Link>
        <Link to="/method" className="btn-secondary">See how we work →</Link>
      </section>
    </div>
  );
};

export default WorkPage;
