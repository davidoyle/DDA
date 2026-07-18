import { useMemo, useState } from 'react';
import type { DBState } from '../types';
import { daysOpen, engagementName, escalated } from '../utils';

const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 } as const;

export default function Command({ state, onViewFlags }: { state: DBState; onViewFlags: () => void }) {
  const [filterEngId, setFilterEngId] = useState<string | null>(null);
  const next14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i);
    return d.toISOString().slice(0, 10);
  });
  const events = filterEngId ? state.events.filter((e) => e.engagement_id === filterEngId) : state.events;
  const flags = useMemo(() => state.flags
    .filter((f) => f.status === 'open' && (!filterEngId || f.engagement_id === filterEngId))
    .sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority] || daysOpen(b.opened_date) - daysOpen(a.opened_date))
    .slice(0, 5), [state.flags, filterEngId]);

  return <>
    <div className='ecc-card'>
      {!state.engagements.length ? <div className='ecc-empty'>No active engagements.</div> : <div className='ecc-grid'>
        {state.engagements.map((e) => <button key={e.id} className='ecc-card ecc-btn' onClick={() => setFilterEngId(filterEngId === e.id ? null : e.id)}>
          <div><b>{e.name}</b></div><div>{e.client_name}</div><div>{e.phase}</div><progress value={e.completion_pct} max={100} />
        </button>)}
      </div>}
    </div>
    <div className='ecc-card'><h4>14-Day Calendar Strip</h4><div className='ecc-grid'>{next14.map((d) => <div className='ecc-card' key={d}><div>{d}</div>{events.filter((e) => e.start_datetime.slice(0, 10) === d).map((e) => <div key={e.id}>{e.title}</div>)}</div>)}</div></div>
    <div className='ecc-card'><h4>Top FLAGs</h4>{flags.map((f) => <div key={f.id}>{f.title} | {engagementName(f.engagement_id, state)} | {f.priority} | {f.owner} | {daysOpen(f.opened_date)}d {escalated(f) ? 'ESCALATED' : ''}</div>)}<button className='ecc-btn' onClick={onViewFlags}>View All FLAGs</button></div>
  </>;
}
