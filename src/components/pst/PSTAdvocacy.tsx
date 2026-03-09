import type { PSTResults } from '@/lib/pst-types'

export default function PSTAdvocacy({ results }: { results: PSTResults }) {
  const priorities = [
    'Negotiate explicit PST transition clauses for multi-phase contracts before October 2026.',
    results.bundlingScenario !== 'low'
      ? 'Prioritize invoice and SOW unbundling to move AEG treatment toward the legislated 30% taxable base where defensible.'
      : 'Maintain documentation discipline to preserve low-bundling treatment in any audit challenge.',
    'Model Alberta/Ontario bid parity impacts quarterly and include PST differential assumptions in board reporting.',
  ]

  return (
    <article className="card">
      <h3 className="font-heading text-2xl mb-4">Advocacy priorities</h3>
      <ol className="list-decimal list-inside space-y-2">
        {priorities.map((p) => <li key={p}>{p}</li>)}
      </ol>
    </article>
  )
}
