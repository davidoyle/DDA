import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DataQualityRing({ actualCount, totalCount, size = 56, onClick, label = 'Open data quality drawer' }: { actualCount: number; totalCount: number; size?: number; onClick?: () => void; label?: string }) {
  const fraction = totalCount > 0 ? Math.max(0, Math.min(1, actualCount / totalCount)) : 1;
  const pct = Math.round(fraction * 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = fraction === 1 ? '#16a34a' : fraction >= 0.8 ? '#16a34a' : fraction >= 0.5 ? '#f59e0b' : '#dc2626';
  return <button type="button" aria-label={label} onClick={onClick} className={cn('relative inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#003366] focus:ring-offset-2', onClick && 'cursor-pointer')} style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="5" />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - fraction)} />
    </svg>
    <span className="absolute text-[10px] font-bold text-slate-700">{fraction === 1 ? <Check className="h-4 w-4 text-green-700" /> : `${pct}%`}</span>
  </button>;
}
