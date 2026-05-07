import type { DualOutputRow, ReturnMetrics } from './types';

const pct = (value: number) => `${(value * 100).toFixed(1)}%`;
const moneyB = (valueM: number) => `$${(valueM / 1000).toFixed(1)}B`;

export function generateNarrative(metrics: ReturnMetrics, dualOutputRows: DualOutputRow[], wacc: number) {
  const irr = metrics.irr ?? 0;
  let viability: string;
  if (irr > wacc + 0.03) {
    viability = `At current terms, the selected project generates an estimated IRR of ${pct(irr)}, materially above the assumed cost of capital (${pct(wacc)}). The project appears viable without additional fiscal concessions.`;
  } else if (Math.abs(irr - wacc) <= 0.01) {
    viability = `The project is estimated to be marginally viable at ${pct(irr)}, within one percentage point of the assumed cost of capital (${pct(wacc)}). Fiscal terms should be tested carefully before concessions are offered.`;
  } else {
    viability = `At current terms, the project does not meet the assumed return threshold: estimated IRR is ${pct(irr)} versus a cost of capital of ${pct(wacc)}.`;
  }

  const govTake = metrics.governmentTakeUndiscounted > 0 ? metrics.governmentTakeNPV / metrics.governmentTakeUndiscounted : 0;
  const revenue = `The Province collects an estimated ${moneyB(metrics.governmentTakeNPV)} in NPV revenue over 25 years under base-case assumptions, equivalent to a ${(govTake * 100).toFixed(1)}% government take on project revenues.`;

  const viableRows = dualOutputRows.filter((row) => (row.projectIRR ?? -Infinity) >= wacc);
  let recommendation: string;
  if (viableRows.length) {
    const min = Math.min(...viableRows.map((row) => row.royaltyRate));
    const max = Math.max(...viableRows.map((row) => row.royaltyRate));
    const current = dualOutputRows.find((row) => Math.abs(row.royaltyRate - 0.05) < 0.001)?.royaltyRate ?? 0.05;
    const position = current >= min && current <= max ? 'falls within' : current > max ? 'exceeds' : 'is below';
    recommendation = `Fiscal space exists between ${pct(min)} and ${pct(max)} royalty. The legislated framework ${position} this range.`;
  } else {
    const gap = Math.max(0, wacc - irr) * 100;
    recommendation = `No fiscal space exists at current cost assumptions. Concessions would need to address an estimated breakeven gap of $${gap.toFixed(1)}/MMBtu.`;
  }

  return { viability, revenue, recommendation };
}
