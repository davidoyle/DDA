import { Link } from 'react-router-dom'
import ExposureIndex from '@/components/dashboard/ExposureIndex'
import SectorPercentile from '@/components/dashboard/SectorPercentile'
import ToolSummaryCard from '@/components/dashboard/ToolSummaryCard'
import TrajectoryPanel from '@/components/dashboard/TrajectoryPanel'
import { calculateExposureIndex, estimateSectorPercentile } from '@/lib/exposure-index'
import { getLatestSnapshot, getSnapshots, getTrendLabel } from '@/lib/dashboard-store'

export default function Dashboard() {
  const wcbSnapshots = getSnapshots('wcb')
  const pstSnapshots = getSnapshots('pst')
  const latestWcb = getLatestSnapshot('wcb')
  const latestPst = getLatestSnapshot('pst')

  const indexResult = calculateExposureIndex(latestWcb, latestPst)
  const sector = latestPst?.sector ?? latestWcb?.sector ?? 'other'
  const percentile = estimateSectorPercentile(indexResult.index, sector)

  const previousWcb = wcbSnapshots.length > 1 ? wcbSnapshots[wcbSnapshots.length - 2].headlineCost : null
  const previousPst = pstSnapshots.length > 1 ? pstSnapshots[pstSnapshots.length - 2].headlineCost : null

  const hasAnyData = Boolean(latestWcb || latestPst)

  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-8">
      <section className="space-y-3">
        <p className="eyebrow">Dashboard</p>
        <h1 className="headline-md">Cross-Tool Exposure Dashboard</h1>
        <p className="text-[#F3EFE6]/80">This dashboard reads local snapshots from your current browser only.</p>
      </section>

      {!hasAnyData ? (
        <section className="grid md:grid-cols-2 gap-6">
          <article className="card space-y-3">
            <h2 className="font-heading text-2xl">Run the WorkSafeBC diagnostic</h2>
            <p className="text-[#F3EFE6]/80">Add your first repricing exposure snapshot to this dashboard.</p>
            <Link to="/worksafebc-repricing-risk-diagnostic" className="btn-primary">Open WCB diagnostic</Link>
          </article>
          <article className="card space-y-3">
            <h2 className="font-heading text-2xl">Run the PST diagnostic</h2>
            <p className="text-[#F3EFE6]/80">Add your first PST impact snapshot to this dashboard.</p>
            <Link to="/tools/pst-diagnostic" className="btn-primary">Open PST diagnostic</Link>
          </article>
        </section>
      ) : (
        <>
          <section className="grid lg:grid-cols-2 gap-6">
            <ExposureIndex index={indexResult.index} complete={indexResult.complete} />
            <SectorPercentile percentile={percentile.percentile} band={percentile.band} />
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <ToolSummaryCard tool="wcb" headlineCost={latestWcb?.headlineCost ?? null} trend={latestWcb ? getTrendLabel(latestWcb.headlineCost, previousWcb) : 'n/a'} />
            <ToolSummaryCard tool="pst" headlineCost={latestPst?.headlineCost ?? null} trend={latestPst ? getTrendLabel(latestPst.headlineCost, previousPst) : 'n/a'} />
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <TrajectoryPanel title="WCB trajectory" snapshots={wcbSnapshots} />
            <TrajectoryPanel title="PST trajectory" snapshots={pstSnapshots} />
          </section>
        </>
      )}
    </div>
  )
}
