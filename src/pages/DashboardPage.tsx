import {
  Activity,
  ArrowRight,
  CalendarDays,
  Car,
  CircleCheck,
  Gauge,
  Plus,
  ShieldAlert,
  TrendingDown,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDemoStaffSession } from '../auth/demoAuth';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

export default function DashboardPage() {
  const user = getDemoStaffSession();
  const priorityTyres = tyres.filter((tyre) => tyre.status !== 'Good').slice(0, 4);

  return (
    <div className="space-y-7">
      {/* The hero combines branch context and the most important lifecycle signal in one visual anchor. */}
      <section className="surface-grain relative overflow-hidden rounded-[30px] bg-[#1C1D1E] px-6 py-7 text-white shadow-[0_24px_60px_rgba(24,24,27,0.16)] sm:px-8 sm:py-8 xl:px-10">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-[52px] border-white/[0.025]" />
        <div className="absolute bottom-[-130px] right-[18%] h-64 w-64 rounded-full bg-brand-orange/[0.09] blur-3xl" />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[1.35fr_0.65fr] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.065] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-300 ring-1 ring-white/[0.07]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Durban Central
              </span>
              <span className="text-xs text-zinc-500">Monday operations</span>
            </div>

            <h1 className="mt-6 max-w-2xl text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[46px]">
              Keep every tyre <span className="text-brand-orange">ahead</span> of the next problem.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              Welcome back, {user?.name ?? 'Manager'}. Today’s focus is replacement risk, overdue inspections and vehicles with stale mileage.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/tyres" className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white transition hover:bg-brand-orange-dark">
                <Plus size={16} /> Register tyre
              </Link>
              <Link to="/lifecycle" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white/[0.065] px-4 text-sm font-semibold text-zinc-200 ring-1 ring-white/[0.08] transition hover:bg-white/[0.1]">
                Open lifecycle centre <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.055] p-4 ring-1 ring-white/[0.065] backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Critical tyres</p>
              <div className="mt-4 flex items-end justify-between">
                <p className="text-3xl font-black tracking-[-0.05em]">12</p>
                <ShieldAlert size={19} className="text-red-400" />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500">4 need contact today</p>
            </div>
            <div className="rounded-2xl bg-white/[0.055] p-4 ring-1 ring-white/[0.065] backdrop-blur">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Mileage stale</p>
              <div className="mt-4 flex items-end justify-between">
                <p className="text-3xl font-black tracking-[-0.05em]">7</p>
                <Gauge size={19} className="text-brand-orange" />
              </div>
              <p className="mt-2 text-[11px] text-zinc-500">Confidence reduced</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active tyres" value="1,284" note="Across 318 monitored vehicles" icon={Gauge} />
        <StatCard label="Customers" value="842" note="24 new profiles this month" icon={Users} accent="green" />
        <StatCard label="Due for attention" value="67" note="Inspection, rotation or tread review" icon={TrendingDown} accent="amber" />
        <StatCard label="Today's bookings" value="18" note="6 still waiting for check-in" icon={CalendarDays} accent="orange" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.42fr_0.78fr]">
        <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(24,24,27,0.04),0_16px_36px_rgba(24,24,27,0.04)] ring-1 ring-black/[0.045]">
          <div className="flex items-center justify-between px-6 pb-4 pt-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Priority queue</p>
              </div>
              <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-brand-ink">Tyres requiring attention</h2>
            </div>
            <Link to="/lifecycle" className="hidden items-center gap-1.5 text-xs font-bold text-zinc-500 transition hover:text-brand-orange sm:flex">
              View lifecycle <ArrowRight size={14} />
            </Link>
          </div>

          <div className="px-3 pb-3">
            {priorityTyres.map((tyre, index) => (
              <Link
                to={`/tyres/${tyre.id}`}
                key={tyre.id}
                className="grid gap-4 rounded-2xl px-3 py-4 transition hover:bg-[#F6F5F1] sm:grid-cols-[1.2fr_0.8fr_0.55fr_0.55fr] sm:items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F0EC] text-zinc-600">
                    <Gauge size={17} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-ink">{tyre.brand} {tyre.model}</p>
                    <p className="mt-1 text-[11px] text-zinc-400">{tyre.reference} · {tyre.position}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Vehicle</p>
                  <p className="mt-1 text-xs font-semibold text-zinc-700">{tyre.vehicle}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tread</p>
                  <p className="mt-1 text-xs font-bold text-brand-ink">{tyre.tread.toFixed(1)} mm</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <StatusBadge status={tyre.status} />
                  <ArrowRight size={14} className="text-zinc-300" />
                </div>
                {index !== priorityTyres.length - 1 && <div className="hidden" />}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] bg-white p-6 shadow-[0_1px_0_rgba(24,24,27,0.04),0_16px_36px_rgba(24,24,27,0.04)] ring-1 ring-black/[0.045]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Live branch feed</p>
              <h2 className="mt-2 text-xl font-black tracking-[-0.025em]">Recent activity</h2>
            </div>
            <Activity size={18} className="text-zinc-300" />
          </div>

          <div className="mt-6 space-y-5">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.type === 'critical' ? 'bg-red-50 text-red-600' : item.type === 'reminder' ? 'bg-amber-50 text-amber-700' : item.type === 'customer' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-brand-orange'}`}>
                  {item.type === 'customer' ? <Users size={14} /> : item.type === 'critical' ? <ShieldAlert size={14} /> : item.type === 'reminder' ? <CalendarDays size={14} /> : <CircleCheck size={14} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold leading-5 text-zinc-800">{item.title}</p>
                    <span className="whitespace-nowrap text-[10px] text-zinc-400">{item.time}</span>
                  </div>
                  <p className="mt-0.5 truncate text-[11px] text-zinc-400">{item.meta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ['Customer records', 'Find a customer, update mileage or review vehicle history.', Users, '/customers'],
          ['Workshop inspections', 'Capture tread depth, defects and condition evidence.', Car, '/inspections'],
          ['Lifecycle actions', 'Review replacements, overdue inspections and follow-ups.', ShieldAlert, '/lifecycle'],
        ].map(([title, text, Icon, path]) => {
          const IconComponent = Icon as typeof Users;
          return (
            <Link key={String(title)} to={String(path)} className="group flex items-center gap-4 rounded-[22px] bg-white px-5 py-5 ring-1 ring-black/[0.045] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/[0.04]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F1ED] text-zinc-700 transition group-hover:bg-[#202124] group-hover:text-white">
                <IconComponent size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-brand-ink">{String(title)}</h3>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{String(text)}</p>
              </div>
              <ArrowRight size={15} className="shrink-0 text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-brand-orange" />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
