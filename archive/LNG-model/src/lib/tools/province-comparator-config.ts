export const provinces = ['BC', 'Alberta', 'Ontario', 'Washington', 'Oregon'] as const;

export const provinceMeta = {
  BC: { fundedRatio: 140.8, surplusPercentPayroll: 1.9, dataDate: '2026-01-01', unit: 'per-$100 payroll' },
  Alberta: { fundedRatio: 123.2, surplusPercentPayroll: 1.2, dataDate: '2026-01-01', unit: 'per-$100 payroll' },
  Ontario: { fundedRatio: 155.0, surplusPercentPayroll: 2.3, dataDate: '2026-01-01', unit: 'per-$100 payroll' },
  Washington: { fundedRatio: 112.0, surplusPercentPayroll: 0.8, dataDate: '2026-01-01', unit: 'per-hour' },
  Oregon: { fundedRatio: 129.0, surplusPercentPayroll: 1.1, dataDate: '2026-01-01', unit: 'per-$100 payroll' },
} as const;

export const rates = {
  BC: { 2024: 1.55, 2025: 1.55, 2026: 1.55 },
  Alberta: { 2024: 1.41, 2025: 1.41, 2026: 1.46 },
  Ontario: { 2024: 1.25, 2025: 1.25, 2026: 1.23 },
  Washington: { 2024: 2.15, 2025: 2.2, 2026: 2.26 },
  Oregon: { 2024: 1.6, 2025: 1.58, 2026: 1.57 },
} as const;
