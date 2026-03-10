export type ScenarioId = 'A' | 'B' | 'C' | 'D';
export type Mode = 'proxy' | 'own';

export interface HeroStat {
  value: string;
  label: string;
}

export interface IndustryRow {
  name: string;
  baseRate: number;
  riskFactor: number;
  costRate: number;
  payrollB: number;
  exposureM: number;
  currentPremiumM: number;
  costPremiumM: number;
  perEmployeeImpact: number;
  employment: number;
  frequencyIndex: number;
  severityIndex: number;
  wageIndex: number;
}

export interface ScenarioStep {
  year: number;
  low: number;
  high: number;
}

export interface Scenario {
  title: string;
  trigger: string;
  timeline: string;
  annualIncrease: string;
  totalShock: string;
  likelihood: string;
  note?: string;
  fundedProgression: string;
  floor: number;
  steps: ScenarioStep[];
}

export interface SharedOutput {
  payroll: number;
  currentRate: number;
  lowExposure: number;
  baseExposure: number;
  highExposure: number;
  bandLabel: string;
  modeLabel: string;
  assumptions: string[];
}

export interface ScenarioTimelineRow {
  year: number;
  rateApplied: number;
  annualPremium: number;
  delta: number;
  cumulative: number;
}

export interface DriftLinePoint {
  year: string;
  adequateRate: number;
}

export interface ScenarioChartPoint {
  year: string;
  low: number;
  high: number;
  midpoint: number;
  floor: number;
}
