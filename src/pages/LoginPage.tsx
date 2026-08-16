import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Gauge, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock authentication for the frontend prototype. Replace with the real auth API later.
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-canvas lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-brand-graphite p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/[0.025]" />
        <div className="absolute -bottom-40 left-20 h-[430px] w-[430px] rounded-full border-[70px] border-brand-orange/[0.07]" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange font-black shadow-xl shadow-black/20">TT</div>
          <div>
            <p className="font-bold tracking-wide">TyreTrack Pro</p>
            <p className="text-xs text-zinc-400">Digital Tyre Lifecycle Platform</p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
            <ShieldCheck size={14} className="text-brand-orange" />
            Safer tyres. Smarter service.
          </div>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight">
            Track every tyre from <span className="text-brand-orange">fitment</span> to replacement.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
            One professional workspace for tyre passports, inspections, mileage, tread health, service reminders and customer retention.
          </p>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              ['Lifecycle', 'Full tyre history'],
              ['Safety', 'Tread & inspections'],
              ['Retention', 'Smart reminders'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                <p className="text-sm font-semibold">{title}</p>
                <p className="mt-1 text-[11px] leading-4 text-zinc-500">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-zinc-600">© 2026 TyreTrack Pro. Secure tyre lifecycle management.</p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-10 lg:min-h-0">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange font-black text-white">TT</div>
            <div><p className="font-bold">TyreTrack Pro</p><p className="text-xs text-brand-muted">Lifecycle Management</p></div>
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Secure workspace</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-ink">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-brand-muted">Sign in to manage customers, vehicles, tyres and workshop activity.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-ink">Email address</label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input id="email" type="email" defaultValue="manager@tyretrack.co.za" required className="h-12 w-full rounded-xl border border-brand-line bg-white pl-11 pr-4 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-brand-ink">Password</label>
                <button type="button" className="text-xs font-semibold text-brand-orange hover:text-brand-orange-dark">Forgot password?</button>
              </div>
              <div className="relative">
                <LockKeyhole size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input id="password" type={showPassword ? 'text' : 'password'} defaultValue="Password123!" required className="h-12 w-full rounded-xl border border-brand-line bg-white pl-11 pr-11 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-ink" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-brand-muted">
              <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-brand-orange" />
              Remember me on this device
            </label>

            <button type="submit" className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-brand-orange-dark">
              Sign in
              <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="my-8 flex items-center gap-3"><div className="h-px flex-1 bg-brand-line"/><span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Customer access</span><div className="h-px flex-1 bg-brand-line"/></div>

          <button onClick={() => navigate('/customer-access')} className="flex w-full items-center justify-between rounded-2xl border border-brand-line bg-brand-canvas p-4 text-left transition hover:border-orange-200 hover:bg-orange-50/40">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2.5 text-brand-orange shadow-sm"><Gauge size={19}/></div>
              <div><p className="text-sm font-semibold text-brand-ink">View my tyres</p><p className="mt-0.5 text-xs text-brand-muted">Access your tyre passport using your mobile number</p></div>
            </div>
            <ArrowRight size={17} className="text-zinc-400" />
          </button>

          <p className="mt-8 text-center text-xs text-brand-muted">Need help? <button className="font-semibold text-brand-ink hover:text-brand-orange">Contact support</button></p>
        </div>
      </section>
    </div>
  );
}
