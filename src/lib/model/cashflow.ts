import { BASE_ASSUMPTIONS, resolve } from './assumptions';
import { calculateRoyalty } from './royalty';
import { calculateTax } from './tax';
import { calculateElectricityCost } from './utility';
import type { AssumptionRegister, CashFlowRow, Project, ReturnMetrics } from './types';

const defaultProject: Project = { id: 'lng-canada-phase-1', name: 'LNG Canada Phase 1', type: 'LNG_EXPORT', capacityMtpa: 14, inServiceYear: 2026, projectLifeYears: 25, extendedLifeYears: 40, modelStatus: 'Initial public model' };
const npvAt = (cashflows: number[], rate: number) => cashflows.reduce((sum, cf, i) => sum + cf / (1 + rate) ** i, 0);

function irr(cashflows: number[]) {
  let rate = 0.1;
  for (let i = 0; i < 60; i += 1) {
    const f = npvAt(cashflows, rate);
    const df = cashflows.reduce((sum, cf, year) => year === 0 ? sum : sum - year * cf / (1 + rate) ** (year + 1), 0);
    if (Math.abs(df) < 1e-9) break;
    const next = rate - f / df;
    if (!Number.isFinite(next)) return null;
    if (Math.abs(next - rate) < 1e-7) return next;
    rate = Math.max(-0.95, Math.min(2, next));
  }
  return Number.isFinite(rate) ? rate : null;
}

export function buildCashFlow({ project = defaultProject, register = BASE_ASSUMPTIONS }: { project?: Project; register?: AssumptionRegister }) {
  const rows: CashFlowRow[] = [];
  const allFlagsUsed = new Set<string>(['price.jkm.base', 'price.cadUsd', 'infra.pipelineToll', 'upstream.wellOpex', 'macro.wacc', 'macro.socialDiscountRate']);
  const capexTotal = project.capexB !== undefined ? project.capexB * 1000 : (project.capacityMtpa ?? 14) * 1200;
  let cumulativeAtfcf = 0;
  for (let year = 0; year <= project.projectLifeYears; year += 1) {
    const calendarYear = project.inServiceYear + year;
    const capacity = project.capacityMtpa ?? 14;
    const productionMmbtu = capacity * 1_000_000 * 48.6;
    const fx = Number(resolve(register, 'price.cadUsd'));
    const jkmCad = Number(resolve(register, 'price.jkm.base')) / fx;
    const revenue = year === 0 ? 0 : productionMmbtu * jkmCad / 1_000_000;
    const upstreamOpex = year === 0 ? 0 : productionMmbtu * Number(resolve(register, 'upstream.wellOpex')) / 1_000_000;
    const pipelineToll = year === 0 ? 0 : productionMmbtu * Number(resolve(register, 'infra.pipelineToll')) / 1_000_000;
    const facilityOpex = year === 0 ? 0 : project.annualOpexM ?? revenue * 0.08;
    const electricityCost = year === 0 ? 0 : calculateElectricityCost(project.electricityGWh ?? 2000, Math.max(1, (project.electricityGWh ?? 2000) / 5.7), register).annualElectricityCostM;
    const capex = year === 0 ? capexTotal : 0;
    const ebitda = revenue - upstreamOpex - pipelineToll - facilityOpex - electricityCost;
    const calculatedRoyalty = calculateRoyalty({ register, spudDate: '2022-09-01', productionYear: calendarYear, capitalRecovered: year > 5, currentGasPrice: Number(resolve(register, 'price.bcPlantInlet.base')), grossRevenue: revenue, allowableCosts: upstreamOpex + pipelineToll });
    const netRoyaltyRevenue = Math.max(0, revenue - upstreamOpex - pipelineToll);
    const royalty = project.overrideRoyaltyRate !== undefined && year > 0
      ? { ...calculatedRoyalty, royaltyRate: project.overrideRoyaltyRate, royaltyAmount: netRoyaltyRevenue * project.overrideRoyaltyRate, framework: 'Analyst-selected royalty override' }
      : calculatedRoyalty;
    royalty.flagsUsed.forEach((f) => allFlagsUsed.add(f));
    const tax = calculateTax({ register, taxableIncome: ebitda - royalty.royaltyAmount, undepreciatedCapitalCost: Math.max(0, capexTotal - year * capexTotal * 0.05), assetType: 'LNG_FACILITY', yearIndex: year, calendarYear, facilityEmissions: revenue * 500, benchmarkEmissions: revenue * 350 });
    tax.flagsUsed.forEach((f) => allFlagsUsed.add(f));
    const atfcf = ebitda - capex - royalty.royaltyAmount - tax.totalCIT - tax.obpsCarbonCost;
    cumulativeAtfcf += atfcf;
    rows.push({ year, calendarYear, revenue, upstreamOpex, pipelineToll, facilityOpex, electricityCost, ebitda, capex, royaltyRate: royalty.royaltyRate, royaltyAmount: royalty.royaltyAmount, citFederal: tax.federalCIT, citProvincial: tax.provincialCIT, carbonCost: tax.obpsCarbonCost, atfcf, cumulativeAtfcf });
  }
  const cashflows = rows.map((r) => r.atfcf);
  const wacc = Number(resolve(register, 'macro.wacc'));
  const social = Number(resolve(register, 'macro.socialDiscountRate'));
  const governmentFlows = rows.map((r) => r.royaltyAmount + r.citProvincial);
  const payback = rows.find((r) => r.year > 0 && r.cumulativeAtfcf >= 0)?.calendarYear ?? null;
  const flagsUsed = [...allFlagsUsed];
  const metrics: ReturnMetrics = { npv: npvAt(cashflows, wacc), irr: irr(cashflows), paybackYear: payback, governmentTakeUndiscounted: governmentFlows.reduce((a, b) => a + b, 0), governmentTakeNPV: npvAt(governmentFlows, social), flagsUsed, allActual: false };
  return { rows, metrics, allFlagsUsed: flagsUsed };
}

export const DEFAULT_PROJECT = defaultProject;
