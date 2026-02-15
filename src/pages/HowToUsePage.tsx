import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderOpen, Scale, Mail, BookMarked, ChevronDown, ChevronUp,
  FileText, Phone, ClipboardCheck, AlertTriangle, Download, ArrowRight
} from 'lucide-react';

const HowToUsePage = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (card: string) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const moves = [
    {
      id: 'secure',
      number: '1',
      title: 'Secure the evidence',
      description: 'Save decisions, photos, texts, call logs.',
      icon: FolderOpen,
      content: {
        intro: 'If it isn\'t documented, they\'ll swear it never happened. WorkSafeBC lives on paper (and pixels). Phone calls vanish. "Misunderstandings" appear. Memories get fuzzy.',
        checklist: [
          'Medical & Health Evidence: Doctor reports, specialist consultations, physiotherapy reports, imaging results',
          'WorkSafeBC Documents: Claim letters, decisions, case manager emails, portal messages',
          'Employer Evidence: Incident reports, emails about modified duties, performance issues',
          'Financial Evidence: Pay stubs, EI records, rent statements, eviction threats',
        ],
        action: 'Start a simple timeline today. Write down 5-10 key dates: injury, first doctor visit, first decision, any big changes.',
        link: '/tools',
        linkText: 'Get documentation templates',
      },
    },
    {
      id: 'identify',
      number: '2',
      title: 'Identify violations',
      description: 'Map what they did to what the Act requires.',
      icon: Scale,
      content: {
        intro: 'WorkSafeBC must follow the Workers Compensation Act. When they don\'t, you have leverage. The key is knowing which sections apply to your situation.',
        checklist: [
          'Section 5: Compensation for personal injury arising out of employment',
          'Section 151: Right to request medical reports and evidence',
          'Section 244: Review Division procedures and timelines',
          'Section 285: WCAT jurisdiction and standards',
        ],
        action: 'Learn the key terms: "arising out of employment," "significant contributing factor," "preponderance of evidence."',
        link: '/glossary',
        linkText: 'View full glossary',
      },
    },
    {
      id: 'pressure',
      number: '3',
      title: 'Send targeted pressure',
      description: 'Use the words that create accountability.',
      icon: Mail,
      content: {
        intro: 'You don\'t need to be a lawyer. You need to ask the right questions—on paper. Written communication creates a record they can\'t ignore.',
        checklist: [
          'Email to WorkSafeBC: Request specific evidence they relied on',
          'Letter to your MLA: Frame as oversight, not casework',
          'Minister escalation: Document systemic patterns, not just your case',
          'Ombudsperson complaint: When internal processes fail',
        ],
        action: 'Always write, never just call. If you do call, follow up with an email summarizing what was discussed.',
        link: '/email-templates',
        linkText: 'Copy email templates',
      },
    },
    {
      id: 'study',
      number: '4',
      title: 'Study the wins',
      description: 'WCAT decisions show what actually works.',
      icon: BookMarked,
      content: {
        intro: 'Other workers have faced similar battles and won. WCAT decisions are public record and show what evidence, framing, and persistence can achieve.',
        checklist: [
          'Mental disorder claims: A1900037 - refusal to accommodate as stressor',
          'Cumulative trauma: A2101129 - repeated minor incidents as compensable',
          'No clear diagnosis: 2004-06686 - mechanism + credible evidence sufficient',
          'Late applications: 2014-01368 - mental disorder delaying filing',
        ],
        action: 'Read decisions in your category. Note the evidence that carried weight and the arguments that succeeded.',
        link: '/precedents',
        linkText: 'Browse all precedents',
      },
    },
  ];

  const quickStart = [
    { title: 'Claim Timeline', icon: FileText, desc: 'One page with dates, decisions, what changed' },
    { title: 'Call Log', icon: Phone, desc: 'Who, when, what was promised' },
    { title: 'Evidence Checklist', icon: ClipboardCheck, desc: 'Photos, texts, reports, forms' },
    { title: 'Violation Tracker', icon: AlertTriangle, desc: 'Match their actions to Act sections' },
  ];

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow mb-4 block">How to use this</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          The First Four Moves
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          You don't need to learn everything. Start here. Each move builds on the last, 
          turning your experience into evidence they can't dismiss.
        </p>
      </div>

      {/* Expandable Cards */}
      <div className="space-y-4 mb-16">
        {moves.map((move) => {
          const Icon = move.icon;
          const isExpanded = expandedCard === move.id;
          
          return (
            <div
              key={move.id}
              className={`border border-[#F3EFE6]/15 rounded-[28px] overflow-hidden transition-all ${
                isExpanded ? 'bg-[#F3EFE6]/5' : 'bg-transparent hover:bg-[#F3EFE6]/5'
              }`}
            >
              <button
                onClick={() => toggleCard(move.id)}
                className="w-full p-6 lg:p-8 flex items-start gap-6 text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={28} className="text-[#D4A03A]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs text-[#D4A03A] uppercase tracking-wider mb-2 block">
                        Move {move.number}
                      </span>
                      <h3 className="font-heading font-bold text-xl lg:text-2xl text-[#F3EFE6]">
                        {move.title}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={24} className="text-[#F3EFE6]/50" />
                    ) : (
                      <ChevronDown size={24} className="text-[#F3EFE6]/50" />
                    )}
                  </div>
                  <p className="body-text text-[#F3EFE6]/60 mt-2">{move.description}</p>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 lg:px-8 pb-8 pl-[92px] lg:pl-[108px]">
                  <div className="border-t border-[#F3EFE6]/10 pt-6">
                    <p className="body-text text-[#F3EFE6]/80 mb-6 max-w-[720px]">
                      {move.content.intro}
                    </p>
                    
                    <h4 className="font-heading font-bold text-sm text-[#F3EFE6] uppercase tracking-wider mb-4">
                      Key Points
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {move.content.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A03A] mt-2 flex-shrink-0" />
                          <span className="body-text text-[#F3EFE6]/70 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-[#D4A03A]/10 rounded-xl p-4 mb-6">
                      <p className="body-text text-[#F3EFE6] text-sm">
                        <strong>Action step:</strong> {move.content.action}
                      </p>
                    </div>
                    
                    <Link
                      to={move.content.link}
                      className="btn-primary inline-flex"
                    >
                      {move.content.linkText}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Start Tools */}
      <div className="mb-16">
        <h2 className="headline-md text-[#F3EFE6] mb-6">
          Quick Start Tools
        </h2>
        <p className="body-text text-[#F3EFE6]/70 mb-8 max-w-[600px]">
          Download these templates to start building your record today. 
          Print them out or fill them in digitally—whatever works for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickStart.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.title} className="card">
                <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-[#D4A03A]" />
                </div>
                <h3 className="font-heading font-bold text-base text-[#F3EFE6] mb-2">
                  {tool.title}
                </h3>
                <p className="body-text text-[#F3EFE6]/60 text-sm mb-4">
                  {tool.desc}
                </p>
                <button className="flex items-center gap-2 text-[#D4A03A] text-sm font-medium hover:underline">
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning Box */}
      <div className="border border-[#D4A03A]/30 rounded-[28px] p-6 lg:p-8 bg-[#D4A03A]/5">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4">
          Before You Do Anything Else
        </h3>
        <ul className="space-y-3 mb-6">
          {[
            "Don't call just to 'talk it through' with no notes.",
            "Don't agree to anything on the phone you don't understand.",
            "Don't send a rage email you can't walk back.",
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <AlertTriangle size={18} className="text-[#D4A03A] mt-0.5 flex-shrink-0" />
              <span className="body-text text-[#F3EFE6]/70">{item}</span>
            </li>
          ))}
        </ul>
        <p className="body-text text-[#F3EFE6]/80">
          Do this first: Save a copy of whatever they sent. Write the date, what they decided, 
          and how it hits you. Then take 10 minutes to figure out what kind of issue it is.
        </p>
      </div>
    </div>
  );
};

export default HowToUsePage;
