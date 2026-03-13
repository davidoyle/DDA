import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import IntentPrompt, { type IntentValue } from '@/components/IntentPrompt'
import PSTForm from '@/components/pst/PSTForm'
import PSTResults from '@/components/pst/PSTResults'
import { calculatePST } from '@/lib/pst-engine'
import { appendSnapshot, bucketSpend } from '@/lib/session'
import type { PSTFormValues, PSTResults as PSTResultsType } from '@/lib/pst-types'
import { useDiagnosticSession } from '@/hooks/useDiagnosticSession'
import { deriveSegment, type SegmentSignals } from '@/lib/segment'

export default function PSTDiagnostic() {
  const [results, setResults] = useState<PSTResultsType | null>(null)
  const [scenarioCount, setScenarioCount] = useState(0)
  const [signals, setSignals] = useState<SegmentSignals>({
    viewed_advocacy: false,
    viewed_risk_flags: false,
    risk_flags_dwell_s: 0,
    clicked_consultation: false,
  })
  const startedAtRef = useRef<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { intent, intentReady, setIntentAndTrack, fireEvent, maybeTrackReturnRun } = useDiagnosticSession('pst')

  useEffect(() => {
    if (!intentReady) return
    const sourceRoute = location.state && typeof location.state === 'object' && 'from' in location.state
      ? String((location.state as { from?: string }).from ?? 'direct')
      : 'direct'

    fireEvent('diag_start', { source_route: sourceRoute })
    maybeTrackReturnRun()
    startedAtRef.current = Date.now()
  }, [fireEvent, intentReady, location.state, maybeTrackReturnRun])

  const segment = useMemo(() => deriveSegment(intent, signals), [intent, signals])

  function handleSubmit(values: PSTFormValues) {
    const r = calculatePST(values)
    setResults(r)
    const completion = startedAtRef.current ? Math.max(1, Math.round((Date.now() - startedAtRef.current) / 1000)) : 0

    fireEvent('diag_complete', {
      completion_time_s: completion,
      scenario_count: scenarioCount,
      spend_bucket: bucketSpend(r.totalSpend),
    })

    appendSnapshot('pst', {
      timestamp: new Date().toISOString(),
      sector: values.sector,
      firmSize: values.firmSize,
      headlineCost: r.totalNetCost,
      totalSpendBucket: bucketSpend(r.totalSpend),
      scenario: values.responseScenario,
      results: r,
    })

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  function handleToggleUsed(toggleId: string, toggleValue: string | number) {
    setScenarioCount((prev) => prev + 1)
    fireEvent('toggle_used', {
      toggle_id: toggleId,
      toggle_value: String(toggleValue),
    })
  }

  return (
    <div className="pst-diagnostic-page pt-20 pb-20 bg-[#F7F1E6] text-[#1f1f1f] min-h-screen">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#d8cdb9]">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-[#6b6255]">BC Business Council — Policy Tools</p>
        <h1 className="font-heading text-4xl lg:text-5xl mt-3 max-w-4xl text-[#131313]">PST Diagnostic Tool</h1>
        <p className="text-[#2b2b2b] text-lg max-w-3xl mt-4">Estimate direct PST liability, behavioural adjustments, and strategic risk exposure from BC&apos;s 2026 professional services PST expansion.</p>
      </section>

      {!intentReady ? (
        <IntentPrompt tone="light" onSelect={(value: IntentValue) => setIntentAndTrack(value)} />
      ) : (
        <PSTForm onSubmit={handleSubmit} onToggleUsed={handleToggleUsed} />
      )}

      {results && (
        <div ref={resultsRef} className="print:block">
          <PSTResults
            results={results}
            segment={segment}
            onEvent={fireEvent}
            onBehaviorSignal={(patch) =>
              setSignals((prev) => ({
                ...prev,
                viewed_advocacy: patch.viewedAdvocacy ?? prev.viewed_advocacy,
                viewed_risk_flags: patch.viewedRiskFlags ?? prev.viewed_risk_flags,
                risk_flags_dwell_s: patch.riskFlagsDwellS ?? prev.risk_flags_dwell_s,
                clicked_consultation: patch.clickedConsultation ?? prev.clicked_consultation,
              }))
            }
          />
        </div>
      )}
    </div>
  )
}
