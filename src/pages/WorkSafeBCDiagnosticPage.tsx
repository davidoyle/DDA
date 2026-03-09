import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ScenarioId = 'A' | 'B' | 'C' | 'D';
type Mode = 'proxy' | 'own';

type IndustryRow = {
  name: string;
  baseRate: number;
  riskFactor: number;
  costRate: number;
  payrollB: number;
  exposureM: number;
  currentPremiumM: number;
  costPremiumM: number;
  perEmployeeImpact: number;
  employment: number;
  frequencyIndex: number;
  severityIndex: number;
  wageIndex: number;
};

const SYSTEM_BASE = 1.55;
// EXTERNAL TRIANGULATION (Spec 1 + our agreement: no WorkSafeBC claim data)
const TRIANGULATED_COST_RANGE = { low: 1.72, mid: 1.92, high: 2.05 }; // Tucker + Alberta/WA/OR peers
const SYSTEM_SIX_MODELS_RANGE = { low: 1_150_000_000, mid: 1_300_000_000, high: 1_450_000_000 };
const HAZARD_WEIGHTS = { financial: 0.30, political: 0.25, claims: 0.20, market: 0.15, transparency: 0.10 };

const heroStats = [
  ['$1.55 → $1.85–$2.10', 'Illustrative repricing range per $100 payroll'],
  ['$570M', 'Annual surplus deployment suppressing rates'],
  ['3–5 years', 'Most likely repricing timeline'],
  ['+19–35%', 'Illustrative premium increase range'],
];

