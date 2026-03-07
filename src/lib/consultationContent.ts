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
    headline: 'YOUR UNION MEMBER OUTCOME ANALYSIS',
    subheadline: '30 minutes. What the evidence reveals about your members.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of member outcomes based on public data.',
      "Where your system's reported performance doesn't match observable results.",
      'What specific changes would improve member outcomes.',
      "This may include: acceptance rates vs. peer unions, denial patterns by claim type, appeal success rates, regional disparities, sectoral variations, or other structural patterns in how your system performs vs. how it claims to perform.",
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of answers.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "We synthesize public data on your sector before we meet.",
      'You get a one-page summary showing what the evidence reveals.',
      'We spend 30 minutes discussing what it means.',
      'You decide if the full analysis ($15K) makes sense.',
    ],
    closingLine: 'Most unions book within 48 hours.',
  },
  municipality: {
    label: 'Municipality',
    headline: 'YOUR MUNICIPAL COST TRAJECTORY ANALYSIS',
    subheadline: '30 minutes. What the evidence reveals about your budget.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of your cost pressures based on public financial data.',
      "Where your budget forecasts don't match structural realities.",
      'What specific cost shifts are coming and when.',
      "This may include: repricing exposure, hidden liabilities, cost downloading, infrastructure pressures, comparative peer analysis, or other structural patterns in how your system performs vs. how it's forecasted to perform.",
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of answers.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "We synthesize your municipality's public data before we meet.",
      'You get a one-page summary showing what the evidence reveals.',
      'We spend 30 minutes discussing what it means for your budget.',
      'You decide if the full analysis ($15K) makes sense.',
    ],
    closingLine: 'Most municipalities book within 48 hours.',
  },
  contractor: {
    label: 'Contractor',
    headline: 'YOUR CONTRACTOR RISK & VIABILITY ANALYSIS',
    subheadline: '30 minutes. What the evidence reveals about your exposure.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of your sector and operational environment based on public data.',
      "Where your risk assessment doesn't match structural patterns in your industry.",
      'What specific vulnerabilities require attention.',
      'This may include: violation pattern analysis, enforcement trends, sector viability modeling, cost structure assessment, regional disparities, competitive landscape analysis, or other structural patterns affecting your operational sustainability.',
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of answers.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "We synthesize your sector's public data before we meet.",
      'You get a one-page summary showing what the evidence reveals.',
      'We spend 30 minutes discussing what it means for your business.',
      'You decide if the full analysis ($15K) makes sense.',
    ],
    closingLine: 'Most contractors book within 48 hours.',
  },
  'law-firm': {
    label: 'Law Firm',
    headline: 'YOUR LITIGATION EVIDENCE ANALYSIS',
    subheadline: '30 minutes. What the evidence framework reveals about your case.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of publicly available evidence relevant to your litigation.',
      'Where institutional patterns support or complicate your case strategy.',
      'What specific evidentiary foundations strengthen your position.',
      'This may include: precedent mapping, institutional failure analysis, comparative case law synthesis, stakeholder incentive modeling, systemic bias documentation, or other structural patterns in how systems perform vs. how they claim to perform.',
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of strategy.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      'We review your case parameters before we meet.',
      'You get a one-page summary of the evidence framework.',
      'We spend 30 minutes discussing strategic implications.',
      'You decide if the full analysis ($12K-$25K) makes sense.',
    ],
    closingLine: 'Most law firms book within 48 hours.',
  },
  association: {
    label: 'Industry Association',
    headline: 'YOUR ASSOCIATION MEMBER VALUE ANALYSIS',
    subheadline: '30 minutes. What the evidence reveals about member outcomes.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of member value and advocacy effectiveness based on public data.',
      "Where your claimed priorities don't match member-stated needs.",
      'What specific misalignments are driving member dissatisfaction.',
      'This may include: member outcome analysis, advocacy effectiveness assessment, priority alignment evaluation, comparative benchmarking, member satisfaction correlation, retention risk factors, or other structural patterns in how your organization performs vs. how it claims to perform.',
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of answers.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "We synthesize your sector's public data before we meet.",
      'You get a one-page summary showing what the evidence reveals.',
      'We spend 30 minutes discussing what it means for retention.',
      'You decide if the full analysis ($15K) makes sense.',
    ],
    closingLine: 'Most associations book within 48 hours.',
  },
  journalist: {
    label: 'Journalist',
    headline: 'YOUR INVESTIGATION PACKAGE',
    subheadline: 'What the evidence reveals about the systemic story.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Complete investigative research based on synthesized public data.',
      "Where institutional claims don't match observable outcomes.",
      'Publication-ready findings with full source documentation.',
      'This may include: systemic failure analysis, pattern identification across institutional data, cost quantification, comparative case studies, stakeholder analysis, timeline reconstruction, or other evidence synthesis revealing structural problems in how systems perform vs. how they claim to perform.',
    ],
    priceHeadline: 'FREE | First investigation included. Fully sourced. Ready to publish.',
    priceSubline: '',
    ctaLabel: 'CLAIM YOUR FREE INVESTIGATION',
    ctaHref: 'mailto:hello@dda.example?subject=Claim%20my%20free%20investigation',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "Email us describing the story you're investigating.",
      'We research and synthesize public evidence.',
      'You get a complete package within 2 weeks (data, sources, narrative framework).',
      'You publish under your byline.',
    ],
    closingLine: 'Most journalists claim within 48 hours. Additional investigations: $2K-$5K per package.',
  },
  'small-business': {
    label: 'Small Business Owner',
    headline: 'YOUR BUSINESS COST STRUCTURE ANALYSIS',
    subheadline: '30 minutes. What the evidence reveals about your margins.',
    sectionTitle: 'WHAT YOU GET:',
    bullets: [
      'Structured analysis of your cost pressures based on sector and economic data.',
      "Where your margin assumptions don't match structural realities.",
      "What specific costs you can control vs. what you can't.",
      'This may include: regulatory burden assessment, cost-shift analysis, competitor benchmarking, sector viability modeling, growth constraint identification, supply chain pressure modeling, or other structural patterns affecting your profitability vs. what you expect.',
    ],
    priceHeadline: '$500 CAD | One payment. One call. One page of answers.',
    priceSubline: '',
    ctaLabel: 'BOOK YOUR 30-MINUTE CALL',
    ctaHref: 'https://calendly.com/bcdda/30min',
    nextStepsTitle: 'HOW IT WORKS:',
    nextSteps: [
      "We synthesize your sector's economic data before we meet.",
      'You get a one-page summary showing what the evidence reveals.',
      "We spend 30 minutes discussing what's controllable.",
      'You decide if the full analysis ($2.5K) makes sense.',
    ],
    closingLine: 'Most business owners book within 48 hours.',
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
  ctaHref: 'https://calendly.com/bcdda/30min',
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
