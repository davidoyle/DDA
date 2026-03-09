import type { PSTResults } from '@/lib/pst-types'
import { money, pct } from './format'

export default function PSTBreakdown({ results }: { results: PSTResults }) {
  return (
    <article className="card overflow-x-auto">
      <h3 className="font-heading text-2xl mb-4">Service cost breakdown</h3>
      <table className="w-full min-w-[760px] text-sm">
        <thead><tr className="border-b border-[#F3EFE6]/20"><th className="text-left py-2">Service</th><th className="text-left">Spend</th><th className="text-left">Taxable share</th><th className="text-left">PST cost</th><th className="text-left">Net cost</th><th className="text-left">Effective rate</th></tr></thead>
        <tbody>
          {results.rows.map((row) => (
            <tr key={row.id} className="border-b border-[#F3EFE6]/10"><td className="py-2">{row.label}</td><td>{money(row.spend)}</td><td>{pct(row.taxableShare)}</td><td>{money(row.pstCost)}</td><td>{money(row.netCost)}</td><td>{pct(row.effectiveRate)}</td></tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
