import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';
import { validateOutput } from '@/lib/model/validation';
import FlagWarningBanner from './FlagWarningBanner';
export default function BreakevenStack({ segments }: { segments: { label: string; value: number; flagsUsed: string[] }[] }) {
  const data = [Object.fromEntries(segments.map((s) => [s.label, s.value]))];
  return <FlagWarningBanner validation={validateOutput(BASE_ASSUMPTIONS, segments.flatMap((s) => s.flagsUsed))}><div className="h-36 rounded-lg border bg-white p-4"><ResponsiveContainer><BarChart data={data} layout="vertical"><XAxis type="number" /><Tooltip />{segments.map((s, i) => <Bar key={s.label} dataKey={s.label} stackId="a" fill={['#003366', '#2563eb', '#f59e0b', '#dc2626'][i % 4]} />)}</BarChart></ResponsiveContainer></div></FlagWarningBanner>;
}
