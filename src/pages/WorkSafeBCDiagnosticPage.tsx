import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IntentPrompt, { type IntentValue } from '@/components/IntentPrompt';
import CTAPanel from '@/components/CTAPanel';
import HeroStats from '@/components/worksafebc/HeroStats';
import ScenarioSelector from '@/components/worksafebc/ScenarioSelector';
import SectorExposureCharts from '@/components/worksafebc/SectorExposureCharts';
import TwoModeCalculator from '@/components/worksafebc/TwoModeCalculator';
import { heroStats, industryRows, scenarios } from '@/lib/worksafebc/data';
import { getDriftLine, getScenarioChartData, getScenarioTimeline, getSelectedIndustry, getSharedOutput } from '@/lib/worksafebc/engine';
import type { Mode, ScenarioId } from '@/lib/worksafebc/types';
import { useDiagnosticSession } from '@/hooks/useDiagnosticSession';
import { appendSnapshot, bucketSpend } from '@/lib/session';
import { deriveSegment, type SegmentSignals } from '@/lib/segment';

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
  const [signals, setSignals] = useState<SegmentSignals>({
    viewed_advocacy: false,
    viewed_risk_flags: false,
    risk_flags_dwell_s: 0,
    clicked_consultation: false,
  });

  const location = useLocation();
  const { intent, intentReady, setIntentAndTrack, fireEvent, maybeTrackReturnRun } = useDiagnosticSession('wcb');
  const startTimeRef = useRef<number | null>(null);
  const toggleTimers = useRef<Record<string, number>>({});
  const toggleValuesRef = useRef<Record<string, string>>({});
  const riskRef = useRef<HTMLElement>(null);
  const advocacyRef = useRef<HTMLElement>(null);
  const toggleCountRef = useRef(0);

  useEffect(() => {
    if (!intentReady) return;
    const sourceRoute = location.state && typeof location.state === 'object' && 'from' in location.state
      ? String((location.state as { from?: string }).from ?? 'direct')
      : 'direct';
    fireEvent('diag_start', { source_route: sourceRoute });
    maybeTrackReturnRun();
    startTimeRef.current = Date.now();
  }, [fireEvent, intentReady, location.state, maybeTrackReturnRun]);

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

  const completionCost = scenarioTimeline[scenarioTimeline.length - 1]?.cumulative ?? sharedOutput.baseExposure;
  const segment = useMemo(() => deriveSegment(intent, signals), [intent, signals]);

  const queueToggle = useCallback((toggleId: string, toggleValue: string | number) => {
    if (toggleTimers.current[toggleId]) {
      window.clearTimeout(toggleTimers.current[toggleId]);
    }
    toggleTimers.current[toggleId] = window.setTimeout(() => {
      toggleCountRef.current += 1;
      fireEvent('toggle_used', { toggle_id: toggleId, toggle_value: String(toggleValue) });
    }, 500);
  }, [fireEvent]);

  const trackToggleChange = useCallback((toggleId: string, toggleValue: string | number) => {
    if (!intentReady) return;

    const nextValue = String(toggleValue);
    if (!(toggleId in toggleValuesRef.current)) {
      toggleValuesRef.current[toggleId] = nextValue;
      return;
    }

    if (toggleValuesRef.current[toggleId] === nextValue) return;

    toggleValuesRef.current[toggleId] = nextValue;
    queueToggle(toggleId, nextValue);
  }, [intentReady, queueToggle]);

  useEffect(() => {
    trackToggleChange('scenario', activeScenario);
  }, [activeScenario, trackToggleChange]);

  useEffect(() => {
    trackToggleChange('mode', mode);
  }, [mode, trackToggleChange]);

  useEffect(() => {
    trackToggleChange('cost_sensitivity', costSensitivity);
  }, [costSensitivity, trackToggleChange]);

  useEffect(() => {
    trackToggleChange('injury_frequency', injuryFrequency);
  }, [injuryFrequency, trackToggleChange]);

  useEffect(() => {
    trackToggleChange('medical_inflation', medicalInflation);
  }, [medicalInflation, trackToggleChange]);

  useEffect(() => {
    trackToggleChange('safety_improvement', safetyImprovement);
  }, [safetyImprovement, trackToggleChange]);

  useEffect(() => {
    if (!intentReady) return;
    fireEvent('dashboard_prompt_shown');

    const configs: Array<{
      ref: { current: HTMLElement | null }
      eventName: 'risk_flags_viewed' | 'advocacy_viewed'
      payload?: Record<string, number>
    }> = [
      { ref: riskRef, eventName: 'risk_flags_viewed', payload: { flags_count: 5 } },
      { ref: advocacyRef, eventName: 'advocacy_viewed' },
    ];

    const cleanupFns = configs.map(({ ref, eventName, payload = {} }) => {
      const el = ref.current;
      if (!el) return () => {};

      let enteredAt = 0;
      let fired = false;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            enteredAt = Date.now();
            return;
          }
          if (!enteredAt || fired) return;
          const dwell = Math.max(1, Math.round((Date.now() - enteredAt) / 1000));
          fired = true;
          fireEvent(eventName, {
            ...payload,
            dwell_time_s: dwell,
          });
          if (eventName === 'risk_flags_viewed') {
            setSignals((prev) => ({ ...prev, viewed_risk_flags: true, risk_flags_dwell_s: dwell }));
          }
          if (eventName === 'advocacy_viewed') {
            setSignals((prev) => ({ ...prev, viewed_advocacy: true }));
          }
        });
      }, { threshold: 0.35 });

      observer.observe(el);
      return () => observer.disconnect();
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, [fireEvent, intentReady]);

  function handleRunComplete() {
    const completionTime = startTimeRef.current ? Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000)) : 0;
    const spendBucket = bucketSpend(completionCost);
    fireEvent('diag_complete', {
      completion_time_s: completionTime,
      scenario_count: toggleCountRef.current,
      spend_bucket: spendBucket,
    });

    appendSnapshot('wcb', {
      timestamp: new Date().toISOString(),
      sector: selectedIndustry.name,
      firmSize: mode,
      headlineCost: completionCost,
      totalSpendBucket: spendBucket,
      scenario: activeScenario,
      results: {
        sharedOutput,
        scenarioTimeline,
        driftLine,
      },
    });
  }

  return (
    <div className="pt-20 pb-20">
      <section className="px-6 lg:px-[8vw] py-5 bg-[#A63A2C] text-[#F3EFE6]">
        <p className="font-mono text-xs uppercase tracking-[0.12em]">Rate Normalization Exposure · Executive Assessment · Confidential</p>
      </section>

      <section className="px-6 lg:px-[8vw] pt-12 pb-14 border-b border-[#F3EFE6]/15">
        <p className="eyebrow">WorkSafeBC Repricing Risk Diagnostic</p>
        <h1 className="headline-lg max-w-4xl">Repricing Risk Calculator</h1>
        <p className="text-[#F3EFE6]/80 text-lg max-w-3xl mt-5">
          Current rates are still priced below system cost, with the gap bridged by surplus and return performance. The core planning risk is investment dependency, not whether normalization eventually appears.
        </p>

        <HeroStats stats={heroStats} />
      </section>

      {!intentReady ? (
        <IntentPrompt onSelect={(value: IntentValue) => setIntentAndTrack(value)} />
      ) : (
        <>
          <section className="px-6 lg:px-[8vw] py-14 space-y-6 border-b border-[#F3EFE6]/10">
            <p className="eyebrow">Mechanism</p>
            <h2 className="headline-md">How the Investment Dependency Works</h2>
            <div className="grid lg:grid-cols-3 gap-5">
              {[
                ['$1.55', 'Published base rate charged to employers.'],
                ['$1.83', "Published system cost rate from WorkSafeBC's 2026 rate announcement."],
                ['$570M', 'Annual system-wide gap funded through surplus/returns when charging $1.55 vs. $1.83.'],
              ].map(([value, label]) => (
                <article key={value} className="card">
                  <h3 className="font-heading text-3xl mt-1">{value}</h3>
                  <p className="text-[#F3EFE6]/75 mt-2">{label}</p>
                </article>
              ))}
            </div>
            <p className="text-[#F3EFE6]/85 max-w-4xl">
              The funded ratio is 140.8% versus a 130% policy floor, leaving a finite buffer. At the stated investment objective, only about 22% of the annual suppression gap is covered by objective outperformance; the remainder implies continued drawdown or higher returns. Repricing can begin before the 130% floor if trajectory risk rises.
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
            <button className="btn-primary" onClick={handleRunComplete}>Save this scenario</button>
          </section>

          <section ref={riskRef} className="px-6 lg:px-[8vw] py-14">
            <p className="eyebrow">Data Limitations</p>
            <h2 className="headline-md">What remains undisclosed in employer-facing documents</h2>
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
                    ['Return required to sustain $1.55', 'Employers cannot plan rate durability without the annual return assumption that keeps reserves from eroding'],
                    ['Objective coverage share of the annual gap', 'Published objective performance appears to cover only a minority of the suppression gap, changing planning timelines'],
                    ['Per-rate-group funded percentages', 'System average funded ratio can mask group-level pressure and uneven repricing risk'],
                    ['Board trigger for repricing action', 'Without a published trigger, employers cannot model when adjustment decisions are likely to start'],
                    ['Sensitivity to objective underperformance', 'A normal down-cycle year can materially compress runway, but no public sensitivity table is provided'],
                  ].map(([left, right]) => (
                    <tr key={left} className="border-b border-[#F3EFE6]/10">
                      <td className="py-3">{left}</td>
                      <td className="py-3">{right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <section ref={advocacyRef} className="mt-8 card space-y-4">
              <h3 className="font-heading text-2xl">Advocacy priorities</h3>
              <ul className="space-y-2 list-disc list-inside text-[#F3EFE6]/85">
                <li>Model repricing pathways quarterly and socialize assumptions with operations and finance teams.</li>
                <li>Document sector-specific cost trends to support policy submissions before repricing pressure peaks.</li>
                <li>Coordinate with peers on shared exposure narratives when engaging government stakeholders.</li>
              </ul>
              <Link
                to="/contact"
                className="btn-secondary"
                onClick={() => fireEvent('advocacy_cta_click', { cta_id: 'wcb_advocacy_contact' })}
              >
                Discuss sector advocacy strategy
              </Link>
            </section>

            <article className="card print:hidden mt-8">
              <h3 className="font-heading text-2xl mb-3">See your combined regulatory exposure</h3>
              <p className="text-[#F3EFE6]/75 mb-4">Combine your latest WCB and PST snapshots in one view.</p>
              <Link
                to="/dashboard"
                className="btn-primary"
                onClick={() => fireEvent('dashboard_prompt_accepted')}
              >
                Open dashboard
              </Link>
            </article>

            <div className="mt-8">
              <CTAPanel
                segment={segment}
                onConsultationClick={() => {
                  setSignals((prev) => ({ ...prev, clicked_consultation: true }));
                  fireEvent('consultation_click', { source_panel: 'wcb_segment_cta' });
                }}
              />
            </div>

            <p className="text-sm text-[#F3EFE6]/75 mt-6">
              Your inputs are used to benchmark this diagnostic against similar firms in your sector. No identifying information is stored or shared.
            </p>
            <p className="text-sm text-[#F3EFE6]/75 mt-2">
              This tool provides scenario modelling based on published data and should be used as decision support, not legal, actuarial, or tax advice.
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default WorkSafeBCDiagnosticPage;
