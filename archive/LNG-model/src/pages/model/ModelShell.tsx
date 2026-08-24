import { useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import DataQualityDrawer from '@/components/model/DataQualityDrawer';
import DataQualityRing from '@/components/model/DataQualityRing';
import MetricCard from '@/components/model/MetricCard';
import NarrativeBlock from '@/components/model/NarrativeBlock';
import ExecutiveView from './ExecutiveView';
import AnalystView from './AnalystView';
import AuditView from './AuditView';
import { BASE_ASSUMPTIONS, resolve } from '@/lib/model/assumptions';
import { buildCashFlow, DEFAULT_PROJECT } from '@/lib/model/cashflow';
import { generateNarrative } from '@/lib/model/narrative';
import { applyScenario, SCENARIOS } from '@/lib/model/scenarios';
import type { AssumptionRegister, DualOutputRow, Project } from '@/lib/model/types';
import type { LeverState } from '@/components/model/FiscalLeverPanel';
import { cn } from '@/lib/utils';

type Mode = 'executive' | 'analyst' | 'audit';

type ScenarioResult = {
  irr: number | null;
  revenueNPV: number;
};

const PROJECTS: Project[] = [
  DEFAULT_PROJECT,
  {
    id: 'lng-canada-phase-2',
    name: 'LNG Canada Phase 2',
    type: 'LNG_EXPORT',
    capacityMtpa: 14,
    inServiceYear: 2030,
    projectLifeYears: 25,
    extendedLifeYears: 40,
    modelStatus: 'Scenario-ready',
  },
  {
    id: 'cedar-lng',
    name: 'Cedar LNG',
    type: 'LNG_EXPORT',
    capacityMtpa: 3,
    inServiceYear: 2028,
    projectLifeYears: 25,
    extendedLifeYears: 35,
    modelStatus: 'Initial public model',
  },
  {
    id: 'ksi-lisims',
    name: 'Ksi Lisims LNG',
    type: 'LNG_EXPORT',
    capacityMtpa: 12,
    inServiceYear: 2029,
    projectLifeYears: 25,
    extendedLifeYears: 35,
    modelStatus: 'Initial public model',
  },
];

const defaultWacc = Number(resolve(BASE_ASSUMPTIONS, 'macro.wacc'));
const defaultGasPrice = Number(resolve(BASE_ASSUMPTIONS, 'price.bcPlantInlet.base'));
const defaultPipelineToll = Number(resolve(BASE_ASSUMPTIONS, 'infra.pipelineToll'));
const defaultObpsPrice = Number(resolve(BASE_ASSUMPTIONS, 'tax.obps.2030'));

function initialState(project: Project): LeverState {
  return {
    royaltyRate: 0.05,
    wacc: defaultWacc,
    gasPrice: defaultGasPrice,
    pipelineToll: defaultPipelineToll,
    obpsPrice: defaultObpsPrice,
    capacityMtpa: project.capacityMtpa ?? 14,
    inServiceYear: project.inServiceYear,
    capexB: (project.capacityMtpa ?? 14) * 1.2,
    annualOpexM: 450,
    electricityGWh: 2000,
    scenarioId: 'custom',
  };
}

function cloneRegister(register: AssumptionRegister): AssumptionRegister {
  return Object.fromEntries(Object.entries(register).map(([id, assumption]) => [id, { ...assumption }])) as AssumptionRegister;
}

function registerFromState(state: LeverState): AssumptionRegister {
  const scenario = SCENARIOS.find((item) => item.id === state.scenarioId);
  const register = cloneRegister(scenario && state.scenarioId !== 'custom' ? applyScenario(BASE_ASSUMPTIONS, scenario) : BASE_ASSUMPTIONS);
  const overrides: Record<string, number> = {
    'macro.wacc': state.wacc,
    'price.bcPlantInlet.base': state.gasPrice,
    'infra.pipelineToll': state.pipelineToll,
    'tax.obps.2026': state.obpsPrice,
    'tax.obps.2027': state.obpsPrice,
    'tax.obps.2028': state.obpsPrice,
    'tax.obps.2029': state.obpsPrice,
    'tax.obps.2030': state.obpsPrice,
  };

  if (state.scenarioId === 'custom') {
    Object.entries(overrides).forEach(([id, value]) => {
      if (register[id]) register[id] = { ...register[id], value };
    });
  }

  return register;
}

function scenarioPatch(id: string): Partial<LeverState> {
  if (id === 'custom') return { scenarioId: 'custom' };

  const scenario = SCENARIOS.find((item) => item.id === id);
  const patch: Partial<LeverState> = {
    scenarioId: id,
    royaltyRate: 0.05,
    wacc: defaultWacc,
    gasPrice: defaultGasPrice,
    pipelineToll: defaultPipelineToll,
    obpsPrice: defaultObpsPrice,
    inServiceYear: DEFAULT_PROJECT.inServiceYear,
  };

  if (!scenario) return patch;
  if (typeof scenario.overrides['price.bcPlantInlet.base'] === 'number') patch.gasPrice = scenario.overrides['price.bcPlantInlet.base'];
  if (typeof scenario.overrides['infra.pipelineToll'] === 'number') patch.pipelineToll = scenario.overrides['infra.pipelineToll'];
  if (typeof scenario.overrides['royalty.thresholdHigh'] === 'number') patch.royaltyRate = 0.2;
  if (id === 'ramp_delay') patch.inServiceYear = DEFAULT_PROJECT.inServiceYear + 2;
  return patch;
}

function qualityCounts(register: AssumptionRegister) {
  const assumptions = Object.values(register);
  return {
    actualCount: assumptions.filter((assumption) => assumption.classification === 'ACTUAL').length,
    estimatedCount: assumptions.filter((assumption) => assumption.classification === 'FLAG').length,
    proxyCount: assumptions.filter((assumption) => assumption.classification === 'PROXY').length,
    totalCount: assumptions.length,
  };
}

function buildProject(selectedProject: Project, state: LeverState): Project {
  return {
    ...selectedProject,
    capacityMtpa: state.capacityMtpa,
    inServiceYear: state.inServiceYear,
    capexB: state.capexB,
    annualOpexM: state.annualOpexM,
    electricityGWh: state.electricityGWh,
    overrideRoyaltyRate: state.royaltyRate,
  };
}

function buildRoyaltyRows(project: Project, register: AssumptionRegister): DualOutputRow[] {
  const steps = Array.from({ length: 36 }, (_, index) => Number((0.05 + index * 0.01).toFixed(2)));

  return steps.map((royaltyRate) => {
    const result = buildCashFlow({ project: { ...project, overrideRoyaltyRate: royaltyRate }, register });
    return {
      royaltyRate,
      projectIRR: result.metrics.irr,
      provincialRevenueNPV: result.metrics.governmentTakeNPV,
      flagsUsed: result.metrics.flagsUsed,
    };
  });
}

function scenarioResultsFor(project: Project, currentState: LeverState): Record<string, ScenarioResult> {
  return Object.fromEntries(
    SCENARIOS.map((scenario) => {
      const stateForScenario = { ...currentState, ...scenarioPatch(scenario.id), scenarioId: scenario.id };
      const scenarioRegister = registerFromState(stateForScenario);
      const scenarioProject = buildProject(project, stateForScenario);
      const scenarioResult = buildCashFlow({ project: scenarioProject, register: scenarioRegister });
      return [scenario.id, { irr: scenarioResult.metrics.irr, revenueNPV: scenarioResult.metrics.governmentTakeNPV }];
    }),
  );
}

function formatIrr(irr: number | null) {
  return irr === null ? 'n/a' : `${(irr * 100).toFixed(1)}%`;
}

export default function ModelShell() {
  const [mode, setMode] = useState<Mode>('executive');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT.id);
  const selectedProject = PROJECTS.find((project) => project.id === projectId) ?? DEFAULT_PROJECT;
  const [state, setState] = useState<LeverState>(initialState(selectedProject));

  const onPatch = (patch: Partial<LeverState>) => {
    setState((current) => ({
      ...current,
      ...(patch.scenarioId ? scenarioPatch(patch.scenarioId) : {}),
      ...patch,
    }));
  };

  const onProjectChange = (nextProjectId: string) => {
    const nextProject = PROJECTS.find((project) => project.id === nextProjectId) ?? DEFAULT_PROJECT;
    setProjectId(nextProject.id);
    setState(initialState(nextProject));
  };

  const register = useMemo(() => registerFromState(state), [state]);
  const project = useMemo(() => buildProject(selectedProject, state), [selectedProject, state]);
  const result = useMemo(() => buildCashFlow({ project, register }), [project, register]);
  const dualRows = useMemo(() => buildRoyaltyRows(project, register), [project, register]);
  const narrative = useMemo(() => generateNarrative(result.metrics, dualRows, state.wacc), [result.metrics, dualRows, state.wacc]);
  const scenarioResults = useMemo(() => scenarioResultsFor(selectedProject, state), [selectedProject, state]);
  const { actualCount, estimatedCount, proxyCount, totalCount } = useMemo(() => qualityCounts(register), [register]);
  const lastCalculated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const govTake = result.metrics.governmentTakeUndiscounted / Math.max(1, result.rows.reduce((sum, row) => sum + row.revenue, 0));
  const flagHint = estimatedCount > 0 ? `${estimatedCount} estimated inputs active` : 'All assumptions confirmed';

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 print:bg-white">
      <header className="sticky top-0 z-40 flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2 shadow-sm print:static">
        <div className="flex items-center gap-2 font-bold text-[#003366]">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-[#003366] text-white"><Building2 className="h-5 w-5" /></span>
          <span>B.C. Energy Fiscal Model</span>
        </div>

        <select
          value={projectId}
          onChange={(event) => onProjectChange(event.target.value)}
          className="max-w-xs rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800"
        >
          {PROJECTS.map((projectOption) => (
            <option key={projectOption.id} value={projectOption.id}>{projectOption.name}</option>
          ))}
        </select>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-slate-300 bg-slate-50 p-1 text-sm print:hidden">
            {(['executive', 'analyst', 'audit'] as Mode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={cn(
                  'rounded-full px-4 py-1.5 capitalize transition',
                  mode === item ? 'bg-[#003366] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900',
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <DataQualityRing actualCount={actualCount} totalCount={totalCount} onClick={() => setDrawerOpen(true)} />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-5 print:max-w-none print:px-0">
        {mode === 'executive' ? <NarrativeBlock narrative={narrative} /> : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Project IRR" value={formatIrr(result.metrics.irr)} note={flagHint} flagsUsed={result.metrics.flagsUsed} actualCount={actualCount} totalCount={totalCount} onRingClick={() => setDrawerOpen(true)} />
          <MetricCard label="NPV (C$B)" value={`$${(result.metrics.npv / 1000).toFixed(1)}B`} note={flagHint} flagsUsed={result.metrics.flagsUsed} actualCount={actualCount} totalCount={totalCount} onRingClick={() => setDrawerOpen(true)} />
          <MetricCard label="Provincial Revenue NPV" value={`$${(result.metrics.governmentTakeNPV / 1000).toFixed(1)}B`} note={flagHint} flagsUsed={result.metrics.flagsUsed} actualCount={actualCount} totalCount={totalCount} onRingClick={() => setDrawerOpen(true)} />
          <MetricCard label="Government Take" value={`${(govTake * 100).toFixed(1)}%`} note={flagHint} flagsUsed={result.metrics.flagsUsed} actualCount={actualCount} totalCount={totalCount} onRingClick={() => setDrawerOpen(true)} />
        </section>

        {mode === 'executive' ? (
          <ExecutiveView
            metrics={result.metrics}
            dualRows={dualRows}
            wacc={state.wacc}
            currentRoyaltyRate={state.royaltyRate}
            selectedScenario={state.scenarioId}
            scenarioResults={scenarioResults}
            actualCount={actualCount}
            proxyCount={proxyCount}
            estimatedCount={estimatedCount}
            onSelectScenario={(scenarioId) => onPatch({ scenarioId })}
            onAudit={() => setMode('audit')}
          />
        ) : null}

        {mode === 'analyst' ? (
          <AnalystView
            state={state}
            onChange={onPatch}
            dualRows={dualRows.filter((row) => Math.abs(row.royaltyRate - state.royaltyRate) <= 0.151)}
            currentRoyaltyRate={state.royaltyRate}
            rows={result.rows}
            actualCount={actualCount}
            totalCount={totalCount}
            onRingClick={() => setDrawerOpen(true)}
          />
        ) : null}

        {mode === 'audit' ? <AuditView /> : null}
      </main>

      <footer className="sticky bottom-0 z-30 flex min-h-10 flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 print:hidden">
        <span>Last calculation: {lastCalculated}</span>
        <span>{estimatedCount} of {totalCount} inputs estimated · {actualCount} confirmed primary sources</span>
        <button type="button" onClick={() => window.print()} className="rounded border border-slate-300 px-3 py-1 font-semibold text-[#003366] hover:bg-slate-50">
          Export briefing note
        </button>
      </footer>

      <DataQualityDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}
