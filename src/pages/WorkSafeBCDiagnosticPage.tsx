import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type Industry = {
  name: string;
  base: number;
  payroll: number;
  employment: number;
};

type ScenarioId = 'A' | 'B' | 'C' | 'D';

const SYSTEM_BASE = 1.55;
const SYSTEM_COST = 1.83;

const industries: Industry[] = [
  { name: 'Long-Term Care', base: 4.6, payroll: 1.7, employment: 28000 },
  { name: 'Local Government', base: 3.71, payroll: 7, employment: 81000 },
  { name: 'General Construction', base: 2.75, payroll: 18.5, employment: 250000 },
  { name: 'Manufacturing', base: 2, payroll: 7, employment: 105000 },
  { name: 'Community Health', base: 3, payroll: 3.8, employment: 50000 },
  { name: 'Schools (Public)', base: 1.71, payroll: 5.5, employment: 75000 },
  { name: 'Utilities & Public Works', base: 2.75, payroll: 2, employment: 30000 },
  { name: 'Courier / Warehousing', base: 2.5, payroll: 3.2, employment: 50000 },
  { name: 'General Trucking', base: 2.83, payroll: 1.75, employment: 25000 },
  { name: 'Road Construction', base: 2.64, payroll: 1.2, employment: 15000 },
  { name: 'Residential Construction', base: 1.88, payroll: 1.8, employment: 25000 },
  { name: 'Retail & Wholesale', base: 1.5, payroll: 10, employment: 200000 },
  { name: 'Restaurants & Taverns', base: 0.58, payroll: 5.8, employment: 195000 },
];

const scenarios = {
  A: {
    title: 'Investment Underperformance',
    summary: 'Returns of 2–3% vs 4–5% over multiple years erode funded-ratio buffer and force gradual repricing.',
    badge: 'Medium likelihood',
    stats: ['Timeline: 3–5 years', 'Rate movement: → $1.90', 'Annual increase: 3–4%', 'Total shock: +19–26%'],
    data: [
      { year: 'Y0', rate: 1.55, floor: 1.83 },
      { year: 'Y1', rate: 1.58, floor: 1.83 },
      { year: 'Y2', rate: 1.63, floor: 1.83 },
      { year: 'Y3', rate: 1.7, floor: 1.83 },
      { year: 'Y4', rate: 1.8, floor: 1.83 },
      { year: 'Y5', rate: 1.92, floor: 1.83 },
    ],
  },
  B: {
    title: 'Claim Cost Inflation',
    summary: 'System claim cost rises toward $2.10+ under workforce aging, recognition shifts, and litigation pressure.',
    badge: 'Low-to-medium likelihood',
    stats: ['Timeline: 1–2 years', 'Rate movement: → $1.85', 'Annual increase: 8–12%', 'Total shock: +16–22%'],
    data: [
      { year: 'Y0', rate: 1.55, floor: 2.1 },
      { year: 'Y1', rate: 1.77, floor: 2.1 },
      { year: 'Y2', rate: 1.87, floor: 2.1 },
    ],
  },
  C: {
    title: 'Political Repricing',
    summary: 'Policy direction accelerates surplus return and compresses timeline for normalization to actuarial rates.',
    badge: 'High likelihood',
    stats: ['Timeline: 2–4 years', 'Rate movement: → $2.00', 'Annual increase: 5–8%', 'Total shock: +29%'],
    data: [
      { year: 'Y0', rate: 1.55, floor: 1.83 },
      { year: 'Y1', rate: 1.7, floor: 1.83 },
      { year: 'Y2', rate: 1.85, floor: 1.83 },
      { year: 'Y3', rate: 2.0, floor: 1.83 },
    ],
  },
  D: {
    title: 'Multi-Factor Compression',
    summary: 'Underperformance, claim inflation, and policy repricing overlap to produce a severe, short timeline repricing.',
    badge: 'Low likelihood / severe impact',
    stats: ['Timeline: 1–2 years', 'Rate movement: → $2.10', 'Annual increase: 10–15%', 'Total shock: +26–39%'],
    data: [
      { year: 'Y0', rate: 1.55, floor: 2.1 },
      { year: 'Y1', rate: 1.8, floor: 2.1 },
      { year: 'Y2', rate: 2.07, floor: 2.1 },
    ],
  },
};

