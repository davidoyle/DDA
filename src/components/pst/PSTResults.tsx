import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { INVESTMENT_PANEL_THRESHOLD, PARAMETERS_LAST_UPDATED } from '@/lib/pst-config'
import type { PSTResults as PSTResultsType } from '@/lib/pst-types'
import type { AnalyticsEventName, AnalyticsEventParams } from '@/lib/analytics'
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
  onEvent: (name: AnalyticsEventName, params?: AnalyticsEventParams) => void
}

export default function PSTResults({ results, onEvent }: Props) {
  const riskRef = useRef<HTMLElement>(null)
  const advocacyRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const configs: Array<{
      ref: { current: HTMLElement | null }
      eventName: 'risk_flags_viewed' | 'advocacy_viewed'
      payload: Record<string, string | number>
    }> = [
      { ref: riskRef, eventName: 'risk_flags_viewed', payload: { flags_count: results.riskFlags.length } },
      { ref: advocacyRef, eventName: 'advocacy_viewed', payload: {} },
    ]

    const cleanup = configs.map(({ ref, eventName, payload }) => {
      const el = ref.current
      if (!el) return () => {}

      let enteredAt = 0
      let fired = false
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enteredAt = Date.now()
            return
          }
          if (!enteredAt || fired) return
          fired = true
          onEvent(eventName, {
            ...payload,
            dwell_time_s: Math.max(1, Math.round((Date.now() - enteredAt) / 1000)),
          })
        })
      }, { threshold: 0.35 })

      observer.observe(el)
      return () => observer.disconnect()
    })

    return () => cleanup.forEach((fn) => fn())
  }, [onEvent, results.riskFlags.length])

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
      <article ref={riskRef}>
        <PSTRiskFlags results={results} />
      </article>

      <article className="card">
        <h3 className="font-heading text-2xl mb-4">Summary metrics</h3>
        <ul className="space-y-2 text-sm">
          <li>Net annual cost after pass-through: {money(results.totalNetCost)}</li>
          <li>Pass-through rate used: {pct(results.passthroughRate)}</li>
          <li>Compliance cost add-on: {money(results.complianceCost)}</li>
          <li>Absorbed shock-to-margin ratio: {pct(results.absorbedShockToMarginRatio)}</li>
          <li>Full-exposure PST-to-margin ratio: {pct(results.totalPSTToMarginRatio)}</li>
          {results.aggregateComplianceCost !== undefined && <li>Aggregate compliance estimate: {money(results.aggregateComplianceCost)}</li>}
        </ul>
      </article>

      {results.totalPST >= INVESTMENT_PANEL_THRESHOLD && (
        <article className="card">
          <h3 className="font-heading text-2xl mb-4">Investment impact</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr><td>Mild drag</td><td>{pct(results.investmentDragMild ?? 0, 3)}</td><td>{money((results.investmentDragMild ?? 0) * results.totalSpend)}</td></tr>
              <tr><td>Central drag</td><td>{pct(results.investmentDragCentral ?? 0, 3)}</td><td>{money((results.investmentDragCentral ?? 0) * results.totalSpend)}</td></tr>
              <tr><td>Severe drag</td><td>{pct(results.investmentDragSevere ?? 0, 3)}</td><td>{money((results.investmentDragSevere ?? 0) * results.totalSpend)}</td></tr>
            </tbody>
          </table>
          <p className="text-sm mt-3">The OECD European range (−0.50) is excluded from this analysis — it is not supported by Canadian-specific evidence.</p>
        </article>
      )}

      <PSTTransition results={results} />
      <article ref={advocacyRef}>
        <PSTAdvocacy results={results} onCtaClick={(ctaId) => onEvent('advocacy_cta_click', { cta_id: ctaId })} />
      </article>

      <article className="card print:hidden">
        <h3 className="font-heading text-2xl mb-4">Export</h3>
        <button className="btn-primary" onClick={() => window.print()}>Download summary</button>
      </article>

      <article className="card print:hidden">
        <h3 className="font-heading text-2xl mb-3">Next step</h3>
        <p className="text-[#F3EFE6]/75 mb-4">Get a direct review of your exposure with DDA.</p>
        <Link
          to="/contact"
          className="btn-primary"
          onClick={() => onEvent('consultation_click', { source_panel: 'pst_next_step' })}
        >
          Book a consultation
        </Link>
      </article>

      <p className="text-sm text-[#F3EFE6]/75">
        Your inputs are used to benchmark this diagnostic against similar firms in your sector. No identifying information is stored or shared.
      </p>
      <p className="text-sm text-[#F3EFE6]/75">
        This tool does not constitute tax or legal advice. Results are modelled estimates based on publicly available data and policy-source assumptions. Parameters last updated: {PARAMETERS_LAST_UPDATED}.
      </p>
    </section>
  )
}
