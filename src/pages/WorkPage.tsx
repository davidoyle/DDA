import { Link } from 'react-router-dom';

const analyses = [
  {
    sector: 'Public safety system | municipal-regional context',
    question: 'Where did institutional response structure fail during an extortion surge, and what was the measurable operational impact?',
    findings: [
      'Three-month lag between surge onset and formal multi-agency coordination.',
      'Provincial-municipal messaging divergence reduced public signal clarity during active enforcement periods.',
      'No pre-existing forecasting mechanism and no transparent incident throughput reporting in the response architecture.',
      'Escalation protocol redesign identified with phased implementation gates and quantified oversight checkpoints.',
    ],
    enabled: 'Enabled a structured reform pathway for response governance and escalation accountability.',
    howDone: 'Source set included incident timelines, public enforcement notices, council records, and intergovernmental disclosures across the same period. Evidence was synthesized into a single chronology and tested against declared response protocols. Uncertainty remained around non-public operational capacity and is explicitly treated as unknowable.',
  },
  {
    sector: 'Education system | provincial institution set',
    question: 'What explains the persistence of workforce strain despite recovery-era funding narratives?',
    findings: [
      '50.6% workload increase reported in teacher population samples post-peak disruption period.',
      'Attrition replacement burden estimated above $85M annually, with scenario upside beyond $121M under continued loss rates.',
      'Per-student funding position ranked below national average despite headline commitment framing.',
      'Support-staff investment corridor ($50M–$75M) mapped to measurable retention and service-delivery outcomes.',
    ],
    enabled: 'Enabled a quantified funding-accountability argument tied to retention and classroom-capacity outcomes.',
    howDone: 'The synthesis combined public funding releases, workforce indicators, attrition disclosures, and comparative provincial data in a harmonized baseline. Structural outcomes were measured against reported policy commitments and budget claims. Missing denominator detail in some public series was retained as a flagged limitation.',
  },
  {
    sector: 'Procurement operations | multi-department service delivery',
    question: 'Which structural choke points are driving emergency procurement spend and delivery instability?',
    findings: [
      'Repeated approval-gate queueing created predictable cycle-time drag across recurring procurement categories.',
      'Emergency procurement utilization tracked to preventable scheduling drift rather than true exogenous shocks.',
      'Vendor concentration patterns increased downstream amendment frequency and reduced resilience under timeline pressure.',
      'Administrative overhead and delay costs quantified across approval-path variants.',
    ],
    enabled: 'Enabled leadership teams to redesign approval pathways and reduce avoidable emergency spend.',
    howDone: 'Method used procurement logs, amendment records, and cycle-time markers across linked departments to model queue behaviour and delay propagation. Comparative pathway testing isolated preventable versus externally forced emergency spend. Vendor-level private negotiation factors were excluded and marked as non-observable.',
  },
];

const WorkPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel max-w-5xl space-y-4">
        <p className="eyebrow">Analysis</p>
        <h1 className="headline-md">What the method produces.</h1>
        <p className="text-xl text-[#F3EFE6]/85">
          Every analysis is built from public documents. No privileged access. Everything verifiable.
        </p>
      </section>

      <section className="max-w-6xl space-y-6">
        {analyses.map((analysis) => (
          <article key={analysis.question} className="card space-y-4 border border-[#F3EFE6]/15">
            <p className="case-tag">{analysis.sector}</p>
            <h2 className="font-heading text-2xl">Structural question</h2>
            <p className="text-[#F3EFE6]/90">{analysis.question}</p>

            <div className="space-y-2">
              <p className="finding-label">Specific findings</p>
              <ul className="space-y-1 text-[#F3EFE6]/82 list-disc list-inside">
                {analysis.findings.map((finding) => (
                  <li key={finding}>{finding}</li>
                ))}
              </ul>
            </div>

            <div className="finding-block">
              <p className="finding-label">What the evidence enabled</p>
              <p>{analysis.enabled}</p>
            </div>

            <div className="space-y-2">
              <p className="finding-label">How this was done</p>
              <p className="text-[#F3EFE6]/80">{analysis.howDone}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-5xl card space-y-5">
        <div className="flex flex-wrap gap-3">
          <Link to="/contact?context=Interested%20in%20similar%20analysis" className="btn-primary">
            Describe your situation →
          </Link>
          <Link to="/method" className="btn-secondary">
            See how we work →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkPage;
