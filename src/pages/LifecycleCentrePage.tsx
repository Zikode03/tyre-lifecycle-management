import { ArrowRight, Check, Filter, Search, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const healthCases = [
  { id:'TY-1003', customer:'Sibusiso Dlamini', vehicle:'2020 VW Polo • ND 186-442', tread:'2.1 mm', evidence:'Measured 14 Aug 2026', confidence:'High', action:'Replacement inspection', reason:'Low measured tread and uneven shoulder wear', tone:'Critical' },
  { id:'TY-1001', customer:'Thando Mkhize', vehicle:'2021 Toyota Corolla • ND 452-871', tread:'~3.4 mm', evidence:'Estimated from wear + mileage', confidence:'Medium', action:'Book tread inspection', reason:'Wear trend approaching review threshold', tone:'Attention' },
  { id:'TY-1004', customer:'Lerato Molefe', vehicle:'2022 Hyundai i20 • ND 718-235', tread:'Unknown', evidence:'Last verified reading is stale', confidence:'Low', action:'Request inspection', reason:'Mileage changed but current tread is unknown', tone:'Data gap' },
  { id:'TY-1008', customer:'Ayanda Zulu', vehicle:'2023 Toyota Hilux • ND 931-556', tread:'5.6 mm', evidence:'Measured 12 Aug 2026', confidence:'High', action:'Rotation check', reason:'Mileage interval reached since last rotation', tone:'Rotation' },
];

export default function LifecycleCentrePage(){
  return <div className="space-y-7">
    <PageHeader eyebrow="Tyre intelligence" title="Tyre Health Centre" description="A working queue for tyres that need attention, with evidence quality and next action shown clearly." />

    {/* Real tyre photography makes the health comparison immediately recognisable. */}
    <section className="overflow-hidden rounded-[28px] bg-[#17181a] text-white shadow-[0_20px_50px_rgba(24,24,27,0.10)] ring-1 ring-black/5">
      <div className="grid lg:grid-cols-[0.76fr_1.24fr]">
        <div className="flex flex-col justify-center px-5 py-7 sm:px-7 lg:px-8 lg:py-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">Digital tread intelligence</p>
          <h2 className="mt-2 max-w-lg text-2xl font-extrabold tracking-[-0.025em] sm:text-[28px]">See tyre health, not just a status label.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-zinc-400">A verified tread reading should make the condition obvious. Healthy tread has depth and definition; worn tread needs inspection before it becomes a safety problem.</p>
          <Link to="/inspections" className="mt-5 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-[#202124] transition hover:bg-zinc-100">Open inspections <ArrowRight size={14}/></Link>
        </div>

        <div className="grid min-h-[300px] border-t border-white/[0.07] sm:grid-cols-2 lg:border-l lg:border-t-0">
          <div className="group relative min-h-[280px] overflow-hidden border-b border-white/[0.08] sm:border-b-0 sm:border-r">
            <img
              src="https://unsplash.com/photos/atQQaZYC4z0/download?force=true&w=1000"
              alt="Close-up of healthy tyre tread"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07140f]/95 via-[#0d1a15]/42 to-black/12" />
            <div className="absolute inset-0 bg-emerald-500/[0.05]" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-200 ring-1 ring-emerald-300/25 backdrop-blur-md"><Check size={12}/> Healthy</div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-extrabold tracking-[-0.035em]">5.8 mm</p>
                  <p className="mt-1 text-sm font-semibold text-white">Deep, even tread</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-right backdrop-blur-md ring-1 ring-white/10">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white">Measured</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[78%] rounded-full bg-emerald-400"/></div>
              <p className="mt-2 text-[11px] leading-4 text-zinc-300">No immediate tyre action required.</p>
            </div>
          </div>

          <div className="group relative min-h-[280px] overflow-hidden">
            <img
              src="https://unsplash.com/photos/CNFac-rBTag/download?force=true&w=1000"
              alt="Close-up of worn tyre tread"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#190909]/95 via-[#1e1111]/46 to-black/15" />
            <div className="absolute inset-0 bg-red-500/[0.05]" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red-400/15 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-red-200 ring-1 ring-red-300/25 backdrop-blur-md"><TriangleAlert size={12}/> Critical</div>
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-3xl font-extrabold tracking-[-0.035em]">2.1 mm</p>
                  <p className="mt-1 text-sm font-semibold text-white">Low, worn tread</p>
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-right backdrop-blur-md ring-1 ring-white/10">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white">Measured</p>
                </div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[27%] rounded-full bg-red-400"/></div>
              <p className="mt-2 text-[11px] leading-4 text-zinc-300">Replacement inspection should be prioritised.</p>
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
