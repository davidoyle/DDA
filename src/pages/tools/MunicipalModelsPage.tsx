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
  province: string;
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

type ModelControls = {
  hhSize: number;
  vacancyTarget: number;
  replacementRate: number;
  pdaDensity: number;
  indShare: number;
  scenarioMultiplier: Record<ScenarioKey, number>;
};

const START_YEAR = 2025;

const CITY_MODELS: CityModel[] = [
  {
    province: 'New Brunswick',
    city: 'Saint John',
    base: { pop2025: 132_800, hhSize: 2.1, jobs2021: 54_140, econBase2021: 11_170, vacancyTarget: 0.03, replacementRate: 0.004, pdaDensity: 40, indDensity: 15, svcDensity: 80, indShare: 0.36 },
    scenarios: {
      low: { pop2041: 142_900, jobs2041: 64_840, base2041: 12_900, label: 'Low', color: '#378ADD' },
      med: { pop2041: 147_800, jobs2041: 77_100, base2041: 14_800, label: 'Medium', color: '#639922' },
      high: { pop2041: 165_400, jobs2041: 96_600, base2041: 16_600, label: 'High', color: '#BA7517' },
    },
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function round(v: number) {
  return Math.round(v);
}

function project(city: CityModel, scenario: ScenarioKey, years: number, controls: ModelControls) {
  const sc = city.scenarios[scenario];
  const mult = controls.scenarioMultiplier[scenario];
  const pop2041 = round(sc.pop2041 * mult);
  const jobs2041 = round(sc.jobs2041 * mult);
  const base2041 = round(sc.base2041 * mult);

  let prevHH = city.base.pop2025 / controls.hhSize;

  return Array.from({ length: years + 1 }, (_, i) => {
    const year = START_YEAR + i;
    const t = Math.min(i / 25, 1);
    const pop = round(lerp(city.base.pop2025, pop2041, t));
    const hh = round(pop / controls.hhSize);
    const newHH = i === 0 ? 0 : hh - prevHH;
    const vacAdj = round(newHH * controls.vacancyTarget);
    const replUnits = round(hh * controls.replacementRate);
    const unitsReq = Math.max(0, newHH + vacAdj + replUnits);
    const resHaCum = round((hh - city.base.pop2025 / controls.hhSize) / controls.pdaDensity);
    const jobs = round(lerp(city.base.jobs2021, jobs2041, t));
    const econ = round(lerp(city.base.econBase2021, base2041, t));
    const indJobs = round(econ * controls.indShare);
    const svcJobs = econ - indJobs;
    const indHa = round(indJobs / city.base.indDensity);
    const svcHa = round(svcJobs / city.base.svcDensity);
    prevHH = hh;

    return {
      year,
      pop,
      hh,
      newHH: Math.max(0, newHH),
      unitsReq,
      resHaCum: Math.max(0, resHaCum),
      jobs,
      econ,
      indHa: indHa + svcHa,
    };
  });
}

function initialControls(city: CityModel): ModelControls {
  return {
    hhSize: city.base.hhSize,
    vacancyTarget: city.base.vacancyTarget,
    replacementRate: city.base.replacementRate,
    pdaDensity: city.base.pdaDensity,
    indShare: city.base.indShare,
    scenarioMultiplier: {
      low: 1,
      med: 1,
      high: 1,
    },
  };
}

export default function MunicipalModelsPage() {
  const provinces = useMemo(() => Array.from(new Set(CITY_MODELS.map((entry) => entry.province))), []);
  const [selectedProvince, setSelectedProvince] = useState(provinces[0] ?? '');
  const provinceCities = useMemo(() => CITY_MODELS.filter((entry) => entry.province === selectedProvince), [selectedProvince]);

  const [selectedCity, setSelectedCity] = useState(provinceCities[0]?.city ?? CITY_MODELS[0].city);
  const city = useMemo(() => {
    return CITY_MODELS.find((entry) => entry.province === selectedProvince && entry.city === selectedCity)
      ?? provinceCities[0]
      ?? CITY_MODELS[0];
  }, [selectedProvince, selectedCity, provinceCities]);

  const [scenario, setScenario] = useState<ScenarioKey>('med');
  const [horizon, setHorizon] = useState(25);
  const [controls, setControls] = useState<ModelControls>(initialControls(CITY_MODELS[0]));

  const syncCity = (province: string, cityName: string) => {
    const nextCity = CITY_MODELS.find((entry) => entry.province === province && entry.city === cityName);
    if (!nextCity) return;
    setSelectedProvince(province);
    setSelectedCity(cityName);
    setControls(initialControls(nextCity));
  };

  const activeRows = useMemo(() => project(city, scenario, horizon, controls), [city, scenario, horizon, controls]);
  const last = activeRows[activeRows.length - 1];

  const allScenarioRows = useMemo(() => {
    return (['low', 'med', 'high'] as ScenarioKey[]).map((key) => ({
      key,
      label: city.scenarios[key].label,
      color: city.scenarios[key].color,
      rows: project(city, key, horizon, controls),
    }));
  }, [city, horizon, controls]);

  const migrationRows = useMemo(() => {
    const annualPop = (city.scenarios[scenario].pop2041 * controls.scenarioMultiplier[scenario] - city.base.pop2025) / 16;
    return [
      { component: 'International immigration', annualAvg: round(annualPop * 0.75) },
      { component: 'Interprovincial net', annualAvg: round(annualPop * 0.15) },
      { component: 'Natural increase', annualAvg: round(annualPop * 0.10) },
      { component: 'Total net', annualAvg: round(annualPop) },
    ];
  }, [city, scenario, controls]);

  return (
    <div className="diagnostic-theme min-h-screen bg-[#F7F1E6] px-6 py-12 lg:px-[6vw]">
      <div className="mx-auto max-w-[1400px] space-y-8">
        <header className="space-y-3">
          <p className="eyebrow">Municipal models</p>
          <h1 className="headline-md text-[#1f1f1f]">Municipal Growth Models</h1>
          <p className="max-w-4xl text-[#4a453d]">Current release is calibrated for Saint John only. Province/city controls stay in place for upcoming model rollouts.</p>
        </header>

        <section className="space-y-4 rounded-xl border border-[#d8cdb9] bg-white p-5">
          <div>
            <p className="mb-2 text-sm font-medium text-[#1f1f1f]">Province</p>
            <div className="flex flex-wrap gap-2">
              {provinces.map((province) => (
                <Button
                  key={province}
                  variant="outline"
                  className={cn('border-[#cfc2ab] text-[#4a453d]', selectedProvince === province && 'bg-[#1f3a5f] text-white hover:bg-[#1f3a5f] hover:text-white')}
                  onClick={() => {
                    const firstCity = CITY_MODELS.find((entry) => entry.province === province)?.city;
                    if (firstCity) syncCity(province, firstCity);
                  }}
                >
                  {province}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#1f1f1f]">City</p>
            <div className="flex flex-wrap gap-2">
              {provinceCities.map((entry) => (
                <Button
                  key={entry.city}
                  variant="outline"
                  className={cn('border-[#cfc2ab] text-[#4a453d]', selectedCity === entry.city && 'bg-[#1f3a5f] text-white hover:bg-[#1f3a5f] hover:text-white')}
                  onClick={() => syncCity(selectedProvince, entry.city)}
                >
                  {entry.city}
                </Button>
              ))}
            </div>
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

        <section className="rounded-xl border border-[#d8cdb9] bg-white p-5">
          <p className="mb-4 text-sm font-medium text-[#1f1f1f]">Scenario variable toggles</p>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <label className="block text-sm text-[#4a453d]">Household size: {controls.hhSize.toFixed(2)}</label>
              <Slider min={1.8} max={3} step={0.05} value={[controls.hhSize]} onValueChange={(v) => setControls((prev) => ({ ...prev, hhSize: v[0] ?? prev.hhSize }))} />

              <label className="block text-sm text-[#4a453d]">Vacancy target: {(controls.vacancyTarget * 100).toFixed(1)}%</label>
              <Slider min={0.01} max={0.06} step={0.002} value={[controls.vacancyTarget]} onValueChange={(v) => setControls((prev) => ({ ...prev, vacancyTarget: v[0] ?? prev.vacancyTarget }))} />

              <label className="block text-sm text-[#4a453d]">Replacement rate: {(controls.replacementRate * 100).toFixed(2)}%</label>
              <Slider min={0.002} max={0.01} step={0.0005} value={[controls.replacementRate]} onValueChange={(v) => setControls((prev) => ({ ...prev, replacementRate: v[0] ?? prev.replacementRate }))} />
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-[#4a453d]">PDA density: {controls.pdaDensity.toFixed(0)} u/net ha</label>
              <Slider min={25} max={90} step={1} value={[controls.pdaDensity]} onValueChange={(v) => setControls((prev) => ({ ...prev, pdaDensity: v[0] ?? prev.pdaDensity }))} />

              <label className="block text-sm text-[#4a453d]">Industrial share: {(controls.indShare * 100).toFixed(1)}%</label>
              <Slider min={0.15} max={0.55} step={0.01} value={[controls.indShare]} onValueChange={(v) => setControls((prev) => ({ ...prev, indShare: v[0] ?? prev.indShare }))} />

              {(['low', 'med', 'high'] as ScenarioKey[]).map((key) => (
                <div key={key}>
                  <label className="block text-sm text-[#4a453d]">{city.scenarios[key].label} multiplier: {controls.scenarioMultiplier[key].toFixed(2)}x</label>
                  <Slider
                    min={0.8}
                    max={1.4}
                    step={0.01}
                    value={[controls.scenarioMultiplier[key]]}
                    onValueChange={(v) => setControls((prev) => ({
                      ...prev,
                      scenarioMultiplier: { ...prev.scenarioMultiplier, [key]: v[0] ?? prev.scenarioMultiplier[key] },
                    }))}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: `Population ${START_YEAR + horizon}`, value: last.pop.toLocaleString(), sub: city.scenarios[scenario].label + ' scenario' },
            { label: 'Total households', value: last.hh.toLocaleString(), sub: `at ${controls.hhSize.toFixed(2)} persons/hh` },
            { label: 'Cumulative res land', value: `${last.resHaCum} ha`, sub: `@ ${controls.pdaDensity.toFixed(0)} u/net ha` },
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
                    <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} />
                    <Tooltip formatter={(value: number) => value.toLocaleString()} />
                    {allScenarioRows.map((entry) => (
                      <Line key={entry.key} data={entry.rows} dataKey="pop" name={entry.label} stroke={entry.color} strokeWidth={2} dot={false} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Age structure shift (active scenario)</p>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '0–14', share: 13 },
                        { name: '15–24', share: 11 },
                        { name: '25–44', share: 26 },
                        { name: '45–64', share: 27 },
                        { name: '65+', share: scenario === 'high' ? 26 : scenario === 'low' ? 29 : 28 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value: number) => `${value}%`} />
                      <Bar dataKey="share" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Migration components</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#efe4d1] text-left text-xs text-[#6b6255]">
                      <th className="py-2">Component</th>
                      <th className="py-2 text-right">2025 base</th>
                      <th className="py-2 text-right">Annual avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {migrationRows.map((row) => (
                      <tr key={row.component} className="border-b border-[#efe4d1] last:border-b-0">
                        <td className="py-2">{row.component}</td>
                        <td className="py-2 text-right">{row.component === 'International immigration' ? `~${city.base.pop2025.toLocaleString()}` : '—'}</td>
                        <td className="py-2 text-right">+{row.annualAvg.toLocaleString()}/yr</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            </div>
          </TabsContent>

          <TabsContent value="housing" className="space-y-4">
            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-3 text-sm font-medium text-[#4a453d]">Housing demand — units required annually</p>
              <div className="h-[320px]">
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

            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Unit mix (active scenario)</p>
                <div className="h-[240px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ name: 'Owner-occupied', value: 58 }, { name: 'Rental', value: 42 }]} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                        <Cell fill="#1D9E75" />
                        <Cell fill="#AFA9EC" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#4a453d]">Supply pipeline status</p>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-[#efe4d1]"><td className="py-2">2025 units created</td><td className="py-2 text-right">606</td></tr>
                    <tr className="border-b border-[#efe4d1]"><td className="py-2">Pipeline (approved)</td><td className="py-2 text-right">&gt;750</td></tr>
                    <tr className="border-b border-[#efe4d1]"><td className="py-2">Rental vacancy rate</td><td className="py-2 text-right">4.0%</td></tr>
                    <tr className="border-b border-[#efe4d1]"><td className="py-2">Vacancy direction</td><td className="py-2 text-right">+1.7 pp YoY</td></tr>
                    <tr className="border-b border-[#efe4d1]"><td className="py-2">Avg 2-bed rent</td><td className="py-2 text-right">~$1,148</td></tr>
                    <tr><td className="py-2">Record permit value</td><td className="py-2 text-right">$389.9M</td></tr>
                  </tbody>
                </table>
                <p className="mt-3 border-t border-[#efe4d1] pt-3 text-xs text-[#6b6255]">
                  4.0% vacancy above structural equilibrium (~3%) suggests temporary lease-up lag; pressure can return under medium/high scenarios by 2028–2030.
                </p>
              </article>
            </div>
          </TabsContent>

          <TabsContent value="employment" className="rounded-xl border border-[#d8cdb9] bg-white p-4">
            <p className="mb-3 text-sm font-medium text-[#4a453d]">Employment — total jobs by scenario</p>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" type="number" domain={[START_YEAR, START_YEAR + horizon]} allowDecimals={false} />
                  <YAxis tickFormatter={(value) => `${Math.round(Number(value) / 1000)}k`} />
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                  {allScenarioRows.map((entry) => (
                    <Line key={entry.key} data={entry.rows} dataKey="jobs" name={entry.label} stroke={entry.color} strokeWidth={2} dot={false} />
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
                  <YAxis tickFormatter={(value) => `${value} ha`} />
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
                  {activeRows.filter((_, index) => index % 5 === 0).map((row) => (
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
