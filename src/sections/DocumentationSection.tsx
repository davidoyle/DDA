import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Phone, ClipboardCheck, AlertTriangle, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DocumentationSectionProps {
  className?: string;
}

const tools = [
  {
    title: 'Claim timeline',
    description: 'One page. Dates, decisions, what changed.',
    icon: Calendar,
  },
  {
    title: 'Call log',
    description: 'Who, when, what was promised.',
    icon: Phone,
  },
  {
    title: 'Evidence checklist',
    description: 'Photos, texts, reports, forms.',
    icon: ClipboardCheck,
  },
  {
    title: 'Violation tracker',
    description: 'Match their actions to Act sections.',
    icon: AlertTriangle,
  },
];

const DocumentationSection = ({ className = '' }: DocumentationSectionProps) => {
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
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, ease: 'none' },
          0.05
        );

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          cardsRef.current,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, stagger: 0.04, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.72
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="documentation"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Headline Block */}
        <div
          ref={headlineRef}
          className="absolute left-[8vw] top-[14vh] w-[34vw] max-w-[460px]"
        >
          <span className="eyebrow mb-4 block">Documentation Center</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">
            Build a record they can't ignore.
          </h2>
          <p className="body-text body-text-secondary">
            If it isn't documented, it didn't happen. Start small. Stay consistent.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="absolute left-[46vw] top-[16vh] w-[46vw] h-[68vh] grid grid-cols-2 gap-5">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const yOffset =
              index === 1 ? '3vh' : index === 3 ? '5vh' : '0';

            return (
              <div
                key={tool.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="card flex flex-col"
                style={{ transform: `translateY(${yOffset})` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center mb-4 icon-float">
                  <Icon size={24} className="text-[#D4A03A]" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2">
                  {tool.title}
                </h3>
                <p className="body-text body-text-secondary text-sm">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Download CTA */}
        <button className="absolute left-[46vw] bottom-[10vh] btn-secondary text-sm">
          <Download size={16} />
          Download all (PDF)
        </button>
      </div>
    </section>
  );
};

export default DocumentationSection;
