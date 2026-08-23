export interface ParseOptions {
  fallback?: number;
  min?: number;
  max?: number;
}

const normalize = (value: string) => value.replace(/[$,%\s,]/g, '');

export function safeParseFloat(value: string, options: ParseOptions = {}) {
  const { fallback = 0, min, max } = options;
  const parsed = Number.parseFloat(normalize(value));

  if (!Number.isFinite(parsed)) return fallback;

  let next = parsed;
  if (typeof min === 'number') next = Math.max(min, next);
  if (typeof max === 'number') next = Math.min(max, next);
  return next;
}

export function isValidNumberInput(value: string, min?: number, max?: number) {
  const parsed = Number.parseFloat(normalize(value));
  if (!Number.isFinite(parsed)) return false;
  if (typeof min === 'number' && parsed < min) return false;
  if (typeof max === 'number' && parsed > max) return false;
  return true;
}
