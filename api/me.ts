import type { VercelRequest, VercelResponse } from '@vercel/node';
import { clearSessionCookie, getSessionFromRequest } from './_auth';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const session = getSessionFromRequest(req.headers.cookie);
  if (!session) {
    res.setHeader('Set-Cookie', clearSessionCookie());
    return res.status(200).json({ authenticated: false, plan: 'free', isAdmin: false });
  }

  return res.status(200).json({
    authenticated: true,
    email: session.email,
    plan: session.plan,
    isAdmin: session.isAdmin,
    exp: session.exp,
  });
}