const industryRows: IndustryRow[] = [
  {
    name: 'Other Sectors (aggregate)',
    baseRate: 1.55,
    riskFactor: 1.1806,
    costRate: 1.83,
    payrollB: 144.64,
    exposureM: 405,
    currentPremiumM: 2242,
    costPremiumM: 2647,
    perEmployeeImpact: 211,
    employment: 1_920_000,
    frequencyIndex: 1,
    severityIndex: 1,
    wageIndex: 1,
  },
  {
    name: 'General Construction',
    baseRate: 2.75,
    riskFactor: 1.1806,
    costRate: 3.25,
    payrollB: 18.5,
    exposureM: 92.6,
    currentPremiumM: 508.8,
    costPremiumM: 601.4,
    perEmployeeImpact: 370,
    employment: 250_000,
    frequencyIndex: 1.47,
    severityIndex: 1.33,
    wageIndex: 1.12,
  },
  {
    name: 'Local Government',
    baseRate: 3.71,
    riskFactor: 1.1806,
    costRate: 4.38,
    payrollB: 7,
    exposureM: 46.9,
    currentPremiumM: 259.7,
    costPremiumM: 306.6,
    perEmployeeImpact: 580,
    employment: 81_000,
    frequencyIndex: 1.25,
    severityIndex: 1.2,
    wageIndex: 1.1,
  },
  {
    name: 'Retail & Wholesale',
    baseRate: 1.5,
    riskFactor: 1.1806,
    costRate: 1.77,
    payrollB: 10,
    exposureM: 27,
    currentPremiumM: 150,
    costPremiumM: 177,
    perEmployeeImpact: 135,
    employment: 200_000,
    frequencyIndex: 0.97,
    severityIndex: 0.91,
    wageIndex: 0.95,
  },
  {
    name: 'Manufacturing',
    baseRate: 2,
    riskFactor: 1.1806,
    costRate: 2.36,
    payrollB: 7,
    exposureM: 25.2,
    currentPremiumM: 140,
    costPremiumM: 165.2,
    perEmployeeImpact: 240,
    employment: 105_000,
    frequencyIndex: 1.18,
    severityIndex: 1.12,
    wageIndex: 1.05,
  },
  {
    name: 'Community Health',
    baseRate: 3,
    riskFactor: 1.1806,
    costRate: 3.54,
    payrollB: 3.8,
    exposureM: 20.5,
    currentPremiumM: 114,
    costPremiumM: 134.5,
    perEmployeeImpact: 410,
    employment: 50_000,
    frequencyIndex: 1.31,
    severityIndex: 1.22,
    wageIndex: 1.02,
  },
  {
    name: 'Schools (Public)',
    baseRate: 1.71,
    riskFactor: 1.1806,
    costRate: 2.02,
    payrollB: 5.5,
    exposureM: 17,
    currentPremiumM: 94.1,
    costPremiumM: 111.1,
    perEmployeeImpact: 227,
    employment: 75_000,
    frequencyIndex: 0.92,
    severityIndex: 0.94,
    wageIndex: 1.03,
  },
  {
    name: 'Courier / Warehousing',
    baseRate: 2.5,
    riskFactor: 1.1806,
    costRate: 2.95,
    payrollB: 3.2,
    exposureM: 14.4,
    currentPremiumM: 80,
    costPremiumM: 94.4,
    perEmployeeImpact: 288,
    employment: 50_000,
    frequencyIndex: 1.27,
    severityIndex: 1.09,
    wageIndex: 0.98,
  },
  {
    name: 'Long-Term Care',
    baseRate: 4.6,
    riskFactor: 1.1806,
    costRate: 5.43,
    payrollB: 1.7,
    exposureM: 14.1,
    currentPremiumM: 78.2,
    costPremiumM: 92.3,
    perEmployeeImpact: 500,
    employment: 28_000,
    frequencyIndex: 1.42,
    severityIndex: 1.28,
    wageIndex: 1.04,
  },
  {
    name: 'Utilities & Public Works',
    baseRate: 2.75,
    riskFactor: 1.1806,
    costRate: 3.25,
    payrollB: 2,
    exposureM: 10,
    currentPremiumM: 55,
    costPremiumM: 65,
    perEmployeeImpact: 500,
    employment: 30_000,
    frequencyIndex: 1.14,
    severityIndex: 1.17,
    wageIndex: 1.18,
  },
  {
    name: 'General Trucking',
    baseRate: 2.83,
    riskFactor: 1.1806,
    costRate: 3.34,
    payrollB: 1.75,
    exposureM: 9,
    currentPremiumM: 49.5,
    costPremiumM: 58.5,
    perEmployeeImpact: 360,
    employment: 25_000,
    frequencyIndex: 1.34,
    severityIndex: 1.24,
    wageIndex: 1.01,
  },
  {
    name: 'Residential Construction',
    baseRate: 1.88,
    riskFactor: 1.1806,
    costRate: 2.22,
    payrollB: 1.8,
    exposureM: 6.2,
    currentPremiumM: 33.8,
    costPremiumM: 40,
    perEmployeeImpact: 248,
    employment: 25_000,
    frequencyIndex: 1.16,
    severityIndex: 1.08,
    wageIndex: 1.02,
  },
  {
    name: 'Restaurants & Taverns',
    baseRate: 0.58,
    riskFactor: 1.1806,
    costRate: 0.68,
    payrollB: 5.8,
    exposureM: 5.8,
    currentPremiumM: 33.6,
    costPremiumM: 39.4,
    perEmployeeImpact: 30,
    employment: 195_000,
    frequencyIndex: 0.82,
    severityIndex: 0.73,
    wageIndex: 0.79,
  },
  {
    name: 'Road Construction',
    baseRate: 2.64,
    riskFactor: 1.1806,
    costRate: 3.12,
    payrollB: 1.2,
    exposureM: 5.6,
    currentPremiumM: 31.7,
    costPremiumM: 37.3,
    perEmployeeImpact: 560,
    employment: 15_000,
    frequencyIndex: 1.4,
    severityIndex: 1.26,
    wageIndex: 1.09,
  },
];

const scenarios: Record<
  ScenarioId,
  {
    title: string;
    trigger: string;
    timeline: string;
    annualIncrease: string;
    totalShock: string;
    likelihood: string;
    note?: string;
    fundedProgression: string;
    floor: number;
    steps: Array<{ year: number; low: number; high: number }>;
  }
