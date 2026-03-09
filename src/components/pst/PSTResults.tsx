import { PARAMETERS_LAST_UPDATED, INVESTMENT_PANEL_THRESHOLD } from '@/lib/pst-config'
import type { PSTResults as PSTResultsType } from '@/lib/pst-types'
import { money, pct } from './format'
import PSTAdvocacy from './PSTAdvocacy'
import PSTBreakdown from './PSTBreakdown'
import PSTGapChart from './PSTGapChart'
import PSTRiskFlags from './PSTRiskFlags'
import PSTScenarios from './PSTScenarios'
import PSTScoreCards from './PSTScoreCards'
import PSTTransition from './PSTTransition'

interface Props {
  results: PSTResultsType
}

export default function PSTResults({ results }: Props) {
  return (
    <section className="px-6 lg:px-[8vw] py-10 space-y-8 print:px-0">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="font-heading text-3xl">Diagnostic results</h2>
        <button onClick={() => document.getElementById('pst-form')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">Recalculate</button>
      </div>

      <PSTScoreCards results={results} />
      <PSTBreakdown results={results} />
      <PSTGapChart results={results} />
      <PSTScenarios results={results} />
      <PSTRiskFlags results={results} />

      <article className="card">
        <h3 className="font-heading text-2xl mb-4">Summary metrics</h3>
        <ul className="space-y-2 text-sm">
          <li>Net annual cost after pass-through: {money(results.totalNetCost)}</li>
          <li>Pass-through rate used: {pct(results.passthroughRate)}</li>
          <li>Compliance cost add-on: {money(results.complianceCost)}</li>
          <li>Shock-to-margin ratio: {pct(results.shockToMarginRatio)}</li>
          {results.cfibAggregateCost !== undefined && <li>CFIB aggregate cost estimate: {money(results.cfibAggregateCost)}</li>}
        </ul>
      </article>

      {results.totalPST >= INVESTMENT_PANEL_THRESHOLD && (
        <article className="card">
          <h3 className="font-heading text-2xl mb-4">Investment impact</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr><td>Low drag</td><td>{pct(results.investmentDragLow ?? 0, 3)}</td><td>{money((results.investmentDragLow ?? 0) * results.totalSpend)}</td></tr>
              <tr><td>Central drag</td><td>{pct(results.investmentDragCentral ?? 0, 3)}</td><td>{money((results.investmentDragCentral ?? 0) * results.totalSpend)}</td></tr>
              <tr><td>High drag</td><td>{pct(results.investmentDragHigh ?? 0, 3)}</td><td>{money((results.investmentDragHigh ?? 0) * results.totalSpend)}</td></tr>
            </tbody>
          </table>
          <p className="text-sm mt-3">The OECD European range (−0.50) is excluded from this analysis — it is not supported by Canadian-specific evidence.</p>
        </article>
      )}

      <PSTTransition results={results} />
      <PSTAdvocacy results={results} />

      <article className="card print:hidden">
        <h3 className="font-heading text-2xl mb-4">Export</h3>
        <button className="btn-primary" onClick={() => window.print()}>Download summary</button>
      </article>

      <p className="text-sm text-[#F3EFE6]/75">
        This tool does not constitute tax or legal advice. Results are modelled estimates based on publicly available data and the BCBC Economic Impact Analysis (March 2026, Revised). Parameters last updated: {PARAMETERS_LAST_UPDATED}.
      </p>
    </section>
  )
}
