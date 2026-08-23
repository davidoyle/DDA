import { Slider } from '@/components/ui/slider';

interface PolicySliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  helper?: string;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
}

export function PolicySlider({
  label,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  helper,
  formatValue = (next) => next.toFixed(2),
  onChange,
}: PolicySliderProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-[#d8cdb9] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-[#1f1f1f]">{label}</p>
          {helper ? <p className="mt-1 text-sm text-[#5c5548]">{helper}</p> : null}
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#6b6255]">{formatValue(value)}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={([next]) => onChange(next ?? value)} />
    </div>
  );
}
