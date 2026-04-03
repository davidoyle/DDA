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

type LexiconRow = {
  id: string;
  variable: string;
  value: string;
  unit: string;
  source: string;
  released: string;
  status: 'ACTUAL' | 'PROXY' | 'FLAGGED';
  notes: string;
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

const DATA_LEXICON_ROWS: LexiconRow[] = [
  { id: '1', variable: 'Base population 2025 (CMA)', value: '132,800', unit: 'persons', source: 'Envision Saint John Regional Growth Dashboard', released: 'Mar 17, 2026', status: 'ACTUAL', notes: 'CMA working base used across scenarios.' },
  { id: '2', variable: 'City of Saint John CSD population (Jul 1, 2024)', value: '78,165', unit: 'persons', source: 'City of Saint John citing StatCan', released: 'Jan 16, 2025', status: 'ACTUAL', notes: 'CSD-only context; model uses CMA base.' },
  { id: '3', variable: 'Population growth rate 2025 (CMA)', value: '+1.1%', unit: '% YoY', source: 'Envision Dashboard', released: 'Mar 17, 2026', status: 'ACTUAL', notes: 'Immigration-led growth signal.' },
  { id: '4', variable: 'Median age (CMA, 2025)', value: '43.2', unit: 'years', source: 'Envision Dashboard', released: 'Mar 17, 2026', status: 'ACTUAL', notes: 'Used as demographic context.' },
  { id: '5', variable: '60–64 age cohort share', value: '7.5%', unit: '% of pop', source: 'Envision Dashboard', released: 'Mar 17, 2026', status: 'ACTUAL', notes: 'Largest 5-year cohort in cited dashboard.' },
  { id: '6', variable: 'Population endpoint — Low scenario (2041)', value: '142,900', unit: 'persons', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+10,100 from base.' },
  { id: '7', variable: 'Population endpoint — Medium scenario (2041)', value: '147,800', unit: 'persons', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+15,000 from base.' },
  { id: '8', variable: 'Population endpoint — High scenario (2041)', value: '165,400', unit: 'persons', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+32,600 from base.' },
  { id: '9', variable: 'Average household size', value: '2.1', unit: 'persons/hh', source: 'StatCan 2021 Census Profile (Saint John CSD)', released: 'Feb 9, 2022', status: 'ACTUAL', notes: 'Primary divisor for households.' },
  { id: '10', variable: 'Estimated households 2024', value: '~37,221', unit: 'hh', source: 'Derived proxy', released: 'Derived', status: 'PROXY', notes: '78,165 ÷ 2.1 (CSD context only).' },
  { id: '11', variable: 'Vacancy buffer rate (structural)', value: '3%', unit: '% of new hh', source: 'Planning convention', released: 'N/A', status: 'PROXY', notes: 'Healthy vacancy planning threshold.' },
  { id: '12', variable: 'Annual replacement / obsolescence rate', value: '0.4%', unit: '% of stock/yr', source: 'Planning convention', released: 'N/A', status: 'PROXY', notes: 'Applied to annual household stock.' },
  { id: '13', variable: 'Net new housing units created (2025)', value: '606', unit: 'units', source: 'City construction permit release', released: 'Feb 4, 2026', status: 'ACTUAL', notes: 'City-reported net units.' },
  { id: '14', variable: 'Approved pipeline (projects)', value: '>750', unit: 'units', source: 'City construction permit release', released: 'Feb 4, 2026', status: 'ACTUAL', notes: '11 approved projects.' },
  { id: '15', variable: 'Total construction permit value 2025', value: '$389.9M', unit: 'CAD', source: 'City construction permit release', released: 'Feb 4, 2026', status: 'ACTUAL', notes: 'Record annual value.' },
  { id: '16', variable: 'Development permits issued 2025', value: '697', unit: 'permits', source: 'City construction permit release', released: 'Feb 4, 2026', status: 'ACTUAL', notes: 'Slightly below 2024 count.' },
  { id: '17', variable: 'Rental vacancy rate (CMA, 2025)', value: '4.0%', unit: '%', source: 'CMHC Rental Market Report', released: 'Dec 11, 2025', status: 'ACTUAL', notes: 'Oct 2025 survey snapshot.' },
  { id: '18', variable: 'Vacancy rate change YoY', value: '+1.7 pp', unit: 'pp', source: 'CMHC Rental Market Report', released: 'Dec 11, 2025', status: 'ACTUAL', notes: 'Temporary absorption lag signal.' },
  { id: '19', variable: 'Average 2-bedroom rent', value: '~$1,148', unit: 'CAD/mo', source: 'CMHC Rental Market Report', released: 'Dec 2024', status: 'ACTUAL', notes: 'Most recent extracted unit-type figure.' },
  { id: '20', variable: 'Renter household share (proxy)', value: '~40–45%', unit: '% of hh', source: 'Derived (CMHC + T1FF context)', released: 'Derived', status: 'PROXY', notes: 'No direct extracted split used.' },
  { id: '21', variable: 'Model tenure split used', value: '58% own / 42% rent', unit: '%', source: 'Derived proxy', released: 'Derived', status: 'PROXY', notes: 'Used in tenure chart only.' },
  { id: '22', variable: 'Total CMA employment (2021 baseline)', value: '54,140', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: 'Place-of-work employment baseline.' },
  { id: '23', variable: 'Economic base jobs (2021)', value: '11,170', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: 'Export-oriented base sectors.' },
  { id: '24', variable: 'Total jobs endpoint — Low (2041)', value: '64,840', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+10,700 from baseline.' },
  { id: '25', variable: 'Total jobs endpoint — Medium (2041)', value: '77,100', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+23,000 from baseline.' },
  { id: '26', variable: 'Total jobs endpoint — High (2041)', value: '96,600', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+33,500 from baseline.' },
  { id: '27', variable: 'Economic base — Low endpoint (2041)', value: '12,900', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+1,700 from baseline.' },
  { id: '28', variable: 'Economic base — Medium endpoint (2041)', value: '14,800', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+3,600 from baseline.' },
  { id: '29', variable: 'Economic base — High endpoint (2041)', value: '16,600', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '+5,400 from baseline.' },
  { id: '30', variable: 'Manufacturing jobs (econ base, 2021)', value: '3,990', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '36% of economic base.' },
  { id: '31', variable: 'Health & social services jobs', value: '1,314', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '12% sector share.' },
  { id: '32', variable: 'Professional / scientific / technical', value: '941', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '8% sector share.' },
  { id: '33', variable: 'Other business services', value: '870', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '8% sector share.' },
  { id: '34', variable: 'Utilities', value: '869', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '8% sector share.' },
  { id: '35', variable: 'Wholesale trade', value: '488', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '4% sector share.' },
  { id: '36', variable: 'Construction', value: '463', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '4% sector share.' },
  { id: '37', variable: 'Finance / insurance', value: '368', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '3% sector share.' },
  { id: '38', variable: 'Agriculture / other primary', value: '365', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '3% sector share.' },
  { id: '39', variable: 'Information / culture', value: '287', unit: 'jobs', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: '3% sector share.' },
  { id: '40', variable: 'PDA residential density — model average', value: '40', unit: 'u/net ha', source: 'Derived from Municipal Plan + Zoning', released: '2020 references', status: 'PROXY', notes: 'Midpoint planning density used in model.' },
  { id: '41', variable: 'Low density zone yield (R1)', value: '20–45', unit: 'u/net ha', source: 'City Zoning By-law', released: 'Aug 17, 2020', status: 'ACTUAL', notes: 'Range from zoning constraints.' },
  { id: '42', variable: 'Low to Medium Density Residential yield', value: '35–90', unit: 'u/net ha', source: 'City Municipal Plan', released: '2020', status: 'ACTUAL', notes: 'Plan target range.' },
  { id: '43', variable: 'Medium to High Density / Mixed Use yield', value: '45–222', unit: 'u/net ha', source: 'Municipal Plan + Zoning', released: '2020', status: 'ACTUAL', notes: 'Urban centre mixed-use range.' },
  { id: '44', variable: 'High-rise zone yield (RH)', value: '135–270', unit: 'u/net ha', source: 'City Zoning By-law', released: 'Aug 17, 2020', status: 'ACTUAL', notes: 'Upper density envelope.' },
  { id: '45', variable: 'Share of residential growth to PDA', value: '95%', unit: '%', source: 'City Municipal Plan', released: '2020', status: 'ACTUAL', notes: 'Remaining 5% rural/unserviced.' },
  { id: '46', variable: 'City total land area', value: '316', unit: 'km²', source: 'City Municipal Plan', released: '2020', status: 'ACTUAL', notes: '31,600 ha total.' },
  { id: '47', variable: 'Serviced land capacity', value: '~3× projected growth', unit: 'ratio', source: 'City Municipal Plan', released: '2020', status: 'ACTUAL', notes: 'Water/sewer headroom statement.' },
  { id: '48', variable: 'Incremental greenfield servicing cost (PDA)', value: '$0/ha', unit: 'CAD/ha', source: 'Derived proxy (Plan + 2026 utility budget)', released: '2026 + 2020', status: 'PROXY', notes: 'Assumes growth on existing infrastructure.' },
  { id: '49', variable: 'Industrial employment density', value: '15', unit: 'jobs/ha', source: 'Planning convention', released: 'N/A', status: 'PROXY', notes: 'Conservative industrial midpoint.' },
  { id: '50', variable: 'Services employment density', value: '80', unit: 'jobs/ha', source: 'Planning convention', released: 'N/A', status: 'PROXY', notes: 'Conservative office/commercial midpoint.' },
  { id: '51', variable: 'Industrial share of economic base', value: '36%', unit: '%', source: 'Envision SJ / metroeconomics study', released: 'Nov 2024', status: 'ACTUAL', notes: 'Manufacturing share weighting.' },
  { id: '52', variable: 'Container throughput 2025', value: '239,364', unit: 'TEUs', source: 'Port Saint John release', released: 'Feb 26, 2026', status: 'ACTUAL', notes: '+29.4% YoY vs 2024.' },
  { id: '53', variable: 'Port terminal modernization value', value: '$247M', unit: 'CAD', source: 'Port Saint John disclosures', released: '2025', status: 'ACTUAL', notes: 'Context for high scenario driver.' },
  { id: '54', variable: 'City child poverty rate (2023)', value: '30.7%', unit: '% children 0–17', source: 'HDC NB report card (T1FF-based)', released: 'Feb 2026', status: 'ACTUAL', notes: 'Context for tenure pressure only.' },
  { id: '55', variable: 'Average single-family home price (Dec 2025)', value: '$345,000', unit: 'CAD', source: 'Envision Dashboard (CREA/MLS)', released: 'Mar 17, 2026', status: 'ACTUAL', notes: 'Context metric; not model input.' },
  { id: '56', variable: 'MLS HPI composite benchmark (Feb 2026)', value: '$330,300', unit: 'CAD', source: 'CREA via Envision Dashboard', released: 'Mar 2026', status: 'ACTUAL', notes: 'Context metric; not model input.' },
  { id: '57', variable: 'CMA net population growth (Jul 1, 2024–Jul 1, 2025)', value: '+1,638', unit: 'persons', source: 'StatCan Tables 17-10-0148-01 / 17-10-0149-01', released: 'Jan 14, 2026', status: 'ACTUAL', notes: '+1.1% YoY to 144,543.' },
  { id: '58', variable: 'Net interprovincial migration share of growth', value: '+82 (5.0%)', unit: 'persons / %', source: 'StatCan Tables 17-10-0148-01 / 17-10-0149-01', released: 'Jan 14, 2026', status: 'ACTUAL', notes: 'Sharply lower than prior years.' },
  { id: '59', variable: 'International immigration share of growth', value: '~95% (~+1,556 residual)', unit: '% / persons', source: 'Derived from StatCan growth components', released: 'Derived', status: 'PROXY', notes: 'Residual after interprovincial and natural components.' },
  { id: '60', variable: 'Natural increase share of growth', value: '~0%', unit: '%', source: 'StatCan growth components', released: 'Jan 14, 2026', status: 'ACTUAL', notes: 'No meaningful contribution in this period.' },
  { id: 'A1', variable: '0–14 share, base 2025', value: '13%', unit: '%', source: 'Directional proxy', released: 'Derived', status: 'PROXY', notes: 'Age-chart proxy only.' },
  { id: 'A2', variable: '15–24 share, base 2025', value: '11%', unit: '%', source: 'Directional proxy', released: 'Derived', status: 'PROXY', notes: 'Age-chart proxy only.' },
  { id: 'A3', variable: '25–44 share, base 2025', value: '26%', unit: '%', source: 'Directional proxy', released: 'Derived', status: 'PROXY', notes: 'Age-chart proxy only.' },
  { id: 'A4', variable: '45–64 share, base 2025', value: '27%', unit: '%', source: 'Directional proxy', released: 'Derived', status: 'PROXY', notes: 'Age-chart proxy only.' },
  { id: 'A5', variable: '65+ share, base 2025', value: '23%', unit: '%', source: 'Directional proxy', released: 'Derived', status: 'PROXY', notes: 'Age-chart proxy only.' },
  { id: 'A6', variable: 'Cohort shift adjustments (Low)', value: 'No public cohort headship rates', unit: 'N/A', source: 'StatCan 2021 PUMF + Table 98-10-0132-01', released: 'Mar 29, 2023 / Nov 15, 2023', status: 'FLAGGED', notes: 'Custom tabulation required; unavailable as of Apr 3, 2026.' },
  { id: 'A7', variable: 'Cohort shift adjustments (Medium)', value: 'No public cohort headship rates', unit: 'N/A', source: 'StatCan 2021 PUMF + Table 98-10-0132-01', released: 'Mar 29, 2023 / Nov 15, 2023', status: 'FLAGGED', notes: 'Model remains aggregate (population ÷ 2.1 hh size).' },
  { id: 'A8', variable: 'Cohort shift adjustments (High)', value: 'No public cohort headship rates', unit: 'N/A', source: 'StatCan 2021 PUMF + Table 98-10-0132-01', released: 'Mar 29, 2023 / Nov 15, 2023', status: 'FLAGGED', notes: 'No numeric cohort update possible without custom request.' },
];

const KNOWN_GAPS = [
  'Full annual population series 2006–2025 (StatCan tables 17-10-0139-01 / 17-10-0142-01).',
  'Age-cohort headship rates (StatCan 2021); custom tabulation required.',
  'Housing stock by structural type (SFH/MFH split) from extracted public profile tables.',
  'Transport capacity ceiling quantification.',
  'Serviced land hectare inventory from public GIS extraction.',
  'City/CMA current LFS employment by NAICS in public disaggregation.',
];

const MIGRATION_COMPONENTS_2025 = {
  totalNetGrowth: 1638,
  interprovincial: 82,
  internationalResidual: 1556,
  naturalIncrease: 0,
  source: 'StatCan Tables 17-10-0148-01 & 17-10-0149-01 (released Jan 14, 2026; ~6-month lag).',
};

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
    const total = MIGRATION_COMPONENTS_2025.totalNetGrowth;
    return [
      {
        component: 'International immigration (PR + net temporary)',
        value: MIGRATION_COMPONENTS_2025.internationalResidual,
        share: (MIGRATION_COMPONENTS_2025.internationalResidual / total) * 100,
      },
      {
        component: 'Net interprovincial migration',
        value: MIGRATION_COMPONENTS_2025.interprovincial,
        share: (MIGRATION_COMPONENTS_2025.interprovincial / total) * 100,
      },
      {
        component: 'Natural increase (births − deaths)',
        value: MIGRATION_COMPONENTS_2025.naturalIncrease,
        share: 0,
      },
      {
        component: 'Total net growth',
        value: total,
        share: 100,
      },
    ];
  }, []);

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
            <TabsTrigger value="lexicon">Data lexicon</TabsTrigger>
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
                        { name: '65+', share: 23 },
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
                      <th className="py-2 text-right">2024–2025 value</th>
                      <th className="py-2 text-right">Share of net growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {migrationRows.map((row) => (
                      <tr key={row.component} className="border-b border-[#efe4d1] last:border-b-0">
                        <td className="py-2">{row.component}</td>
                        <td className="py-2 text-right">{row.value.toLocaleString()}</td>
                        <td className="py-2 text-right">{row.component === 'Total net growth' ? '100%' : `~${row.share.toFixed(1)}%`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 border-t border-[#efe4d1] pt-3 text-xs text-[#6b6255]">
                  {MIGRATION_COMPONENTS_2025.source} Key trend: immigration dominant; interprovincial contribution materially lower than prior years.
                </p>
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

          <TabsContent value="lexicon" className="space-y-4">
            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-2 text-sm font-medium text-[#4a453d]">Data lexicon — Saint John land use growth model</p>
              <p className="text-xs text-[#6b6255]">Projection endpoint is capped at 2041. Values are tagged as ACTUAL, PROXY, or FLAGGED exactly per the provided data lexicon.</p>
            </article>

            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px] text-sm">
                  <thead>
                    <tr className="border-b border-[#e9dcc6] text-left text-xs text-[#6b6255]">
                      <th className="px-2 py-2">#</th>
                      <th className="px-2 py-2">Variable</th>
                      <th className="px-2 py-2">Value</th>
                      <th className="px-2 py-2">Unit</th>
                      <th className="px-2 py-2">Source</th>
                      <th className="px-2 py-2">Released</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA_LEXICON_ROWS.map((row) => (
                      <tr key={row.id} className="border-b border-[#efe4d1] align-top last:border-b-0">
                        <td className="px-2 py-2 font-medium">{row.id}</td>
                        <td className="px-2 py-2">{row.variable}</td>
                        <td className="px-2 py-2">{row.value}</td>
                        <td className="px-2 py-2">{row.unit}</td>
                        <td className="px-2 py-2">{row.source}</td>
                        <td className="px-2 py-2">{row.released}</td>
                        <td className="px-2 py-2">
                          <span className={cn(
                            'rounded px-2 py-1 text-[11px] font-semibold',
                            row.status === 'ACTUAL' && 'bg-[#E6F1FB] text-[#0C447C]',
                            row.status === 'PROXY' && 'bg-[#EAF3DE] text-[#27500A]',
                            row.status === 'FLAGGED' && 'bg-[#FAEEDA] text-[#633806]',
                          )}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="px-2 py-2">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <article className="rounded-xl border border-[#d8cdb9] bg-white p-4">
              <p className="mb-2 text-sm font-medium text-[#4a453d]">Known gaps not closed by proxies</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[#4a453d]">
                {KNOWN_GAPS.map((gap) => (
                  <li key={gap}>{gap}</li>
                ))}
              </ul>
            </article>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
