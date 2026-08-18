import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Gauge,
  Plus,
  RotateCcw,
  ShieldAlert,
  TriangleAlert,
  Truck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

const summaryItems = [
  { label: 'Active tyres', value: '1,284', note: 'Across 318 vehicles', icon: Gauge },
  { label: 'Critical tyres', value: '12', note: '4 need contact today', icon: ShieldAlert },
  { label: 'Mileage stale', value: '7', note: 'Confidence reduced', icon: TriangleAlert },
  { label: 'Due for attention', value: '67', note: 'Inspection or rotation', icon: RotateCcw },
];

const headlineBefore = 'Keep every tyre ';
const headlineAccent = 'ahead';
const headlineAfter = ' of the next problem.';
const headline = `${headlineBefore}${headlineAccent}${headlineAfter}`;

const bookings = [
  { time: '08:30', day: 'Today', title: 'Tyre inspection', meta: 'ND 452-981 · Thando Mkhize' },
  { time: '09:15', day: 'Today', title: 'Rotation & balancing', meta: 'ND 812-774 · Lerato Molefe' },
  { time: '10:30', day: 'Today', title: 'Replacement assessment', meta: 'NU 193-442 · Sibusiso Dlamini' },
  { time: '14:00', day: 'Today', title: 'Customer scan review', meta: '4 submissions awaiting review' },
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
    const startDelay = window.setTimeout(() => {
      const typingTimer = window.setInterval(() => {
        setTypedCharacters((current) => {
          const next = Math.min(current + 1, headline.length);
          if (next === headline.length) {
            window.clearInterval(typingTimer);
            setTypingComplete(true);
          }
          return next;
        });
      }, 38);
    }, 220);
    return () => window.clearTimeout(startDelay);
  }, []);

  const beforeText = headlineBefore.slice(0, Math.min(typedCharacters, headlineBefore.length));
  const accentCount = Math.max(0, typedCharacters - headlineBefore.length);
  const accentText = headlineAccent.slice(0, Math.min(accentCount, headlineAccent.length));
  const afterCount = Math.max(0, typedCharacters - headlineBefore.length - headlineAccent.length);
  const afterText = headlineAfter.slice(0, Math.min(afterCount, headlineAfter.length));

  return (
    <div className="mx-auto w-full max-w-[1480px] space-y-4 sm:space-y-5">
      <section className="relative isolate overflow-hidden rounded-[18px] border border-black/[0.05] bg-[#17181A] text-white shadow-[0_18px_50px_rgba(24,24,27,0.10)] sm:rounded-[22px]">
        <img
          src="https://unsplash.com/photos/WHPOFFzY9gU/download?force=true&w=1800"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden h-full w-[46%] object-cover object-center opacity-65 lg:block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17181A] via-[#17181A]/95 to-[#17181A]/38" />
        <div className="absolute inset-y-0 right-[32%] hidden w-40 bg-gradient-to-r from-[#17181A] to-transparent lg:block" />
        <div className="relative z-10 grid min-h-[250px] gap-8 px-5 py-6 sm:px-7 sm:py-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:px-8">
          <div className="max-w-[700px] self-center">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Durban Central</span>
              <span className="text-xs font-medium text-zinc-400">Monday operations</span>
            </div>
            <h1 className="relative mt-4 max-w-2xl text-[30px] font-extrabold leading-[1.05] tracking-[-0.045em] text-white sm:text-[38px] lg:text-[42px]" aria-label={headline}>
              <span className="invisible" aria-hidden="true">{headlineBefore}<span>{headlineAccent}</span>{headlineAfter}</span>
              <span className="absolute inset-0" aria-hidden="true">{beforeText}<span className="text-brand-orange">{accentText}</span>{afterText}{!typingComplete && <span className="ml-1 inline-block h-[0.86em] w-[2px] animate-pulse bg-white/90 align-[-0.08em]" />}</span>
            </h1>
            <p className="mt-3 max-w-[600px] text-sm leading-6 text-zinc-400">Focus on tyre risk, overdue inspections and vehicles that need intervention before the next service issue.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/tyres/fitment/new" className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-orange px-3.5 text-sm font-bold text-white transition hover:bg-brand-orange-dark"><Plus size={15} /> Register tyre</Link>
              <Link to="/lifecycle" className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/14 bg-white/[0.07] px-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/[0.12]">View tyre health <ArrowRight size={15} /></Link>
            </div>
          </div>

          <div className="hidden grid-cols-3 gap-2 self-end lg:grid">
            <div className="rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-500">Critical</p><p className="mt-1 text-xl font-extrabold text-red-400">12</p></div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-500">Attention</p><p className="mt-1 text-xl font-extrabold text-amber-400">67</p></div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-zinc-500">Active</p><p className="mt-1 text-xl font-extrabold text-emerald-400">1,284</p></div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-[16px] border border-black/[0.055] bg-white px-4 py-3.5 shadow-[0_6px_18px_rgba(24,24,27,0.035)] sm:px-4.5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0"><p className="text-[11px] font-bold uppercase tracking-[0.11em] text-zinc-400">{item.label}</p><p className="mt-2 text-[24px] font-extrabold leading-none tracking-[-0.035em] text-brand-ink">{item.value}</p><p className="mt-2 text-xs text-zinc-400">{item.note}</p></div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-brand-orange"><Icon size={15} /></div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.72fr)]">
        <div className="grid min-w-0 gap-4">
          <section className="overflow-hidden rounded-[18px] border border-black/[0.055] bg-white shadow-[0_6px_18px_rgba(24,24,27,0.03)]">
            <div className="flex items-center justify-between gap-4 border-b border-black/[0.055] px-4 py-3.5 sm:px-5">
              <div className="min-w-0"><h2 className="text-sm font-extrabold tracking-[-0.01em] text-brand-ink">Critical tyre risks</h2><p className="mt-0.5 text-xs text-zinc-400">Ranked by verified tread condition and urgency</p></div>
              <Link to="/lifecycle" className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-brand-orange">View all <ArrowRight size={13} /></Link>
            </div>
            <div className="divide-y divide-black/[0.05]">
              {priorityTyres.map((tyre) => {
                const percentage = Math.max(8, Math.min(100, (tyre.tread / 8) * 100));
                return (
                  <Link to={`/tyres/${tyre.id}`} key={tyre.id} className="block px-4 py-3.5 transition hover:bg-[#FAF9F6] sm:px-5">
                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2"><TriangleAlert size={14} className={tyre.status === 'Critical' ? 'text-red-500' : 'text-amber-500'} /><p className="truncate text-sm font-extrabold text-brand-ink">{tyre.vehicle}</p></div>
                        <p className="mt-1 truncate text-xs text-zinc-400">{tyre.brand} {tyre.model} · {tyre.position}</p>
                      </div>
                      <StatusBadge status={tyre.status} />
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px] sm:items-center">
                      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className={`h-full rounded-full ${tyre.status === 'Critical' ? 'bg-red-500' : 'bg-amber-400'}`} style={{ width: `${percentage}%` }} /></div>
                      <div className="flex justify-between gap-4 text-[11px] font-semibold text-zinc-400"><span>Tread <strong className="text-zinc-700">{tyre.tread.toFixed(1)} mm</strong></span><span>{tyre.reference}</span></div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="overflow-hidden rounded-[18px] border border-black/[0.055] bg-white shadow-[0_6px_18px_rgba(24,24,27,0.03)]">
            <div className="flex items-center justify-between gap-4 border-b border-black/[0.055] px-4 py-3.5 sm:px-5">
              <div><h2 className="text-sm font-extrabold text-brand-ink">Vehicles needing attention</h2><p className="mt-0.5 text-xs text-zinc-400">Current vehicles carrying tyre risk</p></div>
              <Link to="/vehicles" className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange">Fleet view <ArrowRight size={13} /></Link>
            </div>
            <div className="grid gap-px bg-black/[0.05] sm:grid-cols-2">
              {priorityTyres.slice(0, 4).map((tyre) => (
                <Link to={`/tyres/${tyre.id}`} key={`vehicle-${tyre.id}`} className="bg-white p-4 transition hover:bg-[#FAF9F6]">
                  <div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500"><Truck size={16} /></span><div className="min-w-0"><p className="truncate text-sm font-extrabold text-brand-ink">{tyre.vehicle}</p><p className="mt-0.5 truncate text-xs text-zinc-400">{tyre.brand} {tyre.model}</p></div></div><span className={`text-xs font-bold ${tyre.status === 'Critical' ? 'text-red-600' : 'text-amber-700'}`}>{tyre.status}</span></div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100"><div className={`h-full rounded-full ${tyre.status === 'Critical' ? 'bg-red-500' : 'bg-amber-400'}`} style={{ width: `${Math.max(12, Math.min(100, (tyre.tread / 8) * 100))}%` }} /></div>
                  <p className="mt-2 text-[11px] font-medium text-zinc-400">{tyre.position} · {tyre.tread.toFixed(1)} mm tread</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="grid min-w-0 content-start gap-4">
          <section className="overflow-hidden rounded-[18px] border border-black/[0.055] bg-white shadow-[0_6px_18px_rgba(24,24,27,0.03)]">
            <div className="flex items-center justify-between border-b border-black/[0.055] px-4 py-3.5"><div><h2 className="text-sm font-extrabold text-brand-ink">Inspections & bookings</h2><p className="mt-0.5 text-xs text-zinc-400">Today at Durban Central</p></div><CalendarDays size={16} className="text-zinc-400" /></div>
            <div className="divide-y divide-black/[0.05]">{bookings.map((booking) => <Link to="/bookings" key={`${booking.time}-${booking.title}`} className="grid grid-cols-[58px_minmax(0,1fr)] gap-3 px-4 py-3 transition hover:bg-[#FAF9F6]"><div className="border-r border-black/[0.055] pr-3"><p className="text-sm font-extrabold text-brand-ink">{booking.time}</p><p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-400">{booking.day}</p></div><div className="min-w-0"><p className="truncate text-sm font-semibold text-zinc-800">{booking.title}</p><p className="mt-0.5 truncate text-xs text-zinc-400">{booking.meta}</p></div></Link>)}</div>
          </section>

          <section className="overflow-hidden rounded-[18px] border border-black/[0.055] bg-white shadow-[0_6px_18px_rgba(24,24,27,0.03)]">
            <div className="flex items-center justify-between border-b border-black/[0.055] px-4 py-3.5"><div><h2 className="text-sm font-extrabold text-brand-ink">Recent activity</h2><p className="mt-0.5 text-xs text-zinc-400">Live operational feed</p></div><Activity size={16} className="text-zinc-400" /></div>
            <div className="px-4 py-3">
              {recentActivity.slice(0, 5).map((item, index) => (
                <div key={item.title} className="grid grid-cols-[12px_minmax(0,1fr)] gap-3">
                  <div className="flex flex-col items-center"><span className={`mt-1.5 h-2 w-2 rounded-full ${item.type === 'critical' ? 'bg-red-500' : item.type === 'reminder' ? 'bg-amber-400' : item.type === 'customer' ? 'bg-emerald-500' : 'bg-brand-orange'}`} />{index < Math.min(4, recentActivity.length - 1) && <span className="mt-1 w-px flex-1 bg-zinc-200" />}</div>
                  <div className="pb-4"><p className="text-xs font-semibold leading-5 text-zinc-700">{item.title}</p><p className="mt-0.5 text-[11px] text-zinc-400">{item.meta} · {item.time}</p></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
