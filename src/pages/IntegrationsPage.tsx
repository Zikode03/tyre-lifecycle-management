import { AlertTriangle, Link2, RadioTower, RefreshCw, ShieldCheck, Unplug } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { telematicsConnections } from '../data/mock';

const priorityOrder = [
  ['1', 'ECU / OBD telematics', 'Highest confidence automatic odometer source'],
  ['2', 'Workshop verified', 'Captured and confirmed by tyre-shop staff'],
  ['3', 'GPS distance', 'Used when ECU odometer is unavailable'],
  ['4', 'Customer reported', 'Useful between workshop visits'],
  ['5', 'Estimated mileage', 'Fallback when no fresher source exists'],
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Mileage data" title="Integrations" description="Configure mileage providers and the rules TyreTrack uses to select odometer readings." />

      <section className="grid overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045] xl:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-black/[0.05] xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between border-b border-black/[0.05] p-5">
            <div><h2 className="text-base font-black text-brand-ink">Mileage providers</h2><p className="mt-1 text-xs text-zinc-400">Manage each connection individually.</p></div>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600"><RefreshCw size={14}/>Test connections</button>
          </div>
          <div className="divide-y divide-black/[0.045]">
            {telematicsConnections.map((connection) => {
              const connected = connection.status === 'Connected';
              const attention = connection.status === 'Attention';
              return (
                <div key={connection.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${connected?'bg-emerald-50 text-emerald-700':attention?'bg-amber-50 text-amber-700':'bg-[#F0EFEB] text-zinc-500'}`}>{connected?<Link2 size={18}/>:attention?<AlertTriangle size={18}/>:<Unplug size={18}/>}</div>
                    <div><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-black text-brand-ink">{connection.provider}</p><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${connected?'bg-emerald-50 text-emerald-700':attention?'bg-amber-50 text-amber-700':'bg-zinc-100 text-zinc-600'}`}>{connection.status}</span></div><p className="mt-1 text-xs leading-5 text-zinc-500">{connection.description}</p>{(connected||attention)&&<p className="mt-2 text-[10px] font-semibold text-zinc-400">{connection.connectedVehicles} vehicles · last sync {connection.lastSync}</p>}</div>
                  </div>
                  <button className={`h-10 shrink-0 rounded-xl px-4 text-xs font-bold ${connected||attention?'bg-[#202124] text-white':'bg-brand-orange text-white'}`}>{connected||attention?'Manage':'Connect provider'}</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><ShieldCheck size={18}/></div><div><h2 className="text-base font-black text-brand-ink">Mileage trust rules</h2><p className="mt-1 text-xs text-zinc-400">Applied when multiple readings are available.</p></div></div>
          <div className="mt-6 divide-y divide-black/[0.045]">{priorityOrder.map(([position,title,description])=><div key={position} className="flex gap-3 py-4 first:pt-0"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#202124] text-[10px] font-black text-white">{position}</div><div><p className="text-sm font-bold text-brand-ink">{title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p></div></div>)}</div>
          <div className="mt-6 border-t border-black/[0.05] pt-6"><h3 className="text-sm font-black text-brand-ink">Freshness rules</h3><div className="mt-4 space-y-4"><label className="block"><span className="text-xs font-bold text-zinc-600">Automatic reading fresh for</span><select className="mt-2 h-11 w-full rounded-xl bg-[#F5F4F0] px-3 text-sm outline-none"><option>24 hours</option><option>48 hours</option><option>7 days</option></select></label><label className="block"><span className="text-xs font-bold text-zinc-600">Manual reading warning after</span><select className="mt-2 h-11 w-full rounded-xl bg-[#F5F4F0] px-3 text-sm outline-none"><option>60 days</option><option>90 days</option><option>120 days</option></select></label><label className="flex items-start gap-3 rounded-xl bg-[#F5F4F0] p-4"><input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 accent-brand-orange"/><span><span className="block text-sm font-bold text-brand-ink">Prompt customer when mileage becomes stale</span><span className="mt-1 block text-xs leading-5 text-zinc-500">Create a follow-up task when no fresh automatic source exists.</span></span></label></div></div>
        </div>
      </section>

      <div className="flex items-center gap-3 rounded-[20px] bg-[#ECEAE4] px-5 py-4 text-xs text-zinc-600"><RadioTower size={16} className="text-brand-orange"/><span>Connection processing will be handled by the backend while this page remains the staff configuration surface.</span></div>
    </div>
  );
}
