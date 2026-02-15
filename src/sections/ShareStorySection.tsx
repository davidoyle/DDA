import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ShareStorySectionProps {
  className?: string;
}

const ShareStorySection = ({ className = '' }: ShareStorySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(
          photoRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          contentRef.current,
          { x: '22vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          ctaRef.current,
          { y: '4vh', scale: 0.96, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.15
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          photoRef.current,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          contentRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ctaRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSubmit = () => {
    const element = document.getElementById('closing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="share-story"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Photo Panel */}
        <div
          ref={photoRef}
          className="absolute left-[6vw] top-[12vh] w-[44vw] h-[76vh] rounded-[28px] overflow-hidden hidden lg:block"
        >
          <img
            src="/share-story-worker.jpg"
            alt="Worker in warehouse"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C43]/25 mix-blend-multiply" />
        </div>

        {/* Content Block */}
        <div
          ref={contentRef}
          className="absolute left-[8vw] lg:left-[54vw] top-1/2 -translate-y-1/2 w-[84vw] lg:w-[38vw]"
        >
          <h2 className="headline-lg text-[#F3EFE6] mb-6">
            Share your story—anonymously.
          </h2>
          <p className="body-text body-text-secondary mb-8 max-w-[520px]">
            Your experience can become evidence. We remove names, locations, and
            claim numbers. What remains helps others prepare, push back, and feel
            less alone.
          </p>
          <button ref={ctaRef} onClick={scrollToSubmit} className="btn-primary">
            <Send size={18} />
            Submit your story
          </button>
          <p className="mt-4 font-mono text-xs text-[#F3EFE6]/50 uppercase tracking-wider">
            Takes 10–15 minutes. You can save and return.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareStorySection;
