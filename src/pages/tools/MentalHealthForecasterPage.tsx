import { useMemo, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { EvidenceTier } from '@/components/shared/EvidenceTier';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { calculateExperienceRatingImpact, fmtMoney } from '@/lib/worksafebc/engine';
import { healthcareSubSectors, mitigationItems, pickeringMultipliers, rampByYear, rtwAdjustmentFactor, sectorRates } from '@/lib/tools/mental-health-config';

const sectors = Object.keys(sectorRates);

export default function MentalHealthForecasterPage() {
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
    const sectors = item.sectors as readonly string[];
    return sectors.includes('all') || sectors.includes(sector);
  });

  return (
    <div className="px-6 lg:px-[8vw] py-12 space-y-6">
      <h1 className="headline-md">Mental Health Claims Surge Forecaster</h1>
      <p className="text-[#F3EFE6]/80">Pickering (2025) and the November 2025 policy rewrite signal sustained claim-growth pressure.</p>

      <Card>
        <CardHeader><CardTitle>Employer profile</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4">
          <div><Label>Sector</Label><Select value={sector} onValueChange={(v) => setSector(v as keyof typeof sectorRates)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
          {sector === 'Healthcare & Social Assistance' && <div><Label>Sub-sector</Label><Select value={subSector} onValueChange={setSubSector}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{healthcareSubSectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>}
          <div><Label>Headcount</Label><Input type="number" value={headcount} onChange={(e) => setHeadcount(Number(e.target.value))} /></div>
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

      <Card><CardHeader><CardTitle>Mitigation checklist</CardTitle></CardHeader><CardContent className="space-y-2">{checklist.map((item) => <p key={item.name}>• {item.name} ({item.impact}% est.) — {item.source}</p>)}</CardContent></Card>

      <ToolDisclaimer toolName="Mental Health Claims Surge Forecaster" paramDate="2025-12" text="Model output is decision support only and not legal advice." />
    </div>
  );
}
