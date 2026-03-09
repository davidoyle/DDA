import type { DiagnosticSnapshot } from '@/lib/session'

interface Props {
  title: string
  snapshots: DiagnosticSnapshot[]
}

export default function TrajectoryPanel({ title, snapshots }: Props) {
  return (
    <article className="card space-y-3">
      <h3 className="font-heading text-2xl">{title}</h3>
      {snapshots.length === 0 ? <p className="text-[#F3EFE6]/75">No runs yet.</p> : null}
      <ul className="space-y-2 text-sm">
        {[...snapshots].reverse().map((row) => (
          <li key={`${row.tool}-${row.timestamp}`} className="border-b border-[#F3EFE6]/10 pb-2">
            <p>{new Date(row.timestamp).toLocaleString('en-CA')}</p>
            <p className="text-[#F3EFE6]/80">Headline cost: ${row.headlineCost.toLocaleString('en-CA')}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
