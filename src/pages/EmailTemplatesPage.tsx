import { useState } from 'react';
import { Copy, Check, Mail, FileText, User, Building, Scale } from 'lucide-react';

const EmailTemplatesPage = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const templates = [
    {
      id: 'request-file',
      title: 'Request Your Claim File (s.151)',
      recipient: 'WorkSafeBC',
      purpose: 'Get all documents they have about your claim',
      icon: FileText,
      content: `Subject: Request for Complete Claim File - Section 151

Dear WorkSafeBC,

I am writing to request a complete copy of my claim file pursuant to section 151 of the Workers Compensation Act.

Claim Number: [YOUR CLAIM NUMBER]
Worker Name: [YOUR NAME]
Date of Injury: [DATE]

Please provide:
1. All medical reports and opinions in your possession
2. All correspondence and notes from case managers
3. All internal communications regarding my claim
4. All decisions and decision rationales
5. Any surveillance or investigation materials
6. Any other documents related to my claim

I understand there may be fees for copying. Please advise of any costs before proceeding.

Please send the complete file to:
[YOUR ADDRESS]

Thank you for your prompt attention to this request.

Sincerely,
[YOUR NAME]
[YOUR PHONE NUMBER]
[DATE]`,
    },
    {
      id: 'request-reasons',
      title: 'Request Detailed Reasons for Decision',
      recipient: 'WorkSafeBC',
      purpose: 'Get the specific rationale behind a denial',
      icon: Scale,
      content: `Subject: Request for Detailed Reasons - Decision dated [DATE]

Dear WorkSafeBC,

I am writing to request detailed reasons for the decision dated [DATE] regarding my claim.

Claim Number: [YOUR CLAIM NUMBER]
Decision Date: [DATE]
Decision Type: [e.g., Section 5 denial, Section 16 denial]

Specifically, I request:
1. The specific evidence relied upon in making this decision
2. The reasoning process that led to the conclusion
3. Which medical opinions were accepted and which were rejected, with reasons
4. How the decision-maker interpreted the relevant sections of the Act
5. Any policy or precedent documents consulted

I note that under the Workers Compensation Act, I am entitled to understand the basis for decisions affecting my claim.

Please provide this information in writing within a reasonable timeframe.

Sincerely,
[YOUR NAME]
[YOUR CLAIM NUMBER]
[DATE]`,
    },
    {
      id: 'correct-record',
      title: 'Request to Correct the Record',
      recipient: 'WorkSafeBC',
      purpose: 'Fix factual errors in your claim file',
      icon: FileText,
      content: `Subject: Request to Correct Factual Errors in Claim File

Dear WorkSafeBC,

I am writing to request corrections to factual errors in my claim file.

Claim Number: [YOUR CLAIM NUMBER]

The following information is incorrect:

ERROR 1:
- Current file states: [WHAT IT SAYS]
- Correct information: [WHAT IT SHOULD SAY]
- Evidence: [ATTACH SUPPORTING DOCUMENT]

ERROR 2:
- Current file states: [WHAT IT SAYS]
- Correct information: [WHAT IT SHOULD SAY]
- Evidence: [ATTACH SUPPORTING DOCUMENT]

These errors are material to my claim and may affect decisions about my benefits. I request that my file be corrected and that any decision-makers reviewing my claim be made aware of these corrections.

Please confirm receipt of this request and advise when the corrections have been made.

Sincerely,
[YOUR NAME]
[YOUR CLAIM NUMBER]
[DATE]`,
    },
    {
      id: 'mla-escalation',
      title: 'Escalate to Your MLA',
      recipient: 'Member of Legislative Assembly',
      purpose: 'Get political attention for systemic issues',
      icon: User,
      content: `Subject: Request for Assistance - WorkSafeBC Claim Issues

Dear [MLA NAME],

I am writing to request your assistance with serious concerns about my treatment by WorkSafeBC.

I am a constituent in your riding of [RIDING NAME]. I was injured at work on [DATE] and have been dealing with WorkSafeBC since [DATE].

The issues I am experiencing include:
- [e.g., Unreasonable delays in processing my claim]
- [e.g., Denial of benefits despite medical evidence]
- [e.g., Failure to respond to my requests for information]
- [e.g., Other specific issues]

These issues appear to be part of a broader pattern that has been documented in independent reviews and ombudsperson reports regarding WorkSafeBC's treatment of injured workers.

I am requesting:
1. Your office's assistance in getting WorkSafeBC to address my specific concerns
2. Your support for systemic reforms to improve accountability and fairness

I have attached relevant documents including:
- [List attachments]

I would appreciate the opportunity to discuss this matter with you or your staff.

Thank you for your time and attention to this important issue.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL]
[DATE]`,
    },
    {
      id: 'review-division',
      title: 'Review Division Appeal',
      recipient: 'WorkSafeBC Review Division',
      purpose: 'Appeal a decision to the first level of review',
      icon: Scale,
      content: `Subject: Request for Review - Decision dated [DATE]

To: WorkSafeBC Review Division

I am requesting a review of the decision dated [DATE] regarding my claim.

Claim Number: [YOUR CLAIM NUMBER]
Worker Name: [YOUR NAME]
Date of Injury: [DATE]
Decision Being Appealed: [BRIEF DESCRIPTION]

GROUNDS FOR REVIEW:

1. ERROR OF LAW:
[Explain how the decision-maker misapplied or misunderstood the law. Cite specific sections of the Workers Compensation Act if applicable.]

2. ERROR OF FACT:
[Explain what facts were wrong or misinterpreted. Provide evidence.]

3. FAILURE TO CONSIDER EVIDENCE:
[Explain what evidence was ignored or not properly considered.]

4. UNREASONABLE FINDING:
[Explain why the decision was not reasonably supported by the evidence.]

RELIEF REQUESTED:
I request that the decision be overturned and [specific relief requested].

I have attached the following supporting documents:
- [List attachments]

Please confirm receipt of this request.

Sincerely,
[YOUR NAME]
[YOUR PHONE NUMBER]
[YOUR EMAIL]
[DATE]

Note: This request is made within 90 days of the decision date.`,
    },
    {
      id: 'ombudsperson',
      title: 'Ombudsperson Complaint',
      recipient: 'BC Ombudsperson',
      purpose: 'File a complaint about unfair administrative conduct',
      icon: Building,
      content: `Subject: Complaint Regarding WorkSafeBC

To: BC Ombudsperson

I am filing a complaint about unfair and unreasonable conduct by WorkSafeBC in handling my claim.

Claim Number: [YOUR CLAIM NUMBER]
Worker Name: [YOUR NAME]
Date of Injury: [DATE]

NATURE OF COMPLAINT:

I believe WorkSafeBC has acted unfairly and unreasonably in the following ways:

1. [Specific complaint - e.g., Unreasonable delay in processing]
2. [Specific complaint - e.g., Failure to provide reasons for decisions]
3. [Specific complaint - e.g., Ignoring relevant evidence]

DETAILED DESCRIPTION:
[Provide a chronological account of what happened, with dates and specific incidents.]

EFFORTS TO RESOLVE:
I have attempted to resolve these issues by:
- [List what you've done - e.g., Contacted case manager, requested review, etc.]

These efforts have been unsuccessful because [explain why].

OUTCOME SOUGHT:
I am seeking [specific outcome - e.g., Fair reconsideration of my claim, apology, systemic changes, etc.]

I have attached copies of relevant correspondence and documents.

Thank you for considering my complaint.

Sincerely,
[YOUR NAME]
[YOUR ADDRESS]
[YOUR PHONE NUMBER]
[YOUR EMAIL]
[DATE]`,
    },
  ];

  return (
    <div className="pt-24 pb-16 px-6 lg:px-[8vw] bg-[#0B3C43] min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <span className="eyebrow mb-4 block">Email Templates</span>
        <h1 className="headline-lg text-[#F3EFE6] mb-4">
          Use the words that create accountability.
        </h1>
        <p className="body-text text-[#F3EFE6]/70 max-w-[640px]">
          These templates are starting points. Customize them with your specific facts, 
          dates, and details. Always keep copies of everything you send.
        </p>
      </div>

      {/* Templates */}
      <div className="space-y-6">
        {templates.map((template) => {
          const Icon = template.icon;
          const isCopied = copiedId === template.id;
          
          return (
            <div key={template.id} className="card overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#D4A03A]/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-[#D4A03A]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-1">
                      {template.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-[#D4A03A] uppercase tracking-wider">
                        To: {template.recipient}
                      </span>
                      <span className="font-mono text-[10px] text-[#F3EFE6]/40">
                        {template.purpose}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(template.content, template.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isCopied
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-[#F3EFE6]/10 text-[#F3EFE6] hover:bg-[#F3EFE6]/20'
                  }`}
                >
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="bg-[#0B3C43] rounded-xl p-4 border border-[#F3EFE6]/10 overflow-x-auto">
                <pre className="body-text text-[#F3EFE6]/80 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                  {template.content}
                </pre>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      <div className="mt-12 border border-[#D4A03A]/30 rounded-[28px] p-6 lg:p-8 bg-[#D4A03A]/5">
        <h3 className="font-heading font-bold text-lg text-[#F3EFE6] mb-4 flex items-center gap-3">
          <Mail size={20} className="text-[#D4A03A]" />
          Email Best Practices
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Always use email, not just phone calls',
            'Keep your tone professional, even when frustrated',
            'Reference specific dates and decision numbers',
            'Attach supporting documents when relevant',
            'Save a copy of every email you send',
            'Follow up if you don\'t get a response in 2 weeks',
            'Cc your MLA on important correspondence',
            'Use read receipts for critical communications',
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

export default EmailTemplatesPage;
