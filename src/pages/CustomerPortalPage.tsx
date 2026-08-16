import { ArrowRight, Car, Gauge, LogOut, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TyreTrackLogo } from '../components/brand/TyreTrackLogo';

/**
 * Lightweight customer-only portal used for the frontend prototype.
 * This route intentionally does not use the staff AppShell or staff navigation.
 */
export default function CustomerPortalPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-canvas">
      <header className="border-b border-brand-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <TyreTrackLogo />
          <button
            onClick={() => navigate('/customer-access', { replace: true })}
            className="flex items-center gap-2 rounded-xl border border-brand-line px-3 py-2 text-sm font-semibold text-brand-muted hover:bg-zinc-50 hover:text-brand-ink"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Customer tyre portal</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-brand-ink">My vehicle & tyres</h1>
            <p className="mt-2 text-sm text-brand-muted">Welcome, Thando Mkhize. Your latest workshop tyre records appear below.</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            Profile verified by Durban Central
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-brand-line bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-graphite text-white"><Car size={25} /></div>
              <div>
                <p className="text-lg font-bold text-brand-ink">2021 Toyota Corolla</p>
                <p className="mt-1 text-sm text-brand-muted">ND 452-871 • Current mileage 68,240 km</p>
              </div>
            </div>
            <button onClick={() => navigate('/tyres/TT-2048')} className="flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark">
              View full tyre passport <ArrowRight size={16} />
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Front left', '6.2 mm', 'Good'],
            ['Front right', '6.0 mm', 'Good'],
            ['Rear left', '4.1 mm', 'Monitor'],
            ['Rear right', '4.3 mm', 'Monitor'],
          ].map(([position, tread, status]) => (
            <div key={position} className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-orange-50 p-2.5 text-brand-orange"><Gauge size={19} /></div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${status === 'Good' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{status}</span>
              </div>
              <p className="mt-5 text-sm font-semibold text-brand-muted">{position}</p>
              <p className="mt-1 text-2xl font-black text-brand-ink">{tread}</p>
              <p className="mt-1 text-xs text-brand-muted">Latest tread depth</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-5">
          <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-orange" />
          <p className="text-sm leading-6 text-brand-muted">Your rear tyres are being monitored. The system will remind you when your next inspection or service action is due.</p>
        </div>
      </main>
    </div>
  );
}
