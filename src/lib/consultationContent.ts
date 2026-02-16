export type SectorKey =
  | 'municipality'
  | 'union'
  | 'contractor'
  | 'law-firm'
  | 'association'
  | 'journalist'
  | 'small-business';

export type SectorContent = {
  label: string;
  focus: string;
  heroPain: string;
  valueBullets: string[];
  fearWithout: string[];
  fearWith: string[];
  credibilityExample: string;
  painLine: string;
  deliverables: string[];
};

export const sectorKeys: SectorKey[] = [
  'municipality',
  'union',
  'contractor',
  'law-firm',
  'association',
  'journalist',
  'small-business',
];

export const sectorConfig: Record<SectorKey, SectorContent> = {
  municipality: {
    label: 'Municipality',
    focus: 'Your WorkSafeBC Exposure Analysis',
    heroPain:
      'Finalizing your budget this week? The provincial deficit is $11.2B. Your WCB premiums are about to fill that gap.',
    valueBullets: [
      'Your exact repricing exposure ($X by 2027-2029)',
      'Year-by-year budget impact (with/without action)',
      "Peer municipality comparison (who's prepared)",
      'Mitigation strategies that work now',
    ],
    fearWithout: [
      "You'll budget based on 2026 rates—and get hit in 2027",
      "You'll explain to council why you missed it",
      "You'll cut services to cover unexpected premiums",
    ],
    fearWith: [
      "You'll know exactly when and how much",
      "You'll have a plan before the first increase",
      "You'll be the finance director who saw it coming",
    ],
    credibilityExample:
      'Currently advising 3 BC municipalities on 2027-2029 repricing',
    painLine:
      'Finalizing your budget this week? The provincial deficit is $11.2B. Your WCB premiums are about to fill that gap.',
    deliverables: [
      'Your exact repricing exposure by year',
      "Peer comparison: who's prepared, who isn't",
      'Budget impact scenarios (2026-2029)',
      'Action steps for budget submission',
      'One-page PDF summary with your numbers',
    ],
  },
  union: {
    label: 'Union',
    focus: 'Your Member Outcome Analysis',
    heroPain:
      "In active bargaining? Your members' denial patterns are leverage you're not using.",
    valueBullets: [
      "Your members' denial patterns vs. high-power groups",
      'Appeal strategies with documented win rates',
      'Bargaining leverage points hidden in WCB data',
      'Strategic timeline for contract fights',
    ],
    fearWithout: [
      "Your members will keep losing claims they should win",
      "You'll bargain without your strongest leverage",
      "You'll wonder why ILWU does better",
    ],
    fearWith: [
      "You'll have denial patterns by the numbers",
      "You'll bring proven strategies to the table",
      "You'll deliver what members actually need",
    ],
    credibilityExample:
      'Union members currently outperforming non-union by 15% using these methods',
    painLine:
      "In active bargaining? Your members' denial patterns are leverage you're not using.",
    deliverables: [
      "Your members' denial rates vs. high-power groups",
      'WCAT precedent database for your sector',
      'Appeal strategies that win (by diagnosis)',
      'Bargaining leverage briefing',
      'One-page PDF summary with your numbers',
    ],
  },
  contractor: {
    label: 'Contractor',
    focus: 'Your Risk Exposure Analysis',
    heroPain:
      'Margins down 4%. Tariffs up. The last thing you need is a fine you could have prevented.',
    valueBullets: [
      'Your 5-year violation pattern (what WCB sees)',
      'Site-specific risk assessment by project type',
      "Comparable contractor benchmarks (who's getting fined)",
      'Compliance roadmap before your next inspection',
    ],
    fearWithout: [
      "You'll keep getting fines you don't see coming",
      'Your margins will bleed from avoidable penalties',
      'Your safety director will always be reactive',
    ],
    fearWith: [
      "You'll know your pattern before WCB does",
      "You'll fix problems before inspections",
      "You'll protect your margins and your reputation",
    ],
    credibilityExample:
      'Contractors using this analysis have reduced fines by an average of 40%',
    painLine:
      'Margins down 4%. Tariffs up. The last thing you need is a fine you could have prevented.',
    deliverables: [
      'Your 5-year violation pattern analysis',
      'Site-specific risk framework',
      'Comparable contractor benchmarks',
      'Compliance roadmap',
      'One-page PDF summary with your numbers',
    ],
  },
  'law-firm': {
    label: 'Law Firm',
    focus: 'Your Litigation Support Package',
    heroPain:
      'Gig worker review deadline: March 31. Your clients need submissions. You need data.',
    valueBullets: [
      'WCAT precedent database for your case type',
      'Evidentiary framework with 48 pages of analysis',
      'Expert witness referral network (vetted)',
      'Appeal strategy briefing by diagnosis',
    ],
    fearWithout: [
      "You'll burn 100+ billable hours on research",
      "You'll miss precedents that could win cases",
      "Your clients will wonder why it's taking so long",
    ],
    fearWith: [
      "You'll have 48 pages of ready-to-use evidence",
      "You'll cite precedents your opponents missed",
      "You'll win cases faster and bill smarter",
    ],
    credibilityExample:
      'Now supporting 2 constitutional challenges to WCB structure',
    painLine:
      'Gig worker review deadline: March 31. Your clients need submissions. You need data.',
    deliverables: [
      '48-page evidentiary synthesis',
      'WCAT precedent database',
      'Expert witness referral network',
      'Appeal strategy briefing',
      'One-page PDF summary with your numbers',
    ],
  },
  association: {
    label: 'Association',
    focus: 'Your Member Value Analysis',
    heroPain:
      '44% of small businesses are dissatisfied with government response. Your members are among them.',
    valueBullets: [
      'Your member ROI score (actual vs. perceived)',
      'Priority alignment: what members need vs. what you deliver',
      'Advocacy effectiveness index by issue',
      'Retention strategy based on member pain',
    ],
    fearWithout: [
      'Your members will question their dues',
      "Your advocacy will miss the real pain points",
      'Your retention will keep sliding',
    ],
    fearWith: [
      "You'll prove your value with data",
      "You'll align priorities with member needs",
      "You'll give members reasons to stay",
    ],
    credibilityExample:
      'Association members using this data have increased retention 12%',
    painLine:
      '44% of small businesses are dissatisfied with government response. Your members are among them.',
    deliverables: [
      'Your member ROI score',
      'Priority alignment analysis',
      'Advocacy effectiveness index',
      'Retention strategy',
      'One-page PDF summary with your numbers',
    ],
  },
  journalist: {
    label: 'Journalist',
    focus: 'Your Investigation Package',
    heroPain:
      'Tumbler Ridge. Opioid deaths. Budget cuts. You have deadlines. I have sources.',
    valueBullets: [
      'Fully sourced investigation (ready to publish)',
      'Data visualizations + graphics package',
      'Expert interview list with contact info',
      'Background briefing with 10+ primary sources',
    ],
    fearWithout: [
      "You'll chase stories without the evidence",
      "You'll miss deadlines hunting sources",
      "Your competitors will break it first",
    ],
    fearWith: [
      "You'll have a finished investigation",
      "You'll name sources and cite data",
      "You'll publish while others scramble",
    ],
    credibilityExample:
      'Methodology has informed coverage in [placeholder outlets]',
    painLine:
      'Tumbler Ridge. Opioid deaths. Budget cuts. You have deadlines. I have sources.',
    deliverables: [
      'Fully sourced investigation (ready to publish)',
      'Data visualizations + graphics',
      'Expert interview list',
      'Background briefing',
      'One-page PDF summary with key findings',
    ],
  },
  'small-business': {
    label: 'Small Business',
    focus: 'Your Survival Analysis',
    heroPain:
      "44% of small businesses say government isn't helping. Here's what they're not telling you.",
    valueBullets: [
      "Your actual regulatory burden (not CFIB's version)",
      'Cost-saving checklist by category',
      "CFIB cancellation template (what they're not doing)",
      '90-day survival plan with specific steps',
    ],
    fearWithout: [
      "You'll keep paying for things that don't help",
      'Your margins will keep shrinking',
      "You'll wonder why everyone else is surviving",
    ],
    fearWith: [
      "You'll cut costs that aren't serving you",
      "You'll have a 90-day survival plan",
      "You'll stop paying for useless memberships",
    ],
    credibilityExample:
      'Small businesses using this approach report 22% reduction in compliance costs',
    painLine:
      "44% of small businesses say government isn't helping. Here's what they're not telling you.",
    deliverables: [
      'Your regulatory burden analysis',
      'Cost-saving checklist by category',
      'CFIB cancellation template',
      '90-day survival plan',
      'One-page PDF summary with your numbers',
    ],
  },
};

