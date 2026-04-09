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
        errorMessage: 'Failed to send message. Please email us directly at hello@dda.ca',
      }));
    }
  };

  if (form.submitStatus === 'success') {
    return (
      <div className="px-6 py-20 max-w-[700px] mx-auto space-y-4">
        <h1 className="headline-md">Thank You</h1>
        <p>We&apos;ve received your inquiry and will respond within 24 hours.</p>
        <a className="btn-primary" href="/diagnostics">Explore Diagnostics</a>
      </div>
    );
  }

  return (
    <div className="px-6 py-20 max-w-[700px] mx-auto">
      <h1 className="headline-md mb-6">Contact</h1>
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
          <label htmlFor="reason">Reason for Contact</label>
          <select
            id="reason"
            value={form.reason}
            onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
          >
            <option value="">Select a reason</option>
            <option value="Cost optimization inquiry">Cost optimization</option>
            <option value="Risk assessment inquiry">Risk assessment</option>
            <option value="Policy analysis inquiry">Policy analysis</option>
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
            <a href="mailto:hello@dda.ca?subject=Contact%20Form%20Fallback">Email us directly</a>
          </div>
        )}

        <button className="btn-primary" type="submit" disabled={form.isSubmitting}>
          {form.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
