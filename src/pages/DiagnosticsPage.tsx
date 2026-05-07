import { Link } from 'react-router-dom';

type DiagnosticTool = {
  name: string;
  href: string;
  diagnosis: string;
  input: string;
  output: string;
  source: string;
};

const tools: DiagnosticTool[] = [
  { name: 'WorkSafeBC Repricing Risk Diagnostic', href: '/worksafebc-repricing-risk-diagnostic', diagnosis: 'Models repricing exposure versus sector and system benchmarks.', input: 'Industry profile and payroll assumptions.', output: 'Three-year repricing trajectory and risk flags.', source: 'WorkSafeBC rate tables and published sector benchmarks.' },
  { name: 'PST Diagnostic Tool', href: '/tools/pst-diagnostic', diagnosis: 'Estimates operational PST burden under BC rules.', input: 'Operational spend categories and cost assumptions.', output: 'Estimated annual PST burden and cost distribution.', source: 'Provincial tax schedules and public expenditure classifications.' },
  { name: 'Multi-Province Surplus & Rate Comparator', href: '/tools/province-comparator', diagnosis: 'Compares jurisdiction-level rate pressure and surplus conditions.', input: 'Province selection and payroll scenario.', output: 'Rate differential and surplus pressure comparisons.', source: 'Public jurisdiction rate filings and funding ratio disclosures.' },
  { name: 'Experience Rating Optimizer', href: '/tools/experience-rating-optimizer', diagnosis: 'Tests assessed rate versus risk-adjusted expectations.', input: 'Claims profile and payroll history.', output: 'Rate variance estimate and exposure hotspots.', source: 'Public experience-rating logic and published claims weighting factors.' },
  { name: 'Claims Suppression Self-Audit', href: '/tools/suppression-audit', diagnosis: 'Assesses reporting culture and suppression-risk indicators.', input: 'Structured reporting responses.', output: 'Suppression-risk profile and remediation priorities.', source: 'Public enforcement frameworks and published suppression indicators.' },
  { name: 'Mental Health Claims Surge Forecaster', href: '/tools/mental-health-forecaster', diagnosis: 'Forecasts mental-disorder claim incidence by sector and scale.', input: 'Sector and headcount assumptions.', output: 'Projected claim counts and exposure direction.', source: 'Public claims trend data and sector baseline rates.' },
  { name: 'BC Decarbonization Model', href: '/tools/bc-decarbonization-model', diagnosis: 'Stress-tests emissions pathways against legal targets.', input: 'Policy and sector pathway selections.', output: 'Scenario-level emissions trajectory and feasibility view.', source: 'Public emissions inventories and policy reference targets.' },
  { name: 'B.C. Energy Fiscal Decision Model', href: '/model', diagnosis: 'Models LNG fiscal levers, project IRR, provincial revenue NPV, flags, and audit trail.', input: 'Public assumption register with ACTUAL, PROXY, and FLAG defaults.', output: 'Cash-flow, royalty, tax, scenario, Monte Carlo, benchmark, and negotiation modules.', source: 'BC Budget 2026 anchors, public tax/royalty parameters, and documented flag defaults.' },
  { name: 'Surplus Run-Down Early-Warning Alert Service', href: '/tools/surplus-alert', diagnosis: 'Tracks funding-ratio threshold pressure and repricing timing risk.', input: 'Funding ratio and contribution assumptions.', output: 'Threshold pressure timeline and early-warning signal.', source: 'Public surplus disclosures and repricing threshold mechanics.' },
  { name: 'Executive Risk Brief Generator', href: '/tools/executive-risk-brief', diagnosis: 'Converts diagnostic outputs into a leadership briefing structure.', input: 'Selected tool outputs and scenario notes.', output: 'Structured risk brief with decision-ready framing.', source: 'Public benchmark context and cross-tool synthesis logic.' },
];

function DiagnosticsPage() {
  const statusText = 'All tools are currently open access.';
  const statusColor = 'var(--status-ok)';

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[1120px] mx-auto">
        <h1 className="headline-md">Ten diagnostic tools. Built from public evidence. Self-serve, no engagement required.</h1>
        <p className="text-[17px] leading-[1.7] mt-4 max-w-[680px]" style={{ color: 'var(--text-secondary)' }}>
          The same method that powers commissioned analysis — applied to specific, bounded questions.
        </p>
        <p className="text-[13px] mt-3" style={{ color: statusColor }}>{statusText}</p>
      </section>

      <section className="max-w-[1120px] mx-auto mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.name} className="card tool-card">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-[18px] font-medium leading-[1.3]">{tool.name}</h2>

            </div>
            <p className="text-[13px] leading-[1.7] mt-3" style={{ color: 'var(--text-secondary)' }}>{tool.diagnosis}</p>
            <div className="border-t mt-4 pt-4 space-y-2 text-[13px]" style={{ borderColor: 'var(--border)' }}>
              <p><strong>Input:</strong> {tool.input}</p>
              <p><strong>Output:</strong> {tool.output}</p>
              <p><strong>Source:</strong> {tool.source}</p>
            </div>
            <Link to={tool.href} className="btn-primary mt-4 tool-action">Run →</Link>
          </article>
        ))}
      </section>

    </div>
  );
}

export default DiagnosticsPage;