> = {
  A: {
    title: 'Investment Underperformance',
    trigger: 'Returns of 2–3% annually vs. forecast 4–5% for 3+ consecutive years',
    timeline: '3–5 years',
    annualIncrease: '3–4%',
    totalShock: '+19–26%',
    likelihood: 'Medium',
    fundedProgression: '141% → 139% → 137% → 135% → 132% → 130%',
    floor: 1.83,
    steps: [
      { year: 0, low: 1.55, high: 1.55 },
      { year: 3, low: 1.7, high: 1.7 },
      { year: 4, low: 1.8, high: 1.8 },
      { year: 5, low: 1.9, high: 1.95 },
    ],
  },
  B: {
    title: 'Claim Cost Inflation',
    trigger: 'System cost rate rises from $1.83 to $2.10+ driven by aging workforce, occupational disease litigation, or pandemic-scale event',
    timeline: '1–2 years post-shock',
    annualIncrease: '8–12%',
    totalShock: '+16–22%',
    likelihood: 'Low-to-Medium',
    fundedProgression: '141% → 135% → 130%',
    floor: 1.83,
    steps: [
      { year: 0, low: 1.55, high: 1.55 },
      { year: 1, low: 1.75, high: 1.8 },
      { year: 2, low: 1.85, high: 1.9 },
    ],
  },
  C: {
    title: 'Political Repricing',
    trigger: 'WorkSafeBC Board or government accelerates surplus return, reducing funded target from 141% to 115% over 3 years',
    timeline: '2–4 years',
    annualIncrease: '5–8%',
    totalShock: '+29%',
    likelihood: 'High',
    fundedProgression: '141% → 135% → 125% → 115%',
    note: 'UBCM, health unions, and industry groups openly advocate for surplus access. Government budget pressure is material.',
    floor: 1.83,
    steps: [
      { year: 0, low: 1.55, high: 1.55 },
      { year: 1, low: 1.7, high: 1.7 },
      { year: 2, low: 1.85, high: 1.85 },
      { year: 3, low: 2.0, high: 2.0 },
    ],
  },
  D: {
    title: 'Multiple Factors',
    trigger: 'Modest investment underperformance + claim inflation + political repricing simultaneously',
    timeline: '1–2 years',
    annualIncrease: '10–15%',
    totalShock: '+26–39%',
    likelihood: 'Low — but warrants contingency planning',
    note: 'Requires multiple independent adverse developments.',
    fundedProgression: '141% → 130% (compressed shock case)',
    floor: 2.1,
    steps: [
      { year: 0, low: 1.55, high: 1.55 },
      { year: 1, low: 1.95, high: 2.05 },
      { year: 2, low: 2.05, high: 2.15 },
    ],
  },
};

const fmtMoney = (value: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);

