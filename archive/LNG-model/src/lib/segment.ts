import type { IntentValue } from '@/components/IntentPrompt'

export type SegmentKey = 'cost_reducer' | 'risk_avoider' | 'policy_actor'

export interface SegmentSignals {
  viewed_advocacy: boolean
  viewed_risk_flags: boolean
  risk_flags_dwell_s: number
  clicked_consultation: boolean
}

/**
 * First-pass hypothesis mapping. Revisit after real distribution data is collected.
 */
export function deriveSegment(intent: IntentValue | 'unknown', signals: SegmentSignals): SegmentKey {
  if (intent === 'advisor' || intent === 'policy_change') return 'policy_actor'
  if (intent === 'benchmarking') return signals.viewed_advocacy ? 'policy_actor' : 'risk_avoider'
  if (intent === 'rate_change') {
    if (signals.viewed_risk_flags && signals.risk_flags_dwell_s > 30) return 'risk_avoider'
    return 'cost_reducer'
  }
  return 'risk_avoider'
}
