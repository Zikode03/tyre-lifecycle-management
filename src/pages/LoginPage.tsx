import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Gauge, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoginSuccessModal } from '../components/auth/LoginSuccessModal';
import { TyreHeroGraphic } from '../components/brand/TyreHeroGraphic';
import { TyreTrackLogo } from '../components/brand/TyreTrackLogo';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend prototype authentication: show the branded success transition first.
    // Replace this with the real authentication API result when the backend is connected.
    setShowSuccess(true);
  };

  return (
    <>
      <div className="min-h-screen bg-brand-canvas lg:grid lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-brand-graphite text-white lg:flex lg:flex-col">
          {/* Layered grid and orange glow create an automotive-tech feel without relying on stock photography. */}
          <div className="login-grid absolute inset-0 opacity-30" />
          <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-orange/[0.08] blur-3xl" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[0.025]" />

          <div className="relative z-10 flex items-center justify-between px-12 pt-10">
            <TyreTrackLogo light />
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-zinc-300 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              Platform online
            </div>
          </div>

          <div className="relative z-10 grid flex-1 grid-cols-[0.92fr_1.08fr] items-center gap-4 px-12 pb-8">
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                <ShieldCheck size={14} className="text-brand-orange" />
                Safer tyres. Smarter service.
              </div>

              <h1 className="text-[44px] font-black leading-[1.05] tracking-[-0.04em] xl:text-5xl">
                Track every tyre from <span className="text-brand-orange">fitment</span> to replacement.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400 xl:text-base">
                A professional tyre lifecycle workspace for mileage, tread health, inspections, service reminders and customer retention.
              </p>
            </div>

            <div className="relative">
              <TyreHeroGraphic />
              <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/20 px-4 py-2 text-[11px] font-medium text-zinc-300 backdrop-blur-lg">
                <Sparkles size={13} className="text-brand-orange" />
                One tyre. One digital history.
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-12 py-5 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
            <span>© 2026 TyreTrack Pro</span>
            <span>Digital tyre lifecycle management</span>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-10 lg:min-h-0">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <TyreTrackLogo />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-ink">Email address</label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    id="email"
                    type="email"
                    defaultValue="manager@tyretrack.co.za"
                    required
                    className="h-12 w-full rounded-xl border border-brand-line bg-white pl-11 pr-4 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-brand-ink">Password</label>
                  <button type="button" className="text-xs font-semibold text-brand-orange hover:text-brand-orange-dark">Forgot password?</button>
                </div>
                <div className="relative">
                  <LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="Password123!"
                    required
                    className="h-12 w-full rounded-xl border border-brand-line bg-white pl-11 pr-11 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-muted">
                <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-brand-orange" />
                Remember me on this device
              </label>

              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-brand-orange-dark hover:shadow-xl hover:shadow-orange-200"
              >
                Sign in
                <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="my-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-brand-line" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Customer access</span>
              <div className="h-px flex-1 bg-brand-line" />
            </div>

            <button
              onClick={() => navigate('/customer-access')}
              className="flex w-full items-center justify-between rounded-2xl border border-brand-line bg-brand-canvas p-4 text-left transition hover:border-orange-200 hover:bg-orange-50/40"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2.5 text-brand-orange shadow-sm"><Gauge size={19} /></div>
                <div>
                  <p className="text-sm font-semibold text-brand-ink">View my tyres</p>
                  <p className="mt-0.5 text-xs text-brand-muted">Access your tyre passport using your mobile number</p>
                </div>
              </div>
              <ArrowRight size={17} className="text-zinc-400" />
            </button>

            <p className="mt-8 text-center text-xs text-brand-muted">
              Need help? <button className="font-semibold text-brand-ink hover:text-brand-orange">Contact support</button>
            </p>
          </div>
        </section>
      </div>

      <LoginSuccessModal open={showSuccess} onContinue={() => navigate('/dashboard')} />
    </>
  );
}
