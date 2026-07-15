import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface FormState {
  name: string;
  email: string;
  reason: string;
  message: string;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errorMessage: string;
}

function getReasonFromSegment(segment: string | null): string {
  switch (segment) {
    case 'cost_reducer':
      return 'Cost optimization inquiry';
    case 'risk_avoider':
      return 'Risk assessment inquiry';
    case 'policy_actor':
      return 'Policy analysis inquiry';
    default:
      return '';
  }
}

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const segment = searchParams.get('segment');
  const context = searchParams.get('context');
  const source = searchParams.get('source') || 'direct';

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    reason: getReasonFromSegment(segment),
    message: context || '',
    isSubmitting: false,
    submitStatus: 'idle',
    errorMessage: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, isSubmitting: true, submitStatus: 'idle' }));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          reason: form.reason,
          message: form.message,
          segment,
          context,
          source,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setForm((prev) => ({
        ...prev,
        submitStatus: 'success',
        isSubmitting: false,
        name: '',
        email: '',
        message: '',
      }));
    } catch {
      setForm((prev) => ({
        ...prev,
        submitStatus: 'error',
        isSubmitting: false,
        errorMessage: 'Failed to send message. Please email us directly at david.doyle@ddanalytics.ca',
      }));
    }
  };

  if (form.submitStatus === 'success') {
    return (
      <div className="px-6 py-20 max-w-[700px] mx-auto space-y-4">
        <h1 className="headline-md">Thank You</h1>
        <p>We&apos;ve received your inquiry and will respond within 48 hours.</p>
        <a className="btn-primary" href="/analysis">Browse Analysis</a>
      </div>
    );
  }

  return (
    <div className="px-6 py-20 max-w-[700px] mx-auto">
      <section className="space-y-4 mb-8">
        <h1 className="headline-md">Contact</h1>
        <p className="text-[16px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>Describe what&apos;s at stake and what kind of analysis you need to defend.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>DDA responds within 48 hours with a preliminary read on whether there&apos;s a fit and what an engagement would look like.</p>
        <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>No sales call. No pitch deck. No discovery session designed to extend the conversation. A direct response to what you&apos;ve described.</p>
        <div className="pt-4 text-[15px] leading-[1.8]">
          <p><strong>david.doyle@ddanalytics.ca</strong></p>
          <p style={{ color: 'var(--text-secondary)' }}>Metro Vancouver, BC — Operating nationally</p>
        </div>
      </section>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input type="hidden" name="segment" value={segment || ''} />
        <input type="hidden" name="context" value={context || ''} />

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div>
          <label htmlFor="reason">Organization</label>
          <select
            id="reason"
            value={form.reason}
            onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
          >
            <option value="">Select an organization type</option>
            <option value="Municipality or regional government">Municipality or regional government</option>
            <option value="Resource sector operator">Resource sector operator</option>
            <option value="Government body">Government body</option>
            <option value="Legal or advisory team">Legal or advisory team</option>
            <option value="Journalist or oversight body">Journalist or oversight body</option>
            <option value="General inquiry">General inquiry</option>
          </select>
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            rows={5}
            required
          />
        </div>

        {form.submitStatus === 'error' && (
          <div className="constraint-block">
            {form.errorMessage}
            <br />
            <a href="mailto:david.doyle@ddanalytics.ca?subject=Contact%20Form%20Fallback">Email us directly</a>
          </div>
        )}

        <button className="btn-primary" type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
