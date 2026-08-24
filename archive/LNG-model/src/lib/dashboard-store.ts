import type { DiagnosticSnapshot } from './session'

const MAX_SNAPSHOTS = 12

function keyFor(tool: 'wcb' | 'pst') {
  return `dda_snapshots_${tool}`
}

export function getSnapshots(tool: 'wcb' | 'pst'): DiagnosticSnapshot[] {
  try {
    const raw = localStorage.getItem(keyFor(tool))
    if (!raw) return []
    const parsed = JSON.parse(raw) as DiagnosticSnapshot[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveSnapshots(tool: 'wcb' | 'pst', snapshots: DiagnosticSnapshot[]) {
  localStorage.setItem(keyFor(tool), JSON.stringify(snapshots.slice(-MAX_SNAPSHOTS)))
}

export function getLatestSnapshot(tool: 'wcb' | 'pst') {
  const rows = getSnapshots(tool)
  return rows[rows.length - 1] ?? null
}

export function getTrendLabel(current: number, previous: number | null): 'worsening' | 'stable' | 'improving' | 'n/a' {
  if (previous === null || previous === 0) return 'n/a'
  const change = (current - previous) / previous
  if (change > 0.05) return 'worsening'
  if (change < -0.05) return 'improving'
  return 'stable'
}
