import { useState } from 'react';
import { Clock, Brain, Shield, Briefcase, Trophy, Search, Filter } from 'lucide-react';

const StoriesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
      preview: 'My doctor diagnosed work-related anxiety. WorkSafeBC said it was a pre-existing condition. It took 8 months and a specialist report to get them to acknowledge the workplace bullying that triggered it.',
      fullStory: 'I worked in a high-pressure environment for three years. When the new manager started, everything changed. Daily criticism, impossible deadlines, being singled out in meetings. My doctor put me on stress leave and wrote a detailed report connecting my anxiety to the workplace environment. WorkSafeBC initially denied my claim, saying I had "pre-existing anxiety." They ignored the specialist psychiatrist who specifically linked my condition to the workplace bullying. After appealing to Review Division and submitting additional evidence, they finally accepted my claim.',
      outcome: 'Claim accepted after appeal. Received wage loss benefits retroactively.',
      date: '2024',
    },
    {
      title: 'My employer changed their story.',
      category: 'Retaliation',
      preview: 'First they said I was job-attached. Then they said I quit. The Board accepted both versions without questioning the contradiction.',
      fullStory: 'After my back injury, my employer initially said they would accommodate my restrictions and that I remained job-attached. Two months later, when WorkSafeBC asked about modified duties, my employer claimed I had "voluntarily resigned." The case manager accepted this new version without asking me for my side or questioning the complete reversal. I had emails proving I never quit—those were ignored.',
      outcome: 'Still fighting. WCAT appeal filed.',
      date: '2024',
    },
    {
      title: 'Three years to get the MRI.',
      category: 'Delays',
      preview: 'I knew something was wrong. They kept saying "soft tissue injury." The MRI showed a torn meniscus and cartilage damage.',
      fullStory: 'From day one, I told them my knee felt unstable. The physio noted clicking and giving way. WorkSafeBC said it was a "soft tissue strain" and would resolve in 6-8 weeks. When it didn\'t, they sent me to their medical advisor who never examined me—just reviewed files and said "no objective findings." My GP finally ordered an MRI privately after three years of me limping around. It showed a complex meniscal tear and significant cartilage loss.',
      outcome: 'MRI confirmed injury. Currently fighting for surgery approval.',
      date: '2023',
    },
    {
      title: 'I was labeled non-cooperative.',
      category: 'Retaliation',
      preview: 'I asked questions about my file. Suddenly there was a note saying I was "difficult" and "aggressive." That label followed me through every subsequent decision.',
      fullStory: 'I noticed inconsistencies in my claim file—dates that didn\'t match, missing medical reports. When I pointed these out and asked for corrections, the case manager flagged my file as "client conduct concern." Every subsequent decision referenced my "attitude" and "non-compliance." The actual medical evidence became secondary to this behavioral label.',
      outcome: 'File note still there. Affecting credibility in appeals.',
      date: '2024',
    },
    {
      title: 'WCAT overturned the denial.',
      category: 'WCAT win',
      preview: 'It took 18 months, but the Tribunal found the Board ignored my treating physician and relied solely on an internal advisor who never examined me.',
      fullStory: 'My family doctor of 15 years wrote detailed reports about my chronic pain and functional limitations. WorkSafeBC preferred the opinion of a medical advisor who reviewed my file for 20 minutes and concluded I was "fully recovered." The Review Division upheld this decision. At WCAT, the Vice Chair specifically noted that the Board failed to meaningfully engage with my treating physician\'s longitudinal assessment and gave no adequate reason for preferring the internal advisor.',
      outcome: 'WCAT overturned denial. Benefits reinstated with retroactive pay.',
      date: '2024',
    },
    {
      title: 'Still waiting for wage loss.',
      category: 'Delays',
      preview: 'Six months since my injury. Bills are piling up. Every call is "still under review." I\'m facing eviction.',
      fullStory: 'I was injured in July. It\'s now January. My claim was accepted for medical benefits but wage loss has been "under review" for six months. I\'ve submitted every document they asked for—pay stubs, tax returns, bank statements. Each time I call, I get a different case manager and a different story. My rent is three months behind. I\'m borrowing money from family just to eat.',
      outcome: 'No resolution. Considering MLA involvement.',
      date: '2025',
    },
    {
      title: 'Return to work became a nightmare.',
      category: 'Return to work',
      preview: 'They said modified duties were available. When I showed up, my supervisor had never heard of them.',
      fullStory: 'WorkSafeBC approved a gradual return-to-work plan with specific restrictions. My employer signed off on it. But when I arrived on my first day back, my supervisor said he had no instructions about modified duties and put me on my regular heavy-lifting tasks. When I reminded him of my restrictions, he said I was "being difficult" and sent me home. WorkSafeBC then cut my benefits for "refusing suitable work."',
      outcome: 'Benefits cut. Fighting the "refusal" finding.',
      date: '2024',
    },
    {
      title: 'Mental health claim denied as "employment decision."',
      category: 'Mental health',
      preview: 'They said my depression was caused by a "legitimate employment decision"—being transferred against my will to a toxic department.',
      fullStory: 'After 10 years in my position, I was suddenly transferred to a department with a known toxic culture. No explanation given. Within months, I developed severe depression and anxiety. My psychiatrist wrote that the transfer and subsequent workplace harassment were the direct causes. WorkSafeBC denied my claim under s.5.1(1)(c), saying the transfer was a "legitimate employment decision" and therefore excluded.',
      outcome: 'Appealed to WCAT. Citing A1900037.',
      date: '2024',
    },
  ];

  const filteredStories = stories.filter((story) => {
    const matchesFilter = activeFilter === 'All' || story.category === activeFilter;
    const matchesSearch = 
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.fullStory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#F3EFE6] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <span className="eyebrow mb-4 block text-[#0B3C43]">Story Archive</span>
        <h1 className="headline-lg text-[#0B3C43] mb-4">
          Read what workers are facing.
        </h1>
        <p className="body-text text-[#0B3C43]/70 max-w-[640px]">
          These are real experiences from injured workers in BC. Names and identifying 
          details have been removed to protect privacy.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B3C43]/40" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[#0B3C43]/15 text-[#0B3C43] placeholder:text-[#0B3C43]/40 focus:outline-none focus:border-[#D4A03A]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={16} className="text-[#0B3C43]/50 mr-2" />
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
      </div>

      {/* Results count */}
      <p className="body-text text-[#0B3C43]/50 text-sm mb-6">
        Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
      </p>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStories.map((story, index) => {
          const FilterIcon = filters.find(f => f.label === story.category)?.icon || Briefcase;
          const Icon = FilterIcon;
          
          return (
            <article
              key={index}
              className="card-light group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0B3C43]/10 flex items-center justify-center group-hover:bg-[#D4A03A]/15 transition-colors">
                  <Icon size={20} className="text-[#0B3C43] group-hover:text-[#D4A03A] transition-colors" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B3C43]/50">
                    {story.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#0B3C43]/40">
                    {story.date}
                  </span>
                </div>
              </div>
              
              <h3 className="font-heading font-bold text-xl text-[#0B3C43] mb-3 group-hover:text-[#D4A03A] transition-colors">
                {story.title}
              </h3>
              
              <p className="body-text text-[#0B3C43]/70 mb-4">
                {story.preview}
              </p>
              
              <div className="border-t border-[#0B3C43]/10 pt-4 mb-4">
                <p className="body-text text-[#0B3C43]/60 text-sm leading-relaxed">
                  {story.fullStory}
                </p>
              </div>
              
              <div className="flex items-start gap-3 bg-[#0B3C43]/5 rounded-xl p-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] mt-2 flex-shrink-0" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B3C43]/50 block mb-1">
                    Outcome
                  </span>
                  <span className="body-text text-[#0B3C43] text-sm">
                    {story.outcome}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredStories.length === 0 && (
        <div className="text-center py-16">
          <p className="body-text text-[#0B3C43]/50">
            No stories match your search. Try different keywords or filters.
          </p>
        </div>
      )}

      {/* Submit CTA */}
      <div className="mt-16 border-t border-[#0B3C43]/10 pt-12">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-[#0B3C43] mb-4">
            Have a story to share?
          </h3>
          <p className="body-text text-[#0B3C43]/70 mb-6">
            Your experience can help others prepare, push back, and feel less alone. 
            We remove all identifying information.
          </p>
          <a href="/submit" className="btn-dark inline-flex">
            Submit your story
          </a>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
