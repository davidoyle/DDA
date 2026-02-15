import { TrendingUp, AlertTriangle, Clock, Brain, Shield, FileX, Eye, BarChart3 } from 'lucide-react';

const PatternsPage = () => {
  const denialTactics = [
    {
      tactic: '"Pre-existing condition" dismissal',
      description: 'Claiming your injury is due to a prior condition, ignoring that work aggravated it.',
      frequency: 'Very Common',
      icon: FileX,
    },
    {
      tactic: '"Soft tissue only" minimization',
      description: 'Labeling serious injuries as minor soft tissue damage to limit benefits.',
      frequency: 'Very Common',
      icon: AlertTriangle,
    },
    {
      tactic: 'IME over treating physician',
      description: 'Preferring a 20-minute file review over your doctor who knows your history.',
      frequency: 'Extremely Common',
      icon: Eye,
    },
    {
      tactic: '"Non-cooperative" labeling',
      description: 'Flagging workers who ask questions or challenge decisions.',
      frequency: 'Common',
      icon: Shield,
    },
    {
      tactic: 'Delay until worker gives up',
      description: 'Strategic delays hoping workers will abandon their claims.',
      frequency: 'Very Common',
      icon: Clock,
    },
  ];

  const gaslightingPhrases = [
    {
      phrase: '"That\'s just the standard process."',
      translation: 'We know it\'s frustrating, but we\'re not going to change it.',
    },
    {
      phrase: '"Our medical advisors reviewed your file."',
      translation: 'Someone who never examined you disagrees with your doctor.',
    },
    {
      phrase: '"You should be recovered by now."',
      translation: 'We\'ve decided your pain isn\'t real, regardless of what you say.',
    },
    {
      phrase: '"There\'s no objective evidence."',
      translation: 'Your subjective experience doesn\'t count.',
    },
    {
      phrase: '"We need more information."',
      translation: 'We\'re stalling and hoping you\'ll go away.',
    },
  ];

  const stats = [
    {
      label: 'Average appeal time to WCAT',
      value: '18-24',
      unit: 'months',
      icon: Clock,
    },
    {
      label: 'WCAT appeals that succeed',
      value: '~40%',
      unit: '',
      icon: BarChart3,
    },
    {
      label: 'Workers who give up before appeal',
      value: 'Unknown',
      unit: '(not tracked)',
      icon: Eye,
    },
  ];

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow mb-4 block">Patterns We're Seeing</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          You're not the only one.
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          These patterns come from anonymized story submissions and public WCAT decisions. 
          They validate individual experiences and inform our advocacy.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-[#D4A03A]" />
              </div>
              <div className="font-heading font-bold text-3xl text-[#F3EFE6] mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider mb-2">
                {stat.unit}
              </div>
              <p className="body-text text-[#F3EFE6]/60 text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Denial Tactics */}
      <div className="mb-12">
        <h2 className="font-heading font-bold text-xl text-[#F3EFE6] mb-6 flex items-center gap-3">
          <TrendingUp size={22} className="text-[#D4A03A]" />
          Top 5 Most Reported Denial Tactics
        </h2>
        
        <div className="space-y-4">
          {denialTactics.map((tactic, idx) => {
            const Icon = tactic.icon;
            return (
              <div key={idx} className="card flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#D4A03A]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading font-bold text-base text-[#F3EFE6]">
                      {tactic.tactic}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#D4A03A]/10 text-[#D4A03A] text-[10px] font-mono uppercase">
                      {tactic.frequency}
                    </span>
                  </div>
                  <p className="body-text text-[#F3EFE6]/60 text-sm">
                    {tactic.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gaslighting Phrases */}
      <div className="mb-12">
        <h2 className="font-heading font-bold text-xl text-[#F3EFE6] mb-6 flex items-center gap-3">
          <Brain size={22} className="text-[#D4A03A]" />
          Common Gaslighting Phrases in Decision Letters
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {gaslightingPhrases.map((item, idx) => (
            <div key={idx} className="card">
              <div className="mb-3">
                <span className="font-mono text-[10px] text-[#F3EFE6]/40 uppercase tracking-wider block mb-1">
                  What they say
                </span>
                <p className="body-text text-[#F3EFE6] text-sm italic">
                  "{item.phrase}"
                </p>
              </div>
              <div className="pt-3 border-t border-[#F3EFE6]/10">
                <span className="font-mono text-[10px] text-[#D4A03A] uppercase tracking-wider block mb-1">
                  What it means
                </span>
                <p className="body-text text-[#F3EFE6]/60 text-sm">
                  {item.translation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Red Flags */}
      <div className="card mb-12 border-[#D4A03A]/30">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-[#D4A03A]" />
          Red Flags That Signal Appealable Errors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Decision ignores or mischaracterizes your treating physician\'s opinion',
            'No clear explanation for rejecting key evidence',
            'Relies on IME that contradicts without addressing treating doctor\'s reasoning',
            'Findings of fact not supported by evidence in the file',
            'Misapplication of legal tests (e.g., "sole cause" instead of "significant contributing factor")',
            'Decision refers to documents you were never shown',
            'Case manager made decision without required consultation',
            'Timeline violations (delays beyond statutory limits)',
          ].map((flag, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#F3EFE6]/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] mt-2 flex-shrink-0" />
              <span className="body-text text-[#F3EFE6]/70 text-sm">{flag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-8 border-t border-[#F3EFE6]/10">
        <h3 className="font-heading font-bold text-xl text-[#F3EFE6] mb-4">
          See a pattern we missed?
        </h3>
        <p className="body-text text-[#F3EFE6]/60 mb-6 max-w-lg mx-auto">
          Your experience helps us identify new patterns and build better tools. 
          Submit your story anonymously.
        </p>
        <a href="/submit" className="btn-primary inline-flex">
          Submit your story
        </a>
      </div>
    </div>
  );
};

export default PatternsPage;
