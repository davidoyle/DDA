import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { isValidNumberInput, safeParseFloat } from '@/lib/number';
import { cn } from '@/lib/utils';

type NumberInputProps = {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  format?: 'plain' | 'money' | 'rate';
  helperText?: string;
};

const formatNumber = (value: number, format: NumberInputProps['format']) => {
  if (format === 'money') return value.toLocaleString('en-CA');
  if (format === 'rate') return value.toFixed(2);
  return String(value);
};

export function ValidatedNumberInput({
  value,
  onValueChange,
  min,
  max,
  step,
  placeholder,
  className,
  inputClassName,
  format = 'plain',
  helperText,
}: NumberInputProps) {
  const [rawText, setRawText] = useState(() => formatNumber(value, format));
  const [editing, setEditing] = useState(false);
  const [touched, setTouched] = useState(false);

  const displayText = editing ? rawText : formatNumber(value, format);
  const invalid = useMemo(
    () => touched && !isValidNumberInput(displayText, min, max),
    [displayText, max, min, touched],
  );

  return (
    <div className={cn('space-y-1', className)}>
      <Input
        type="text"
        inputMode="decimal"
        value={displayText}
        step={step}
        placeholder={placeholder}
        className={cn(invalid && 'border-red-400 focus-visible:ring-red-400', inputClassName)}
        onFocus={() => {
          setEditing(true);
          setRawText(String(value));
        }}
        onChange={(e) => {
          setTouched(true);
          setRawText(e.target.value);
          onValueChange(safeParseFloat(e.target.value, { fallback: value, min, max }));
        }}
        onBlur={() => {
          setTouched(true);
          setEditing(false);
          const next = safeParseFloat(rawText, { fallback: min ?? 0, min, max });
          onValueChange(next);
          setRawText(formatNumber(next, format));
        }}
      />
      {invalid ? (
        <p className="text-xs text-red-300">Enter a valid number{typeof min === 'number' ? ` (min ${min})` : ''}{typeof max === 'number' ? ` (max ${max})` : ''}.</p>
      ) : (
        helperText ? <p className="text-xs text-[#F3EFE6]/65">{helperText}</p> : null
      )}
    </div>
  );
}

export function MoneyInput(props: Omit<NumberInputProps, 'format'>) {
  return <ValidatedNumberInput {...props} format="money" />;
}

export function RateInput(props: Omit<NumberInputProps, 'format'>) {
  return <ValidatedNumberInput {...props} format="rate" />;
}
