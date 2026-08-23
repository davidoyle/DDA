import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { PlanTier } from '@/lib/licensing';

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChoosePlan: (plan: PlanTier) => void;
}

export function UpgradeModal({ open, onOpenChange, onChoosePlan }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock licensed features</DialogTitle>
          <DialogDescription>
            Enable exports, benchmarking, saved scenarios, and executive rollups.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <button className="btn-secondary" onClick={() => onChoosePlan('pro')}>Switch to Pro (demo)</button>
          <button className="btn-secondary" onClick={() => onChoosePlan('enterprise')}>Switch to Enterprise (demo)</button>
          <button className="btn-secondary" onClick={() => onChoosePlan('free')}>Stay on Free</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
