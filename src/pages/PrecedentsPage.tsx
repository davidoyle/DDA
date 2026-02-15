import { useState } from 'react';
import { 
  Search, Filter, ExternalLink, Brain, Activity, 
  Briefcase, Clock, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';

const PrecedentsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPrecedent, setExpandedPrecedent] = useState<string | null>(null);

  const categories = [
    { label: 'All', icon: null },
    { label: 'Mental health', icon: Brain },
    { label: 'Cumulative trauma', icon: Activity },
    { label: 'Return to work', icon: Briefcase },
    { label: 'Delays', icon: Clock },
    { label: 'Evidence', icon: AlertCircle },
  ];

  const precedents = [
    {
      id: 'A1900037',
      title: 'Mental disorder + refusal to accommodate',
      category: 'Mental health',
      summary: 'Employer denial of the condition can be a significant stressor.',
      fullSummary: 'Worker developed depression and anxiety after being refused workplace accommodations. The Tribunal found that the employer\'s refusal to acknowledge and accommodate the worker\'s condition was itself a significant stressor that contributed to the mental disorder.',
      keyHolding: 'Employer conduct that exacerbates a mental condition can be compensable even if the initial condition had pre-existing elements.',
      outcome: 'Appeal allowed. Benefits granted.',
      year: '2019',
      tags: ['s.5.1(1)(a)', 'mental disorder', 'employer conduct'],
    },
    {
      id: 'A2101129',
      title: 'Cumulative trauma from repeated incidents',
      category: 'Cumulative trauma',
      summary: 'Repeated minor incidents can be compensable under s.134(1).',
      fullSummary: 'Worker developed shoulder injury over years of repetitive lifting. No single incident caused the injury, but the cumulative effect of daily work duties was found to be compensable under the cumulative injury provisions.',
      keyHolding: 'Cumulative injuries from repetitive work activities are compensable even without a specific traumatic event.',
      outcome: 'Appeal allowed. Medical benefits and wage loss granted.',
      year: '2021',
      tags: ['s.134(1)', 'cumulative injury', 'repetitive strain'],
    },
    {
      id: '2004-06686',
      title: 'Injury with no clear diagnosis accepted',
      category: 'Evidence',
      summary: 'WCAT accepted the claim based on mechanism + credible evidence.',
      fullSummary: 'Worker reported back pain after lifting at work. Initial medical investigations were inconclusive. The Tribunal accepted the claim based on the credible mechanism of injury and the worker\'s consistent reporting of symptoms, even without a definitive diagnosis.',
      keyHolding: 'A definitive diagnosis is not required if the mechanism of injury is credible and symptoms are consistently reported.',
      outcome: 'Appeal allowed. Benefits granted pending further medical investigation.',
      year: '2004',
      tags: ['diagnosis', 'credibility', 'mechanism of injury'],
    },
    {
      id: '2014-01368',
      title: 'Late application due to mental disorder',
      category: 'Delays',
      summary: 'Mental disorder can justify late filing under s.54.',
      fullSummary: 'Worker failed to file claim within the one-year deadline due to severe depression that impaired their ability to manage affairs. The Tribunal found the mental disorder constituted good cause for the delay.',
      keyHolding: 'Mental health conditions that impair decision-making capacity can constitute good cause for late filing.',
      outcome: 'Appeal allowed. Time limit extended.',
      year: '2014',
      tags: ['s.54', 'time limits', 'mental disorder', 'good cause'],
    },
    {
      id: 'A2200345',
      title: 'Treating physician evidence preferred',
      category: 'Evidence',
      summary: 'Longitudinal treating relationship carries more weight than single IME.',
      fullSummary: 'WorkSafeBC relied on a single independent medical examination to deny ongoing benefits, ignoring the opinion of the worker\'s treating physician who had managed their care for two years. The Tribunal found the treating physician\'s longitudinal assessment more reliable.',
      keyHolding: 'Treating physicians with ongoing relationships generally provide more reliable assessments than one-time examinations.',
      outcome: 'Appeal allowed. Benefits reinstated.',
      year: '2022',
      tags: ['medical evidence', 'treating physician', 'IME'],
    },
    {
      id: 'A1800892',
      title: 'Return to work duties not properly offered',
      category: 'Return to work',
      summary: 'Modified duties must be meaningful and within restrictions.',
      fullSummary: 'Employer offered "modified duties" that were essentially the same as regular duties with a different title. The Tribunal found this did not constitute a genuine offer of suitable employment under s.45.',
      keyHolding: 'Modified duties must represent a genuine accommodation, not just a relabeling of regular work.',
      outcome: 'Appeal allowed. Wage loss benefits continued.',
      year: '2018',
      tags: ['s.45', 'return to work', 'modified duties'],
    },
    {
      id: 'A2001567',
      title: 'Pre-existing condition aggravated by work',
      category: 'Evidence',
      summary: 'Work need only be a significant contributing factor, not sole cause.',
      fullSummary: 'Worker had pre-existing degenerative changes in their knee. Work activities aggravated the condition, causing new symptoms. The Tribunal found the work was a significant contributing factor to the resulting disability.',
      keyHolding: 'Under s.5(1), work need only be a significant contributing factor—it does not need to be the sole or primary cause.',
      outcome: 'Appeal allowed. Benefits granted for aggravation.',
      year: '2020',
      tags: ['s.5(1)', 'pre-existing', 'aggravation', 'significant contributing factor'],
    },
    {
      id: 'A1900789',
      title: 'Chronic pain syndrome recognized',
      category: 'Mental health',
      summary: 'Chronic pain with functional impairment is compensable.',
      fullSummary: 'Worker developed chronic pain syndrome following a workplace injury. Despite objective tests showing "normal" results, the Tribunal accepted the worker\'s credible reporting of ongoing pain and functional limitations.',
      keyHolding: 'Chronic pain with functional impairment can be compensable even without objective findings on standard tests.',
      outcome: 'Appeal allowed. Permanent partial disability benefits granted.',
      year: '2019',
      tags: ['chronic pain', 'functional impairment', 'credibility'],
    },
  ];

  const filteredPrecedents = precedents.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <span className="eyebrow mb-4 block">WCAT Precedent Library</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          Study the wins.
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          These decisions aren't luck. They show what evidence, framing, and 
          persistence can do. Use them to strengthen your own case.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F3EFE6]/40" />
          <input
            type="text"
            placeholder="Search precedents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F3EFE6]/5 border border-[#F3EFE6]/15 text-[#F3EFE6] placeholder:text-[#F3EFE6]/40 focus:outline-none focus:border-[#D4A03A]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={16} className="text-[#F3EFE6]/50 mr-2" />
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveFilter(cat.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat.label
                    ? 'bg-[#D4A03A] text-[#0B3C43]'
                    : 'bg-[#F3EFE6]/5 text-[#F3EFE6]/70 hover:bg-[#F3EFE6]/10 border border-[#F3EFE6]/15'
                }`}
              >
                {Icon && <Icon size={14} className="inline mr-2" />}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="body-text text-[#F3EFE6]/50 text-sm mb-6">
        Showing {filteredPrecedents.length} {filteredPrecedents.length === 1 ? 'precedent' : 'precedents'}
      </p>

      {/* Precedents List */}
      <div className="space-y-4">
        {filteredPrecedents.map((precedent) => {
          const isExpanded = expandedPrecedent === precedent.id;
          
          return (
            <div
              key={precedent.id}
              className={`border border-[#F3EFE6]/15 rounded-[24px] overflow-hidden transition-all ${
                isExpanded ? 'bg-[#F3EFE6]/5' : 'bg-transparent hover:bg-[#F3EFE6]/5'
              }`}
            >
              <button
                onClick={() => setExpandedPrecedent(isExpanded ? null : precedent.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider">
                        {precedent.id}
                      </span>
                      <span className="font-mono text-xs text-[#F3EFE6]/40">
                        {precedent.year}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#F3EFE6]/10 text-[#F3EFE6]/60 text-[10px] font-mono uppercase">
                        {precedent.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2">
                      {precedent.title}
                    </h3>
                    <p className="body-text text-[#F3EFE6]/60 text-sm">
                      {precedent.summary}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp size={24} className="text-[#F3EFE6]/50" />
                    ) : (
                      <ChevronDown size={24} className="text-[#F3EFE6]/50" />
                    )}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-[#F3EFE6]/10 pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#F3EFE6] uppercase tracking-wider mb-3">
                        Full Summary
                      </h4>
                      <p className="body-text text-[#F3EFE6]/70 text-sm mb-4">
                        {precedent.fullSummary}
                      </p>
                      <h4 className="font-heading font-bold text-sm text-[#F3EFE6] uppercase tracking-wider mb-3">
                        Key Holding
                      </h4>
                      <div className="bg-[#D4A03A]/10 rounded-xl p-4">
                        <p className="body-text text-[#F3EFE6] text-sm">
                          {precedent.keyHolding}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#F3EFE6] uppercase tracking-wider mb-3">
                        Outcome
                      </h4>
                      <p className="body-text text-[#D4A03A] text-sm mb-4">
                        {precedent.outcome}
                      </p>
                      <h4 className="font-heading font-bold text-sm text-[#F3EFE6] uppercase tracking-wider mb-3">
                        Relevant Sections
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {precedent.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-[#F3EFE6]/10 text-[#F3EFE6]/70 text-xs font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#F3EFE6]/10">
                    <a
                      href={`https://www.wcat.bc.ca/decisions/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#D4A03A] text-sm font-medium hover:underline"
                    >
                      View full decision on WCAT website
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredPrecedents.length === 0 && (
        <div className="text-center py-16">
          <p className="body-text text-[#F3EFE6]/50">
            No precedents match your search. Try different keywords or filters.
          </p>
        </div>
      )}

      {/* How to Use Precedents */}
      <div className="mt-16 border border-[#D4A03A]/30 rounded-[28px] p-6 lg:p-8 bg-[#D4A03A]/5">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4">
          How to Use These Precedents
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Find precedents in your category (mental health, cumulative trauma, etc.)',
            'Note the specific Act sections cited in each decision',
            'Read the full decision to understand the evidence that carried weight',
            'Use similar language in your submissions and appeals',
            'Cite precedent numbers when writing to Review Division or WCAT',
            'Remember: each case is unique, but patterns matter',
          ].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] mt-2 flex-shrink-0" />
              <span className="body-text text-[#F3EFE6]/70 text-sm">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrecedentsPage;
