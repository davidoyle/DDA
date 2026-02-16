const ContactPage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw]">
      <section className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Contact</p>
          <h1 className="headline-md">You know what you need.</h1>
          <p className="body-text body-text-secondary">
            Tell me about your problem. Your timeline. Your budget range. I&apos;ll respond within 48 hours with a preliminary assessment and scope options.
          </p>
          <p className="text-[#F3EFE6]/80">No sales call. No pitch deck. No discovery session.</p>
          <p className="text-[#F3EFE6]/80">Just a conversation about whether I can help.</p>
        </div>

        <form className="card space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium">Email</label>
            <input id="email" type="email" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="you@organization.com" />
          </div>

          <div className="space-y-2">
            <label htmlFor="problem" className="font-medium">Tell me your problem</label>
            <textarea id="problem" rows={5} className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="What is happening in your system?" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="timeline" className="font-medium">Timeline</label>
              <input id="timeline" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="When do you need the answer?" />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="font-medium">Budget range</label>
              <input id="budget" type="text" className="w-full rounded-lg bg-[#F3EFE6]/10 border border-[#F3EFE6]/25 p-3" placeholder="Optional" />
            </div>
          </div>

          <button type="submit" className="btn-primary">Tell Me Your Problem</button>
        </form>
      </section>
    </div>
  );
};

export default ContactPage;
