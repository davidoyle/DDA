import { useMemo, useState } from 'react';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { MoneyInput, RateInput } from '@/components/shared/NumberInputs';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { UpgradeModal } from '@/components/shared/UpgradeModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLicense } from '@/hooks/useLicense';
import { appealThresholdPercent } from '@/lib/tools/experience-rating-config';
import { saveSnapshot } from '@/lib/tools/snapshot-store';

export default function ExperienceRatingOptimizerPage() {
  const { entitlements, updatePlan } = useLicense();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [claimsCost, setClaimsCost] = useState([140000, 130000, 125000]);
  const [payroll, setPayroll] = useState([5_000_000, 5_200_000, 5_500_000]);
  const [currentRate, setCurrentRate] = useState(2.1);

  const model = useMemo(() => {
    const avgCost = claimsCost.reduce((a, b) => a + b, 0) / 3;
    const avgPayroll = payroll.reduce((a, b) => a + b, 0) / 3;
    const trueRate = (avgCost / avgPayroll) * 100;
    const variance = currentRate - trueRate;
    return { trueRate, variance, variancePercent: (variance / Math.max(trueRate, 0.0001)) * 100 };
  }, [claimsCost, payroll, currentRate]);

  return (
    <div className="px-6 lg:px-[8vw] py-12 space-y-6">
      <h1 className="headline-md">Experience Rating Optimizer</h1>
      <p className="text-[#F3EFE6]/80">Phase 2 file upload: coming soon. v1 uses manual NEER/retro entry.</p>

      <Card>
        <CardHeader><CardTitle>3-year data entry</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <p className="font-semibold">Year {i + 1}</p>
              <Label>Claims cost</Label>
              <MoneyInput value={claimsCost[i]} min={0} onValueChange={(value) => setClaimsCost((prev) => prev.map((v, idx) => idx === i ? value : v))} />
              <Label>Assessable payroll</Label>
              <MoneyInput value={payroll[i]} min={0} onValueChange={(value) => setPayroll((prev) => prev.map((v, idx) => idx === i ? value : v))} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Rate comparison</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <Label>Current assessed rate</Label>
          <RateInput value={currentRate} min={0} max={50} onValueChange={setCurrentRate} className="max-w-xs" />
          <p>True risk-adjusted rate: {model.trueRate.toFixed(2)} per $100 payroll.</p>
          <p>Variance: {model.variance.toFixed(2)} ({model.variancePercent.toFixed(1)}%).</p>
          {model.variancePercent > appealThresholdPercent && (
            <p className="text-amber-300">Appeal flag: variance is above {appealThresholdPercent}% and may justify review.</p>
          )}
        </CardContent>
      </Card>

      {entitlements.canCompareScenarios ? (
        <Card><CardHeader><CardTitle>Scenario sensitivity (premium)</CardTitle></CardHeader><CardContent><p>Conservative, Moderate, Aggressive forecast matrix unlocked.</p></CardContent></Card>
      ) : (
        <FeatureLock title="Scenario comparison locked" message="Unlock multi-scenario forward projections and appeal timing guidance." onUpgrade={() => setUpgradeOpen(true)} />
      )}

      <button
        className="btn-secondary"
        onClick={() => saveSnapshot('experience-rating-optimizer', {
          inputs: { claimsCost, payroll, currentRate },
          results: { model },
          meta: { version: 'v1' },
        })}
        disabled={!entitlements.canSaveAndCompare}
      >
        Save scenario snapshot
      </button>

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} onChoosePlan={(tier) => {
        updatePlan(tier);
        setUpgradeOpen(false);
      }} />
      <ToolDisclaimer toolName="Experience Rating Optimizer" paramDate="2026-01" text="Scenario output is planning guidance only and does not replace WCB adjudication or appeal advice." />
    </div>
  );
}
