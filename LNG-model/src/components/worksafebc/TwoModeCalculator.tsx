import { AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DriftLinePoint, IndustryRow, Mode, ScenarioId, ScenarioTimelineRow, SharedOutput } from '@/lib/worksafebc/types';
import { fmtMoney } from '@/lib/worksafebc/engine';

interface TwoModeCalculatorProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  industryRows: IndustryRow[];
  selectedIndustryName: string;
  setSelectedIndustryName: (name: string) => void;
  proxyPayroll: number;
  setProxyPayroll: (value: number) => void;
  costSensitivity: number;
  setCostSensitivity: (value: number) => void;
  ownInputs: Array<{ label: string; value: number; setter: (value: number) => void }>;
  sharedOutput: SharedOutput;
  activeScenario: ScenarioId;
  setActiveScenario: (scenario: ScenarioId) => void;
  scenarioTimeline: ScenarioTimelineRow[];
  driftLine: DriftLinePoint[];
  demoMode?: boolean;
}

const TwoModeCalculator = ({
  mode,
  setMode,
  industryRows,
  selectedIndustryName,
  setSelectedIndustryName,
  proxyPayroll,
  setProxyPayroll,
  costSensitivity,
  setCostSensitivity,
  ownInputs,
  sharedOutput,
  activeScenario,
  setActiveScenario,
  scenarioTimeline,
  driftLine,
  demoMode = false,
}: TwoModeCalculatorProps) => (
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
          disabled={demoMode}
          className={`rounded-lg px-4 py-2 text-sm border transition-colors ${
            mode === option.id ? 'bg-[#1f3a5f] text-white border-[#1f3a5f]' : 'bg-white text-[#1f1f1f] border-[#d8cdb9]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>

    {mode === 'proxy' ? (
      <div className="grid md:grid-cols-3 gap-5">
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#5b5347]">Industry selector</span>
          <select className="w-full rounded-lg bg-white border border-[#d8cdb9] px-4 py-3" value={selectedIndustryName} onChange={(event) => setSelectedIndustryName(event.target.value)} disabled={demoMode}>
            {industryRows.filter((row) => row.name !== 'Other Sectors (aggregate)').map((industry) => (
              <option key={industry.name} value={industry.name} className="text-[#0B3C43]">{industry.name}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#5b5347]">Annual assessable payroll ($)</span>
          <input type="number" className="w-full rounded-lg bg-white border border-[#d8cdb9] px-4 py-3" value={proxyPayroll} min={0} max={demoMode ? 50 : undefined} onChange={(event) => setProxyPayroll(Number(event.target.value) || 0)} />
        </label>
        <label className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#5b5347]">Cost-rate sensitivity: {costSensitivity > 0 ? '+' : ''}{costSensitivity}%</span>
          <input type="range" min={-10} max={10} step={10} value={costSensitivity} onChange={(event) => setCostSensitivity(Number(event.target.value))} className="w-full" disabled={demoMode} />
        </label>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-5">
        {ownInputs.map(({ label, value, setter }) => (
          <label className="space-y-2" key={label}>
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#5b5347]">{label}</span>
            <input type="number" className="w-full rounded-lg bg-white border border-[#d8cdb9] px-4 py-3" value={value} min={0} onChange={(event) => setter(Number(event.target.value) || 0)} disabled={demoMode} />
          </label>
        ))}
      </div>
    )}

    <p className="text-sm text-[#9A6A28] font-mono uppercase tracking-[0.08em]">{sharedOutput.modeLabel}</p>

    <div className="grid md:grid-cols-3 gap-4">
      {[
        ['Low annual exposure', sharedOutput.lowExposure],
        ['Base annual exposure', sharedOutput.baseExposure],
        ['High annual exposure', sharedOutput.highExposure],
      ].map(([label, value]) => (
        <article key={label} className="bg-[#f9f4ea] border border-[#e3d7c2] rounded-xl px-4 py-5">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#1f1f1f]/60">{label}</p>
          <p className="font-heading text-3xl mt-3 text-[#9A6A28]">{fmtMoney(value as number)}</p>
        </article>
      ))}
    </div>
    <p className="text-xs text-[#5b5347]">Exposure band width: {sharedOutput.bandLabel}</p>

    <label className="space-y-2 block max-w-sm">
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#5b5347]">Scenario selector</span>
      <select className="w-full rounded-lg bg-white border border-[#d8cdb9] px-4 py-3" value={activeScenario} onChange={(event) => setActiveScenario(event.target.value as ScenarioId)} disabled={demoMode}>
        <option value="A">Scenario A</option>
        <option value="B">Scenario B</option>
        <option value="C">Scenario C</option>
        <option value="D">Scenario D</option>
      </select>
    </label>

    <div className="overflow-x-auto rounded-xl border border-[#e3d7c2]">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="border-b border-[#e3d7c2] text-[#9A6A28] font-mono uppercase tracking-[0.08em] text-xs">
            <th className="text-left px-4 py-3">Year</th>
            <th className="text-left px-4 py-3">Rate Applied</th>
            <th className="text-left px-4 py-3">Annual Premium</th>
            <th className="text-left px-4 py-3">Delta vs. Today</th>
            <th className="text-left px-4 py-3">Cumulative Delta</th>
          </tr>
        </thead>
        <tbody>
          {scenarioTimeline.map((entry) => (
            <tr key={entry.year} className="border-b border-[#ece0cc]">
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

    <div className="grid md:grid-cols-3 gap-4">
      {[
        ['Year 1 cumulative', scenarioTimeline[0].cumulative],
        ['Year 3 cumulative', scenarioTimeline[2].cumulative],
        ['Year 5 cumulative', scenarioTimeline[4].cumulative],
      ].map(([label, value]) => (
        <article key={label} className="bg-[#f9f4ea] rounded-xl border border-[#e3d7c2] px-4 py-4">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#6b6255]">{label}</p>
          <p className="font-heading text-2xl mt-3">{fmtMoney(value as number)}</p>
        </article>
      ))}
    </div>

    {mode === 'own' ? (
      <article className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#9A6A28]">Claim cost drift line (adequate rate)</p>
        <div className="h-64 bg-[#f9f4ea] rounded-xl border border-[#ece0cc] p-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={driftLine}>
              <CartesianGrid stroke="#c7bba7" strokeOpacity={0.08} />
              <XAxis dataKey="year" stroke="#c7bba7" opacity={0.7} />
              <YAxis stroke="#c7bba7" opacity={0.7} tickFormatter={(v) => `$${v.toFixed(2)}`} />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Line dataKey="adequateRate" name="Adequate rate" stroke="#1f3a5f" strokeWidth={3} dot />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </article>
    ) : null}

    {demoMode ? <p className="text-sm text-[#6b6255]">Demo restrictions active: rate group and advanced assumptions are locked.</p> : null}
    <article className="rounded-xl border border-[#d8cdb9] bg-[#f9f4ea] p-5 space-y-3">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#9A6A28]">Assumptions panel (always visible)</p>
      <ul className="list-disc list-inside space-y-1 text-[#4a453d] text-sm">
        {sharedOutput.assumptions.map((assumption) => (
          <li key={assumption}>{assumption}</li>
        ))}
        <li>WorkSafeBC has not published per-rate-group funded percentages, per-industry claim costs, or explicit repricing triggers. This estimate is a system-average proxy. Actual employer impact will depend on rate-group funded position and individual experience rating, neither of which is publicly disclosed.</li>
      </ul>
    </article>
  </div>
);

export default TwoModeCalculator;
