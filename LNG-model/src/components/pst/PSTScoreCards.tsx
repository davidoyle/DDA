import type { PSTResults } from '@/lib/pst-types'
import { money, pct } from './format'

export default function PSTScoreCards({ results }: { results: PSTResults }) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <article className="card"><p className="text-sm">Annual PST cost</p><p className="text-3xl font-heading mt-2">{money(results.totalPST)}</p></article>
      <article className="card"><p className="text-sm">PST as % of spend</p><p className="text-3xl font-heading mt-2">{pct(results.pctOfSpend)}</p></article>
      <article className="card"><p className="text-sm">Year 1 total impact</p><p className="text-3xl font-heading mt-2">{money(results.year1TotalImpact)}</p></article>
    </div>
  )
}
