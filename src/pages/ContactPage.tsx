const ContactPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw]">
      <section className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Contact</p>
          <h1 className="headline-md">Inquiry Intake</h1>
          <p className="body-text body-text-secondary">
            Send a brief overview of your institutional system problem and timeline. DDA responds within 48 hours with a preliminary assessment and scoped options.
          </p>
        </div>

        <form className="card space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" type="email" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="you@organization.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="problem" className="font-medium">Brief description of your system/problem</label>
            <textarea id="problem" rows={5} className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Share context, known constraints, and decision stakes." />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="timeline" className="font-medium">Preferred timeline</label>
              <input id="timeline" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="e.g. Report needed in 6 weeks" />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="font-medium">Budget range (optional)</label>
              <input id="budget" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="e.g. $10,000-$20,000" />
            </div>
          </div>

          <button type="submit" className="btn-primary">Submit Inquiry</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
