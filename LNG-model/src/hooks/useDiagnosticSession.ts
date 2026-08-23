import { useCallback, useMemo, useState } from 'react'
import type { IntentValue } from '@/components/IntentPrompt'
import { dispatchAnalyticsEvent, type AnalyticsEventName, type AnalyticsEventParams } from '@/lib/analytics'
import { bucketVisitCount, getSessionId, getVisitCount, incrementVisitCount } from '@/lib/session'

const TTL_MS = 90 * 24 * 60 * 60 * 1000

type ToolId = 'wcb' | 'pst'

function getIntentKey(tool: ToolId) {
  return `dda_intent_${tool}`
}

function readIntent(tool: ToolId): IntentValue | null {
  const raw = localStorage.getItem(getIntentKey(tool))
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as { value: IntentValue; expiresAt: number }
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(getIntentKey(tool))
      return null
    }
    return parsed.value
  } catch {
    localStorage.removeItem(getIntentKey(tool))
    return null
  }
}

function writeIntent(tool: ToolId, value: IntentValue) {
  localStorage.setItem(getIntentKey(tool), JSON.stringify({ value, expiresAt: Date.now() + TTL_MS }))
}

export function useDiagnosticSession(tool: ToolId) {
  const [sessionId] = useState(() => getSessionId())
  const [visitCount] = useState(() => incrementVisitCount())
  const [intent, setIntent] = useState<IntentValue | 'unknown'>(() => readIntent(tool) ?? 'unknown')

  const fireEvent = useCallback(
    (name: AnalyticsEventName, params: AnalyticsEventParams = {}) => {
      if (!sessionId) return
      dispatchAnalyticsEvent(name, {
        session_id: sessionId,
        tool,
        intent,
        ...params,
      })
    },
    [intent, sessionId, tool],
  )

  const setIntentAndTrack = useCallback(
    (value: IntentValue) => {
      writeIntent(tool, value)
      setIntent(value)
      fireEvent('intent_captured', { intent: value, intent_value: value })
    },
    [fireEvent, tool],
  )

  const maybeTrackReturnRun = useCallback(() => {
    const currentVisits = getVisitCount()
    if (currentVisits > 1) {
      fireEvent('return_user_run', { visit_count: bucketVisitCount(currentVisits) })
    }
  }, [fireEvent])

  return useMemo(
    () => ({
      sessionId,
      intent,
      intentReady: intent !== 'unknown',
      visitCount,
      fireEvent,
      setIntentAndTrack,
      maybeTrackReturnRun,
    }),
    [sessionId, intent, visitCount, fireEvent, setIntentAndTrack, maybeTrackReturnRun],
  )
}
