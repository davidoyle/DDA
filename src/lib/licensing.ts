export type PlanTier = 'free' | 'pro' | 'enterprise';

export interface LicenseEntitlements {
  canViewCoreResults: boolean;
  canExportExecutiveReport: boolean;
  canViewActionPlan: boolean;
  canCompareScenarios: boolean;
  canSaveAndCompare: boolean;
  canViewBenchmarks: boolean;
  canViewPortfolioBrief: boolean;
}

const PLAN_ENTITLEMENTS: Record<PlanTier, LicenseEntitlements> = {
  free: {
    canViewCoreResults: true,
    canExportExecutiveReport: false,
    canViewActionPlan: false,
    canCompareScenarios: false,
    canSaveAndCompare: false,
    canViewBenchmarks: false,
    canViewPortfolioBrief: false,
  },
  pro: {
    canViewCoreResults: true,
    canExportExecutiveReport: true,
    canViewActionPlan: true,
    canCompareScenarios: true,
    canSaveAndCompare: true,
    canViewBenchmarks: true,
    canViewPortfolioBrief: false,
  },
  enterprise: {
    canViewCoreResults: true,
    canExportExecutiveReport: true,
    canViewActionPlan: true,
    canCompareScenarios: true,
    canSaveAndCompare: true,
    canViewBenchmarks: true,
    canViewPortfolioBrief: true,
  },
};

const STORAGE_KEY = 'dda-plan-tier';

export const getPlanTier = (): PlanTier => {
  if (typeof window === 'undefined') return 'free';
  const tier = window.localStorage.getItem(STORAGE_KEY);
  if (tier === 'pro' || tier === 'enterprise' || tier === 'free') return tier;
  return 'free';
};

export const setPlanTier = (tier: PlanTier) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, tier);
};

export const getEntitlements = (tier: PlanTier): LicenseEntitlements => PLAN_ENTITLEMENTS[tier];
