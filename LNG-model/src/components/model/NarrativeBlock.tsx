export default function NarrativeBlock({ narrative }: { narrative: { viability: string; revenue: string; recommendation: string } }) {
  return <section className="space-y-3">{[narrative.viability, narrative.revenue, narrative.recommendation].map((sentence) => <p key={sentence} className="border-l-4 border-[#003366] pl-4 text-base leading-relaxed text-slate-700">{sentence}</p>)}</section>;
}
