import { Activity, CalendarDays, Car, Gauge, Plus, ShieldAlert, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { recentActivity, tyres } from '../data/mock';

export default function DashboardPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Durban Central Branch"
        title="Good evening, N. Mthembu"
        description="Here is today’s tyre-health, customer and workshop overview."
        action={<Link to="/tyres" className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white shadow-md shadow-orange-100 hover:bg-brand-orange-dark"><Plus size={17}/>Register tyre</Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active tyres" value="1,284" note="Across 318 active vehicles" icon={Gauge} />
        <StatCard label="Customers" value="842" note="+24 this month" icon={Users} accent="green" />
        <StatCard label="Due for attention" value="67" note="Inspection, rotation or tread review" icon={ShieldAlert} accent="amber" />
        <StatCard label="Today’s bookings" value="18" note="6 still awaiting check-in" icon={CalendarDays} accent="orange" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <div><h2 className="font-bold">Tyres requiring attention</h2><p className="mt-0.5 text-xs text-brand-muted">Prioritised by latest recorded health status</p></div>
            <Link to="/tyres" className="text-xs font-bold text-brand-orange">View all tyres</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-brand-canvas text-[11px] uppercase tracking-wider text-brand-muted"><tr><th className="px-5 py-3">Tyre</th><th className="px-5 py-3">Vehicle</th><th className="px-5 py-3">Position</th><th className="px-5 py-3">Tread</th><th className="px-5 py-3">Mileage</th><th className="px-5 py-3">Status</th></tr></thead>
              <tbody className="divide-y divide-brand-line">
                {tyres.slice(0,4).map((tyre) => <tr key={tyre.id} className="hover:bg-zinc-50/70"><td className="px-5 py-4"><p className="font-semibold">{tyre.brand} {tyre.model}</p><p className="mt-0.5 text-xs text-brand-muted">{tyre.reference}</p></td><td className="px-5 py-4 font-medium">{tyre.vehicle}</td><td className="px-5 py-4 text-brand-muted">{tyre.position}</td><td className="px-5 py-4 font-semibold">{tyre.tread.toFixed(1)} mm</td><td className="px-5 py-4 text-brand-muted">{tyre.mileage.toLocaleString('en-ZA')} km</td><td className="px-5 py-4"><StatusBadge status={tyre.status}/></td></tr>)}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between"><div><h2 className="font-bold">Recent activity</h2><p className="mt-0.5 text-xs text-brand-muted">Latest branch updates</p></div><Activity size={19} className="text-zinc-300"/></div>
          <div className="mt-5 space-y-5">
            {recentActivity.map((item, index) => <div key={item.title} className="flex gap-3"><div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.type === 'critical' ? 'bg-red-500' : item.type === 'reminder' ? 'bg-amber-500' : item.type === 'customer' ? 'bg-green-500' : 'bg-brand-orange'}`}/><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold">{item.title}</p><span className="whitespace-nowrap text-[11px] text-zinc-400">{item.time}</span></div><p className="mt-1 truncate text-xs text-brand-muted">{item.meta}</p>{index !== recentActivity.length - 1 && <div className="mt-5 h-px bg-brand-line"/>}</div></div>)}
          </div>
        </section>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[['Customers & vehicles', 'Find a customer, update vehicle mileage or review service history.', Users, '/customers'], ['Tyre inspections', 'Capture tread depth, tyre condition, defects and photos.', Car, '/inspections'], ['Safety follow-ups', 'Review critical tyres and outstanding customer actions.', ShieldAlert, '/notifications']].map(([title, text, Icon, path]) => {
          const IconComponent = Icon as typeof Users;
          return <Link key={String(title)} to={String(path)} className="group rounded-2xl border border-brand-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-orange-200"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-canvas text-brand-orange group-hover:bg-orange-50"><IconComponent size={19}/></div><h3 className="mt-4 font-bold">{String(title)}</h3><p className="mt-2 text-sm leading-6 text-brand-muted">{String(text)}</p></Link>
        })}
      </div>
    </div>
  );
}
