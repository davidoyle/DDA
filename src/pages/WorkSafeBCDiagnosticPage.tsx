import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroStats from '@/components/worksafebc/HeroStats';
import ScenarioSelector from '@/components/worksafebc/ScenarioSelector';
import SectorExposureCharts from '@/components/worksafebc/SectorExposureCharts';
import TwoModeCalculator from '@/components/worksafebc/TwoModeCalculator';
import { heroStats, industryRows, scenarios } from '@/lib/worksafebc/data';
import { getDriftLine, getScenarioChartData, getScenarioTimeline, getSelectedIndustry, getSharedOutput } from '@/lib/worksafebc/engine';
import type { Mode, ScenarioId } from '@/lib/worksafebc/types';

const WorkSafeBCDiagnosticPage = () => {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>('C');
  const [mode, setMode] = useState<Mode>('proxy');

  const [selectedIndustryName, setSelectedIndustryName] = useState('General Construction');
  const [proxyPayroll, setProxyPayroll] = useState(5_000_000);
  const [costSensitivity, setCostSensitivity] = useState(0);

  const [ownPayroll, setOwnPayroll] = useState(5_000_000);
  const [currentEffectiveRate, setCurrentEffectiveRate] = useState(2.3);
  const [averageWage, setAverageWage] = useState(72_000);
  const [injuryFrequency, setInjuryFrequency] = useState(3.2);
  const [avgCostPerClaim, setAvgCostPerClaim] = useState(23_000);
  const [medicalInflation, setMedicalInflation] = useState(0);
  const [safetyImprovement, setSafetyImprovement] = useState(0);

  const selectedIndustry = useMemo(
    () => getSelectedIndustry(industryRows, selectedIndustryName),
    [selectedIndustryName],
  );

  const scenario = scenarios[activeScenario];

  const scenarioChartData = useMemo(() => getScenarioChartData(scenario), [scenario]);

  const sharedOutput = useMemo(
    () =>
      getSharedOutput({
        mode,
        selectedIndustry,
        costSensitivity,
        proxyPayroll,
        ownPayroll,
        currentEffectiveRate,
        averageWage,
        injuryFrequency,
        avgCostPerClaim,
        medicalInflation,
        safetyImprovement,
      }),
    [
      avgCostPerClaim,
      averageWage,
      costSensitivity,
      currentEffectiveRate,
      injuryFrequency,
      medicalInflation,
      mode,
      ownPayroll,
      proxyPayroll,
      safetyImprovement,
      selectedIndustry,
    ],
  );

  const scenarioTimeline = useMemo(
    () => getScenarioTimeline(scenario, sharedOutput),
    [scenario, sharedOutput],
  );

  const driftLine = useMemo(
    () =>
      getDriftLine({
        mode,
        avgCostPerClaim,
        medicalInflation,
        injuryFrequency,
        safetyImprovement,
        ownPayroll,
        averageWage,
      }),
    [avgCostPerClaim, averageWage, injuryFrequency, medicalInflation, mode, ownPayroll, safetyImprovement],
  );

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-5 bg-[#A63A2C] text-[#F3EFE6]">
        <p className="font-mono text-xs uppercase tracking-[0.12em]">Rate Normalization Exposure · Executive Assessment · Confidential</p>
      </section>

      <section className="px-6 lg:px-[8vw] pt-12 pb-14 border-b border-[#F3EFE6]/15">
        <p className="eyebrow">WorkSafeBC Repricing Risk Diagnostic</p>
        <h1 className="headline-lg max-w-4xl">Repricing Risk Calculator</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-5">
          Current rates are policy-smoothed below actuarial cost. When surplus deployment declines, repricing is mathematically unavoidable.
        </p>

        <HeroStats stats={heroStats} />
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Mechanism</p>
        <h2 className="headline-md">How Surplus Suppression Works</h2>
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            ['$1.55', 'System average base rate. Stable for 9 consecutive years, 2018–2026.'],
            ['$1.83', "System claim cost rate. Stated in WorkSafeBC's 2026 premium announcement."],
            ['$0.28', 'Gap per $100 payroll. 15% below cost. Funded by deploying ~$570M surplus annually.'],
          ].map(([value, label]) => (
            <article key={value} className="card">
              <h3 className="font-heading text-3xl mt-1">{value}</h3>
              <p className="text-[#F3EFE6]/75 mt-2">{label}</p>
            </article>
          ))}
        </div>
        <p className="text-[#F3EFE6]/85 max-w-4xl">
          Surplus currently stands at 141% of liabilities. The target floor is 130%, leaving an 11-percentage-point buffer before repricing becomes mandatory.
        </p>
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Scenarios</p>
        <h2 className="headline-md">Four Paths to Rate Normalization</h2>

        <ScenarioSelector
          scenarios={scenarios}
          activeScenario={activeScenario}
          setActiveScenario={setActiveScenario}
          scenario={scenario}
          scenarioChartData={scenarioChartData}
        />
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-8 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Industry Exposure</p>
        <h2 className="headline-md">System-wide Repricing Exposure by Sector</h2>

        <SectorExposureCharts industryRows={industryRows} />
      </section>

      <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
        <p className="eyebrow">Employer Tool</p>
        <h2 className="headline-md">Two-Mode Repricing Exposure Tool</h2>

        <TwoModeCalculator
          mode={mode}
          setMode={setMode}
          industryRows={industryRows}
          selectedIndustryName={selectedIndustryName}
          setSelectedIndustryName={setSelectedIndustryName}
          proxyPayroll={proxyPayroll}
          setProxyPayroll={setProxyPayroll}
          costSensitivity={costSensitivity}
          setCostSensitivity={setCostSensitivity}
          ownInputs={[
            { label: 'Annual assessable payroll ($)', value: ownPayroll, setter: setOwnPayroll },
            { label: 'Current effective WSBC rate', value: currentEffectiveRate, setter: setCurrentEffectiveRate },
            { label: 'Average wage per worker ($)', value: averageWage, setter: setAverageWage },
            { label: 'Injury frequency: claims per 100 workers', value: injuryFrequency, setter: setInjuryFrequency },
            { label: 'Average cost per claim ($)', value: avgCostPerClaim, setter: setAvgCostPerClaim },
            { label: 'Projected medical inflation rate (%)', value: medicalInflation, setter: setMedicalInflation },
            { label: 'Projected safety improvement rate (%)', value: safetyImprovement, setter: setSafetyImprovement },
          ]}
          sharedOutput={sharedOutput}
          activeScenario={activeScenario}
          setActiveScenario={setActiveScenario}
          scenarioTimeline={scenarioTimeline}
          driftLine={driftLine}
        />
      </section>

      <section className="px-6 lg:px-[8vw] py-14">
        <p className="eyebrow">Data Limitations</p>
        <h2 className="headline-md">What remains opaque in the public data</h2>
        <div className="overflow-x-auto card mt-5">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-[#F3EFE6]/25 text-[#D4A03A] font-mono uppercase tracking-[0.08em] text-xs">
                <th className="text-left py-3">What&apos;s Opaque</th>
                <th className="text-left py-3">Why It Matters</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Per-rate-group funded percentages', 'System is 141% overall; unknown if all groups are equally funded'],
                ['Per-industry claim costs', 'Cannot verify which sectors are truly low-cost vs. surplus-suppressed'],
                ['Experience rating distribution', 'Individual firms deviate widely from sector averages'],
                ['Surplus deployment policy', 'No published triggers for when or how rates increase'],
                ['Cost rate historical trend', 'Unknown whether $1.83 is stable or rising'],
              ].map(([left, right]) => (
                <tr key={left} className="border-b border-[#F3EFE6]/10">
                  <td className="py-3">{left}</td>
                  <td className="py-3">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Link to="/contact" className="btn-primary">Book an Exposure Review</Link>
        </div>
      </section>
    </div>
  );
};

export default WorkSafeBCDiagnosticPage;