export const defaultContent: SectorContent = {
  label: 'Institutional',
  focus: 'Exposure Analysis',
  heroPain: "Based on today's headlines, your sector is exposed.",
  valueBullets: [
    'Sector-specific exposure analysis',
    'Year-by-year risk and cost implications',
    'Comparable benchmarks for your peer group',
    'Action roadmap to reduce avoidable losses',
  ],
  fearWithout: [
    "You'll react after the damage is done",
    "You'll justify surprises you could have prevented",
    "You'll lose time, margin, or leverage",
  ],
  fearWith: [
    "You'll know where pressure is building",
    "You'll have a plan tied to your numbers",
    "You'll move before the next shock hits",
  ],
  credibilityExample:
    'Forensic institutional analysis tailored to your sector and timeline',
  painLine: "Based on today's headlines, your sector is exposed.",
  deliverables: [
    'Sector-specific exposure breakdown',
    'Comparative benchmark snapshot',
    'Priority intervention roadmap',
    '30-minute strategy call with next steps',
    'One-page PDF summary with your numbers',
  ],
};

export const sectorQuestions: Record<SectorKey, string[]> = {
  municipality: [
    'How accurate is the 3-year timeline?',
    'Can you show me the math behind my number?',
    'What happens if I do nothing?',
  ],
  union: [
    'Why is ILWU doing better than us?',
    'Which appeal strategies actually work?',
    'How do I use this in bargaining?',
  ],
  contractor: [
    'What violations am I missing?',
    'How do I compare to other contractors?',
    "What's the fastest way to reduce fines?",
  ],
  'law-firm': [
    "What's in the 48 pages?",
    'Which experts do you recommend?',
    'How recent is the precedent database?',
  ],
  association: [
    'How do I prove ROI to my board?',
    'What are members actually mad about?',
    'Where should we focus advocacy?',
  ],
  journalist: [
    'How sourced is the investigation?',
    'Can I get an exclusive?',
    "Who are the experts you've vetted?",
  ],
  'small-business': [
    'What can I cut without hurting the business?',
    'Is CFIB actually useless?',
    'How fast can I see savings?',
  ],
};
