const SESSION_ID_KEY = 'dda_session_id'
const VISIT_COUNT_KEY = 'dda_visit_count'

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function getSessionId() {
  const existing = localStorage.getItem(SESSION_ID_KEY)
  if (existing) return existing
  const id = createId()
  localStorage.setItem(SESSION_ID_KEY, id)
  return id
}

export function incrementVisitCount() {
  const current = Number(localStorage.getItem(VISIT_COUNT_KEY) ?? '0')
  const next = Number.isFinite(current) ? current + 1 : 1
  localStorage.setItem(VISIT_COUNT_KEY, String(next))
  return next
}

export function getVisitCount() {
  return Number(localStorage.getItem(VISIT_COUNT_KEY) ?? '0')
}

export function bucketVisitCount(visitCount: number) {
  if (visitCount <= 2) return '2'
  if (visitCount <= 5) return '3-5'
  return '6+'
}

export function bucketSpend(totalSpend: number) {
  if (totalSpend < 50_000) return 'lt_50k'
  if (totalSpend < 250_000) return '50k_250k'
  if (totalSpend < 1_000_000) return '250k_1m'
  return 'gt_1m'
}

export type DiagnosticSnapshot = {
  timestamp: string
  tool: 'wcb' | 'pst'
  sector?: string
  firmSize?: string
  headlineCost: number
  totalSpendBucket: string
  scenario: string
  results: unknown
}

export function appendSnapshot(tool: 'wcb' | 'pst', snapshot: Omit<DiagnosticSnapshot, 'tool'>) {
  const key = `dda_snapshots_${tool}`
  const existing = localStorage.getItem(key)
  const parsed: DiagnosticSnapshot[] = existing ? JSON.parse(existing) : []
  const next = [...parsed, { ...snapshot, tool }]
  const capped = next.slice(-12)
  localStorage.setItem(key, JSON.stringify(capped))
}
