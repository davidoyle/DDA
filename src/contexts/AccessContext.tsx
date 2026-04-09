import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type PlanTier = 'free' | 'pro' | 'enterprise';

interface AccessState {
  planTier: PlanTier;
  setPlanTier: (tier: PlanTier) => void;
  isAuthenticated: boolean;
  userEmail: string | null;
  canAccessDiagnostics: boolean;
  canExportData: boolean;
  canSaveScenarios: boolean;
  canAccessAdvancedFeatures: boolean;
  upgradeToPro: () => void;
  upgradeToEnterprise: () => void;
}

const AccessContext = createContext<AccessState | undefined>(undefined);
const STORAGE_KEY = 'dda_access_state';

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const [searchParams] = useSearchParams();
  const [planTier, setPlanTierState] = useState<PlanTier>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { planTier?: PlanTier };
        return parsed.planTier || 'free';
      } catch {
        return 'free';
      }
    }
    return 'free';
  });

  const [userEmail] = useState<string | null>(() => localStorage.getItem('dda_access_email'));

  useEffect(() => {
    const accessGranted = searchParams.get('access') === 'granted';
    const sub = searchParams.get('sub');

    if (accessGranted) {
      console.log('Access granted via magic link');
    } else if (sub === 'active') {
      queueMicrotask(() => {
        setPlanTierState('pro');
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ planTier: 'pro', grantedAt: Date.now() }));
      });
    }

    if (accessGranted || sub === 'active') {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);

  const setPlanTier = (tier: PlanTier) => {
    setPlanTierState(tier);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ planTier: tier, updatedAt: new Date().toISOString() }));
  };

  const value = useMemo<AccessState>(() => ({
    planTier,
    setPlanTier,
    isAuthenticated: planTier !== 'free' || !!userEmail,
    userEmail,
    canAccessDiagnostics: planTier !== 'free',
    canExportData: planTier === 'pro' || planTier === 'enterprise',
    canSaveScenarios: planTier === 'pro' || planTier === 'enterprise',
    canAccessAdvancedFeatures: planTier === 'enterprise',
    upgradeToPro: () => { window.location.href = '/diagnostics/subscribe?plan=pro'; },
    upgradeToEnterprise: () => { window.location.href = '/diagnostics/subscribe?plan=enterprise'; },
  }), [planTier, userEmail]);

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessProvider');
  return context;
}
