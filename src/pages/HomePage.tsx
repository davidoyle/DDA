import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FolderOpen, Scale, Mail, BookMarked, Users, FileCheck, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(headlineRef.current, { x: '-8vw', y: '-2vh', opacity: 0 });
      gsap.set(infoCardRef.current, { x: '10vw', opacity: 0 });
      gsap.set(ctaRef.current, { y: '3vh', opacity: 0 });

      tl.to(headlineRef.current, { x: 0, y: 0, opacity: 1, duration: 0.9 }, 0.2)
        .to(infoCardRef.current, { x: 0, opacity: 1, duration: 0.9 }, 0.35)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0.5);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const moves = [
    {
      number: '1',
      title: 'Secure the evidence',
      description: 'Save decisions, photos, texts, call logs.',
      icon: FolderOpen,
      link: '/tools',
    },
    {
      number: '2',
      title: 'Identify violations',
      description: 'Map what they did to what the Act requires.',
      icon: Scale,
      link: '/glossary',
    },
    {
      number: '3',
      title: 'Send targeted pressure',
      description: 'Use the words that create accountability.',
      icon: Mail,
      link: '/email-templates',
    },
    {
      number: '4',
      title: 'Study the wins',
      description: 'WCAT decisions show what actually works.',
      icon: BookMarked,
      link: '/precedents',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-[#0B3C43] overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-worker.jpg"
            alt="Worker at industrial window"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 60% 45%, rgba(11,60,67,0) 0%, rgba(11,60,67,0.55) 70%, rgba(11,60,67,0.75) 100%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative w-full px-6 lg:px-[8vw] pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Headline Block */}
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <span className="eyebrow mb-6 block">Workers Toolkit</span>
              <h1 className="headline-xl text-[#F3EFE6] mb-6">
                You're not the only one.
              </h1>
              <p className="body-text text-[#F3EFE6]/70 max-w-[480px] mb-8">
                A living archive of stories + practical tools for injured workers in
                BC navigating WorkSafeBC.
              </p>
              <div ref={ctaRef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
                <Link to="/stories" className="btn-primary">
                  <BookOpen size={18} />
                  Read stories
                </Link>
                <Link to="/how-to-use" className="btn-secondary">
                  How to use this
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Info Card */}
            <div className="hidden lg:flex justify-end">
              <div
                ref={infoCardRef}
                className="card max-w-[420px]"
                style={{ opacity: 0 }}
              >
                <p className="body-text text-[#F3EFE6]">
                  Built from real decisions, real delays, and real wins. No legal
                  advice—just evidence, language, and solidarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Moves Section */}
      <section className="py-20 lg:py-28 px-6 lg:px-[8vw] bg-[#0B3C43]">
        <div className="mb-12">
          <span className="eyebrow mb-4 block">How to use this</span>
          <h2 className="headline-lg text-[#F3EFE6] mb-4">
            The First Four Moves
          </h2>
          <p className="body-text text-[#F3EFE6]/70 max-w-[520px]">
            You don't need to learn everything. Start here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {moves.map((move) => {
            const Icon = move.icon;
            return (
              <Link
                key={move.number}
                to={move.link}
                className="card flex flex-col group hover:border-[#D4A03A] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center icon-float">
                    <Icon size={24} className="text-[#D4A03A]" />
                  </div>
                  <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider">
                    {move.number}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2 group-hover:text-[#D4A03A] transition-colors">
                  {move.title}
                </h3>
                <p className="body-text text-[#F3EFE6]/60 text-sm">
                  {move.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="py-20 lg:py-28 px-6 lg:px-[8vw] bg-[#0B3C43]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <div className="rounded-[28px] overflow-hidden h-[500px]">
              <img
                src="/share-story-worker.jpg"
                alt="Worker in warehouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0B3C43]/25 mix-blend-multiply" />
            </div>
          </div>
          <div>
            <h2 className="headline-lg text-[#F3EFE6] mb-6">
              Share your story—anonymously.
            </h2>
            <p className="body-text text-[#F3EFE6]/70 mb-8 max-w-[520px]">
              Your experience can become evidence. We remove names, locations, and
              claim numbers. What remains helps others prepare, push back, and feel
              less alone.
            </p>
            <Link to="/submit" className="btn-primary">
              <Users size={18} />
              Submit your story
            </Link>
            <p className="mt-4 font-mono text-xs text-[#F3EFE6]/50 uppercase tracking-wider">
              Takes 10–15 minutes. You can save and return.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories Preview */}
      <section className="py-20 lg:py-28 px-6 lg:px-[8vw] bg-[#F3EFE6]">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="eyebrow mb-4 block text-[#0B3C43]">Story Archive</span>
            <h2 className="headline-lg text-[#0B3C43]">
              Read what workers are facing.
            </h2>
          </div>
          <Link to="/stories" className="btn-dark mt-4 md:mt-0">
            View all stories
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: "They said it was 'just stress.'",
              category: 'Mental health',
              preview: 'My doctor diagnosed work-related anxiety. WorkSafeBC said it was a pre-existing condition...',
            },
            {
              title: 'My employer changed their story.',
              category: 'Retaliation',
              preview: 'First they said I was job-attached. Then they said I quit. The Board accepted both versions...',
            },
            {
              title: 'WCAT overturned the denial.',
              category: 'WCAT win',
              preview: 'It took 18 months, but the Tribunal found the Board ignored my treating physician...',
            },
          ].map((story, index) => (
            <Link
              key={index}
              to="/stories"
              className="card-light group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B3C43]/10 flex items-center justify-center group-hover:bg-[#D4A03A]/15 transition-colors">
                  <FileCheck size={20} className="text-[#0B3C43] group-hover:text-[#D4A03A] transition-colors" />
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
            </Link>
          ))}
        </div>
      </section>

      {/* The Bigger Picture */}
      <section className="py-20 lg:py-28 px-6 lg:px-[8vw] bg-[#0B3C43]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="eyebrow mb-4 block">The Bigger Picture</span>
            <h2 className="headline-lg text-[#F3EFE6] mb-4">
              This isn't random. It's systemic.
            </h2>
            <p className="body-text text-[#F3EFE6]/70 mb-8 max-w-[520px]">
              Independent reviews, ombudsperson reports, and WCAT precedent all
              point to the same pattern: cost pressure shapes decisions, and workers
              pay the price.
            </p>
            <div className="space-y-4">
              {[
                { title: 'Cost-containment bias', desc: 'Sustainability language becomes a reason to close files.' },
                { title: 'Evidentiary bias', desc: 'Treating doctors sidelined; internal advisors preferred.' },
                { title: 'Path-dependent bias', desc: 'Early framing locks in outcomes, even when wrong.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <TrendingUp size={18} className="text-[#D4A03A] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#F3EFE6]">{item.title}</h4>
                    <p className="body-text text-[#F3EFE6]/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="rounded-[28px] overflow-hidden h-[400px]">
              <img
                src="/meeting-documents.jpg"
                alt="People reviewing documents"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0B3C43]/25 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-6 lg:px-[8vw] bg-[#0B3C43] border-t border-[#F3EFE6]/10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="headline-lg text-[#F3EFE6] mb-6">
            Ready to start?
          </h2>
          <p className="body-text text-[#F3EFE6]/70 mb-8">
            Every email, every log entry, every uploaded document is another brick in a wall of proof. 
            And institutions have a hard time walking through walls.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tools" className="btn-primary">
              <FolderOpen size={18} />
              Get the tools
            </Link>
            <Link to="/collective-action" className="btn-secondary">
              <Users size={18} />
              Join the movement
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
