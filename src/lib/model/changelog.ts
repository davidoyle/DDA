import type { ChangeLogEntry } from './types';
export const INITIAL_CHANGELOG: ChangeLogEntry[] = [{ version: 1.0, date: '2026-05-16', modulesAffected: ['All modules'], description: 'Initial B.C. Energy Fiscal Decision Model build.', reason: 'Create transparent public-assumption fiscal analysis tool.', sourceOrAuthority: 'DDA GS27MAN0002', ministryApproval: 'PENDING' }];
export function appendEntry(log: ChangeLogEntry[], entry: Omit<ChangeLogEntry, 'version'> | ChangeLogEntry): ChangeLogEntry[] {
  const nextVersion = Math.round(((Math.max(...log.map((e) => e.version), 0) + 0.1) * 10)) / 10;
  return [...log, { ...entry, version: nextVersion }];
}
