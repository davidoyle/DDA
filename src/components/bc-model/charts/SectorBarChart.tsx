import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  data: Array<{ name: string; share: number; detail?: string }>;
}

const COLORS = ['#1f3a5f', '#d4a03a', '#d1603d'];

export function SectorBarChart({ data }: Props) {
  return (
    <div className="h-[240px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 8, right: 8, top: 12, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} width={42} />
          <Bar dataKey="share" radius={[8, 8, 0, 0]}>
            <LabelList dataKey="detail" position="top" className="fill-[#5c5548] text-xs" />
            {data.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
