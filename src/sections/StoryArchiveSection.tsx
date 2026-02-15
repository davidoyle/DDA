import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Brain, Shield, Briefcase, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoryArchiveSectionProps {
  className?: string;
}

const filters = [
  { label: 'All', icon: null },
  { label: 'Delays', icon: Clock },
  { label: 'Mental health', icon: Brain },
  { label: 'Retaliation', icon: Shield },
  { label: 'Return to work', icon: Briefcase },
  { label: 'WCAT win', icon: Trophy },
];

const stories = [
  {
    title: "They said it was 'just stress.'",
    category: 'Mental health',
    preview:
      'My doctor diagnosed work-related anxiety. WorkSafeBC said it was a pre-existing condition...',
    icon: Brain,
  },
  {
    title: 'My employer changed their story.',
    category: 'Retaliation',
    preview:
      'First they said I was job-attached. Then they said I quit. The Board accepted both versions...',
    icon: Shield,
  },
  {
    title: 'Three years to get the MRI.',
    category: 'Delays',
    preview:
      'I knew something was wrong. They kept saying "soft tissue injury." The MRI showed a torn meniscus...',
    icon: Clock,
  },
  {
    title: 'I was labeled non-cooperative.',
    category: 'Retaliation',
    preview:
      'I asked questions about my file. Suddenly there was a note saying I was "difficult" and "aggressive"...',
    icon: Shield,
  },
  {
    title: 'WCAT overturned the denial.',
    category: 'WCAT win',
    preview:
      'It took 18 months, but the Tribunal found the Board ignored my treating physician...',
    icon: Trophy,
  },
  {
    title: 'Still waiting for wage loss.',
    category: 'Delays',
    preview:
      'Six months since my injury. Bills are piling up. Every call is "still under review"...',
    icon: Clock,
  },
];

const StoryArchiveSection = ({ className = '' }: StoryArchiveSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: '4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      // Filters animation
      gsap.fromTo(
        filtersRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.story-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredStories =
    activeFilter === 'All'
      ? stories
      : stories.filter((s) => s.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="story-archive"
      className={`section-flowing bg-paper py-20 lg:py-28 ${className}`}
    >
      <div className="px-6 lg:px-[8vw]">
        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <span className="eyebrow mb-4 block text-[#0B3C43]">Story Archive</span>
          <h2 className="headline-lg text-[#0B3C43]">
            Read what workers are facing.
          </h2>
        </div>

        {/* Filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`filter-chip ${activeFilter === filter.label ? 'active' : ''}`}
              >
                {Icon && <Icon size={14} className="mr-2" />}
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Stories Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredStories.map((story, index) => {
            const Icon = story.icon;
            return (
              <div
                key={index}
                className="story-card card-light cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0B3C43]/10 flex items-center justify-center group-hover:bg-[#D4A03A]/15 transition-colors">
                    <Icon
                      size={20}
                      className="text-[#0B3C43] group-hover:text-[#D4A03A] transition-colors"
                    />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B3C43]/50">
                    {story.category}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#0B3C43] mb-2 group-hover:text-[#D4A03A] transition-colors">
                  {story.title}
                </h3>
                <p className="body-text text-[#0B3C43]/70 text-sm">
                  {story.preview}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryArchiveSection;
