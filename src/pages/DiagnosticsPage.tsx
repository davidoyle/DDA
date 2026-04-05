import { Link } from 'react-router-dom';

type DiagnosticTool = {
  name: string;
  href: string;
  diagnosis: string;
  input: string;
  output: string;
  methodNote: string;
};

const tools: DiagnosticTool[] = [
  {
    name: 'WorkSafeBC Repricing Risk Diagnostic',
    href: '/worksafebc-repricing-risk-diagnostic',
    diagnosis: 'Models repricing exposure versus sector and system benchmarks.',
    input: 'Industry profile and payroll assumptions.',
    output: 'Three-year repricing exposure trajectory and risk flags.',
    methodNote: 'Uses public WorkSafeBC rate tables and published sector benchmarks.',
  },
  {
    name: 'PST Diagnostic Tool',
    href: '/tools/pst-diagnostic',
    diagnosis: 'Estimates operational PST burden under BC rules.',
    input: 'Operational spend categories and cost assumptions.',
    output: 'Estimated annual PST burden and cost distribution.',
    methodNote: 'Uses provincial tax schedules and public expenditure classifications.',
  },
  {
    name: 'Multi-Province Surplus & Rate Comparator',
    href: '/tools/province-comparator',
    diagnosis: 'Compares jurisdiction-level rate pressure and surplus conditions.',
    input: 'Province selection and payroll scenario.',
    output: 'Rate differential and surplus pressure comparisons.',
    methodNote: 'Uses public jurisdiction rate filings and funding ratio disclosures.',
  },
  {
    name: 'Experience Rating Optimizer',
    href: '/tools/experience-rating-optimizer',
    diagnosis: 'Tests assessed rate versus risk-adjusted expectations.',
    input: 'Claims profile and payroll history.',
    output: 'Rate variance estimate and exposure hotspots.',
    methodNote: 'Uses public experience-rating logic and published claims weighting factors.',
  },
  {
    name: 'Claims Suppression Self-Audit',
    href: '/tools/suppression-audit',
    diagnosis: 'Assesses reporting culture and suppression-risk indicators.',
    input: 'Operational reporting responses to structured prompts.',
    output: 'Suppression-risk profile and remediation priorities.',
    methodNote: 'Uses public enforcement frameworks and published suppression indicators.',
  },
  {
    name: 'Mental Health Claims Surge Forecaster',
    href: '/tools/mental-health-forecaster',
    diagnosis: 'Forecasts mental-disorder claim incidence by sector and scale.',
    input: 'Sector and headcount assumptions.',
    output: 'Projected claim counts and exposure direction.',
    methodNote: 'Uses public claims trend data and sector-level baseline rates.',
  },
  {
    name: 'BC Decarbonization Model',
    href: '/tools/bc-decarbonization-model',
    diagnosis: 'Stress-tests emissions pathways against legal targets.',
    input: 'Policy and sector pathway selections.',
    output: 'Scenario-level emissions trajectory and feasibility view.',
    methodNote: 'Uses public emissions inventories and policy reference targets.',
  },
  {
    name: 'Surplus Run-Down Early-Warning Alert Service',
    href: '/tools/surplus-alert',
    diagnosis: 'Tracks funding-ratio threshold pressure and repricing timing risk.',
    input: 'Funding ratio and contribution assumptions.',
    output: 'Threshold pressure timeline and early-warning signal.',
    methodNote: 'Uses public surplus disclosures and repricing threshold mechanics.',
  },
  {
    name: 'Executive Risk Brief Generator',
    href: '/tools/executive-risk-brief',
    diagnosis: 'Converts diagnostic outputs into a leadership briefing structure.',
    input: 'Selected tool outputs and scenario notes.',
    output: 'Structured risk brief with decision-ready framing.',
    methodNote: 'Uses public benchmark context and cross-tool synthesis logic.',
  },
];

function DiagnosticsPage() {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel max-w-5xl space-y-4">
        <p className="eyebrow">Diagnostics</p>
        <h1 className="headline-md">Nine diagnostic tools. Built from public evidence. Self-serve, no engagement required.</h1>
        <p className="text-xl text-[#F3EFE6]/85 max-w-5xl">
          The same method that powers commissioned analysis — applied to specific, bounded questions.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.name} className="card space-y-3 border border-[#F3EFE6]/15">
            <h2 className="font-heading text-2xl">{tool.name}</h2>
            <p className="text-[#F3EFE6]/85"><span className="font-semibold">What it diagnoses:</span> {tool.diagnosis}</p>
            <p className="text-[#F3EFE6]/82"><span className="font-semibold">Input required:</span> {tool.input}</p>
            <p className="text-[#F3EFE6]/82"><span className="font-semibold">Output:</span> {tool.output}</p>
            <p className="text-[#F3EFE6]/75"><span className="font-semibold">Method note:</span> {tool.methodNote}</p>
            <Link to={tool.href} className="btn-secondary inline-flex w-fit">
              Open tool →
            </Link>
          </article>
        ))}
      </section>

      <section className="card space-y-4 max-w-5xl">
        <p className="text-[#F3EFE6]/82">
          If a diagnostic surfaces something that requires deeper investigation, the next step is a scoped commissioned
          analysis.
        </p>
        <Link
          to="/contact?context=Following%20up%20on%20diagnostic%20%E2%80%94%20%5Btool%20name%5D"
          className="btn-primary inline-flex w-fit"
        >
          Describe your situation →
        </Link>
      </section>
    </div>
  );
}

export default DiagnosticsPage;
