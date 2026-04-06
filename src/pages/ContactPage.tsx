import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const contextPlaceholders: Record<string, string> = {
  'Public sector — RFP or municipal engagement': 'Public sector — RFP or municipal engagement',
  'Interested in similar analysis': 'Interested in similar analysis',
  'Litigation or regulatory proceeding': 'Litigation or regulatory proceeding',
};

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const context = searchParams.get('context') || '';
  const needsPlaceholder = useMemo(
    () => contextPlaceholders[context] || 'Describe the system, the question, or the situation.',
    [context],
  );

  return (
    <div className="px-6 py-[var(--space-10)]">
      <section className="max-w-[560px] mx-auto">
        <h1 className="headline-md">Contact</h1>
      </section>

      <section className="max-w-[560px] mx-auto mt-[var(--space-7)] constraint-block">
        Before you submit: DDA&apos;s analysis is grounded in public evidence. Findings are stated with explicit uncertainty tiers. If your situation requires conclusions beyond what the evidence supports, we will say so — and that may mean we are not the right fit. If that works for you, describe your situation below.
      </section>

      <section className="max-w-[560px] mx-auto mt-[var(--space-7)]">
        <form className="space-y-5" onSubmit={(event) => event.preventDefault()} method="post">
          <div>
            <label htmlFor="organization">Organization</label>
            <input id="organization" name="organization" type="text" placeholder="Organization" />
          </div>

          <div>
            <label htmlFor="role">Your role</label>
            <input id="role" name="role" type="text" placeholder="Your role" />
          </div>

          <div>
            <label htmlFor="problem">What needs to be understood</label>
            <textarea id="problem" name="problem" placeholder={needsPlaceholder} defaultValue={context ? `${context}\n\n` : undefined} />
          </div>

          <div>
            <label htmlFor="timeline">Timeline</label>
            <select id="timeline" name="timeline" defaultValue="Immediate">
              <option>Immediate</option>
              <option>Within 3 months</option>
              <option>Within 6 months</option>
              <option>No fixed deadline</option>
            </select>
          </div>

          <div>
            <label htmlFor="budget">Budget range (optional)</label>
            <select id="budget" name="budget" defaultValue="Unknown">
              <option>Under $25K</option>
              <option>$25–75K</option>
              <option>$75–150K</option>
              <option>$150K+</option>
              <option>Unknown</option>
            </select>
          </div>

          <div>
            <label htmlFor="source">How did you find DDA (optional)</label>
            <input id="source" name="source" type="text" placeholder="Referral, search, publication, etc." />
          </div>

          <button type="submit" className="btn-primary w-full">Submit</button>
        </form>
      </section>

      <section className="max-w-[560px] mx-auto mt-[var(--space-7)] pt-[var(--space-5)] border-t text-[13px] leading-[1.7]" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
        We read your submission. We assess what we&apos;re looking at. We respond within 48 hours with a preliminary read on the system, whether there&apos;s a fit, and next steps if there is.
        <br />
        No sales call. No pitch deck. No discovery session.
      </section>
    </div>
  );
};

export default ContactPage;
