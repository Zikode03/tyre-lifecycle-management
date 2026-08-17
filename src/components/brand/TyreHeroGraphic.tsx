/**
 * Bespoke tyre illustration used on the authentication experience.
 *
 * This is intentionally built from SVG/CSS rather than a stock image so the
 * login screen has a recognisable visual language unique to TyreTrack Pro.
 */
export function TyreHeroGraphic() {
  return (
    <div className="relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center" aria-hidden="true">
      <style>{`
        .tyre-roll-in {
          transform-box: fill-box;
          transform-origin: center;
          animation: tyreRollIn 1.45s cubic-bezier(.22,.86,.3,1) both;
        }
        .tyre-ground-shadow {
          transform-box: fill-box;
          transform-origin: center;
          animation: tyreShadowIn 1.45s cubic-bezier(.22,.86,.3,1) both;
        }
        .tyre-data-card-left {
          animation: tyreCardIn .48s ease-out 1.05s both;
        }
        .tyre-data-card-right {
          animation: tyreCardIn .48s ease-out 1.18s both;
        }
        @keyframes tyreRollIn {
          0% { transform: translateX(180px) rotate(235deg); opacity: 0; }
          58% { transform: translateX(-14px) rotate(-18deg); opacity: 1; }
          76% { transform: translateX(7px) rotate(7deg); }
          90% { transform: translateX(-3px) rotate(-3deg); }
          100% { transform: translateX(0) rotate(0deg); opacity: 1; }
        }
        @keyframes tyreShadowIn {
          0% { transform: translateX(150px) scaleX(.58); opacity: 0; }
          60% { transform: translateX(-8px) scaleX(1.05); opacity: .28; }
          100% { transform: translateX(0) scaleX(1); opacity: .34; }
        }
        @keyframes tyreCardIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tyre-roll-in,
          .tyre-ground-shadow,
          .tyre-data-card-left,
          .tyre-data-card-right {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="absolute left-[13%] top-[24%] h-2 w-2 rounded-full bg-brand-orange shadow-[0_0_20px_rgba(249,115,22,0.95)]" />
      <div className="absolute right-[16%] top-[18%] h-1.5 w-1.5 rounded-full bg-orange-300/70" />
      <div className="absolute bottom-[24%] right-[12%] h-2.5 w-2.5 rounded-full bg-brand-orange/80 shadow-[0_0_22px_rgba(249,115,22,0.65)]" />

      <svg viewBox="0 0 560 420" className="relative z-10 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hero-rubber" x1="118" y1="58" x2="430" y2="358" gradientUnits="userSpaceOnUse">
            <stop stopColor="#52525B" />
            <stop offset="0.42" stopColor="#27272A" />
            <stop offset="1" stopColor="#09090B" />
          </linearGradient>
          <linearGradient id="hero-sidewall" x1="170" y1="80" x2="376" y2="346" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3F3F46" />
            <stop offset="1" stopColor="#18181B" />
          </linearGradient>
          <radialGradient id="hero-hub" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(280 210) rotate(90) scale(96)">
            <stop stopColor="#3F3F46" />
            <stop offset="1" stopColor="#18181B" />
          </radialGradient>
          <filter id="tyre-shadow" x="74" y="43" width="412" height="350" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="26" stdDeviation="20" floodColor="#000000" floodOpacity="0.48" />
          </filter>
        </defs>

        <ellipse className="tyre-ground-shadow" cx="280" cy="347" rx="154" ry="24" fill="#000" opacity="0.34" />

        <g className="tyre-roll-in">
          <g filter="url(#tyre-shadow)" transform="rotate(-10 280 210)">
            <ellipse cx="280" cy="210" rx="151" ry="151" fill="url(#hero-rubber)" />
            <ellipse cx="280" cy="210" rx="116" ry="116" fill="#101012" />
            <ellipse cx="280" cy="210" rx="94" ry="94" fill="url(#hero-hub)" stroke="#52525B" strokeWidth="2" />
            <ellipse cx="280" cy="210" rx="66" ry="66" fill="#202124" stroke="#71717A" strokeWidth="1.5" />
            <ellipse cx="280" cy="210" rx="31" ry="31" fill="#111113" stroke="#F97316" strokeWidth="2" />
            <circle cx="280" cy="210" r="11" fill="#F97316" />

            {[0, 72, 144, 216, 288].map((rotation) => (
              <g key={rotation} transform={`rotate(${rotation} 280 210)`}>
                <path d="M271 148L280 178L289 148L284 191L276 191L271 148Z" fill="#A1A1AA" opacity="0.92" />
                <circle cx="280" cy="176" r="4" fill="#27272A" stroke="#D4D4D8" strokeWidth="1" />
              </g>
            ))}

            <path d="M174 119c24-37 63-60 107-60 41 0 79 20 103 53" fill="none" stroke="#F97316" strokeWidth="7" strokeLinecap="round" />
            <circle cx="385" cy="113" r="6" fill="#F97316" />

            {Array.from({ length: 18 }).map((_, index) => {
              const rotation = index * 20;
              return (
                <g key={rotation} transform={`rotate(${rotation} 280 210)`}>
                  <path d="M269 58L278 88L271 110" fill="none" stroke="#71717A" strokeWidth="5" strokeLinecap="round" />
                  <path d="M291 58L282 88L289 110" fill="none" stroke="#3F3F46" strokeWidth="5" strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        </g>

        <g className="tyre-data-card-left" transform="translate(34 85)">
          <rect width="146" height="58" rx="16" fill="#27272A" stroke="#3F3F46" />
          <circle cx="27" cy="29" r="11" fill="#F97316" fillOpacity="0.16" />
          <path d="M22 29h10M27 24v10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          <text x="48" y="25" fill="#FAFAFA" fontSize="12" fontWeight="700">Tread health</text>
          <text x="48" y="42" fill="#A1A1AA" fontSize="10">6.2 mm verified</text>
        </g>

        <g className="tyre-data-card-right" transform="translate(372 268)">
          <rect width="158" height="62" rx="16" fill="#27272A" stroke="#3F3F46" />
          <circle cx="29" cy="31" r="12" fill="#F97316" fillOpacity="0.16" />
          <path d="M24 31h10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          <text x="51" y="27" fill="#FAFAFA" fontSize="12" fontWeight="700">Next rotation</text>
          <text x="51" y="45" fill="#A1A1AA" fontSize="10">1,850 km remaining</text>
        </g>
      </svg>
    </div>
  );
}
