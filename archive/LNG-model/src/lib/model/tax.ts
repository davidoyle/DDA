import { BASE_ASSUMPTIONS, resolve } from './assumptions';
import type { AssumptionRegister } from './types';

export type AssetType = 'PIPELINE' | 'LNG_FACILITY' | 'PROCESSING' | 'GENERAL';
export interface TaxInputs { register?: AssumptionRegister; taxableIncome: number; undepreciatedCapitalCost: number; assetType: AssetType; yearIndex: number; calendarYear: number; facilityEmissions: number; benchmarkEmissions: number; }

export function calculateTax(inputs: TaxInputs) {
  const register = inputs.register ?? BASE_ASSUMPTIONS;
  const flagsUsed: string[] = [];
  let ccaRate = Number(resolve(register, 'tax.ccaClass43'));
  if (inputs.assetType === 'PIPELINE') ccaRate = Number(resolve(register, 'tax.ccaClass2'));
  if (inputs.assetType === 'LNG_FACILITY') { ccaRate = Number(resolve(register, 'tax.ccaLNGFacility')); flagsUsed.push('tax.ccaLNGFacility'); }
  const ccaDeduction = inputs.undepreciatedCapitalCost * ccaRate * (inputs.yearIndex === 0 ? 0.5 : 1);
  const taxable = Math.max(0, inputs.taxableIncome - ccaDeduction);
  const federalCIT = taxable * Number(resolve(register, 'tax.federalCIT'));
  const provincialCIT = taxable * Number(resolve(register, 'tax.bcCIT'));
  const obpsYear = Math.min(Math.max(inputs.calendarYear, 2026), 2030);
  const obpsCarbonCost = Math.max(0, inputs.facilityEmissions - inputs.benchmarkEmissions) * Number(resolve(register, `tax.obps.${obpsYear}`)) / 1_000_000;
  const totalCIT = federalCIT + provincialCIT;
  const totalTax = totalCIT + obpsCarbonCost;
  return { federalCIT, provincialCIT, totalCIT, ccaDeduction, obpsCarbonCost, totalTax, effectiveRate: inputs.taxableIncome > 0 ? totalTax / inputs.taxableIncome : 0, flagsUsed };
}
