import { resolve } from './assumptions';
import type { AssumptionRegister } from './types';

export const LNG_LOADS_GWH = { 'LNG Canada Phase 1': 2000, 'LNG Canada Phase 2': 5124, 'Cedar LNG': 1875, 'Ksi Lisims': 5256 } as const;

export function calculateElectricityCost(annualGWh: number, peakMW: number, register: AssumptionRegister) {
  const energyCents = Number(resolve(register, 'utility.rs1830EnergyCharge'));
  const demand = Number(resolve(register, 'utility.rs1830DemandCharge'));
  const energyComponentM = annualGWh * 1_000_000 * (energyCents / 100) / 1_000_000;
  const demandComponentM = peakMW * 1_000 * demand * 12 / 1_000_000;
  return { annualElectricityCostM: energyComponentM + demandComponentM, energyComponentM, demandComponentM, flagsUsed: [] as string[] };
}
