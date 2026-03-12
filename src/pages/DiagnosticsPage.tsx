import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';

type ToolStatus = 'Live' | 'Coming Soon';

type ToolEntry = {
  name: string;
  href: string;
  status: ToolStatus;
  free: string[];
  pro: string[];
  association: string[];
};

const PRO_PRICE = '$49/month or $399/year';

const tools: ToolEntry[] = [
  {
    name: 'WorkSafeBC Repricing Risk Diagnostic',
    href: '/worksafebc-repricing-risk-diagnostic',
    status: 'Live',
    free: [
      'Industry rate lookup',
      'Basic rate vs. system average comparison',
      'Single-year view',
      'Generic risk label (Low / Moderate / High)',
    ],
    pro: [
      'Three-year rate trajectory forecast',
      'NEER impact calculation',
      'Dollar cost at assessable payroll',
      'Appeal flag logic',
      'Export / print summary',
      'Sector peer comparison',
    ],
    association: [
      'Aggregate member benchmarking report (anonymised)',
      'Co-branded output',
      'Quarterly config update notifications for members',
    ],
  },
  {
    name: 'PST Diagnostic Tool',
    href: '/tools/pst-diagnostic',
    status: 'Live',
    free: [
      'Enter spend and see total PST cost',
      'Score cards (annual cost, % of spend, Year 1 impact)',
      'Cost breakdown table',
    ],
    pro: [
      'Competitive gap panel (BC vs AB vs ON)',
      'Risk flags with source citations',
      'Behavioural response scenarios',
      'Transition exposure table',
      'Advocacy priorities',
      'Investment impact panel',
      'Export / print',
    ],
    association: [
      'White-label with association branding',
      'Member usage summary report',
      'Pre-October 1 briefing deck from aggregate member data',
    ],
  },
  {
    name: 'Mental Health Claims Surge Forecaster',
    href: '/tools/mental-health-forecaster',
    status: 'Live',
    free: [
      'Enter sector + headcount',
      'Expected claim count (Year 1 only)',
      'Generic exposure label',
    ],
    pro: [
      'Three-year projection table and chart',
      'Cost impact in dollars',
      'Experience rating impact',
      'Presumptive coverage flag (healthcare sub-sectors)',
      'Mitigation checklist with estimated impact per item',
      'Sector comparison chart',
      'Export',
    ],
    association: [
      'Aggregate sector exposure report across member base',
      'Quarterly policy/ruling update pushes',
      'Co-brand option for association partners',
    ],
  },
  {
    name: 'Multi-Province Surplus & Rate Comparator',
    href: '/tools/province-comparator',
    status: 'Live',
    free: ['BC only', 'Current year only', 'Rate vs. system average with no dollar output'],
    pro: [
      'All five jurisdictions (BC, AB, ON, WA, OR)',
      'Three-year rate trajectory',
      'Repricing risk score per province',
      'Cross-province cost differential in dollars (with payroll)',
      'Rate differential chart',
      'Data currency notices per jurisdiction',
      'Export',
    ],
    association: [
      'Multi-province member benchmarking',
      'Quarterly rate table refresh pushed to association',
      'Custom jurisdiction sets for each association profile',
    ],
  },
  {
    name: 'Claims Suppression Self-Audit',
    href: '/tools/suppression-audit',
    status: 'Live',
    free: [
      'Questions 1–7 only',
      'Partial risk score',
      'Results wall before full suppression risk and fine exposure',
    ],
    pro: [
      'All 15 questions',
      'Full suppression risk score with band',
      'Section 73 fine exposure estimate',
      'Tucker/IWH benchmark percentile',
      'Score breakdown by group',
      'Remediation priority list',
      'Red-flag panel',
      'Export',
    ],
    association: [
      'Aggregate anonymised benchmark across member base',
      'White-label seat model for HR/consulting partners',
      'Branded remediation report for member distribution',
    ],
  },
  {
    name: 'Experience Rating Optimizer',
    href: '/tools/experience-rating-optimizer',
    status: 'Live',
    free: [
      'Enter one year of data only',
      'True risk-adjusted rate vs. current rate',
      'No dollar variance, forecast, or flags in free view',
    ],
    pro: [
      'Full three-year data entry',
      'Dollar variance at assessable payroll',
      'Three-year forecast across scenarios',
      'Appeal flag with estimated dollar value',
      'RTW modification flag',
      'Claim scenario sensitivity table',
      'Export',
    ],
    association: [
      'Aggregate rate variance report across member base',
      'Direct bridge to province comparator for multi-province members',
      'Association benefit tier support',
    ],
  },
  {
    name: 'Surplus Run-Down Early-Warning Alert Service',
    href: '/tools/surplus-alert',
    status: 'Coming Soon',
    free: [
      'Current funded ratio (static source)',
      'Current threshold status only',
      'No projection, no chart, no industry rate impact',
    ],
    pro: [
      '36-month erosion projection chart (Bull / Base / Bear)',
      'Threshold timeline alerts',
      'Industry-specific rate impact estimate',
      'Email waitlist for Phase 2 alerts',
      'Monthly model refresh with proxy data updates',
    ],
    association: [
      'Branded alert emails to members (Phase 2)',
      'Custom threshold settings per association',
      'Association alert distribution licensing',
    ],
  },
  {
    name: 'Executive Risk Brief',
    href: '/tools/executive-risk-brief',
    status: 'Live',
    free: ['Top-level exposure framing only'],
    pro: ['Board-ready portfolio rollup across diagnostics tools'],
    association: [
      'Institutional wrapper with white-label delivery',
      'Member-level aggregate views',
      'Quarterly publication-ready updates',
    ],
  },
];

