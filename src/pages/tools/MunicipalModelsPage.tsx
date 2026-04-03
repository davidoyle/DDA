import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ScenarioKey = 'low' | 'med' | 'high';

type CityModel = {
  city: string;
  base: {
    pop2025: number;
    hhSize: number;
    jobs2021: number;
    econBase2021: number;
    vacancyTarget: number;
    replacementRate: number;
    pdaDensity: number;
    indDensity: number;
    svcDensity: number;
    indShare: number;
  };
  scenarios: Record<ScenarioKey, { pop2041: number; jobs2041: number; base2041: number; label: string; color: string }>;
};

const START_YEAR = 2025;

const CITY_MODELS: CityModel[] = [
  {
    city: 'Saint John',
    base: {
      pop2025: 132_800,
      hhSize: 2.1,
      jobs2021: 54_140,
      econBase2021: 11_170,
      vacancyTarget: 0.03,
      replacementRate: 0.004,
      pdaDensity: 40,
      indDensity: 15,
      svcDensity: 80,
      indShare: 0.36,
    },
    scenarios: {
      low: { pop2041: 142_900, jobs2041: 64_840, base2041: 12_900, label: 'Low', color: '#378ADD' },
      med: { pop2041: 147_800, jobs2041: 77_100, base2041: 14_800, label: 'Medium', color: '#639922' },
      high: { pop2041: 165_400, jobs2041: 96_600, base2041: 16_600, label: 'High', color: '#BA7517' },
    },
  },
  {
    city: 'Fredericton',
    base: {
      pop2025: 69_400,
      hhSize: 2.2,
      jobs2021: 34_400,
      econBase2021: 7_300,
      vacancyTarget: 0.03,
      replacementRate: 0.004,
      pdaDensity: 44,
      indDensity: 18,
      svcDensity: 84,
      indShare: 0.29,
    },
    scenarios: {
      low: { pop2041: 77_000, jobs2041: 40_900, base2041: 8_500, label: 'Low', color: '#378ADD' },
      med: { pop2041: 82_200, jobs2041: 45_800, base2041: 9_400, label: 'Medium', color: '#639922' },
      high: { pop2041: 90_600, jobs2041: 52_600, base2041: 10_700, label: 'High', color: '#BA7517' },
    },
  },
  {
    city: 'Moncton',
    base: {
      pop2025: 96_200,
      hhSize: 2.2,
      jobs2021: 45_700,
      econBase2021: 9_200,
      vacancyTarget: 0.03,
      replacementRate: 0.004,
      pdaDensity: 42,
      indDensity: 16,
      svcDensity: 78,
      indShare: 0.34,
    },
    scenarios: {
      low: { pop2041: 109_400, jobs2041: 53_400, base2041: 10_500, label: 'Low', color: '#378ADD' },
      med: { pop2041: 118_600, jobs2041: 61_900, base2041: 11_900, label: 'Medium', color: '#639922' },
      high: { pop2041: 129_200, jobs2041: 71_300, base2041: 13_600, label: 'High', color: '#BA7517' },
    },
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function project(city: CityModel, scenario: ScenarioKey, years: number) {
  const sc = city.scenarios[scenario];
  const base = city.base;
  let prevHH = base.pop2025 / base.hhSize;
  return Array.from({ length: years + 1 }, (_, i) => {
    const year = START_YEAR + i;
    const t = Math.min(i / 25, 1);
    const pop = Math.round(lerp(base.pop2025, sc.pop2041, t));
    const hh = Math.round(pop / base.hhSize);
    const newHH = i === 0 ? 0 : hh - prevHH;
    const vacAdj = Math.round(newHH * base.vacancyTarget);
    const replUnits = Math.round(hh * base.replacementRate);
    const unitsReq = Math.max(0, newHH + vacAdj + replUnits);
    const resHaCum = Math.round((hh - base.pop2025 / base.hhSize) / base.pdaDensity);
    const jobs = Math.round(lerp(base.jobs2021, sc.jobs2041, t));
    const econ = Math.round(lerp(base.econBase2021, sc.base2041, t));
    const indJobs = Math.round(econ * base.indShare);
    const svcJobs = econ - indJobs;
    const indHa = Math.round(indJobs / base.indDensity);
    const svcHa = Math.round(svcJobs / base.svcDensity);
    prevHH = hh;
    return { year, pop, hh, newHH: Math.max(0, newHH), unitsReq, resHaCum: Math.max(0, resHaCum), jobs, econ, indHa: indHa + svcHa };
  });
}

export default function MunicipalModelsPage() {
  const [city, setCity] = useState(CITY_MODELS[0]);
  const [scenario, setScenario] = useState<ScenarioKey>('med');
  const [horizon, setHorizon] = useState(25);

  const activeRows = useMemo(() => project(city, scenario, horizon), [city, scenario, horizon]);
  const last = activeRows[activeRows.length - 1];
  const allScenarioRows = useMemo(() => {
    return (['low', 'med', 'high'] as ScenarioKey[]).map((sc) => ({
      key: sc,
      label: city.scenarios[sc].label,
      color: city.scenarios[sc].color,
      rows: project(city, sc, horizon),
    }));
  }, [city, horizon]);

  const migrationRows = useMemo(() => {
    const annualPop = (city.scenarios[scenario].pop2041 - city.base.pop2025) / 16;
    return [
      { component: 'International immigration', annualAvg: Math.round(annualPop * 0.75) },
      { component: 'Interprovincial net', annualAvg: Math.round(annualPop * 0.15) },
      { component: 'Natural increase', annualAvg: Math.round(annualPop * 0.1) },
      { component: 'Total net', annualAvg: Math.round(annualPop) },
    ];
  }, [city, scenario]);

  return (
    <div className="diagnostic-theme min-h-screen bg-[#F7F1E6] px-6 py-12 lg:px-[6vw]">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <header className="space-y-3">
          <p className="eyebrow">Municipal models</p>
          <h1 className="headline-md text-[#1f1f1f]">Municipal Growth Models</h1>
          <p className="max-w-4xl text-[#4a453d]">Select a city to load its model inputs. Scenario, horizon, and tab views match the municipal planning workflow.</p>
        </header>

        <section className="rounded-xl border border-[#d8cdb9] bg-white p-5">
          <p className="mb-3 text-sm font-medium text-[#1f1f1f]">City</p>
          <div className="flex flex-wrap gap-2">
            {CITY_MODELS.map((entry) => (
              <Button
                key={entry.city}
                variant="outline"
                className={cn('border-[#cfc2ab] text-[#4a453d]', city.city === entry.city && 'bg-[#1f3a5f] text-white hover:bg-[#1f3a5f] hover:text-white')}
                onClick={() => setCity(entry)}
              >
                {entry.city}
              </Button>
            ))}
          </div>
        </section>

        <section className="grid gap-4 rounded-xl border border-[#d8cdb9] bg-white p-5 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#6b6255]">Scenario</p>
            <div className="flex gap-2">
              {(['low', 'med', 'high'] as ScenarioKey[]).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  className={cn('border-[#cfc2ab]', scenario === key && 'bg-[#1f1f1f] text-white hover:bg-[#1f1f1f]')}
                  onClick={() => setScenario(key)}
                >
                  {city.scenarios[key].label}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.08em] text-[#6b6255]">Horizon ({START_YEAR + horizon})</p>
            <Slider min={5} max={25} step={5} value={[horizon]} onValueChange={(value) => setHorizon(value[0] ?? 25)} />
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: `Population ${START_YEAR + horizon}`, value: last.pop.toLocaleString(), sub: city.scenarios[scenario].label + ' scenario' },
            { label: 'Total households', value: last.hh.toLocaleString(), sub: `at ${city.base.hhSize} persons/hh` },
            { label: 'Cumulative res land', value: `${last.resHaCum} ha`, sub: `@ ${city.base.pdaDensity} u/net ha` },
            { label: 'Total jobs', value: last.jobs.toLocaleString(), sub: `econ base: ${last.econ.toLocaleString()}` },
          ].map((metric) => (
            <article key={metric.label} className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="text-xs text-[#6b6255]">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold text-[#1f1f1f]">{metric.value}</p>
              <p className="text-xs text-[#6b6255]">{metric.sub}</p>
            </article>
          ))}
        </section>

        <Tabs defaultValue="population" className="space-y-4">
          <TabsList className="h-auto w-full flex-wrap justify-start bg-white p-1">
            <TabsTrigger value="population">Population</TabsTrigger>
            <TabsTrigger value="housing">Housing</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="land">Land demand</TabsTrigger>
            <TabsTrigger value="summary">Full table</TabsTrigger>
          </TabsList>

          <TabsContent value="population" className="space-y-4">
            <div className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-3 text-sm font-medium text-[#4a453d]">Population — annual projection, all scenarios</p>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" type="number" domain={[START_YEAR, START_YEAR + horizon]} allowDecimals={false} />
                    <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    {allScenarioRows.map((sc) => (
                      <Line key={sc.key} data={sc.rows} dataKey="pop" name={sc.label} stroke={sc.color} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Migration components</p>
                <table className="w-full text-sm">
                  <tbody>
                    {migrationRows.map((row) => (
                      <tr key={row.component} className="border-b border-[#efe4d1] last:border-b-0">
                        <td className="py-2">{row.component}</td>
                        <td className="py-2 text-right">+{row.annualAvg.toLocaleString()}/yr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Age structure shift (active scenario)</p>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: '0–14', value: 13 },
                      { name: '15–24', value: 11 },
                      { name: '25–44', value: 26 },
                      { name: '45–64', value: 27 },
                      { name: '65+', value: scenario === 'high' ? 26 : scenario === 'low' ? 29 : 28 },
                    ]}>
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
          </TabsContent>

          <TabsContent value="housing" className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-3 text-sm font-medium text-[#4a453d]">Housing demand — units required annually</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activeRows}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="newHH" stackId="a" fill="#5DCAA5" />
                    <Bar dataKey="unitsReq" stackId="a" fill="#AFA9EC" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>
            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-3 text-sm font-medium text-[#4a453d]">Unit mix (active scenario)</p>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ name: 'Owner-occupied', value: 58 }, { name: 'Rental', value: 42 }]} dataKey="value" nameKey="name" innerRadius={65} outerRadius={100}>
                      <Cell fill="#1D9E75" />
                      <Cell fill="#AFA9EC" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </article>
          </TabsContent>

          <TabsContent value="employment" className="rounded-xl border border-[#d8cdb9] bg-white p-4">
            <p className="mb-3 text-sm font-medium text-[#4a453d]">Employment — total jobs by scenario</p>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" type="number" domain={[START_YEAR, START_YEAR + horizon]} allowDecimals={false} />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  {allScenarioRows.map((sc) => (
                    <Line key={sc.key} data={sc.rows} dataKey="jobs" name={sc.label} stroke={sc.color} strokeWidth={2} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="land" className="rounded-xl border border-[#d8cdb9] bg-white p-4">
            <p className="mb-3 text-sm font-medium text-[#4a453d]">Land demand — cumulative hectares required</p>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeRows}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => `${v} ha`} />
                  <Tooltip />
                  <Bar dataKey="resHaCum" fill="#5DCAA5" />
                  <Bar dataKey="indHa" fill="#EF9F27" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="rounded-xl border border-[#d8cdb9] bg-white p-4">
            <p className="mb-3 text-sm font-medium text-[#4a453d]">Full 5-year projection table — active scenario</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
                    {['Year', 'Population', 'Households', 'New HH/yr', 'Units req/yr', 'Res ha (cum)', 'Total jobs', 'Econ base jobs', 'Ind+comm ha (cum)'].map((head) => (
                      <th key={head} className="px-2 py-2">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeRows.filter((_, idx) => idx % 5 === 0).map((row) => (
                    <tr key={row.year} className="border-b border-[#efe4d1] last:border-b-0">
                      <td className="px-2 py-2 font-medium">{row.year}</td>
                      <td className="px-2 py-2 text-right">{row.pop.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.hh.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.newHH.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.unitsReq.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.resHaCum.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.jobs.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.econ.toLocaleString()}</td>
                      <td className="px-2 py-2 text-right">{row.indHa.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
