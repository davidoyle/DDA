import { Link, useLocation } from 'react-router-dom';
import { useAccess } from '@/contexts/AccessContext';

type DiagnosticTool = {
  name: string;
  href: string;
  diagnosticsHref?: string;
  demoHref?: string;
  category: 'Workers compensation' | 'Tax and fiscal' | 'Climate and energy' | 'Executive tools';
  diagnosis: string;
  input: string;
  output: string;
  source: string;
};

const tools: DiagnosticTool[] = [
  {
    name: 'WorkSafeBC Repricing Risk Diagnostic',
    href: '/tools/worksafe-repricing',
    diagnosticsHref: '/diagnostics/worksafe-repricing',
    demoHref: '/diagnostics/demo/worksafe-repricing',
    category: 'Workers compensation',
    diagnosis: 'Models repricing exposure versus sector and system benchmarks.',
    input: 'Industry profile and payroll assumptions.',
    output: 'Three-year repricing trajectory and risk flags.',
    source: 'WorkSafeBC rate tables and published sector benchmarks.',
  },
  {
    name: 'PST Diagnostic Tool',
    href: '/tools/pst-diagnostic',
    diagnosticsHref: '/diagnostics/pst-diagnostic',
    demoHref: '/diagnostics/demo/pst-diagnostic',
    category: 'Tax and fiscal',
    diagnosis: 'Estimates operational PST burden under BC rules.',
    input: 'Operational spend categories and cost assumptions.',
    output: 'Estimated annual PST burden and cost distribution.',
    source: 'Provincial tax schedules and public expenditure classifications.',
  },
  {
    name: 'B.C. PST Impact Diagnostic',
    href: '/bc-pst-impact-diagnostic',
    category: 'Tax and fiscal',
    diagnosis: 'Provides the broader B.C. PST impact model for public-sector and organizational cost exposure.',
    input: 'Capital, operating, and supply-chain spend assumptions.',
    output: 'PST impact summary, exposed cost categories, and mitigation questions.',
    source: 'B.C. PST rules and public expenditure classifications.',
  },
  {
    name: 'Multi-Province Surplus & Rate Comparator',
    href: '/tools/province-comparator',
    diagnosticsHref: '/diagnostics/province-comparator',
    demoHref: '/diagnostics/demo/province-comparator',
    category: 'Workers compensation',
    diagnosis: 'Compares jurisdiction-level rate pressure and surplus conditions.',
    input: 'Province selection and payroll scenario.',
    output: 'Rate differential and surplus pressure comparisons.',
    source: 'Public jurisdiction rate filings and funding ratio disclosures.',
  },
  {
    name: 'Experience Rating Optimizer',
    href: '/tools/experience-rating-optimizer',
    diagnosticsHref: '/diagnostics/experience-rating-optimizer',
    category: 'Workers compensation',
    diagnosis: 'Tests assessed rate versus risk-adjusted expectations.',
    input: 'Claims profile and payroll history.',
    output: 'Rate variance estimate and exposure hotspots.',
    source: 'Public experience-rating logic and published claims weighting factors.',
  },
  {
    name: 'Claims Suppression Self-Audit',
    href: '/tools/suppression-audit',
    diagnosticsHref: '/diagnostics/suppression-audit',
    category: 'Workers compensation',
    diagnosis: 'Assesses reporting culture and suppression-risk indicators.',
    input: 'Structured reporting responses.',
    output: 'Suppression-risk profile and remediation priorities.',
    source: 'Public enforcement frameworks and published suppression indicators.',
  },
  {
    name: 'Mental Health Claims Surge Forecaster',
    href: '/tools/mental-health-forecaster',
    diagnosticsHref: '/diagnostics/mental-health-forecaster',
    demoHref: '/diagnostics/demo/mental-health-forecaster',
    category: 'Workers compensation',
    diagnosis: 'Forecasts mental-disorder claim incidence by sector and scale.',
    input: 'Sector and headcount assumptions.',
    output: 'Projected claim counts and exposure direction.',
    source: 'Public claims trend data and sector baseline rates.',
  },
  {
    name: 'BC Decarbonization Model',
    href: '/tools/bc-decarbonization-model',
    diagnosticsHref: '/diagnostics/bc-decarbonization-model',
    category: 'Climate and energy',
    diagnosis: 'Stress-tests emissions pathways against legal targets.',
    input: 'Policy and sector pathway selections.',
    output: 'Scenario-level emissions trajectory and feasibility view.',
    source: 'Public emissions inventories and policy reference targets.',
  },
  {
    name: 'B.C. Energy Fiscal Decision Model',
    href: '/model',
    category: 'Climate and energy',
    diagnosis: 'Models LNG fiscal levers, project IRR, provincial revenue NPV, flags, and audit trail.',
    input: 'Public assumption register with ACTUAL, PROXY, and FLAG defaults.',
    output: 'Executive fiscal-space view, analyst controls, audit trail, and briefing-note export.',
    source: 'BC Budget 2026 anchors, public tax/royalty parameters, and documented flag defaults.',
  },
  {
    name: 'Surplus Run-Down Early-Warning Alert Service',
    href: '/tools/surplus-alert',
    diagnosticsHref: '/diagnostics/surplus-alert',
    category: 'Executive tools',
    diagnosis: 'Tracks funding-ratio threshold pressure and repricing timing risk.',
    input: 'Funding ratio and contribution assumptions.',
    output: 'Threshold pressure timeline and early-warning signal.',
    source: 'Public surplus disclosures and repricing threshold mechanics.',
  },
  {
    name: 'Executive Risk Brief Generator',
    href: '/tools/executive-risk-brief',
    diagnosticsHref: '/diagnostics/executive-risk-brief',
    category: 'Executive tools',
    diagnosis: 'Converts diagnostic outputs into a leadership briefing structure.',
    input: 'Selected tool outputs and scenario notes.',
    output: 'Structured risk brief with decision-ready framing.',
    source: 'Public benchmark context and cross-tool synthesis logic.',
  },
];

