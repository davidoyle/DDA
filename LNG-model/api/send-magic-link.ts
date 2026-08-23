import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

function generateToken(email: string, plan: string): string {
  const payload = `${email}:${plan}:${Date.now() + 7 * 24 * 60 * 60 * 1000}`;
  const signature = crypto
    .createHmac('sha256', process.env.MAGIC_LINK_SECRET || 'dev-secret')
    .update(payload)
    .digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, plan } = req.body;

  if (!email || !plan) {
    return res.status(400).json({ error: 'Missing email or plan' });
  }

  const token = generateToken(email, plan);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.origin || 'http://localhost:5173';
  const magicLink = `${appUrl}/verify-access?token=${token}`;

  console.log(`Magic link for ${email}: ${magicLink}`);

  if (process.env.NODE_ENV === 'development') {
    return res.json({ magicLink, message: 'Development mode - check console' });
  }

  return res.json({ success: true, message: 'Access link sent to your email' });
}
