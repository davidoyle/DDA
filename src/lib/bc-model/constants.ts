import type { PhiWeights } from './types';

export const BASELINE_YEAR = 2007;
export const BASELINE_EMISSIONS_MT = 102;
export const EMISSIONS_2023_MT = 61.1;
export const EMISSIONS_2023_NIR_MT = 60;
export const EMISSIONS_2023_NET_MT = 59.2;
export const TARGET_2030_RATIO = 0.6;
export const TARGET_2025_RATIO = 0.84;
export const TARGET_2030_MT = 61.0;
export const TARGET_2025_MT = 85.7;
export const MODEL_YEARS = [2026, 2027, 2028, 2029, 2030] as const;
export const HOUSEHOLD_BURDEN_CAP = 0.72;

export const SECTOR_SHARES_2023 = {
  transport: 0.41,
  industry: 0.308,
  buildings: 0.282,
} as const;

export const PULP_PAPER_SHARE_OF_PROVINCIAL = 0.172;
export const LARGE_EMITTERS_2023_MT = 18.84;
export const OIL_GAS_METHANE_2023_MT = 1.45;
export const CLEANBC_INDUSTRY_FUND_PROJECTS_2024 = 37;
export const CLEANBC_INDUSTRY_FUND_2024_M = 191;
export const CLEANBC_INDUSTRY_FUND_CUMULATIVE_ABATEMENT_MT = 14.4;

export const BCHYDRO_RESIDENTIAL_GWH_2024 = 19345;
export const BCHYDRO_LIGHT_INDUSTRIAL_COMMERCIAL_GWH_2024 = 19319;
export const BCHYDRO_LARGE_INDUSTRIAL_GWH_2024 = 14482;
export const BCHYDRO_NEW_CI_LOAD_MW_CUMULATIVE = 1518;
export const BCHYDRO_ELECTRIFICATION_HOUSEHOLDS = 268544;
export const ELECTRICITY_DEMAND_GROWTH_BY_2030 = 0.15;
export const NEW_CLEAN_GENERATION_GWH_PER_YEAR = 3000;
export const ELECTRIFICATION_NEW_LOAD_MW = 114;

export const EV_AVOIDED_EMISSIONS_MT_BY_2050 = 5.1;
export const ZERO_CARBON_STEP_CODE_MT_BY_2050 = 0.6;
export const GAS_PIPELINE_PROCESSING_MT_BY_2050 = 1.6;
export const DUAL_FUEL_PEAK_REDUCTION_VS_ALL_ELECTRIC = 0.75;
export const DUAL_FUEL_REGIONAL_DISCOUNT = 0.85;

export const ZEV_ANCHORS = {
  2026: 0.26,
  2030: 0.9,
  2035: 1,
} as const;

export const BC_AVG_HOUSEHOLD_SPENDING_2023 = 82657;
export const NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH = 2914;
export const LOWEST_QUINTILE_SHELTER_SHARE = 0.348;
export const HIGHEST_QUINTILE_SHELTER_SHARE = 0.322;
export const BC_SHELTER_SPENDING_GROWTH_2021_2023 = 0.169;
export const FORTIS_RATE_INCREASE_2026 = 0.0363;
export const FORTIS_AVG_MONTHLY_IMPACT = 5.35;
export const FORTIS_ENERGY_RATE_KWH = 0.15503;
export const FORTIS_BIMONTHLY_CUSTOMER_CHARGE = 49.58;
export const CARBON_REBATE_END = 'April 2025';

export const DEFAULT_PHI_WEIGHTS: PhiWeights = {
  phi1: 0.35,
  phi2: 0.2,
  phi3: 0.3,
  phi4: 0.15,
};

export const SOURCE_LINKS = {
  accountability: 'https://www2.gov.bc.ca/assets/gov/environment/climate-change/action/accountability-progress-reports/2025_climate_change_accountability_report.pdf',
  roadmap: 'https://cleanbc.gov.bc.ca/cleanbc-roadmap-to-2030/',
  irp: 'https://www.bchydro.com/toolbar/about/planning-for-our-future/integrated-resource-plan.html',
  servicePlan: 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/documents/about/accountability-reports-plans/service-plan/2024-25-bc-hydro-service-plan.pdf',
  statcan: 'https://www150.statcan.gc.ca/',
  fortis: 'https://www.fortisbc.com/about-us/newsroom',
  climateAct: 'https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/08042_01',
};

export const FLAGGED_DATA_GAPS = [
  'BC-specific household energy burden by income quintile remains unavailable; national shelter shares are used as a proxy.',
  'Pulp and paper is anchored, but other industrial sub-sectors such as LNG and cement remain uncalibrated.',
  'BC rural versus urban vehicle-kilometre split is not available at useful provincial detail.',
  'Lobby resistance remains a latent scenario parameter rather than an observed metric.',
  'Building stock heating mix, retrofit cycles, and FortisBC stranded asset exposure are still uncertainty notes.',
];
