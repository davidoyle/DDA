import FlagBadge from '@/components/model/FlagBadge';
import FlagWarningBanner from '@/components/model/FlagWarningBanner';
import { JURISDICTIONS } from '@/lib/model/benchmark';
import { BASE_ASSUMPTIONS } from '@/lib/model/assumptions';
import { validateOutput } from '@/lib/model/validation';
import { Page } from './shared';
export default function BenchmarkPage() { return <Page title="Module 8 — Jurisdiction Benchmark"><FlagWarningBanner validation={validateOutput(BASE_ASSUMPTIONS, ['royalty.thresholdLow'])}><div className="overflow-auto rounded border bg-white"><table className="min-w-full text-sm"><thead className="bg-[#003366] text-white"><tr><th className="p-2">Jurisdiction</th><th>Gov take low/base/high</th><th>CIT</th><th>Royalty</th><th>Carbon</th><th>Index</th><th>Class</th></tr></thead><tbody>{JURISDICTIONS.map((j) => <tr className="border-t" key={j.id}><td className="p-2">{j.name}</td><td>{j.govTakeLow}/{j.govTakeBase}/{j.govTakeHigh}</td><td>{(j.effectiveCITRate * 100).toFixed(0)}%</td><td>{j.royaltyType}</td><td>{j.carbonPrice}</td><td>{j.constructionCostIndex}</td><td><FlagBadge classification={j.classification} /></td></tr>)}</tbody></table></div></FlagWarningBanner></Page>; }
