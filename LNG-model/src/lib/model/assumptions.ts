import type { Assumption, AssumptionRegister } from './types';

const actual = (id: string, label: string, value: number | string, unit: string, source: string, sourceDate: string): Assumption => ({ id, label, value, flagDefault: value, flagDefaultBasis: 'Confirmed public value; no proxy default required.', unit, classification: 'ACTUAL', source, sourceDate, reviewFlag: false });
const flag = (id: string, label: string, flagDefault: number | string, unit: string, basis: string, source = 'Flag default register', sourceDate = '2026-05-07'): Assumption => ({ id, label, value: null, flagDefault, flagDefaultBasis: basis, unit, classification: 'FLAG', source, sourceDate, reviewFlag: true });

export const BASE_ASSUMPTIONS: AssumptionRegister = {
  'price.bcPlantInlet.base': actual('price.bcPlantInlet.base', 'BC plant inlet price base', 2.18, 'C$/GJ', 'BC Budget Feb 17 2026', '2026-02-17'),
  'price.bcPlantInlet.low': actual('price.bcPlantInlet.low', 'BC plant inlet price low', 1.22, 'C$/GJ', 'BC Budget Feb 17 2026', '2026-02-17'),
  'price.bcPlantInlet.high': actual('price.bcPlantInlet.high', 'BC plant inlet price high', 2.82, 'C$/GJ', 'BC Budget Feb 17 2026', '2026-02-17'),
  'royalty.transitionalRate': actual('royalty.transitionalRate', 'Royalty transitional rate', 0.05, 'decimal', 'BC Gov Jan 16 2026', '2026-01-16'),
  'royalty.minRate': actual('royalty.minRate', 'Royalty minimum rate', 0.05, 'decimal', 'BC Gov Jan 16 2026', '2026-01-16'),
  'royalty.maxRate': actual('royalty.maxRate', 'Royalty maximum rate', 0.40, 'decimal', 'BC Gov Jan 16 2026', '2026-01-16'),
  'royalty.transitionDate': actual('royalty.transitionDate', 'Royalty transition date', '2027-01-01', 'ISO', 'BC Gov Jan 16 2026', '2026-01-16'),
  'tax.federalCIT': actual('tax.federalCIT', 'Federal CIT rate', 0.15, 'decimal', 'Income Tax Act', '2026-05-07'),
  'tax.bcCIT': actual('tax.bcCIT', 'BC CIT rate', 0.12, 'decimal', 'BC CIT Act', '2026-05-07'),
  'tax.bcPST': actual('tax.bcPST', 'BC PST rate', 0.07, 'decimal', 'BC PST Act', '2026-05-07'),
  'tax.consumerCarbonPrice': actual('tax.consumerCarbonPrice', 'Consumer carbon price', 0, 'C$/tonne', 'BC Gov News Apr 1 2025', '2025-04-01'),
  'tax.ccaClass2': actual('tax.ccaClass2', 'CCA Class 2', 0.06, 'decimal DB', 'CRA', '2026-05-07'),
  'tax.ccaClass43': actual('tax.ccaClass43', 'CCA Class 43', 0.30, 'decimal DB', 'CRA', '2026-05-07'),
  'tax.ccusTCRateLow': actual('tax.ccusTCRateLow', 'CCUS tax credit low', 0.375, 'decimal', 'Federal Budget 2023', '2023-03-28'),
  'tax.obps.2026': actual('tax.obps.2026', 'OBPS 2026 price', 110, 'C$/tCO2e', 'ECCC Feb 6 2026', '2026-02-06'),
  'tax.obps.2027': actual('tax.obps.2027', 'OBPS 2027 price', 125, 'C$/tCO2e', 'ECCC Feb 6 2026', '2026-02-06'),
  'tax.obps.2028': actual('tax.obps.2028', 'OBPS 2028 price', 140, 'C$/tCO2e', 'ECCC Feb 6 2026', '2026-02-06'),
  'tax.obps.2029': actual('tax.obps.2029', 'OBPS 2029 price', 155, 'C$/tCO2e', 'ECCC Feb 6 2026', '2026-02-06'),
  'tax.obps.2030': actual('tax.obps.2030', 'OBPS 2030 price', 170, 'C$/tCO2e', 'ECCC Feb 6 2026', '2026-02-06'),
  'macro.bocRate': actual('macro.bocRate', 'Bank of Canada rate', 0.0225, 'decimal', 'Bank of Canada Apr 29 2026', '2026-04-29'),
  'infra.cglCapacityInitial': actual('infra.cglCapacityInitial', 'CGL initial capacity', 2.1, 'Bcf/d', 'CER Mar 26 2026', '2026-03-26'),
  'infra.cglCapacityExpandable': actual('infra.cglCapacityExpandable', 'CGL expandable capacity', 5.0, 'Bcf/d', 'CER Mar 26 2026', '2026-03-26'),
  'infra.westGateThroughput2024': actual('infra.westGateThroughput2024', 'West Gate throughput 2024', 2.62, 'Bcf/d', 'CER Nov 19 2025', '2025-11-19'),
  'infra.westGateCapacity2024': actual('infra.westGateCapacity2024', 'West Gate capacity 2024', 3.10, 'Bcf/d', 'CER Nov 19 2025', '2025-11-19'),
  'infra.jamesRiverThroughput2024': actual('infra.jamesRiverThroughput2024', 'James River throughput 2024', 11.76, 'Bcf/d', 'CER Nov 19 2025', '2025-11-19'),
  'infra.jamesRiverCapacity2024': actual('infra.jamesRiverCapacity2024', 'James River capacity 2024', 13.50, 'Bcf/d', 'CER Nov 19 2025', '2025-11-19'),
  'utility.rs1830EnergyCharge': actual('utility.rs1830EnergyCharge', 'RS 1830 energy charge', 4.914, 'cents/kWh', 'BC Hydro Tariff Apr 1 2026', '2026-04-01'),
  'utility.rs1830DemandCharge': actual('utility.rs1830DemandCharge', 'RS 1830 demand charge', 12.178, '$/kVA/period', 'BC Hydro Tariff Apr 1 2026', '2026-04-01'),
  'revenue.royalty.2526': actual('revenue.royalty.2526', 'Royalty revenue 2025/26', 942, 'C$M', 'BC Budget Table A5 Feb 17 2026', '2026-02-17'),
  'revenue.royalty.2627': actual('revenue.royalty.2627', 'Royalty revenue 2026/27', 1297, 'C$M', 'BC Budget Table A5 Feb 17 2026', '2026-02-17'),
  'revenue.royalty.2728': actual('revenue.royalty.2728', 'Royalty revenue 2027/28', 1305, 'C$M', 'BC Budget Table A5 Feb 17 2026', '2026-02-17'),
  'revenue.royalty.2829': actual('revenue.royalty.2829', 'Royalty revenue 2028/29', 1572, 'C$M', 'BC Budget Table A5 Feb 17 2026', '2026-02-17'),
  'reserves.montneyRemaining': actual('reserves.montneyRemaining', 'Montney remaining reserves', 95.5, 'Tcf', 'BCER 2024 Report', '2024-12-31'),
  'emissions.bcGross2023': actual('emissions.bcGross2023', 'BC gross emissions 2023', 61.1, 'MtCO2e', 'BC GHG Inventory Dec 3 2025', '2025-12-03'),
  'emissions.bc2030Target': actual('emissions.bc2030Target', 'BC 2030 target', 39.12, 'MtCO2e', 'CleanBC derived', '2026-05-07'),
  'emissions.bc2023GapTo2030': actual('emissions.bc2023GapTo2030', 'BC 2023 gap to 2030', 21.98, 'MtCO2e', 'Derived 61.1 − 39.12', '2026-05-07'),
  'royalty.thresholdLow': flag('royalty.thresholdLow', 'Royalty low threshold', 1.50, 'C$/GJ', 'Midpoint of BC Budget price band $1.22–$2.18/GJ'),
  'royalty.thresholdHigh': flag('royalty.thresholdHigh', 'Royalty high threshold', 3.50, 'C$/GJ', 'Above BC Budget high-case ceiling with margin'),
  'macro.wacc': flag('macro.wacc', 'Weighted average cost of capital', 0.10, 'decimal', 'LNG sector WACC range 8–12%; conservative midpoint'),
  'macro.socialDiscountRate': flag('macro.socialDiscountRate', 'Social discount rate', 0.07, 'decimal', 'BC BCA Guidebook reference rate'),
  'macro.inflation': flag('macro.inflation', 'Inflation', 0.025, 'decimal', 'Bank of Canada 2% target + 50bp buffer'),
  'price.jkm.base': flag('price.jkm.base', 'JKM LNG price base', 14.00, 'US$/MMBtu', 'CER LNG market snapshot proxy (US$/MMBtu)'),
  'price.henryHub.base': flag('price.henryHub.base', 'Henry Hub price base', 3.50, 'US$/MMBtu', 'EIA STEO midpoint proxy (US$/MMBtu)'),
  'price.cadUsd': flag('price.cadUsd', 'CAD/USD exchange rate', 0.73, 'CAD/USD', 'Bank of Canada trailing average'),
  'tax.ccaLNGFacility': flag('tax.ccaLNGFacility', 'CCA LNG facility', 0.30, 'decimal DB', 'Class 43 rate applied pending CRA confirmation'),
  'infra.pipelineToll': flag('infra.pipelineToll', 'Pipeline toll', 0.50, 'C$/GJ', 'Public NGTL tariff range proxy (C$/GJ)'),
  'upstream.wellCapex': flag('upstream.wellCapex', 'Well capex', 8.0, 'C$M/well', 'Montney type-well industry range midpoint (C$M/well)'),
  'upstream.wellOpex': flag('upstream.wellOpex', 'Well opex', 0.35, 'C$/GJ', 'Montney lifting cost range midpoint (C$/GJ)'),
};

