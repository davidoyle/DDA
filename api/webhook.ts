import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const forwardUrl = process.env.STRIPE_WEBHOOK_FORWARD_URL;
  if (!forwardUrl) {
    return res.status(500).json({
      error: 'Set STRIPE_WEBHOOK_FORWARD_URL to your persistent /api/webhook/stripe endpoint',
    });
  }

  try {
    const response = await fetch(forwardUrl, {
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type'] || 'application/json',
        'stripe-signature': String(req.headers['stripe-signature'] || ''),
      },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    });

    const payload = await response.text();
    return res.status(response.status).send(payload);
  } catch (error: unknown) {
    return res.status(502).json({
      error: error instanceof Error ? error.message : 'Unable to forward webhook event',
    });
  }
}
