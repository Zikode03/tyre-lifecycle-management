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
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDemoStaffSession } from '../auth/demoAuth';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

const summaryItems = [
  { label: 'Active tyres', value: '1,284', note: 'Across 318 vehicles', icon: Gauge, tone: 'bg-zinc-100 text-zinc-700' },
  { label: 'Critical tyres', value: '12', note: '4 need contact today', icon: ShieldAlert, tone: 'bg-red-50 text-red-600' },
  { label: 'Mileage stale', value: '7', note: 'Confidence reduced', icon: TriangleAlert, tone: 'bg-amber-50 text-amber-700' },
  { label: 'Due for attention', value: '67', note: 'Inspection or rotation', icon: RotateCcw, tone: 'bg-orange-50 text-brand-orange' },
  { label: "Today's bookings", value: '18', note: '6 awaiting check-in', icon: CalendarDays, tone: 'bg-blue-50 text-blue-700' },
  { label: 'Customers', value: '842', note: '24 new this month', icon: Users, tone: 'bg-emerald-50 text-emerald-700' },
];

const headlineBefore = 'Keep every tyre ';
const headlineAccent = 'ahead';
const headlineAfter = ' of the next problem.';
const headline = `${headlineBefore}${headlineAccent}${headlineAfter}`;

export default function DashboardPage() {
  const user = getDemoStaffSession();
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

    // A short pause lets the dashboard settle after login before the headline begins.
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
      }, 42);
    }, 280);

    return () => window.clearTimeout(startDelay);
  }, []);

  const beforeText = headlineBefore.slice(0, Math.min(typedCharacters, headlineBefore.length));
  const accentCount = Math.max(0, typedCharacters - headlineBefore.length);
  const accentText = headlineAccent.slice(0, Math.min(accentCount, headlineAccent.length));
  const afterCount = Math.max(0, typedCharacters - headlineBefore.length - headlineAccent.length);
  const afterText = headlineAfter.slice(0, Math.min(afterCount, headlineAfter.length));

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 sm:space-y-6">
      {/* Hero carries context and primary actions only. Operational metrics live below. */}
      <section className="relative isolate min-h-[310px] overflow-hidden rounded-[24px] text-white shadow-[0_18px_45px_rgba(24,24,27,0.10)] sm:min-h-[330px] sm:rounded-[28px]">
        <img
          src="https://unsplash.com/photos/WHPOFFzY9gU/download?force=true&w=1800"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101113]/96 via-[#151618]/78 to-[#111214]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <div className="relative z-10 flex min-h-[310px] items-center px-5 py-7 sm:min-h-[330px] sm:px-7 lg:px-8">
          <div className="max-w-[720px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white ring-1 ring-white/15 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Durban Central
              </span>
              <span className="text-xs font-medium text-zinc-200/85">Monday operations</span>
            </div>

            {/* Invisible copy reserves the final wrapping/height so typing never shifts the hero content. */}
            <h1
              className="relative mt-5 max-w-2xl text-[32px] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:text-[40px] lg:text-[44px]"
              aria-label={headline}
            >
              <span className="invisible" aria-hidden="true">
                {headlineBefore}<span>{headlineAccent}</span>{headlineAfter}
              </span>
              <span className="absolute inset-0" aria-hidden="true">
                {beforeText}<span className="text-brand-orange">{accentText}</span>{afterText}
                {!typingComplete && (
                  <span className="ml-1 inline-block h-[0.86em] w-[2px] animate-pulse bg-white/90 align-[-0.08em]" />
                )}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-200/90">
              Welcome back, {user?.name ?? 'Manager'}. Focus today on replacement risk, overdue inspections and stale mileage.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/tyres" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-3.5 text-sm font-bold text-white shadow-md transition hover:bg-brand-orange-dark">
                <Plus size={15} /> Register tyre
              </Link>
              <Link to="/lifecycle" className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/12 px-3.5 text-sm font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/18">
                Tyre Health Centre <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Six balanced dashboard metrics: 3 columns x 2 rows on desktop. */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex min-h-[104px] items-center gap-4 rounded-[18px] bg-white px-4 py-4 ring-1 ring-black/[0.045] sm:px-5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.tone}`}>
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-zinc-600">{item.label}</p>
                  <p className="text-2xl font-extrabold tracking-[-0.035em] text-brand-ink">{item.value}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-zinc-400">{item.note}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
        <section className="min-w-0 overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.045]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-400">Priority queue</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.015em] text-brand-ink">Tyres requiring attention</h2>
            </div>
            <Link to="/lifecycle" className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold text-zinc-500 transition hover:text-brand-orange sm:flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-black/[0.045]">
            {priorityTyres.map((tyre) => (
              <Link
                to={`/tyres/${tyre.id}`}
                key={tyre.id}
                className="grid gap-3 px-4 py-3.5 transition hover:bg-[#FAF9F6] sm:px-5 md:grid-cols-[minmax(0,1.35fr)_minmax(130px,0.8fr)_90px_auto] md:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F1F0EC] text-zinc-600"><Gauge size={15} /></div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-brand-ink">{tyre.brand} {tyre.model}</p>
                    <p className="mt-0.5 truncate text-xs text-zinc-400">{tyre.reference} · {tyre.position}</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-zinc-400">Vehicle</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-zinc-700">{tyre.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-400">Tread</p>
                  <p className="mt-0.5 text-sm font-bold text-brand-ink">{tyre.tread.toFixed(1)} mm</p>
                </div>
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <StatusBadge status={tyre.status} />
                  <ArrowRight size={14} className="text-zinc-300" />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/lifecycle" className="flex items-center justify-center gap-1.5 border-t border-black/[0.045] px-4 py-3 text-xs font-semibold text-brand-orange sm:hidden">
            Open Tyre Health Centre <ArrowRight size={14} />
          </Link>
        </section>

        <section className="min-w-0 rounded-[22px] bg-white p-4 ring-1 ring-black/[0.045] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-zinc-400">Live branch feed</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.015em] text-brand-ink">Recent activity</h2>
            </div>
            <Activity size={17} className="shrink-0 text-zinc-300" />
          </div>

          <div className="mt-4 divide-y divide-black/[0.045]">
            {recentActivity.slice(0, 5).map((item) => (
              <div key={item.title} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.type === 'critical' ? 'bg-red-50 text-red-600' : item.type === 'reminder' ? 'bg-amber-50 text-amber-700' : item.type === 'customer' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-brand-orange'}`}>
                  {item.type === 'customer' ? <Users size={14} /> : item.type === 'critical' ? <ShieldAlert size={14} /> : item.type === 'reminder' ? <CalendarDays size={14} /> : <CircleCheck size={14} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold leading-5 text-zinc-800">{item.title}</p>
                    <span className="shrink-0 whitespace-nowrap text-xs text-zinc-400">{item.time}</span>
                  </div>
                  <p className="mt-1 truncate text-xs leading-5 text-zinc-400">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