export const P1_FLAG_IDS = ['royalty.thresholdLow', 'royalty.thresholdHigh', 'macro.wacc', 'macro.socialDiscountRate', 'price.jkm.base', 'tax.ccaLNGFacility'];
export const P2_FLAG_IDS = ['price.henryHub.base', 'price.cadUsd', 'infra.pipelineToll', 'upstream.wellCapex', 'upstream.wellOpex', 'macro.inflation'];
export const FLAG_COUNT = Object.values(BASE_ASSUMPTIONS).filter((a) => a.classification === 'FLAG').length;
export const ACTUAL_COUNT = Object.values(BASE_ASSUMPTIONS).filter((a) => a.classification === 'ACTUAL').length;
export const PROXY_COUNT = Object.values(BASE_ASSUMPTIONS).filter((a) => a.classification === 'PROXY').length;

export function resolve(register: AssumptionRegister, id: string): number | string {
  const assumption = register[id] ?? BASE_ASSUMPTIONS[id];
  if (!assumption) throw new Error(`Unknown model assumption: ${id}`);
  return assumption.value === null ? assumption.flagDefault : assumption.value;
}

export function resolveAll(register: AssumptionRegister, ids: string[]) {
  const values: Record<string, number | string> = {};
  const flagsUsed: string[] = [];
  ids.forEach((id) => {
    const assumption = register[id] ?? BASE_ASSUMPTIONS[id];
    values[id] = resolve(register, id);
    if (assumption?.value === null || assumption?.classification === 'FLAG') flagsUsed.push(id);
  });
  return { values, flagsUsed: [...new Set(flagsUsed)], allActual: flagsUsed.length === 0 };
}
