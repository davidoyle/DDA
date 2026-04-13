import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSession, type PlanTier, type SessionResponse } from '@/lib/api/auth';

export type AccessMode = 'admin' | 'paid' | 'demo' | 'none';
export type UserRole = 'admin' | 'pro' | 'free' | 'demo' | 'enterprise';

interface AccessState {
  planTier: PlanTier;
  setPlanTier: (_tier: PlanTier) => void;
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
  setAdminModeActive: (_active: boolean) => void;
  hasAdminAccess: boolean;
  isDemoMode: boolean;
  refreshSession: () => Promise<void>;
}

const AccessContext = createContext<AccessState | undefined>(undefined);

const FALLBACK_SESSION: SessionResponse = {
  authenticated: false,
  role: 'free',
  planTier: 'free',
  email: null,
};

function toAccessMode(role: UserRole, isDemoPath: boolean): AccessMode {
  if (role === 'admin') return 'admin';
  if (role === 'pro' || role === 'enterprise') return 'paid';
  if (role === 'demo' || isDemoPath) return 'demo';
  return 'none';
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [session, setSession] = useState<SessionResponse>(FALLBACK_SESSION);

  const refreshSession = useCallback(async () => {
    try {
      const payload = await getSession();
      setSession(payload);
    } catch {
      setSession(FALLBACK_SESSION);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession, location.pathname]);

  const setPlanTier = useCallback((_tier: PlanTier) => {
    // Entitlements are only set by server-side grants now.
  }, []);

  const setAdminModeActive = useCallback((_active: boolean) => {
    // Admin mode is server-authoritative and always on for admin sessions.
  }, []);

  const isDemoPath = location.pathname.startsWith('/diagnostics/demo');
  const accessMode = toAccessMode(session.role, isDemoPath);
  const hasAdminAccess = session.role === 'admin';

  const value = useMemo<AccessState>(() => ({
    planTier: session.planTier,
    setPlanTier,
    isAuthenticated: session.authenticated,
    userEmail: session.email,
    canAccessDiagnostics: accessMode === 'admin' || accessMode === 'paid',
    canExportData: accessMode === 'admin' || accessMode === 'paid',
    canSaveScenarios: accessMode === 'admin' || accessMode === 'paid',
    canAccessAdvancedFeatures: accessMode === 'admin' || (accessMode === 'paid' && session.planTier === 'enterprise'),
    upgradeToPro: () => { window.location.href = '/diagnostics/subscribe?plan=pro'; },
    upgradeToEnterprise: () => { window.location.href = '/diagnostics/subscribe?plan=enterprise'; },
    accessMode,
    isAdminModeActive: hasAdminAccess,
    setAdminModeActive,
    hasAdminAccess,
    isDemoMode: accessMode === 'demo',
    refreshSession,
  }), [accessMode, hasAdminAccess, refreshSession, session, setAdminModeActive, setPlanTier]);

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessProvider');
  return context;
}
