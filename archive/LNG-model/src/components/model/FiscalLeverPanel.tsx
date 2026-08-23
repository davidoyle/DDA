import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Slider from '@radix-ui/react-slider';
import { SCENARIOS } from '@/lib/model/scenarios';
import { cn } from '@/lib/utils';

export interface LeverState {
  royaltyRate: number;
  wacc: number;
  gasPrice: number;
  pipelineToll: number;
  obpsPrice: number;
  capacityMtpa: number;
  inServiceYear: number;
  capexB: number;
  annualOpexM: number;
  electricityGWh: number;
  scenarioId: string;
}

function NumberInput({
  label,
  value,
  suffix,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  suffix: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block text-sm font-medium normal-case tracking-normal text-slate-700">
      {label}
      <div className="mt-1 flex items-center gap-2">
        <input
          disabled={disabled}
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
        />
        <span className="min-w-fit text-xs text-slate-500">{suffix}</span>
      </div>
    </label>
  );
}

function Lever({
  label,
  value,
  min,
  max,
  step,
  format,
  annotation,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  annotation: string;
  disabled?: boolean;
  onChange: (value: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('rounded-lg border border-slate-200 bg-white p-4 transition', disabled && 'opacity-55')}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">{annotation}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-[#003366]">
          {format(value)}
        </span>
      </div>
      <div className="relative pt-3">
        <span
          className="absolute -top-1 rounded bg-[#003366] px-1.5 py-0.5 text-[10px] font-semibold text-white"
          style={{ left: `calc(${pct}% - 18px)` }}
        >
          {format(value)}
        </span>
        <Slider.Root
          disabled={disabled}
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={([next]) => onChange(next)}
          className="relative flex h-5 w-full touch-none select-none items-center"
        >
          <Slider.Track className="relative h-2 grow rounded-full bg-slate-200">
            <Slider.Range className="absolute h-full rounded-full bg-teal-500" />
          </Slider.Track>
          <Slider.Thumb className="block h-5 w-5 rounded-full border-2 border-white bg-[#003366] shadow focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2" />
        </Slider.Root>
      </div>
    </div>
  );
}

export default function FiscalLeverPanel({
  state,
  onChange,
}: {
  state: LeverState;
  onChange: (patch: Partial<LeverState>) => void;
}) {
  const scenarioLocked = state.scenarioId !== 'custom';

  return (
    <aside className="space-y-4">
      <details open className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer font-semibold text-[#003366]">Project inputs</summary>
        <div className="mt-4 space-y-3">
          <NumberInput label="Capacity" value={state.capacityMtpa} suffix="mtpa" onChange={(capacityMtpa) => onChange({ capacityMtpa, scenarioId: 'custom' })} />
          <NumberInput label="In-service year" value={state.inServiceYear} suffix="year" onChange={(inServiceYear) => onChange({ inServiceYear, scenarioId: 'custom' })} />
          <NumberInput label="CAPEX" value={state.capexB} suffix="C$B" onChange={(capexB) => onChange({ capexB, scenarioId: 'custom' })} />
          <NumberInput label="Annual OPEX" value={state.annualOpexM} suffix="C$M" onChange={(annualOpexM) => onChange({ annualOpexM, scenarioId: 'custom' })} />
          <NumberInput label="Electricity load" value={state.electricityGWh} suffix="GWh/y" onChange={(electricityGWh) => onChange({ electricityGWh, scenarioId: 'custom' })} />
        </div>
      </details>

      <details open className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer font-semibold text-[#003366]">Fiscal levers</summary>
        <div className="mt-4 space-y-3">
          <Lever disabled={scenarioLocked} label="Royalty rate" value={state.royaltyRate} min={0.05} max={0.4} step={0.01} format={(v) => `${(v * 100).toFixed(0)}%`} annotation="Current legislated range: 5% to 40%." onChange={(royaltyRate) => onChange({ royaltyRate, scenarioId: 'custom' })} />
          <Lever disabled={scenarioLocked} label="WACC" value={state.wacc} min={0.06} max={0.16} step={0.005} format={(v) => `${(v * 100).toFixed(1)}%`} annotation="Proxy default used until project finance data is confirmed." onChange={(wacc) => onChange({ wacc, scenarioId: 'custom' })} />
          <Lever disabled={scenarioLocked} label="Gas price" value={state.gasPrice} min={0.5} max={4} step={0.1} format={(v) => `$${v.toFixed(2)}/GJ`} annotation="BC Budget band: $1.22 to $2.82/GJ." onChange={(gasPrice) => onChange({ gasPrice, scenarioId: 'custom' })} />
          <Lever disabled={scenarioLocked} label="Pipeline toll" value={state.pipelineToll} min={0.2} max={1.5} step={0.05} format={(v) => `$${v.toFixed(2)}/GJ`} annotation="Public NGTL tariff range proxy." onChange={(pipelineToll) => onChange({ pipelineToll, scenarioId: 'custom' })} />
          <Lever disabled={scenarioLocked} label="OBPS carbon price" value={state.obpsPrice} min={50} max={200} step={5} format={(v) => `$${v.toFixed(0)}/t`} annotation="Confirmed schedule reaches $170/t by 2030." onChange={(obpsPrice) => onChange({ obpsPrice, scenarioId: 'custom' })} />
        </div>
      </details>

      <details open className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <summary className="cursor-pointer font-semibold text-[#003366]">Scenario selector</summary>
        <RadioGroup.Root value={state.scenarioId} onValueChange={(scenarioId) => onChange({ scenarioId })} className="mt-4 space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium normal-case tracking-normal text-slate-700">
            <RadioGroup.Item value="custom" className="h-4 w-4 rounded-full border border-slate-400 data-[state=checked]:bg-[#003366]" />
            Custom live sliders
          </label>
          {SCENARIOS.map((scenario) => (
            <label key={scenario.id} className="flex items-center gap-2 text-sm font-medium normal-case tracking-normal text-slate-700">
              <RadioGroup.Item value={scenario.id} className="h-4 w-4 rounded-full border border-slate-400 data-[state=checked]:bg-[#003366]" />
              {scenario.label}
            </label>
          ))}
        </RadioGroup.Root>
      </details>
    </aside>
  );
}
