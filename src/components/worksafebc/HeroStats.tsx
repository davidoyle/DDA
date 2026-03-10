import type { HeroStat } from '@/lib/worksafebc/types';

interface HeroStatsProps {
  stats: HeroStat[];
}

const HeroStats = ({ stats }: HeroStatsProps) => (
  <div className="grid md:grid-cols-4 gap-4 mt-8">
    {stats.map((stat) => (
      <article key={stat.value} className="card space-y-2">
        <p className="font-heading text-3xl">{stat.value}</p>
        <p className="text-sm text-[#F3EFE6]/70">{stat.label}</p>
      </article>
    ))}
  </div>
);

export default HeroStats;
