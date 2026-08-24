import type { ReactNode } from 'react';
import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';
import type { ValidationResult } from '@/lib/model/validation';

export default function FlagWarningBanner({ validation, children }: { validation: ValidationResult; children: ReactNode }) {
  if (validation.warningLevel === 'NONE') return <>{children}</>;
  const ids = validation.warningLevel === 'ESTIMATED' ? validation.p1FlagsUsed : validation.p2FlagsUsed;
  const palette = validation.warningLevel === 'ESTIMATED' ? 'border-red-300 bg-red-50 text-red-900' : 'border-amber-300 bg-amber-50 text-amber-900';
  return <div className={`rounded-lg border p-4 ${palette}`}><div className="mb-3 text-sm font-semibold">{validation.warningLevel}: output uses documented flag defaults.</div><ul className="mb-4 list-disc pl-5 text-xs">{ids.map((id) => <li key={id}><strong>{id}</strong> — {BASE_ASSUMPTIONS[id]?.flagDefaultBasis ?? 'Proxy table unresolved.'}</li>)}</ul>{children}</div>;
}
