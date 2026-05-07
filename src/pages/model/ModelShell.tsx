import { useMemo, useState } from 'react';
import { Building2 } from 'lucide-react';
import DataQualityDrawer from '@/components/model/DataQualityDrawer';
import MetricCard from '@/components/model/MetricCard';
import DataQualityRing from '@/components/model/DataQualityRing';
import ExecutiveView from './ExecutiveView';
import AnalystView from './AnalystView';
import AuditView from './AuditView';
import { ACTUAL_COUNT, BASE_ASSUMPTIONS, FLAG_COUNT, resolve } from '@/lib/model/assumptions';
import { buildCashFlow, DEFAULT_PROJECT } from '@/lib/model/cashflow';
import { generateNarrative } from '@/lib/model/narrative';
import { applyScenario, SCENARIOS } from '@/lib/model/scenarios';
import type { AssumptionRegister, DualOutputRow, Project } from '@/lib/model/types';
import type { LeverState } from '@/components/model/FiscalLeverPanel';
import { cn } from '@/lib/utils';

type Mode = 'executive' | 'analyst' | 'audit';

const PROJECTS: Project[] = [
  DEFAULT_PROJECT,
  { id: 'lng-canada-phase-2', name: 'LNG Canada Phase 2', type: 'LNG_EXPORT', capacityMtpa: 14, inServiceYear: 2030, projectLifeYears: 25, extendedLifeYears: 40, modelStatus: 'Scenario-ready' },
  { id: 'cedar-lng', name: 'Cedar LNG', type: 'LNG_EXPORT', capacityMtpa: 3, inServiceYear: 2028, projectLifeYears: 25, extendedLifeYears: 35, modelStatus: 'Initial public model' },
  { id: 'ksi-lisims', name: 'Ksi Lisims LNG', type: 'LNG_EXPORT', capacityMtpa: 12, inServiceYear: 2029, projectLifeYears: 25, extendedLifeYears: 35, modelStatus: 'Initial public model' },
];

const initialState = (project: Project): LeverState => ({ royaltyRate: 0.05, wacc: Number(resolve(BASE_ASSUMPTIONS, 'macro.wacc')), gasPrice: Number(resolve(BASE_ASSUMPTIONS, 'price.bcPlantInlet.base')), pipelineToll: Number(resolve(BASE_ASSUMPTIONS, 'infra.pipelineToll')), obpsPrice: Number(resolve(BASE_ASSUMPTIONS, 'tax.obps.2030')), capacityMtpa: project.capacityMtpa ?? 14, inServiceYear: project.inServiceYear, capexB: (project.capacityMtpa ?? 14) * 1.2, annualOpexM: 450, electricityGWh: 2000, scenarioId: 'base' });

function registerFromState(state: LeverState): AssumptionRegister {
  const scenario = SCENARIOS.find((item) => item.id === state.scenarioId);
  let register = scenario && state.scenarioId !== 'custom' ? applyScenario(BASE_ASSUMPTIONS, scenario) : { ...BASE_ASSUMPTIONS };
  register = Object.fromEntries(Object.entries(register).map(([id, assumption]) => [id, { ...assumption }])) as AssumptionRegister;
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
    Object.entries(overrides).forEach(([id, value]) => { if (register[id]) register[id] = { ...register[id], value }; });
  }
  return register;
}

function royaltyRows(baseIrr: number | null, baseRevenueNPV: number, currentRate: number): DualOutputRow[] {
  const steps = Array.from({ length: 36 }, (_, index) => Number((0.05 + index * 0.01).toFixed(2))).filter((rate) => Math.abs(rate - currentRate) <= 0.151 || currentRate === 0.05);
  const irr = baseIrr ?? 0;
  return steps.map((royaltyRate) => ({ royaltyRate, projectIRR: Math.max(-0.5, irr - (royaltyRate - currentRate) * 0.9), provincialRevenueNPV: Math.max(0, baseRevenueNPV * (1 + (royaltyRate - currentRate) * 2.2)), flagsUsed: ['royalty.thresholdLow', 'royalty.thresholdHigh', 'macro.wacc', 'macro.socialDiscountRate'] }));
}

function scenarioPatch(id: string): Partial<LeverState> {
  const scenario = SCENARIOS.find((item) => item.id === id);
  const patch: Partial<LeverState> = { scenarioId: id };
  if (!scenario || id === 'custom') return patch;
  if (typeof scenario.overrides['price.bcPlantInlet.base'] === 'number') patch.gasPrice = scenario.overrides['price.bcPlantInlet.base'];
  if (typeof scenario.overrides['infra.pipelineToll'] === 'number') patch.pipelineToll = scenario.overrides['infra.pipelineToll'];
  if (id === 'policy_reversal') patch.royaltyRate = 0.2;
  if (id === 'ramp_delay') patch.inServiceYear = DEFAULT_PROJECT.inServiceYear + 2;
  return patch;
}

