import { Link, useSearchParams } from 'react-router-dom';

type DiagnosticTool = {
  name: string;
  href: string;
  freeHref?: string;
  diagnosis: string;
  input: string;
  output: string;
  source: string;
  freeAccess: string;
  subscriberAccess: string;
};

const tools: DiagnosticTool[] = [
  { name: 'WorkSafeBC Repricing Risk Diagnostic', href: '/worksafebc-repricing-risk-diagnostic', freeHref: '/worksafebc-repricing-risk-diagnostic?preview=1', diagnosis: 'Models repricing exposure versus sector and system benchmarks.', input: 'Industry profile and payroll assumptions.', output: 'Three-year repricing trajectory and risk flags.', source: 'WorkSafeBC rate tables and published sector benchmarks.', freeAccess: 'One baseline scenario with headline risk flags.', subscriberAccess: 'Unlimited scenarios, year-over-year comparisons, and full export-ready outputs.' },
  { name: 'PST Diagnostic Tool', href: '/tools/pst-diagnostic', freeHref: '/tools/pst-diagnostic?preview=1', diagnosis: 'Estimates operational PST burden under BC rules.', input: 'Operational spend categories and cost assumptions.', output: 'Estimated annual PST burden and cost distribution.', source: 'Provincial tax schedules and public expenditure classifications.', freeAccess: 'Single-pass estimate with core category totals.', subscriberAccess: 'Detailed category drill-down, scenario testing, and report-ready summaries.' },
  { name: 'Multi-Province Surplus & Rate Comparator', href: '/tools/province-comparator', freeHref: '/tools/province-comparator?preview=1', diagnosis: 'Compares jurisdiction-level rate pressure and surplus conditions.', input: 'Province selection and payroll scenario.', output: 'Rate differential and surplus pressure comparisons.', source: 'Public jurisdiction rate filings and funding ratio disclosures.', freeAccess: 'Two-province comparison with top-line variance.', subscriberAccess: 'Cross-province benchmarking matrix and full risk-driver breakdown.' },
  { name: 'Experience Rating Optimizer', href: '/tools/experience-rating-optimizer', freeHref: '/tools/experience-rating-optimizer?preview=1', diagnosis: 'Tests assessed rate versus risk-adjusted expectations.', input: 'Claims profile and payroll history.', output: 'Rate variance estimate and exposure hotspots.', source: 'Public experience-rating logic and published claims weighting factors.', freeAccess: 'Current-period variance estimate and key hotspot callouts.', subscriberAccess: 'Multi-scenario optimization and appeal-timing guidance.' },
  { name: 'Claims Suppression Self-Audit', href: '/tools/suppression-audit', freeHref: '/tools/suppression-audit?preview=1', diagnosis: 'Assesses reporting culture and suppression-risk indicators.', input: 'Structured reporting responses.', output: 'Suppression-risk profile and remediation priorities.', source: 'Public enforcement frameworks and published suppression indicators.', freeAccess: 'Rapid risk score with high-level concern areas.', subscriberAccess: 'Response-mapped remediation plan and full legal-risk playbook.' },
  { name: 'Mental Health Claims Surge Forecaster', href: '/tools/mental-health-forecaster', freeHref: '/tools/mental-health-forecaster?preview=1', diagnosis: 'Forecasts mental-disorder claim incidence by sector and scale.', input: 'Sector and headcount assumptions.', output: 'Projected claim counts and exposure direction.', source: 'Public claims trend data and sector baseline rates.', freeAccess: 'One forecast trajectory with baseline trend signal.', subscriberAccess: 'Intervention sensitivity testing and mitigation action plan outputs.' },
  { name: 'BC Decarbonization Model', href: '/tools/bc-decarbonization-model', freeHref: '/tools/bc-decarbonization-model?preview=1', diagnosis: 'Stress-tests emissions pathways against legal targets.', input: 'Policy and sector pathway selections.', output: 'Scenario-level emissions trajectory and feasibility view.', source: 'Public emissions inventories and policy reference targets.', freeAccess: 'Starter pathway run with headline target-gap view.', subscriberAccess: 'Full scenario lab, policy stress-tests, and model comparison views.' },
  { name: 'Surplus Run-Down Early-Warning Alert Service', href: '/tools/surplus-alert', freeHref: '/tools/surplus-alert?preview=1', diagnosis: 'Tracks funding-ratio threshold pressure and repricing timing risk.', input: 'Funding ratio and contribution assumptions.', output: 'Threshold pressure timeline and early-warning signal.', source: 'Public surplus disclosures and repricing threshold mechanics.', freeAccess: 'Current threshold health check and near-term warning signal.', subscriberAccess: 'Custom threshold tracking, alert tuning, and monthly briefing outputs.' },
  { name: 'Executive Risk Brief Generator', href: '/tools/executive-risk-brief', freeHref: '/tools/executive-risk-brief?preview=1', diagnosis: 'Converts diagnostic outputs into a leadership briefing structure.', input: 'Selected tool outputs and scenario notes.', output: 'Structured risk brief with decision-ready framing.', source: 'Public benchmark context and cross-tool synthesis logic.', freeAccess: 'One-page briefing outline with core headline risks.', subscriberAccess: 'Full executive brief builder with structured recommendations and export support.' },
];

