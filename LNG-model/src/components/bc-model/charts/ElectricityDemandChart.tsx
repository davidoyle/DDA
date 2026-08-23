import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { SimulationPoint } from '@/lib/bc-model/types';

const config = { growth: { label: 'Demand growth', color: '#1f3a5f' } };

export function ElectricityDemandChart({ data }: { data: SimulationPoint[] }) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <AreaChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="year" tickLine={false} axisLine={false} />
        <YAxis tickFormatter={(value) => `${Math.round(value * 100)}%`} tickLine={false} axisLine={false} width={48} />
        <ChartTooltip content={<ChartTooltipContent formatter={(value) => <span className="font-mono">{(Number(value) * 100).toFixed(1)}%</span>} />} />
        <ReferenceLine y={0.15} stroke="#d4a03a" strokeDasharray="6 4" label={{ value: '15% IRP threshold', fill: '#6b6255', position: 'insideTopRight' }} />
        <Area dataKey="electricityDemandGrowth" type="monotone" stroke="#1f3a5f" fill="#1f3a5f" fillOpacity={0.16} />
      </AreaChart>
    </ChartContainer>
  );
}
