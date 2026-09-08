import { describe, expect, it } from 'vitest';
import { calculatePST } from './pst-engine';
import type { PSTFormValues } from './pst-types';

const baseForm: PSTFormValues = {
  sector: 'other',
  firmSize: 'mid',
  spendAccounting: 100_000,
  spendAEG: 0,
  spendRealEstate: 0,
  spendSecurity: 0,
  bundlingScenario: 'base',
  responseScenario: 'medium',
};

describe('calculatePST', () => {
  it('computes PST cost as spend * taxable share * PST rate for a single service', () => {
    const result = calculatePST(baseForm);

    // accounting taxable share is 0.92, PST_RATE is 0.07
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].pstCost).toBeCloseTo(100_000 * 0.92 * 0.07, 5);
    expect(result.totalPST).toBeCloseTo(result.rows[0].pstCost, 5);
    expect(result.totalSpend).toBe(100_000);
  });

  it('excludes services with zero spend from the row breakdown', () => {
    const result = calculatePST(baseForm);
    expect(result.rows.map((r) => r.id)).toEqual(['accounting']);
  });

  it('applies the passthrough override instead of the sector/firm-size default when set', () => {
    const withOverride = calculatePST({ ...baseForm, passthroughOverride: 0 });
    const withoutOverride = calculatePST(baseForm);

    expect(withOverride.passthroughRate).toBe(0);
    // With 0% passthrough, none of the PST cost is offset — netCost equals pstCost.
    expect(withOverride.rows[0].netCost).toBeCloseTo(withOverride.rows[0].pstCost, 5);
    expect(withoutOverride.passthroughRate).toBeGreaterThan(0);
  });

  it('only surfaces the investment-drag figures once total PST clears the panel threshold', () => {
    const belowThreshold = calculatePST(baseForm); // 100_000 * 0.92 * 0.07 = 6_440
    expect(belowThreshold.investmentDragCentral).toBeUndefined();

    const aboveThreshold = calculatePST({ ...baseForm, spendAccounting: 1_000_000 });
    expect(aboveThreshold.investmentDragCentral).toBeDefined();
  });

  it('flags the small-firm multiplier only for small firms', () => {
    const small = calculatePST({ ...baseForm, firmSize: 'small' });
    const mid = calculatePST({ ...baseForm, firmSize: 'mid' });

    expect(small.riskFlags.some((f) => f.id === 'small-firm-multiplier')).toBe(true);
    expect(mid.riskFlags.some((f) => f.id === 'small-firm-multiplier')).toBe(false);
  });
});
