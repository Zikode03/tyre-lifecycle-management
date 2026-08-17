import {
  Activity,
  ArrowRight,
  CalendarDays,
  CircleCheck,
  Gauge,
  Plus,
  ShieldAlert,
  TrendingDown,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDemoStaffSession } from '../auth/demoAuth';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

const summaryItems = [
  { label: 'Active tyres', value: '1,284', note: '318 vehicles', icon: Gauge, tone: 'text-zinc-700 bg-zinc-100' },
  { label: 'Due for attention', value: '67', note: 'Health actions', icon: TrendingDown, tone: 'text-amber-700 bg-amber-50' },
  { label: "Today's bookings", value: '18', note: '6 awaiting check-in', icon: CalendarDays, tone: 'text-orange-700 bg-orange-50' },
  { label: 'Customers', value: '842', note: '24 new this month', icon: Users, tone: 'text-emerald-700 bg-emerald-50' },
];

export default function DashboardPage() {
  const user = getDemoStaffSession();
  const priorityTyres = tyres.filter((tyre) => tyre.status !== 'Good').slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-5 sm:space-y-6">
      {/* Compact operational hero: enough context to orient the user without dominating the page. */}
      <section className="relative isolate overflow-hidden rounded-[24px] text-white shadow-[0_18px_45px_rgba(24,24,27,0.10)] sm:rounded-[28px]">
        <img
          src="https://unsplash.com/photos/WHPOFFzY9gU/download?force=true&w=1800"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#101113]/95 via-[#151618]/78 to-[#111214]/36" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

        <div className="relative z-10 grid min-h-[360px] gap-6 px-5 py-6 sm:min-h-[380px] sm:px-7 sm:py-7 lg:grid-cols-[1fr_auto] lg:items-end xl:px-8">
          <div className="max-w-[700px] self-start">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white ring-1 ring-white/15 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Durban Central
              </span>
              <span className="text-[11px] font-medium text-zinc-200/80 sm:text-xs">Monday operations</span>
            </div>

            <h1 className="mt-5 max-w-2xl text-[32px] font-extrabold leading-[1.06] tracking-[-0.04em] text-white sm:text-[40px] lg:text-[44px]">
              Keep every tyre <span className="text-brand-orange">ahead</span> of the next problem.
            </h1>
            <p className="mt-3 max-w-xl text-xs leading-6 text-zinc-200/85 sm:text-sm">
              Welcome back, {user?.name ?? 'Manager'}. Focus today on replacement risk, overdue inspections and stale mileage.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/tyres" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-3.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-orange-dark sm:text-sm">
                <Plus size={15} /> Register tyre
              </Link>
              <Link to="/lifecycle" className="inline-flex h-10 items-center gap-2 rounded-xl bg-white/12 px-3.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/18 sm:text-sm">
                Tyre Health Centre <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid w-full gap-2.5 sm:grid-cols-2 lg:w-[340px] lg:grid-cols-1 xl:w-[380px] xl:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.90] px-4 py-3.5 text-[#202124] shadow-lg shadow-black/10 ring-1 ring-white/60 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-zinc-500">Critical tyres</p>
                  <p className="mt-1.5 text-2xl font-extrabold tracking-[-0.035em]">12</p>
                  <p className="mt-1 text-[10px] font-medium text-zinc-500">4 need contact today</p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600"><ShieldAlert size={17} /></div>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.90] px-4 py-3.5 text-[#202124] shadow-lg shadow-black/10 ring-1 ring-white/60 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.13em] text-zinc-500">Mileage stale</p>
                  <p className="mt-1.5 text-2xl font-extrabold tracking-[-0.035em]">7</p>
                  <p className="mt-1 text-[10px] font-medium text-zinc-500">Confidence reduced</p>
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Gauge size={17} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Small summary strip replaces the oversized KPI card grid. */}
      <section className="grid overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.045] sm:grid-cols-2 xl:grid-cols-4">
        {summaryItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={`flex items-center gap-3 px-4 py-4 sm:px-5 ${index > 0 ? 'border-t border-black/[0.045] sm:border-t-0 sm:border-l xl:border-l' : ''} ${index === 2 ? 'sm:border-l-0 sm:border-t xl:border-l xl:border-t-0' : ''}`}>
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.tone}`}><Icon size={16} /></div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-extrabold tracking-[-0.03em] text-brand-ink">{item.value}</p>
                  <p className="truncate text-[10px] font-semibold text-zinc-400">{item.note}</p>
                </div>
                <p className="mt-0.5 text-[11px] font-bold text-zinc-600">{item.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
        <section className="min-w-0 overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.045]">
          <div className="flex items-center justify-between gap-4 border-b border-black/[0.045] px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-400">Priority queue</p>
              </div>
              <h2 className="mt-1.5 truncate text-base font-extrabold tracking-[-0.015em] text-brand-ink sm:text-lg">Tyres requiring attention</h2>
            </div>
            <Link to="/lifecycle" className="hidden shrink-0 items-center gap-1.5 text-[11px] font-bold text-zinc-500 transition hover:text-brand-orange sm:flex">
              View all <ArrowRight size={13} />
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
                    <p className="truncate text-xs font-bold text-brand-ink sm:text-sm">{tyre.brand} {tyre.model}</p>
                    <p className="mt-0.5 truncate text-[10px] text-zinc-400">{tyre.reference} · {tyre.position}</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Vehicle</p>
                  <p className="mt-0.5 truncate text-[11px] font-semibold text-zinc-700">{tyre.vehicle}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Tread</p>
                  <p className="mt-0.5 text-[11px] font-bold text-brand-ink">{tyre.tread.toFixed(1)} mm</p>
                </div>
                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <StatusBadge status={tyre.status} />
                  <ArrowRight size={13} className="text-zinc-300" />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/lifecycle" className="flex items-center justify-center gap-1.5 border-t border-black/[0.045] px-4 py-3 text-[11px] font-bold text-brand-orange sm:hidden">
            Open Tyre Health Centre <ArrowRight size={13} />
          </Link>
        </section>

        <section className="min-w-0 rounded-[22px] bg-white p-4 ring-1 ring-black/[0.045] sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-400">Live branch feed</p>
              <h2 className="mt-1.5 text-base font-extrabold tracking-[-0.015em] text-brand-ink sm:text-lg">Recent activity</h2>
            </div>
            <Activity size={16} className="shrink-0 text-zinc-300" />
          </div>

          <div className="mt-4 divide-y divide-black/[0.045]">
            {recentActivity.slice(0, 5).map((item) => (
              <div key={item.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${item.type === 'critical' ? 'bg-red-50 text-red-600' : item.type === 'reminder' ? 'bg-amber-50 text-amber-700' : item.type === 'customer' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-brand-orange'}`}>
                  {item.type === 'customer' ? <Users size={12} /> : item.type === 'critical' ? <ShieldAlert size={12} /> : item.type === 'reminder' ? <CalendarDays size={12} /> : <CircleCheck size={12} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-2 text-[11px] font-bold leading-4 text-zinc-800">{item.title}</p>
                    <span className="shrink-0 whitespace-nowrap text-[9px] text-zinc-400">{item.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-zinc-400">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