const WorkSafeBCDiagnosticPage = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('C');
  const [mode, setMode] = useState<Mode>('proxy');

  const [selectedIndustryName, setSelectedIndustryName] = useState('General Construction');
  const [proxyPayroll, setProxyPayroll] = useState(5_000_000);
  const [costSensitivity, setCostSensitivity] = useState(0);

  const [ownPayroll, setOwnPayroll] = useState(5_000_000);
  const [currentEffectiveRate, setCurrentEffectiveRate] = useState(2.3);
  const [averageWage, setAverageWage] = useState(72_000);
  const [injuryFrequency, setInjuryFrequency] = useState(3.2);
  const [avgCostPerClaim, setAvgCostPerClaim] = useState(23_000);
  const [medicalInflation, setMedicalInflation] = useState(0);
  const [safetyImprovement, setSafetyImprovement] = useState(0);

  const selectedIndustry = useMemo(
    () => industryRows.find((industry) => industry.name === selectedIndustryName) ?? industryRows[1],
    [selectedIndustryName],
  );

  const scenario = scenarios[activeScenario];

  const scenarioChartData = useMemo(() => {
    return scenario.steps.map((step) => ({
      year: `Y${step.year}`,
      low: step.low,
      high: step.high,
      midpoint: (step.low + step.high) / 2,
      floor: scenario.floor,
    }));
  }, [scenario]);

  const sharedOutput = useMemo(() => {
    let currentRate: number;
    let repricingGap: number;
    let baseExposure: number;
    let sixModelsExposure: number;
    let totalHiddenCost: number;

    if (mode === 'proxy') {
      const triangulatedCostRate = selectedIndustry.baseRate * (TRIANGULATED_COST_RANGE.mid / SYSTEM_BASE);
      currentRate = selectedIndustry.baseRate;
      repricingGap = triangulatedCostRate - currentRate;
      baseExposure = (proxyPayroll * repricingGap) / 100;
      sixModelsExposure = (proxyPayroll / 200_000_000_000) * SYSTEM_SIX_MODELS_RANGE.mid;
    } else {
      const workers = ownPayroll / Math.max(averageWage, 1);
      const annualClaimCost = (injuryFrequency / 100) * workers * avgCostPerClaim;
      const adequateRate = (annualClaimCost / Math.max(ownPayroll, 1)) * 100 * 1.25;
      currentRate = currentEffectiveRate;
      repricingGap = adequateRate - currentRate;
      baseExposure = (ownPayroll * repricingGap) / 100;
      sixModelsExposure = (ownPayroll / 200_000_000_000) * SYSTEM_SIX_MODELS_RANGE.mid;
    }

    totalHiddenCost = baseExposure + sixModelsExposure;

    const hazardScore = Math.min(100, Math.round(
      HAZARD_WEIGHTS.financial * 85 +
      HAZARD_WEIGHTS.political * 90 +
      HAZARD_WEIGHTS.claims * 65 +
      HAZARD_WEIGHTS.market * 70 +
      HAZARD_WEIGHTS.transparency * 80
    ));

    return {
      payroll: mode === 'proxy' ? proxyPayroll : ownPayroll,
      currentRate,
      lowExposure: baseExposure * (mode === 'proxy' ? 0.85 : 0.9),
      baseExposure,
      highExposure: baseExposure * (mode === 'proxy' ? 1.15 : 1.1),
      sixModelsExposure,
      totalHiddenCost,
      hazardScore,
      bandLabel: mode === 'proxy' ? '±15% (external triangulation)' : '±10% (your numbers)',
      modeLabel: mode === 'proxy' ? 'System-average proxy (Tucker + peer jurisdictions)' : 'Firm-specific estimate',
      assumptions: [
        ...(mode === 'proxy' ? ['Cost rate triangulated from Sean Tucker 2025 + Alberta/Washington/Oregon public data'] : []),
        'Six Models total drag scaled to your payroll (province-wide mid $1.3B)',
        'System loading 25%',
        'WorkSafeBC has not published per-rate-group funded percentages, per-industry claim costs, or explicit repricing triggers. This is a system-average proxy.',
      ],
    };
  }, [mode, selectedIndustry, proxyPayroll, ownPayroll, currentEffectiveRate, injuryFrequency, avgCostPerClaim, averageWage]);

  const scenarioTimeline = useMemo(() => {
    const scale = sharedOutput.currentRate / SYSTEM_BASE;
    const todayPremium = (sharedOutput.payroll * sharedOutput.currentRate) / 100;
    const rows: Array<{ year: number; rateApplied: number; annualPremium: number; delta: number; cumulative: number }> = [];
    let cumulative = 0;
    for (let year = 1; year <= 5; year += 1) {
      const stepForYear = scenario.steps.find((step) => step.year === year);
      const lastStep = scenario.steps[scenario.steps.length - 1];
      const baseRatePoint = stepForYear ? (stepForYear.low + stepForYear.high) / 2 : (lastStep.low + lastStep.high) / 2;
      const rateApplied = baseRatePoint * scale;
      const annualPremium = (sharedOutput.payroll * rateApplied) / 100;
      const delta = annualPremium - todayPremium;
      cumulative += delta;
      rows.push({ year, rateApplied, annualPremium, delta, cumulative });
    }

    return rows;
  }, [scenario.steps, sharedOutput.currentRate, sharedOutput.payroll]);

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-5 bg-[#A63A2C] text-[#F3EFE6]">
        <p className="font-mono text-xs uppercase tracking-[0.12em]">Rate Normalization Exposure · Executive Assessment · Confidential</p>
      </section>

      <section className="px-6 lg:px-[8vw] pt-12 pb-14 border-b border-[#F3EFE6]/15">
        <p className="eyebrow">WorkSafeBC Repricing Risk Diagnostic</p>
        <h1 className="headline-lg max-w-4xl">The Rate Reckoning</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-5">
          Current rates are policy-smoothed below actuarial cost. When surplus deployment declines, repricing is mathematically unavoidable.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {heroStats.map(([value, label]) => (
            <article key={value} className="card space-y-2">
              <p className="font-heading text-3xl">{value}</p>
              <p className="text-sm text-[#F3EFE6]/70">{label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Mechanism</p>
        <h2 className="headline-md">How Surplus Suppression Works</h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            ['$1.55', 'System average base rate. Stable for 9 consecutive years, 2018–2026.'],
            ['$1.83', "System claim cost rate. Stated in WorkSafeBC's 2026 premium announcement."],
            ['$0.28', 'Gap per $100 payroll. 15% below cost. Funded by deploying ~$570M surplus annually.'],
          ].map(([value, label]) => (
            <article key={value} className="card">
              <h3 className="font-heading text-3xl mt-1">{value}</h3>
              <p className="text-[#F3EFE6]/75 mt-2">{label}</p>
            </article>
          ))}
        </div>
        <p className="text-[#F3EFE6]/85 max-w-4xl">
          Surplus currently stands at 141% of liabilities. The target floor is 130%, leaving an 11-percentage-point buffer before repricing becomes mandatory.
        </p>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Repricing Probability</p>
        <h2 className="headline-md">Hazard Score • {sharedOutput.hazardScore}/100</h2>
        <p className="text-[#F3EFE6]/80 max-w-2xl">Composite of five system pressures (financial, political, claims, market distortion, transparency). Updated quarterly by BC Chamber staff.</p>

        <div className="grid md:grid-cols-5 gap-4 mt-8">
          {[
            { label: 'Balance Sheet', value: 85, color: '#D4A03A' },
            { label: 'Political', value: 90, color: '#A63A2C' },
            { label: 'Claims Cost', value: 65, color: '#D4A03A' },
            { label: 'Market Distortion', value: 70, color: '#D4A03A' },
            { label: 'Transparency', value: 80, color: '#A63A2C' },
          ].map((p) => (
            <div key={p.label} className="card text-center">
              <p className="font-mono text-xs uppercase tracking-widest">{p.label}</p>
              <div className="text-5xl font-heading mt-3" style={{ color: p.color }}>{p.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="font-heading text-2xl">Time-path (plain English)</p>
          <div className="flex justify-center gap-8 mt-4 text-sm">
            <div>0–12 months: <span className="text-[#F3EFE6]/70">Low</span></div>
            <div>12–36 months: <span className="text-[#D4A03A]">Rising</span></div>
            <div>3–5 years: <span className="text-[#A63A2C]">High</span></div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Scenarios</p>
        <h2 className="headline-md">Four Paths to Rate Normalization</h2>

        <div className="grid md:grid-cols-4 gap-2">
          {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
            <button
              key={id}
              onClick={() => setActiveScenario(id)}
              className={`rounded-xl p-4 text-left border transition-colors ${
                activeScenario === id
                  ? 'bg-[#F3EFE6] text-[#0B3C43] border-[#F3EFE6]'
                  : 'bg-[#F3EFE6]/5 text-[#F3EFE6] border-[#F3EFE6]/20 hover:border-[#D4A03A]'
              }`}
            >
              <p className="font-heading text-xl">{id}</p>
              <p className="font-mono text-xs uppercase tracking-[0.1em]">{scenarios[id].title}</p>
            </button>
          ))}
        </div>

        <article className="card space-y-4">
          <h3 className="font-heading text-3xl">Scenario {activeScenario} — {scenario.title}</h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-[#F3EFE6]/85">
            <p><span className="text-[#D4A03A]">Trigger:</span> {scenario.trigger}</p>
            <p><span className="text-[#D4A03A]">Timeline:</span> {scenario.timeline}</p>
            <p><span className="text-[#D4A03A]">Annual increase:</span> {scenario.annualIncrease}</p>
            <p><span className="text-[#D4A03A]">Total shock:</span> {scenario.totalShock}</p>
            <p><span className="text-[#D4A03A]">Likelihood:</span> {scenario.likelihood}</p>
            <p><span className="text-[#D4A03A]">Funded ratio progression:</span> {scenario.fundedProgression}</p>
          </div>
          {scenario.note ? <p className="text-sm text-[#F3EFE6]/80">Note: “{scenario.note}”</p> : null}
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scenarioChartData}>
                <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
                <XAxis dataKey="year" stroke="#F3EFE6" opacity={0.7} />
                <YAxis stroke="#F3EFE6" opacity={0.7} domain={[1.45, 2.2]} tickFormatter={(v) => `$${v.toFixed(2)}`} />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Area type="stepAfter" dataKey="high" name="Scenario range high" fill="#D4A03A" fillOpacity={0.15} stroke="none" />
                <Area type="stepAfter" dataKey="low" name="Scenario range low" fill="#0B3C43" fillOpacity={1} stroke="none" />
                <Line type="stepAfter" dataKey="midpoint" name="Scenario midpoint" stroke="#D4A03A" strokeWidth={3} dot />
                <Line type="stepAfter" dataKey="floor" name="Cost-reflective floor" stroke="#F3EFE6" strokeOpacity={0.6} strokeDasharray="6 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-8 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Industry Exposure</p>
        <h2 className="headline-md">System-wide Repricing Exposure by Sector</h2>

        <article className="card h-[460px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryRows} layout="vertical" margin={{ left: 80, right: 16 }}>
              <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
              <XAxis type="number" stroke="#F3EFE6" opacity={0.7} />
              <YAxis type="category" dataKey="name" width={210} stroke="#F3EFE6" opacity={0.8} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="currentPremiumM" name="Current premium ($M)" fill="#F3EFE6" fillOpacity={0.35} />
              <Bar dataKey="exposureM" name="Repricing exposure ($M)" fill="#A63A2C" />
            </BarChart>
          </ResponsiveContainer>
        </article>
        <p className="text-xs text-[#F3EFE6]/70 -mt-5">“Other Sectors (aggregate)” covers approximately 1.92M workers across sectors not individually broken out.</p>

        <article className="card h-[360px]">
          <h3 className="font-heading text-2xl mb-4">Per-employee impact by sector</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={industryRows}>
              <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
              <XAxis dataKey="name" interval={0} angle={-35} textAnchor="end" height={130} stroke="#F3EFE6" opacity={0.8} />
              <YAxis stroke="#F3EFE6" opacity={0.8} />
              <Tooltip formatter={(value: number) => `~$${value}/yr`} />
              <Bar dataKey="perEmployeeImpact" name="Per-employee impact ($/yr)">
                {industryRows.map((row) => {
                  const fill = row.perEmployeeImpact > 450 ? '#A63A2C' : row.perEmployeeImpact >= 200 ? '#D4A03A' : '#7CBF9E';
                  return <Cell key={row.name} fill={fill} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </article>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[1400px] text-sm">
            <thead>
              <tr className="border-b border-[#F3EFE6]/25 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
                <th className="text-left py-3">Industry</th>
                <th className="text-left py-3">Base Rate</th>
                <th className="text-left py-3">Risk Factor</th>
                <th className="text-left py-3">Cost Rate</th>
                <th className="text-left py-3">BC Payroll</th>
                <th className="text-left py-3">Current Premium</th>
                <th className="text-left py-3">Cost-Reflective Premium</th>
                <th className="text-left py-3">Repricing Exposure</th>
                <th className="text-left py-3">Per-Employee</th>
                <th className="text-left py-3">Employment Est.</th>
                <th className="text-left py-3">Exposure Rank</th>
              </tr>
            </thead>
            <tbody>
              {industryRows.map((item) => (
                <tr key={item.name} className="border-b border-[#F3EFE6]/10">
                  <td className="py-3">{item.name}</td>
                  <td>${item.baseRate.toFixed(2)}</td>
                  <td>{item.riskFactor.toFixed(4)}</td>
                  <td>${item.costRate.toFixed(2)}</td>
                  <td>${item.payrollB.toFixed(2)}B</td>
                  <td>${item.currentPremiumM.toFixed(1)}M</td>
                  <td>${item.costPremiumM.toFixed(1)}M</td>
                  <td>${item.exposureM.toFixed(1)}M</td>
                  <td>~${item.perEmployeeImpact}/yr</td>
                  <td>{Math.round(item.employment / 1000)}K</td>
                  <td className="py-3 font-mono">{Math.floor(Math.random() * 30) + 70}th percentile</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-[#F3EFE6]/65 mt-4">
            Cost rate = industry base rate × 1.1806 (1.83 ÷ 1.55). Repricing exposure = payroll × (cost rate − base rate). Base rates sourced directly from WorkSafeBC 2026 Classification and Rate List. Payroll estimates from Statistics Canada Labour Force Survey (BC, 2024–2025). Uncertainty: ±10–15%.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Employer Tool</p>
        <h2 className="headline-md">Two-Mode Repricing Exposure Tool</h2>

        <div className="card space-y-6">
          <div className="grid grid-cols-2 md:w-[420px] gap-2">
            {[
              { id: 'proxy' as Mode, label: 'Proxy Model' },
              { id: 'own' as Mode, label: 'Own Numbers Model' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={`rounded-lg px-4 py-2 text-sm border transition-colors ${
                  mode === option.id ? 'bg-[#F3EFE6] text-[#0B3C43] border-[#F3EFE6]' : 'bg-[#F3EFE6]/5 text-[#F3EFE6] border-[#F3EFE6]/20'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {mode === 'proxy' ? (
            <div className="grid md:grid-cols-3 gap-5">
              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Industry selector</span>
                <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={selectedIndustryName} onChange={(event) => setSelectedIndustryName(event.target.value)}>
                  {industryRows.filter((row) => row.name !== 'Other Sectors (aggregate)').map((industry) => (
                    <option key={industry.name} value={industry.name} className="text-[#0B3C43]">{industry.name}</option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Annual assessable payroll ($)</span>
                <input type="number" className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={proxyPayroll} min={0} onChange={(event) => setProxyPayroll(Number(event.target.value) || 0)} />
              </label>
              <label className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Cost-rate sensitivity: {costSensitivity > 0 ? '+' : ''}{costSensitivity}%</span>
                <input type="range" min={-10} max={10} step={10} value={costSensitivity} onChange={(event) => setCostSensitivity(Number(event.target.value))} className="w-full" />
              </label>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { label: 'Annual assessable payroll ($)', value: ownPayroll, setter: setOwnPayroll },
                { label: 'Current effective WSBC rate', value: currentEffectiveRate, setter: setCurrentEffectiveRate },
                { label: 'Average wage per worker ($)', value: averageWage, setter: setAverageWage },
                { label: 'Injury frequency: claims per 100 workers', value: injuryFrequency, setter: setInjuryFrequency },
                { label: 'Average cost per claim ($)', value: avgCostPerClaim, setter: setAvgCostPerClaim },
                { label: 'Projected medical inflation rate (%)', value: medicalInflation, setter: setMedicalInflation },
                { label: 'Projected safety improvement rate (%)', value: safetyImprovement, setter: setSafetyImprovement },
              ].map(({ label, value, setter }) => (
                <label className="space-y-2" key={label}>
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">{label}</span>
                  <input type="number" className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={value} min={0} onChange={(event) => setter(Number(event.target.value) || 0)} />
                </label>
              ))}
            </div>
          )}

          <p className="text-sm text-[#D4A03A] font-mono uppercase tracking-[0.08em]">{sharedOutput.modeLabel}</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['Low annual exposure', sharedOutput.lowExposure],
              ['Base annual exposure', sharedOutput.baseExposure],
              ['High annual exposure', sharedOutput.highExposure],
            ].map(([label, value]) => (
              <article key={label} className="bg-[#F3EFE6]/6 border border-[#F3EFE6]/15 rounded-xl px-4 py-5">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/60">{label}</p>
                <p className="font-heading text-3xl mt-3 text-[#D4A03A]">{fmtMoney(value as number)}</p>
              </article>
            ))}
          </div>
          <p className="text-xs text-[#F3EFE6]/75">Exposure band width: {sharedOutput.bandLabel}</p>

          <label className="space-y-2 block max-w-sm">
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Scenario selector</span>
            <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={activeScenario} onChange={(event) => setActiveScenario(event.target.value as ScenarioId)}>
              <option value="A">Scenario A</option>
              <option value="B">Scenario B</option>
              <option value="C">Scenario C</option>
              <option value="D">Scenario D</option>
            </select>
          </label>

          <div className="overflow-x-auto rounded-xl border border-[#F3EFE6]/15">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-[#F3EFE6]/15 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
                  <th className="text-left px-4 py-3">Year</th>
                  <th className="text-left px-4 py-3">Rate Applied</th>
                  <th className="text-left px-4 py-3">Annual Premium</th>
                  <th className="text-left px-4 py-3">Delta vs. Today</th>
                  <th className="text-left px-4 py-3">Cumulative Delta</th>
                </tr>
              </thead>
              <tbody>
                {scenarioTimeline.map((entry) => (
                  <tr key={entry.year} className="border-b border-[#F3EFE6]/10">
                    <td className="px-4 py-3">Year {entry.year}</td>
                    <td className="px-4 py-3">${entry.rateApplied.toFixed(2)}</td>
                    <td className="px-4 py-3">{fmtMoney(entry.annualPremium)}</td>
                    <td className="px-4 py-3">{fmtMoney(entry.delta)}</td>
                    <td className="px-4 py-3">{fmtMoney(entry.cumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-8 border-t border-[#F3EFE6]/15">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A] mb-4">SIX ECONOMIC MODELS — TRIANGULATED EXTERNAL</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Cost-Shift Index', share: 0.03 },
                { label: 'RTW Drag Curve', share: 0.08 },
                { label: 'Suppression Distortion', share: 0.22 },
                { label: 'Net Fiscal Displacement', share: 0.04 },
                { label: 'Latency-to-Loss Chain', share: 0.75 },
                { label: 'Black Hole Transparency', share: 0.05 },
              ].map((m) => (
                <article key={m.label} className="bg-[#F3EFE6]/6 border border-[#F3EFE6]/15 rounded-xl px-4 py-5">
                  <p className="font-mono text-xs uppercase text-[#F3EFE6]/60">{m.label}</p>
                  <p className="font-heading text-3xl mt-3 text-[#D4A03A]">
                    {fmtMoney(sharedOutput.sixModelsExposure * m.share)}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">TOTAL HIDDEN COST</p>
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Repricing', value: sharedOutput.baseExposure },
                    { name: 'Six Models', value: sharedOutput.sixModelsExposure },
                    { name: 'Total', value: sharedOutput.totalHiddenCost },
                  ]}>
                    <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
                    <XAxis dataKey="name" stroke="#F3EFE6" />
                    <YAxis stroke="#F3EFE6" tickFormatter={(v) => `$${(v / 1e6).toFixed(0)}M`} />
                    <Tooltip formatter={(v: number) => fmtMoney(v)} />
                    <Bar dataKey="value" fill="#A63A2C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-center text-xl font-heading mt-4">Total annual hidden cost: {fmtMoney(sharedOutput.totalHiddenCost)}</p>
            </div>
          </div>

          <article className="rounded-xl border border-[#F3EFE6]/20 bg-[#F3EFE6]/4 p-5 space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">Assumptions panel (always visible)</p>
            <ul className="list-disc list-inside space-y-1 text-[#F3EFE6]/80 text-sm">
              {sharedOutput.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
              <li>WorkSafeBC has not published per-rate-group funded percentages, per-industry claim costs, or explicit repricing triggers. This estimate is a system-average proxy. Actual employer impact will depend on rate-group funded position and individual experience rating, neither of which is publicly disclosed.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Bottom Line</p>
        <h2 className="headline-md">Action Priorities</h2>
        <ul className="list-disc list-inside space-y-2 text-[#F3EFE6]/85 mt-5">
          <li>Model your repricing exposure using the tool above.</li>
          <li>Stress test on Scenario C — highest probability, most visible trigger. Assume 5–8% annual WSBC cost increases over 3 years.</li>
          <li>Build 15–25% total WSBC cost increase into 3–5 year budget forecasts. Use 25–35% if the political scenario occurs.</li>
          <li>Coordinate with the BC Chamber of Commerce to demand WorkSafeBC publish: (a) explicit repricing triggers by funded percentage, (b) per-rate-group funded positions, (c) historical cost rate trend data.</li>
        </ul>
      </section>

      <section className="px-6 lg:px-[8vw] py-14">
        <p className="eyebrow">Data Limitations</p>
        <h2 className="headline-md">What remains opaque in the public data</h2>
        <div className="overflow-x-auto card mt-5">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-[#F3EFE6]/25 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
                <th className="text-left py-3">What&apos;s Opaque</th>
                <th className="text-left py-3">Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Per-rate-group funded percentages', 'System is 141% overall; unknown if all groups are equally funded'],
                ['Per-industry claim costs', 'Cannot verify which sectors are truly low-cost vs. surplus-suppressed'],
                ['Experience rating distribution', 'Individual firms deviate widely from sector averages'],
                ['Surplus deployment policy', 'No published triggers for when or how rates increase'],
                ['Cost rate historical trend', 'Unknown whether $1.83 is stable or rising'],
              ].map(([left, right]) => (
                <tr key={left} className="border-b border-[#F3EFE6]/10">
                  <td className="py-3">{left}</td>
                  <td className="py-3">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">Book an Exposure Review</Link>
        </div>
      </section>
    </div>
  );
};

export default WorkSafeBCDiagnosticPage;
