import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, customerEmail, metadata, returnTo } = req.body;

    if (!priceId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!String(priceId).startsWith('price_') && !String(priceId).includes('placeholder')) {
      return res.status(400).json({ error: 'Invalid price ID format' });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || req.headers.origin || 'http://localhost:5173';
    const returnTarget = returnTo === 'dashboard' ? '/dashboard' : '/diagnostics';
    const successUrl = `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}&returnTo=${encodeURIComponent(returnTarget)}`;
    const cancelUrl = `${baseUrl}/diagnostics/subscribe?checkout=cancelled`;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      metadata: {
        ...(metadata ?? {}),
        environment: process.env.NODE_ENV || 'development',
      },
      allow_promotion_codes: true,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err: unknown) {
    console.error('Stripe session error:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : String(err),
      type: err && typeof err=='object' && 'type' in err ? (err as { type?: unknown }).type : undefined,
      code: err && typeof err=='object' && 'code' in err ? (err as { code?: unknown }).code : undefined,
    });
  }
}
