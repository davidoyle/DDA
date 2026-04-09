import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const accessStore = new Map<string, { plan: string; expiresAt: number; grantedAt: number }>();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  let event: Stripe.Event;

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    event = stripe.webhooks.constructEvent(payload, sig!, webhookSecret);
  } catch (err: unknown) {
    console.error(`Webhook signature verification failed: ${err instanceof Error ? err.message : String(err)}`);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerEmail = session.customer_email;
      const metadata = session.metadata || {};
      const plan = metadata.plan || 'pro';

      if (customerEmail) {
        accessStore.set(customerEmail, {
          plan,
          expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
          grantedAt: Date.now(),
        });

        console.log(`Access granted for ${customerEmail}: ${plan} plan`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customer = await stripe.customers.retrieve(subscription.customer as string);
      const customerEmail = typeof customer !== 'string' ? customer.email : null;

      if (customerEmail) {
        accessStore.delete(customerEmail);
        console.log(`Access revoked for ${customerEmail}`);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
}

export async function checkAccess(email: string): Promise<boolean> {
  const grant = accessStore.get(email);
  if (!grant) return false;
  if (grant.expiresAt < Date.now()) {
    accessStore.delete(email);
    return false;
  }
  return true;
}
