import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Briefcase,
  Shield,
  Edit3,
  HelpCircle,
  ArrowRight,
  Copy,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StrategySectionProps {
  className?: string;
}

const pressurePoints = [
  { label: 'Evidence & reasons', icon: FileText },
  { label: 'Return-to-work duties', icon: Briefcase },
  { label: 'Retaliation / prohibited action', icon: Shield },
  { label: 'Correcting the record', icon: Edit3 },
  { label: 'Oversight & broken promises', icon: HelpCircle },
];

const StrategySection = ({ className = '' }: StrategySectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);

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
          imageRef.current,
          { x: '-22vw', opacity: 0 },
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
          bulletsRef.current?.children || [],
          { y: '3vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.1
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          imageRef.current,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          contentRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="strategy"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Image Card */}
        <div
          ref={imageRef}
          className="absolute left-[6vw] top-[16vh] w-[40vw] h-[56vh] rounded-[28px] overflow-hidden hidden lg:block"
        >
          <img
            src="/worker-phone.jpg"
            alt="Worker on phone call"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C43]/25 mix-blend-multiply" />
        </div>

        {/* Content Block */}
        <div
          ref={contentRef}
          className="absolute left-[8vw] lg:left-[52vw] top-[14vh] w-[84vw] lg:w-[40vw]"
        >
          <span className="eyebrow mb-4 block">Strategy & Pressure Points</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">
            Speak the language they respond to.
          </h2>
          <p className="body-text body-text-secondary mb-8 max-w-[480px]">
            You don't need to be a lawyer. You need to ask the right questions—on
            paper.
          </p>

          {/* Bullets */}
          <div ref={bulletsRef} className="space-y-3 mb-8">
            {pressurePoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#F3EFE6]/5 hover:bg-[#F3EFE6]/10 transition-colors cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#D4A03A]" />
                  </div>
                  <span className="body-text text-[#F3EFE6] group-hover:text-[#D4A03A] transition-colors">
                    {point.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Explore pressure points
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">
              <Copy size={18} />
              Copy email templates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
