import { AlertTriangle, CheckCircle2, Clock3, DatabaseZap, Link2, RadioTower, RefreshCw, ShieldCheck, Unplug } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { telematicsConnections } from '../data/mock';

const priorityOrder = [
  ['1', 'ECU / OBD telematics', 'Highest confidence automatic odometer source'],
  ['2', 'Workshop verified', 'Captured and confirmed by tyre-shop staff'],
  ['3', 'GPS distance', 'Automatically calculated distance when ECU data is unavailable'],
  ['4', 'Customer reported', 'Useful for private vehicles between workshop visits'],
  ['5', 'Estimated mileage', 'Fallback only when fresher data is unavailable'],
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mileage data"
        title="Integrations"
        description="Connect vehicle mileage sources and control how TyreTrack selects the most trustworthy odometer reading."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <RadioTower size={20} className="text-brand-orange" />
          <p className="mt-4 text-3xl font-black text-brand-ink">31</p>
          <p className="mt-1 text-sm font-semibold">Vehicles syncing</p>
          <p className="mt-1 text-xs text-brand-muted">Across connected providers</p>
        </div>
        <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <CheckCircle2 size={20} className="text-green-600" />
          <p className="mt-4 text-3xl font-black text-brand-ink">96%</p>
          <p className="mt-1 text-sm font-semibold">Fresh mileage data</p>
          <p className="mt-1 text-xs text-brand-muted">Updated within configured window</p>
        </div>
        <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <Clock3 size={20} className="text-amber-600" />
          <p className="mt-4 text-3xl font-black text-brand-ink">12</p>
          <p className="mt-1 text-sm font-semibold">Stale vehicles</p>
          <p className="mt-1 text-xs text-brand-muted">Need mileage refresh or customer follow-up</p>
        </div>
        <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <DatabaseZap size={20} className="text-brand-orange" />
          <p className="mt-4 text-3xl font-black text-brand-ink">4 min</p>
          <p className="mt-1 text-sm font-semibold">Last provider sync</p>
          <p className="mt-1 text-xs text-brand-muted">Latest successful ingestion cycle</p>
        </div>
      </div>

      <section className="rounded-2xl border border-brand-line bg-white shadow-soft">
        <div className="flex flex-col gap-3 border-b border-brand-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-brand-ink">Mileage & telematics providers</h2>
            <p className="mt-1 text-xs text-brand-muted">Connection controls are frontend placeholders until backend provider authentication is implemented.</p>
          </div>
          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-4 text-sm font-semibold text-brand-muted hover:border-orange-200 hover:text-brand-orange">
            <RefreshCw size={16} /> Test all connections
          </button>
        </div>

        <div className="divide-y divide-brand-line">
          {telematicsConnections.map((connection) => {
            const connected = connection.status === 'Connected';
            const attention = connection.status === 'Attention';

            return (
              <div key={connection.id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${connected ? 'bg-green-50 text-green-700' : attention ? 'bg-amber-50 text-amber-700' : 'bg-brand-canvas text-brand-muted'}`}>
                    {connected ? <Link2 size={21} /> : attention ? <AlertTriangle size={21} /> : <Unplug size={21} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-brand-ink">{connection.provider}</p>
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${connected ? 'bg-green-50 text-green-700' : attention ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-600'}`}>
                        {connection.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-brand-muted">{connection.description}</p>
                    {(connected || attention) && (
                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-brand-muted">
                        <span><strong className="text-brand-ink">{connection.connectedVehicles}</strong> vehicles linked</span>
                        <span>Last sync: <strong className="text-brand-ink">{connection.lastSync}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 lg:shrink-0">
                  {(connected || attention) ? (
                    <>
                      <button className="h-10 rounded-xl border border-brand-line px-4 text-sm font-semibold text-brand-muted hover:bg-zinc-50">Manage</button>
                      <button className="h-10 rounded-xl bg-brand-graphite px-4 text-sm font-bold text-white hover:bg-zinc-800">Sync now</button>
                    </>
                  ) : (
                    <button className="h-10 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white hover:bg-brand-orange-dark">Connect provider</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-50 p-2.5 text-brand-orange"><ShieldCheck size={20} /></div>
            <div>
              <h2 className="font-bold text-brand-ink">Mileage source priority</h2>
              <p className="mt-1 text-xs text-brand-muted">The frontend shows the preferred source order the backend should use when multiple readings exist.</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {priorityOrder.map(([position, title, description]) => (
              <div key={position} className="flex gap-3 rounded-xl border border-brand-line p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-graphite text-xs font-black text-white">{position}</div>
                <div>
                  <p className="text-sm font-bold text-brand-ink">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-brand-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <h2 className="font-bold text-brand-ink">Freshness rules</h2>
          <p className="mt-1 text-xs leading-5 text-brand-muted">These values are UI configuration placeholders and will later be persisted by the backend.</p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-semibold text-brand-ink">Automatic mileage considered fresh for</span>
              <select className="mt-2 h-11 w-full rounded-xl border border-brand-line bg-white px-3 text-sm outline-none focus:border-brand-orange">
                <option>24 hours</option>
                <option>48 hours</option>
                <option>7 days</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-brand-ink">Workshop/customer reading warning after</span>
              <select className="mt-2 h-11 w-full rounded-xl border border-brand-line bg-white px-3 text-sm outline-none focus:border-brand-orange">
                <option>60 days</option>
                <option>90 days</option>
                <option>120 days</option>
              </select>
            </label>
            <label className="flex items-start gap-3 rounded-xl bg-brand-canvas p-4">
              <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 accent-brand-orange" />
              <span>
                <span className="block text-sm font-semibold text-brand-ink">Prompt customer when mileage becomes stale</span>
                <span className="mt-1 block text-xs leading-5 text-brand-muted">Allows the service team to request a fresh odometer reading when no automatic source exists.</span>
              </span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
