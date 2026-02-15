import { Users, Megaphone, FileText, ArrowRight, ExternalLink, Heart, Share2 } from 'lucide-react';

const CollectiveActionPage = () => {
  const actions = [
    {
      title: 'Contact Your MLA',
      description: 'Political pressure matters. MLAs need to hear from constituents about WorkSafeBC issues.',
      steps: [
        'Find your MLA at leg.bc.ca',
        'Share your story (anonymized if preferred)',
        'Ask for their support on systemic reforms',
        'Request a meeting with their constituency assistant',
      ],
      icon: Users,
    },
    {
      title: 'Share Your Story Publicly',
      description: 'Media attention can drive change. Consider speaking to journalists or posting on social media.',
      steps: [
        'Contact local media outlets',
        'Use hashtags like #WorkersCompBC #InjuredWorkers',
        'Tag relevant politicians and organizations',
        'Share anonymized versions of your experience',
      ],
      icon: Megaphone,
    },
    {
      title: 'Support Legislative Reform',
      description: 'Advocate for changes to the Workers Compensation Act and oversight mechanisms.',
      steps: [
        'Sign petitions for injured worker rights',
        'Write to the Minister of Labour',
        'Support calls for independent oversight',
        'Attend public consultations when announced',
      ],
      icon: FileText,
    },
  ];

  const tenPoints = [
    'Independent oversight of WorkSafeBC decisions',
    'Mandatory reasons for all denials',
    'Timelines for decision-making with consequences for delays',
    'Presumption of credibility for injured workers',
    'Preference for treating physician opinions over IMEs',
    'Fair compensation for permanent disabilities',
    'Protection from employer retaliation',
    'Mental health claims treated with same standard as physical',
    'Right to legal representation at all stages',
    'Public reporting on claim outcomes and appeals',
  ];

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow mb-4 block">Collective Action</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          Change happens when we act together.
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          Individual appeals matter. But systemic change requires collective pressure. 
          Here's how to add your voice to the movement.
        </p>
      </div>

      {/* 10 Point Call to Action */}
      <div className="card mb-12 border-[#D4A03A]/30">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
            <Megaphone size={28} className="text-[#D4A03A]" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-2xl text-[#F3EFE6] mb-2">
              10-Point Call to Action
            </h2>
            <p className="body-text text-[#F3EFE6]/60">
              These reforms would transform the workers compensation system for injured workers in BC.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tenPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#F3EFE6]/5">
              <span className="w-6 h-6 rounded-full bg-[#D4A03A]/20 flex items-center justify-center flex-shrink-0 font-mono text-xs text-[#D4A03A]">
                {idx + 1}
              </span>
              <span className="body-text text-[#F3EFE6]/80 text-sm">{point}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[#F3EFE6]/10">
          <button className="btn-primary">
            <Share2 size={18} />
            Share the 10-Point Call
          </button>
        </div>
      </div>

      {/* Action Cards */}
      <h2 className="font-heading font-bold text-xl text-[#F3EFE6] mb-6">
        Ways to Take Action
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <div key={action.title} className="card">
              <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center mb-4">
                <Icon size={24} className="text-[#D4A03A]" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2">
                {action.title}
              </h3>
              <p className="body-text text-[#F3EFE6]/60 text-sm mb-4">
                {action.description}
              </p>
              <ul className="space-y-2">
                {action.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight size={14} className="text-[#D4A03A] mt-1 flex-shrink-0" />
                    <span className="body-text text-[#F3EFE6]/70 text-xs">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Allied Groups */}
      <div className="card mb-12">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4 flex items-center gap-3">
          <Heart size={20} className="text-[#D4A03A]" />
          Allied Organizations
        </h3>
        <p className="body-text text-[#F3EFE6]/60 text-sm mb-6">
          Connect with groups advocating for injured workers' rights across BC and Canada.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: 'BC Federation of Labour',
              description: 'Provincial labour federation advocating for worker rights',
              url: 'https://bcfed.ca',
            },
            {
              name: 'Canadian Injured Workers Alliance',
              description: 'National network of injured worker groups',
              url: '#',
            },
            {
              name: 'Workers Compensation Action Group',
              description: 'Grassroots advocacy for system reform',
              url: '#',
            },
            {
              name: 'BC Ombudsperson',
              description: 'Independent oversight of administrative fairness',
              url: 'https://bcombudsperson.ca',
            },
          ].map((org) => (
            <a
              key={org.name}
              href={org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between p-4 rounded-xl bg-[#F3EFE6]/5 hover:bg-[#F3EFE6]/10 transition-colors group"
            >
              <div>
                <h4 className="font-heading font-bold text-sm text-[#F3EFE6] group-hover:text-[#D4A03A] transition-colors">
                  {org.name}
                </h4>
                <p className="body-text text-[#F3EFE6]/50 text-xs mt-1">
                  {org.description}
                </p>
              </div>
              <ExternalLink size={14} className="text-[#F3EFE6]/40 group-hover:text-[#D4A03A] transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="border border-[#D4A03A]/30 rounded-[28px] p-6 lg:p-8 bg-[#D4A03A]/5">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4">
          Sample Social Media Posts
        </h3>
        <p className="body-text text-[#F3EFE6]/60 text-sm mb-6">
          Use these as starting points. Personalize with your own experience (anonymized).
        </p>
        <div className="space-y-4">
          {[
            'I was injured at work. What followed was a system more focused on denying claims than helping workers recover. This needs to change. #WorkersCompBC #InjuredWorkers',
            'WorkSafeBC denied my claim despite medical evidence. 18 months later, WCAT overturned the decision. The appeal process shouldn\'t be a lottery. #SystemicReform',
            'My treating doctor of 10 years was ignored. A 20-minute file review by a Board advisor overruled them. This is evidentiary bias in action. #FixWorkSafeBC',
          ].map((post, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-[#0B3C43]">
              <div className="w-8 h-8 rounded-full bg-[#D4A03A]/20 flex items-center justify-center flex-shrink-0">
                <Share2 size={14} className="text-[#D4A03A]" />
              </div>
              <p className="body-text text-[#F3EFE6]/80 text-sm flex-1">{post}</p>
              <button 
                onClick={() => navigator.clipboard.writeText(post)}
                className="text-[#D4A03A] text-xs hover:underline"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectiveActionPage;
