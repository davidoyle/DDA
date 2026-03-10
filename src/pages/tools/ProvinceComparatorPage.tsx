import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EvidenceTier } from '@/components/shared/EvidenceTier';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { UpgradeModal } from '@/components/shared/UpgradeModal';
import { useLicense } from '@/hooks/useLicense';
import { provinceMeta, provinces, rates } from '@/lib/tools/province-comparator-config';

export default function ProvinceComparatorPage() {
  const { entitlements, updatePlan } = useLicense();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { provinceMeta, provinces, rates } from '@/lib/tools/province-comparator-config';

export default function ProvinceComparatorPage() {
  const [selected, setSelected] = useState<string[]>(['BC', 'Alberta', 'Ontario']);
  const [year, setYear] = useState<2024 | 2025 | 2026>(2026);
  const [payroll, setPayroll] = useState(5_000_000);

  const rows = useMemo(() => selected.map((province) => {
    const currentRate = rates[province as keyof typeof rates][year];
    const avg3 = (rates[province as keyof typeof rates][2024] + rates[province as keyof typeof rates][2025] + rates[province as keyof typeof rates][2026]) / 3;
    const meta = provinceMeta[province as keyof typeof provinceMeta];
    const annualCost = meta.unit === 'per-$100 payroll' ? (payroll * currentRate) / 100 : null;
    return { province, currentRate, avg3, annualCost, ...meta };
    const annualCost = (payroll * currentRate) / 100;
    return { province, currentRate, avg3, annualCost, ...provinceMeta[province as keyof typeof provinceMeta] };
  }), [selected, year, payroll]);

  return (
    <div className="px-6 lg:px-[8vw] py-12 space-y-6">
      <h1 className="headline-md">Multi-Province Surplus & Rate Comparator</h1>
      <div className="card">
        <Label>Annual assessable payroll</Label>
        <Input type="number" value={payroll} onChange={(e) => setPayroll(Number(e.target.value))} className="max-w-sm mt-2" />
        <div className="flex gap-2 mt-4">{([2024, 2025, 2026] as const).map((y) => <button key={y} className={`btn-secondary ${year === y ? 'border-[#D4A03A]' : ''}`} onClick={() => setYear(y)}>{y}</button>)}</div>
        <div className="flex flex-wrap gap-2 mt-4">{provinces.map((p) => <button key={p} className={`btn-secondary ${selected.includes(p) ? 'border-[#D4A03A]' : ''}`} onClick={() => setSelected((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p].slice(0, 5))}>{p}</button>)}</div>
      </div>
      <Card>
        <CardHeader><CardTitle>Summary comparison</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm"><thead><tr className="text-left"><th>Province</th><th>Rate</th><th>3y avg</th><th>Funded ratio</th><th>Surplus %</th><th>Unit</th><th>Cost</th></tr></thead><tbody>{rows.map((r) => <tr key={r.province} className="border-t border-[#F3EFE6]/10"><td>{r.province}</td><td>{r.currentRate.toFixed(2)}</td><td>{r.avg3.toFixed(2)}</td><td>{r.fundedRatio}%</td><td>{r.surplusPercentPayroll}%</td><td>{r.unit}</td><td>{r.annualCost === null ? 'N/A' : `$${r.annualCost.toLocaleString()}`}</td></tr>)}</tbody></table>
          <div className="mt-3 flex gap-2"><EvidenceTier tier="VERIFIED" /><EvidenceTier tier="MODELLED" /></div>
        </CardContent>
      </Card>
      {!entitlements.canViewBenchmarks && (
        <FeatureLock title="Benchmarking locked" message="Unlock cross-province benchmark and repricing risk drivers with Pro licensing." onUpgrade={() => setUpgradeOpen(true)} />
      )}
      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} onChoosePlan={(tier) => {
        updatePlan(tier);
        setUpgradeOpen(false);
      }} />
          <table className="w-full text-sm"><thead><tr className="text-left"><th>Province</th><th>Rate</th><th>3y avg</th><th>Funded ratio</th><th>Surplus %</th><th>Unit</th><th>Cost</th></tr></thead><tbody>{rows.map((r) => <tr key={r.province} className="border-t border-[#F3EFE6]/10"><td>{r.province}</td><td>{r.currentRate.toFixed(2)}</td><td>{r.avg3.toFixed(2)}</td><td>{r.fundedRatio}%</td><td>{r.surplusPercentPayroll}%</td><td>{r.unit}</td><td>${r.annualCost.toLocaleString()}</td></tr>)}</tbody></table>
          <div className="mt-3 flex gap-2"><EvidenceTier tier="VERIFIED" /><EvidenceTier tier="MODELLED" /></div>
        </CardContent>
      </Card>
      <ToolDisclaimer toolName="Multi-Province Comparator" paramDate="2026-01" text="Washington values are displayed in per-hour units and are not directly commensurate with per-$100 payroll without conversion assumptions." />
    </div>
  );
}
