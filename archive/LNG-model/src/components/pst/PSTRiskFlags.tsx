import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { PSTResults, RiskLevel } from '@/lib/pst-types'

const levelOrder: Record<RiskLevel, number> = { high: 0, medium: 1, low: 2 }
const levelClass: Record<RiskLevel, string> = {
  high: 'border-red-400/60 bg-red-500/10',
  medium: 'border-amber-400/60 bg-amber-500/10',
  low: 'border-emerald-400/60 bg-emerald-500/10',
}

export default function PSTRiskFlags({ results }: { results: PSTResults }) {
  const ordered = [...results.riskFlags].sort((a, b) => levelOrder[a.level] - levelOrder[b.level])

  return (
    <article className="space-y-3">
      <h3 className="font-heading text-2xl">Risk flags</h3>
      {ordered.map((flag) => (
        <Alert key={flag.id} className={levelClass[flag.level]}>
          <AlertTitle>{flag.title}</AlertTitle>
          <AlertDescription>
            <p>{flag.body}</p>
            <p className="text-xs mt-2">Evidence tier: {flag.evidenceTier}</p>
            <Accordion type="single" collapsible className="mt-2">
              <AccordionItem value="source">
                <AccordionTrigger className="text-sm">Source note</AccordionTrigger>
                <AccordionContent>{flag.sourceNote}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </AlertDescription>
        </Alert>
      ))}
    </article>
  )
}
