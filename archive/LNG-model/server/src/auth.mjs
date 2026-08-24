import crypto from 'crypto';
import { randomUUID } from 'crypto';
import { config } from './config.mjs';
import { query } from './db.mjs';

export const SESSION_AUTH_METHOD = {
  ADMIN_PASSWORD: 'admin_password',
  MAGIC_LINK: 'magic_link',
  USER_PASSWORD: 'user_password',
};

export function hashSessionToken(token) {
  return crypto.createHash('sha256').update(`${token}:${config.sessionSecret}`).digest('hex');
}

export function signMagicLink(payload) {
  return crypto.createHmac('sha256', config.magicLinkSecret).update(payload).digest('hex');
}

export function verifyMagicLinkSignature(payload, signature) {
  const expected = signMagicLink(payload);
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export async function createSession(userId, reqMeta, authMethod) {
  if (!Object.values(SESSION_AUTH_METHOD).includes(authMethod)) {
    throw new Error('Invalid session auth method');
  }

  const token = randomUUID();
  const sessionId = randomUUID();
  const tokenHash = hashSessionToken(token);

  await query(
    `INSERT INTO sessions (id, user_id, session_token_hash, ip_address, user_agent, expires_at, auth_method)
     VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days', $6)`,
    [sessionId, userId, tokenHash, reqMeta.ipAddress, reqMeta.userAgent, authMethod],
  );

  return token;
}

export async function getSessionUser(sessionToken) {
  const tokenHash = hashSessionToken(sessionToken);
  const rows = await query(
    `SELECT u.id, u.email, u.role, s.auth_method,
      COALESCE((
        SELECT e.plan_tier
        FROM entitlements e
        WHERE e.user_id = u.id
          AND e.status = 'active'
          AND (e.ends_at IS NULL OR e.ends_at > NOW())
        ORDER BY e.created_at DESC
        LIMIT 1
      ), 'free') AS plan_tier
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.session_token_hash = $1
      AND s.revoked_at IS NULL
      AND s.expires_at > NOW()
    LIMIT 1`,
    [tokenHash],
  );

  return rows[0] || null;
}

export async function revokeSession(sessionToken) {
  const tokenHash = hashSessionToken(sessionToken);
  await query('UPDATE sessions SET revoked_at = NOW() WHERE session_token_hash = $1', [tokenHash]);
}

export function deriveRole(user) {
  if (!user) return 'free';
  if (user.role === 'admin' && user.auth_method === SESSION_AUTH_METHOD.ADMIN_PASSWORD) return 'admin';
  if (user.plan_tier === 'enterprise') return 'enterprise';
  if (user.plan_tier === 'pro') return 'pro';
  return 'free';
}
