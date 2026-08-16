import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { TyreTrackLogo } from '../brand/TyreTrackLogo';

type LoginSuccessModalProps = {
  open: boolean;
  onContinue: () => void;
};

/**
 * Short confirmation step shown after a successful sign in.
 * It gives the authentication flow a premium transition without delaying users
 * with an unnecessary animation or full-page loading screen.
 */
export function LoginSuccessModal({ open, onContinue }: LoginSuccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 backdrop-blur-md">
      <div className="login-modal-enter relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#202124] text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/[0.035] blur-2xl" />

        <div className="relative p-7 sm:p-8">
          <TyreTrackLogo light />

          <div className="relative mx-auto my-7 flex h-40 w-40 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand-orange/10 blur-2xl" />
            <svg viewBox="0 0 180 180" className="relative h-full w-full tyre-login-spin" aria-hidden="true">
              <defs>
                <linearGradient id="modal-rubber" x1="35" y1="25" x2="145" y2="155">
                  <stop stopColor="#52525B" />
                  <stop offset="1" stopColor="#111113" />
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r="66" fill="url(#modal-rubber)" />
              <circle cx="90" cy="90" r="45" fill="#18181B" stroke="#52525B" strokeWidth="2" />
              <circle cx="90" cy="90" r="25" fill="#27272A" stroke="#F97316" strokeWidth="2" />
              <circle cx="90" cy="90" r="8" fill="#F97316" />
              {Array.from({ length: 12 }).map((_, index) => (
                <path
                  key={index}
                  d="M84 25L90 42L96 25"
                  fill="none"
                  stroke="#71717A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${index * 30} 90 90)`}
                />
              ))}
            </svg>
            <div className="absolute -right-1 top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#202124] bg-green-500 text-white shadow-lg">
              <CheckCircle2 size={20} strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Authentication complete</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight">Welcome back</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Your secure workshop session is ready. Continue to your tyre lifecycle dashboard.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300">
            <ShieldCheck size={15} className="text-brand-orange" />
            Secure session verified
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-brand-orange-dark"
          >
            Continue to dashboard
            <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
