import { useState } from 'react';
import { Send, Check, Mail, Shield, Eye, Info } from 'lucide-react';

const SubmitPage = () => {
  const [formData, setFormData] = useState({
    topic: '',
    year: '',
    whatHappened: '',
    outcome: '',
    lessons: '',
    confirmed: false,
    newsletter: false,
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="w-20 h-20 rounded-full bg-[#D4A03A]/20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#D4A03A]" />
          </div>
          <h1 className="headline-lg text-[#F3EFE6] mb-4">
            Thank you
          </h1>
          <p className="body-text text-[#F3EFE6]/70 mb-8">
            Your story has been submitted. We'll review it and may follow up with 
            clarifying questions. Once published, it will help other workers 
            understand they're not alone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/stories" className="btn-primary">
              Read other stories
            </a>
            <a href="/" className="btn-secondary">
              Back to home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="eyebrow mb-4 block">Share Your Story</span>
          <h1 className="headline-lg text-[#F3EFE6] mb-4">
            Add your story to the record.
          </h1>
          <p className="body-text text-[#F3EFE6]/70">
            The more we document, the stronger the case for change. Your experience 
            can help others prepare, push back, and feel less alone.
          </p>
        </div>

        {/* Privacy Info */}
        <div className="card mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
              <Shield size={20} className="text-[#D4A03A]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#F3EFE6] mb-2">
                Your privacy is protected
              </h3>
              <ul className="space-y-2">
                {[
                  'We remove all names, locations, and claim numbers',
                  'Your employer and WorkSafeBC will not be identified',
                  'We never share your contact information',
                  'You can request removal at any time',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Eye size={14} className="text-[#D4A03A] mt-1 flex-shrink-0" />
                    <span className="body-text text-[#F3EFE6]/60 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label text-[#F3EFE6]/70 mb-2 block">
                What type of issue? <span className="text-[#D4A03A]">*</span>
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] focus:outline-none focus:border-[#D4A03A]"
                required
              >
                <option value="" className="bg-[#0B3C43]">Select...</option>
                <option value="delay" className="bg-[#0B3C43]">Delay in processing</option>
                <option value="denial" className="bg-[#0B3C43]">Claim denial</option>
                <option value="mental-health" className="bg-[#0B3C43]">Mental health claim</option>
                <option value="retaliation" className="bg-[#0B3C43]">Employer retaliation</option>
                <option value="return-to-work" className="bg-[#0B3C43]">Return to work issues</option>
                <option value="wcat-win" className="bg-[#0B3C43]">WCAT appeal win</option>
                <option value="other" className="bg-[#0B3C43]">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label text-[#F3EFE6]/70 mb-2 block">
                What year did this happen? <span className="text-[#D4A03A]">*</span>
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] focus:outline-none focus:border-[#D4A03A]"
                required
              >
                <option value="" className="bg-[#0B3C43]">Select...</option>
                <option value="2025" className="bg-[#0B3C43]">2025</option>
                <option value="2024" className="bg-[#0B3C43]">2024</option>
                <option value="2023" className="bg-[#0B3C43]">2023</option>
                <option value="2022" className="bg-[#0B3C43]">2022</option>
                <option value="2021" className="bg-[#0B3C43]">2021</option>
                <option value="2020" className="bg-[#0B3C43]">2020</option>
                <option value="earlier" className="bg-[#0B3C43]">Earlier</option>
              </select>
            </div>
          </div>

          {/* What Happened */}
          <div>
            <label className="form-label text-[#F3EFE6]/70 mb-2 block">
              What happened? <span className="text-[#D4A03A]">*</span>
            </label>
            <p className="body-text text-[#F3EFE6]/50 text-xs mb-2">
              Tell us your story. Include key dates, decisions, and how you were affected.
              Remember: we'll remove all identifying information before publishing.
            </p>
            <textarea
              value={formData.whatHappened}
              onChange={(e) => setFormData({ ...formData, whatHappened: e.target.value })}
              placeholder="I was injured at work when..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A] resize-none"
              required
            />
          </div>

          {/* Outcome */}
          <div>
            <label className="form-label text-[#F3EFE6]/70 mb-2 block">
              What was the outcome?
            </label>
            <p className="body-text text-[#F3EFE6]/50 text-xs mb-2">
              Is your case resolved? Still ongoing? What happened with appeals?
            </p>
            <textarea
              value={formData.outcome}
              onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
              placeholder="The claim was initially denied..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A] resize-none"
            />
          </div>

          {/* Lessons */}
          <div>
            <label className="form-label text-[#F3EFE6]/70 mb-2 block">
              What would you tell other workers?
            </label>
            <p className="body-text text-[#F3EFE6]/50 text-xs mb-2">
              What did you learn? What would you do differently? What helped you?
            </p>
            <textarea
              value={formData.lessons}
              onChange={(e) => setFormData({ ...formData, lessons: e.target.value })}
              placeholder="Document everything from day one..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A] resize-none"
            />
          </div>

          {/* Confirmation */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/10">
            <input
              type="checkbox"
              id="confirm"
              checked={formData.confirmed}
              onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-[#F3EFE6]/30 bg-transparent text-[#D4A03A] focus:ring-[#D4A03A]"
              required
            />
            <label htmlFor="confirm" className="body-text text-[#F3EFE6]/70 text-sm">
              I confirm this is my own experience. I understand that all names, 
              locations, and identifying details will be removed before publication.
            </label>
          </div>

          {/* Newsletter */}
          <div className="border-t border-[#F3EFE6]/10 pt-6">
            <div className="flex items-start gap-3 mb-4">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-[#F3EFE6]/30 bg-transparent text-[#D4A03A] focus:ring-[#D4A03A]"
              />
              <label htmlFor="newsletter" className="body-text text-[#F3EFE6]/70 text-sm">
                Keep me updated on new tools, precedents, and stories. 
                (Your email will not be published or shared.)
              </label>
            </div>
            
            {formData.newsletter && (
              <div className="ml-7">
                <div className="relative max-w-sm">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F3EFE6]/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0B3C43]/30 border-t-[#0B3C43] rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit story
              </>
            )}
          </button>

          {/* Info note */}
          <div className="flex items-start gap-3 text-[#F3EFE6]/50">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <p className="body-text text-xs">
              This submission is for the Workers Toolkit archive only. It does not 
              create any legal relationship or constitute a formal complaint to any 
              regulatory body.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;
