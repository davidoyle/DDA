import { Link } from 'react-router-dom';

interface DdaLogoProps {
  className?: string;
  compact?: boolean;
  linkToHome?: boolean;
}

const DdaLogoMark = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 170 180"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="85" cy="18" r="18" fill="currentColor" />
    <rect x="78" y="44" width="14" height="120" fill="currentColor" />
    <path d="M10 58L72 82V112L10 88V58Z" fill="currentColor" />
    <path d="M10 100L72 124V154L10 130V100Z" fill="currentColor" />
    <path d="M10 142L72 166V178L10 154V142Z" fill="currentColor" />
    <path d="M98 82L160 58V88L98 112V82Z" fill="currentColor" />
    <path d="M98 124L160 100V130L98 154V124Z" fill="currentColor" />
    <path d="M98 166L160 142V154L98 178V166Z" fill="currentColor" />
  </svg>
);

const DdaLogo = ({ className = '', compact = false, linkToHome = false }: DdaLogoProps) => {
  const content = (
    <div className={`inline-flex items-end gap-3 text-[#F3EFE6] ${className}`}>
      <DdaLogoMark className={compact ? 'h-10 w-10 flex-none' : 'h-14 w-14 flex-none'} />
      <div className="space-y-1">
        <div className="flex items-end gap-2">
          <span className={`${compact ? 'text-2xl' : 'text-4xl'} font-heading font-black leading-none tracking-[-0.04em]`}>
            DDA.
          </span>
        </div>
        {!compact ? (
          <>
            <div className="h-[2px] w-full bg-[#7382B6]" />
            <p className="text-sm leading-none text-[#A8B3D8] sm:text-base">public-evidence systems analysis</p>
          </>
        ) : (
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#A8B3D8]">public-evidence systems analysis</p>
        )}
      </div>
    </div>
  );

  if (!linkToHome) return content;

  return (
    <Link to="/" className="inline-flex" aria-label="DDA home">
      {content}
    </Link>
  );
};

export default DdaLogo;
