interface Props {
  percentile: number
  band: string
}

export default function SectorPercentile({ percentile, band }: Props) {
  return (
    <article className="card space-y-3">
      <h3 className="font-heading text-2xl">Estimated sector percentile</h3>
      <p className="font-heading text-4xl text-[#D4A03A]">{percentile}th</p>
      <p className="text-[#F3EFE6]/80">{band}</p>
      <p className="text-xs text-[#F3EFE6]/65">Estimated range for your sector (synthetic v1, not derived from user population data).</p>
    </article>
  )
}
