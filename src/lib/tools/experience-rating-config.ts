export const appealThresholdPercent = 15;

export const scenarios = {
  conservative: { freqDelta: 0, costDelta: 0 },
  moderate: { freqDelta: 0, costDelta: 0.08 },
  aggressive: { freqDelta: 1, costDelta: 0.08 },
} as const;

export const sectorAverages = {
  Construction: { claimCost: 18000, claimDuration: 31 },
  Manufacturing: { claimCost: 14500, claimDuration: 27 },
  Education: { claimCost: 12500, claimDuration: 24 },
  Other: { claimCost: 14000, claimDuration: 25 },
} as const;
