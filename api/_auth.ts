import crypto from 'crypto';

export type AuthSession = {
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  isAdmin: boolean;
  exp: number;
};

const COOKIE_NAME = 'dda_auth';

function getSessionSecret() {
  return process.env.SESSION_SECRET || process.env.MAGIC_LINK_SECRET || 'dev-session-secret-change-me';
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

export function encodeSession(session: AuthSession) {
  const payload = JSON.stringify(session);
  const payloadB64 = Buffer.from(payload).toString('base64url');
  const signature = sign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export function decodeSession(token: string | undefined | null): AuthSession | null {
  if (!token || !token.includes('.')) return null;
  const [payloadB64, signature] = token.split('.');
  if (!payloadB64 || !signature) return null;
  if (sign(payloadB64) !== signature) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as AuthSession;
    if (!parsed.exp || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader: string | undefined) {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (!k) continue;
    out[k] = decodeURIComponent(rest.join('='));
  }
  return out;
}

export function getSessionFromRequest(cookieHeader: string | undefined) {
  const cookies = parseCookies(cookieHeader);
  return decodeSession(cookies[COOKIE_NAME]);
}

export function buildSessionCookie(session: AuthSession) {
  const token = encodeSession(session);
  const secure = process.env.NODE_ENV === 'production';
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}${secure ? '; Secure' : ''}`;
}

export function clearSessionCookie() {
  const secure = process.env.NODE_ENV === 'production';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`;
}
