import { useDeferredValue, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '@/components/ui/button';
import { ALLOCATION_PLANS, runModel2Engine, type CityZoneConfig, type Model1Snapshot, type Model2Result, type ScenarioKey, type ScenarioPlanCode } from '@/lib/tools/model2-engine';

type Props = {
  cityLabel: string;
  horizonYear: number;
  snapshots: Model1Snapshot[];
  zones: CityZoneConfig;
};

export function Model2EnginePanel({ cityLabel, horizonYear, snapshots, zones }: Props) {
  const deferredSnapshots = useDeferredValue(snapshots);
  const results = useMemo(() => runModel2Engine(deferredSnapshots, zones), [deferredSnapshots, zones]);
  const baselineSnapshot = deferredSnapshots.find((s) => s.model1Scenario === 'med') ?? deferredSnapshots[0];
  const baselineResults = useMemo(
    () => results.filter((r) => r.model1Scenario === (baselineSnapshot?.model1Scenario ?? 'med')),
    [results, baselineSnapshot],
  );
  const hasCapacityFail = useMemo(
    () => results.some((r) => r.utilizations.residential > 1 || r.utilizations.employment > 1 || r.utilizations.serviced > 1),
    [results],
  );
  const areaLabel: Record<'G1' | 'G2' | 'G3', string> = {
    G1: 'Central Peninsula (Core)',
    G2: 'North End / Infill',
    G3: 'Other PDA / Expansion',
  };
  const planName: Record<ScenarioPlanCode, string> = { A: 'Uptown Concentration', B: 'Distributed Growth', C: 'Greenfield / Emerging' };
  const minLand = Math.min(...baselineResults.map((r) => r.totalLand));
  const maxLand = Math.max(...baselineResults.map((r) => r.totalLand));
  const minCost = Math.min(...baselineResults.map((r) => r.infraCost));
  const maxCost = Math.max(...baselineResults.map((r) => r.infraCost));
  const minPressure = Math.min(...baselineResults.map((r) => r.housingPressure));
  const maxPressure = Math.max(...baselineResults.map((r) => r.housingPressure));

  const relativeBand = (value: number, low: number, high: number): 'Low' | 'Medium' | 'High' => {
    if (Math.abs(value - low) < 1e-9) return 'Low';
    if (Math.abs(value - high) < 1e-9) return 'High';
    return 'Medium';
  };

  const handleExportModel2Csv = () => {
    const header = ['model1Scenario','plan','planLabel','totalLand','infraCost','housingPressure','efficiency','status','residentialCapacity','employmentCapacity','servicedCapacity','jobsHousingBalance'];
    const rows = results.map((r) => [r.model1Scenario, r.plan, ALLOCATION_PLANS[r.plan].label, r.totalLand.toFixed(2), r.infraCost.toFixed(2), r.housingPressure.toFixed(3), r.efficiency.toFixed(3), r.status, r.flags.residentialCapacity, r.flags.employmentCapacity, r.flags.servicedCapacity, r.flags.jobsHousingBalance]);
    const metadata = [
      `# City: ${cityLabel}`,
      `# Horizon: ${horizonYear}`,
      `# Export date: ${new Date().toISOString().slice(0, 10)}`,
      '# PASS = <=90% utilization, WARN = >90%-100%, FAIL = >100%',
      '# Jobs-housing threshold: WARN >15% deviation, FAIL >30%',
      '# Employment density is fixed (jobs/ha), unlike residential min/max density bands.',
      '# Serviced capacity check uses per-zone utilization (stricter than aggregate-only checks).',
      '# Efficiency = (units + jobs) / total land; this is a comparative index, not a welfare score.',
      '',
    ].join('\n');
    const csv = `${metadata}${[header.join(','), ...rows.map((row) => row.join(','))].join('\n')}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cityLabel.toLowerCase().replace(/\s+/g, '-')}-model2-scenarios.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <article id="model2-zone-split" className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#4a453d]">Model 2 — City-Wide Growth Scenario Engine</p>
          <Button variant="outline" className="border-[#cfc2ab]" onClick={handleExportModel2Csv}>Export Model 2 CSV</Button>
        </div>
        {hasCapacityFail && (
          <p className="mt-3 rounded-md border border-[#B42318]/40 bg-[#FEF3F2] px-3 py-2 text-xs text-[#912018]">
            Warning: at least one scenario exceeds capacity (&gt;100% utilization) in residential, employment, or serviced land.
          </p>
        )}
        <p className="mt-2 text-sm text-[#5e574a]">Feasible-set view (trade-offs): x = total land, y = infrastructure cost, bubble size/color = housing pressure.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Uses Model 1 totals at horizon year {horizonYear}. Conservative min-density assumption may overstate land demand.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Employment utilization uses fixed jobs/ha (no min/max band), while residential uses min/max density bands.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Serviced-capacity status is checked per zone (stricter than aggregate-only checks).</p>
        <p className="mt-1 text-xs text-[#6b6255]">Efficiency is a comparative index: (units + jobs) / total land.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Jobs-housing threshold: WARN &gt;15% deviation from unity, FAIL &gt;30%.</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-[#6b6255]">
          <span className="font-medium">Bubble size legend:</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#639922]/70" /> lower pressure</span>
          <span className="inline-flex items-center gap-2"><span className="inline-block h-4 w-4 rounded-full bg-[#639922]/70" /> higher pressure</span>
        </div>
        <div className="mt-2 grid gap-1 text-xs text-[#6b6255]">
          <p id="model2-utotal"><strong>U_total:</strong> total required housing units from Model 1.</p>
          <p id="model2-etotal"><strong>E_total:</strong> total jobs from Model 1.</p>
          <p id="model2-htotal"><strong>H_total:</strong> total households from Model 1.</p>
          <p id="model2-lambda"><strong>λ (lambda):</strong> workers per household used in jobs-housing balancing.</p>
        </div>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">1) Executive summary</p>
        <p className="text-sm text-[#5e574a]">
          Three scenarios allocate the same Model 1 totals with different spatial distributions. At the {baselineSnapshot?.model1Scenario.toUpperCase()} baseline,
          Scenario A is typically lowest land/high pressure, B is balanced, and C is highest land/high infrastructure burden.
        </p>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">2) Inputs (locked from Model 1)</p>
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-b border-[#efe4d1]"><td className="py-2">Total households</td><td className="py-2 text-right">{baselineSnapshot?.households.toLocaleString() ?? '—'}</td></tr>
            <tr className="border-b border-[#efe4d1]"><td className="py-2">Total units required</td><td className="py-2 text-right">{baselineSnapshot?.unitsRequired.toLocaleString() ?? '—'}</td></tr>
            <tr><td className="py-2">Total jobs</td><td className="py-2 text-right">{baselineSnapshot?.jobs.toLocaleString() ?? '—'}</td></tr>
          </tbody>
        </table>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">3) Scenario definitions</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-[#5e574a]">
          <li><strong>A — Uptown Concentration:</strong> 70–85% core-oriented allocation, high density, minimal greenfield.</li>
          <li><strong>B — Distributed Growth:</strong> mixed core/infill distribution at moderate density.</li>
          <li><strong>C — Greenfield / Emerging:</strong> larger outer-area share, lower density, highest land consumption risk.</li>
        </ul>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4 overflow-x-auto">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">4.1) Residential allocation table</p>
        <table className="w-full min-w-[980px] text-sm">
          <thead>
            <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
              <th className="px-2 py-2">Scenario</th><th className="px-2 py-2">Area</th><th className="px-2 py-2">% Allocation</th><th className="px-2 py-2">Units</th><th className="px-2 py-2">Density (u/ha)</th><th className="px-2 py-2">Land (ha)</th>
            </tr>
          </thead>
          <tbody>
            {(['A', 'B', 'C'] as ScenarioPlanCode[]).flatMap((plan) => {
              const row = baselineResults.find((r) => r.plan === plan);
              if (!row) return [];
              return (['G1', 'G2', 'G3'] as const).map((zone) => (
                <tr key={`${plan}-${zone}`} className="border-b border-[#efe4d1] last:border-b-0">
                  <td className="px-2 py-2">{planName[plan]}</td>
                  <td className="px-2 py-2">{areaLabel[zone]}</td>
                  <td className="px-2 py-2">{(ALLOCATION_PLANS[plan].residential[zone] * 100).toFixed(0)}%</td>
                  <td className="px-2 py-2">{Math.round(row.unitsByZone[zone]).toLocaleString()}</td>
                  <td className="px-2 py-2">{zones[zone].minDensity}–{zones[zone].maxDensity}</td>
                  <td className="px-2 py-2">{row.residentialLandByZone[zone].toFixed(1)}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4 overflow-x-auto">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">4.2) Employment allocation table</p>
        <table className="w-full min-w-[880px] text-sm">
          <thead>
            <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
              <th className="px-2 py-2">Scenario</th><th className="px-2 py-2">Area</th><th className="px-2 py-2">Jobs</th><th className="px-2 py-2">Land (ha)</th><th className="px-2 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {(['A', 'B', 'C'] as ScenarioPlanCode[]).flatMap((plan) => {
              const row = baselineResults.find((r) => r.plan === plan);
              if (!row) return [];
              return (['G1', 'G2', 'G3'] as const).map((zone) => (
                <tr key={`${plan}-jobs-${zone}`} className="border-b border-[#efe4d1] last:border-b-0">
                  <td className="px-2 py-2">{planName[plan]}</td>
                  <td className="px-2 py-2">{areaLabel[zone]}</td>
                  <td className="px-2 py-2">{Math.round(row.jobsByZone[zone]).toLocaleString()}</td>
                  <td className="px-2 py-2">{row.employmentLandByZone[zone].toFixed(1)}</td>
                  <td className="px-2 py-2">{zone === 'G1' ? 'Office / services' : zone === 'G2' ? 'Mixed employment' : 'Industrial / expansion'}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </article>

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">Feasible set geometry</p>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="totalLand" name="Total land" unit=" ha" />
              <YAxis dataKey="infraCost" name="Infra cost" />
              <ZAxis dataKey="housingPressure" range={[80, 360]} name="Housing pressure" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value: number, name: string) => [typeof value === 'number' ? value.toFixed(2) : value, name]} />
              <Scatter data={results} fill="#639922" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </article>

      {(['low', 'med', 'high'] as ScenarioKey[]).map((model1) => {
        const rows = results.filter((result) => result.model1Scenario === model1);
        const chartData = (['A', 'B', 'C'] as ScenarioPlanCode[]).map((plan) => {
          const r = rows.find((entry) => entry.plan === plan);
          return {
            plan,
            land: r?.totalLand ?? 0,
            infra: r?.infraCost ?? 0,
            pressure: r?.housingPressure ?? 0,
            resUtil: r?.utilizations.residential ?? 0,
            empUtil: r?.utilizations.employment ?? 0,
            srvUtil: r?.utilizations.serviced ?? 0,
          };
        });

        return (
          <article key={model1} className="rounded-xl border border-[#d8cdb9] bg-white p-4 space-y-4">
            <p className="text-sm font-medium text-[#4a453d]">Model 1 Scenario: {model1.toUpperCase()}</p>

            <div id="model2-utilization" className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="plan" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="land" fill="#5DCAA5" name="Total land (ha)" />
                  <Bar dataKey="infra" fill="#EF9F27" name="Infra cost index" />
                  <Bar dataKey="pressure" fill="#AFA9EC" name="Housing pressure" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="plan" />
                  <YAxis domain={[0, 1.2]} />
                  <ReferenceLine y={0.9} stroke="#BA7517" strokeDasharray="4 4" />
                  <ReferenceLine y={1} stroke="#B42318" strokeDasharray="4 4" />
                  <Tooltip formatter={(v: number) => `${(v * 100).toFixed(1)}%`} />
                  <Bar dataKey="resUtil" fill="#378ADD" name="Residential utilization" />
                  <Bar dataKey="empUtil" fill="#639922" name="Employment utilization" />
                  <Bar dataKey="srvUtil" fill="#BA7517" name="Serviced utilization" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-sm">
                <thead>
                  <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
                    <th className="px-2 py-2">Metric</th><th className="px-2 py-2">A</th><th className="px-2 py-2">B</th><th className="px-2 py-2">C</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'units', label: 'Units by zone (G1/G2/G3)', render: (r: Model2Result) => `${Math.round(r.unitsByZone.G1).toLocaleString()} / ${Math.round(r.unitsByZone.G2).toLocaleString()} / ${Math.round(r.unitsByZone.G3).toLocaleString()}` },
                    { key: 'jobs', label: 'Jobs by zone (G1/G2/G3)', render: (r: Model2Result) => `${Math.round(r.jobsByZone.G1).toLocaleString()} / ${Math.round(r.jobsByZone.G2).toLocaleString()} / ${Math.round(r.jobsByZone.G3).toLocaleString()}` },
                    { key: 'land', label: 'Total land (ha)', render: (r: Model2Result) => r.totalLand.toFixed(1) },
                    { key: 'cost', label: 'Infra cost index', render: (r: Model2Result) => r.infraCost.toFixed(1) },
                    { key: 'pressure', label: 'Housing pressure', render: (r: Model2Result) => r.housingPressure.toFixed(2) },
                    { key: 'eff', label: 'Efficiency', render: (r: Model2Result) => r.efficiency.toFixed(1) },
                    { key: 'status', label: 'Capacity status', render: (r: Model2Result) => r.status },
                  ].map((metric) => (
                    <tr key={metric.key} className="border-b border-[#efe4d1] last:border-b-0">
                      <td className="px-2 py-2">{metric.label}</td>
                      {(['A','B','C'] as ScenarioPlanCode[]).map((plan) => {
                        const result = rows.find((row) => row.plan === plan);
                        return <td key={plan} className="px-2 py-2">{result ? metric.render(result) : '—'}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        );
      })}

      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4 overflow-x-auto">
        <p className="mb-2 text-sm font-medium text-[#4a453d]">10) Comparative summary table (decision)</p>
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
              <th className="px-2 py-2">Metric</th><th className="px-2 py-2">Scenario A</th><th className="px-2 py-2">Scenario B</th><th className="px-2 py-2">Scenario C</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#efe4d1]"><td className="px-2 py-2">Units delivered</td><td className="px-2 py-2">=</td><td className="px-2 py-2">=</td><td className="px-2 py-2">=</td></tr>
            <tr className="border-b border-[#efe4d1]"><td className="px-2 py-2">Land consumed</td>{(['A','B','C'] as ScenarioPlanCode[]).map((plan) => {
              const r = baselineResults.find((x) => x.plan === plan); return <td key={plan} className="px-2 py-2">{r ? relativeBand(r.totalLand, minLand, maxLand) : '—'}</td>;
            })}</tr>
            <tr className="border-b border-[#efe4d1]"><td className="px-2 py-2">Infrastructure cost</td>{(['A','B','C'] as ScenarioPlanCode[]).map((plan) => {
              const r = baselineResults.find((x) => x.plan === plan); return <td key={plan} className="px-2 py-2">{r ? relativeBand(r.infraCost, minCost, maxCost) : '—'}</td>;
            })}</tr>
            <tr className="border-b border-[#efe4d1]"><td className="px-2 py-2">Housing pressure</td>{(['A','B','C'] as ScenarioPlanCode[]).map((plan) => {
              const r = baselineResults.find((x) => x.plan === plan); return <td key={plan} className="px-2 py-2">{r ? relativeBand(r.housingPressure, minPressure, maxPressure) : '—'}</td>;
            })}</tr>
            <tr className="border-b border-[#efe4d1]"><td className="px-2 py-2">Feasibility</td>{(['A','B','C'] as ScenarioPlanCode[]).map((plan) => {
              const r = baselineResults.find((x) => x.plan === plan); return <td key={plan} className="px-2 py-2">{r?.status ?? '—'}</td>;
            })}</tr>
            <tr><td className="px-2 py-2">Risk type</td><td className="px-2 py-2">Market</td><td className="px-2 py-2">Coordination</td><td className="px-2 py-2">Fiscal</td></tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}
