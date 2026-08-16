type TyreTrackLogoProps = {
  compact?: boolean;
  light?: boolean;
  className?: string;
};

/**
 * Primary TyreTrack Pro brand mark.
 *
 * The symbol is drawn with SVG instead of a stock tyre image so the platform
 * keeps a distinctive identity and the logo stays crisp on every screen size.
 */
export function TyreTrackLogo({ compact = false, light = false, className = '' }: TyreTrackLogoProps) {
  const primaryText = light ? '#FFFFFF' : '#18181B';
  const secondaryText = light ? '#A1A1AA' : '#6B7280';

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="TyreTrack Pro">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-orange" x1="9" y1="7" x2="39" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDBA74" />
            <stop offset="0.48" stopColor="#F97316" />
            <stop offset="1" stopColor="#EA580C" />
          </linearGradient>
          <linearGradient id="logo-rubber" x1="10" y1="5" x2="35" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#52525B" />
            <stop offset="1" stopColor="#18181B" />
          </linearGradient>
        </defs>

        <path
          d="M24 3.5C13.2 3.5 5 12.25 5 24s8.2 20.5 19 20.5c6.3 0 11.85-2.98 15.33-7.62-3.02 2.36-6.72 3.73-10.7 3.73-9.28 0-16.63-7.32-16.63-16.61S19.35 7.39 28.63 7.39c3.98 0 7.68 1.37 10.7 3.73C35.85 6.48 30.3 3.5 24 3.5Z"
          fill="url(#logo-rubber)"
        />
        <path
          d="M29.05 6.9C37.1 9.15 43 16.48 43 25.16c0 7.22-4.08 13.5-10.07 16.64 3.73-4.03 5.95-9.42 5.95-15.35 0-8.35-4.37-15.66-10.93-19.58l1.1.03Z"
          fill="url(#logo-orange)"
        />

        {[
          [10.4, 13.1, 17.8, 15.5],
          [7.8, 18.1, 15.8, 19.8],
          [7, 23.4, 15.1, 24.1],
          [7.8, 28.9, 15.8, 27.3],
          [10.4, 33.9, 17.8, 31.6],
        ].map(([x1, y1, x2, y2]) => (
          <path key={`${x1}-${y1}`} d={`M${x1} ${y1}L${x2} ${y2}`} stroke="#71717A" strokeWidth="2.1" strokeLinecap="round" />
        ))}

        <circle cx="25" cy="24" r="8.2" fill="#202124" stroke="#F97316" strokeWidth="1.7" />
        <circle cx="25" cy="24" r="3.2" fill="#F97316" />
      </svg>

      {!compact && (
        <div className="leading-none">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[17px] font-black tracking-[-0.03em]" style={{ color: primaryText }}>
              TyreTrack
            </span>
            <span className="text-[17px] font-black tracking-[-0.03em] text-brand-orange">Pro</span>
          </div>
          <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: secondaryText }}>
            Lifecycle Management
          </p>
        </div>
      )}
    </div>
  );
}
