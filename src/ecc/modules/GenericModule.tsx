import type { DBState } from '../types';
import { deliverableStale, escalated, today } from '../utils';

export default function GenericModule({ state, module }: { state: DBState; module: 'calendar'|'flags'|'documents'|'evidence'|'finance'|'contracts'|'stakeholders' }) {
  if (module === 'calendar') {
    return <div className='ecc-card'><h3>Live Calendar</h3>{state.events.length===0?<div className='ecc-empty'>No scheduled events.</div>:state.events.map((e)=><div key={e.id} className='ecc-card'><b>{e.title}</b><div>{e.type}</div><div>{e.start_datetime} → {e.end_datetime}</div><div>{e.location}</div></div>)}</div>;
  }

  if (module === 'flags') {
    const sorted = [...state.flags].sort((a, b) => {
      const w = { critical: 4, high: 3, medium: 2, low: 1 } as const;
      return w[b.priority] - w[a.priority];
    });
    return <div className='ecc-card'><h3>FLAG Tracker</h3>{sorted.length===0?<div className='ecc-empty'>No open FLAGs.</div>:sorted.map((f)=><div key={f.id} className='ecc-card'><b>{f.title}</b> <span>{f.priority}</span> <span>{f.owner}</span> <span>{f.status}</span> {escalated(f)?<span className='ecc-badge'>ESCALATED</span>:null}<div>{f.resolution_path}</div></div>)}</div>;
  }

  if (module === 'documents') {
    return <div className='ecc-card'><h3>Document Engine</h3>{state.deliverables.length===0?<div className='ecc-empty'>No deliverables tracked.</div>:state.deliverables.map((d)=><div key={d.id} className='ecc-card'><b>{d.name}</b> <span>{d.phase}</span> <span>{d.status}</span> <span>v{d.version}</span> {deliverableStale(d,state.evidence)?<span className='ecc-badge'>STALE</span>:null} {d.due_date<today()&&d.status!=='delivered'?<span className='ecc-badge'>AT RISK</span>:null}<div>Due: {d.due_date}</div></div>)}</div>;
  }

  if (module === 'evidence') {
    return <div className='ecc-card'><h3>Evidence Register</h3>{state.evidence.length===0?<div className='ecc-empty'>No evidence entries.</div>:state.evidence.map((e)=><div key={e.id} className='ecc-card'><b>{e.metric}</b> <span>{e.value} {e.unit}</span><div>{e.geography} · {e.reference_year}</div><div>{e.classification} · {e.source}</div></div>)}</div>;
  }

  if (module === 'finance') {
    return <div className='ecc-card'><h3>Financial Module</h3>{state.finance.length===0?<div className='ecc-empty'>No financial records.</div>:state.finance.map((f)=>{const logged=f.logged_hours.reduce((a,b)=>a+b.hours,0); const invoiced=f.invoices.reduce((a,b)=>a+b.amount,0); const received=f.invoices.filter(i=>i.paid_date).reduce((a,b)=>a+b.amount,0); return <div key={f.id} className='ecc-card'><b>{state.engagements.find(e=>e.id===f.engagement_id)?.name||'Unknown'}</b><div>Budget: {f.budget_hours}h | Logged: {logged}h</div><div>Invoiced: ${invoiced} | Received: ${received} | Outstanding: ${invoiced-received}</div></div>;})}</div>;
  }

  if (module === 'contracts') {
    return <div className='ecc-card'><h3>Contracts</h3>{state.contracts.length===0?<div className='ecc-empty'>No contracts.</div>:state.contracts.map((c)=>{const weak=!c.clauses.termination_for_cause||!c.clauses.mutual_indemnity||!c.clauses.mandatory_mediation; return <div key={c.id} className='ecc-card'><b>{c.client_name}</b> <span>{c.status}</span> {weak?<span className='ecc-badge'>PROTECTION GAP</span>:null}<div>Expiry: {c.expiry_date||'n/a'}</div></div>;})}</div>;
  }

  return <div className='ecc-card'><h3>Stakeholders</h3>{state.stakeholders.length===0?<div className='ecc-empty'>No contacts.</div>:state.stakeholders.map((s)=><div key={s.id} className='ecc-card'><b>{s.name}</b> <span>{s.organization}</span><div>{s.role} · {s.email}</div><div>Interactions: {s.interaction_history.length}</div></div>)}</div>;
}
