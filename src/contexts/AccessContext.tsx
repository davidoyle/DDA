import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { dispatchAnalyticsEvent } from '@/lib/analytics';

export type PlanTier = 'free' | 'pro' | 'enterprise';
export type AccessMode = 'admin' | 'paid' | 'demo' | 'none';

type AdminSession = {
  adminKey: string;
  activatedAt: number;
  expiresAt: number;
};

type PaidSession = {
  sessionToken: string;
  email: string;
  orgId: string;
  plan: PlanTier;
  updatedAt: number;
};

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
}

const AccessContext = createContext<AccessState | undefined>(undefined);
const LEGACY_STORAGE_KEY = 'dda_access_state';
const ADMIN_SESSION_KEY = 'dda_admin_session';
const ADMIN_TOGGLE_KEY = 'dda_admin_mode_active';
const PAID_SESSION_KEY = 'dda_session';
const ADMIN_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const PAID_SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function readAdminSession(): AdminSession | null {
  const raw = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AdminSession;
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    return null;
  }
}

function readPaidSession(): PaidSession | null {
  const raw = localStorage.getItem(PAID_SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PaidSession;
    if (!parsed.updatedAt || Date.now() - parsed.updatedAt > PAID_SESSION_TTL_MS) {
      localStorage.removeItem(PAID_SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(PAID_SESSION_KEY);
    return null;
  }
}

export function AccessProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [planTier, setPlanTierState] = useState<PlanTier>(() => {
    const paid = readPaidSession();
    if (paid?.plan) return paid.plan;

    const stored = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!stored) return 'free';

    try {
      const parsed = JSON.parse(stored) as { planTier?: PlanTier };
      return parsed.planTier || 'free';
    } catch {
      return 'free';
    }
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    const paid = readPaidSession();
    return paid?.email ?? localStorage.getItem('dda_access_email');
  });

  const [adminSession, setAdminSession] = useState<AdminSession | null>(() => readAdminSession());
  const [isAdminModeActive, setIsAdminModeActive] = useState<boolean>(() => localStorage.getItem(ADMIN_TOGGLE_KEY) !== 'false');

  useEffect(() => {
    const adminKey = searchParams.get('admin_key');
    const expectedKey = import.meta.env.VITE_ADMIN_OVERRIDE_KEY || import.meta.env.ADMIN_OVERRIDE_KEY;
    if (!adminKey || !expectedKey) return;

    if (adminKey === expectedKey) {
      const nextSession: AdminSession = {
        adminKey,
        activatedAt: Date.now(),
        expiresAt: Date.now() + ADMIN_SESSION_TTL_MS,
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(nextSession));
      localStorage.setItem(ADMIN_TOGGLE_KEY, 'true');
      setAdminSession(nextSession);
      setIsAdminModeActive(true);
      dispatchAnalyticsEvent('admin_key_used', { route: location.pathname });
      window.history.replaceState({}, '', location.pathname);
      return;
    }

    dispatchAnalyticsEvent('admin_key_invalid', { route: location.pathname });
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (!adminSession) return;
    const next = { ...adminSession, expiresAt: Date.now() + ADMIN_SESSION_TTL_MS };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(next));
    setAdminSession(next);
    // only on route changes while admin exists
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const accessGranted = searchParams.get('access') === 'granted';
    const sub = searchParams.get('sub');

    if (!accessGranted && sub !== 'active') return;

    const nextPlan: PlanTier = 'pro';
    setPlanTierState(nextPlan);

    const existing = readPaidSession();
    const nextSession: PaidSession = {
      sessionToken: existing?.sessionToken ?? crypto.randomUUID(),
      email: existing?.email ?? localStorage.getItem('dda_access_email') ?? '',
      orgId: existing?.orgId ?? 'default-org',
      plan: nextPlan,
      updatedAt: Date.now(),
    };
    localStorage.setItem(PAID_SESSION_KEY, JSON.stringify(nextSession));

    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify({ planTier: nextPlan, grantedAt: Date.now() }));
    window.history.replaceState({}, '', location.pathname);
  }, [location.pathname, searchParams]);

  const setPlanTier = useCallback((tier: PlanTier) => {
    setPlanTierState(tier);
    const existing = readPaidSession();
    const nextSession: PaidSession = {
      sessionToken: existing?.sessionToken ?? crypto.randomUUID(),
      email: existing?.email ?? localStorage.getItem('dda_access_email') ?? '',
      orgId: existing?.orgId ?? 'default-org',
      plan: tier,
      updatedAt: Date.now(),
    };

    localStorage.setItem(PAID_SESSION_KEY, JSON.stringify(nextSession));
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify({ planTier: tier, updatedAt: new Date().toISOString() }));
    setUserEmail(nextSession.email);
  }, []);

  const setAdminModeActive = useCallback((active: boolean) => {
    setIsAdminModeActive(active);
    localStorage.setItem(ADMIN_TOGGLE_KEY, String(active));
  }, []);

  const isDemoPath = location.pathname.startsWith('/diagnostics/demo');
  const hasAdminAccess = !!adminSession;
  const hasPaidAccess = !!readPaidSession() || planTier !== 'free';
  const activeAdmin = hasAdminAccess && isAdminModeActive;

  const accessMode: AccessMode = activeAdmin
    ? 'admin'
    : hasPaidAccess
      ? 'paid'
      : isDemoPath
        ? 'demo'
        : 'none';

  const value = useMemo<AccessState>(() => ({
    planTier,
    setPlanTier,
    isAuthenticated: accessMode === 'admin' || accessMode === 'paid',
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
  }), [accessMode, hasAdminAccess, isAdminModeActive, planTier, setAdminModeActive, setPlanTier, userEmail]);

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (!context) throw new Error('useAccess must be used within AccessProvider');
  return context;
}
