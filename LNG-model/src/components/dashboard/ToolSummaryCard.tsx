import { Link } from 'react-router-dom'

interface Props {
  tool: 'wcb' | 'pst'
  headlineCost: number | null
  trend: 'worsening' | 'stable' | 'improving' | 'n/a'
}

export default function ToolSummaryCard({ tool, headlineCost, trend }: Props) {
  const route = tool === 'wcb' ? '/worksafebc-repricing-risk-diagnostic' : '/tools/pst-diagnostic'
  const label = tool === 'wcb' ? 'WorkSafeBC diagnostic' : 'PST diagnostic'
  return (
    <article className="card space-y-3">
      <h3 className="font-heading text-2xl">{label}</h3>
      <p className="text-[#F3EFE6]/80">Latest headline cost: {headlineCost === null ? 'Not run yet' : `$${headlineCost.toLocaleString('en-CA')}`}</p>
      <p className="text-sm text-[#F3EFE6]/75">Trend: {trend}</p>
      <Link to={route} className="btn-secondary">Run {tool.toUpperCase()} tool</Link>
    </article>
  )
}
