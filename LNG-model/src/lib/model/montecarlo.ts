import { P1_FLAG_IDS, P2_FLAG_IDS } from './assumptions';
import type { AssumptionRegister, MonteCarloResult } from './types';

const normal = (mean: number, sd: number) => mean + sd * Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random());
const triangular = (low: number, mode: number, high: number) => {
  const u = Math.random(); const c = (mode - low) / (high - low);
  return u < c ? low + Math.sqrt(u * (high - low) * (mode - low)) : high - Math.sqrt((1 - u) * (high - low) * (high - mode));
};
const quantile = (arr: number[], q: number) => arr[Math.min(arr.length - 1, Math.max(0, Math.floor(q * (arr.length - 1))))] ?? 0;

export function runMonteCarlo({ iterations = 2000, baseNPV, baseIRR, baseGovRevenueNPV }: { register?: AssumptionRegister; iterations?: number; baseNPV: number; baseIRR: number | null; baseGovRevenueNPV: number }): MonteCarloResult {
  const npvs: number[] = []; const irrs: number[] = []; const revenues: number[] = [];
  for (let i = 0; i < iterations; i += 1) {
    const price = triangular(1.22, 2.18, 2.82) / 2.18;
    const capex = normal(1, 0.12); const opex = normal(1, 0.08); const fx = normal(1, 0.05);
    const shock = price * fx - (capex - 1) * 0.45 - (opex - 1) * 0.25;
    npvs.push(baseNPV * shock);
    irrs.push((baseIRR ?? 0) + (shock - 1) * 0.12);
    revenues.push(baseGovRevenueNPV * (price * 0.9 + 0.1));
  }
  npvs.sort((a, b) => a - b); revenues.sort((a, b) => a - b);
  return { iterations, expectedNPV: npvs.reduce((a, b) => a + b, 0) / iterations, p10NPV: quantile(npvs, 0.1), p90NPV: quantile(npvs, 0.9), probabilityNegativeNPV: npvs.filter((v) => v < 0).length / iterations, irrDistribution: irrs.slice(0, 200), revenueVaR: baseGovRevenueNPV - quantile(revenues, 0.05), flagsUsed: [...P1_FLAG_IDS, ...P2_FLAG_IDS] };
}
