import { cn } from '@/lib/utils';

export default function ScenarioCard({ label, description, irr, revenueNPV, selected, onClick }: { label: string; description: string; irr: number | null; revenueNPV: number; selected: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={cn('rounded-lg border bg-white p-4 text-left transition hover:border-[#003366]', selected ? 'border-[#003366] ring-2 ring-[#003366]/20' : 'border-slate-200')}><p className="font-semibold text-[#003366]">{label}</p><p className="mt-1 text-sm text-slate-600">{description}</p><div className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><span className="block text-xs text-slate-500">IRR</span><strong>{irr === null ? 'n/a' : `${(irr * 100).toFixed(1)}%`}</strong></div><div><span className="block text-xs text-slate-500">Revenue NPV</span><strong>${(revenueNPV / 1000).toFixed(1)}B</strong></div></div></button>;
}
