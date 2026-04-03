import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';

type ToolStatus = 'Live' | 'Coming Soon';
type ToolGroupKey = 'exposure' | 'reduction' | 'monitoring';

type ToolEntry = {
  name: string;
  href: string;
  status: ToolStatus;
  description: string;
  headlineOutput: string;
  free: string[];
  pro: string[];
  group: ToolGroupKey;
};

type ToolGroup = {
  key: ToolGroupKey;
  title: string;
  description: string;
  borderClass: string;
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
      </section>

      <section className="px-6 lg:px-[6vw] py-6 border-b border-[#d8cdb9]">
        <div className="max-w-[1080px]">
          <p className="font-semibold text-[#1b1b1b]">You&#39;ve run {completedCount} of {totalTools} diagnostics. Your exposure picture is incomplete.</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[#e2d6c1] overflow-hidden">
            <div className="h-full bg-[#1f3a5f] transition-all duration-300" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-[6vw] py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_280px] gap-8 items-start">
          <div className="space-y-10">
            {groupedTools.map((group) => (
              <section key={group.key} className="space-y-5">
                <header className={`border-l-[3px] ${group.borderClass} pl-4`}>
                  <h2 className="font-heading text-3xl text-[#141414]">{group.title}</h2>
                  <p className="text-[#4a453d] mt-1">{group.description}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {group.tools.map((tool) => (
                    <article key={tool.name} className="bg-white border border-[#d8cdb9] rounded-xl p-5 space-y-5 shadow-sm">
                      <div className="flex justify-end">
                        <span className={`font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded ${tool.status === 'Live' ? 'bg-[#2E5E3E]/10 text-[#2E5E3E] border border-[#2E5E3E]/30' : 'bg-[#6b6b6b]/10 text-[#5d5d5d] border border-[#7b7b7b]/30'}`}>
                          {tool.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-heading text-2xl text-[#111]">{tool.name}</h3>
                        <p className="text-[#4a453d] mt-1">{tool.description}</p>
                      </div>

                      <p className="text-[#1a1a1a] font-semibold">{tool.headlineOutput}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-[#111] mb-2">Free</p>
                          <ul className="list-disc pl-5 text-[#333] space-y-1 text-sm">
                            {tool.free.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-[#111] mb-2">Pro</p>
                          <ul className="space-y-2 text-sm">
                            {tool.pro.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-[#333]/60">
                                <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Link
                          to={tool.href}
                          state={{ from: location.pathname }}
                          className="inline-flex items-center justify-center rounded-md px-4 py-2.5 bg-[#1f3a5f] text-white font-medium"
                          onClick={() => handleRunTool(tool.href)}
                        >
                          Run free diagnostic
                        </Link>
                        <Link
                          to="/consultation"
                          state={{ from: location.pathname, requested: 'pro-upgrade', tool: tool.name }}
                          className="inline-flex items-center justify-center rounded-md px-4 py-2.5 border border-[#1f3a5f] text-[#1f3a5f] font-medium"
                        >
                          Unlock Pro — {UPGRADE_PRICE}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="bg-white border border-[#d8cdb9] rounded-xl p-5 space-y-4">
              <p className="text-sm text-[#2b2b2b]">
                The diagnostic tools are a starting point — self-serve exposure modeling built from publicly available parameters. For organizations that need the full picture, a commissioned analysis goes further: multi-source synthesis, structural pattern identification, scenario modeling, and a documented deliverable your team can use.
              </p>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-md px-4 py-2.5 border border-[#1f3a5f] text-[#1f3a5f] font-medium">
                Commission full analysis
              </Link>
            </section>
          </div>
          <aside className="hidden xl:block sticky top-24">
            <div className="bg-white border border-[#d8cdb9] rounded-xl p-5 space-y-5">
              <div>
                <p className="font-semibold text-[#121212] mb-3">Tier comparison</p>
                <div className="text-xs overflow-hidden border border-[#e3d7c2] rounded-md">
                  <div className="grid grid-cols-4 bg-[#f4eee3] font-semibold">
                    <div className="p-2">Capability</div><div className="p-2">Free</div><div className="p-2">Pro</div><div className="p-2">Association</div>
                  </div>
                  {[
                    ['Tools', '8', '8', '8'],
                    ['Provinces', '1', '5', '5+custom'],
                    ['Export', '✕', '✓', '✓'],
                    ['Benchmarking', '✕', '✓', '✓'],
                    ['White-label', '✕', '✕', '✓'],
                  ].map((row) => (
                    <div key={row[0]} className="grid grid-cols-4 border-t border-[#efe4d1]">
                      {row.map((col) => <div key={col} className="p-2">{col}</div>)}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-[#121212]">Pricing</p>
                <p className="text-sm mt-1">Pro: <span className="font-semibold">$399/year</span></p>
                <p className="text-sm">Association: <span className="font-semibold">Starting at $3,500/year</span></p>
              </div>

              <Link to="/consultation" state={{ from: location.pathname, requested: 'pro-upgrade' }} className="inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 bg-[#1f3a5f] text-white font-medium">
                Start Pro — $399/year
              </Link>

              <p className="text-xs text-[#5b5347] border-t border-[#ece0cc] pt-3">
                Used by BC employers. Parameters sourced from StatsCan, BC MoF, IMF WP/20/77.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <div className="xl:hidden fixed bottom-0 inset-x-0 border-t border-[#d8cdb9] bg-white/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3">
        <p className="text-sm text-[#232323]">Pro — $399/year</p>
        <Link to="/consultation" state={{ from: location.pathname, requested: 'pro-upgrade' }} className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-[#1f3a5f] text-white text-sm font-medium">
          Upgrade
        </Link>
      </div>
    </div>
  );
}

export default DiagnosticsPage;
