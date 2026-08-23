import { useMemo, useState } from 'react';
import { AlertTriangle, Save, RotateCcw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PRESETS } from '@/lib/bc-model/presets';
import { createScenarioRun } from '@/lib/bc-model/model';
import type { PhiWeights, PolicyControls, ScenarioRun } from '@/lib/bc-model/types';
import { EmissionsLineChart } from './charts/EmissionsLineChart';
import { ElectricityDemandChart } from './charts/ElectricityDemandChart';
import { ZEVDiffusionChart } from './charts/ZEVDiffusionChart';
import { PolicySlider } from './controls/PolicySlider';

interface Props {
  baseline: ScenarioRun;
  controls: PolicyControls;
  phiWeights: PhiWeights;
  onChangeControls: (controls: PolicyControls) => void;
  onChangePhiWeights: (weights: PhiWeights) => void;
  onSaveScenario: (scenario: ScenarioRun) => void;
}

const sectorCardClass = 'border-[#d8cdb9] bg-white shadow-sm';

export function ModelExplorer({ baseline, controls, phiWeights, onChangeControls, onChangePhiWeights, onSaveScenario }: Props) {
  const [scenarioCounter, setScenarioCounter] = useState(1);
  const scenario = useMemo(() => createScenarioRun('custom-live', 'Custom scenario', 'Live output from current slider positions.', controls, phiWeights), [controls, phiWeights]);
  const final = scenario.results.at(-1)!;
  const baselineFinal = baseline.results.at(-1)!;

  const updateControl = <K extends keyof PolicyControls>(key: K, value: PolicyControls[K]) => onChangeControls({ ...controls, [key]: value });
  const updatePhi = <K extends keyof PhiWeights>(key: K, value: PhiWeights[K]) => onChangePhiWeights({ ...phiWeights, [key]: value });

  const saveScenario = () => {
    const id = `saved-${scenarioCounter}`;
    onSaveScenario(createScenarioRun(id, `Saved ${scenarioCounter}`, 'Saved from Explore tab.', controls, phiWeights));
    setScenarioCounter((count) => count + 1);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="space-y-4">
        <PolicySlider label="Carbon Price" value={controls.carbonPrice} min={65} max={250} step={5} helper="$/tonne" formatValue={(value) => `$${value.toFixed(0)}`} onChange={(value) => updateControl('carbonPrice', value)} />
        <PolicySlider label="ZEV Support Intensity" value={controls.zevSupport} helper="Consumer and charging support intensity." onChange={(value) => updateControl('zevSupport', value)} />
        <PolicySlider label="Industry Decarbonization Support" value={controls.industrySupport} helper="Capital support and industrial retrofit pace." onChange={(value) => updateControl('industrySupport', value)} />
        <PolicySlider label="Buildings Electrification Support" value={controls.buildingsSupport} helper="Heat pump, retrofit, and new-build push." onChange={(value) => updateControl('buildingsSupport', value)} />
        <PolicySlider label="Household Relief" value={controls.householdRelief} helper="Offsets burden after the carbon rebate ended in April 2025." onChange={(value) => updateControl('householdRelief', value)} />
        <PolicySlider label="Regulatory Stringency" value={controls.regulatoryStringency} helper="Code, standard, and compliance pressure." onChange={(value) => updateControl('regulatoryStringency', value)} />
        <PolicySlider label="Dual-Fuel Policy" value={controls.dualFuelPolicy} helper="0 = all-electric mandate; 1 = dual-fuel allowed." onChange={(value) => updateControl('dualFuelPolicy', value)} />
        <PolicySlider label="Grid Expansion Support" value={controls.gridExpansionSupport} helper="Paces new clean generation additions." onChange={(value) => updateControl('gridExpansionSupport', value)} />

        <Accordion type="single" collapsible className="rounded-2xl border border-[#d8cdb9] bg-white px-4 shadow-sm">
          <AccordionItem value="advanced" className="border-none">
            <AccordionTrigger className="text-sm font-semibold text-[#1f1f1f]">Advanced political cost weights</AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4">
              <PolicySlider label="φ1 fuel cost" value={phiWeights.phi1} onChange={(value) => updatePhi('phi1', value)} />
              <PolicySlider label="φ2 power bill" value={phiWeights.phi2} onChange={(value) => updatePhi('phi2', value)} />
              <PolicySlider label="φ3 job loss risk" value={phiWeights.phi3} onChange={(value) => updatePhi('phi3', value)} />
              <PolicySlider label="φ4 lobby resistance" value={phiWeights.phi4} onChange={(value) => updatePhi('phi4', value)} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-wrap gap-3">
          <Button type="button" className="gap-2" onClick={() => onChangeControls({ ...PRESETS.baseline.controls })}><RotateCcw className="size-4" />Reset to baseline</Button>
          <Button type="button" variant="outline" className="gap-2 border-[#1f3a5f] text-[#1f3a5f]" onClick={saveScenario}><Save className="size-4" />Save as scenario</Button>
        </div>
      </div>

      <div className="space-y-6">
        {controls.gridExpansionSupport < 0.3 && scenario.results.some((point) => point.year >= 2028) ? (
          <div className="flex items-start gap-3 rounded-2xl border border-[#d1603d]/30 bg-[#fff4ef] p-4 text-sm text-[#7d3f2d]">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-semibold">Grid constraint warning</p>
              <p className="mt-1">New clean generation is undersupplied from 2028 onward, so buildings and industry abatement are penalized.</p>
            </div>
          </div>
        ) : null}

        <Card className={sectorCardClass}>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Total BC emissions</CardTitle><Badge variant={final.status === 'ON TRACK' ? 'default' : final.status === 'AT RISK' ? 'secondary' : 'destructive'}>{final.status}</Badge></CardHeader>
          <CardContent>
            <EmissionsLineChart data={scenario.results} />
            <p className="mt-3 text-xs text-[#5c5548]">Model estimate; reconciliation with UNFCCC NIR methodology required.</p>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className={sectorCardClass}><CardHeader><CardTitle>ZEV share by year</CardTitle></CardHeader><CardContent><ZEVDiffusionChart data={scenario.results} /></CardContent></Card>
          <Card className={sectorCardClass}><CardHeader><CardTitle>Electricity demand growth</CardTitle></CardHeader><CardContent><ElectricityDemandChart data={scenario.results} /></CardContent></Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { title: 'Household burden index', value: final.householdBurden, delta: final.householdBurden - baselineFinal.householdBurden, suffix: '' },
            { title: 'Policy credibility', value: final.policyCred, delta: final.policyCred - baselineFinal.policyCred, suffix: '' },
            { title: '2030 ZEV share', value: final.zevShare, delta: final.zevShare - baselineFinal.zevShare, suffix: '' },
            { title: 'Demand growth vs 2024', value: final.electricityDemandGrowth, delta: final.electricityDemandGrowth - baselineFinal.electricityDemandGrowth, suffix: '%' },
            { title: 'Dual-fuel adoption', value: final.dualFuelAdoption, delta: final.dualFuelAdoption - baselineFinal.dualFuelAdoption, suffix: '' },
          ].map((card) => (
            <Card key={card.title} className={sectorCardClass}>
              <CardHeader><CardTitle className="text-base">{card.title}</CardTitle></CardHeader>
              <CardContent>
                <p className="font-heading text-3xl text-[#1f1f1f]">{(card.value * 100).toFixed(1)}{card.suffix}</p>
                <p className={`mt-2 text-sm ${card.delta >= 0 ? 'text-[#1f3a5f]' : 'text-[#7d3f2d]'}`}>{card.delta >= 0 ? '+' : ''}{(card.delta * 100).toFixed(1)} vs baseline</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {scenario.results.map((point) => (
            <Card key={point.year} className={sectorCardClass}>
              <CardHeader><CardTitle>{point.year}</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-[#3f3a34]">
                <p>Transport: {point.emissions.transport.toFixed(1)} Mt</p>
                <p>Industry: {point.emissions.industry.toFixed(1)} Mt</p>
                <p>Buildings: {point.emissions.buildings.toFixed(1)} Mt</p>
                <p className="rounded-xl bg-[#f7f1e6] p-2 text-xs text-[#5c5548]">Pulp/paper tracked at {point.pulpPaperEmissions.toFixed(1)} Mt as the leading industrial sub-component.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
