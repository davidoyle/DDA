import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { buildSessionCookie, type AuthSession } from './_auth';

function verifyMagicToken(token: string) {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [email, planRaw, expiresAtRaw, signature] = decoded.split(':');
    const payload = `${email}:${planRaw}:${expiresAtRaw}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.MAGIC_LINK_SECRET || 'dev-secret')
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) return null;
    const expiresAt = Number.parseInt(expiresAtRaw, 10);
    if (!expiresAt || expiresAt < Date.now()) return null;

    const plan = planRaw === 'enterprise' ? 'enterprise' : planRaw === 'pro' ? 'pro' : 'free';
    return { email, plan } as const;
  } catch {
    return null;
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.body as { token?: string };
  if (!token) return res.status(400).json({ error: 'Token required' });

  const verified = verifyMagicToken(token);
  if (!verified) return res.status(401).json({ error: 'Invalid or expired token' });

  const session: AuthSession = {
    email: verified.email,
    plan: verified.plan,
    isAdmin: false,
    exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };

  res.setHeader('Set-Cookie', buildSessionCookie(session));
  return res.status(200).json({ ok: true, plan: session.plan });
}
