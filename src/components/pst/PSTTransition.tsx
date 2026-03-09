import type { PSTResults } from '@/lib/pst-types'
import { money } from './format'

export default function PSTTransition({ results }: { results: PSTResults }) {
  const transitionRows = results.rows.map((row) => ({
    service: row.label,
    annualPST: row.pstCost,
    straddleExposure: row.pstCost * 0.52,
  }))

  return (
    <article className="card overflow-x-auto">
      <h3 className="font-heading text-2xl mb-4">Transition exposure (Oct 1, 2026 straddle)</h3>
      <table className="w-full min-w-[640px] text-sm">
        <thead><tr className="border-b border-[#F3EFE6]/20"><th className="text-left py-2">Service</th><th className="text-left">Annual PST</th><th className="text-left">Estimated straddle exposure (52%)</th></tr></thead>
        <tbody>
          {transitionRows.map((row) => <tr key={row.service} className="border-b border-[#F3EFE6]/10"><td className="py-2">{row.service}</td><td>{money(row.annualPST)}</td><td>{money(row.straddleExposure)}</td></tr>)}
        </tbody>
      </table>
    </article>
  )
}
