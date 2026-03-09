import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { appealThresholdPercent } from '@/lib/tools/experience-rating-config';

export default function ExperienceRatingOptimizerPage() {
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
        <CardContent className="grid md:grid-cols-3 gap-4">{[0, 1, 2].map((i) => <div key={i} className="space-y-2"><p className="font-semibold">Year {i + 1}</p><Label>Claims cost</Label><Input type="number" value={claimsCost[i]} onChange={(e) => setClaimsCost((prev) => prev.map((v, idx) => idx === i ? Number(e.target.value) : v))} /><Label>Assessable payroll</Label><Input type="number" value={payroll[i]} onChange={(e) => setPayroll((prev) => prev.map((v, idx) => idx === i ? Number(e.target.value) : v))} /></div>)}</CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Rate comparison</CardTitle></CardHeader><CardContent className="space-y-2"><Label>Current assessed rate</Label><Input type="number" value={currentRate} onChange={(e) => setCurrentRate(Number(e.target.value))} className="max-w-xs" /><p>True risk-adjusted rate: {model.trueRate.toFixed(2)} per $100 payroll.</p><p>Variance: {model.variance.toFixed(2)} ({model.variancePercent.toFixed(1)}%).</p>{model.variancePercent > appealThresholdPercent && <p className="text-amber-300">Appeal flag: variance is above {appealThresholdPercent}% and may justify review.</p>}</CardContent></Card>
      <ToolDisclaimer toolName="Experience Rating Optimizer" paramDate="2026-01" text="Scenario output is planning guidance only and does not replace WCB adjudication or appeal advice." />
    </div>
  );
}
