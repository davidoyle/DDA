import type { FirmSize, Sector } from './pst-types'

export const PST_RATE = 0.07

export const TAXABLE_SHARES = {
  accounting: 0.92,
  aeg: {
    low: 0.3,
    base: 0.42,
    high: 0.52,
  },
  re: 0.85,
  security: 1,
}

export const PASSTHROUGH_RATES: Record<Sector, Record<FirmSize, number>> = {
  construction: { small: 0.52, mid: 0.75, large: 0.9 },
  mining: { small: 0.55, mid: 0.78, large: 0.92 },
  tech: { small: 0.4, mid: 0.55, large: 0.65 },
  retail: { small: 0.35, mid: 0.5, large: 0.6 },
  manufacturing: { small: 0.42, mid: 0.6, large: 0.7 },
  finance: { small: 0.48, mid: 0.68, large: 0.8 },
  other: { small: 0.32, mid: 0.44, large: 0.52 },
}

export const COMPLIANCE_COSTS: Record<FirmSize, number> = {
  small: 4650,
  mid: 13500,
  large: 28000,
}

export const MARGIN_MIDPOINTS: Record<FirmSize, number> = {
  small: 0.1,
  mid: 0.125,
  large: 0.155,
}

export const IMPLIED_REVENUE: Record<FirmSize, number> = {
  small: 1000000,
  mid: 11000000,
  large: 40000000,
}

export const INVESTMENT_ELASTICITY = {
  low: -0.12,
  central: -0.2,
  high: -0.28,
}

export const BEHAVIOURAL_EROSION = {
  low: 0.075,
  medium: 0.175,
  high: 0.275,
}

export const CFIB_COST_PER_EMPLOYEE = 7000
export const INVESTMENT_PANEL_THRESHOLD = 50000
export const PARAMETERS_LAST_UPDATED = 'March 2026'
