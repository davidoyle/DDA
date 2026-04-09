import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSessionCookie, type AuthSession } from './_auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { password } = req.body as { password?: string };
  const expected = process.env.ADMIN_OVERRIDE_KEY;

  if (!password || !expected || password !== expected) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const session: AuthSession = {
    email: 'admin@dda-internal',
    plan: 'enterprise',
    isAdmin: true,
    exp: Date.now() + 24 * 60 * 60 * 1000,
  };

  res.setHeader('Set-Cookie', buildSessionCookie(session));
  return res.status(200).json({ ok: true });
}
