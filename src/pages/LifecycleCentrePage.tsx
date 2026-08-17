import { ArrowRight, Check, Filter, Search, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const healthCases = [
  { id:'TY-1003', customer:'Sibusiso Dlamini', vehicle:'2020 VW Polo • ND 186-442', tread:'2.1 mm', evidence:'Measured 14 Aug 2026', confidence:'High', action:'Replacement inspection', reason:'Low measured tread and uneven shoulder wear', tone:'Critical' },
  { id:'TY-1001', customer:'Thando Mkhize', vehicle:'2021 Toyota Corolla • ND 452-871', tread:'~3.4 mm', evidence:'Estimated from wear + mileage', confidence:'Medium', action:'Book tread inspection', reason:'Wear trend approaching review threshold', tone:'Attention' },
  { id:'TY-1004', customer:'Lerato Molefe', vehicle:'2022 Hyundai i20 • ND 718-235', tread:'Unknown', evidence:'Last verified reading is stale', confidence:'Low', action:'Request inspection', reason:'Mileage changed but current tread is unknown', tone:'Data gap' },
  { id:'TY-1008', customer:'Ayanda Zulu', vehicle:'2023 Toyota Hilux • ND 931-556', tread:'5.6 mm', evidence:'Measured 12 Aug 2026', confidence:'High', action:'Rotation check', reason:'Mileage interval reached since last rotation', tone:'Rotation' },
];

function TreadTyre({ worn = false }: { worn?: boolean }) {
  const grooves = worn ? [25, 48, 71] : [16, 31, 46, 61, 76];
  return (
    <div className={`relative h-[118px] w-[74px] shrink-0 rounded-[44%] border-[8px] shadow-[inset_8px_0_14px_rgba(255,255,255,.06),inset_-8px_0_14px_rgba(0,0,0,.5)] ${worn ? 'border-[#4a3936] bg-[#211b1a]' : 'border-zinc-600 bg-[#171719]'}`} aria-hidden="true">
      <div className={`absolute inset-[27%] rounded-full border-[5px] ${worn ? 'border-red-400/35 bg-[#2a2020]' : 'border-emerald-400/35 bg-[#232729]'}`} />
      {grooves.map((top) => <span key={top} className={`absolute left-[7%] right-[7%] rounded-full ${worn ? 'h-[3px] bg-red-300/25' : 'h-[5px] bg-zinc-400/45'}`} style={{ top: `${top}%` }} />)}
      {!worn && [28, 52, 74].map((left) => <span key={left} className="absolute bottom-[7%] top-[7%] w-[3px] rotate-6 rounded-full bg-zinc-500/30" style={{ left: `${left}%` }} />)}
      {worn && <span className="absolute -right-1 bottom-[18%] h-10 w-2 rotate-12 rounded-full bg-red-500/30 blur-[2px]" />}
    </div>
  );
}

export default function LifecycleCentrePage(){
  return <div className="space-y-7">
    <PageHeader eyebrow="Tyre intelligence" title="Tyre Health Centre" description="A working queue for tyres that need attention, with evidence quality and next action shown clearly." />

    <section className="relative overflow-hidden rounded-[26px] bg-[#1c1d1f] text-white ring-1 ring-white/[0.04]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,.10),transparent_25%),radial-gradient(circle_at_83%_75%,rgba(239,68,68,.10),transparent_28%)]" />
      <div className="absolute inset-0 opacity-30 surface-grain" />
      <div className="relative grid min-h-[245px] lg:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col justify-center px-5 py-7 sm:px-7 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">Digital tread intelligence</p>
          <h2 className="mt-2 max-w-xl text-2xl font-extrabold tracking-[-0.025em] sm:text-[28px]">See the difference before it becomes a problem.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">Tyre health combines verified tread measurements, wear patterns and mileage evidence so staff can separate healthy tyres from tyres that need action.</p>
          <Link to="/inspections" className="mt-5 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#202124] transition hover:bg-zinc-100">Open inspections <ArrowRight size={14}/></Link>
        </div>

        <div className="relative grid border-t border-white/[0.07] sm:grid-cols-2 lg:border-l lg:border-t-0">
          <div className="relative flex min-h-[220px] items-center gap-4 overflow-hidden border-b border-white/[0.07] px-5 py-6 sm:border-b-0 sm:border-r sm:px-6">
            <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-emerald-400/[0.06] blur-2xl" />
            <TreadTyre />
            <div className="relative min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300 ring-1 ring-emerald-400/20"><Check size={11}/> Healthy</div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">5.8 mm</p>
              <p className="mt-1 text-xs font-semibold text-zinc-300">Deep, even tread</p>
              <p className="mt-2 max-w-[150px] text-[11px] leading-4 text-zinc-500">Verified reading. No immediate tyre action required.</p>
            </div>
          </div>

          <div className="relative flex min-h-[220px] items-center gap-4 overflow-hidden px-5 py-6 sm:px-6">
            <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-red-500/[0.07] blur-2xl" />
            <TreadTyre worn />
            <div className="relative min-w-0">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-red-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-300 ring-1 ring-red-400/20"><TriangleAlert size={11}/> Critical</div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-white">2.1 mm</p>
              <p className="mt-1 text-xs font-semibold text-zinc-300">Low, uneven tread</p>
              <p className="mt-2 max-w-[150px] text-[11px] leading-4 text-zinc-500">Measured wear is near the replacement threshold. Inspect now.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
      <div className="flex flex-col gap-3 border-b border-black/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="relative w-full sm:max-w-md"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search customer, vehicle or tyre" className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-100"/></div><div className="flex gap-2"><button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600"><Filter size={14}/>Filters</button><select className="h-10 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600 outline-none"><option>All actions</option><option>Replacement</option><option>Inspection</option><option>Rotation</option></select></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left"><thead><tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><th className="px-5 py-3.5">Customer / vehicle</th><th className="px-5 py-3.5">Tread evidence</th><th className="px-5 py-3.5">Confidence</th><th className="px-5 py-3.5">Reason</th><th className="px-5 py-3.5">Next action</th><th className="px-5 py-3.5"/></tr></thead><tbody className="divide-y divide-black/[0.045]">{healthCases.map(item=><tr key={item.id} className="hover:bg-[#FBFAF7]"><td className="px-5 py-4"><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.tone==='Critical'?'bg-red-500':item.tone==='Attention'?'bg-amber-500':item.tone==='Rotation'?'bg-brand-orange':'bg-zinc-400'}`}/><div><p className="text-sm font-black text-brand-ink">{item.customer}</p><p className="mt-1 text-xs text-zinc-400">{item.vehicle}</p></div></div></td><td className="px-5 py-4"><p className="text-sm font-black text-brand-ink">{item.tread}</p><p className="mt-1 text-[10px] text-zinc-400">{item.evidence}</p></td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${item.confidence==='High'?'bg-emerald-50 text-emerald-700':item.confidence==='Medium'?'bg-amber-50 text-amber-700':'bg-zinc-100 text-zinc-600'}`}>{item.confidence}</span></td><td className="max-w-[280px] px-5 py-4 text-xs leading-5 text-zinc-500">{item.reason}</td><td className="px-5 py-4"><p className="text-sm font-bold text-brand-ink">{item.action}</p></td><td className="px-5 py-4 text-right"><Link to={`/tyres/${item.id}`} className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#202124] px-3 text-[11px] font-bold text-white">Open tyre <ArrowRight size={13}/></Link></td></tr>)}</tbody></table></div>
    </section>
    <div className="flex items-start gap-3 rounded-[20px] bg-[#ECEAE4] px-5 py-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange"><ShieldCheck size={16}/></div><div><p className="text-sm font-black text-brand-ink">Evidence rule</p><p className="mt-1 text-xs leading-5 text-zinc-500">TyreTrack should never present estimated or stale data as a confirmed physical measurement.</p></div></div>
  </div>
}
