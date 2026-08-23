import DataQualityRing from './DataQualityRing';

export default function MetricCard({ label, value, note, flagsUsed = [], actualCount, totalCount, onRingClick }: { label: string; value: string; note?: string; flagsUsed?: string[]; actualCount: number; totalCount: number; onRingClick?: () => void }) {
  return <article className="rounded-lg border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>{flagsUsed.length > 0 && <DataQualityRing actualCount={actualCount} totalCount={totalCount} size={34} onClick={onRingClick} label={`Open flags for ${label}`} />}</div><p className="mt-2 text-5xl font-bold tracking-tight text-[#003366]">{value}</p><p className="mt-2 min-h-5 text-xs text-slate-500">{note ?? (flagsUsed.length ? `${flagsUsed.length} estimated input${flagsUsed.length === 1 ? '' : 's'} active` : 'Confirmed inputs only')}</p></article>;
}
