import type { SegmentKey } from '@/lib/segment'

export const ctaContent: Record<SegmentKey, { title: string; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } }> = {
  cost_reducer: {
    title: 'Reduce cost pressure quickly',
    body: 'Get a focused review on the fastest path to lower near-term regulatory cost exposure.',
    primary: { label: 'Book a direct consultation', href: '/contact' },
    secondary: { label: 'Open Experience Rating Optimizer (coming soon)', href: '/diagnostics' },
  },
  risk_avoider: {
    title: 'Stay ahead of exposure shifts',
    body: 'Track your combined exposure over time and review your assumptions before costs surprise you.',
    primary: { label: 'Open your dashboard', href: '/dashboard' },
    secondary: { label: 'Review exposure with an advisor', href: '/contact' },
  },
  policy_actor: {
    title: 'Translate exposure into sector leverage',
    body: 'Frame your findings for members, peers, and policy stakeholders with strategic comparators.',
    primary: { label: 'Talk to us about your members', href: '/contact' },
    secondary: { label: 'Open diagnostics library', href: '/diagnostics' },
  },
}
