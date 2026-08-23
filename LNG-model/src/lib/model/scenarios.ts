import type { AssumptionRegister, Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  { id: 'base', label: 'Base', description: 'Base public assumptions.', overrides: {} },
  { id: 'high_price', label: 'High price', description: 'High BC plant inlet and LNG price.', overrides: { 'price.bcPlantInlet.base': 2.82, 'price.jkm.base': 18.0 } },
  { id: 'low_price', label: 'Low price', description: 'Low BC plant inlet and LNG price.', overrides: { 'price.bcPlantInlet.base': 1.22, 'price.jkm.base': 10.0 } },
  { id: 'royalty_distortion', label: 'Royalty distortion', description: 'Price near low royalty threshold proxy.', overrides: { 'price.bcPlantInlet.base': 1.50 } },
  { id: 'pipeline_constraint', label: 'Pipeline constraint', description: 'Higher pipeline toll proxy.', overrides: { 'infra.pipelineToll': 0.75 } },
  { id: 'methane_shock', label: 'Methane shock', description: 'Higher upstream opex proxy.', overrides: { 'upstream.wellOpex': 0.55 } },
  { id: 'ramp_delay', label: 'Ramp delay', description: 'Two-year in-service delay handled in project inputs.', overrides: {} },
  { id: 'policy_reversal', label: 'Policy reversal', description: 'Lower high threshold increases royalty sensitivity.', overrides: { 'royalty.thresholdHigh': 2.50 } },
];

export function applyScenario(baseRegister: AssumptionRegister, scenario: Scenario): AssumptionRegister {
  const copy: AssumptionRegister = Object.fromEntries(Object.entries(baseRegister).map(([id, assumption]) => [id, { ...assumption }])) as AssumptionRegister;
  Object.entries(scenario.overrides).forEach(([id, value]) => {
    if (copy[id] && value !== undefined) copy[id] = { ...copy[id], value, classification: copy[id].classification === 'ACTUAL' ? 'PARTIAL_ACTUAL' : copy[id].classification };
  });
  return copy;
}