export default function ModelShell() {
  const [mode, setMode] = useState<Mode>('executive');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT.id);
  const selectedProject = PROJECTS.find((project) => project.id === projectId) ?? DEFAULT_PROJECT;
  const [state, setState] = useState<LeverState>(initialState(selectedProject));
  const onPatch = (patch: Partial<LeverState>) => setState((current) => ({ ...current, ...(patch.scenarioId ? scenarioPatch(patch.scenarioId) : {}), ...patch }));
  const onProjectChange = (nextProjectId: string) => {
    const nextProject = PROJECTS.find((project) => project.id === nextProjectId) ?? DEFAULT_PROJECT;
    setProjectId(nextProject.id);
    setState(initialState(nextProject));
  };

  const register = useMemo(() => registerFromState(state), [state]);
  const project = useMemo<Project>(() => ({ ...selectedProject, capacityMtpa: state.capacityMtpa, inServiceYear: state.inServiceYear }), [selectedProject, state.capacityMtpa, state.inServiceYear]);
  const result = useMemo(() => buildCashFlow({ project, register }), [project, register]);
  const dualRows = useMemo(() => royaltyRows(result.metrics.irr, result.metrics.governmentTakeNPV, state.royaltyRate), [result.metrics.irr, result.metrics.governmentTakeNPV, state.royaltyRate]);
  const narrative = useMemo(() => generateNarrative(result.metrics, dualRows, state.wacc), [result.metrics, dualRows, state.wacc]);
  const scenarioResults = useMemo(() => Object.fromEntries(SCENARIOS.map((scenario) => {
    const scenarioResult = buildCashFlow({ project, register: applyScenario(BASE_ASSUMPTIONS, scenario) });
    return [scenario.id, { irr: scenarioResult.metrics.irr, revenueNPV: scenarioResult.metrics.governmentTakeNPV }];
  })), [project]);

  const totalInputs = Object.keys(BASE_ASSUMPTIONS).length;
  const estimatedText = `${FLAG_COUNT} of ${totalInputs} inputs estimated`;
  const governmentTake = result.rows.reduce((sum, row) => sum + row.revenue, 0) > 0 ? result.metrics.governmentTakeUndiscounted / result.rows.reduce((sum, row) => sum + row.revenue, 0) : 0;
  const modes: { id: Mode; label: string }[] = [{ id: 'executive', label: 'Executive' }, { id: 'analyst', label: 'Analyst' }, { id: 'audit', label: 'Audit' }];

  return <div className="min-h-screen bg-slate-100 text-slate-900"><header className="sticky top-0 z-30 flex min-h-14 flex-wrap items-center gap-4 border-b bg-white px-4 py-2 shadow-sm"><div className="flex min-w-64 items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded bg-[#003366] text-white"><Building2 className="h-5 w-5" /></span><div><p className="text-sm font-bold text-[#003366]">DDA</p><h1 className="text-base font-bold">B.C. Energy Fiscal Model</h1></div></div><div className="flex flex-1 justify-center"><select value={projectId} onChange={(event) => onProjectChange(event.target.value)} className="w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#003366]"><option disabled>Choose project</option>{PROJECTS.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select></div><div className="flex items-center gap-3"><div className="rounded-full border border-slate-300 bg-slate-50 p-1">{modes.map((item) => <button key={item.id} type="button" onClick={() => setMode(item.id)} className={cn('rounded-full px-3 py-1.5 text-sm font-semibold', mode === item.id ? 'bg-[#003366] text-white' : 'text-slate-700')}>{item.label}</button>)}</div><DataQualityRing actualCount={ACTUAL_COUNT} totalCount={totalInputs} onClick={() => setDrawerOpen(true)} /></div></header><section className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard label="Project IRR" value={result.metrics.irr === null ? 'n/a' : `${(result.metrics.irr * 100).toFixed(1)}%`} flagsUsed={result.metrics.flagsUsed} actualCount={ACTUAL_COUNT} totalCount={totalInputs} onRingClick={() => setDrawerOpen(true)} /><MetricCard label="NPV (C$B)" value={`$${(result.metrics.npv / 1000).toFixed(1)}`} flagsUsed={result.metrics.flagsUsed} actualCount={ACTUAL_COUNT} totalCount={totalInputs} onRingClick={() => setDrawerOpen(true)} /><MetricCard label="Provincial Revenue NPV (C$B)" value={`$${(result.metrics.governmentTakeNPV / 1000).toFixed(1)}`} flagsUsed={result.metrics.flagsUsed} actualCount={ACTUAL_COUNT} totalCount={totalInputs} onRingClick={() => setDrawerOpen(true)} /><MetricCard label="Government Take" value={`${(governmentTake * 100).toFixed(1)}%`} flagsUsed={result.metrics.flagsUsed} actualCount={ACTUAL_COUNT} totalCount={totalInputs} onRingClick={() => setDrawerOpen(true)} /></section><main className="p-4 pt-0">{mode === 'executive' && <ExecutiveView metrics={result.metrics} dualRows={dualRows} narrative={narrative} wacc={state.wacc} selectedScenario={state.scenarioId} scenarioResults={scenarioResults} onSelectScenario={(id) => onPatch({ scenarioId: id })} onAudit={() => setMode('audit')} />}{mode === 'analyst' && <AnalystView state={state} onChange={onPatch} dualRows={dualRows} currentRoyaltyRate={state.royaltyRate} rows={result.rows} actualCount={ACTUAL_COUNT} totalCount={totalInputs} onRingClick={() => setDrawerOpen(true)} />}{mode === 'audit' && <AuditView />}</main><footer className="flex min-h-10 flex-wrap items-center justify-between gap-2 border-t bg-white px-4 py-2 text-xs text-slate-600"><span>Last calculation: {new Date().toLocaleString()}</span><span>{estimatedText}</span><button disabled className="rounded border border-slate-300 px-3 py-1 text-slate-400">Export briefing note</button></footer><DataQualityDrawer open={drawerOpen} onOpenChange={setDrawerOpen} /></div>;
}
