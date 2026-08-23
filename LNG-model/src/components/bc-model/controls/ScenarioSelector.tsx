import type { ScenarioRun } from '@/lib/bc-model/types';

interface ScenarioSelectorProps {
  scenarios: ScenarioRun[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function ScenarioSelector({ scenarios, selectedIds, onToggle }: ScenarioSelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {scenarios.map((scenario) => {
        const active = selectedIds.includes(scenario.id);
        return (
          <button
            key={scenario.id}
            type="button"
            onClick={() => onToggle(scenario.id)}
            className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[#1f3a5f] bg-[#1f3a5f] text-white shadow-lg' : 'border-[#d8cdb9] bg-white text-[#1f1f1f] hover:border-[#1f3a5f]'}`}
          >
            <p className={`font-mono text-xs uppercase tracking-[0.12em] ${active ? 'text-[#d7e1ef]' : 'text-[#6b6255]'}`}>{scenario.label}</p>
            <p className="mt-2 font-heading text-xl">{scenario.results.at(-1)?.status}</p>
            <p className={`mt-2 text-sm ${active ? 'text-white/80' : 'text-[#5c5548]'}`}>{scenario.description}</p>
          </button>
        );
      })}
    </div>
  );
}
