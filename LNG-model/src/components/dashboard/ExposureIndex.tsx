interface Props {
  index: number
  complete: boolean
}

export default function ExposureIndex({ index, complete }: Props) {
  return (
    <article className="card space-y-3">
      <p className="eyebrow">Regulatory Cost Index</p>
      <p className="font-heading text-5xl text-[#D4A03A]">{index.toFixed(1)}</p>
      <p className="text-[#F3EFE6]/80">
        {complete
          ? 'Combined exposure from latest WCB + PST snapshots as a share of implied operating margin.'
          : 'Partial index — run both diagnostics for a complete combined view.'}
      </p>
    </article>
  )
}
