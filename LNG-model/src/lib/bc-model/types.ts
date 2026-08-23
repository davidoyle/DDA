export const SECTORS = ['transport', 'industry', 'buildings'] as const;
export type Sector = (typeof SECTORS)[number];
export type Status = 'ON TRACK' | 'AT RISK' | 'OFF TRACK';
export type ScenarioPresetId = 'baseline' | 'accelerated' | 'constrained' | 'politicalStress' | 'gridConstrained';

export interface PhiWeights {
  phi1: number;
  phi2: number;
  phi3: number;
  phi4: number;
}

export interface PolicyControls {
  carbonPrice: number;
  zevSupport: number;
  industrySupport: number;
  buildingsSupport: number;
  householdRelief: number;
  regulatoryStringency: number;
  dualFuelPolicy: number;
  gridExpansionSupport: number;
}

export interface ModelState {
  year: number;
  emissions: Record<Sector, number>;
  totalEmissions: number;
  zevShare: number;
  cleanCapital: Record<Sector, number>;
  dirtyCapital: Record<Sector, number>;
  householdBurden: number;
  policyCred: number;
  onTrack2030: boolean;
  electricityDemandGrowth: number;
  dualFuelAdoption: number;
  pulpPaperEmissions: number;
}

export interface ElectricityFeedback {
  demandGrowthBy2030: number;
  newGenerationNeeded: number;
  newLoadFromElectrification: number;
}

export interface GridConstraintResult {
  constrained: boolean;
  penaltyFactor: number;
}

export interface SimulationPoint extends ModelState {
  status: Status;
  politicalCost: number;
  gridConstraintTriggered: boolean;
  target2030: number;
  target2025: number;
}

export interface ScenarioDefinition {
  id: ScenarioPresetId | string;
  label: string;
  description: string;
  controls: PolicyControls;
  phiWeights?: PhiWeights;
}

export interface ScenarioRun {
  id: string;
  label: string;
  description: string;
  controls: PolicyControls;
  phiWeights: PhiWeights;
  results: SimulationPoint[];
}
