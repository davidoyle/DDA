import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  BC_AVG_HOUSEHOLD_SPENDING_2023,
  BCHYDRO_ELECTRIFICATION_HOUSEHOLDS,
  BCHYDRO_NEW_CI_LOAD_MW_CUMULATIVE,
  ELECTRICITY_DEMAND_GROWTH_BY_2030,
  EMISSIONS_2023_MT,
  EMISSIONS_2023_NET_MT,
  EMISSIONS_2023_NIR_MT,
  FORTIS_AVG_MONTHLY_IMPACT,
  FORTIS_RATE_INCREASE_2026,
  NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH,
  NEW_CLEAN_GENERATION_GWH_PER_YEAR,
  PULP_PAPER_SHARE_OF_PROVINCIAL,
  SECTOR_SHARES_2023,
  TARGET_2030_MT,
} from '@/lib/bc-model/constants';
import type { ScenarioRun } from '@/lib/bc-model/types';
import { SectorBarChart } from './charts/SectorBarChart';
import { ZEVDiffusionChart } from './charts/ZEVDiffusionChart';
import { ElectricityDemandChart } from './charts/ElectricityDemandChart';

export function BaselineDashboard({ baseline }: { baseline: ScenarioRun }) {
  const gap = (baseline.results.at(-1)?.totalEmissions ?? 0) - TARGET_2030_MT;
  const sectorData = [
    { name: 'Transport', share: SECTOR_SHARES_2023.transport * 100 },
    { name: 'Industry', share: SECTOR_SHARES_2023.industry * 100, detail: 'Pulp/paper 17.2% provincial' },
    { name: 'Buildings', share: SECTOR_SHARES_2023.buildings * 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>2023 gross</CardTitle></CardHeader><CardContent><p className="headline-md text-[#1f1f1f]">{EMISSIONS_2023_MT} Mt</p><p className="text-sm text-[#5c5548]">Net {EMISSIONS_2023_NET_MT} Mt</p></CardContent></Card>
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>NIR revision</CardTitle></CardHeader><CardContent><p className="headline-md text-[#1f1f1f]">{EMISSIONS_2023_NIR_MT} Mt</p><p className="text-sm text-[#5c5548]">Methodology note: inventory revision artifact.</p></CardContent></Card>
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>2030 legal target</CardTitle></CardHeader><CardContent><p className="headline-md text-[#1f1f1f]">{TARGET_2030_MT.toFixed(1)} Mt</p><p className="text-sm text-[#5c5548]">40% below 2007 baseline.</p></CardContent></Card>
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>Gap to close</CardTitle></CardHeader><CardContent><p className="headline-md text-[#1f1f1f]">{gap > 0 ? `+${gap.toFixed(1)}` : gap.toFixed(1)} Mt</p><Badge variant={gap <= 0 ? 'default' : 'secondary'}>{gap <= 0 ? 'On track in baseline' : 'Baseline shortfall'}</Badge></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>Sectoral breakdown</CardTitle></CardHeader><CardContent><SectorBarChart data={sectorData} /></CardContent></Card>
        <Card className="border-[#d8cdb9] bg-white shadow-sm"><CardHeader><CardTitle>Technology milestone tracker</CardTitle></CardHeader><CardContent><ZEVDiffusionChart data={baseline.results} /></CardContent></Card>
      </div>

      <Card className="border-[#d8cdb9] bg-white shadow-sm">
        <CardHeader><CardTitle>Annual emissions table</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Year</TableHead><TableHead>Total</TableHead><TableHead>Target comparison</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {baseline.results.map((point) => (
                <TableRow key={point.year}>
                  <TableCell>{point.year}</TableCell>
                  <TableCell>{point.totalEmissions.toFixed(1)} Mt</TableCell>
                  <TableCell>{(point.totalEmissions - TARGET_2030_MT).toFixed(1)} Mt vs 2030 target</TableCell>
                  <TableCell>{point.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-[#d8cdb9] bg-white shadow-sm">
          <CardHeader><CardTitle>Electricity system panel</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-[#3f3a34]">
            <ElectricityDemandChart data={baseline.results} />
            <ul className="list-disc space-y-1 pl-5">
              <li>Demand growth anchor: +{(ELECTRICITY_DEMAND_GROWTH_BY_2030 * 100).toFixed(0)}% by 2030.</li>
              <li>New clean generation needed: ~{NEW_CLEAN_GENERATION_GWH_PER_YEAR.toLocaleString()} GWh/year from 2028.</li>
              <li>Electrification plan households: {BCHYDRO_ELECTRIFICATION_HOUSEHOLDS.toLocaleString()}.</li>
              <li>New C&I load since 2020/21: {BCHYDRO_NEW_CI_LOAD_MW_CUMULATIVE.toLocaleString()} MW.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-[#d8cdb9] bg-white shadow-sm">
          <CardHeader><CardTitle>Household burden panel</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm text-[#3f3a34]">
            <ul className="list-disc space-y-1 pl-5">
              <li>BC average household spending 2023: ${BC_AVG_HOUSEHOLD_SPENDING_2023.toLocaleString()}.</li>
              <li>National energy/water/fuel proxy: ${NATIONAL_ENERGY_WATER_FUEL_ELEC_PER_HH.toLocaleString()} per household.</li>
              <li>FortisBC rate increase: +{(FORTIS_RATE_INCREASE_2026 * 100).toFixed(2)}% from January 2026, about +${FORTIS_AVG_MONTHLY_IMPACT.toFixed(2)}/month average residential.</li>
              <li>Carbon rebate ended April 2025.</li>
              <li>Lowest quintile shelter share proxy: 34.8% of spending.</li>
            </ul>
            <div className="rounded-2xl bg-[#f7f1e6] p-4 text-xs text-[#5c5548]">Model estimate; reconciliation with UNFCCC NIR methodology required. Pulp/paper is tracked as the leading industrial sub-component at {(PULP_PAPER_SHARE_OF_PROVINCIAL * 100).toFixed(1)}% of provincial GHG.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
