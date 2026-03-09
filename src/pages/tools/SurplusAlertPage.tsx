import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { fundedRatioHistory, scenarios, thresholds } from '@/lib/tools/surplus-alert-config';

export default function SurplusAlertPage() {
  const [payroll, setPayroll] = useState(0);
  const [email, setEmail] = useState('');
  const [t135, setT135] = useState(true);
  const [t130, setT130] = useState(true);
  const baseProjection = useMemo(() => {
    const start = fundedRatioHistory[fundedRatioHistory.length - 1].ratio;
    return Array.from({ length: 3 }, (_, i) => ({ year: i + 1, ratio: start - scenarios.base.annualErosion * (i + 1) }));
  }, []);

  const breach = baseProjection.find((p) => p.ratio <= 135);
  const impact135 = payroll > 0 ? payroll * 0.0025 : 0;
  const impact130 = payroll > 0 ? payroll * 0.0045 : 0;

  return (
    <div className="px-6 lg:px-[8vw] py-12 space-y-6">
      <h1 className="headline-md">Surplus Run-Down Early-Warning Alert Service</h1>
      <Card><CardHeader><CardTitle>Current status</CardTitle></CardHeader><CardContent>Published funded ratio: {fundedRatioHistory[fundedRatioHistory.length - 1].ratio}%. Thresholds: {thresholds.join('% / ')}%.</CardContent></Card>
      <Card><CardHeader><CardTitle>Threshold alert</CardTitle></CardHeader><CardContent>{breach ? `Amber alert: base-case projects a 135% breach in ~${breach.year} year(s).` : 'No alert — both thresholds unbreached in base case.'}</CardContent></Card>
      <Card><CardHeader><CardTitle>Industry impact estimate (optional)</CardTitle></CardHeader><CardContent className="space-y-2"><Label>Assessable payroll</Label><Input type="number" value={payroll} onChange={(e) => setPayroll(Number(e.target.value))} className="max-w-xs" /><p>Estimated dollar impact at 135%: ${impact135.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p><p>Estimated dollar impact at 130%: ${impact130.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Phase 2 email waitlist</CardTitle></CardHeader><CardContent className="space-y-3"><div className="flex items-center gap-2"><Switch checked={t135} onCheckedChange={setT135} /><Label>Alert me at 135%</Label></div><div className="flex items-center gap-2"><Switch checked={t130} onCheckedChange={setT130} /><Label>Alert me at 130%</Label></div><Input placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="max-w-sm" /><button className="btn-primary" onClick={() => { if (email) localStorage.setItem('surplus-alert-email', email); }}>Join waitlist</button></CardContent></Card>
      <ToolDisclaimer toolName="Surplus Early-Warning Dashboard" paramDate="2025-12" text="Projection uses public funded-ratio history and modeled proxies; threshold timing is not guaranteed." />
    </div>
  );
}
