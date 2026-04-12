import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { config } from './config.mjs';
import { query } from './db.mjs';

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

export async function validateAdminCredentials(email, password) {
  const rows = await query('SELECT id, email, password_hash, role FROM users WHERE email = $1 LIMIT 1', [email.toLowerCase()]);
  const user = rows[0];
  if (!user || user.role !== 'admin' || !user.password_hash) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  return ok ? user : null;
}

export async function createSession(userId, reqMeta) {
  const token = randomUUID();
  const sessionId = randomUUID();
  const tokenHash = hashSessionToken(token);

  await query(
    `INSERT INTO sessions (id, user_id, session_token_hash, ip_address, user_agent, expires_at)
     VALUES ($1, $2, $3, $4, $5, NOW() + INTERVAL '7 days')`,
    [sessionId, userId, tokenHash, reqMeta.ipAddress, reqMeta.userAgent],
  );

  return token;
}

export async function getSessionUser(sessionToken) {
  const tokenHash = hashSessionToken(sessionToken);
  const rows = await query(
    `SELECT u.id, u.email, u.role,
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
  if (user.role === 'admin') return 'admin';
  return user.plan_tier === 'free' ? 'free' : 'pro';
}
