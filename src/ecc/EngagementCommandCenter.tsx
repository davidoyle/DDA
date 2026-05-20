import { useEffect, useMemo, useState } from 'react';
import './EngagementCommandCenter.css';
import { applySequence } from './operations';
import { AUTH_KEY, EMPTY_STATE, useStore } from './store';
import type { DBState, ModuleKey } from './types';
import { deliverableStale, today } from './utils';

export default function EngagementCommandCenter() {
  const { state, dispatch } = useStore();
  const [authed, setAuthed] = useState(localStorage.getItem(AUTH_KEY) === 'true');
  const [module, setModule] = useState<ModuleKey>('command');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [ops, setOps] = useState('[]');
  const [consoleOut, setConsoleOut] = useState<string[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 3000); return () => clearTimeout(t); }, [toast]);

  const badges = useMemo(() => ({
    flags: state.flags.filter((f) => f.status === 'open').length,
    documents: state.deliverables.filter((d) => deliverableStale(d, state.evidence)).length,
    finance: state.finance.flatMap((f) => f.invoices).filter((i) => !i.paid_date && i.due_date < today()).length,
    contracts: state.contracts.filter((c) => !c.clauses.termination_for_cause || !c.clauses.mutual_indemnity || !c.clauses.mandatory_mediation).length,
  }), [state]);

  const runSequence = (dry: boolean) => {
    const result = applySequence(ops, state, dry);
    setConsoleOut(result.error ? [...result.output, `ERROR: ${result.error}`] : result.output);
    if (!dry && !result.error) {
      dispatch({ type: 'SET', payload: result.next });
      setConsoleOpen(false);
      setToast('Update applied');
    }
  };

  const importBackup = async (file: File) => {
    try {
      const parsed = JSON.parse(await file.text()) as Partial<DBState>;
      if (!confirm('Replace current data?')) return;
      dispatch({ type: 'SET', payload: { ...EMPTY_STATE, ...parsed } });
      setToast('Backup imported');
    } catch {
      setToast('Invalid JSON file');
    }
  };

  if (!authed) return <div className='ecc-root'><div className='ecc-login'><h1>DDA</h1><input className='ecc-input' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username'/><input className='ecc-input' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/><button className='ecc-btn' onClick={()=>{if(username==='DDA'&&password==='daviddoyle'){localStorage.setItem(AUTH_KEY,'true');setAuthed(true);setError('');}else setError('Invalid credentials');}}>Enter</button>{error && <div>{error}</div>}</div></div>;

  return <div className='ecc-root'><div className='ecc-shell'><div className='ecc-header'><strong>DDA Engagement Command Center</strong><div><button className='ecc-btn' onClick={()=>setConsoleOpen(true)}>&gt;_</button><button className='ecc-btn' onClick={()=>setSettingsOpen(true)}>⚙</button><button className='ecc-btn' onClick={()=>{localStorage.removeItem(AUTH_KEY); setAuthed(false);}}>Logout</button></div></div><div className='ecc-body'><aside className='ecc-rail'>{(['command','calendar','flags','documents','evidence','finance','contracts','stakeholders'] as ModuleKey[]).map((m)=><button key={m} className='ecc-btn ecc-nav' onClick={()=>setModule(m)}>{m}{m==='flags'?` (${badges.flags})`:''}{m==='documents'?` (${badges.documents})`:''}{m==='finance'?` (${badges.finance})`:''}{m==='contracts'?` (${badges.contracts})`:''}</button>)}</aside><main className='ecc-main'><div className='ecc-card'><h3>{module}</h3><pre className='ecc-mono'>{JSON.stringify(module==='command'?state.engagements:module==='calendar'?state.events:module==='flags'?state.flags:module==='documents'?state.deliverables:module==='evidence'?state.evidence:module==='finance'?state.finance:module==='contracts'?state.contracts:state.stakeholders, null, 2)}</pre></div></main></div></div>
  {consoleOpen && <div className='ecc-modal'><div className='ecc-modal-panel'><h3>Update Console</h3><textarea className='ecc-textarea ecc-mono' value={ops} onChange={(e)=>setOps(e.target.value)} /><button className='ecc-btn' onClick={()=>runSequence(true)}>Preview</button><button className='ecc-btn' onClick={()=>runSequence(false)}>Apply</button><button className='ecc-btn' onClick={()=>setConsoleOpen(false)}>Cancel</button><div className='ecc-mono'>{consoleOut.map((line,i)=><div key={i}>{line}</div>)}</div></div></div>}
  {settingsOpen && <div className='ecc-drawer'><h3>Settings</h3><button className='ecc-btn' onClick={()=>{if(confirm('Clear all data?')) dispatch({type:'SET',payload:EMPTY_STATE});}}>Clear All Data</button><button className='ecc-btn' onClick={()=>{const b = new Blob([JSON.stringify(state,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=`dda_backup_${today()}.json`; a.click();}}>Export</button><input type='file' onChange={(e)=>{const f=e.target.files?.[0]; if(f) void importBackup(f);}}/><button className='ecc-btn' onClick={()=>setSettingsOpen(false)}>Close</button></div>}
  {toast && <div className='ecc-toast'>{toast}</div>}
  </div>;
}
