const ContactPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-12">
      <section className="max-w-4xl space-y-4">
        <p className="eyebrow">Contact</p>
        <h1 className="headline-md">Tell Me Your Problem</h1>
        <p className="text-xl text-[#F3EFE6]/85">I&apos;ll respond within 48 hours.</p>
      </section>

      <section className="max-w-4xl space-y-8">
        <h2 className="font-heading text-2xl">Contact Form</h2>
        <form className="card space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="name" className="font-medium">Name</label>
              <input id="name" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="organization" className="font-medium">Organization</label>
              <input id="organization" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Organization" />
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="font-medium">Title</label>
              <input id="title" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Your title" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="problem" className="font-medium">Your Problem (What&apos;s happening in your system?)</label>
            <textarea id="problem" rows={5} className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="timeline" className="font-medium">Timeline (When do you need this?)</label>
              <input id="timeline" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="font-medium">Budget Range (What&apos;s your budget? Optional, but helpful.)</label>
              <input id="budget" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" />
            </div>
          </div>

          <button type="submit" className="btn-primary">Submit</button>
        </form>
      </section>

      <section className="max-w-4xl card space-y-4">
        <h2 className="font-heading text-2xl">What Happens Next</h2>
        <p className="text-[#F3EFE6]/80">I read your submission.</p>
        <p className="text-[#F3EFE6]/80">I think about your problem for 10 minutes.</p>
        <p className="text-[#F3EFE6]/80">I respond within 48 hours with:</p>
        <ul className="space-y-2 text-[#F3EFE6]/80 list-disc list-inside">
          <li>A preliminary assessment of what I&apos;m looking at</li>
          <li>Which service tier makes sense (Quick Assessment / Full Diagnostic / Strategic Analysis)</li>
          <li>Pricing and timeline</li>
          <li>Next steps if you want to proceed</li>
        </ul>
        <p className="text-[#F3EFE6]/80">No sales call. No pitch deck. No discovery session.</p>
        <p className="text-[#F3EFE6]/80">Just a conversation about whether I can help.</p>
        <p className="text-[#F3EFE6]/80">If I can, you&apos;ll know. If I can&apos;t, I&apos;ll tell you.</p>
      </section>

      <section className="max-w-4xl">
        <h2 className="font-heading text-2xl mb-2">Questions?</h2>
        <p className="text-[#F3EFE6]/80">Email: david.doyle@ddanalysis.ca</p>
      </section>
    </div>
  );
};

export default ContactPage;