const fmtMoney = (value: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);

const WorkSafeBCDiagnosticPage = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('C');
  const [payroll, setPayroll] = useState(5000000);
  const [industryRate, setIndustryRate] = useState(1.55);

  const industryMetrics = useMemo(() => {
    return industries
      .map((item) => {
        const costRate = SYSTEM_COST * (item.base / SYSTEM_BASE);
        const currentPremium = (item.payroll * 1_000_000_000 * item.base) / 100;
        const costPremium = (item.payroll * 1_000_000_000 * costRate) / 100;
        const exposure = costPremium - currentPremium;
        return {
          ...item,
          costRate,
          currentPremium,
          exposure,
          perEmployee: exposure / item.employment,
        };
      })
      .sort((a, b) => b.exposure - a.exposure);
  }, []);

  const chartExposure = industryMetrics.slice(0, 8).map((item) => ({
    industry: item.name,
    current: Number((item.currentPremium / 1_000_000).toFixed(1)),
    exposure: Number((item.exposure / 1_000_000).toFixed(1)),
  }));

  const calc = useMemo(() => {
    const costRate = SYSTEM_COST * (industryRate / SYSTEM_BASE);
    const annualExposure = (payroll * (costRate - industryRate)) / 100;
    const scenarioC = (payroll * (1500 + 3000 + 4500)) / 1_000_000;
    const scenarioD = ((payroll * (industryRate * 0.35)) / 100) * 2;
    return { annualExposure, scenarioC, scenarioD };
  }, [industryRate, payroll]);

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
          {[
            ['$1.55 → $2.00', 'Illustrative system repricing'],
            ['$570M', 'Annual surplus deployment'],
            ['3–5 years', 'Most likely timeline'],
            ['+19–35%', 'Illustrative premium increase'],
          ].map(([value, label]) => (
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
            ['1', 'Published Base Rate', '$1.55'],
            ['2', 'System Claim Cost Rate', '$1.83'],
            ['3', 'Gap Funded by Surplus', '$0.28'],
          ].map(([step, label, value]) => (
            <article key={step} className="card">
              <p className="text-[#D4A03A] font-mono text-xs">STEP {step}</p>
              <h3 className="font-heading text-2xl mt-3">{value}</h3>
              <p className="text-[#F3EFE6]/70 mt-2">{label}</p>
            </article>
          ))}
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
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-heading text-3xl">{scenarios[activeScenario].title}</h3>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#D4A03A]">{scenarios[activeScenario].badge}</span>
          </div>
          <p className="text-[#F3EFE6]/80">{scenarios[activeScenario].summary}</p>
          <div className="grid md:grid-cols-4 gap-3 text-sm text-[#F3EFE6]/80">
            {scenarios[activeScenario].stats.map((stat) => (
              <p key={stat} className="bg-[#F3EFE6]/5 rounded-lg px-3 py-2">{stat}</p>
            ))}
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarios[activeScenario].data}>
                <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
                <XAxis dataKey="year" stroke="#F3EFE6" opacity={0.7} />
                <YAxis stroke="#F3EFE6" opacity={0.7} domain={[1.3, 2.2]} tickFormatter={(v) => `$${v.toFixed(2)}`} />
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="rate" name="Illustrative Rate" stroke="#D4A03A" strokeWidth={3} dot />
                <Line type="monotone" dataKey="floor" name="Cost-Reflective Floor" stroke="#F3EFE6" strokeOpacity={0.5} strokeDasharray="5 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Industry Exposure</p>
        <h2 className="headline-md">Sector-by-Sector Repricing Impact</h2>

        <article className="card h-[430px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartExposure} layout="vertical" margin={{ left: 40, right: 16 }}>
              <CartesianGrid stroke="#F3EFE6" strokeOpacity={0.08} />
              <XAxis type="number" stroke="#F3EFE6" opacity={0.7} />
              <YAxis type="category" dataKey="industry" width={180} stroke="#F3EFE6" opacity={0.8} />
              <Tooltip formatter={(value: number) => `$${value}M`} />
              <Legend />
              <Bar dataKey="current" name="Current Premium ($M)" fill="#F3EFE6" fillOpacity={0.35} />
              <Bar dataKey="exposure" name="Repricing Exposure ($M)" fill="#A63A2C" />
            </BarChart>
          </ResponsiveContainer>
        </article>

        <div className="overflow-x-auto card">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-[#F3EFE6]/25 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
                <th className="text-left py-3">Industry</th>
                <th className="text-left py-3">Base</th>
                <th className="text-left py-3">Cost</th>
                <th className="text-left py-3">Payroll</th>
                <th className="text-left py-3">Exposure</th>
                <th className="text-left py-3">Per Employee</th>
              </tr>
            </thead>
            <tbody>
              {industryMetrics.map((item) => (
                <tr key={item.name} className="border-b border-[#F3EFE6]/10">
                  <td className="py-3">{item.name}</td>
                  <td>${item.base.toFixed(2)}</td>
                  <td>${item.costRate.toFixed(2)}</td>
                  <td>${item.payroll.toFixed(1)}B</td>
                  <td>${(item.exposure / 1_000_000).toFixed(1)}M</td>
                  <td>~${Math.round(item.perEmployee / 10) * 10}/yr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Employer Tool</p>
        <h2 className="headline-md">Repricing Exposure Calculator</h2>
        <div className="card space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <label className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Annual Assessable Payroll</span>
              <input
                type="number"
                className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3"
                value={payroll}
                min={0}
                onChange={(event) => setPayroll(Number(event.target.value) || 0)}
              />
            </label>
            <label className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#F3EFE6]/70">Industry Base Rate</span>
              <select
                className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3"
                value={industryRate}
                onChange={(event) => setIndustryRate(Number(event.target.value))}
              >
                {[1.55, 4.6, 3.71, 2.75, 2, 3, 1.71, 2.5, 2.83, 0.58].map((rate) => (
                  <option key={rate} value={rate} className="text-[#0B3C43]">
                    ${rate.toFixed(2)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['Annual repricing exposure', fmtMoney(calc.annualExposure)],
              ['Scenario C (3-year cumulative)', fmtMoney(calc.scenarioC)],
              ['Scenario D stress case', fmtMoney(calc.scenarioD)],
            ].map(([label, value]) => (
              <article key={label} className="bg-[#F3EFE6]/6 border border-[#F3EFE6]/15 rounded-xl px-4 py-5">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/60">{label}</p>
                <p className="font-heading text-3xl mt-3 text-[#D4A03A]">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-[8vw] py-14">
        <p className="eyebrow">Bottom Line</p>
        <h2 className="headline-md">Repricing is Timing Risk, Not Existence Risk</h2>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <article className="card space-y-2">
            <h3 className="font-heading text-2xl">What Is Certain</h3>
            <ul className="list-disc list-inside space-y-1 text-[#F3EFE6]/80">
              <li>Current rates are suppressed below actuarial cost through surplus deployment.</li>
              <li>When surplus headroom declines, repricing must occur to hold the funded floor.</li>
              <li>Scenario C remains the planning baseline for many employers.</li>
            </ul>
          </article>
          <article className="card space-y-2">
            <h3 className="font-heading text-2xl">What To Do Now</h3>
            <ul className="list-disc list-inside space-y-1 text-[#F3EFE6]/80">
              <li>Stress test 5–8% annual WSBC cost increases over 3 years.</li>
              <li>Build 15–25% total increase into medium-term budgets.</li>
              <li>Request clearer repricing triggers and rate-group transparency.</li>
            </ul>
          </article>
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">Book an Exposure Review</Link>
        </div>
      </section>
    </div>
  );
};

export default WorkSafeBCDiagnosticPage;
