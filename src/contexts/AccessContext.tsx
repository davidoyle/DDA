import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

export type PlanTier = 'free' | 'pro' | 'enterprise';
export type AccessMode = 'admin' | 'paid' | 'demo' | 'none';

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
  accessMode: AccessMode;
  isAdminModeActive: boolean;
  setAdminModeActive: (active: boolean) => void;
  hasAdminAccess: boolean;
  isDemoMode: boolean;
  refreshAccess: () => Promise<void>;
}

const AccessContext = createContext<AccessState | undefined>(undefined);
const ADMIN_TOGGLE_KEY = 'dda_admin_mode_active';

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [planTier, setPlanTierState] = useState<PlanTier>('free');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [isAdminModeActive, setIsAdminModeActive] = useState<boolean>(() => localStorage.getItem(ADMIN_TOGGLE_KEY) !== 'false');

  async function refreshAccess() {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch session');
      const data = await res.json() as { authenticated: boolean; email?: string; plan?: PlanTier; isAdmin?: boolean };
      setIsAuthenticated(Boolean(data.authenticated));
      setUserEmail(data.email ?? null);
      setPlanTierState(data.plan ?? 'free');
      setHasAdminAccess(Boolean(data.isAdmin));
    } catch {
      setIsAuthenticated(false);
      setUserEmail(null);
      setPlanTierState('free');
      setHasAdminAccess(false);
    }
  }

  useEffect(() => {
    void refreshAccess();
  }, []);

  useEffect(() => {
    if (!location.pathname.startsWith('/diagnostics')) return;
    void refreshAccess();
  }, [location.pathname]);

  const setPlanTier = (tier: PlanTier) => {
    setPlanTierState(tier);
  };

  const setAdminModeActive = (active: boolean) => {
    setIsAdminModeActive(active);
    localStorage.setItem(ADMIN_TOGGLE_KEY, String(active));
  };

  const isDemoPath = location.pathname.startsWith('/diagnostics/demo');
  const activeAdmin = hasAdminAccess && isAdminModeActive;
  const accessMode: AccessMode = activeAdmin
    ? 'admin'
    : isAuthenticated
      ? 'paid'
      : isDemoPath
        ? 'demo'
        : 'none';

  const value = useMemo<AccessState>(() => ({
    planTier,
    setPlanTier,
    isAuthenticated,
    userEmail,
    canAccessDiagnostics: accessMode === 'admin' || accessMode === 'paid',
    canExportData: accessMode === 'admin' || accessMode === 'paid',
    canSaveScenarios: accessMode === 'admin' || accessMode === 'paid',
    canAccessAdvancedFeatures: accessMode === 'admin' || (accessMode === 'paid' && planTier === 'enterprise'),
    upgradeToPro: () => { window.location.href = '/diagnostics/subscribe?plan=pro'; },
    upgradeToEnterprise: () => { window.location.href = '/diagnostics/subscribe?plan=enterprise'; },
    accessMode,
    isAdminModeActive,
    setAdminModeActive,
    hasAdminAccess,
    isDemoMode: accessMode === 'demo',
    refreshAccess,
  }), [planTier, isAuthenticated, userEmail, accessMode, isAdminModeActive, hasAdminAccess]);

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessProvider');
  return context;
}
