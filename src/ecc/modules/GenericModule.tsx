import type { DBState, ModuleKey } from '../types';

export default function GenericModule({ state, module }: { state: DBState; module: Exclude<ModuleKey, 'command'> }) {
  const data = module === 'calendar' ? state.events
    : module === 'flags' ? state.flags
    : module === 'documents' ? state.deliverables
    : module === 'evidence' ? state.evidence
    : module === 'finance' ? state.finance
    : module === 'contracts' ? state.contracts
    : state.stakeholders;

  return <div className='ecc-card'><h3>{module}</h3>{data.length === 0 ? <div className='ecc-empty'>No records yet.</div> : <pre className='ecc-mono'>{JSON.stringify(data, null, 2)}</pre>}</div>;
}
