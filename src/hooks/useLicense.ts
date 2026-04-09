import { useMemo } from 'react';
import { useAccess } from '@/contexts/AccessContext';
import { getEntitlements, type PlanTier } from '@/lib/licensing';

export function useLicense() {
  const { planTier, setPlanTier } = useAccess();
  const entitlements = useMemo(() => getEntitlements(planTier as PlanTier), [planTier]);

  const updatePlan = (nextPlan: PlanTier) => {
    setPlanTier(nextPlan);
  };

  return { plan: planTier as PlanTier, entitlements, updatePlan };
}
