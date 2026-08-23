import FiscalSpaceDiagram from '@/components/model/FiscalSpaceDiagram';
import ScenarioCard from '@/components/model/ScenarioCard';
import { SCENARIOS } from '@/lib/model/scenarios';
import type { DualOutputRow, ReturnMetrics } from '@/lib/model/types';

export default function ExecutiveView({
  dualRows,
  wacc,
  currentRoyaltyRate,
  selectedScenario,
  scenarioResults,
  actualCount,
  proxyCount,
  estimatedCount,
  onSelectScenario,
  onAudit,
}: {
  metrics: ReturnMetrics;
  dualRows: DualOutputRow[];
  wacc: number;
  currentRoyaltyRate: number;
  selectedScenario: string;
  scenarioResults: Record<string, { irr: number | null; revenueNPV: number }>;
  actualCount: number;
  proxyCount: number;
  estimatedCount: number;
  onSelectScenario: (id: string) => void;
  onAudit: () => void;
}) {
  const executiveScenarios = SCENARIOS.filter((scenario) => ['base', 'high_price', 'low_price'].includes(scenario.id));

  return (
    <div className="space-y-8">
      <FiscalSpaceDiagram points={dualRows} waccLine={wacc} currentRoyaltyRate={currentRoyaltyRate} />

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#003366]">Scenario strip</h2>
            <p className="text-sm text-slate-600">Selecting a scenario updates the live fiscal-space chart and executive metrics.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {executiveScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              label={scenario.label}
              description={scenario.description}
              irr={scenarioResults[scenario.id]?.irr ?? null}
              revenueNPV={scenarioResults[scenario.id]?.revenueNPV ?? 0}
              selected={selectedScenario === scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
            />
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#003366]">Data quality statement</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-700">
          This analysis uses {actualCount} confirmed primary sources and {proxyCount} proxy estimates.
          Proxy estimates are based on publicly documented methodologies. {estimatedCount} inputs require
          Ministry data to confirm.
        </p>
        <button type="button" onClick={onAudit} className="mt-4 text-sm font-semibold text-[#003366] underline underline-offset-4">
          Open Audit mode to resolve flags
        </button>
      </section>
    </div>
  );
}
