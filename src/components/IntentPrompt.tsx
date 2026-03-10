import { Card, CardContent } from '@/components/ui/card'

export type IntentValue = 'rate_change' | 'benchmarking' | 'policy_change' | 'advisor'

export const intentOptions: Array<{ value: IntentValue; label: string }> = [
  { value: 'rate_change', label: 'I received a rate change or cost notice' },
  { value: 'benchmarking', label: "I'm benchmarking against competitors or other jurisdictions" },
  { value: 'policy_change', label: "I'm preparing for an upcoming policy or regulatory change" },
  { value: 'advisor', label: "I'm advising a client or member organisation" },
]

interface Props {
  onSelect: (value: IntentValue) => void
}

export default function IntentPrompt({ onSelect }: Props) {
  return (
    <section className="px-6 lg:px-[8vw] py-8 border-b border-[#F3EFE6]/10 print:hidden">
      <div className="max-w-5xl space-y-4">
        <p className="eyebrow">Before you begin</p>
        <h2 className="headline-md">What brings you to this diagnostic today?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {intentOptions.map((option) => (
            <Card
              key={option.value}
              className="cursor-pointer border border-[#F3EFE6]/20 hover:border-[#D4A03A] transition-colors"
              onClick={() => onSelect(option.value)}
            >
              <CardContent className="py-5 text-[#F3EFE6]/90">{option.label}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
