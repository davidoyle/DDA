let transporterPromise;

async function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  if (!transporterPromise) {
    transporterPromise = import('nodemailer').then(({ default: nodemailer }) =>
      nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      }),
    );
  }
  return transporterPromise;
}

// Best-effort delivery only: the caller has already persisted the
// submission to contact_submissions, so a failure here never loses the
// lead — it just means the notification has to be picked up from the DB.
export async function notifyContactSubmission(submission) {
  const results = { email: false, webhook: false };

  const transporter = await getTransporter();
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  if (transporter && to) {
    try {
      await transporter.sendMail({
        from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER,
        to,
        replyTo: submission.email,
        subject: `New contact form submission${submission.reason ? ` — ${submission.reason}` : ''}`,
        text: [
          `Name: ${submission.name || '(not provided)'}`,
          `Email: ${submission.email}`,
          `Reason: ${submission.reason || '(not provided)'}`,
          `Segment: ${submission.segment || '(not provided)'}`,
          `Context: ${submission.context || '(not provided)'}`,
          `Source: ${submission.source}`,
          '',
          submission.message,
        ].join('\n'),
      });
      results.email = true;
    } catch (error) {
      console.error('Unable to email contact submission', error);
    }
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      results.webhook = response.ok;
      if (!response.ok) {
        console.error('Contact webhook forward rejected', response.status);
      }
    } catch (error) {
      console.error('Unable to forward contact submission to webhook', error);
    }
  }

  return results;
}
