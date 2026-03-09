import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import type { PSTResults } from '@/lib/pst-types'
import { money, pct } from './format'

export default function PSTGapChart({ results }: { results: PSTResults }) {
  const data = [
    { province: 'BC', value: results.pctOfSpend, dollars: results.totalPST },
    { province: 'Ontario', value: 0, dollars: 0 },
    { province: 'Alberta', value: 0, dollars: 0 },
  ]

  return (
    <article className="card">
      <h3 className="font-heading text-2xl mb-4">Competitive gap</h3>
      <div className="h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis type="number" tickFormatter={(v) => `${(v * 100).toFixed(1)}%`} />
            <YAxis dataKey="province" type="category" />
            <Bar dataKey="value" fill="#D4A03A" animationDuration={700}>
              <LabelList dataKey="dollars" position="right" formatter={(value: number) => `${money(value)} (${pct(data.find((d) => d.dollars === value)?.value ?? 0, 1)})`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}
