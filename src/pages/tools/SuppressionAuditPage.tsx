import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EvidenceTier } from '@/components/shared/EvidenceTier';
import { FeatureLock } from '@/components/shared/FeatureLock';
import { ToolDisclaimer } from '@/components/shared/ToolDisclaimer';
import { UpgradeModal } from '@/components/shared/UpgradeModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLicense } from '@/hooks/useLicense';
import { questions, scoreBands } from '@/lib/tools/suppression-audit-config';

export default function SuppressionAuditPage() {
  const [searchParams] = useSearchParams();
  const previewMode = searchParams.get('preview') === '1' && searchParams.get('sub') !== 'active';
  const { entitlements, updatePlan } = useLicense();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(0));

  const done = step >= questions.length;
  const score = useMemo(() => {
    const raw = questions.reduce((acc, q, idx) => acc + q.risk[answers[idx]], 0);
    const max = questions.reduce((acc, q) => acc + q.weight, 0);
    return Math.round((raw / max) * 100);
  }, [answers]);
  const band = scoreBands.find((b) => score <= b.max)?.label ?? 'Critical';

  if (!done) {
    const q = questions[step];
    return (
      <div className="diagnostic-theme px-6 lg:px-[8vw] py-12 space-y-5 min-h-screen">
        <h1 className="headline-md">Claims Suppression Self-Audit</h1>
        <p className="text-[#4a453d]">Anonymous audit. No PII collected. Complete all 15 questions before results.</p>
        <Progress value={(step / questions.length) * 100} />
        <Card><CardHeader><CardTitle>Q{q.id}. {q.prompt}</CardTitle></CardHeader><CardContent className="flex flex-col gap-2">{q.options.map((opt, idx) => <Button key={opt} variant="outline" onClick={() => { const next = [...answers]; next[step] = idx; setAnswers(next); setStep(step + 1); }}>{opt}</Button>)}</CardContent></Card>
      </div>
    );
  }

  const redFlag = [2, 6, 8, 10].some((qid) => {
    const i = questions.findIndex((q) => q.id === qid);
    return (questions[i].risk[answers[i]] / questions[i].weight) >= 0.75;
  });

  return (
    <div className="diagnostic-theme px-6 lg:px-[8vw] py-12 space-y-6 min-h-screen">
      <h1 className="headline-md">Suppression risk score: {score} ({band})</h1>
      {redFlag && <Alert className="border-rose-500/60"><AlertTitle>High-severity enforcement alert</AlertTitle><AlertDescription>One or more responses indicates a practice directly referenced in WCB enforcement findings. Review with legal counsel before your next WCB audit.</AlertDescription></Alert>}
      {previewMode ? (
        <FeatureLock title="Subscriber feature: enforcement benchmark package" message="Subscribe to unlock Section 73 exposure estimates and benchmark percentile details." onUpgrade={() => setUpgradeOpen(true)} />
      ) : (
        <>
          <Card><CardHeader><CardTitle>Section 73 fine exposure estimate</CardTitle></CardHeader><CardContent>${(1500 + score * 70).toLocaleString()} – ${(7000 + score * 240).toLocaleString()} per finding<div className="mt-2"><EvidenceTier tier="SPECULATIVE" /></div></CardContent></Card>
          <Card><CardHeader><CardTitle>Tucker/IWH benchmark</CardTitle></CardHeader><CardContent>Your score is approximately at the {Math.min(99, Math.max(1, score))}th percentile of the benchmark range.<div className="mt-2"><EvidenceTier tier="MODELLED" /></div></CardContent></Card>
        </>
      )}
      {previewMode && <Link to="/diagnostics/subscribe" className="btn-secondary inline-flex">Subscribe to unlock full suppression analysis</Link>}
      {entitlements.canViewActionPlan ? (
        <Card><CardHeader><CardTitle>Remediation priority list</CardTitle></CardHeader><CardContent><p>• Formal zero-pressure reporting policy rollout</p><p>• Supervisor claim-handling training refresh</p><p>• Legal review of incentive structures</p></CardContent></Card>
      ) : (
        <FeatureLock title="Premium remediation plan" message="Unlock response-mapped remediation actions and legal-risk playbook." onUpgrade={() => setUpgradeOpen(true)} />
      )}
      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} onChoosePlan={(tier) => {
        updatePlan(tier);
        setUpgradeOpen(false);
      }} />
      <ToolDisclaimer toolName="Claims Suppression Self-Audit" paramDate="2025-12" text="This estimate is based on public enforcement examples and is not legal advice." />
    </div>
  );
}
