import { Badge } from '@/components/ui/badge';

type EvidenceTierValue = 'VERIFIED' | 'MODELLED' | 'SPECULATIVE';

const tone: Record<EvidenceTierValue, string> = {
  VERIFIED: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  MODELLED: 'bg-amber-500/20 text-amber-100 border-amber-500/40',
  SPECULATIVE: 'bg-rose-500/20 text-rose-100 border-rose-500/40',
};

export function EvidenceTier({ tier }: { tier: EvidenceTierValue }) {
  return <Badge className={tone[tier]}>Evidence: {tier}</Badge>;
}

export type { EvidenceTierValue };
