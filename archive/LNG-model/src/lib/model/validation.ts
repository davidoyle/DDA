import { BASE_ASSUMPTIONS, P1_FLAG_IDS, P2_FLAG_IDS } from './assumptions';
import type { AssumptionRegister } from './types';

export type WarningLevel = 'NONE' | 'CAUTION' | 'ESTIMATED';
export interface ValidationResult { flagsUsed: string[]; p1FlagsUsed: string[]; p2FlagsUsed: string[]; allActual: boolean; warningLevel: WarningLevel; }

export function validateOutput(register: AssumptionRegister = BASE_ASSUMPTIONS, flagsUsed: string[] = []): ValidationResult {
  const unique = [...new Set(flagsUsed)].filter((id) => register[id] || BASE_ASSUMPTIONS[id] || id === 'royalty.existingRateTable');
  const p1FlagsUsed = unique.filter((id) => P1_FLAG_IDS.includes(id));
  const p2FlagsUsed = unique.filter((id) => P2_FLAG_IDS.includes(id));
  const warningLevel: WarningLevel = unique.length === 0 ? 'NONE' : p1FlagsUsed.length > 0 ? 'ESTIMATED' : 'CAUTION';
  return { flagsUsed: unique, p1FlagsUsed, p2FlagsUsed, allActual: unique.length === 0, warningLevel };
}
