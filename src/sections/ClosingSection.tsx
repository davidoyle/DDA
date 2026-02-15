import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  className?: string;
}

const ClosingSection = ({ className = '' }: ClosingSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    topic: '',
    year: '',
    whatHappened: '',
    outcome: '',
    confirmed: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation
      gsap.fromTo(
        textRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <section
      ref={sectionRef}
      id="closing"
      className={`section-flowing bg-teal min-h-screen ${className}`}
    >
      <div className="px-6 lg:px-[8vw] py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Text */}
          <div ref={textRef}>
            <h2 className="headline-lg text-[#F3EFE6] mb-6">
              Add your story to the record.
            </h2>
            <p className="body-text body-text-secondary max-w-[480px]">
              The more we document, the stronger the case for change. Your
              experience matters.
            </p>
          </div>

          {/* Form Card */}
          <div ref={formRef} className="card">
            <h3 className="font-heading font-bold text-xl text-[#F3EFE6] mb-6">
              Submit anonymously
            </h3>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#D4A03A]/20 flex items-center justify-center mb-4">
                  <Check size={32} className="text-[#D4A03A]" />
                </div>
                <h4 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2">
                  Thank you
                </h4>
                <p className="body-text body-text-secondary">
                  Your story has been submitted. We'll review it and add it to the
                  archive.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label text-[#F3EFE6]/70">
                      Topic
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) =>
                        setFormData({ ...formData, topic: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] text-sm focus:outline-none focus:border-[#D4A03A]"
                      required
                    >
                      <option value="" className="bg-[#0B3C43]">
                        Select...
                      </option>
                      <option value="delay" className="bg-[#0B3C43]">
                        Delay
                      </option>
                      <option value="denial" className="bg-[#0B3C43]">
                        Denial
                      </option>
                      <option value="mental-health" className="bg-[#0B3C43]">
                        Mental health
                      </option>
                      <option value="retaliation" className="bg-[#0B3C43]">
                        Retaliation
                      </option>
                      <option value="wcat-win" className="bg-[#0B3C43]">
                        WCAT win
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label text-[#F3EFE6]/70">Year</label>
                    <select
                      value={formData.year}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] text-sm focus:outline-none focus:border-[#D4A03A]"
                      required
                    >
                      <option value="" className="bg-[#0B3C43]">
                        Select...
                      </option>
                      <option value="2025" className="bg-[#0B3C43]">
                        2025
                      </option>
                      <option value="2024" className="bg-[#0B3C43]">
                        2024
                      </option>
                      <option value="2023" className="bg-[#0B3C43]">
                        2023
                      </option>
                      <option value="earlier" className="bg-[#0B3C43]">
                        Earlier
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label text-[#F3EFE6]/70">
                    What happened
                  </label>
                  <textarea
                    value={formData.whatHappened}
                    onChange={(e) =>
                      setFormData({ ...formData, whatHappened: e.target.value })
                    }
                    placeholder="Describe what happened..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] text-sm placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A] resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="form-label text-[#F3EFE6]/70">Outcome</label>
                  <textarea
                    value={formData.outcome}
                    onChange={(e) =>
                      setFormData({ ...formData, outcome: e.target.value })
                    }
                    placeholder="What was the outcome?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] text-sm placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A] resize-none"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="confirm"
                    checked={formData.confirmed}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmed: e.target.checked })
                    }
                    className="mt-1 w-4 h-4 rounded border-[#F3EFE6]/30 bg-transparent text-[#D4A03A] focus:ring-[#D4A03A]"
                    required
                  />
                  <label
                    htmlFor="confirm"
                    className="body-text text-[#F3EFE6]/70 text-sm"
                  >
                    I confirm this is my experience (names will be removed).
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send size={18} />
                  Submit story
                </button>
              </form>
            )}

            {/* Newsletter */}
            <div className="mt-8 pt-6 border-t border-[#F3EFE6]/10">
              <p className="body-text text-[#F3EFE6]/70 text-sm mb-4">
                Get updates—new tools, new precedents, new stories.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-3"
              >
                <div className="flex-1 relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F3EFE6]/40"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] text-sm placeholder:text-[#F3EFE6]/30 focus:outline-none focus:border-[#D4A03A]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-secondary px-5"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="border-t border-[#F3EFE6]/10 px-6 lg:px-[8vw] py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="nav-link text-sm">About</button>
            <button className="nav-link text-sm">Privacy</button>
            <button className="nav-link text-sm">Accessibility</button>
            <button className="nav-link text-sm">Contact</button>
          </div>
          <p className="font-mono text-xs text-[#F3EFE6]/40 uppercase tracking-wider text-center">
            Not legal advice. Independent and worker-led.
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ClosingSection;
