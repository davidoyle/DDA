import { zodResolver } from '@hookform/resolvers/zod'
import { Info } from 'lucide-react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { PSTFormValues } from '@/lib/pst-types'

const PSTFormSchema = z
  .object({
    sector: z.enum(['construction', 'mining', 'tech', 'retail', 'manufacturing', 'finance', 'other']),
    firmSize: z.enum(['small', 'mid', 'large']),
    employeeCount: z.number().int().positive().optional(),
    spendAccounting: z.number().min(0),
    spendAEG: z.number().min(0),
    spendRealEstate: z.number().min(0),
    spendSecurity: z.number().min(0),
    bundlingScenario: z.enum(['low', 'base', 'high']),
    responseScenario: z.enum(['low', 'medium', 'high']),
    passthroughOverride: z.number().min(0).max(1).optional(),
  })
  .refine((data) => data.spendAccounting + data.spendAEG + data.spendRealEstate + data.spendSecurity > 0, {
    message: 'Enter at least one service spend amount.',
  })

type PSTFormInput = z.infer<typeof PSTFormSchema>

interface PSTFormProps {
  onSubmit: (values: PSTFormValues) => void
}

const tooltipMap: Record<string, string> = {
  'Accounting & Bookkeeping': 'Effective PST rate 6.44% (92% taxable share × 7% PST).',
  'Architecture / Engineering / Geoscience': 'Legislated rate is 2.1% (30% taxable base). This tool uses 2.94% (base case) because most integrated project engagements do not separately itemise taxable components.',
  'Commercial Real Estate': 'Effective PST rate 5.95% using midpoint taxable share assumptions.',
  'Security Services': 'Effective PST rate 7.00% because the full fee is taxable.',
}

export default function PSTForm({ onSubmit }: PSTFormProps) {
  const form = useForm<PSTFormInput>({
    resolver: zodResolver(PSTFormSchema),
    defaultValues: {
      sector: 'construction',
      firmSize: 'small',
      employeeCount: undefined,
      spendAccounting: 0,
      spendAEG: 0,
      spendRealEstate: 0,
      spendSecurity: 0,
      bundlingScenario: 'base',
      responseScenario: 'medium',
      passthroughOverride: undefined,
    },
  })

  const watchSpend = useWatch({
    control: form.control,
    name: ['spendAccounting', 'spendAEG', 'spendRealEstate', 'spendSecurity'],
  })
  const hasSpend = watchSpend.some((v) => Number(v || 0) > 0)


  const handleValidSubmit: SubmitHandler<PSTFormInput> = (values) => {
    onSubmit(values as PSTFormValues)
  }
  const serviceFields = [
    { name: 'spendAccounting' as const, label: 'Accounting & Bookkeeping' },
    { name: 'spendAEG' as const, label: 'Architecture / Engineering / Geoscience' },
    { name: 'spendRealEstate' as const, label: 'Commercial Real Estate' },
    { name: 'spendSecurity' as const, label: 'Security Services' },
  ]

  return (
    <section id="pst-form" className="px-6 lg:px-[8vw] py-10 space-y-8 border-b border-[#F3EFE6]/10 print:hidden">
      <form onSubmit={form.handleSubmit(handleValidSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="font-heading text-2xl">Step 1 — Firm profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span>Sector</span>
              <select className="w-full rounded-md border bg-transparent px-3 py-2" {...form.register('sector')}>
                <option value="construction">Construction</option><option value="mining">Mining</option><option value="tech">Tech</option><option value="retail">Retail</option><option value="manufacturing">Manufacturing</option><option value="finance">Finance</option><option value="other">Other</option>
              </select>
            </label>
            <label className="space-y-2">
              <span>Firm size</span>
              <select className="w-full rounded-md border bg-transparent px-3 py-2" {...form.register('firmSize')}>
                <option value="small">Small</option><option value="mid">Mid</option><option value="large">Large</option>
              </select>
            </label>
          </div>
          <label className="space-y-2 block max-w-xl">
            <span>Employee count</span>
            <input className="w-full rounded-md border bg-transparent px-3 py-2" type="number" min={1} placeholder="Optional — used for aggregate compliance estimate." {...form.register('employeeCount', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })} />
          </label>
        </div>

        <div className="space-y-4">
          <h2 className="font-heading text-2xl">Step 2 — Annual service spend (CAD)</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {serviceFields.map((field) => (
              <label className="space-y-2" key={field.name}>
                <span className="flex items-center gap-2">{field.label}
                  <Tooltip>
                    <TooltipTrigger asChild><button type="button"><Info className="size-4" /></button></TooltipTrigger>
                    <TooltipContent className="max-w-xs">{tooltipMap[field.label]}</TooltipContent>
                  </Tooltip>
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">$</span>
                  <input type="number" min={0} className="w-full rounded-md border bg-transparent pl-8 pr-3 py-2" {...form.register(field.name, { valueAsNumber: true })} />
                </div>
              </label>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced assumptions — show</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <label className="space-y-2 block">
                  <span>AEG bundling scenario</span>
                  <select className="w-full rounded-md border bg-transparent px-3 py-2" {...form.register('bundlingScenario')}>
                    <option value="low">Low (30%)</option><option value="base">Base (42%)</option><option value="high">High (52%)</option>
                  </select>
                  <p className="text-sm text-[#F3EFE6]/70">Changes the taxable share applied to AEG spend based on observed bundling persistence.</p>
                </label>
                <label className="space-y-2 block">
                  <span>Behavioural response scenario</span>
                  <select className="w-full rounded-md border bg-transparent px-3 py-2" {...form.register('responseScenario')}>
                    <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
                  </select>
                  <p className="text-sm text-[#F3EFE6]/70">Highlights the scenario card to match your strategic planning assumption.</p>
                </label>
                <label className="space-y-2 block">
                  <span>Pass-through override (0–1)</span>
                  <input type="number" min={0} max={1} step="0.01" className="w-full rounded-md border bg-transparent px-3 py-2" {...form.register('passthroughOverride', { setValueAs: (v) => (v === '' ? undefined : Number(v)) })} />
                  <p className="text-sm text-[#F3EFE6]/70">Overrides sector-size pass-through defaults sourced from StatsCan I-O and OECD elasticity synthesis.</p>
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {form.formState.errors.root?.message && <p className="text-red-300">{form.formState.errors.root.message}</p>}
        <button type="submit" disabled={!hasSpend} className="btn-primary disabled:opacity-50">Run diagnostic</button>
      </form>
    </section>
  )
}
