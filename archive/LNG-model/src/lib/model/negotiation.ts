export type ProjectClassification = 'VIABLE_SEEKING_RENTS' | 'GENUINELY_MARGINAL' | 'CONDITIONALLY_VIABLE' | 'NON_VIABLE';
export function classifyProject(projectIRR: number | null, wacc: number): ProjectClassification {
  const irr = projectIRR ?? -1;
  if (irr > wacc + 0.03) return 'VIABLE_SEEKING_RENTS';
  if (Math.abs(irr - wacc) <= 0.01) return 'GENUINELY_MARGINAL';
  if (irr >= wacc - 0.04) return 'CONDITIONALLY_VIABLE';
  return 'NON_VIABLE';
}
export function buildAuditFlags(proponentBreakeven: number, independentBreakeven: number, proponentCapex: number, independentCapex: number) {
  const checks = [
    { metric: 'Breakeven', proponent: proponentBreakeven, independent: independentBreakeven },
    { metric: 'CAPEX', proponent: proponentCapex, independent: independentCapex },
  ];
  return checks.map((c) => ({ ...c, deviation: Math.abs(c.proponent - c.independent) / Math.max(0.01, c.independent), triggered: Math.abs(c.proponent - c.independent) / Math.max(0.01, c.independent) > 0.15 }));
}
