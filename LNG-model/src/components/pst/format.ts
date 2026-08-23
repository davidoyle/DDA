export const money = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value)

export const pct = (value: number, digits = 2) => `${(value * 100).toFixed(digits)}%`
