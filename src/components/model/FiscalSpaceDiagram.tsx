import {
  CartesianGrid,
  Label,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

export type FiscalSpacePoint = {
  royaltyRate: number;
  projectIRR: number | null;
  provincialRevenueNPV: number;
};

export default function FiscalSpaceDiagram({
  points,
  waccLine,
  currentRoyaltyRate = 0.05,
}: {
  points: FiscalSpacePoint[];
  waccLine: number;
  currentRoyaltyRate?: number;
}) {
  const chartPoints = points.map((point) => ({ ...point, projectIRR: point.projectIRR ?? 0 }));
  const currentPoint = chartPoints.filter((point) => Math.abs(point.royaltyRate - currentRoyaltyRate) < 0.005);
  const maxRevenue = Math.max(1, ...chartPoints.map((point) => point.provincialRevenueNPV));
  const maxIrr = Math.max(waccLine + 0.03, ...chartPoints.map((point) => Number(point.projectIRR))) + 0.02;
  const minIrr = Math.min(0, ...chartPoints.map((point) => Number(point.projectIRR))) - 0.02;

  return (
    <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-[#003366]">Fiscal space diagram</p>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            The green region is the decision space where project IRR remains above WACC and
            provincial revenue NPV remains positive. Moving the royalty slider moves the navy point.
          </p>
        </div>
        <div className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
          Fiscal space = IRR ≥ {(waccLine * 100).toFixed(1)}% and revenue NPV &gt; $0
        </div>
      </div>

      <div className="h-[430px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 34, bottom: 34, left: 22 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbe4ee" />
            <ReferenceArea
              x1={0}
              x2={maxRevenue * 1.12}
              y1={waccLine}
              y2={maxIrr}
              fill="rgba(34,197,94,0.08)"
              stroke="rgba(34,197,94,0.28)"
            >
              <Label value="Fiscal space exists here" position="insideTopRight" fill="#166534" fontSize={13} />
            </ReferenceArea>
            <XAxis
              type="number"
              dataKey="provincialRevenueNPV"
              domain={[0, maxRevenue * 1.12]}
              tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(1)}B`}
              label={{ value: 'Provincial revenue NPV', position: 'insideBottom', offset: -20 }}
            />
            <YAxis
              type="number"
              dataKey="projectIRR"
              domain={[minIrr, maxIrr]}
              tickFormatter={(value) => `${(Number(value) * 100).toFixed(0)}%`}
              label={{ value: 'Project IRR', angle: -90, position: 'insideLeft' }}
            />
            <ZAxis range={[70, 120]} />
            <Tooltip
              formatter={(value, name) => {
                if (name === 'projectIRR') return `${(Number(value) * 100).toFixed(1)}%`;
                if (name === 'provincialRevenueNPV') return `$${(Number(value) / 1000).toFixed(1)}B`;
                if (name === 'royaltyRate') return `${(Number(value) * 100).toFixed(0)}%`;
                return String(value);
              }}
              labelFormatter={() => ''}
            />
            <ReferenceLine y={waccLine} stroke="#dc2626" strokeWidth={2} strokeDasharray="5 4" label={{ value: 'WACC', fill: '#dc2626', position: 'right' }} />
            <ReferenceLine x={0} stroke="#64748b" strokeDasharray="3 3" />
            <Scatter name="Royalty sweep" data={chartPoints} fill="#94a3b8" line={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
            <Scatter name="Current royalty" data={currentPoint} fill="#003366" stroke="#003366" strokeWidth={3} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
