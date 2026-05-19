import { useState } from 'react';
import AssumptionsPage from './AssumptionsPage';
import ChangeLogTable from '@/components/model/ChangeLogTable';
import { INITIAL_CHANGELOG } from '@/lib/model/changelog';
import { BASE_ASSUMPTIONS, P1_FLAG_IDS, P2_FLAG_IDS } from '@/lib/model/assumptions';
import { cn } from '@/lib/utils';

function FlagsChecklist() {
  const flags = Object.keys(BASE_ASSUMPTIONS).filter((id) => BASE_ASSUMPTIONS[id].classification === 'FLAG');
  const ordered = [...P1_FLAG_IDS, ...P2_FLAG_IDS, ...flags.filter((id) => !P1_FLAG_IDS.includes(id) && !P2_FLAG_IDS.includes(id))];
  return <div className="space-y-3">{ordered.map((id, index) => <div key={id} className="rounded-lg border bg-white p-4"><div className="flex gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#003366] text-sm font-bold text-white">{index + 1}</span><div><h3 className="font-semibold text-slate-900">{BASE_ASSUMPTIONS[id]?.label ?? id}</h3><p className="mt-1 text-sm text-slate-700">{index === 0 ? "Get the royalty price threshold schedule from the Ministry's internal royalty policy documentation. This unlocks the price-sensitive royalty calculation and removes the largest source of estimation error from all outputs." : 'Replace this public default with ministry-approved project evidence. The affected outputs will immediately move from estimated to confirmed status after the assumption is updated.'}</p><p className="mt-2 text-xs text-slate-500">Default: {String(BASE_ASSUMPTIONS[id]?.flagDefault)} {BASE_ASSUMPTIONS[id]?.unit}. Basis: {BASE_ASSUMPTIONS[id]?.flagDefaultBasis}</p></div></div></div>)}</div>;
}

export default function AuditView() {
  const [tab, setTab] = useState<'assumptions' | 'flags' | 'changelog'>('assumptions');
  const tabs = [{ id: 'assumptions', label: 'Assumptions' }, { id: 'flags', label: 'Flags' }, { id: 'changelog', label: 'Change Log' }] as const;
  return <div className="space-y-5"><div className="flex flex-wrap gap-2">{tabs.map((item) => <button key={item.id} type="button" onClick={() => setTab(item.id)} className={cn('rounded-full border px-4 py-2 text-sm font-semibold', tab === item.id ? 'border-[#003366] bg-[#003366] text-white' : 'border-slate-300 bg-white text-slate-700')}>{item.label}</button>)}</div>{tab === 'assumptions' && <AssumptionsPage />}{tab === 'flags' && <FlagsChecklist />}{tab === 'changelog' && <ChangeLogTable entries={INITIAL_CHANGELOG} />}</div>;
}
