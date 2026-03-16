import { useMemo, useState } from 'react';
import { EvidenceTier } from '@/components/shared/EvidenceTier';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { ValidatedNumberInput } from '@/components/shared/NumberInputs';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { UpgradeModal } from '@/components/shared/UpgradeModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useLicense } from '@/hooks/useLicense';
import { calculateExperienceRatingImpact, fmtMoney } from '@/lib/worksafebc/engine';
import { saveSnapshot } from '@/lib/tools/snapshot-store';
import { healthcareSubSectors, mitigationItems, pickeringMultipliers, rampByYear, rtwAdjustmentFactor, sectorRates } from '@/lib/tools/mental-health-config';

const sectors = Object.keys(sectorRates);

export default function MentalHealthForecasterPage() {
  const { entitlements, updatePlan } = useLicense();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [sector, setSector] = useState<keyof typeof sectorRates>('Healthcare & Social Assistance');
  const [subSector, setSubSector] = useState<string>(healthcareSubSectors[0]);
  const [headcount, setHeadcount] = useState(250);
  const [province, setProvince] = useState('BC');
  const [years, setYears] = useState(3);
  const [hasRtw, setHasRtw] = useState(true);

  const projection = useMemo(() => {
    const base = sectorRates[sector];
    const rows = Array.from({ length: years }, (_, idx) => {
      const multiplier = pickeringMultipliers.base + (rampByYear[idx] ?? rampByYear[rampByYear.length - 1]);
      const claims = (headcount / 100) * base.claimRatePer100 * multiplier;
      const cost = claims * base.avgCost * (hasRtw ? rtwAdjustmentFactor : 1);
      return { year: idx + 1, claims, cost };
    });
    const claimsTotal = rows.reduce((acc, row) => acc + row.claims, 0);
    const costTotal = rows.reduce((acc, row) => acc + row.cost, 0);
    return { rows, claimsTotal, costTotal };
  }, [sector, headcount, years, hasRtw]);

  const experience = calculateExperienceRatingImpact(projection.claimsTotal, sectorRates[sector].avgCost);
  const checklist = mitigationItems.filter((item) => {
    const applicableSectors = item.sectors as readonly string[];
    return applicableSectors.includes('all') || applicableSectors.includes(sector);
  });

  return (
    <div className="diagnostic-theme px-6 lg:px-[8vw] py-12 space-y-6 min-h-screen">
      <h1 className="headline-md">Mental Health Claims Surge Forecaster</h1>
      <p className="text-[#4a453d]">Pickering (2025) and the November 2025 policy rewrite signal sustained claim-growth pressure.</p>

      <Card>
        <CardHeader><CardTitle>Employer profile</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4">
          <div><Label>Sector</Label><Select value={sector} onValueChange={(v) => setSector(v as keyof typeof sectorRates)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
          {sector === 'Healthcare & Social Assistance' && <div><Label>Sub-sector</Label><Select value={subSector} onValueChange={setSubSector}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{healthcareSubSectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>}
          <div><Label>Headcount</Label><ValidatedNumberInput value={headcount} min={0} onValueChange={setHeadcount} /></div>
          <div><Label>Province</Label><Select value={province} onValueChange={setProvince}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="BC">BC</SelectItem><SelectItem value="Alberta">Alberta</SelectItem><SelectItem value="Ontario">Ontario</SelectItem></SelectContent></Select></div>
          <div><Label>Projection years</Label><Select value={String(years)} onValueChange={(v) => setYears(Number(v))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem></SelectContent></Select></div>
          <div className="flex items-center gap-2"><Switch checked={hasRtw} onCheckedChange={setHasRtw} /><Label>Documented RTW program</Label></div>
        </CardContent>
      </Card>

      {sector === 'Healthcare & Social Assistance' && <Alert className="border-rose-500/50"><AlertTitle>Presumptive coverage flag</AlertTitle><AlertDescription>Nurses and health-care assistants in your sub-sector now have presumptive coverage for mental disorder claims. The burden of proof has shifted to the employer.</AlertDescription></Alert>}

      <section className="grid md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Expected claims ({years}y)</CardTitle></CardHeader><CardContent>{projection.claimsTotal.toFixed(1)}<div className="mt-2"><EvidenceTier tier="MODELLED" /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Expected cost impact</CardTitle></CardHeader><CardContent>{fmtMoney(projection.costTotal)}<div className="mt-2"><EvidenceTier tier="VERIFIED" /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Experience rating impact</CardTitle></CardHeader><CardContent>{experience.projectedRateChangePercent.toFixed(1)}%<div className="mt-2"><EvidenceTier tier="MODELLED" /></div></CardContent></Card>
      </section>

      {entitlements.canViewActionPlan ? (
        <Card><CardHeader><CardTitle>Mitigation checklist</CardTitle></CardHeader><CardContent className="space-y-2">{checklist.map((item) => <p key={item.name}>• {item.name} ({item.impact}% est.) — {item.source}</p>)}</CardContent></Card>
      ) : (
        <FeatureLock title="Premium action plan" message="Unlock prioritized mitigation checklist and impact estimates." onUpgrade={() => setUpgradeOpen(true)} />
      )}

      <div className="flex gap-3 items-center">
        <button className="btn-secondary" onClick={() => saveSnapshot('mental-health-forecaster', {
          inputs: { sector, subSector, headcount, province, years, hasRtw },
          results: { projection, experience },
          meta: { version: 'v1' },
        })} disabled={!entitlements.canSaveAndCompare}>Save snapshot</button>
        {!entitlements.canSaveAndCompare && <span className="text-xs text-[#5b5347]">Pro required for save/compare.</span>}
      </div>

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} onChoosePlan={(tier) => {
        updatePlan(tier);
        setUpgradeOpen(false);
      }} />

      <ToolDisclaimer toolName="Mental Health Claims Surge Forecaster" paramDate="2025-12" text="Model output is decision support only and not legal advice." />
    </div>
  );
}
