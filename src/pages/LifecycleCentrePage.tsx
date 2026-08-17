import { ArrowRight, Check, Filter, ScanLine, Search, ShieldCheck, TriangleAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const healthCases = [
  { id:'TY-1003', customer:'Sibusiso Dlamini', vehicle:'2020 VW Polo • ND 186-442', tread:'2.1 mm', evidence:'Measured 14 Aug 2026', confidence:'High', action:'Replacement inspection', reason:'Low measured tread and uneven shoulder wear', tone:'Critical' },
  { id:'TY-1001', customer:'Thando Mkhize', vehicle:'2021 Toyota Corolla • ND 452-871', tread:'~3.4 mm', evidence:'Estimated from wear + mileage', confidence:'Medium', action:'Book tread inspection', reason:'Wear trend approaching review threshold', tone:'Attention' },
  { id:'TY-1004', customer:'Lerato Molefe', vehicle:'2022 Hyundai i20 • ND 718-235', tread:'Unknown', evidence:'Last verified reading is stale', confidence:'Low', action:'Request inspection', reason:'Mileage changed but current tread is unknown', tone:'Data gap' },
  { id:'TY-1008', customer:'Ayanda Zulu', vehicle:'2023 Toyota Hilux • ND 931-556', tread:'5.6 mm', evidence:'Measured 12 Aug 2026', confidence:'High', action:'Rotation check', reason:'Mileage interval reached since last rotation', tone:'Rotation' },
];

export default function LifecycleCentrePage(){
  const navigate = useNavigate();

  return <div className="space-y-7">
    <PageHeader eyebrow="Tyre intelligence" title="Tyre Health Centre" description="A working queue for tyres that need attention, with evidence quality and next action shown clearly." />

    <section className="overflow-hidden rounded-[30px] bg-[#0e0f11] text-white shadow-[0_22px_55px_rgba(24,24,27,0.13)] ring-1 ring-black/5">
      <div className="grid lg:grid-cols-[0.92fr_1fr_1fr]">
        <div className="relative flex min-h-[370px] flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 lg:min-h-[420px] lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(249,115,22,.07),transparent_34%)]" />
          <div className="relative">
            <div className="flex items-center gap-3 text-orange-300"><ScanLine size={20}/><p className="text-[11px] font-bold uppercase tracking-[0.2em]">Digital tread intelligence</p></div>
            <h2 className="mt-7 max-w-[390px] text-[36px] font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-[42px]">Know the tread.<br/><span className="text-brand-orange">Act early.</span></h2>
            <p className="mt-5 max-w-[320px] text-sm leading-6 text-zinc-400">See verified tyre condition at a glance and move unsafe tyres straight to inspection.</p>
            <Link to="/inspections" className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-3 rounded-xl bg-white px-5 text-sm font-bold text-[#202124] shadow-lg transition hover:bg-zinc-100">Open inspections <ArrowRight size={16}/></Link>
          </div>
        </div>

        <div className="group relative min-h-[370px] overflow-hidden border-t border-emerald-300/60 lg:min-h-[420px] lg:border-l lg:border-t-0">
          <img src="https://unsplash.com/photos/GAh_vhU_K5E/download?force=true&w=1400" alt="Healthy tyre with deep defined tread" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06110c]/95 via-black/12 to-black/20" />
          <div className="absolute inset-0 bg-emerald-500/[0.025]" />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950/65 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.13em] text-emerald-100 ring-1 ring-emerald-300/25 backdrop-blur-md"><Check size={15} className="text-emerald-400"/> Healthy</div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300">Tread depth</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div><p className="text-[42px] font-extrabold leading-none tracking-[-0.05em]">5.8 mm</p><p className="mt-2 text-sm font-semibold"><span className="text-emerald-300">Deep,</span> even tread</p></div>
              <div className="rounded-xl bg-black/45 px-3.5 py-2.5 backdrop-blur-md ring-1 ring-white/20"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p><p className="mt-1 flex items-center gap-2 text-xs font-semibold">Measured <Check size={14} className="text-emerald-400"/></p></div>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[84%] rounded-full bg-emerald-400"/></div>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-200"><ShieldCheck size={16} className="text-emerald-400"/>No immediate action required</div>
          </div>
        </div>

        <div className="group relative min-h-[370px] overflow-hidden border-t border-red-500/75 lg:min-h-[420px] lg:border-l-2 lg:border-t-0">
          <img src="https://unsplash.com/photos/CNFac-rBTag/download?force=true&w=1400" alt="Critically worn tyre with low tread" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180707]/96 via-black/10 to-black/20" />
          <div className="absolute inset-0 bg-red-500/[0.025]" />
          <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl bg-red-950/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.13em] text-red-100 ring-1 ring-red-400/30 backdrop-blur-md"><TriangleAlert size={15} className="text-red-400"/> Critical</div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300">Tread depth</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div><p className="text-[42px] font-extrabold leading-none tracking-[-0.05em]">2.1 mm</p><p className="mt-2 text-sm font-semibold"><span className="text-red-400">Low,</span> worn tread</p></div>
              <div className="rounded-xl bg-black/45 px-3.5 py-2.5 backdrop-blur-md ring-1 ring-white/20"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p><p className="mt-1 flex items-center gap-2 text-xs font-semibold">Measured <TriangleAlert size={14} className="text-red-400"/></p></div>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[24%] rounded-full bg-red-400"/></div>
            <div className="mt-5 flex items-center gap-2 text-xs text-zinc-200"><TriangleAlert size={16} className="text-red-400"/>Book inspection before operation</div>
          </div>
        </div>
      </div>
    </section>

    <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
      <div className="flex flex-col gap-3 border-b border-black/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"><div className="relative w-full sm:max-w-md"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search customer, vehicle or tyre" className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-100"/></div><div className="flex gap-2"><button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600"><Filter size={14}/>Filters</button><select className="h-10 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600 outline-none"><option>All actions</option><option>Replacement</option><option>Inspection</option><option>Rotation</option></select></div></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left">
          <thead><tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><th className="px-5 py-3.5">Customer / vehicle</th><th className="px-5 py-3.5">Tread evidence</th><th className="px-5 py-3.5">Confidence</th><th className="px-5 py-3.5">Reason</th><th className="px-5 py-3.5">Next action</th></tr></thead>
          <tbody className="divide-y divide-black/[0.045]">
            {healthCases.map(item => (
              <tr
                key={item.id}
                tabIndex={0}
                role="link"
                aria-label={`Open tyre ${item.id}`}
                onClick={() => navigate(`/tyres/${item.id}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    navigate(`/tyres/${item.id}`);
                  }
                }}
                className="cursor-pointer transition hover:bg-[#F8F7F3] focus-visible:bg-orange-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-200"
              >
                <td className="px-5 py-4"><div className="flex items-start gap-3"><span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.tone==='Critical'?'bg-red-500':item.tone==='Attention'?'bg-amber-500':item.tone==='Rotation'?'bg-brand-orange':'bg-zinc-400'}`}/><div><p className="text-sm font-black text-brand-ink">{item.customer}</p><p className="mt-1 text-xs text-zinc-400">{item.vehicle}</p></div></div></td>
                <td className="px-5 py-4"><p className="text-sm font-black text-brand-ink">{item.tread}</p><p className="mt-1 text-[10px] text-zinc-400">{item.evidence}</p></td>
                <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${item.confidence==='High'?'bg-emerald-50 text-emerald-700':item.confidence==='Medium'?'bg-amber-50 text-amber-700':'bg-zinc-100 text-zinc-600'}`}>{item.confidence}</span></td>
                <td className="max-w-[280px] px-5 py-4 text-xs leading-5 text-zinc-500">{item.reason}</td>
                <td className="px-5 py-4"><p className="text-sm font-bold text-brand-ink">{item.action}</p><p className="mt-1 text-[10px] font-medium text-zinc-400">Click row to open tyre</p></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    <div className="flex items-start gap-3 rounded-[20px] bg-[#ECEAE4] px-5 py-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange"><ShieldCheck size={16}/></div><div><p className="text-sm font-black text-brand-ink">Evidence rule</p><p className="mt-1 text-xs leading-5 text-zinc-500">TyreTrack should never present estimated or stale data as a confirmed physical measurement.</p></div></div>
  </div>
}
