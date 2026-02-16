import { Link, useSearchParams } from 'react-router-dom';

type SectorKey =
  | 'municipality'
  | 'union'
  | 'contractor'
  | 'law-firm'
  | 'association'
  | 'journalist'
  | 'small-business';

type SectorContent = {
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

const sectorConfig: Record<SectorKey, SectorContent> = {
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
      'Currently advising 3 BC municipalities on 2027-2029 repricing.',
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
      'Union members currently outperforming non-union by 15% using these methods.',
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
      'Contractors using this analysis have reduced fines by an average of 40%.',
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
      'You\'ll miss precedents that could win cases',
      "Your clients will wonder why it's taking so long",
    ],
    fearWith: [
      "You'll have 48 pages of ready-to-use evidence",
      "You'll cite precedents your opponents missed",
      "You'll win cases faster and bill smarter",
    ],
    credibilityExample:
      'Now supporting 2 constitutional challenges to WCB structure.',
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
      'Association members using this data have increased retention 12%.',
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
      'Methodology has informed coverage in [placeholder outlets].',
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
      'Small businesses using this approach report 22% reduction in compliance costs.',
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

const defaultContent = {
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
    'Forensic institutional analysis tailored to your sector and timeline.',
  painLine: "Based on today's headlines, your sector is exposed.",
  deliverables: [
    'Sector-specific exposure breakdown',
    'Comparative benchmark snapshot',
    'Priority intervention roadmap',
    '30-minute strategy call with next steps',
    'One-page PDF summary with your numbers',
  ],
};

const credibilityPoints = [
  '$1.7B in annual systemic costs',
  '129,786 missing claims',
  'WorkSafeBC Institutional Analysis',
  '6 economic models now cited in constitutional challenge prep',
];

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector') as SectorKey | null;
  const content = sectorParam && sectorConfig[sectorParam] ? sectorConfig[sectorParam] : defaultContent;

  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="space-y-6 max-w-5xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight">
          Your {content.label} {content.focus}
        </h1>
        <p className="text-xl md:text-2xl italic text-[#F3EFE6]/70">{content.heroPain}</p>
        <p className="text-lg">30 minutes. Your numbers. A plan.</p>
      </section>

      <section className="card max-w-5xl">
        <p className="font-semibold tracking-[0.12em] text-sm uppercase text-[#D4A03A]">Pain Timeline</p>
        <div className="mt-5 grid grid-cols-4 gap-2 text-center text-sm md:text-base">
          <span>2026</span>
          <span>2027</span>
          <span>2028</span>
          <span>2029</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[#D4A03A] text-xl">●────●────●────●</div>
        <div className="mt-2 grid grid-cols-4 gap-2 text-center text-sm text-[#F3EFE6]/75">
          <span>Now</span>
          <span>Hike</span>
          <span>Peak</span>
          <span>Normal</span>
        </div>
        <p className="mt-5 text-[#F3EFE6]/85">
          Your exposure starts now. Most organizations won&apos;t see it until it&apos;s too late.
        </p>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">What You&apos;ll See In 30 Minutes</h2>
        <ul className="space-y-2">
          {content.valueBullets.map((item) => (
            <li key={item} className="text-[#F3EFE6]/85">
              ✓ {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 md:grid-cols-2 max-w-5xl">
        <article className="card border border-red-400/40 bg-red-950/20">
          <h3 className="font-heading text-xl uppercase text-red-300">Without This Analysis</h3>
          <ul className="mt-4 space-y-2 text-[#F3EFE6]/85">
            {content.fearWithout.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
        <article className="card border border-emerald-300/40 bg-emerald-950/20">
          <h3 className="font-heading text-xl uppercase text-emerald-200">With It</h3>
          <ul className="mt-4 space-y-2 text-[#F3EFE6]/85">
            {content.fearWith.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="card max-w-5xl space-y-4">
        <h2 className="headline-md">The Same Methodology Used For</h2>
        <ul className="space-y-2 text-[#F3EFE6]/85">
          {credibilityPoints.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
        <p className="text-[#D4A03A]">{content.credibilityExample}</p>
        <p className="text-[#F3EFE6]/60 text-sm">Featured in: [placeholder]</p>
      </section>

      <section className="max-w-5xl">
        <p className="text-xl md:text-2xl italic text-[#F3EFE6]/75">{content.painLine}</p>
      </section>

      <section className="card max-w-5xl space-y-4">
        <p className="font-heading text-4xl font-bold">$500 CAD</p>
        <p className="text-[#F3EFE6]/75">(One payment. No subscriptions.)</p>
        <p className="text-[#F3EFE6]/85">Only 10 consultations available this month.</p>
        <a
          href="https://calendly.com/username/30-minute-exposure-analysis"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-[#D4A03A] px-6 py-3 font-semibold text-[#0B1110] hover:bg-[#e3b14f] transition-colors"
        >
          BOOK YOUR 30-MINUTE CALL
        </a>
        <p className="text-sm text-[#F3EFE6]/65">Most weeks book within 48 hours of email send.</p>
        <Link
          to={`/booking-confirmation${sectorParam ? `?sector=${sectorParam}` : ''}`}
          className="inline-block text-sm underline text-[#D4A03A]"
        >
          Preview post-booking page
        </Link>
      </section>

      <section className="space-y-4 max-w-5xl">
        <h2 className="headline-md">What You&apos;ll Get</h2>
        <ul className="space-y-2 text-[#F3EFE6]/85">
          {content.deliverables.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>

        <div className="rounded-xl border border-[#F3EFE6]/20 bg-[#F3EFE6]/5 p-5 h-28 md:h-[120px] relative overflow-hidden">
          <p className="font-semibold tracking-[0.08em] text-xs uppercase text-[#F3EFE6]/70">Sample - Confidential</p>
          <div className="mt-3 space-y-2 blur-[1px]">
            <div className="h-2 bg-[#F3EFE6]/20 rounded" />
            <div className="h-2 bg-[#F3EFE6]/25 rounded w-10/12" />
            <div className="h-2 bg-[#F3EFE6]/15 rounded w-8/12" />
            <div className="h-2 bg-[#F3EFE6]/20 rounded w-11/12" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
export { sectorConfig, defaultContent };
