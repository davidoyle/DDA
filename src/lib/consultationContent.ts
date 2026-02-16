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
  headline: string;
  subheadline: string;
  sectionTitle: string;
  bullets: string[];
  priceHeadline: string;
  priceSubline: string;
  ctaLabel: string;
  ctaHref: string;
  nextStepsTitle: string;
  nextSteps: string[];
  closingLine: string;
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
  union: {
    label: 'Union',
    headline: 'Your Union Member Outcome Analysis',
    subheadline: "30 minutes. Your members' actual numbers.",
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      "Your members' outcomes vs. peer unions",
      'Where the pattern is',
      'What your leverage actually is',
      'What the data says to do next',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      "I pull your sector's data before we meet.",
      'You get a one-page PDF with your numbers.',
      'We spend 30 minutes understanding what they mean.',
      'At the end: "The full diagnostic is $15K."',
    ],
    closingLine: 'Most weeks book within 48 hours.',
  },
  municipality: {
    label: 'Municipality',
    headline: 'Your Municipal Cost Trajectory',
    subheadline: '30 minutes. The numbers for your next budget cycle.',
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      'Your actual cost trajectory (next 3-5 years)',
      'Which costs are hiding',
      'When the pressure comes',
      'How peer municipalities are planning',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      "I pull your municipality's data before we meet.",
      'You get a one-page PDF with your cost trajectory.',
      'We spend 30 minutes on what it means.',
      'At the end: "The full diagnostic is $15K."',
    ],
    closingLine: 'Most weeks book within 48 hours.',
  },
  contractor: {
    label: 'Contractor',
    headline: 'Your Contractor Risk Analysis',
    subheadline: "30 minutes. Your exposure. What's actually vulnerable.",
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      'Your violation pattern (what keeps repeating)',
      "Your sector's actual viability",
      'Which work types sustain',
      'What needs to change',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      "I pull your company's violation history before we meet.",
      'You get a one-page PDF with your exposure patterns.',
      'We spend 30 minutes on what it means.',
      'At the end: "The full diagnostic is $15K."',
    ],
    closingLine: 'Most weeks book within 48 hours.',
  },
  'law-firm': {
    label: 'Law Firm',
    headline: 'Your Litigation Evidence Strategy',
    subheadline: '30 minutes. Your case framework. Where you have leverage.',
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      "Your case's evidentiary framework",
      'Where institutional precedent supports you',
      'What expert witnesses can actually testify to',
      'Where your leverage is strongest',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      'I review your case brief before we meet.',
      'You get a one-page PDF with your evidence strategy.',
      'We spend 30 minutes mapping next steps.',
      'At the end: "The full package is $12K-$25K."',
    ],
    closingLine: 'Most weeks book within 48 hours of email send.',
  },
  association: {
    label: 'Industry Association',
    headline: 'Your Member Value & Advocacy Analysis',
    subheadline: "30 minutes. What's working. What members actually need.",
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      'What members actually value',
      'Where your advocacy moves the needle',
      'Why members leave (the real reasons)',
      'What the next 12 months should focus on',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      'I analyze your member feedback and advocacy record before we meet.',
      'You get a one-page PDF with your effectiveness assessment.',
      'We spend 30 minutes discussing what to do.',
      'At the end: "The full audit is $15K."',
    ],
    closingLine: 'Most weeks book within 48 hours.',
  },
  journalist: {
    label: 'Journalist',
    headline: 'Your Investigation Package',
    subheadline: 'Free first story. Fully sourced. Ready to publish.',
    sectionTitle: "What You'll Get",
    bullets: [
      'One fully researched investigation',
      'Data visualizations (already built)',
      'Expert interview list (with background)',
      'All source documentation',
    ],
    priceHeadline: 'FIRST INVESTIGATION: FREE',
    priceSubline: '(Complete. Sourced. Ready. Your byline.)',
    ctaLabel: 'CLAIM YOUR FREE INVESTIGATION',
    ctaHref: 'mailto:hello@dda.example?subject=Claim%20my%20free%20investigation',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      'Email me to claim your investigation.',
      'I send you the complete research package within 24 hours.',
      'You publish it under your byline.',
      'At the end: "I have 9 more investigations ready. Full package is $2K."',
    ],
    closingLine: 'Most claims redeemed within 48 hours.',
  },
  'small-business': {
    label: 'Small Business Owner',
    headline: 'Your Business Survival Strategy',
    subheadline: '30 minutes. What you can control. How to survive.',
    sectionTitle: "What You'll See in 30 Minutes",
    bullets: [
      "What's actually destroying your margins",
      "What you can control (and what you can't)",
      'Where you have real leverage',
      'One concrete action this week',
    ],
    priceHeadline: '$500 CAD',
    priceSubline: '(One payment. 30 minutes. Your custom one-page action plan.)',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
    nextStepsTitle: 'What Happens Next:',
    nextSteps: [
      "I pull your sector's data before we meet.",
      'You get a one-page PDF with your cost breakdown and priorities.',
      'We spend 30 minutes on your action plan.',
      'At the end: "The full analysis is $2.5K."',
    ],
    closingLine: 'Most weeks book within 48 hours.',
  },
};

export const defaultContent: SectorContent = {
  label: 'Institution',
  headline: 'Your Institutional Analysis',
  subheadline: '30 minutes. Your numbers. Your next move.',
  sectionTitle: "What You'll See in 30 Minutes",
  bullets: [
    'Your key exposure points',
    'Where pressure is coming from',
    'What actions create leverage',
    'What to do next',
  ],
  priceHeadline: '$500 CAD',
  priceSubline: '(One payment. 30 minutes. Your custom one-page summary.)',
  ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
  ctaHref: 'https://calendly.com/username/30-minute-exposure-analysis',
  nextStepsTitle: 'What Happens Next:',
  nextSteps: [
    'I pull your data before we meet.',
    'You get a one-page PDF with your numbers.',
    'We spend 30 minutes understanding what they mean.',
    'At the end: "The full diagnostic is available."',
  ],
  closingLine: 'Most weeks book within 48 hours.',
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
