import { cn } from '@/lib/utils';
import type { Classification } from '@/lib/model/types';

export default function FlagBadge({ classification }: { classification: Classification }) {
  const styles: Record<Classification, string> = { ACTUAL: 'bg-green-50 text-green-800 border-green-200', PROXY: 'bg-amber-50 text-amber-800 border-amber-200', FLAG: 'bg-red-50 text-red-700 border-red-300 animate-pulse', PARTIAL_ACTUAL: 'bg-orange-50 text-orange-800 border-orange-200' };
  return <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold', styles[classification])}>{classification}</span>;
}
