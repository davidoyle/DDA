import { useMemo, useState } from 'react';

type FirmSize = 'small' | 'mid' | 'large';
type Sector = 'construction' | 'mining' | 'tech' | 'retail' | 'manufacturing' | 'finance' | 'other';
type ResponseScenario = 'low' | 'medium' | 'high';
type BundlingMode = 'low' | 'base' | 'high';

type ServiceRow = {
  id: 'acct' | 'aeg' | 're' | 'sec';
  label: string;
  rate: number;
  taxableShare: number | null;
};

const SECTOR_DATA: Record<Sector, { label: string; passthroughSmall: number; passthroughMid: number; passthroughLarge: number }> = {
  construction: { label: 'Construction & Real Estate Development', passthroughLarge: 0.9, passthroughMid: 0.75, passthroughSmall: 0.52 },
  mining: { label: 'Mining & Natural Resources', passthroughLarge: 0.92, passthroughMid: 0.78, passthroughSmall: 0.55 },
  tech: { label: 'Technology & Professional Services', passthroughLarge: 0.65, passthroughMid: 0.55, passthroughSmall: 0.4 },
  retail: { label: 'Retail', passthroughLarge: 0.6, passthroughMid: 0.5, passthroughSmall: 0.35 },
  manufacturing: { label: 'Manufacturing', passthroughLarge: 0.7, passthroughMid: 0.6, passthroughSmall: 0.42 },
  finance: { label: 'Finance & Insurance', passthroughLarge: 0.8, passthroughMid: 0.68, passthroughSmall: 0.48 },
  other: { label: 'Other Services', passthroughLarge: 0.52, passthroughMid: 0.44, passthroughSmall: 0.32 },
};

const BUNDLING: Record<BundlingMode, number> = { low: 0.3, base: 0.42, high: 0.52 };
const COMPLIANCE_COST: Record<FirmSize, number> = { small: 4650, mid: 13500, large: 28000 };

const SERVICES: ServiceRow[] = [
  { id: 'acct', label: 'Accounting & Bookkeeping', rate: 0.07, taxableShare: 0.92 },
  { id: 'aeg', label: 'Architecture / Engineering / Geoscience', rate: 0.07, taxableShare: null },
  { id: 're', label: 'Commercial Real Estate', rate: 0.07, taxableShare: 0.85 },
  { id: 'sec', label: 'Security Services', rate: 0.07, taxableShare: 1 },
];

const money = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

