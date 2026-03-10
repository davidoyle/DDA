export const fundedRatioHistory = [
  { year: 2020, ratio: 153.2 },
  { year: 2021, ratio: 154.7 },
  { year: 2022, ratio: 146.5 },
  { year: 2023, ratio: 142.1 },
  { year: 2024, ratio: 140.8 },
] as const;

export const scenarios = {
  bull: { annualErosion: -0.2 },
  base: { annualErosion: 2.1 },
  bear: { annualErosion: 4.4 },
} as const;

export const thresholds = [135, 130] as const;
