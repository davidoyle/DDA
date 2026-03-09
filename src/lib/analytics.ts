export type AnalyticsEventName =
  | 'intent_captured'
  | 'diag_start'
  | 'diag_complete'
  | 'toggle_used'
  | 'risk_flags_viewed'
  | 'advocacy_viewed'
  | 'advocacy_cta_click'
  | 'consultation_click'
  | 'return_user_run'
  | 'dashboard_prompt_shown'
  | 'dashboard_prompt_accepted'

export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function dispatchAnalyticsEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (!window.gtag) return
  window.gtag('event', name, params)
}