const BCPSTDiagnosticPage = () => {
  const [sector, setSector] = useState<Sector>('construction');
  const [firmSize, setFirmSize] = useState<FirmSize>('small');
  const [bundling, setBundling] = useState<BundlingMode>('base');
  const [response, setResponse] = useState<ResponseScenario>('low');
  const [acct, setAcct] = useState(0);
  const [aeg, setAeg] = useState(0);
  const [re, setRe] = useState(0);
  const [sec, setSec] = useState(0);
  const [ran, setRan] = useState(false);

  const calc = useMemo(() => {
    const passThrough =
      firmSize === 'small' ? SECTOR_DATA[sector].passthroughSmall : firmSize === 'mid' ? SECTOR_DATA[sector].passthroughMid : SECTOR_DATA[sector].passthroughLarge;

    const spends = { acct, aeg, re, sec };
    const totalSpend = Object.values(spends).reduce((a, b) => a + b, 0);

    const rows = SERVICES.map((svc) => {
      const spend = spends[svc.id];
      const taxableShare = svc.id === 'aeg' ? BUNDLING[bundling] : svc.taxableShare ?? 0;
      const pst = spend * taxableShare * svc.rate;
      const netCost = pst * (1 - passThrough);
      const effRate = spend > 0 ? (pst / spend) * 100 : 0;
      return { ...svc, spend, pst, netCost, effRate };
    }).filter((r) => r.spend > 0);

    const totalPST = rows.reduce((a, r) => a + r.pst, 0);
    const totalNetCost = rows.reduce((a, r) => a + r.netCost, 0);
    const pctOfSpend = totalSpend > 0 ? (totalPST / totalSpend) * 100 : 0;
    const year1Impact = totalPST + COMPLIANCE_COST[firmSize];
    const erosion = { low: 0.075, medium: 0.175, high: 0.275 };

    const risks: Array<{ level: 'high' | 'medium' | 'low'; title: string; text: string }> = [];
    if (pctOfSpend > 5) {
      risks.push({ level: 'high', title: 'High margin compression risk', text: 'PST exceeds 5% of professional services spend.' });
    } else if (pctOfSpend > 2.5) {
      risks.push({ level: 'medium', title: 'Moderate margin pressure', text: 'PST is 2.5–5% of professional services spend.' });
    } else {
      risks.push({ level: 'low', title: 'Lower direct exposure', text: 'PST is under 2.5% of professional services spend.' });
    }

    return { passThrough, totalSpend, rows, totalPST, totalNetCost, pctOfSpend, year1Impact, erosion, risks };
  }, [acct, aeg, bundling, firmSize, re, sec, sector]);

  const onRun = () => {
    if (calc.totalSpend === 0) return;
    setRan(true);
  };

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-10 border-b border-[#F3EFE6]/15">
        <p className="eyebrow">BC Business Council — Policy Tools</p>
        <h1 className="headline-lg max-w-4xl">BC PST Impact Diagnostic</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-4">
          Quantify the cost of BC&apos;s October 2026 PST expansion on professional services.
        </p>
      </section>

      <section className="px-6 lg:px-[8vw] py-10 space-y-8 border-b border-[#F3EFE6]/10">
        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">Industry sector</span>
            <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={sector} onChange={(e) => setSector(e.target.value as Sector)}>
              {Object.entries(SECTOR_DATA).map(([key, value]) => <option key={key} value={key} className="text-[#0B3C43]">{value.label}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">Firm size</span>
            <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={firmSize} onChange={(e) => setFirmSize(e.target.value as FirmSize)}>
              <option value="small" className="text-[#0B3C43]">Small — under $2M revenue</option>
              <option value="mid" className="text-[#0B3C43]">Mid-size — $2M–$20M revenue</option>
              <option value="large" className="text-[#0B3C43]">Large — over $20M revenue</option>
            </select>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Accounting & Bookkeeping', value: acct, setter: setAcct },
            { label: 'Architecture / Engineering / Geoscience', value: aeg, setter: setAeg },
            { label: 'Commercial Real Estate', value: re, setter: setRe },
            { label: 'Security & Investigation Services', value: sec, setter: setSec },
          ].map(({ label, value, setter }) => (
            <label key={label} className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">{label}</span>
              <input type="number" min={0} value={value} onChange={(e) => setter(Number(e.target.value) || 0)} className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" />
            </label>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">AEG bundling assumption</span>
            <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={bundling} onChange={(e) => setBundling(e.target.value as BundlingMode)}>
              <option value="base" className="text-[#0B3C43]">Base case — 60–70% bundling persistence</option>
              <option value="low" className="text-[#0B3C43]">Low — full unbundling</option>
              <option value="high" className="text-[#0B3C43]">High — full bundling persistence</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">Behavioural response scenario</span>
            <select className="w-full rounded-lg bg-[#F3EFE6]/8 border border-[#F3EFE6]/20 px-4 py-3" value={response} onChange={(e) => setResponse(e.target.value as ResponseScenario)}>
              <option value="low" className="text-[#0B3C43]">Low</option>
              <option value="medium" className="text-[#0B3C43]">Medium</option>
              <option value="high" className="text-[#0B3C43]">High</option>
            </select>
          </label>
        </div>

        <button onClick={onRun} className="btn-primary">Run Diagnostic</button>
        {ran && calc.totalSpend === 0 ? <p className="text-red-300 text-sm">Please enter at least one service spend amount.</p> : null}
      </section>

      {ran && calc.totalSpend > 0 ? (
        <section className="px-6 lg:px-[8vw] py-10 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <article className="card"><p className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">Annual PST cost</p><p className="font-heading text-3xl text-[#D4A03A] mt-2">{money(calc.totalPST)}</p></article>
            <article className="card"><p className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">% of services spend</p><p className="font-heading text-3xl mt-2">{calc.pctOfSpend.toFixed(1)}%</p></article>
            <article className="card"><p className="font-mono text-xs uppercase tracking-[0.1em] text-[#F3EFE6]/70">Year 1 total impact</p><p className="font-heading text-3xl text-[#D4A03A] mt-2">{money(calc.year1Impact)}</p></article>
          </div>

          <article className="card overflow-x-auto">
            <h2 className="font-heading text-2xl mb-4">PST Cost Breakdown by Service</h2>
            <table className="w-full min-w-[760px] text-sm">
              <thead><tr className="border-b border-[#F3EFE6]/20"><th className="text-left py-2">Service</th><th className="text-left py-2">Spend</th><th className="text-left py-2">Effective Rate</th><th className="text-left py-2">PST Cost</th><th className="text-left py-2">Net Cost</th></tr></thead>
              <tbody>
                {calc.rows.map((r) => (
                  <tr key={r.id} className="border-b border-[#F3EFE6]/10"><td className="py-2">{r.label}</td><td>{money(r.spend)}</td><td>{r.effRate.toFixed(2)}%</td><td>{money(r.pst)}</td><td>{money(r.netCost)}</td></tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="card">
            <h2 className="font-heading text-2xl mb-4">Behavioural Response: Revenue Scenarios</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {(['low', 'medium', 'high'] as ResponseScenario[]).map((key) => {
                const erosion = calc.erosion[key];
                const remaining = calc.totalPST * (1 - erosion);
                return <div key={key} className={`rounded-lg border p-3 ${response === key ? 'border-[#D4A03A]' : 'border-[#F3EFE6]/20'}`}><p className="font-mono text-xs uppercase">{key} response</p><p className="font-heading text-2xl mt-2">{money(remaining)}</p><p className="text-xs text-[#F3EFE6]/70 mt-1">{(erosion * 100).toFixed(1)}% erosion</p></div>;
              })}
            </div>
          </article>

          <article className="card">
            <h2 className="font-heading text-2xl mb-4">Risk Flags</h2>
            <div className="space-y-2">
              {calc.risks.map((risk) => <div key={risk.title} className="rounded-lg border border-[#F3EFE6]/20 px-3 py-2"><p className="font-semibold">{risk.title}</p><p className="text-sm text-[#F3EFE6]/75">{risk.text}</p></div>)}
            </div>
          </article>
        </section>
      ) : null}
    </div>
  );
};

export default BCPSTDiagnosticPage;
