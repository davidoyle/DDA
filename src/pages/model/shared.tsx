import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';
import { DEFAULT_PROJECT, buildCashFlow } from '@/lib/model/cashflow';
export const register = BASE_ASSUMPTIONS;
export const project = DEFAULT_PROJECT;
export const baseFlow = () => buildCashFlow({ project, register });
export const Page = ({ title, children }: { title: string; children: React.ReactNode }) => <section className="space-y-6"><div><p className="text-sm font-semibold uppercase tracking-wide text-[#003366]">DDA GS27MAN0002</p><h1 className="text-3xl font-bold text-slate-950">{title}</h1></div>{children}</section>;
export const fmt = (v: number) => `C$${v.toFixed(0)}M`;
export const pct = (v: number | null) => v === null ? 'n/a' : `${(v * 100).toFixed(1)}%`;
