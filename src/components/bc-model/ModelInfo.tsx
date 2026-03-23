import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FLAGGED_DATA_GAPS, SOURCE_LINKS } from '@/lib/bc-model/constants';

export function ModelInfo() {
  return (
    <Accordion type="single" collapsible className="rounded-3xl border border-[#d8cdb9] bg-white px-6">
      <AccordionItem value="methodology" className="border-none">
        <AccordionTrigger className="py-5 text-left font-heading text-2xl text-[#1f1f1f]">Model info & methodology</AccordionTrigger>
        <AccordionContent className="space-y-6 pb-6 text-sm text-[#3f3a34]">
          <div>
            <p className="font-semibold text-[#1f1f1f]">Plain-language description</p>
            <p className="mt-2">This tool estimates 2026–2030 emissions under user-selected policy controls. Outputs are model estimates only; reconciliation with UNFCCC NIR methodology is still required.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1f1f1f]">Objective function</p>
            <p className="mt-2 font-mono text-xs">min Σₜ [Eₜ + λHₜ + μPₜ] subject to legal target, credibility, and grid constraints.</p>
          </div>
          <div>
            <p className="font-semibold text-[#1f1f1f]">Constraints</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>2030 emissions hard-check at 61.0 Mt.</li>
              <li>2025 interim target warning shown at 85.7 Mt.</li>
              <li>Grid expansion shortfalls penalize buildings and industry abatement from 2028 onward.</li>
              <li>Dual-fuel reduces peak pressure but slows full electrification.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#1f1f1f]">Data sources</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><a href={SOURCE_LINKS.accountability} target="_blank" rel="noreferrer" className="text-[#1f3a5f] underline">BC 2025 Accountability Report</a></li>
              <li><a href={SOURCE_LINKS.roadmap} target="_blank" rel="noreferrer" className="text-[#1f3a5f] underline">CleanBC Roadmap to 2030</a></li>
              <li><a href={SOURCE_LINKS.irp} target="_blank" rel="noreferrer" className="text-[#1f3a5f] underline">BC Hydro 2025 IRP</a></li>
              <li><a href={SOURCE_LINKS.servicePlan} target="_blank" rel="noreferrer" className="text-[#1f3a5f] underline">BC Hydro 2024/25 Service Plan</a></li>
              <li><a href={SOURCE_LINKS.climateAct} target="_blank" rel="noreferrer" className="text-[#1f3a5f] underline">BC Climate Change Accountability Act</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#1f1f1f]">Flagged limitations</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {FLAGGED_DATA_GAPS.map((gap) => <li key={gap}>{gap}</li>)}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
