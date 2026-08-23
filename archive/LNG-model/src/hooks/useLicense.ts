import { useMemo } from 'react';
import { useAccess } from '@/contexts/AccessContext';
import { getEntitlements, type PlanTier } from '@/lib/licensing';

export function useLicense() {
  const { planTier, setPlanTier, accessMode } = useAccess();
  const entitlements = useMemo(() => {
    if (accessMode === 'admin') return getEntitlements('enterprise');
    if (accessMode === 'demo') return getEntitlements('free');
    return getEntitlements(planTier as PlanTier);
  }, [accessMode, planTier]);

  const updatePlan = (nextPlan: PlanTier) => {
    setPlanTier(nextPlan);
  };

  return { plan: planTier as PlanTier, entitlements, updatePlan };
}
