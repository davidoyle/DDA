import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
export default function TornadoChart({ variables }: { variables: { label: string; lowImpact: number; highImpact: number; baseIRR: number }[] }) {
  const data = [...variables].sort((a, b) => Math.abs(b.highImpact - b.lowImpact) - Math.abs(a.highImpact - a.lowImpact));
  return <div className="h-80 rounded-lg border bg-white p-4"><ResponsiveContainer><BarChart data={data} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" tickFormatter={(v) => `${(Number(v) * 100).toFixed(0)}%`} /><YAxis dataKey="label" type="category" width={150} /><Tooltip /><Bar dataKey="lowImpact" fill="#dc2626" /><Bar dataKey="highImpact" fill="#16a34a" /></BarChart></ResponsiveContainer></div>;
}
