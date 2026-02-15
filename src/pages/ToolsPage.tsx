import { useState } from 'react';
import { 
  Calendar, Phone, ClipboardCheck, AlertTriangle, Download, 
  FileText, CheckCircle, Clock, Users, TrendingUp, ChevronRight
} from 'lucide-react';

const ToolsPage = () => {
  const [activeTab, setActiveTab] = useState('templates');

  const templates = [
    {
      title: 'Claim Timeline Template',
      description: 'One page to track dates, decisions, and what changed. Essential for appeals.',
      icon: Calendar,
      format: 'PDF + Word',
      downloadCount: '2,847',
    },
    {
      title: 'Call Log Template',
      description: 'Who you spoke to, when, and what was promised. Creates accountability.',
      icon: Phone,
      format: 'PDF + Excel',
      downloadCount: '3,124',
    },
    {
      title: 'Evidence Checklist',
      description: 'Comprehensive list of documents to gather: medical, employer, financial.',
      icon: ClipboardCheck,
      format: 'PDF',
      downloadCount: '2,561',
    },
    {
      title: 'Violation Tracker',
      description: 'Match WorkSafeBC actions to specific Act sections for appeals.',
      icon: AlertTriangle,
      format: 'PDF + Word',
      downloadCount: '1,892',
    },
  ];

  const checklists = [
    {
      title: 'First 30 Days After Injury',
      items: [
        'Report injury to employer in writing',
        'See your doctor and get a medical report',
        'File WorkSafeBC claim immediately',
        'Start a call log',
        'Take photos of injury scene if possible',
        'Get witness statements if applicable',
        'Request claim file number',
        'Save all correspondence',
      ],
    },
    {
      title: 'Before Any Appeal',
      items: [
        'Request complete claim file (s.151)',
        'Review all decisions for errors',
        'Identify specific Act sections violated',
        'Gather supporting medical evidence',
        'Document timeline of events',
        'Check deadlines (Review: 90 days, WCAT: 30 days)',
        'Consider getting legal advice',
        'Prepare written submission',
      ],
    },
    {
      title: 'Building Your Record',
      items: [
        'Organize documents chronologically',
        'Create index of all evidence',
        'Redact personal info before sharing',
        'Make copies of everything',
        'Keep original documents safe',
        'Document symptoms daily',
        'Track all expenses related to injury',
        'Save receipts for everything',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow mb-4 block">Documentation Center</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          Build a record they can't ignore.
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          If it isn't documented, it didn't happen. Start small. Stay consistent. 
          These tools help you create an appeal-ready file.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[#F3EFE6]/10">
        {[
          { id: 'templates', label: 'Templates', icon: FileText },
          { id: 'checklists', label: 'Checklists', icon: CheckCircle },
          { id: 'guides', label: 'Guides', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-[#D4A03A] border-[#D4A03A]'
                  : 'text-[#F3EFE6]/60 border-transparent hover:text-[#F3EFE6]'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.title} className="card group">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={28} className="text-[#D4A03A]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#D4A03A]">
                        {template.format}
                      </span>
                      <span className="font-mono text-[10px] text-[#F3EFE6]/40">
                        {template.downloadCount} downloads
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2 group-hover:text-[#D4A03A] transition-colors">
                      {template.title}
                    </h3>
                    <p className="body-text text-[#F3EFE6]/60 text-sm mb-4">
                      {template.description}
                    </p>
                    <button className="flex items-center gap-2 text-[#D4A03A] text-sm font-medium hover:underline">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Checklists Tab */}
      {activeTab === 'checklists' && (
        <div className="space-y-6">
          {checklists.map((checklist) => (
            <div key={checklist.title} className="card">
              <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4 flex items-center gap-3">
                <CheckCircle size={20} className="text-[#D4A03A]" />
                {checklist.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {checklist.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#F3EFE6]/5">
                    <div className="w-5 h-5 rounded border border-[#F3EFE6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 rounded-sm bg-[#D4A03A]/50" />
                    </div>
                    <span className="body-text text-[#F3EFE6]/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-[#D4A03A] text-sm font-medium hover:underline">
                <Download size={16} />
                Download printable version
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Guides Tab */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          {[
            {
              title: 'How to Request Your Claim File (s.151)',
              description: 'Step-by-step guide to getting all documents WorkSafeBC holds about your claim.',
              icon: FileText,
              readTime: '5 min read',
            },
            {
              title: 'Understanding Review Division',
              description: 'What Review Division does, timelines, and how to prepare a strong submission.',
              icon: Clock,
              readTime: '8 min read',
            },
            {
              title: 'WCAT Appeal Basics',
              description: 'Introduction to the Workers Compensation Appeal Tribunal process.',
              icon: Users,
              readTime: '10 min read',
            },
            {
              title: 'When to Involve Your MLA',
              description: 'How to escalate systemic issues through political channels.',
              icon: TrendingUp,
              readTime: '6 min read',
            },
          ].map((guide) => {
            const Icon = guide.icon;
            return (
              <div key={guide.title} className="card group cursor-pointer">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-[#D4A03A]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-[#F3EFE6]/40">
                        {guide.readTime}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-2 group-hover:text-[#D4A03A] transition-colors flex items-center gap-2">
                      {guide.title}
                      <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="body-text text-[#F3EFE6]/60 text-sm">
                      {guide.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-16 border border-[#D4A03A]/30 rounded-[28px] p-6 lg:p-8 bg-[#D4A03A]/5">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4">
          Documentation Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Date everything. Even approximate dates help establish timelines.',
            'Keep originals. WorkSafeBC sometimes asks for original documents.',
            'Use email, not phone. Written communication creates a record.',
            'Follow up calls with email. Summarize what was discussed.',
            'Save screenshots. Portal messages can disappear.',
            'Organize by date. Chronological order helps everyone understand.',
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

export default ToolsPage;
