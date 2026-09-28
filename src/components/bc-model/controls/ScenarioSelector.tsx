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
            className={`rounded-lg border p-4 text-left transition ${active ? 'border-[#16324F] bg-[#16324F] text-white shadow-lg' : 'border-[#D9DDDA] bg-white text-[#111111] hover:border-[#16324F]'}`}
          >
            <p className={` text-xs uppercase font-semibold tracking-[0.08em] ${active ? 'text-[#d7e1ef]' : 'text-[#626966]'}`}>{scenario.label}</p>
            <p className="mt-2 font-heading text-xl">{scenario.results.at(-1)?.status}</p>
            <p className={`mt-2 text-sm ${active ? 'text-white/80' : 'text-[#626966]'}`}>{scenario.description}</p>
          </button>
        );
      })}
    </div>
  );
}
