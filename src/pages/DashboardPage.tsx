import { useEffect, useState } from 'react';
import { Activity, ArrowRight, CalendarDays, Gauge, Plus, ShieldAlert, TriangleAlert, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

const headlineBefore = 'Keep every tyre ';
const headlineAccent = 'ahead';
const headlineAfter = ' of the next problem.';
const headline = `${headlineBefore}${headlineAccent}${headlineAfter}`;

const summaryItems = [
  { label: 'Active tyres', value: '1,284', note: 'Across 318 vehicles', icon: Gauge, card: 'from-[#202124] to-[#2B2C2F] text-white border-white/5', labelTone: 'text-zinc-400', noteTone: 'text-zinc-400', iconTone: 'bg-white/10 text-brand-orange ring-white/10', accent: 'bg-brand-orange' },
  { label: 'Critical tyres', value: '12', note: '4 require action today', icon: ShieldAlert, card: 'from-[#FFF8F7] to-[#FFFDFD] text-brand-ink border-red-100', labelTone: 'text-red-500', noteTone: 'text-red-400', iconTone: 'bg-red-50 text-red-600 ring-red-100', accent: 'bg-red-500' },
  { label: 'Due for attention', value: '67', note: 'Inspection or rotation', icon: TriangleAlert, card: 'from-[#FFF9EE] to-[#FFFDFC] text-brand-ink border-amber-100', labelTone: 'text-amber-700', noteTone: 'text-amber-600/70', iconTone: 'bg-amber-50 text-amber-700 ring-amber-100', accent: 'bg-amber-400' },
  { label: "Today's bookings", value: '18', note: '6 awaiting check-in', icon: CalendarDays, card: 'from-[#FFF5ED] to-white text-brand-ink border-orange-100', labelTone: 'text-brand-orange', noteTone: 'text-zinc-400', iconTone: 'bg-orange-100 text-brand-orange ring-orange-200/70', accent: 'bg-brand-orange' },
];

const bookings = [
  { time: '08:30', title: 'Tyre inspection', meta: 'ND 452-981 · Thando Mkhize' },
  { time: '09:15', title: 'Rotation & balancing', meta: 'ND 812-774 · Lerato Molefe' },
  { time: '10:30', title: 'Replacement assessment', meta: 'NU 193-442 · Sibusiso Dlamini' },
];

export default function DashboardPage() {
  const priorityTyres = tyres.filter((tyre) => tyre.status !== 'Good').slice(0, 4);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setTypedCharacters(headline.length);
      setTypingComplete(true);
      return;
    }
    const delay = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        setTypedCharacters((current) => {
          const next = Math.min(current + 1, headline.length);
          if (next === headline.length) {
            window.clearInterval(timer);
            setTypingComplete(true);
          }
          return next;
        });
      }, 42);
    }, 250);
    return () => window.clearTimeout(delay);
  }, []);

  const beforeText = headlineBefore.slice(0, Math.min(typedCharacters, headlineBefore.length));
  const accentCount = Math.max(0, typedCharacters - headlineBefore.length);
  const accentText = headlineAccent.slice(0, Math.min(accentCount, headlineAccent.length));
  const afterCount = Math.max(0, typedCharacters - headlineBefore.length - headlineAccent.length);
  const afterText = headlineAfter.slice(0, Math.min(afterCount, headlineAfter.length));

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-5">
      <section className="relative isolate overflow-hidden rounded-[28px] bg-[#1D1E20] text-white shadow-[0_18px_55px_rgba(24,24,27,0.10)]">
        <img
          src="https://unsplash.com/photos/WHPOFFzY9gU/download?force=true&w=1800"
          alt="Tyres in a workshop"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141517]/95 via-[#17181A]/80 to-[#17181A]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

        <div className="relative z-10 grid min-h-[330px] gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end lg:px-10">
          <div className="max-w-[760px] self-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-100 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Durban Central
            </div>

            <h1 className="relative mt-5 max-w-3xl text-[34px] font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-[44px] lg:text-[50px]" aria-label={headline}>
              <span className="invisible" aria-hidden="true">{headlineBefore}<span>{headlineAccent}</span>{headlineAfter}</span>
              <span className="absolute inset-0" aria-hidden="true">
                {beforeText}<span className="text-brand-orange">{accentText}</span>{afterText}
                {!typingComplete && <span className="ml-1 inline-block h-[0.86em] w-[2px] animate-pulse bg-white/90 align-[-0.08em]" />}
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tyres/fitment/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-brand-orange-dark">
                <Plus size={16} /> Register tyre
              </Link>
              <Link to="/lifecycle" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15">
                Tyre Health Centre <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="hidden rounded-[22px] border border-white/10 bg-black/30 p-5 backdrop-blur-md lg:block">
            <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-zinc-400">Today at a glance</p>
            <div className="mt-4 grid grid-cols-3 divide-x divide-white/10">
              <div className="pr-4"><p className="text-2xl font-extrabold text-red-400">12</p><p className="mt-1 text-xs text-zinc-400">Critical</p></div>
              <div className="px-4"><p className="text-2xl font-extrabold text-amber-400">67</p><p className="mt-1 text-xs text-zinc-400">Attention</p></div>
              <div className="pl-4"><p className="text-2xl font-extrabold text-emerald-400">18</p><p className="mt-1 text-xs text-zinc-400">Bookings</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`group relative overflow-hidden rounded-[20px] border bg-gradient-to-br px-5 py-4 shadow-[0_8px_24px_rgba(24,24,27,0.055)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(24,24,27,0.09)] ${item.card}`}>
              <span className={`absolute inset-x-0 top-0 h-[3px] ${item.accent}`} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-[11px] font-extrabold uppercase tracking-[0.11em] ${item.labelTone}`}>{item.label}</p>
                  <p className="mt-2 text-[30px] font-extrabold leading-none tracking-[-0.04em]">{item.value}</p>
                  <p className={`mt-2 text-xs font-medium ${item.noteTone}`}>{item.note}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-[13px] ring-1 transition group-hover:scale-105 ${item.iconTone}`}><Icon size={18} strokeWidth={2.1} /></div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
        <section className="overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.045]">
          <div className="flex items-center justify-between border-b border-black/[0.05] px-5 py-4">
            <div>
              <p className="text-xs font-semibold text-brand-orange">Priority queue</p>
              <h2 className="mt-1 text-lg font-extrabold text-brand-ink">Tyres requiring attention</h2>
            </div>
            <Link to="/lifecycle" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange">View all <ArrowRight size={14} /></Link>
          </div>

          <div className="divide-y divide-black/[0.05]">
            {priorityTyres.map((tyre) => (
              <Link key={tyre.id} to={`/tyres/${tyre.id}`} className="grid gap-3 px-5 py-4 transition hover:bg-[#FFF8F2] md:grid-cols-[minmax(0,1.4fr)_160px_110px_150px] md:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange ring-1 ring-orange-100"><Gauge size={16} /></div>
                  <div className="min-w-0"><p className="truncate text-sm font-extrabold text-brand-ink">{tyre.brand} {tyre.model}</p><p className="mt-1 truncate text-xs text-zinc-400">{tyre.reference} · {tyre.position}</p></div>
                </div>
                <div><p className="text-xs text-zinc-400">Vehicle</p><p className="mt-1 truncate text-sm font-semibold text-zinc-700">{tyre.vehicle}</p></div>
                <div><p className="text-xs text-zinc-400">Tread</p><p className="mt-1 text-sm font-extrabold text-brand-ink">{tyre.tread.toFixed(1)} mm</p></div>
                <div className="flex items-center justify-between gap-3 md:justify-end"><StatusBadge status={tyre.status} /><ArrowRight size={14} className="text-zinc-300" /></div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid content-start gap-5">
          <section className="overflow-hidden rounded-[24px] border border-orange-100/80 bg-gradient-to-br from-white to-[#FFF8F2] shadow-[0_8px_24px_rgba(234,112,35,0.06)]">
            <div className="flex items-center justify-between border-b border-orange-100/80 px-5 py-4"><div><p className="text-xs font-semibold text-brand-orange">Workshop flow</p><h2 className="mt-1 text-lg font-extrabold text-brand-ink">Today’s bookings</h2></div><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-brand-orange"><CalendarDays size={17} /></div></div>
            <div className="divide-y divide-orange-100/70">{bookings.map((booking) => <Link to="/bookings" key={booking.time} className="grid grid-cols-[62px_minmax(0,1fr)] gap-3 px-5 py-4 transition hover:bg-orange-50/70"><div className="border-r border-orange-100 pr-3"><p className="text-sm font-extrabold text-brand-ink">{booking.time}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-orange">Today</p></div><div className="min-w-0"><p className="truncate text-sm font-semibold text-zinc-800">{booking.title}</p><p className="mt-1 truncate text-xs text-zinc-400">{booking.meta}</p></div></Link>)}</div>
          </section>

          <section className="rounded-[24px] border border-black/[0.05] bg-[#202124] p-5 text-white shadow-[0_12px_30px_rgba(24,24,27,0.10)]">
            <div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-orange-300">Live branch feed</p><h2 className="mt-1 text-lg font-extrabold text-white">Recent activity</h2></div><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.07] text-brand-orange ring-1 ring-white/10"><Activity size={17} /></div></div>
            <div className="mt-4 space-y-4">{recentActivity.slice(0, 4).map((item) => <div key={item.title} className="flex gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${item.type === 'critical' ? 'bg-red-500' : item.type === 'reminder' ? 'bg-amber-400' : item.type === 'customer' ? 'bg-emerald-500' : 'bg-brand-orange'}`} /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold leading-5 text-zinc-100">{item.title}</p><span className="shrink-0 text-[11px] text-zinc-500">{item.time}</span></div><p className="mt-1 text-xs leading-5 text-zinc-500">{item.meta}</p></div></div>)}</div>
          </section>
        </div>
      </div>

      <section className="flex flex-col gap-4 rounded-[22px] border border-orange-100 bg-gradient-to-r from-[#FFF5ED] via-[#FFF9F4] to-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange text-white shadow-sm"><Users size={17} /></div><div><p className="text-sm font-extrabold text-brand-ink">842 active customers</p><p className="mt-1 text-xs text-zinc-500">Customer records, vehicles and tyre history remain connected.</p></div></div>
        <Link to="/customers" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-orange">Open customers <ArrowRight size={15} /></Link>
      </section>
    </div>
  );
}
