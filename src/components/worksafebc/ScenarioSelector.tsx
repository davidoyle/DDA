import { Area, AreaChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Scenario, ScenarioChartPoint, ScenarioId } from '@/lib/worksafebc/types';

interface ScenarioSelectorProps {
  scenarios: Record<ScenarioId, Scenario>;
  activeScenario: ScenarioId;
  setActiveScenario: (id: ScenarioId) => void;
  scenario: Scenario;
  scenarioChartData: ScenarioChartPoint[];
}

const ScenarioSelector = ({ scenarios, activeScenario, setActiveScenario, scenario, scenarioChartData }: ScenarioSelectorProps) => (
  <>
    <div className="grid md:grid-cols-4 gap-2">
      {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
        <button
          key={id}
          onClick={() => setActiveScenario(id)}
          className={`rounded-lg p-4 text-left border transition-colors ${
            activeScenario === id
              ? 'bg-[#16324F] text-white border-[#16324F]'
              : 'bg-white text-[#111111] border-[#D9DDDA] hover:border-[#16324F]'
          }`}
        >
          <p className="font-heading text-xl">{id}</p>
          <p className=" text-xs uppercase font-semibold tracking-[0.08em]">{scenarios[id].title}</p>
        </button>
      ))}
    </div>

    <article className="card space-y-4">
      <h3 className="font-heading text-3xl">Scenario {activeScenario} — {scenario.title}</h3>
      <div className="grid md:grid-cols-2 gap-3 text-sm text-[#111111]">
        <p><span className="text-[#16324F]">Trigger:</span> {scenario.trigger}</p>
        <p><span className="text-[#16324F]">Timeline:</span> {scenario.timeline}</p>
        <p><span className="text-[#16324F]">Annual increase:</span> {scenario.annualIncrease}</p>
        <p><span className="text-[#16324F]">Total shock:</span> {scenario.totalShock}</p>
        <p><span className="text-[#16324F]">Likelihood:</span> {scenario.likelihood}</p>
        <p><span className="text-[#16324F]">Funded ratio progression:</span> {scenario.fundedProgression}</p>
      </div>
      {scenario.note ? <p className="text-sm text-[#111111]">Note: “{scenario.note}”</p> : null}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={scenarioChartData}>
            <CartesianGrid stroke="#D9DDDA" strokeOpacity={0.08} />
            <XAxis dataKey="year" stroke="#D9DDDA" opacity={0.7} />
            <YAxis stroke="#D9DDDA" opacity={0.7} domain={[1.45, 2.2]} tickFormatter={(v) => `$${v.toFixed(2)}`} />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            <Area type="stepAfter" dataKey="high" name="Scenario range high" fill="#16324F" fillOpacity={0.15} stroke="none" />
            <Area type="stepAfter" dataKey="low" name="Scenario range low" fill="#102B22" fillOpacity={1} stroke="none" />
            <Line type="stepAfter" dataKey="midpoint" name="Scenario midpoint" stroke="#16324F" strokeWidth={3} dot />
            <Line type="stepAfter" dataKey="floor" name="Cost-reflective floor" stroke="#D9DDDA" strokeOpacity={0.6} strokeDasharray="6 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  </>
);

export default ScenarioSelector;
