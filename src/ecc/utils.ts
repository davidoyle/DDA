import type { DBState, Deliverable, EvidenceEntry, Flag } from './types';
export const uuid = (): string => crypto.randomUUID();
export const today = (): string => new Date().toISOString().slice(0, 10);
export const isUUID = (v: string): boolean => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export const daysOpen = (d: string): number => Math.max(0, Math.floor((Date.now() - new Date(d).getTime()) / 86400000));
export const escalated = (f: Flag): boolean => f.status === 'open' && daysOpen(f.opened_date) > 30;
export const engagementName = (id: string, s: DBState): string => s.engagements.find((e) => e.id === id)?.name ?? 'Unknown';
export const deliverableStale = (d: Deliverable, evidence: EvidenceEntry[]): boolean => d.evidence_ids.some((eid) => (evidence.find((x) => x.id === eid)?.last_updated ?? '') > d.last_edited);
export const byName = (target: string, name: string, s: DBState): { id: string; msg: string } | { err: string } => {
  const map: Record<string, [keyof DBState, string]> = { engagement: ['engagements', 'name'], flag: ['flags', 'title'], deliverable: ['deliverables', 'name'], stakeholder: ['stakeholders', 'name'], evidence: ['evidence', 'metric'] };
  const entry = map[target];
  if (!entry) return { err: `Name resolution not supported for target: ${target}. Use UUID.` };
  const [k, f] = entry;
  const hits = ((s[k] as unknown) as Array<Record<string, string>>).filter((r) => (r[f] ?? '').toLowerCase().includes(name.toLowerCase()));
  if (hits.length === 1) return { id: hits[0].id, msg: `Resolved '${name}' → ${hits[0].id}` };
  if (!hits.length) return { err: `No match for '${name}' in ${target}` };
  return { err: `Ambiguous '${name}': matched ${hits.map((h) => `'${h[f]}'`).join(', ')}` };
};
