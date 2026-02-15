import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FolderOpen, Scale, Mail, BookMarked } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FourMovesSectionProps {
  className?: string;
}

const moves = [
  {
    number: '1',
    title: 'Secure the evidence',
    description: 'Save decisions, photos, texts, call logs.',
    icon: FolderOpen,
  },
  {
    number: '2',
    title: 'Identify violations',
    description: 'Map what they did to what the Act requires.',
    icon: Scale,
  },
  {
    number: '3',
    title: 'Send targeted pressure',
    description: 'Use the words that create accountability.',
    icon: Mail,
  },
  {
    number: '4',
    title: 'Study the wins',
    description: 'WCAT decisions show what actually works.',
    icon: BookMarked,
  },
];

const FourMovesSection = ({ className = '' }: FourMovesSectionProps) => {
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
          { x: '18vw', y: '6vh', opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            stagger: 0.06,
            ease: 'none',
          },
          0
        );

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .fromTo(
          cardsRef.current[0],
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardsRef.current[1],
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          cardsRef.current[2],
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          cardsRef.current[3],
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          headlineRef.current,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.75
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="four-moves"
      className={`section-pinned bg-teal ${className}`}
    >
      <div className="relative w-full h-full flex items-center">
        {/* Headline Block */}
        <div
          ref={headlineRef}
          className="absolute left-[8vw] top-[14vh] w-[34vw] max-w-[480px]"
        >
          <span className="eyebrow mb-4 block">How to use this</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">
            The First Four Moves
          </h2>
          <p className="body-text body-text-secondary">
            You don't need to learn everything. Start here.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="absolute left-[46vw] top-[18vh] w-[46vw] h-[64vh] grid grid-cols-2 gap-5">
          {moves.map((move, index) => {
            const Icon = move.icon;
            const yOffset = index === 1 ? '4vh' : index === 2 ? '2vh' : index === 3 ? '6vh' : '0';
            
            return (
              <div
                key={move.number}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="card flex flex-col"
                style={{ transform: `translateY(${yOffset})` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center icon-float">
                    <Icon size={24} className="text-[#D4A03A]" />
                  </div>
                  <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider">
                    {move.number}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2">
                  {move.title}
                </h3>
                <p className="body-text body-text-secondary text-sm">
                  {move.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA hint */}
        <p className="absolute left-[46vw] bottom-[10vh] font-mono text-xs text-[#F3EFE6]/50 uppercase tracking-wider">
          Tap any card to see how
        </p>
      </div>
    </section>
  );
};

export default FourMovesSection;