const DiagnosticsPage = () => {
  const location = useLocation();
  const [showFullDiagnostic, setShowFullDiagnostic] = useState(false);

  const toolCountLabel = useMemo(
    () => `${tools.length} tools available`,
    [],
  );

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Diagnostics</p>
        <h1 className="headline-lg max-w-4xl">Diagnostic Tools</h1>
        <p className="text-[#F3EFE6]/75 mt-3">{toolCountLabel}</p>
      </section>

      <section className="px-6 lg:px-[8vw] py-10 border-b border-[#F3EFE6]/10">
        <div className="card max-w-4xl flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-2xl">Access Mode</p>
            <p className="text-[#F3EFE6]/75">Free preview is default. Toggle to view Pro and Association access details.</p>
          </div>
          <label className="flex items-center gap-3 text-sm text-[#F3EFE6]/85">
            <span>Show Pro + Association</span>
            <Switch
              checked={showFullDiagnostic}
              onCheckedChange={setShowFullDiagnostic}
              aria-label="Show Pro and Association access"
            />
          </label>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 grid gap-6">
        {tools.map((tool) => (
          <article className="card space-y-5 max-w-5xl" key={tool.name}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">{tool.status}</p>
              {showFullDiagnostic && (
                <>
                  <span className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded border border-[#D4A03A]/40 text-[#F3EFE6]/90">Pro</span>
                  <span className="text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded border border-[#D4A03A]/40 text-[#F3EFE6]/90">Association</span>
                </>
              )}
            </div>

            <h2 className="font-heading text-3xl">{tool.name}</h2>

            {!showFullDiagnostic ? (
              <>
                <div>
                  <p className="font-semibold text-[#F3EFE6] mb-2">Included in preview</p>
                  <ul className="list-disc pl-5 text-[#F3EFE6]/80 space-y-1">
                    {tool.free.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#D4A03A]/40 bg-[#D4A03A]/5 rounded-lg p-4 space-y-2">
                  <p className="font-semibold text-[#F3EFE6]">What you’re missing</p>
                  <p className="text-sm text-[#F3EFE6]/80">{tool.pro.slice(0, 3).join(' • ')}</p>
                  <p className="font-semibold text-[#D4A03A]">{PRO_PRICE}</p>
                  <button className="btn-primary">Unlock full diagnostic</button>
                </div>
              </>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-semibold text-[#F3EFE6] mb-2">Pro</p>
                  <ul className="list-disc pl-5 text-[#F3EFE6]/80 space-y-1">
                    {tool.pro.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-[#F3EFE6] mb-2">Association</p>
                  <ul className="list-disc pl-5 text-[#F3EFE6]/80 space-y-1">
                    {tool.association.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div>
              <Link to={tool.href} state={{ from: location.pathname }} className="btn-primary">Open tool</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default DiagnosticsPage;
