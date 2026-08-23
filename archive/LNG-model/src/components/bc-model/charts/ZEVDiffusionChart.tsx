import { Line, LineChart, CartesianGrid, ReferenceDot, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { SimulationPoint } from '@/lib/bc-model/types';

const config = { zev: { label: 'ZEV share', color: '#1f3a5f' } };

export function ZEVDiffusionChart({ data }: { data: SimulationPoint[] }) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} />
        <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} domain={[0, 1]} tickLine={false} axisLine={false} width={48} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value) => <span className="font-mono">{(Number(value) * 100).toFixed(0)}%</span>} />} />
        <Line dataKey="zevShare" type="monotone" stroke="#1f3a5f" strokeWidth={3} dot={{ r: 3 }} />
        <ReferenceDot x={2026} y={0.26} r={5} fill="#d4a03a" stroke="none" />
        <ReferenceDot x={2030} y={0.9} r={5} fill="#d1603d" stroke="none" />
      </LineChart>
    </ChartContainer>
  );
}
