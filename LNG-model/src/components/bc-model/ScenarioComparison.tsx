import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { ScenarioRun } from '@/lib/bc-model/types';
import { EmissionsLineChart } from './charts/EmissionsLineChart';
import { ScenarioSelector } from './controls/ScenarioSelector';

interface Props {
  scenarios: ScenarioRun[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ScenarioComparison({ scenarios, selectedIds, onToggle }: Props) {
  const selected = scenarios.filter((scenario) => selectedIds.includes(scenario.id)).slice(0, 3);

  const handleExport = () => {
    const payload = JSON.stringify(selected, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bc-decarbonization-scenarios.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <ScenarioSelector scenarios={scenarios} selectedIds={selectedIds} onToggle={onToggle} />
      <Card className="border-[#d8cdb9] bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Scenario comparison</CardTitle><Button type="button" onClick={handleExport} className="gap-2"><Download className="size-4" />Export JSON</Button></CardHeader>
        <CardContent className="space-y-6">
          <EmissionsLineChart scenarios={selected} />
          <Table>
            <TableHeader><TableRow><TableHead>Scenario</TableHead><TableHead>2030 emissions</TableHead><TableHead>Household burden</TableHead><TableHead>Political cost</TableHead><TableHead>Status</TableHead><TableHead>Grid constraint</TableHead></TableRow></TableHeader>
            <TableBody>
              {selected.map((scenario) => {
                const final = scenario.results.at(-1);
                if (!final) return null;
                return (
                  <TableRow key={scenario.id}>
                    <TableCell>{scenario.label}</TableCell>
                    <TableCell>{final.totalEmissions.toFixed(1)} Mt</TableCell>
                    <TableCell>{(final.householdBurden * 100).toFixed(1)}</TableCell>
                    <TableCell>{(final.politicalCost * 100).toFixed(1)}</TableCell>
                    <TableCell>{final.status}</TableCell>
                    <TableCell>{final.gridConstraintTriggered ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
