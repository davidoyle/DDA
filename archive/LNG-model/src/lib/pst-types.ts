export type Sector =
  | 'construction'
  | 'mining'
  | 'tech'
  | 'retail'
  | 'manufacturing'
  | 'finance'
  | 'other'

export type FirmSize = 'small' | 'mid' | 'large'
export type BundlingScenario = 'low' | 'base' | 'high'
export type ResponseScenario = 'low' | 'medium' | 'high'

export interface PSTFormValues {
  sector: Sector
  firmSize: FirmSize
  employeeCount?: number
  spendAccounting: number
  spendAEG: number
  spendRealEstate: number
  spendSecurity: number
  bundlingScenario: BundlingScenario
  responseScenario: ResponseScenario
  passthroughOverride?: number
}

export interface ServiceRow {
  id: 'accounting' | 'aeg' | 're' | 'security'
  label: string
  spend: number
  taxableShare: number
  pstCost: number
  netCost: number
  effectiveRate: number
}

export type RiskLevel = 'high' | 'medium' | 'low'

export interface RiskFlag {
  id: string
  level: RiskLevel
  title: string
  body: string
  sourceNote: string
  evidenceTier: 'VERIFIED' | 'MODELLED' | 'SPECULATIVE'
}

export interface PSTResults {
  rows: ServiceRow[]
  totalSpend: number
  totalPST: number
  totalNetCost: number
  passthroughRate: number
  complianceCost: number
  year1TotalImpact: number
  aggregateComplianceCost?: number
  pctOfSpend: number
  absorbedShockToMarginRatio: number
  totalPSTToMarginRatio: number
  bcDisadvantageVsAB: number
  bcDisadvantageVsON: number
  investmentDragMild?: number
  investmentDragCentral?: number
  investmentDragSevere?: number
  erosionLow: number
  erosionMedium: number
  erosionHigh: number
  adjustedCostLow: number
  adjustedCostMedium: number
  adjustedCostHigh: number
  riskFlags: RiskFlag[]
  sector: Sector
  firmSize: FirmSize
  bundlingScenario: BundlingScenario
  responseScenario: ResponseScenario
}
