export type PlanTier = 'free' | 'pro' | 'enterprise';
export type SessionRole = 'admin' | 'free' | 'pro' | 'enterprise';

export type SessionResponse = {
  authenticated: boolean;
  role: SessionRole;
  planTier: PlanTier;
  email: string | null;
};

export async function getSession(): Promise<SessionResponse> {
  const response = await fetch('/api/auth/session', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch session');
  }

  return response.json() as Promise<SessionResponse>;
}

export async function getAdminSetupStatus(): Promise<{ setupRequired: boolean }> {
  const response = await fetch('/api/auth/admin/setup-status', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch setup status');
  }

  return response.json() as Promise<{ setupRequired: boolean }>;
}

export async function setupFirstAdmin(payload: { email: string; password: string; confirmPassword: string }) {
  const response = await fetch('/api/auth/admin/setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return response;
}

export async function loginAdmin(payload: { email: string; password: string }) {
  const response = await fetch('/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return response;
}
