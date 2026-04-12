import express from 'express';
import Stripe from 'stripe';
import { randomUUID } from 'crypto';
import { config } from './config.mjs';
import { createSession, revokeSession, signMagicLink, verifyMagicLinkSignature, SESSION_AUTH_METHOD } from './auth.mjs';
import { clearSessionCookie, requireAdmin, requireAuthenticated, setSessionCookie } from './middleware.mjs';
import { query } from './db.mjs';
import adminAuthRouter from './routes/admin-auth.mjs';
import sessionRouter from './routes/session.mjs';

const router = express.Router();
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })
  : null;

router.use(adminAuthRouter);
router.use(sessionRouter);

router.post('/api/auth/logout', requireAuthenticated, async (req, res) => {
  const token = req.cookies[config.sessionCookieName];
  if (token) await revokeSession(token);
  clearSessionCookie(res);
  res.status(204).send();
});

router.post('/api/auth/magic-link/create', requireAdmin, async (req, res) => {
  const { email, planTier = 'pro', expiresInHours = 168 } = req.body || {};
  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const userRows = await query(
    `INSERT INTO users (id, email, role)
     VALUES ($1, $2, 'free')
     ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
     RETURNING id, email`,
    [randomUUID(), email.toLowerCase()],
  );
  const user = userRows[0];

  const tokenId = randomUUID();
  const expiresAt = new Date(Date.now() + Number(expiresInHours) * 60 * 60 * 1000).toISOString();
  const payload = `${tokenId}:${user.email}:${planTier}:${expiresAt}`;
  const signature = signMagicLink(payload);
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');

  await query(
    `INSERT INTO magic_links (id, user_id, token_id, token_signature_hash, plan_tier, expires_at)
     VALUES ($1, $2, $3, $4, $5, $6::timestamptz)`,
    [randomUUID(), user.id, tokenId, signature, planTier, expiresAt],
  );

  res.json({ token, link: `${req.protocol}://${req.get('host')}/verify-access?token=${token}` });
});

router.post('/api/auth/magic-link/verify', async (req, res) => {
  const { token } = req.body || {};
  if (!token) {
    res.status(400).json({ error: 'Missing token' });
    return;
  }

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [tokenId, email, planTier, expiresAt, signature] = decoded.split(':');
    const payload = `${tokenId}:${email}:${planTier}:${expiresAt}`;

    if (!verifyMagicLinkSignature(payload, signature)) {
      res.status(401).json({ error: 'Invalid signature' });
      return;
    }

    const linkRows = await query(
      `SELECT ml.id, ml.user_id, ml.consumed_at, ml.expires_at
       FROM magic_links ml
       WHERE ml.token_id = $1 AND ml.token_signature_hash = $2
       LIMIT 1`,
      [tokenId, signature],
    );
    const link = linkRows[0];

    if (!link || link.consumed_at) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    if (new Date(link.expires_at).getTime() < Date.now()) {
      res.status(410).json({ error: 'Expired token' });
      return;
    }

    await query('UPDATE magic_links SET consumed_at = NOW() WHERE id = $1', [link.id]);
    await query(
      `INSERT INTO entitlements (id, user_id, plan_tier, source, status, starts_at, ends_at)
       VALUES ($1, $2, $3, 'magic_link', 'active', NOW(), NOW() + INTERVAL '365 days')`,
      [randomUUID(), link.user_id, planTier === 'enterprise' ? 'enterprise' : 'pro'],
    );

    const sessionToken = await createSession(
      link.user_id,
      {
        ipAddress: req.ip,
        userAgent: req.get('user-agent') || 'unknown',
      },
      SESSION_AUTH_METHOD.MAGIC_LINK,
    );
    setSessionCookie(res, sessionToken);

    res.status(204).send();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    res.status(500).json({ error: 'Stripe webhook not configured' });
    return;
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    res.status(400).json({ error: `Invalid signature: ${String(error)}` });
    return;
  }

  await query(
    `INSERT INTO webhook_events (id, type, payload)
     VALUES ($1, $2, $3::jsonb)
     ON CONFLICT (id) DO NOTHING`,
    [event.id, event.type, JSON.stringify(event)],
  );

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const planTier = session.metadata?.plan === 'enterprise' ? 'enterprise' : 'pro';

    if (email) {
      const users = await query(
        `INSERT INTO users (id, email, role)
         VALUES ($1, $2, 'free')
         ON CONFLICT (email) DO UPDATE SET updated_at = NOW()
         RETURNING id`,
        [randomUUID(), email.toLowerCase()],
      );

      await query(
        `INSERT INTO entitlements (id, user_id, plan_tier, source, status, starts_at, ends_at, metadata)
         VALUES ($1, $2, $3, 'stripe_webhook', 'active', NOW(), NOW() + INTERVAL '1 year', $4::jsonb)`,
        [randomUUID(), users[0].id, planTier, JSON.stringify({ checkoutSessionId: session.id })],
      );
    }
  }

  res.json({ received: true });
});

router.get('/api/admin/tools', requireAdmin, (_req, res) => {
  res.json({ allowed: true });
});

export default router;
