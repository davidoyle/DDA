import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial states
      gsap.set(headlineRef.current, { x: '-8vw', y: '-2vh', opacity: 0 });
      gsap.set(infoCardRef.current, { x: '10vw', opacity: 0 });
      gsap.set(ctaRef.current, { y: '3vh', opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.1, opacity: 0 });

      // Entrance animation
      tl.to(imageRef.current, { scale: 1, opacity: 1, duration: 1 }, 0)
        .to(headlineRef.current, { x: 0, y: 0, opacity: 1, duration: 0.9 }, 0.2)
        .to(infoCardRef.current, { x: 0, opacity: 1, duration: 0.9 }, 0.35)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.to(headlineRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(infoCardRef.current, { x: 0, opacity: 1, duration: 0.3 });
            gsap.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.3 });
            gsap.to(imageRef.current, { scale: 1, duration: 0.3 });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold - elements already visible from load animation
      // SETTLE (30%-70%): Hold
      // EXIT (70%-100%): Elements exit
      scrollTl
        .fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          infoCardRef.current,
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ctaRef.current,
          { y: 0, opacity: 1 },
          { y: '4vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          imageRef.current,
          { scale: 1 },
          { scale: 1.06, ease: 'none' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-pinned bg-teal ${className}`}
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero-worker.jpg"
          alt="Worker at industrial window"
          className="w-full h-full object-cover"
        />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 60% 45%, rgba(11,60,67,0) 0%, rgba(11,60,67,0.55) 70%, rgba(11,60,67,0.75) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative w-full h-full flex items-center">
        {/* Headline Block */}
        <div
          ref={headlineRef}
          className="absolute left-[8vw] top-1/2 -translate-y-1/2 w-[44vw] max-w-[640px]"
          style={{ opacity: 0 }}
        >
          <span className="eyebrow mb-6 block">Workers Toolkit</span>
          <h1 className="headline-xl text-[#F3EFE6] mb-6">
            You're not the only one.
          </h1>
          <p className="body-text body-text-secondary max-w-[480px]">
            A living archive of stories + practical tools for injured workers in
            BC navigating WorkSafeBC.
          </p>
        </div>

        {/* Info Card */}
        <div
          ref={infoCardRef}
          className="absolute right-[6vw] top-1/2 -translate-y-1/2 w-[30vw] max-w-[420px] card hidden lg:block"
          style={{ opacity: 0 }}
        >
          <p className="body-text text-[#F3EFE6]">
            Built from real decisions, real delays, and real wins. No legal
            advice—just evidence, language, and solidarity.
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="absolute left-[8vw] bottom-[10vh] flex flex-wrap gap-4"
          style={{ opacity: 0 }}
        >
          <button
            onClick={() => scrollToSection('story-archive')}
            className="btn-primary"
          >
            <BookOpen size={18} />
            Read stories
          </button>
          <button
            onClick={() => scrollToSection('four-moves')}
            className="btn-secondary"
          >
            How to use this
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
