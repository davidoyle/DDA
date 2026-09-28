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
  tone?: 'dark' | 'light'
}

export default function IntentPrompt({ onSelect, tone = 'dark' }: Props) {
  const isLight = tone === 'light'

  return (
    <section className={`px-6 lg:px-[8vw] py-8 border-b print:hidden ${isLight ? 'border-[#D9DDDA]' : 'border-[#F3F4F2]/10'}`}>
      <div className="max-w-5xl space-y-4">
        <p className={isLight ? ' text-xs uppercase font-semibold tracking-[0.08em] text-[#626966]' : 'eyebrow'}>Before you begin</p>
        <h2 className={isLight ? 'font-heading text-3xl md:text-4xl text-[#111111]' : 'headline-md'}>What brings you to this diagnostic today?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {intentOptions.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer border transition-colors ${isLight ? 'border-[#D9DDDA] hover:border-[#16324F] bg-white text-[#111111]' : 'border-[#F3F4F2]/20 hover:border-[#D4A03A]'}`}
              onClick={() => onSelect(option.value)}
            >
              <CardContent className={`py-5 ${isLight ? 'text-[#111111]' : 'text-[#F3F4F2]/90'}`}>{option.label}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
