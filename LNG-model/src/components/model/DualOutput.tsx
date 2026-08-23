import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';
import type { DualOutputRow } from '@/lib/model/types';
import { validateOutput } from '@/lib/model/validation';
import FlagWarningBanner from './FlagWarningBanner';
export default function DualOutput({ rows }: { rows: DualOutputRow[] }) {
  const validation = validateOutput(BASE_ASSUMPTIONS, rows.flatMap((r) => r.flagsUsed));
  return <FlagWarningBanner validation={validation}><div className="overflow-x-auto rounded-lg border bg-white"><table className="min-w-full text-sm"><thead className="bg-[#003366] text-white"><tr><th className="p-3 text-left">Royalty Rate</th><th className="p-3 text-left">Project IRR</th><th className="p-3 text-left">Provincial Revenue NPV</th></tr></thead><tbody>{rows.map((r) => <tr key={r.royaltyRate} className="border-t"><td className="p-3">{(r.royaltyRate * 100).toFixed(1)}%</td><td className={`p-3 font-semibold ${(r.projectIRR ?? 0) > 0.10 ? 'text-green-700' : 'text-red-700'}`}>{r.projectIRR === null ? 'n/a' : `${(r.projectIRR * 100).toFixed(1)}%`}</td><td className="p-3">C${r.provincialRevenueNPV.toFixed(0)}M</td></tr>)}</tbody></table></div></FlagWarningBanner>;
}
