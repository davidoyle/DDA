import { useSearchParams } from 'react-router-dom';
import { defaultContent, sectorConfig } from './ServicesPage';

type SectorKey = keyof typeof sectorConfig;

const sectorQuestions: Record<SectorKey, string[]> = {
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

const BookingConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const sectorParam = searchParams.get('sector') as SectorKey | null;
  const sector = sectorParam && sectorConfig[sectorParam] ? sectorConfig[sectorParam] : defaultContent;
  const questions = sectorParam && sectorQuestions[sectorParam] ? sectorQuestions[sectorParam] : [
    'What is my highest-priority risk?',
    'How quickly can we act on this?',
    'What outcomes should I expect in 90 days?',
  ];

  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw]">
      <section className="card max-w-4xl space-y-5">
        <h1 className="font-heading text-4xl font-bold uppercase">You&apos;re Booked.</h1>
        <p className="text-[#F3EFE6]/85">Here&apos;s what happens next:</p>
        <ul className="space-y-3 text-[#F3EFE6]/85">
          <li>✓ I&apos;ve already started your {sector.label.toLowerCase()} analysis.</li>
          <li>✓ You&apos;ll get a confirmation email with call details and a calendar link.</li>
          <li>✓ Come prepared with questions—I&apos;ll have your numbers ready.</li>
        </ul>

        <div className="pt-2">
          <h2 className="font-heading text-2xl uppercase">In the meantime</h2>
          <p className="text-[#F3EFE6]/70">What others in {sector.label.toLowerCase()} are asking:</p>
          <ul className="mt-3 space-y-2 text-[#F3EFE6]/85">
            {questions.map((question) => (
              <li key={question}>• {question}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default BookingConfirmationPage;