const categories: DiagnosticTool['category'][] = ['Workers compensation', 'Tax and fiscal', 'Climate and energy', 'Executive tools'];

function getToolHref(tool: DiagnosticTool, isAuthenticated: boolean, accessMode: string, currentPath: string) {
  if (!isAuthenticated) {
    return `/diagnostics/subscribe?returnUrl=${encodeURIComponent(tool.href)}`;
  }

  if (accessMode === 'demo') {
    return tool.demoHref || tool.href;
  }

  if (currentPath.startsWith('/diagnostics') && tool.diagnosticsHref) {
    return tool.diagnosticsHref;
  }

  return tool.href;
}

function DiagnosticsPage() {
  const location = useLocation();
  const { isAuthenticated, accessMode } = useAccess();

  return (
    <div className="px-6 py-[var(--space-10)] lg:px-16">
      <section className="mx-auto max-w-[1120px]">
        <h1 className="headline-md">All diagnostic tools. Built from public evidence. Self-serve, no engagement required.</h1>
        <p className="mt-4 max-w-[760px] text-[17px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>
          The same method that powers commissioned analysis — applied to specific, bounded questions.
          WorkSafeBC, PST, carbon, and fiscal-model tools support subscriber access, demo paths, and route aliases.
        </p>
        <p className="mt-3 text-[13px]" style={{ color: 'var(--status-ok)' }}>{isAuthenticated ? 'Signed-in access detected. Run buttons open the best available full or demo path.' : 'Sign in or subscribe to unlock full diagnostic runs; demo paths remain available where configured.'}</p>
      </section>

      <section className="mx-auto mt-[var(--space-7)] max-w-[1120px] space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <div className="mb-4 flex items-center justify-between gap-4 border-b pb-2" style={{ borderColor: 'var(--border)' }}>
              <h2 className="text-[18px] font-semibold text-slate-900">{category}</h2>
              <span className="text-xs text-slate-500">{tools.filter((tool) => tool.category === category).length} tools</span>
            </div>
            <div className="grid gap-[var(--space-5)] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {tools.filter((tool) => tool.category === category).map((tool) => (
                <article key={tool.name} className="card tool-card flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[18px] font-medium leading-[1.3]">{tool.name}</h3>
                    {!isAuthenticated ? <span className="lock-icon text-xs text-slate-500" aria-label="Subscription required" /> : accessMode === 'demo' ? <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-medium text-amber-800">Demo</span> : null}
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: 'var(--text-secondary)' }}>{tool.diagnosis}</p>
                  <div className="mt-4 flex-1 space-y-2 border-t pt-4 text-[13px]" style={{ borderColor: 'var(--border)' }}>
                    <p><strong>Input:</strong> {tool.input}</p>
                    <p><strong>Output:</strong> {tool.output}</p>
                    <p><strong>Source:</strong> {tool.source}</p>
                  </div>
                  <Link to={getToolHref(tool, isAuthenticated, accessMode, location.pathname)} className="btn-primary tool-action mt-4">Run →</Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DiagnosticsPage;
