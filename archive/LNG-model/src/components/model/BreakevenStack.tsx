import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import DataQualityRing from './DataQualityRing';

const COLORS = ['#003366', '#0f766e', '#2563eb', '#f59e0b', '#7c3aed', '#dc2626'];

export type BreakevenSegment = {
  label: string;
  value: number;
  flagsUsed: string[];
};

function formatMillions(value: number) {
  return `$${value.toFixed(0)}M`;
}

export default function BreakevenStack({
  segments,
  actualCount,
  totalCount,
  onRingClick,
}: {
  segments: BreakevenSegment[];
  actualCount?: number;
  totalCount?: number;
  onRingClick?: () => void;
}) {
  const total = segments.reduce((sum, segment) => sum + Math.max(0, segment.value), 0);
  const data = segments.map((segment) => ({
    ...segment,
    value: Math.max(0, segment.value),
    share: total > 0 ? Math.max(0, segment.value) / total : 0,
  }));
  const flagged = segments.some((segment) => segment.flagsUsed.length > 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#003366]">Live breakeven cost stack</p>
          <p className="mt-1 text-sm text-slate-600">
            The stack uses the first operating-year cash-flow row, so changes to gas price,
            tolls, OPEX, electricity load, CAPEX, and royalty terms flow through immediately.
          </p>
        </div>
        {flagged && actualCount !== undefined && totalCount !== undefined ? (
          <DataQualityRing actualCount={actualCount} totalCount={totalCount} size={38} onClick={onRingClick} />
        ) : null}
      </div>

      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={[Object.fromEntries(data.map((segment) => [segment.label, segment.value]))]} layout="vertical" margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <XAxis type="number" hide />
            <Tooltip formatter={(value) => formatMillions(Number(value))} />
            {data.map((segment, index) => (
              <Bar key={segment.label} dataKey={segment.label} stackId="breakeven" fill={COLORS[index % COLORS.length]} radius={index === 0 ? [6, 0, 0, 6] : undefined}>
                <Cell fill={COLORS[index % COLORS.length]} />
                {segment.share > 0.12 ? <LabelList dataKey={segment.label} position="center" fill="white" fontSize={11} /> : null}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {data.map((segment, index) => (
          <div key={segment.label} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-700">{segment.label}</p>
              <p className="text-xs text-slate-500">{formatMillions(segment.value)} · {(segment.share * 100).toFixed(0)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