const statusFromQuery = (value: string | null) => {
  if (value === 'active') return 'active';
  if (value === 'expired') return 'expired';
  if (value === 'failed') return 'failed';
  return 'none';
};

function DiagnosticsPage() {
  const [params] = useSearchParams();
  const subscriptionState = statusFromQuery(params.get('sub'));
  const unlocked = subscriptionState === 'active';

  const statusText = {
    active: 'Active subscription',
    expired: 'Subscription expired — renew',
    failed: 'Payment failed',
    none: 'Free preview access available',
  }[subscriptionState];

  const statusColor = {
    active: 'var(--status-ok)',
    expired: 'var(--status-warn)',
    failed: 'var(--status-error)',
    none: 'var(--text-tertiary)',
  }[subscriptionState];

  return (
    <div className="px-6 lg:px-16 py-[var(--space-10)]">
      <section className="max-w-[1120px] mx-auto">
        <h1 className="headline-md">Nine diagnostic tools. Built from public evidence. Self-serve, no engagement required.</h1>
        <p className="text-[17px] leading-[1.7] mt-4 max-w-[680px]" style={{ color: 'var(--text-secondary)' }}>
          The same method that powers commissioned analysis — applied to specific, bounded questions.
        </p>
        <p className="text-[13px] mt-3" style={{ color: statusColor }}>{statusText}</p>
      </section>

      <section className="max-w-[1120px] mx-auto mt-[var(--space-7)] grid gap-[var(--space-5)] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <article key={tool.name} className={`card tool-card ${unlocked ? '' : 'locked'}`}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-[18px] font-medium leading-[1.3]">{tool.name}</h2>
              {!unlocked ? <span className="lock-icon" aria-hidden="true" /> : null}
            </div>
            <p className="text-[13px] leading-[1.7] mt-3" style={{ color: 'var(--text-secondary)' }}>{tool.diagnosis}</p>
            <div className="border-t mt-4 pt-4 space-y-2 text-[13px]" style={{ borderColor: 'var(--border)' }}>
              <p><strong>Input:</strong> {tool.input}</p>
              <p><strong>Output:</strong> {tool.output}</p>
              <p><strong>Source:</strong> {tool.source}</p>
              <p><strong>Free:</strong> {tool.freeAccess}</p>
              <p><strong>Subscriber:</strong> {tool.subscriberAccess}</p>
            </div>
            {unlocked ? (
              <Link to={tool.href} className="btn-primary mt-4 tool-action">Run →</Link>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {tool.freeHref ? <Link to={tool.freeHref} className="btn-ghost tool-action">Try free preview</Link> : null}
                <Link to="/diagnostics/subscribe" className="btn-secondary tool-action">Subscribe for full access</Link>
              </div>
            )}
          </article>
        ))}
      </section>

      {!unlocked ? (
        <section className="max-w-[1120px] mx-auto mt-[var(--space-7)] p-6 rounded-[4px]" style={{ background: 'var(--bg-inset)' }}>
          <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
            A diagnostic surfaced something that needs deeper investigation?
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/contact?context=Following%20up%20on%20diagnostic%20%E2%80%94%20%5Btool%20name%5D" className="btn-primary">Describe your situation →</Link>
            <Link to="/diagnostics/subscribe" className="btn-secondary">Subscribe to access tools →</Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default DiagnosticsPage;
