import { Line, LineChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ScenarioRun, SimulationPoint } from '@/lib/bc-model/types';

const config = {
  emissions: { label: 'Total emissions', color: '#1f3a5f' },
  target: { label: '2030 target', color: '#d4a03a' },
  baseline: { label: 'Baseline', color: '#1f3a5f' },
  compare: { label: 'Compare', color: '#9d4edd' },
  alternate: { label: 'Alternate', color: '#d1603d' },
};

interface Props {
  data?: SimulationPoint[];
  scenarios?: ScenarioRun[];
}

export function EmissionsLineChart({ data, scenarios }: Props) {
  const chartData = scenarios
    ? scenarios[0]?.results.map((point, index) => ({
        year: point.year,
        ...Object.fromEntries(scenarios.map((scenario) => [scenario.id, scenario.results[index]?.totalEmissions ?? null])),
        target: point.target2030,
      }))
    : data?.map((point) => ({ year: point.year, emissions: point.totalEmissions, target: point.target2030 }));

  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <LineChart data={chartData} margin={{ left: 8, right: 12, top: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} />
        <YAxis tickFormatter={(value) => `${value.toFixed(0)} Mt`} tickLine={false} axisLine={false} width={54} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value, name) => <><span>{String(name)}</span><span className="font-mono">{Number(value).toFixed(1)} Mt</span></>} />} />
        <ReferenceLine y={61} stroke="#d4a03a" strokeDasharray="6 4" label={{ value: '61.0 Mt legal target', fill: '#6b6255', position: 'insideTopRight' }} />
        {scenarios ? scenarios.map((scenario, index) => (
          <Line key={scenario.id} type="monotone" dataKey={scenario.id} stroke={index === 0 ? '#1f3a5f' : index === 1 ? '#9d4edd' : '#d1603d'} strokeWidth={3} dot={false} />
        )) : <Line type="monotone" dataKey="emissions" stroke="#1f3a5f" strokeWidth={3} dot={false} />}
      </LineChart>
    </ChartContainer>
  );
}
