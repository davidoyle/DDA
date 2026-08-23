import type { JurisdictionBenchmark } from './types';
export const JURISDICTIONS: JurisdictionBenchmark[] = [
  { id: 'bc', name: 'British Columbia', govTakeLow: 0.25, govTakeBase: 0.33, govTakeHigh: 0.43, effectiveCITRate: 0.27, royaltyType: 'Price-sensitive net revenue royalty', carbonPrice: 170, constructionCostIndex: 100, classification: 'ACTUAL', source: 'Modelled from BC public fiscal parameters' },
  { id: 'qld', name: 'Queensland Australia', govTakeLow: 0.35, govTakeBase: 0.45, govTakeHigh: 0.55, effectiveCITRate: 0.30, royaltyType: 'State royalty + federal CIT', carbonPrice: 0, constructionCostIndex: 122, classification: 'FLAG', source: 'FLAG gov take; actual CIT; proxy construction index' },
  { id: 'usgc', name: 'U.S. Gulf Coast', govTakeLow: 0.18, govTakeBase: 0.24, govTakeHigh: 0.30, effectiveCITRate: 0.24, royaltyType: 'Lease/fiscal mix', carbonPrice: 0, constructionCostIndex: 87, classification: 'FLAG', source: 'FLAG gov take; proxy construction index' },
  { id: 'qatar', name: 'Qatar', govTakeLow: 0.45, govTakeBase: 0.60, govTakeHigh: 0.70, effectiveCITRate: 0, royaltyType: 'PSC / state participation proxy', carbonPrice: 0, constructionCostIndex: 78, classification: 'FLAG', source: 'FLAG gov take; proxy construction index' },
];
export const computeGovernmentTake = (totalGovRevenue: number, totalProjectRevenue: number) => totalProjectRevenue > 0 ? totalGovRevenue / totalProjectRevenue : 0;
