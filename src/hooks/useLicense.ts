import { useMemo, useState } from 'react';
import { getEntitlements, getPlanTier, setPlanTier, type PlanTier } from '@/lib/licensing';

export function useLicense() {
  const [plan, setPlan] = useState<PlanTier>(() => getPlanTier());

  const entitlements = useMemo(() => getEntitlements(plan), [plan]);

  const updatePlan = (nextPlan: PlanTier) => {
    setPlanTier(nextPlan);
    setPlan(nextPlan);
  };

  return { plan, entitlements, updatePlan };
}
