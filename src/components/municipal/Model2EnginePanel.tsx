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

  const handleExportModel2Csv = () => {
    const header = ['model1Scenario','plan','planLabel','totalLand','infraCost','housingPressure','efficiency','status','residentialCapacity','employmentCapacity','servicedCapacity','jobsHousingBalance'];
    const rows = results.map((r) => [r.model1Scenario, r.plan, ALLOCATION_PLANS[r.plan].label, r.totalLand.toFixed(2), r.infraCost.toFixed(2), r.housingPressure.toFixed(3), r.efficiency.toFixed(3), r.status, r.flags.residentialCapacity, r.flags.employmentCapacity, r.flags.servicedCapacity, r.flags.jobsHousingBalance]);
    const csv = [header.join(','), ...rows.map((row) => row.join(','))].join('\n');
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
      <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#4a453d]">Model 2 — City-Wide Growth Scenario Engine</p>
          <Button variant="outline" className="border-[#cfc2ab]" onClick={handleExportModel2Csv}>Export Model 2 CSV</Button>
        </div>
        <p className="mt-2 text-sm text-[#5e574a]">Feasible-set view (trade-offs): x = total land, y = infrastructure cost, bubble size/color = housing pressure.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Uses Model 1 totals at horizon year {horizonYear}. Conservative min-density assumption may overstate land demand.</p>
        <p className="mt-1 text-xs text-[#6b6255]">Jobs-housing threshold: WARN &gt;15% deviation from unity, FAIL &gt;30%.</p>
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

            <div className="h-[220px]">
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
    </div>
  );
}
