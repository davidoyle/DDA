interface ToolDisclaimerProps {
  toolName: string;
  paramDate: string;
  text: string;
}

export function ToolDisclaimer({ toolName, paramDate, text }: ToolDisclaimerProps) {
  return (
    <footer className="text-xs text-[#F3EFE6]/70 border-t border-[#F3EFE6]/10 pt-4 mt-8">
      <p className="font-semibold">{toolName} disclaimer</p>
      <p className="mt-1">{text}</p>
      <p className="mt-1 text-[#F3EFE6]/60">Parameters and source data date: {paramDate}.</p>
    </footer>
  );
}
