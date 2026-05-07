import DataQualityRing from '@/components/model/DataQualityRing';
import FiscalLeverPanel, { type LeverState } from '@/components/model/FiscalLeverPanel';
import BreakevenStack from '@/components/model/BreakevenStack';
import TornadoChart from '@/components/model/TornadoChart';
import SparklineCashflow from '@/components/model/SparklineCashflow';
import type { CashFlowRow, DualOutputRow } from '@/lib/model/types';

function formatCurrency(value: number) {
  return `$${(value / 1000).toFixed(1)}B`;
}

export default function AnalystView({
  state,
  onChange,
  dualRows,
  currentRoyaltyRate,
  rows,
  actualCount,
  totalCount,
  onRingClick,
}: {
  state: LeverState;
  onChange: (patch: Partial<LeverState>) => void;
  dualRows: DualOutputRow[];
  currentRoyaltyRate: number;
  rows: CashFlowRow[];
  actualCount: number;
  totalCount: number;
  onRingClick: () => void;
}) {
  const firstOperating = rows.find((row) => row.year === 1) ?? rows[0];
  const currentRow = dualRows.find((row) => Math.abs(row.royaltyRate - currentRoyaltyRate) < 0.001) ?? dualRows[0];
  const baseIrr = currentRow?.projectIRR ?? 0;
  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalCapex = rows.reduce((sum, row) => sum + row.capex, 0);
  const totalTax = rows.reduce((sum, row) => sum + row.citProvincial + row.citFederal + row.carbonCost, 0);
  const targetReturn = Math.max(0, totalRevenue - totalCapex - totalTax - rows.reduce((sum, row) => sum + row.upstreamOpex + row.pipelineToll + row.facilityOpex + row.electricityCost + row.royaltyAmount, 0));
  const sensitivities = [
    { label: 'Gas price', lowImpact: baseIrr - 0.045, highImpact: baseIrr + 0.055, baseIRR: baseIrr },
    { label: 'Royalty rate', lowImpact: baseIrr + 0.035, highImpact: baseIrr - 0.055, baseIRR: baseIrr },
    { label: 'WACC', lowImpact: baseIrr - 0.015, highImpact: baseIrr + 0.015, baseIRR: baseIrr },
    { label: 'Pipeline toll', lowImpact: baseIrr + 0.012, highImpact: baseIrr - 0.025, baseIRR: baseIrr },
    { label: 'OBPS price', lowImpact: baseIrr + 0.01, highImpact: baseIrr - 0.018, baseIRR: baseIrr },
    { label: 'Electricity load', lowImpact: baseIrr + 0.008, highImpact: baseIrr - 0.014, baseIRR: baseIrr },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
        <FiscalLeverPanel state={state} onChange={onChange} />
      </div>

      <div className="space-y-6 lg:max-h-[calc(100vh-220px)] lg:overflow-y-auto">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#003366]">Dual output table</h2>
              <p className="mt-1 text-sm text-slate-600">
                At {(currentRoyaltyRate * 100).toFixed(0)}% royalty, project IRR and provincial revenue update together.
              </p>
            </div>
            <DataQualityRing actualCount={actualCount} totalCount={totalCount} size={38} onClick={onRingClick} />
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="p-3">Royalty Rate</th>
                  <th className="p-3">Project IRR</th>
                  <th className="p-3">Provincial Revenue NPV</th>
                </tr>
              </thead>
              <tbody>
                {dualRows.map((row) => {
                  const active = Math.abs(row.royaltyRate - currentRoyaltyRate) < 0.001;
                  return (
                    <tr key={row.royaltyRate} className={active ? 'border-t bg-sky-50 font-semibold' : 'border-t bg-white'}>
                      <td className="p-3">{(row.royaltyRate * 100).toFixed(0)}%</td>
                      <td className="p-3">{row.projectIRR === null ? 'n/a' : `${(row.projectIRR * 100).toFixed(1)}%`}</td>
                      <td className="p-3">{formatCurrency(row.provincialRevenueNPV)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold text-[#003366]">Breakeven stack</h2>
          <BreakevenStack
            actualCount={actualCount}
            totalCount={totalCount}
            onRingClick={onRingClick}
            segments={[
              { label: 'Upstream OPEX', value: firstOperating.upstreamOpex, flagsUsed: ['upstream.wellOpex'] },
              { label: 'Pipeline toll', value: firstOperating.pipelineToll, flagsUsed: ['infra.pipelineToll'] },
              { label: 'Facility OPEX', value: firstOperating.facilityOpex, flagsUsed: [] },
              { label: 'Electricity', value: firstOperating.electricityCost, flagsUsed: [] },
              { label: 'Royalty', value: firstOperating.royaltyAmount, flagsUsed: ['royalty.thresholdLow', 'royalty.thresholdHigh'] },
              { label: 'Tax/carbon', value: firstOperating.citFederal + firstOperating.citProvincial + firstOperating.carbonCost, flagsUsed: ['tax.ccaLNGFacility'] },
              { label: 'Return cushion', value: targetReturn / Math.max(1, rows.length - 1), flagsUsed: ['macro.wacc'] },
            ]}
          />
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-lg font-bold text-[#003366]">Tornado chart</h2>
          <TornadoChart variables={sensitivities} />
        </section>

        <SparklineCashflow rows={rows} />
      </div>
    </div>
  );
}
