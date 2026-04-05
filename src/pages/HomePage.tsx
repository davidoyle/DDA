import { Link } from 'react-router-dom';

const frames = [
  {
    title: 'You need numbers that survive scrutiny',
    body: 'Municipal planning, public sector strategy, council presentations. Growth models, scenario analysis, fiscal impact.',
    href: '/public-sector',
    cta: 'Public sector',
  },
  {
    title: 'You need to understand what a system is actually doing',
    body: 'Institutional accountability, policy analysis, investigative research. Pattern identification across public records.',
    href: '/analysis',
    cta: 'Analysis',
  },
  {
    title: 'You need evidence that can go into a legal or regulatory proceeding',
    body: 'Litigation support, structured synthesis, comparative institutional analysis.',
    href: '/contact?context=Litigation%20or%20regulatory%20proceeding',
    cta: 'Describe your situation',
  },
];

const proofPoints = [
  {
    sentence:
      'Public safety system analysis identified a three-month detection lag and accountability breakdown between enforcement activity and intergovernmental coordination.',
  },
  {
    sentence:
      'Education system review quantified attrition replacement pressure above $85M annually and mapped a targeted intervention path tied to measurable staffing outcomes.',
  },
  {
    sentence:
      'Procurement pathway analysis isolated repeat approval-gate bottlenecks and quantified avoidable emergency spend driven by process drift.',
  },
];

const HomePage = () => {
  return (
    <div className="pt-28 pb-20 px-6 lg:px-[8vw] space-y-14">
      <section className="max-w-5xl space-y-6">
        <h1 className="headline-lg max-w-4xl">When the numbers have to hold up.</h1>
        <p className="text-xl text-[#F3EFE6]/85 max-w-4xl">
          DDA produces evidence-led analysis for institutions, legal teams, and public agencies where the stakes of a
          wrong answer are documented.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/analysis" className="btn-primary">
            See the work
          </Link>
          <Link to="/contact" className="btn-secondary">
            Describe your situation
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {frames.map((frame) => (
          <article key={frame.title} className="card space-y-4 border border-[#F3EFE6]/15">
            <h2 className="headline-sm">{frame.title}</h2>
            <p className="text-[#F3EFE6]/82">{frame.body}</p>
            <Link to={frame.href} className="btn-secondary inline-flex w-fit">
              {frame.cta} →
            </Link>
          </article>
        ))}
      </section>


      <section className="card space-y-4 max-w-5xl">
        <h2 className="headline-sm">Diagnostics</h2>
        <p className="text-[#F3EFE6]/82">
          Nine diagnostic tools for operators, HR, and risk functions. Built from the same public-evidence method.
          Self-serve.
        </p>
        <Link to="/diagnostics" className="btn-secondary inline-flex w-fit">
          Open diagnostics →
        </Link>
      </section>

      <section className="card space-y-5 max-w-5xl">
        <h2 className="headline-sm">What this work has already surfaced</h2>
        <ul className="space-y-3">
          {proofPoints.map((point) => (
            <li key={point.sentence} className="text-[#F3EFE6]/82">
              {point.sentence}{' '}
              <Link to="/analysis" className="text-[#D4A03A] hover:text-[#e8bc66] transition-colors">
                See full analysis
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
