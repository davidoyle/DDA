import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { BASE_ASSUMPTIONS, P1_FLAG_IDS, P2_FLAG_IDS } from '@/lib/model/assumptions';

const instruction = (id: string) => {
  if (id.includes('royalty.threshold')) return "Get the royalty price threshold schedule from the Ministry's internal royalty policy documentation; this unlocks the price-sensitive royalty calculation.";
  if (id === 'macro.wacc') return 'Confirm the project-specific cost of capital from finance branch review or independent advisor work; this tightens viability and fiscal-space outputs.';
  if (id === 'macro.socialDiscountRate') return 'Confirm the Ministry discount-rate instruction for public revenue valuation; this tightens provincial NPV outputs.';
  if (id === 'price.jkm.base') return 'Replace the LNG price proxy with the approved market deck; this moves revenue, IRR, and provincial NPV.';
  if (id === 'tax.ccaLNGFacility') return 'Confirm CCA class treatment for LNG facilities with tax counsel or CRA interpretation; this updates after-tax cash flows.';
  return 'Replace this public proxy with Ministry-approved project data; this removes one estimated input from downstream outputs.';
};

function Group({ title, ids }: { title: string; ids: string[] }) {
  return <section className="space-y-3"><h3 className="text-sm font-bold uppercase tracking-wide text-[#003366]">{title}</h3>{ids.map((id, index) => {
    const assumption = BASE_ASSUMPTIONS[id];
    if (!assumption) return null;
    return <div key={id} className="rounded-lg border border-slate-200 bg-slate-50 p-3"><p className="font-semibold text-slate-900">Step {index + 1}: {assumption.label}</p><p className="mt-1 text-sm text-slate-700">{instruction(id)}</p><p className="mt-2 text-xs text-slate-500">Current default: {String(assumption.flagDefault)} {assumption.unit}. Basis: {assumption.flagDefaultBasis}</p></div>;
  })}</section>;
}

export default function DataQualityDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const flags = Object.keys(BASE_ASSUMPTIONS).filter((id) => BASE_ASSUMPTIONS[id].classification === 'FLAG');
  const p3 = flags.filter((id) => !P1_FLAG_IDS.includes(id) && !P2_FLAG_IDS.includes(id));
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/30" /><Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl"><div className="mb-6 flex items-start justify-between gap-4"><div><Dialog.Title className="text-xl font-bold text-[#003366]">Data quality resolution plan</Dialog.Title><Dialog.Description className="mt-1 text-sm text-slate-600">Resolve open flags in priority order. Outputs remain available while these public defaults are active.</Dialog.Description></div><Dialog.Close className="rounded p-1 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></Dialog.Close></div><div className="space-y-6"><Group title="P1 — resolve first" ids={P1_FLAG_IDS} /><Group title="P2 — material estimates" ids={P2_FLAG_IDS} /><Group title="P3 — remaining inputs" ids={p3} /></div></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
