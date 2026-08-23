import type { EvidenceTierValue } from '@/components/shared/EvidenceTier';

export interface ToolSignal {
  tool: string;
  annualCostImpact: number;
  confidenceTier: EvidenceTierValue;
  timeHorizonYears: number;
  keyDrivers: string[];
  recommendedActions: string[];
}
