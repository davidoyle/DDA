import { Lock } from 'lucide-react';

interface FeatureLockProps {
  title: string;
  message: string;
  onUpgrade?: () => void;
}

export function FeatureLock({ title, message, onUpgrade }: FeatureLockProps) {
  return (
    <div className="card border border-[#D4A03A]/40 bg-[#D4A03A]/5">
      <div className="flex items-start gap-3">
        <Lock className="h-5 w-5 text-[#D4A03A] mt-0.5" />
        <div>
          <p className="font-semibold text-[#F3EFE6]">{title}</p>
          <p className="text-sm text-[#F3EFE6]/75 mt-1">{message}</p>
          {onUpgrade && (
            <button className="btn-primary mt-3" onClick={onUpgrade}>
              Upgrade to unlock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
