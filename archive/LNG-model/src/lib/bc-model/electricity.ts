import {
  DUAL_FUEL_PEAK_REDUCTION_VS_ALL_ELECTRIC,
  DUAL_FUEL_REGIONAL_DISCOUNT,
  ELECTRICITY_DEMAND_GROWTH_BY_2030,
  ELECTRIFICATION_NEW_LOAD_MW,
  NEW_CLEAN_GENERATION_GWH_PER_YEAR,
} from './constants';
import type { ElectricityFeedback, GridConstraintResult, ModelState, PolicyControls } from './types';

export const ELECTRICITY_FEEDBACK: ElectricityFeedback = {
  demandGrowthBy2030: ELECTRICITY_DEMAND_GROWTH_BY_2030,
  newGenerationNeeded: NEW_CLEAN_GENERATION_GWH_PER_YEAR,
  newLoadFromElectrification: ELECTRIFICATION_NEW_LOAD_MW,
};

export function computeElectricityDemandGrowth(controls: PolicyControls, year: number) {
  const progress = Math.max(0, Math.min(1, (year - 2025) / 5));
  const electrificationPush = 0.45 * controls.buildingsSupport + 0.35 * controls.industrySupport + 0.2 * controls.zevSupport;
  const dualFuelRelief = controls.dualFuelPolicy * DUAL_FUEL_PEAK_REDUCTION_VS_ALL_ELECTRIC * DUAL_FUEL_REGIONAL_DISCOUNT * 0.05;
  return Math.max(0, progress * ELECTRICITY_DEMAND_GROWTH_BY_2030 * (0.75 + electrificationPush) - dualFuelRelief);
}

export function computeGridConstraint(controls: PolicyControls, state: ModelState, year: number): GridConstraintResult {
  if (year < 2028) {
    return { constrained: false, penaltyFactor: 1 };
  }

  const supportGap = Math.max(0, 0.3 - controls.gridExpansionSupport);
  const demandStress = Math.max(0, state.electricityDemandGrowth - 0.11);
  if (supportGap <= 0) {
    return { constrained: false, penaltyFactor: 1 };
  }

  const penaltyFactor = Math.max(0.45, 1 - supportGap * 1.8 - demandStress * 1.1);
  return {
    constrained: penaltyFactor < 0.98,
    penaltyFactor,
  };
}
