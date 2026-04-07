import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { BaselineDashboard } from '@/components/bc-model/BaselineDashboard';
import { ModelExplorer } from '@/components/bc-model/ModelExplorer';
import { ModelInfo } from '@/components/bc-model/ModelInfo';
import { ScenarioComparison } from '@/components/bc-model/ScenarioComparison';
import { DEFAULT_PHI_WEIGHTS } from '@/lib/bc-model/constants';
import { PRESETS } from '@/lib/bc-model/presets';
import { createScenarioRun } from '@/lib/bc-model/model';
import type { PhiWeights, PolicyControls, ScenarioRun } from '@/lib/bc-model/types';

export default function BCDecarbonizationModelPage() {
  const [searchParams] = useSearchParams();
  const previewMode = searchParams.get('preview') === '1' && searchParams.get('sub') !== 'active';
  const [controls, setControls] = useState<PolicyControls>({ ...PRESETS.baseline.controls });
  const [phiWeights, setPhiWeights] = useState<PhiWeights>(DEFAULT_PHI_WEIGHTS);
  const [savedScenarios, setSavedScenarios] = useState<ScenarioRun[]>([]);
  const [selectedScenarioIds, setSelectedScenarioIds] = useState<string[]>(['baseline', 'accelerated', 'gridConstrained']);

  const presetRuns = useMemo(() => Object.values(PRESETS).map((preset) => createScenarioRun(preset.id, preset.label, preset.description, preset.controls, preset.phiWeights)), []);
  const baseline = presetRuns.find((scenario) => scenario.id === 'baseline')!;
  const scenarioRuns = [...presetRuns, ...savedScenarios];

  const toggleScenario = (id: string) => {
    setSelectedScenarioIds((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id].slice(-3));
  };

  const handleSaveScenario = (scenario: ScenarioRun) => {
    setSavedScenarios((current) => [...current.filter((entry) => entry.id !== scenario.id), scenario]);
    setSelectedScenarioIds((current) => [...new Set([...current.slice(-2), scenario.id])].slice(-3));
  };

  return (
    <div className="diagnostic-theme min-h-screen px-6 py-12 lg:px-[8vw]">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <header className="space-y-4">
          <p className="eyebrow">Policy tools</p>
          <h1 className="headline-md text-[#1f1f1f]">BC Decarbonization Model</h1>
          <p className="max-w-4xl text-base text-[#4a453d]">Interactive policy simulation for British Columbia&apos;s constrained emissions transition, 2026–2030. Explore policy levers, review the baseline case, and compare stress-tested scenarios against legal targets.</p>
        </header>

        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList className="h-auto flex-wrap bg-[#e7dfd0] p-1">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          </TabsList>
          <TabsContent value="explore" className="space-y-6">
            <ModelExplorer baseline={baseline} controls={controls} phiWeights={phiWeights} onChangeControls={setControls} onChangePhiWeights={setPhiWeights} onSaveScenario={previewMode ? () => undefined : handleSaveScenario} />
            {previewMode ? (
              <FeatureLock title="Subscriber feature: scenario save & compare" message="Subscribe to save custom scenarios and run multi-scenario comparisons." />
            ) : null}
          </TabsContent>
          <TabsContent value="dashboard" className="space-y-6">
            {previewMode ? (
              <FeatureLock title="Subscriber feature: baseline dashboard" message="Subscribe to unlock dashboard-level benchmark and pathway diagnostics." />
            ) : (
              <BaselineDashboard baseline={baseline} />
            )}
          </TabsContent>
          <TabsContent value="scenarios" className="space-y-6">
            {previewMode ? (
              <FeatureLock title="Subscriber feature: scenario comparison lab" message="Subscribe to unlock side-by-side scenario stress-testing." />
            ) : (
              <ScenarioComparison scenarios={scenarioRuns} selectedIds={selectedScenarioIds} onToggle={toggleScenario} />
            )}
          </TabsContent>
        </Tabs>
        {previewMode ? <Link to="/diagnostics/subscribe" className="btn-secondary inline-flex">Subscribe to unlock full model</Link> : null}

        <ModelInfo />
        <ToolDisclaimer toolName="BC Decarbonization Model" paramDate="2026-03" text="Outputs are scenario estimates derived from official anchors and interpolated constraints; they are not a substitute for official inventory accounting or legal advice." />
      </div>
    </div>
  );
}
