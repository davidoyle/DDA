import type { ToolSignal } from './types';

export const buildExecutiveBrief = (signals: ToolSignal[]) => {
  const totalAnnualImpact = signals.reduce((sum, signal) => sum + signal.annualCostImpact, 0);
  const weighted = totalAnnualImpact * 3;

  const drivers = signals
    .flatMap((signal) => signal.keyDrivers)
    .slice(0, 5);

  const actions = signals
    .flatMap((signal) => signal.recommendedActions)
    .slice(0, 5);

  return {
    totalAnnualImpact,
    threeYearDownsideLow: weighted * 0.85,
    threeYearDownsideBase: weighted,
    threeYearDownsideHigh: weighted * 1.15,
    topDrivers: drivers,
    topActions: actions,
  };
};
