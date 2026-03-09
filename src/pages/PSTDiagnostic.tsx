import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import IntentPrompt, { type IntentValue } from '@/components/IntentPrompt'
import PSTForm from '@/components/pst/PSTForm'
import PSTResults from '@/components/pst/PSTResults'
import { calculatePST } from '@/lib/pst-engine'
import { appendSnapshot, bucketSpend } from '@/lib/session'
import type { PSTFormValues, PSTResults as PSTResultsType } from '@/lib/pst-types'
import { useDiagnosticSession } from '@/hooks/useDiagnosticSession'

export default function PSTDiagnostic() {
  const [results, setResults] = useState<PSTResultsType | null>(null)
  const [scenarioCount, setScenarioCount] = useState(0)
  const startedAtRef = useRef<number | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const { intentReady, setIntentAndTrack, fireEvent, maybeTrackReturnRun } = useDiagnosticSession('pst')

  useEffect(() => {
    if (!intentReady) return
    const sourceRoute = location.state && typeof location.state === 'object' && 'from' in location.state
      ? String((location.state as { from?: string }).from ?? 'direct')
      : 'direct'

    fireEvent('diag_start', { source_route: sourceRoute })
    maybeTrackReturnRun()
    startedAtRef.current = Date.now()
  }, [fireEvent, intentReady, location.state, maybeTrackReturnRun])

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
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">BC Business Council — Policy Tools</p>
        <h1 className="headline-lg max-w-4xl">PST Diagnostic Tool</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-4">Estimate direct PST liability, behavioural adjustments, and strategic risk exposure from BC&apos;s 2026 professional services PST expansion.</p>
      </section>

      {!intentReady ? (
        <IntentPrompt onSelect={(value: IntentValue) => setIntentAndTrack(value)} />
      ) : (
        <PSTForm onSubmit={handleSubmit} onToggleUsed={handleToggleUsed} />
      )}

      {results && (
        <div ref={resultsRef} className="print:block">
          <PSTResults results={results} onEvent={fireEvent} />
        </div>
      )}
    </div>
  )
}
