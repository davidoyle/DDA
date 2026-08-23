import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ChangeLogTable from '@/components/model/ChangeLogTable';
import FlagResolutionPanel from '@/components/model/FlagResolutionPanel';
import { appendEntry, INITIAL_CHANGELOG } from '@/lib/model/changelog';
import type { ChangeLogEntry } from '@/lib/model/types';
import { Page } from './shared';
export default function AuditPage() { const [log, setLog] = useState<ChangeLogEntry[]>(INITIAL_CHANGELOG); return <Page title="Module 12 — Audit"><Tabs.Root defaultValue="log"><Tabs.List className="mb-4 flex gap-2"><Tabs.Trigger className="rounded border bg-white px-3 py-2" value="log">Change Log</Tabs.Trigger><Tabs.Trigger className="rounded border bg-white px-3 py-2" value="flags">Flag Resolution</Tabs.Trigger></Tabs.List><Tabs.Content value="log" className="space-y-4"><button className="rounded bg-[#003366] px-4 py-2 text-white" onClick={() => setLog((l) => appendEntry(l, { date: new Date().toISOString().slice(0,10), modulesAffected: ['Module 12'], description: 'Append-only audit note', reason: 'User added change-log entry from audit module.', sourceOrAuthority: 'DDA operator', ministryApproval: 'NOTED' }))}>Add entry</button><ChangeLogTable entries={log} /></Tabs.Content><Tabs.Content value="flags"><FlagResolutionPanel /></Tabs.Content></Tabs.Root></Page>; }
