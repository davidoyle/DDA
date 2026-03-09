import type {
  DriftLinePoint,
  IndustryRow,
  Mode,
  Scenario,
  ScenarioChartPoint,
  ScenarioTimelineRow,
  SharedOutput,
} from './types';

const SYSTEM_BASE = 1.55;
const SYSTEM_LOADING = 0.25;

export const fmtMoney = (value: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);

export const getSelectedIndustry = (industryRows: IndustryRow[], selectedIndustryName: string) =>
  industryRows.find((industry) => industry.name === selectedIndustryName) ?? industryRows[1];

export const getScenarioChartData = (scenario: Scenario): ScenarioChartPoint[] =>
  scenario.steps.map((step) => ({
    year: `Y${step.year}`,
    low: step.low,
    high: step.high,
    midpoint: (step.low + step.high) / 2,
    floor: scenario.floor,
  }));

interface SharedOutputArgs {
  mode: Mode;
  selectedIndustry: IndustryRow;
  costSensitivity: number;
  proxyPayroll: number;
  ownPayroll: number;
  currentEffectiveRate: number;
  averageWage: number;
  injuryFrequency: number;
  avgCostPerClaim: number;
  medicalInflation: number;
  safetyImprovement: number;
}

export const getSharedOutput = ({
  mode,
  selectedIndustry,
  costSensitivity,
  proxyPayroll,
  ownPayroll,
  currentEffectiveRate,
  averageWage,
  injuryFrequency,
  avgCostPerClaim,
  medicalInflation,
  safetyImprovement,
}: SharedOutputArgs): SharedOutput => {
  if (mode === 'proxy') {
    const claimCostProxy = selectedIndustry.baseRate * 0.75;
    const riskScore = selectedIndustry.frequencyIndex * selectedIndustry.severityIndex * selectedIndustry.wageIndex;
    const payrollImplied = 100;
    const sensitivity = 1 + costSensitivity / 100;
    const adequateRate = ((claimCostProxy * riskScore * 100) / payrollImplied) * (1 + SYSTEM_LOADING) * sensitivity;
    const repricingGap = adequateRate - selectedIndustry.baseRate;
    const baseExposure = (proxyPayroll * repricingGap) / 100;

    return {
      payroll: proxyPayroll,
      currentRate: selectedIndustry.baseRate,
      lowExposure: baseExposure * 0.85,
      baseExposure,
      highExposure: baseExposure * 1.15,
      bandLabel: '±15% (proxy model)',
      modeLabel: 'System-average proxy estimate',
      assumptions: [
        `Industry base rate: $${selectedIndustry.baseRate.toFixed(2)} (WorkSafeBC 2026 Classification and Rate List)`,
        'Claim cost share assumption: 75% (proxy)',
        `Risk score components (proxy public data): frequency ${selectedIndustry.frequencyIndex.toFixed(2)}, severity ${selectedIndustry.severityIndex.toFixed(2)}, wage ${selectedIndustry.wageIndex.toFixed(2)}`,
        'System loading assumption: 25%',
        'Uncertainty band basis: ±15% around base exposure',
      ],
    };
  }

  const workers = ownPayroll / Math.max(averageWage, 1);
  const annualClaimCost = (injuryFrequency / 100) * workers * avgCostPerClaim;
  const adequateRate = (annualClaimCost / Math.max(ownPayroll, 1)) * 100 * 1.25;
  const repricingGap = adequateRate - currentEffectiveRate;
  const baseExposure = (ownPayroll * repricingGap) / 100;

  return {
    payroll: ownPayroll,
    currentRate: currentEffectiveRate,
    lowExposure: baseExposure * 0.9,
    baseExposure,
    highExposure: baseExposure * 1.1,
    bandLabel: '±10% (own numbers model)',
    modeLabel: 'Firm-specific estimate (proxy methodology)',
    assumptions: [
      `Current effective WSBC rate: $${currentEffectiveRate.toFixed(2)} per $100 payroll`,
      `Workers = payroll ÷ wage = ${workers.toFixed(1)} (wage input ${fmtMoney(averageWage)})`,
      `Annual claim cost = (frequency ÷ 100) × workers × cost per claim = ${fmtMoney(annualClaimCost)}`,
      'System loading assumption: 25%',
      `Uncertainty band basis: ±10% around base exposure (inputs include medical inflation ${medicalInflation.toFixed(1)}% and safety improvement ${safetyImprovement.toFixed(1)}%)`,
    ],
  };
};

export const getScenarioTimeline = (scenario: Scenario, sharedOutput: SharedOutput): ScenarioTimelineRow[] => {
  const scale = sharedOutput.currentRate / SYSTEM_BASE;
  const todayPremium = (sharedOutput.payroll * sharedOutput.currentRate) / 100;
  const rows: ScenarioTimelineRow[] = [];
  let cumulative = 0;

  for (let year = 1; year <= 5; year += 1) {
    const stepForYear = scenario.steps.find((step) => step.year === year);
    const lastStep = scenario.steps[scenario.steps.length - 1];
    const baseRatePoint = stepForYear ? (stepForYear.low + stepForYear.high) / 2 : (lastStep.low + lastStep.high) / 2;
    const rateApplied = baseRatePoint * scale;
    const annualPremium = (sharedOutput.payroll * rateApplied) / 100;
    const delta = annualPremium - todayPremium;
    cumulative += delta;
    rows.push({ year, rateApplied, annualPremium, delta, cumulative });
  }

  return rows;
};

interface DriftLineArgs {
  mode: Mode;
  avgCostPerClaim: number;
  medicalInflation: number;
  injuryFrequency: number;
  safetyImprovement: number;
  ownPayroll: number;
  averageWage: number;
}

export const getDriftLine = ({
  mode,
  avgCostPerClaim,
  medicalInflation,
  injuryFrequency,
  safetyImprovement,
  ownPayroll,
  averageWage,
}: DriftLineArgs): DriftLinePoint[] => {
  if (mode !== 'own') {
    return [];
  }

  return Array.from({ length: 5 }, (_, index) => {
    const year = index + 1;
    const severity = avgCostPerClaim * (1 + medicalInflation / 100) ** year;
    const frequency = injuryFrequency * (1 - safetyImprovement / 100) ** year;
    const workers = ownPayroll / Math.max(averageWage, 1);
    const annualClaimCost = (frequency / 100) * workers * severity;
    const adequateRate = (annualClaimCost / Math.max(ownPayroll, 1)) * 100 * 1.25;
    return { year: `Year ${year}`, adequateRate };
  });
};
