import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

type DiagnosticTool = {
  name: string;
  href: string;
  diagnosis: string;
  input: string;
  output: string;
  source: string;
};

const UPGRADE_PRICE = '$399/year';
const RUN_TRACKING_KEY = 'dda-diagnostics-run-tools';

const toolGroups: ToolGroup[] = [
  {
    key: 'exposure',
    title: 'Understand your exposure',
    description: 'Baseline diagnostics to quantify immediate and structural cost pressure.',
    borderClass: 'border-l-[#1F3A5F]',
  },
  {
    key: 'reduction',
    title: 'Reduce your costs',
    description: 'Action-oriented diagnostics to identify avoidable premium and claims leakage.',
    borderClass: 'border-l-[#2E5E3E]',
  },
  {
    key: 'monitoring',
    title: "Watch what's coming",
    description: 'Forward-looking diagnostics for emerging claims and funding-ratio shifts.',
    borderClass: 'border-l-[#9A6A28]',
  },
];

const tools: ToolEntry[] = [
  {
    group: 'exposure',
    name: 'WorkSafeBC Repricing Risk Diagnostic',
    href: '/worksafebc-repricing-risk-diagnostic',
    status: 'Live',
    description: 'Models repricing exposure versus sector and system benchmarks.',
    headlineOutput: 'Default manufacturing profile: +11.8% repricing exposure over 3 years.',
    free: ['Industry rate lookup', 'System-average comparison', 'Single-year view', 'Generic risk band'],
    pro: ['Three-year trajectory forecast', 'NEER impact calculation', 'Dollar cost at payroll', 'Appeal flag logic'],
  },
  {
    group: 'exposure',
    name: 'PST Diagnostic Tool',
    href: '/tools/pst-diagnostic',
    status: 'Live',
    description: 'Calculates BC PST expansion cost burden across operational spend.',
    headlineOutput: 'Average BC contractor profile: $29,400 in new annual PST costs.',
    free: ['Total PST cost', 'Year-1 score cards', 'Cost breakdown table'],
    pro: ['BC vs AB vs ON gap panel', 'Behavioural response scenarios', 'Transition exposure table', 'Export / print'],
  },
  {
    group: 'exposure',
    name: 'Multi-Province Surplus & Rate Comparator',
    href: '/tools/province-comparator',
    status: 'Live',
    description: 'Compares jurisdiction rate pressure and surplus conditions.',
    headlineOutput: 'Default BC-only view: rate is 9.6% above system average this cycle.',
    free: ['BC only', 'Current year only', 'Rate vs. system average'],
    pro: ['Five-jurisdiction comparison', 'Three-year trajectory', 'Dollar differential with payroll', 'Rate differential chart'],
  },
  {
    group: 'reduction',
    name: 'Experience Rating Optimizer',
    href: '/tools/experience-rating-optimizer',
    status: 'Live',
    description: 'Calculates true risk-adjusted WCB rate versus assessed rate.',
    headlineOutput: 'Default employer profile: 0.42 rate-point variance identified.',
    free: ['One-year input only', 'Risk-adjusted vs current rate', 'No dollar variance in free'],
    pro: ['Three-year data entry', 'Dollar variance at payroll', 'Appeal and RTW flags', 'Scenario sensitivity matrix'],
  },
  {
    group: 'reduction',
    name: 'Claims Suppression Self-Audit',
    href: '/tools/suppression-audit',
    status: 'Live',
    description: 'Assesses reporting culture and suppression-risk indicators.',
    headlineOutput: 'Default partial audit profile: elevated suppression pattern after Q7.',
    free: ['Questions 1–7 only', 'Partial risk score', 'Wall before full suppression estimate'],
    pro: ['All 15 questions', 'Section 73 fine exposure', 'Tucker/IWH percentile', 'Remediation priority list'],
  },
  {
    group: 'monitoring',
    name: 'Mental Health Claims Surge Forecaster',
    href: '/tools/mental-health-forecaster',
    status: 'Live',
    description: 'Forecasts mental disorder claims incidence by sector and headcount.',
    headlineOutput: 'Median healthcare employer (50 staff): 2.3 expected claims in Year 1.',
    free: ['Sector + headcount input', 'Year-1 claim count', 'Generic exposure label'],
    pro: ['Three-year claims/cost forecast', 'Experience-rating impact', 'Mitigation checklist impact', 'Sector comparison chart'],
  },

  {
    group: 'monitoring',
    name: 'Municipal Growth Models',
    href: '/tools/municipal-models',
    status: 'Live',
    description: 'City-level scenario modeling for population, housing, employment, and land demand.',
    headlineOutput: 'Select a city and run low/medium/high growth pathways with 5-to-25 year horizon controls.',
    free: ['City selector', 'Scenario controls', 'Population/housing/employment tabs', '5-year projection table'],
    pro: ['Custom city calibration', 'Policy sensitivity toggles', 'Data-room export', 'Advisor interpretation'],
  },


  {
    group: 'monitoring',
    name: 'BC Decarbonization Model',
    href: '/tools/bc-decarbonization-model',
    status: 'Live',
    description: 'Stress-tests BC emissions policy pathways against the 2030 legal target.',
    headlineOutput: 'Baseline scenario: grid and sector constraints determine whether 61.0 Mt is achievable by 2030.',
    free: ['Explore policy sliders', 'Baseline dashboard', 'Three-scenario comparison', 'JSON export'],
    pro: ['Scenario libraries', 'Deeper calibration', 'Stakeholder packaging', 'Advisory interpretation'],
  },
  {
    group: 'monitoring',
    name: 'Surplus Run-Down Early-Warning Alert Service',
    href: '/tools/surplus-alert',
    status: 'Coming Soon',
    description: 'Tracks funded-ratio threshold pressure and repricing timing risk.',
    headlineOutput: 'Current funded ratio snapshot: threshold pressure rising in base scenario.',
    free: ['Current funded ratio', 'Current threshold status', 'No projection chart'],
    pro: ['36-month erosion chart', 'Threshold timeline alerts', 'Industry-specific rate impact', 'Monthly model refresh'],
  },
];

