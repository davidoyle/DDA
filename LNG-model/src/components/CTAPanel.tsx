import { Link } from 'react-router-dom'
import { ctaContent } from '@/content/cta-content'
import type { SegmentKey } from '@/lib/segment'

interface Props {
  segment: SegmentKey
  onConsultationClick?: () => void
}

export default function CTAPanel({ segment, onConsultationClick }: Props) {
  const content = ctaContent[segment]
  const withSegment = (href: string) =>
    href.startsWith('/contact')
      ? (href.includes('?') ? `${href}&segment=${segment}` : `${href}?segment=${segment}`)
      : href

  const primaryHref = withSegment(content.primary.href)
  const secondaryHref = withSegment(content.secondary.href)

  return (
    <article className="card print:hidden space-y-4">
      <h3 className="font-heading text-2xl">{content.title}</h3>
      <p className="text-[#5b5347]">{content.body}</p>
      <div className="flex flex-wrap gap-3">
        <Link to={primaryHref} className="btn-primary" onClick={onConsultationClick}>{content.primary.label}</Link>
        <Link to={secondaryHref} className="btn-secondary">{content.secondary.label}</Link>
      </div>
      <p className="text-sm text-[#5b5347]">
        This tool does not constitute tax or legal advice. Results are modelled estimates based on publicly available data and policy-source assumptions.
      </p>
    </article>
  )
}
