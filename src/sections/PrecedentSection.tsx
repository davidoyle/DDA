import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PrecedentSectionProps {
  className?: string;
}

const precedents = [
  {
    title: 'Injury with no clear diagnosis',
    description:
      'WCAT accepted the claim based on mechanism + credible evidence.',
    tag: 'Acceptability',
  },
  {
    title: 'Cumulative trauma counts',
    description:
      'Repeated minor incidents can be compensable under s.134(1).',
    tag: 'Cumulative',
  },
  {
    title: 'Mental disorder + refusal to accommodate',
    description:
      'Employer denial of the condition can be a significant stressor.',
    tag: 'Mental health',
  },
];

const PrecedentSection = ({ className = '' }: PrecedentSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          headlineRef.current,
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          cardsRef.current,
          { x: '22vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.05
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          cardsRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, stagger: 0.04, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          headlineRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="precedents"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Headline Block */}
        <div
          ref={headlineRef}
          className="absolute left-[8vw] top-[14vh] w-[34vw] max-w-[460px]"
        >
          <span className="eyebrow mb-4 block">WCAT Precedent Library</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">Study the wins.</h2>
          <p className="body-text body-text-secondary">
            These decisions aren't luck. They show what evidence, framing, and
            persistence can do.
          </p>
        </div>

        {/* Precedent Cards */}
        <div className="absolute left-[52vw] top-[18vh] w-[40vw] space-y-4 hidden lg:block">
          {precedents.map((precedent, index) => (
            <div
              key={precedent.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="card flex items-start gap-4 group cursor-pointer"
              style={{
                marginLeft: `${index * 2}vw`,
                marginTop: index > 0 ? '-2vh' : '0',
              }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                <FileCheck size={20} className="text-[#D4A03A]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-bold text-base text-[#F3EFE6] group-hover:text-[#D4A03A] transition-colors">
                    {precedent.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A03A] bg-[#D4A03A]/10 px-2 py-1 rounded">
                    {precedent.tag}
                  </span>
                </div>
                <p className="body-text body-text-secondary text-sm">
                  {precedent.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="absolute left-[8vw] lg:hidden top-[40vh] w-[84vw] space-y-3">
          {precedents.map((precedent) => (
            <div
              key={precedent.title}
              className="card flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                <FileCheck size={16} className="text-[#D4A03A]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#F3EFE6] mb-1">
                  {precedent.title}
                </h3>
                <p className="body-text body-text-secondary text-xs">
                  {precedent.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="absolute left-[52vw] bottom-[12vh] btn-secondary hidden lg:flex">
          Browse all precedents
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default PrecedentSection;