function DiagnosticsPage() {
  const location = useLocation();
  const [runTools, setRunTools] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RUN_TRACKING_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const totalTools = tools.length;
  const completedCount = runTools.length;
  const progressPct = Math.min(100, Math.round((completedCount / totalTools) * 100));

  const groupedTools = useMemo(() => {
    return toolGroups.map((group) => ({
      ...group,
      tools: tools.filter((tool) => tool.group === group.key),
    }));
  }, []);

  const handleRunTool = (href: string) => {
    setRunTools((prev) => {
      if (prev.includes(href)) return prev;
      const next = [...prev, href];
      localStorage.setItem(RUN_TRACKING_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="pt-20 pb-28 bg-[#F7F1E6] text-[#1f1f1f] min-h-screen">
      <section className="px-6 lg:px-[6vw] py-12 border-b border-[#d8cdb9]">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#6b6255]">Diagnostic tools</p>
        <h1 className="font-heading text-4xl lg:text-5xl mt-3 text-[#131313]">Self-serve exposure tools for BC employers</h1>
        <p className="mt-4 text-lg text-[#2b2b2b] max-w-4xl">
          Nine tools covering WCB repricing risk, PST burden, experience rating variance, claims suppression patterns, municipal growth planning, mental health claims trajectory, and BC decarbonization scenario modelling. Free tier available. Pro unlocks full modeling.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1 rounded border border-[#cfc2ab]">{totalTools} diagnostic tools</span>
          <span className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1 rounded border border-[#cfc2ab]">5 provinces covered</span>
          <span className="font-mono text-xs uppercase tracking-[0.1em] px-3 py-1 rounded border border-[#cfc2ab]">Parameters updated March 2026</span>
        </div>
const tools: DiagnosticTool[] = [
  { name: 'WorkSafeBC Repricing Risk Diagnostic', href: '/worksafebc-repricing-risk-diagnostic', diagnosis: 'Models repricing exposure versus sector and system benchmarks.', input: 'Industry profile and payroll assumptions.', output: 'Three-year repricing trajectory and risk flags.', source: 'WorkSafeBC rate tables and published sector benchmarks.' },
  { name: 'PST Diagnostic Tool', href: '/tools/pst-diagnostic', diagnosis: 'Estimates operational PST burden under BC rules.', input: 'Operational spend categories and cost assumptions.', output: 'Estimated annual PST burden and cost distribution.', source: 'Provincial tax schedules and public expenditure classifications.' },
  { name: 'Multi-Province Surplus & Rate Comparator', href: '/tools/province-comparator', diagnosis: 'Compares jurisdiction-level rate pressure and surplus conditions.', input: 'Province selection and payroll scenario.', output: 'Rate differential and surplus pressure comparisons.', source: 'Public jurisdiction rate filings and funding ratio disclosures.' },
  { name: 'Experience Rating Optimizer', href: '/tools/experience-rating-optimizer', diagnosis: 'Tests assessed rate versus risk-adjusted expectations.', input: 'Claims profile and payroll history.', output: 'Rate variance estimate and exposure hotspots.', source: 'Public experience-rating logic and published claims weighting factors.' },
  { name: 'Claims Suppression Self-Audit', href: '/tools/suppression-audit', diagnosis: 'Assesses reporting culture and suppression-risk indicators.', input: 'Structured reporting responses.', output: 'Suppression-risk profile and remediation priorities.', source: 'Public enforcement frameworks and published suppression indicators.' },
  { name: 'Mental Health Claims Surge Forecaster', href: '/tools/mental-health-forecaster', diagnosis: 'Forecasts mental-disorder claim incidence by sector and scale.', input: 'Sector and headcount assumptions.', output: 'Projected claim counts and exposure direction.', source: 'Public claims trend data and sector baseline rates.' },
  { name: 'BC Decarbonization Model', href: '/tools/bc-decarbonization-model', diagnosis: 'Stress-tests emissions pathways against legal targets.', input: 'Policy and sector pathway selections.', output: 'Scenario-level emissions trajectory and feasibility view.', source: 'Public emissions inventories and policy reference targets.' },
  { name: 'Surplus Run-Down Early-Warning Alert Service', href: '/tools/surplus-alert', diagnosis: 'Tracks funding-ratio threshold pressure and repricing timing risk.', input: 'Funding ratio and contribution assumptions.', output: 'Threshold pressure timeline and early-warning signal.', source: 'Public surplus disclosures and repricing threshold mechanics.' },
  { name: 'Executive Risk Brief Generator', href: '/tools/executive-risk-brief', diagnosis: 'Converts diagnostic outputs into a leadership briefing structure.', input: 'Selected tool outputs and scenario notes.', output: 'Structured risk brief with decision-ready framing.', source: 'Public benchmark context and cross-tool synthesis logic.' },
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
    none: 'Subscription required',
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
            </div>
            {unlocked ? (
              <Link to={tool.href} className="btn-primary mt-4 tool-action">Run →</Link>
            ) : (
              <Link to="/diagnostics/subscribe" className="btn-ghost mt-4 tool-action">Subscribe to access</Link>
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
