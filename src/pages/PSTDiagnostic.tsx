import { useEffect, useRef, useState } from 'react'
import PSTForm from '@/components/pst/PSTForm'
import PSTResults from '@/components/pst/PSTResults'
import { calculatePST } from '@/lib/pst-engine'
import type { PSTFormValues, PSTResults as PSTResultsType } from '@/lib/pst-types'
import { trackEvent } from '@/lib/analytics'

export default function PSTDiagnostic() {
  const [results, setResults] = useState<PSTResultsType | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackEvent('diag_start', { tool: 'pst' })
  }, [])

  function handleSubmit(values: PSTFormValues) {
    const r = calculatePST(values)
    setResults(r)
    trackEvent('diag_complete', {
      tool: 'pst',
      sector: values.sector,
      firm_size: values.firmSize,
      total_spend: r.totalSpend,
      total_pst: Math.round(r.totalPST),
      risk_flags: r.riskFlags.length,
      response_scenario: values.responseScenario,
    })
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-12 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">BC Business Council — Policy Tools</p>
        <h1 className="headline-lg max-w-4xl">PST Diagnostic Tool</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-4">Estimate direct PST liability, behavioural adjustments, and strategic risk exposure from BC&apos;s 2026 professional services PST expansion.</p>
      </section>
      <PSTForm onSubmit={handleSubmit} />
      {results && (
        <div ref={resultsRef} className="print:block">
          <PSTResults results={results} />
        </div>
      )}
    </div>
  )
}
