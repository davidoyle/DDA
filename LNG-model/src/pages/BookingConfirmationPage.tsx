import { defaultContent, sectorConfig, sectorQuestions, type SectorKey } from '../lib/consultationContent';

type BookingConfirmationPageProps = {
  sector?: SectorKey;
};

const BookingConfirmationPage = ({ sector }: BookingConfirmationPageProps) => {
  const sectorContent = sector ? sectorConfig[sector] : defaultContent;
  const questions = sector ? sectorQuestions[sector] : [
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
          <li>✓ I&apos;ve already started your {sectorContent.label.toLowerCase()} analysis.</li>
          <li>✓ You&apos;ll get a confirmation email with call details and a calendar link.</li>
          <li>✓ Come prepared with questions—I&apos;ll have your numbers ready.</li>
        </ul>

        <div className="pt-2">
          <h2 className="font-heading text-2xl uppercase">In the meantime</h2>
          <p className="text-[#F3EFE6]/70">What others in {sectorContent.label.toLowerCase()} are asking:</p>
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
