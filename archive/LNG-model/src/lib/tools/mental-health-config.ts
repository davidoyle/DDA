export const pickeringMultipliers = { low: 1.15, base: 1.22, high: 1.35 };
export const rtwAdjustmentFactor = 0.82;
export const rampByYear = [0, 0.05, 0.08];

export const sectorRates = {
  'Healthcare & Social Assistance': { claimRatePer100: 1.9, avgCost: 48000 },
  Construction: { claimRatePer100: 0.6, avgCost: 36000 },
  'Public Administration': { claimRatePer100: 1.3, avgCost: 43000 },
  Education: { claimRatePer100: 0.9, avgCost: 39000 },
  'Transportation & Warehousing': { claimRatePer100: 1.0, avgCost: 41000 },
  'Retail Trade': { claimRatePer100: 0.45, avgCost: 28000 },
  Manufacturing: { claimRatePer100: 0.75, avgCost: 34000 },
  'Accommodation & Food Services': { claimRatePer100: 0.55, avgCost: 27000 },
  Other: { claimRatePer100: 0.5, avgCost: 30000 },
} as const;

export const healthcareSubSectors = [
  'Acute Care (hospital)',
  'Long-Term Care',
  'Home Support',
  'Community Mental Health',
  'Emergency Services (paramedics/fire)',
] as const;

export const mitigationItems = [
  { name: 'Psychological health and safety policy', impact: -12, sectors: ['all'], source: 'IWH guidance' },
  { name: 'EAP + mandatory awareness program', impact: -8, sectors: ['all'], source: 'SafeCare BC' },
  { name: 'RTW coordinator for mental health claims', impact: -18, sectors: ['all'], source: 'IWH RTW studies' },
  { name: 'Supervisor mental health training', impact: -10, sectors: ['Healthcare & Social Assistance', 'Education', 'Public Administration'], source: 'IWH supervision effect range' },
  { name: 'Incident debriefing protocol', impact: -6, sectors: ['Healthcare & Social Assistance', 'Transportation & Warehousing', 'Public Administration'], source: 'SafeCare BC trauma-exposure guidance' },
] as const;
