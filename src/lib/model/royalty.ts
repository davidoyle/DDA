import { BASE_ASSUMPTIONS, resolve } from './assumptions';
import type { AssumptionRegister, DualOutputRow } from './types';

export interface RoyaltyInputs { register?: AssumptionRegister; spudDate: string; productionYear: number; capitalRecovered: boolean; currentGasPrice: number; grossRevenue: number; allowableCosts: number; }

export function calculateRoyalty(inputs: RoyaltyInputs) {
  const register = inputs.register ?? BASE_ASSUMPTIONS;
  const spud = new Date(inputs.spudDate).getTime();
  const frameworkDate = new Date('2022-09-01').getTime();
  const netRevenue = Math.max(0, inputs.grossRevenue - inputs.allowableCosts);
  if (spud < frameworkDate && inputs.productionYear < 2027) {
    const royaltyRate = 0.12;
    return { royaltyRate, royaltyAmount: netRevenue * royaltyRate, framework: 'Existing framework proxy', flagsUsed: ['royalty.existingRateTable'] };
  }
  if (spud >= frameworkDate && !inputs.capitalRecovered) {
    const royaltyRate = Number(resolve(register, 'royalty.transitionalRate'));
    return { royaltyRate, royaltyAmount: netRevenue * royaltyRate, framework: 'Transitional capital recovery', flagsUsed: [] };
  }
  const low = Number(resolve(register, 'royalty.thresholdLow'));
  const high = Number(resolve(register, 'royalty.thresholdHigh'));
  const minRate = Number(resolve(register, 'royalty.minRate'));
  const maxRate = Number(resolve(register, 'royalty.maxRate'));
  const ratio = Math.min(1, Math.max(0, (inputs.currentGasPrice - low) / Math.max(0.01, high - low)));
  const royaltyRate = minRate + ratio * (maxRate - minRate);
  return { royaltyRate, royaltyAmount: netRevenue * royaltyRate, framework: 'Modern price-sensitive framework', flagsUsed: ['royalty.thresholdLow', 'royalty.thresholdHigh'] };
}

export function royaltySensitivitySweep(baseIRR: number | null, baseRevenueNPV: number, steps = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35, 0.40]): DualOutputRow[] {
  const irr = baseIRR ?? 0;
  return steps.map((royaltyRate) => ({ royaltyRate, projectIRR: Math.max(-0.5, irr - (royaltyRate - 0.05) * 0.9), provincialRevenueNPV: baseRevenueNPV * (1 + (royaltyRate - 0.05) * 2.2), flagsUsed: ['royalty.thresholdLow', 'royalty.thresholdHigh', 'macro.wacc', 'macro.socialDiscountRate'] }));
}
