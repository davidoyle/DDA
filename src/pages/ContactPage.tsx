import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const contactHeader = {
  eyebrow: 'Contact',
  headline: 'Describe your situation',
  body: 'The form is the first exchange. We review your submission and respond with a fit assessment and next steps within 48 hours.',
};

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
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="brand-panel max-w-4xl space-y-4">
        <p className="eyebrow">{contactHeader.eyebrow}</p>
        <h1 className="headline-md">{contactHeader.headline}</h1>
        <p className="text-xl text-[#F3EFE6]/85">{contactHeader.body}</p>
      </section>


      <section className="max-w-4xl card space-y-4">
        <h2 className="font-heading text-2xl">Before you submit</h2>
        <p className="text-[#F3EFE6]/80">
          DDA&apos;s analysis is grounded in public evidence. Findings are stated with explicit uncertainty tiers. If
          your situation requires conclusions beyond what the evidence supports, we will say so — and that may mean we
          are not the right fit. If that works for you, describe your situation below.
        </p>
      </section>

      <section className="max-w-4xl space-y-8">
        <form className="card space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="organization" className="font-medium">Organization</label>
            <input id="organization" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Organization" />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="font-medium">Your role</label>
            <input id="role" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Your role" />
          </div>

          <div className="space-y-2">
            <label htmlFor="problem" className="font-medium">What needs to be understood</label>
            <textarea
              id="problem"
              rows={6}
              className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3"
              placeholder={needsPlaceholder}
              defaultValue={context ? `${context}\n\n` : undefined}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="timeline" className="font-medium">Timeline</label>
              <select id="timeline" className="w-full rounded-lg bg-[#0B3C43] border border-[#F3EFE6]/25 p-3">
                <option>Immediate</option>
                <option>Within 3 months</option>
                <option>Within 6 months</option>
                <option>No fixed deadline</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="font-medium">Budget range (optional)</label>
              <select id="budget" className="w-full rounded-lg bg-[#0B3C43] border border-[#F3EFE6]/25 p-3">
                <option>Unknown</option>
                <option>Under $25K</option>
                <option>$25–75K</option>
                <option>$75–150K</option>
                <option>$150K+</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="source" className="font-medium">How did you find DDA (optional)</label>
            <input id="source" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Referral, search, publication, etc." />
          </div>

          <button type="submit" className="btn-primary">Submit</button>
        </form>
      </section>

      <section className="max-w-4xl card space-y-4">
        <h2 className="font-heading text-2xl">What happens next</h2>
        <p className="text-[#F3EFE6]/80">
          We read your submission. We assess what we&apos;re looking at. We respond within 48 hours with a preliminary
          read on the system, whether there&apos;s a fit, and next steps if there is. No sales call. No pitch deck. No
          discovery session.
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
