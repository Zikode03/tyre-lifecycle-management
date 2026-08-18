import { useState } from 'react';
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react';
import { TyreHeroGraphic } from '../brand/TyreHeroGraphic';
import { TyreTrackLogo } from '../brand/TyreTrackLogo';

type LoginSuccessModalProps = {
  open: boolean;
  onContinue: () => void;
};

export function LoginSuccessModal({ open, onContinue }: LoginSuccessModalProps) {
  const [popiaAcknowledged, setPopiaAcknowledged] = useState(() => localStorage.getItem('tyretrack.popia.acknowledged') === 'true');
  const [showPrivacyDetail, setShowPrivacyDetail] = useState(false);

  if (!open) return null;

  const continueToDashboard = () => {
    if (!popiaAcknowledged) return;
    localStorage.setItem('tyretrack.popia.acknowledged', 'true');
    onContinue();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-5 backdrop-blur-md">
      <div className="login-modal-enter relative max-h-[95vh] w-full max-w-md overflow-y-auto rounded-[28px] border border-white/10 bg-[#202124] text-white shadow-[0_28px_90px_rgba(0,0,0,0.5)]">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/[0.035] blur-2xl" />

        <div className="relative p-6 sm:p-7">
          <TyreTrackLogo light />

          <div className="relative mx-auto mt-4 w-[220px]">
            <TyreHeroGraphic compact showCards={false} animate={false} />
            <div className="absolute right-3 top-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-[#202124] bg-green-500 text-white shadow-lg shadow-green-950/30">
              <CheckCircle2 size={21} strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Authentication complete</p>
            <h3 className="mt-2 text-2xl font-black tracking-tight">Welcome back</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-400">
              Your secure workshop session is ready. Continue to your tyre lifecycle dashboard.
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-zinc-300">
            <ShieldCheck size={15} className="text-brand-orange" />
            Secure session verified
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-brand-orange">
                <LockKeyhole size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-white">POPIA privacy acknowledgement</p>
                <p className="mt-1 text-[11px] leading-5 text-zinc-400">
                  TyreTrack processes account, customer, vehicle and service information only for authorised operational, security and tyre-service purposes.
                </p>
                <button type="button" onClick={() => setShowPrivacyDetail(value => !value)} className="mt-2 text-[11px] font-bold text-brand-orange hover:text-orange-300">
                  {showPrivacyDetail ? 'Hide privacy details' : 'What does this mean?'}
                </button>
                {showPrivacyDetail && (
                  <p className="mt-2 rounded-xl bg-white/[0.035] p-3 text-[11px] leading-5 text-zinc-400">
                    Personal information should be handled for a defined purpose, kept appropriately protected and accessed only by authorised users. Production deployment should link this acknowledgement to the organisation's full Privacy Notice and data-subject request process.
                  </p>
                )}
              </div>
            </div>

            <label className="mt-3 flex cursor-pointer items-start gap-2.5 border-t border-white/[0.07] pt-3 text-[11px] leading-5 text-zinc-300">
              <input
                type="checkbox"
                checked={popiaAcknowledged}
                onChange={event => setPopiaAcknowledged(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500"
              />
              <span>I acknowledge the privacy notice and understand that my authorised use of TyreTrack involves processing personal information in line with POPIA.</span>
            </label>
          </div>

          <button
            type="button"
            disabled={!popiaAcknowledged}
            onClick={continueToDashboard}
            className="group mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
          >
            Continue to dashboard
            <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
