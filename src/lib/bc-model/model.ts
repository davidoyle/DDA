import {
  BASELINE_EMISSIONS_MT,
  BC_AVG_HOUSEHOLD_SPENDING_2023,
  CLEANBC_INDUSTRY_FUND_CUMULATIVE_ABATEMENT_MT,
  DEFAULT_PHI_WEIGHTS,
  EV_AVOIDED_EMISSIONS_MT_BY_2050,
  FORTIS_AVG_MONTHLY_IMPACT,
  FORTIS_RATE_INCREASE_2026,
  HOUSEHOLD_BURDEN_CAP,
  MODEL_YEARS,
  NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH,
  PULP_PAPER_SHARE_OF_PROVINCIAL,
  SECTOR_SHARES_2023,
  TARGET_2025_MT,
  TARGET_2030_MT,
  ZERO_CARBON_STEP_CODE_MT_BY_2050,
  GAS_PIPELINE_PROCESSING_MT_BY_2050,
  ZEV_ANCHORS,
} from './constants';
import { computeElectricityDemandGrowth, computeGridConstraint } from './electricity';
import type { ModelState, PhiWeights, PolicyControls, ScenarioRun, Sector, SimulationPoint, Status } from './types';

const initialSectorEmissions: Record<Sector, number> = {
  transport: 61.1 * SECTOR_SHARES_2023.transport,
  industry: 61.1 * SECTOR_SHARES_2023.industry,
  buildings: 61.1 * SECTOR_SHARES_2023.buildings,
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
const interpolate2050Anchor = (anchor: number, year: number) => anchor * clamp((year - 2025) / 25, 0, 1);

export function stepZEVShare(current: number, zevSupport: number, year: number) {
  if (year <= 2026) return Math.max(current, ZEV_ANCHORS[2026]);
  if (year >= 2035) return ZEV_ANCHORS[2035];

  const t = clamp((year - 2026) / 4, 0, 1);
  const sCurve = 1 / (1 + Math.exp(-5 * (t - 0.5)));
  const anchored = lerp(ZEV_ANCHORS[2026], ZEV_ANCHORS[2030], sCurve);
  const supportLift = zevSupport * 0.08 - (zevSupport < 0.3 && year >= 2027 ? 0.03 : 0);
  return clamp(Math.max(current, anchored + supportLift), year === 2030 ? ZEV_ANCHORS[2030] : ZEV_ANCHORS[2026], 1);
}

export function computeGrowthPressure(sector: Sector, state: ModelState) {
  switch (sector) {
    case 'transport':
      return 0.01 * state.emissions.transport;
    case 'industry':
      return 0.008 * state.emissions.industry;
    case 'buildings':
      return (0.009 - 0.003 * state.dualFuelAdoption) * state.emissions.buildings;
  }
}

function computeAbatement(sector: Sector, controls: PolicyControls, state: ModelState) {
  const priceSignal = clamp((controls.carbonPrice - 65) / 185, 0, 1);
  const gridConstraint = computeGridConstraint(controls, state, state.year);
  const infeasiblePenalty = state.policyCred < 0.38 && (controls.industrySupport > 0.75 || controls.buildingsSupport > 0.75) ? 0.82 : 1;

  if (sector === 'transport') {
    const evAnchor = interpolate2050Anchor(EV_AVOIDED_EMISSIONS_MT_BY_2050, state.year);
    const zevLift = evAnchor * (0.45 + 0.55 * state.zevShare) * (0.6 + 0.4 * controls.zevSupport);
    return (0.18 + 0.28 * priceSignal + 0.18 * controls.zevSupport) * state.emissions.transport * 0.08 + zevLift * 0.45;
  }

  if (sector === 'industry') {
    const industrialCapital = 0.55 * controls.industrySupport + 0.25 * state.cleanCapital.industry + 0.2 * priceSignal;
    const pulpPaperFactor = 0.2 + PULP_PAPER_SHARE_OF_PROVINCIAL;
    const gross = state.emissions.industry * (0.024 + industrialCapital * 0.045) + CLEANBC_INDUSTRY_FUND_CUMULATIVE_ABATEMENT_MT / 10 * 0.09 * controls.industrySupport * pulpPaperFactor;
    return gross * gridConstraint.penaltyFactor * infeasiblePenalty;
  }

  const buildingElectrification = state.emissions.buildings * (0.018 + controls.buildingsSupport * 0.042 + controls.regulatoryStringency * 0.032);
  const stepCode = interpolate2050Anchor(ZERO_CARBON_STEP_CODE_MT_BY_2050, state.year);
  const gasSystem = interpolate2050Anchor(GAS_PIPELINE_PROCESSING_MT_BY_2050, state.year);
  const dualFuelDrag = 1 - controls.dualFuelPolicy * 0.3;
  return (buildingElectrification * dualFuelDrag + stepCode * 0.5 + gasSystem * 0.18) * gridConstraint.penaltyFactor * infeasiblePenalty;
}

function politicalCost(controls: PolicyControls, state: ModelState, phiWeights: PhiWeights) {
  const fuelCostDelta = clamp((controls.carbonPrice - 95) / 155, -0.2, 1);
  const powerBillDelta = clamp(FORTIS_RATE_INCREASE_2026 + state.electricityDemandGrowth * 0.6 + FORTIS_AVG_MONTHLY_IMPACT / 25, 0, 1);
  const jobLossRisk = clamp((1 - controls.industrySupport) * 0.4 + (state.pulpPaperEmissions / Math.max(state.emissions.industry, 0.01)) * 0.35, 0, 1);
  const lobbyResistance = clamp((1 - controls.householdRelief) * 0.35 + (1 - state.policyCred) * 0.45, 0, 1);
  return clamp(
    phiWeights.phi1 * fuelCostDelta + phiWeights.phi2 * powerBillDelta + phiWeights.phi3 * jobLossRisk + phiWeights.phi4 * lobbyResistance,
    0,
    1,
  );
}

function getStatus(point: SimulationPoint): Status {
  if (point.totalEmissions <= TARGET_2030_MT && point.householdBurden <= HOUSEHOLD_BURDEN_CAP) return 'ON TRACK';
  if (point.totalEmissions <= TARGET_2030_MT + 2.5 || point.zevShare < 0.35 || point.gridConstraintTriggered) return 'AT RISK';
  return 'OFF TRACK';
}

function stepEmissions(E: number, sector: Sector, controls: PolicyControls, state: ModelState) {
  const abatementRate = computeAbatement(sector, controls, state);
  const growthPressure = computeGrowthPressure(sector, state);
  return Math.max(0, E - abatementRate + growthPressure);
}

export function runSimulation(controls: PolicyControls, phiWeights: PhiWeights = DEFAULT_PHI_WEIGHTS): SimulationPoint[] {
  let current: ModelState = {
    year: 2025,
    emissions: { ...initialSectorEmissions },
    totalEmissions: Object.values(initialSectorEmissions).reduce((sum, value) => sum + value, 0),
    zevShare: 0.23,
    cleanCapital: { transport: 0.28, industry: 0.22, buildings: 0.18 },
    dirtyCapital: { transport: 0.72, industry: 0.78, buildings: 0.82 },
    householdBurden: NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH / BC_AVG_HOUSEHOLD_SPENDING_2023,
    policyCred: 0.62,
    onTrack2030: false,
    electricityDemandGrowth: 0,
    dualFuelAdoption: 0.22,
    pulpPaperEmissions: BASELINE_EMISSIONS_MT * PULP_PAPER_SHARE_OF_PROVINCIAL * 0.6,
  };

  return MODEL_YEARS.map((year) => {
    const electricityDemandGrowth = computeElectricityDemandGrowth(controls, year);
    const zevShare = stepZEVShare(current.zevShare, controls.zevSupport, year);
    const dualFuelAdoption = clamp(0.12 + controls.dualFuelPolicy * 0.58 + (year >= 2028 ? 0.04 : 0), 0, 1);
    const policyCred = clamp(0.72 - 0.22 * Math.max(0, controls.carbonPrice - 150) / 100 - 0.18 * Math.max(0, 0.45 - controls.householdRelief) + 0.12 * controls.gridExpansionSupport, 0, 1);

    const stagedState: ModelState = {
      ...current,
      year,
      zevShare,
      dualFuelAdoption,
      electricityDemandGrowth,
      policyCred,
    };

    const emissions = {
      transport: stepEmissions(current.emissions.transport, 'transport', controls, stagedState),
      industry: stepEmissions(current.emissions.industry, 'industry', controls, stagedState),
      buildings: stepEmissions(current.emissions.buildings, 'buildings', controls, stagedState),
    };
    const totalEmissions = emissions.transport + emissions.industry + emissions.buildings;
    const cleanCapital = {
      transport: clamp(current.cleanCapital.transport + controls.zevSupport * 0.09, 0, 1),
      industry: clamp(current.cleanCapital.industry + controls.industrySupport * 0.08 + controls.gridExpansionSupport * 0.03, 0, 1),
      buildings: clamp(current.cleanCapital.buildings + controls.buildingsSupport * 0.08 + controls.regulatoryStringency * 0.04, 0, 1),
    };
    const dirtyCapital = {
      transport: clamp(1 - cleanCapital.transport, 0, 1),
      industry: clamp(1 - cleanCapital.industry, 0, 1),
      buildings: clamp(1 - cleanCapital.buildings, 0, 1),
    };
    const householdBurden = clamp(
      NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH / BC_AVG_HOUSEHOLD_SPENDING_2023 + controls.carbonPrice / 1000 + electricityDemandGrowth * 0.22 - controls.householdRelief * 0.18,
      0,
      1,
    );
    const pulpPaperEmissions = emissions.industry * (PULP_PAPER_SHARE_OF_PROVINCIAL / SECTOR_SHARES_2023.industry) * (1 - controls.industrySupport * 0.1);
    const gridConstraint = computeGridConstraint(controls, stagedState, year);
    const onTrack2030 = totalEmissions <= TARGET_2030_MT;
    const political = politicalCost(controls, { ...stagedState, emissions, totalEmissions, cleanCapital, dirtyCapital, householdBurden, pulpPaperEmissions, onTrack2030 }, phiWeights);

    const point: SimulationPoint = {
      year,
      emissions,
      totalEmissions,
      zevShare,
      cleanCapital,
      dirtyCapital,
      householdBurden,
      policyCred,
      onTrack2030,
      electricityDemandGrowth,
      dualFuelAdoption,
      pulpPaperEmissions,
      politicalCost: political,
      gridConstraintTriggered: gridConstraint.constrained,
      target2030: TARGET_2030_MT,
      target2025: TARGET_2025_MT,
      status: 'AT RISK',
    };

    point.status = getStatus(point);
    current = point;
    return point;
  });
}

export function createScenarioRun(id: string, label: string, description: string, controls: PolicyControls, phiWeights: PhiWeights = DEFAULT_PHI_WEIGHTS): ScenarioRun {
  return {
    id,
    label,
    description,
    controls,
    phiWeights,
    results: runSimulation(controls, phiWeights),
  };
}
