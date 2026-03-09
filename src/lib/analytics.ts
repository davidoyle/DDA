export type AnalyticsEventName =
  | 'diag_directory_open'
  | 'diag_launch_click'
  | 'diag_start'
  | 'diag_complete'
  | 'diag_scenario_change'
  | 'diag_mode_change'
  | 'diag_cta_click'

export type AnalyticsEventParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  if (!window.gtag) return
  window.gtag('event', name, params)
}
