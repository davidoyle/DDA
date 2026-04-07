import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Scenario, ScenarioChartPoint, ScenarioId } from '@/lib/worksafebc/types';

interface ScenarioSelectorProps {
  scenarios: Record<ScenarioId, Scenario>;
  activeScenario: ScenarioId;
  setActiveScenario: (id: ScenarioId) => void;
  scenario: Scenario;
  scenarioChartData: ScenarioChartPoint[];
  disabledScenarioIds?: ScenarioId[];
}

const ScenarioSelector = ({ scenarios, activeScenario, setActiveScenario, scenario, scenarioChartData, disabledScenarioIds = [] }: ScenarioSelectorProps) => (
  <>
    <div className="grid md:grid-cols-4 gap-2">
      {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
        disabledScenarioIds.includes(id) ? (
          <button
            key={id}
            className="rounded-xl p-4 text-left border transition-colors bg-[#f3f0e8] text-[#6f6658] border-[#d8cdb9] cursor-not-allowed"
            aria-disabled="true"
          >
            <p className="font-heading text-xl">{id}</p>
            <p className="font-mono text-xs uppercase tracking-[0.1em]">{scenarios[id].title}</p>
            <p className="text-[11px] mt-2">Subscriber only</p>
          </button>
        ) : (
        <button
          key={id}
          onClick={() => setActiveScenario(id)}
          className={`rounded-xl p-4 text-left border transition-colors ${
            activeScenario === id
              ? 'bg-[#1f3a5f] text-white border-[#1f3a5f]'
              : 'bg-white text-[#1f1f1f] border-[#d8cdb9] hover:border-[#1f3a5f]'
          }`}
        >
          <p className="font-heading text-xl">{id}</p>
          <p className="font-mono text-xs uppercase tracking-[0.1em]">{scenarios[id].title}</p>
        </button>
        )
      ))}
    </div>

    <article className="card space-y-4">
      <h3 className="font-heading text-3xl">Scenario {activeScenario} — {scenario.title}</h3>
      <div className="grid md:grid-cols-2 gap-3 text-sm text-[#4a453d]">
        <p><span className="text-[#9A6A28]">Trigger:</span> {scenario.trigger}</p>
        <p><span className="text-[#9A6A28]">Timeline:</span> {scenario.timeline}</p>
        <p><span className="text-[#9A6A28]">Annual increase:</span> {scenario.annualIncrease}</p>
        <p><span className="text-[#9A6A28]">Total shock:</span> {scenario.totalShock}</p>
        <p><span className="text-[#9A6A28]">Likelihood:</span> {scenario.likelihood}</p>
        <p><span className="text-[#9A6A28]">Funded ratio progression:</span> {scenario.fundedProgression}</p>
      </div>
      {scenario.note ? <p className="text-sm text-[#4a453d]">Note: “{scenario.note}”</p> : null}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={scenarioChartData}>
            <CartesianGrid stroke="#c7bba7" strokeOpacity={0.08} />
            <XAxis dataKey="year" stroke="#c7bba7" opacity={0.7} />
            <YAxis stroke="#c7bba7" opacity={0.7} domain={[1.45, 2.2]} tickFormatter={(v) => `$${v.toFixed(2)}`} />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            <Area type="stepAfter" dataKey="high" name="Scenario range high" fill="#1f3a5f" fillOpacity={0.15} stroke="none" />
            <Area type="stepAfter" dataKey="low" name="Scenario range low" fill="#0B3C43" fillOpacity={1} stroke="none" />
            <Line type="stepAfter" dataKey="midpoint" name="Scenario midpoint" stroke="#1f3a5f" strokeWidth={3} dot />
            <Line type="stepAfter" dataKey="floor" name="Cost-reflective floor" stroke="#c7bba7" strokeOpacity={0.6} strokeDasharray="6 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  </>
);

export default ScenarioSelector;
