import { IMPLIED_REVENUE, MARGIN_MIDPOINTS } from './pst-config'
import type { DiagnosticSnapshot } from './session'

type FirmSize = 'small' | 'mid' | 'large'

function inferFirmSize(snapshot: DiagnosticSnapshot | null): FirmSize {
  const raw = snapshot?.firmSize
  if (raw === 'small' || raw === 'mid' || raw === 'large') return raw
  return 'small'
}

export interface ExposureIndexResult {
  index: number
  complete: boolean
  marginPool: number
  combinedAbsorbedCost: number
}

/**
 * Regulatory Cost Index
 * Formula: ((WCB absorbed cost + PST absorbed cost) / implied operating margin pool) * 100
 * Margin pool uses implied revenue by firm size × midpoint margin assumption.
 * Index is capped to [0, 100], where 100 ~= full implied margin elimination.
 */
export function calculateExposureIndex(wcb: DiagnosticSnapshot | null, pst: DiagnosticSnapshot | null): ExposureIndexResult {
  const reference = pst ?? wcb
  const firmSize = inferFirmSize(reference)
  const marginPool = IMPLIED_REVENUE[firmSize] * MARGIN_MIDPOINTS[firmSize]
  const wcbCost = wcb?.headlineCost ?? 0
  const pstCost = pst?.headlineCost ?? 0
  const combined = wcbCost + pstCost
  const raw = marginPool > 0 ? (combined / marginPool) * 100 : 0

  return {
    index: Math.max(0, Math.min(100, raw)),
    complete: Boolean(wcb && pst),
    marginPool,
    combinedAbsorbedCost: combined,
  }
}

export function estimateSectorPercentile(index: number, sector: string): { percentile: number; band: string } {
  const sectorBias: Record<string, number> = {
    construction: 8,
    mining: 10,
    manufacturing: 6,
    retail: -4,
    tech: -6,
    finance: -3,
    other: 0,
  }
  const bias = sectorBias[sector] ?? 0
  const percentile = Math.max(5, Math.min(95, Math.round(index + 40 + bias)))
  const band = percentile >= 75 ? 'Upper risk quartile' : percentile <= 25 ? 'Lower risk quartile' : 'Mid-range exposure band'
  return { percentile, band }
}
