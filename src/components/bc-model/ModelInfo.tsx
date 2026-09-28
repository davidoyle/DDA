import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FLAGGED_DATA_GAPS, SOURCE_LINKS } from '@/lib/bc-model/constants';

export function ModelInfo() {
  return (
    <Accordion type="single" collapsible className="rounded-lg border border-[#D9DDDA] bg-white px-6">
      <AccordionItem value="methodology" className="border-none">
        <AccordionTrigger className="py-5 text-left font-heading text-2xl text-[#111111]">Model info & methodology</AccordionTrigger>
        <AccordionContent className="space-y-6 pb-6 text-sm text-[#111111]">
          <div>
            <p className="font-semibold text-[#111111]">Plain-language description</p>
            <p className="mt-2">This tool estimates 2026–2030 emissions under user-selected policy controls. Outputs are model estimates only; reconciliation with UNFCCC NIR methodology is still required.</p>
          </div>
          <div>
            <p className="font-semibold text-[#111111]">Objective function</p>
            <p className="mt-2 font-mono text-xs">min Σₜ [Eₜ + λHₜ + μPₜ] subject to legal target, credibility, and grid constraints.</p>
          </div>
          <div>
            <p className="font-semibold text-[#111111]">Constraints</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>2030 emissions hard-check at 61.0 Mt.</li>
              <li>2025 interim target warning shown at 85.7 Mt.</li>
              <li>Grid expansion shortfalls penalize buildings and industry abatement from 2028 onward.</li>
              <li>Dual-fuel reduces peak pressure but slows full electrification.</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#111111]">Data sources</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li><a href={SOURCE_LINKS.accountability} target="_blank" rel="noopener noreferrer" className="text-[#16324F] underline">BC 2025 Accountability Report</a></li>
              <li><a href={SOURCE_LINKS.roadmap} target="_blank" rel="noopener noreferrer" className="text-[#16324F] underline">CleanBC Roadmap to 2030</a></li>
              <li><a href={SOURCE_LINKS.irp} target="_blank" rel="noopener noreferrer" className="text-[#16324F] underline">BC Hydro 2025 IRP</a></li>
              <li><a href={SOURCE_LINKS.servicePlan} target="_blank" rel="noopener noreferrer" className="text-[#16324F] underline">BC Hydro 2024/25 Service Plan</a></li>
              <li><a href={SOURCE_LINKS.climateAct} target="_blank" rel="noopener noreferrer" className="text-[#16324F] underline">BC Climate Change Accountability Act</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#111111]">Flagged limitations</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {FLAGGED_DATA_GAPS.map((gap) => <li key={gap}>{gap}</li>)}
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
