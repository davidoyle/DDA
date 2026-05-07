import { useState } from 'react';
import { ACTUAL_COUNT, BASE_ASSUMPTIONS, FLAG_COUNT, PROXY_COUNT } from '@/lib/model/assumptions';
import AssumptionCell from '@/components/model/AssumptionCell';
import FlagResolutionPanel from '@/components/model/FlagResolutionPanel';
import type { AssumptionRegister } from '@/lib/model/types';
import { Page } from './shared';
const groups = ['price', 'royalty', 'tax', 'macro', 'infra', 'utility', 'revenue', 'reserves', 'emissions'];
export default function AssumptionsPage() { const [register, setRegister] = useState<AssumptionRegister>(BASE_ASSUMPTIONS); const update = (id: string, value: number | string | null) => setRegister((r) => ({ ...r, [id]: { ...r[id], value } })); return <Page title="Module 1 — Assumption Register"><div className="grid gap-3 md:grid-cols-3"><div className="rounded border bg-green-50 p-4 text-green-800">ACTUAL {ACTUAL_COUNT}</div><div className="rounded border bg-amber-50 p-4 text-amber-800">PROXY {PROXY_COUNT}</div><div className="rounded border bg-red-50 p-4 text-red-700">FLAG {FLAG_COUNT}</div></div>{groups.map((g) => <section className="rounded-lg border bg-white" key={g}><h2 className="bg-[#003366] p-3 font-semibold capitalize text-white">{g}</h2>{Object.values(register).filter((a) => a.id.startsWith(g)).map((a) => <AssumptionCell key={a.id} assumption={a} onUpdate={update} />)}</section>)}<FlagResolutionPanel /></Page>; }
