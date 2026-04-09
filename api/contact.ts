import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactSubmission {
  name: string;
  email: string;
  reason: string;
  message: string;
  segment?: string;
  context?: string;
  source?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const submission: ContactSubmission = req.body;

  if (!submission.email || !submission.message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  console.log('Contact submission:', submission);

  return res.json({
    success: true,
    message: 'Thank you for your inquiry. We will respond within 24 hours.',
  });
}
