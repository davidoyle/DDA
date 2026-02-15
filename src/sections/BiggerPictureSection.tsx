import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingDown, Stethoscope, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BiggerPictureSectionProps {
  className?: string;
}

const stats = [
  {
    title: 'Cost-containment bias',
    description: 'Sustainability language becomes a reason to close files.',
    icon: TrendingDown,
  },
  {
    title: 'Evidentiary bias',
    description: 'Treating doctors sidelined; internal advisors preferred.',
    icon: Stethoscope,
  },
  {
    title: 'Path-dependent bias',
    description: 'Early framing locks in outcomes, even when wrong.',
    icon: GitBranch,
  },
];

const BiggerPictureSection = ({ className = '' }: BiggerPictureSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

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
          imageRef.current,
          { x: '22vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          statsRef.current,
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: 'none' },
          0.1
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          imageRef.current,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          statsRef.current,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, stagger: 0.05, ease: 'power2.in' },
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
      id="bigger-picture"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Headline Block */}
        <div
          ref={headlineRef}
          className="absolute left-[8vw] top-[14vh] w-[34vw] max-w-[460px]"
        >
          <span className="eyebrow mb-4 block">The Bigger Picture</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">
            This isn't random. It's systemic.
          </h2>
          <p className="body-text body-text-secondary">
            Independent reviews, ombudsperson reports, and WCAT precedent all
            point to the same pattern: cost pressure shapes decisions, and workers
            pay the price.
          </p>
        </div>

        {/* Image Card */}
        <div
          ref={imageRef}
          className="absolute left-[52vw] top-[16vh] w-[40vw] h-[56vh] rounded-[28px] overflow-hidden hidden lg:block"
        >
          <img
            src="/meeting-documents.jpg"
            alt="People reviewing documents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B3C43]/25 mix-blend-multiply" />
        </div>

        {/* Stats Row */}
        <div className="absolute left-[8vw] bottom-[10vh] w-[84vw] grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                ref={(el) => { statsRef.current[index] = el; }}
                className="card"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4A03A]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#D4A03A]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#F3EFE6] mb-2">
                  {stat.title}
                </h3>
                <p className="body-text body-text-secondary text-sm">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BiggerPictureSection;
