export type Classification = 'ACTUAL' | 'PROXY' | 'FLAG' | 'PARTIAL_ACTUAL';

export interface Assumption {
  id: string;
  label: string;
  value: number | string | null;
  flagDefault: number | string;
  flagDefaultBasis: string;
  unit: string;
  classification: Classification;
  source: string;
  sourceDate: string;
  reviewFlag: boolean;
  notes?: string;
}

export type AssumptionRegister = Record<string, Assumption>;

export interface CashFlowRow {
  year: number; calendarYear: number; revenue: number; upstreamOpex: number; pipelineToll: number; facilityOpex: number; electricityCost: number; ebitda: number; capex: number; royaltyRate: number; royaltyAmount: number; citFederal: number; citProvincial: number; carbonCost: number; atfcf: number; cumulativeAtfcf: number;
}

export interface ReturnMetrics { npv: number; irr: number | null; paybackYear: number | null; governmentTakeUndiscounted: number; governmentTakeNPV: number; flagsUsed: string[]; allActual: boolean; }
export interface DualOutputRow { royaltyRate: number; projectIRR: number | null; provincialRevenueNPV: number; flagsUsed: string[]; }
export interface MonteCarloResult { iterations: number; expectedNPV: number; p10NPV: number; p90NPV: number; probabilityNegativeNPV: number; irrDistribution: number[]; revenueVaR: number; flagsUsed: string[]; }
export interface JurisdictionBenchmark { id: string; name: string; govTakeLow: number | null; govTakeBase: number | null; govTakeHigh: number | null; effectiveCITRate: number; royaltyType: string; carbonPrice: number; constructionCostIndex: number; classification: Classification; source: string; }
export interface ChangeLogEntry { version: number; date: string; modulesAffected: string[]; description: string; reason: string; sourceOrAuthority: string; ministryApproval: 'PENDING' | 'APPROVED' | 'NOTED'; }
export interface Scenario { id: string; label: string; description: string; overrides: Partial<Record<string, number | string | null>>; }
export interface Project { id: string; name: string; type: string; capacityMtpa?: number; inServiceYear: number; projectLifeYears: number; extendedLifeYears: number; modelStatus: string; capexB?: number; annualOpexM?: number; electricityGWh?: number; overrideRoyaltyRate?: number; }
