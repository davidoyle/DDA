import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { UpgradeModal } from '@/components/shared/UpgradeModal';
import { useLicense } from '@/hooks/useLicense';
import { buildExecutiveBrief } from '@/lib/tools/executive-brief-engine';
import type { ToolSignal } from '@/lib/tools/types';

const sampleSignals: ToolSignal[] = [
  {
    tool: 'Mental Health Forecaster',
    annualCostImpact: 420000,
    confidenceTier: 'MODELLED',
    timeHorizonYears: 3,
    keyDrivers: ['Pickering acceptance uplift', 'Healthcare sub-sector exposure'],
    recommendedActions: ['Implement RTW coordinator', 'Supervisor mental-health training'],
  },
  {
    tool: 'Province Comparator',
    annualCostImpact: 210000,
    confidenceTier: 'VERIFIED',
    timeHorizonYears: 3,
    keyDrivers: ['BC flat-rate pressure', 'Alberta subsidized rates'],
    recommendedActions: ['Rebalance growth by jurisdiction'],
  },
  {
    tool: 'Suppression Audit',
    annualCostImpact: 90000,
    confidenceTier: 'SPECULATIVE',
    timeHorizonYears: 1,
    keyDrivers: ['Section 73 exposure indicators'],
    recommendedActions: ['Revise claims-reporting governance'],
  },
];

export default function ExecutiveRiskBriefPage() {
  const { entitlements, updatePlan, plan } = useLicense();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const brief = buildExecutiveBrief(sampleSignals);

  return (
    <div className="px-6 lg:px-[8vw] py-12 space-y-6">
      <h1 className="headline-md">Executive Risk Brief</h1>
      <p className="text-[#F3EFE6]/80">Current plan: {plan.toUpperCase()}</p>
      {entitlements.canViewPortfolioBrief ? (
        <>
          <Card>
            <CardHeader><CardTitle>3-Year downside envelope</CardTitle></CardHeader>
            <CardContent>
              <p>Low: ${brief.threeYearDownsideLow.toLocaleString()}</p>
              <p>Base: ${brief.threeYearDownsideBase.toLocaleString()}</p>
              <p>High: ${brief.threeYearDownsideHigh.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Top controllable drivers</CardTitle></CardHeader>
            <CardContent>{brief.topDrivers.map((d) => <p key={d}>• {d}</p>)}</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Priority actions this quarter</CardTitle></CardHeader>
            <CardContent>{brief.topActions.map((a) => <p key={a}>• {a}</p>)}</CardContent>
          </Card>
        </>
      ) : (
        <FeatureLock
          title="Enterprise feature"
          message="Portfolio rollup and board-ready risk brief are available on Enterprise licensing."
          onUpgrade={() => setUpgradeOpen(true)}
        />
      )}
      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} onChoosePlan={(tier) => {
        updatePlan(tier);
        setUpgradeOpen(false);
      }} />
      <ToolDisclaimer toolName="Executive Risk Brief" paramDate="2026-01" text="Rollup combines tool outputs and is intended for strategic planning support." />
    </div>
  );
}
