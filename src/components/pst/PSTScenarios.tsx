import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { PSTResults } from '@/lib/pst-types'
import { money } from './format'

const cards = [
  { key: 'low', label: 'Low response', mechanism: 'Limited contract restructuring and weak supplier substitution.' },
  { key: 'medium', label: 'Medium response', mechanism: 'Moderate renegotiation and procurement shifts by firms.' },
  { key: 'high', label: 'High response', mechanism: 'Strong restructuring, sourcing shifts, and service redesign.' },
] as const

export default function PSTScenarios({ results }: { results: PSTResults }) {
  const map = {
    low: { adjusted: results.adjustedCostLow, erosion: results.erosionLow },
    medium: { adjusted: results.adjustedCostMedium, erosion: results.erosionMedium },
    high: { adjusted: results.adjustedCostHigh, erosion: results.erosionHigh },
  }

  return (
    <article className="space-y-4">
      <h3 className="font-heading text-2xl">Behavioural response scenarios</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.key} className={`card border ${results.responseScenario === c.key ? 'border-[#D4A03A]' : 'border-[#d8cdb9]'}`}>
            <p className="text-xs uppercase">{c.label}</p>
            <p className="font-heading text-3xl mt-2">{money(map[c.key].adjusted)}</p>
            <p className="text-sm mt-1">Erosion: {money(map[c.key].erosion)}</p>
            <p className="text-sm text-[#5c5548] mt-3">{c.mechanism}</p>
          </div>
        ))}
      </div>
      <Alert className="border-[#D4A03A]">
        <AlertTitle>Policy reversal risk insight</AlertTitle>
        <AlertDescription>
          Behavioural erosion can reduce near-term liability, but also weakens long-run BC tax base competitiveness and increases probability of policy reversal pressure.
        </AlertDescription>
      </Alert>
    </article>
  )
}
