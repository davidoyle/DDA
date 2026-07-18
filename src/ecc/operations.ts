import type { DBState, EvidenceEntry, Operation } from './types';
import { byName, isUUID, today, uuid } from './utils';

const COLLECTION: Record<string, keyof DBState> = { engagement: 'engagements', flag: 'flags', deliverable: 'deliverables', evidence: 'evidence', event: 'events', finance: 'finance', contract: 'contracts', stakeholder: 'stakeholders' };

export function applySequence(ops: string, state: DBState, dry: boolean): { next: DBState; output: string[]; error: string | null } {
  let seq: Operation[];
  try { seq = JSON.parse(ops) as Operation[]; } catch { return { next: state, output: [], error: 'Invalid JSON' }; }
  if (!Array.isArray(seq)) return { next: state, output: [], error: 'Ops must be array' };
  const s: DBState = JSON.parse(JSON.stringify(state));
  const output: string[] = [];

  for (const o of seq) {
    const arrKey = COLLECTION[o.target];
    if (!arrKey) return { next: state, output, error: `Unknown target ${o.target}` };
    let id = o.id;
    if (id && !isUUID(id)) {
      const resolved = byName(o.target, id, s);
      if ('err' in resolved) return { next: state, output, error: resolved.err };
      id = resolved.id;
      output.push(resolved.msg);
    }

    if (o.op === 'CREATE') { ((s[arrKey] as unknown) as Array<Record<string, unknown>>).push({ id: uuid(), ...o.fields }); output.push(`Created ${o.target}`); continue; }

    if (o.op === 'UPDATE') {
      const list = (s[arrKey] as unknown) as Array<Record<string, unknown>>;
      const i = list.findIndex((x) => x.id === id);
      if (i < 0) return { next: state, output, error: `Record not found ${o.target} ${id}` };
      list[i] = { ...list[i], ...o.fields };
      if ('last_updated' in list[i]) list[i].last_updated = today();
      if ('last_edited' in list[i]) list[i].last_edited = today();
      output.push(`Updated ${o.target} ${id}`);
      continue;
    }

    if (o.op === 'RESOLVE_FLAG') {
      const i = s.flags.findIndex((x) => x.id === id && x.status === 'open');
      if (i < 0) return { next: state, output, error: `Open flag not found ${id}` };
      s.flags[i] = { ...s.flags[i], status: 'resolved', resolved_date: today(), resolution_value: String(o.fields.resolution_value ?? '') };
      let evCount = 0; let delCount = 0;
      for (const ev of s.evidence.filter((e) => e.linked_flag_id === id)) {
        const old = ev.value;
        ev.value = String(o.fields.resolution_value ?? '');
        ev.classification = 'ACTUAL';
        ev.last_updated = today();
        ev.change_log.push({ date: today(), old_value: String(old), new_value: ev.value, reason: 'FLAG resolved' });
        evCount += 1;
        for (const d of s.deliverables.filter((d) => d.engagement_id === ev.engagement_id && d.evidence_ids.includes(ev.id))) { d.last_edited = '1970-01-01'; delCount += 1; }
      }
      output.push(`Resolved FLAG. Updated ${evCount} evidence entries. Marked ${delCount} deliverables stale.`);
      continue;
    }

    if (o.op === 'ADD_INTERACTION') {
      const i = s.stakeholders.findIndex((x) => x.id === id);
      if (i < 0) return { next: state, output, error: `Stakeholder not found ${id}` };
      const eid = String(o.fields.engagement_id ?? '');
      s.stakeholders[i].interaction_history.push((o.fields as unknown) as DBState['stakeholders'][number]['interaction_history'][number]);
      if (eid && !s.stakeholders[i].engagement_ids.includes(eid)) s.stakeholders[i].engagement_ids.push(eid);
      output.push('Added interaction');
      continue;
    }

    if (o.op === 'BULK_EVIDENCE') {
      let created = 0; let updated = 0; let stale = 0;
      const entries = (o.fields.entries as Array<Partial<EvidenceEntry>>) ?? [];
      for (const e of entries) {
        if (e.id) {
          const i = s.evidence.findIndex((x) => x.id === e.id);
          if (i >= 0) {
            const old = s.evidence[i].value;
            s.evidence[i] = { ...s.evidence[i], ...e, last_updated: today(), change_log: [...s.evidence[i].change_log, { date: today(), old_value: String(old), new_value: String(e.value ?? s.evidence[i].value), reason: String((e as { reason?: string }).reason ?? 'Bulk update') }] };
            updated += 1;
            for (const d of s.deliverables.filter((d) => d.engagement_id === s.evidence[i].engagement_id && d.evidence_ids.includes(s.evidence[i].id))) { d.last_edited = '1970-01-01'; stale += 1; }
          }
        } else {
          s.evidence.push({ id: uuid(), engagement_id: String(e.engagement_id ?? ''), metric: String(e.metric ?? ''), value: String(e.value ?? ''), unit: String(e.unit ?? ''), geography: String(e.geography ?? ''), reference_year: Number(e.reference_year ?? new Date().getFullYear()), classification: (e.classification ?? 'ASSUMPTION') as EvidenceEntry['classification'], source: String(e.source ?? ''), source_date: String(e.source_date ?? today()), derivation: String(e.derivation ?? ''), notes: String(e.notes ?? ''), resolution_path: String(e.resolution_path ?? ''), linked_flag_id: (e.linked_flag_id as string | null) ?? null, last_updated: today(), change_log: [] });
          created += 1;
        }
      }
      output.push(`Processed ${entries.length} evidence entries: ${created} created, ${updated} updated, ${stale} deliverables marked stale.`);
      continue;
    }

    return { next: state, output, error: `Unknown operation type: ${o.op}` };
  }

  return { next: dry ? state : s, output, error: null };
}
