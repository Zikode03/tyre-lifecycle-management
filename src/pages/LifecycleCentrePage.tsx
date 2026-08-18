import { useMemo, useState } from 'react';
import { ArrowRight, Check, Filter, ScanLine, Search, ShieldCheck, TriangleAlert, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { evaluateTyreHealth } from '../lib/tyreHealthEngine';

const healthSources = [
  { id:'TY-1003', customer:'Sibusiso Dlamini', vehicle:'2020 VW Polo • ND 186-442', measuredTreadMm:2.1, measuredAt:'14 Aug 2026', abnormalWear:true },
  { id:'TY-1001', customer:'Thando Mkhize', vehicle:'2021 Toyota Corolla • ND 452-871', previousTreadMm:4.2, previousTreadOdometerKm:28000, currentOdometerKm:37200 },
  { id:'TY-1004', customer:'Lerato Molefe', vehicle:'2022 Hyundai i20 • ND 718-235', previousTreadMm:5.1, previousTreadOdometerKm:41000, currentOdometerKm:49800, mileageStale:true },
  { id:'TY-1008', customer:'Ayanda Zulu', vehicle:'2023 Toyota Hilux • ND 931-556', measuredTreadMm:5.6, measuredAt:'12 Aug 2026', rotationKmSince:12400 },
];

const healthCases = healthSources.map(source => ({ ...source, health: evaluateTyreHealth(source) }));

function statusDot(status:string){
  if(status==='Critical') return 'bg-red-500';
  if(status==='Attention') return 'bg-amber-500';
  if(status==='Healthy') return 'bg-emerald-500';
  return 'bg-zinc-400';
}
function confidenceTone(confidence:string){
  if(confidence==='High') return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if(confidence==='Medium') return 'bg-amber-50 text-amber-700 ring-amber-100';
  return 'bg-zinc-100 text-zinc-600 ring-zinc-200';
}

export default function LifecycleCentrePage(){
  const navigate = useNavigate();
  const [search,setSearch]=useState('');
  const [action,setAction]=useState('All actions');
  const [status,setStatus]=useState('All');
  const [showFilters,setShowFilters]=useState(false);

  const filtered=useMemo(()=>{
    const q=search.trim().toLowerCase();
    return healthCases.filter(item=>{
      const result=item.health;
      const matchesSearch=!q||[item.customer,item.vehicle,item.id,result.action,result.reason].some(v=>v.toLowerCase().includes(q));
      const matchesAction=action==='All actions'||result.action.toLowerCase().includes(action.toLowerCase());
      const matchesStatus=status==='All'||result.status===status;
      return matchesSearch&&matchesAction&&matchesStatus;
    });
  },[search,action,status]);

  return <div className="space-y-7">
    <PageHeader eyebrow="Tyre intelligence" title="Tyre Health Centre" description="A working queue for tyres that need attention, with evidence quality and next action shown clearly." />

    <section className="overflow-hidden rounded-[30px] bg-[#0e0f11] text-white shadow-[0_22px_55px_rgba(24,24,27,0.13)] ring-1 ring-black/5">
      <div className="grid lg:grid-cols-[0.92fr_1fr_1fr]">
        <div className="relative flex min-h-[370px] flex-col justify-center overflow-hidden px-6 py-8 sm:px-8 lg:min-h-[420px] lg:px-10"><div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(249,115,22,.07),transparent_34%)]"/><div className="relative"><div className="flex items-center gap-3 text-orange-300"><ScanLine size={20}/><p className="text-[11px] font-bold uppercase tracking-[0.2em]">Digital tread intelligence</p></div><h2 className="mt-7 max-w-[390px] text-[36px] font-extrabold leading-[1.08] tracking-[-0.045em] sm:text-[42px]">Know the tread.<br/><span className="text-brand-orange">Act early.</span></h2><p className="mt-5 max-w-[320px] text-sm leading-6 text-zinc-400">See verified tyre condition at a glance and move unsafe tyres straight to inspection.</p><Link to="/inspections" className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-3 rounded-xl bg-white px-5 text-sm font-bold text-[#202124] shadow-lg transition hover:bg-zinc-100">Open inspections <ArrowRight size={16}/></Link></div></div>
        <div className="group relative min-h-[370px] overflow-hidden border-t border-emerald-300/60 lg:min-h-[420px] lg:border-l lg:border-t-0"><img src="https://unsplash.com/photos/GAh_vhU_K5E/download?force=true&w=1400" alt="Healthy tyre with deep defined tread" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"/><div className="absolute inset-0 bg-gradient-to-t from-[#06110c]/95 via-black/12 to-black/20"/><div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl bg-emerald-950/65 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.13em] text-emerald-100 ring-1 ring-emerald-300/25 backdrop-blur-md"><Check size={15} className="text-emerald-400"/> Healthy</div><div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300">Tread depth</p><div className="mt-3 flex items-end justify-between gap-4"><div><p className="text-[42px] font-extrabold leading-none tracking-[-0.05em]">5.8 mm</p><p className="mt-2 text-sm font-semibold"><span className="text-emerald-300">Deep,</span> even tread</p></div><div className="rounded-xl bg-black/45 px-3.5 py-2.5 backdrop-blur-md ring-1 ring-white/20"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p><p className="mt-1 flex items-center gap-2 text-xs font-semibold">Measured <Check size={14} className="text-emerald-400"/></p></div></div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[84%] rounded-full bg-emerald-400"/></div><div className="mt-5 flex items-center gap-2 text-xs text-zinc-200"><ShieldCheck size={16} className="text-emerald-400"/>No immediate action required</div></div></div>
        <div className="group relative min-h-[370px] overflow-hidden border-t border-red-500/75 lg:min-h-[420px] lg:border-l-2 lg:border-t-0"><img src="https://t.ctcdn.com.br/OuVdxIgNTOw9L_tfWacM-6zR0nU%3D/600x600/smart/i613257.jpeg" alt="Critically worn bald tyre with almost no usable tread" className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]"/><div className="absolute inset-0 bg-gradient-to-t from-[#180707]/96 via-black/10 to-black/20"/><div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl bg-red-950/70 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.13em] text-red-100 ring-1 ring-red-400/30 backdrop-blur-md"><TriangleAlert size={15} className="text-red-400"/> Critical</div><div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-300">Tread depth</p><div className="mt-3 flex items-end justify-between gap-4"><div><p className="text-[42px] font-extrabold leading-none tracking-[-0.05em]">2.1 mm</p><p className="mt-2 text-sm font-semibold"><span className="text-red-400">Low,</span> worn tread</p></div><div className="rounded-xl bg-black/45 px-3.5 py-2.5 backdrop-blur-md ring-1 ring-white/20"><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-300">Evidence</p><p className="mt-1 flex items-center gap-2 text-xs font-semibold">Measured <TriangleAlert size={14} className="text-red-400"/></p></div></div><div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[24%] rounded-full bg-red-400"/></div><div className="mt-5 flex items-center gap-2 text-xs text-zinc-200"><TriangleAlert size={16} className="text-red-400"/>Book inspection before operation</div></div></div>
      </div>
    </section>

    <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_8px_28px_rgba(24,24,27,.04)] ring-1 ring-black/[0.05]">
      <div className="border-b border-black/[0.05] bg-[#F7F6F2] p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-[520px]"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer, vehicle or tyre" className="h-11 w-full rounded-xl border border-black/[0.045] bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-100/50"/></div>
          <div className="flex flex-wrap gap-2"><button onClick={()=>setShowFilters(v=>!v)} className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-xs font-bold transition ${showFilters||status!=='All'?'bg-[#202124] text-white':'bg-white text-zinc-600 ring-1 ring-black/[0.05]'}`}><Filter size={14}/>Filters</button><select value={action} onChange={e=>setAction(e.target.value)} className="h-10 rounded-xl border border-black/[0.05] bg-white px-3 text-xs font-bold text-zinc-600 outline-none"><option>All actions</option><option>Replacement</option><option>Inspection</option><option>Rotation</option><option>Monitor</option></select></div>
        </div>
        {showFilters&&<div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/[0.05] pt-4"><span className="mr-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">Health state</span>{['All','Critical','Attention','Healthy','Unknown'].map(value=><button key={value} onClick={()=>setStatus(value)} className={`rounded-full px-3 py-2 text-xs font-bold ${status===value?'bg-brand-orange text-white':'bg-white text-zinc-600 ring-1 ring-black/[0.05]'}`}>{value}</button>)}{(status!=='All'||action!=='All actions'||search)&&<button onClick={()=>{setStatus('All');setAction('All actions');setSearch('')}} className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-red-600"><X size={13}/>Clear</button>}</div>}
      </div>

      <div className="hidden md:block">
        <table className="w-full table-fixed text-left">
          <colgroup><col className="w-[24%]"/><col className="w-[15%]"/><col className="w-[11%]"/><col className="w-[29%]"/><col className="w-[21%]"/></colgroup>
          <thead><tr className="bg-[#202124] text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-300"><th className="px-4 py-3.5 lg:px-5">Customer / vehicle</th><th className="px-3 py-3.5 lg:px-4">Tread evidence</th><th className="px-3 py-3.5 lg:px-4">Confidence</th><th className="px-3 py-3.5 lg:px-4">Reason</th><th className="px-3 py-3.5 lg:px-4">Next action</th></tr></thead>
          <tbody className="divide-y divide-black/[0.05]">{filtered.map(item=>{const result=item.health;return <tr key={item.id} tabIndex={0} role="link" aria-label={`Open tyre ${item.id}`} onClick={()=>navigate(`/tyres/${item.id}`)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();navigate(`/tyres/${item.id}`)}}} className="cursor-pointer align-top transition hover:bg-orange-50/35 focus-visible:bg-orange-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-200"><td className="px-4 py-4 lg:px-5"><div className="flex items-start gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusDot(result.status)}`}/><div className="min-w-0"><p className="truncate text-[13px] font-black text-brand-ink">{item.customer}</p><p className="mt-1 break-words text-[11px] leading-4 text-zinc-400">{item.vehicle}</p></div></div></td><td className="px-3 py-4 lg:px-4"><p className="text-[13px] font-black text-brand-ink">{result.treadLabel}</p><p className="mt-1 break-words text-[10px] leading-4 text-zinc-400">{result.evidence}{result.evidence==='Measured'&&item.measuredAt?` · ${item.measuredAt}`:result.evidence==='Estimated'?' · wear + mileage':''}</p></td><td className="px-3 py-4 lg:px-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ring-1 ${confidenceTone(result.confidence)}`}>{result.confidence}</span></td><td className="px-3 py-4 lg:px-4"><p className="text-[11px] leading-[1.55] text-zinc-500">{result.reason}</p></td><td className="px-3 py-4 lg:px-4"><p className="text-[12px] font-extrabold leading-5 text-brand-ink">{result.action}</p><p className="mt-1 text-[10px] leading-4 text-zinc-400">{result.isEstimate?'Estimate — inspection must confirm':'Open tyre record'}</p></td></tr>})}{filtered.length===0&&<tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-zinc-400">No tyre-health records match these filters.</td></tr>}</tbody>
        </table>
      </div>

      <div className="divide-y divide-black/[0.05] md:hidden">{filtered.map(item=>{const result=item.health;return <button key={item.id} onClick={()=>navigate(`/tyres/${item.id}`)} className="w-full p-4 text-left transition hover:bg-orange-50/30"><div className="flex items-start justify-between gap-3"><div className="flex items-start gap-3"><span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusDot(result.status)}`}/><div><p className="text-sm font-black text-brand-ink">{item.customer}</p><p className="mt-1 text-xs text-zinc-400">{item.vehicle}</p></div></div><span className={`rounded-full px-2 py-1 text-[10px] font-black ring-1 ${confidenceTone(result.confidence)}`}>{result.confidence}</span></div><div className="mt-4 grid grid-cols-2 gap-3"><div><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Tread</p><p className="mt-1 text-sm font-black text-brand-ink">{result.treadLabel}</p></div><div><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Next action</p><p className="mt-1 text-sm font-bold text-brand-ink">{result.action}</p></div></div><p className="mt-3 text-xs leading-5 text-zinc-500">{result.reason}</p></button>})}</div>
    </section>

    <div className="flex items-start gap-3 rounded-[20px] bg-[#ECEAE4] px-5 py-4"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange"><ShieldCheck size={16}/></div><div><p className="text-sm font-black text-brand-ink">Evidence rule</p><p className="mt-1 text-xs leading-5 text-zinc-500">Measured data is fact. Estimated wear is labelled as an estimate and never presented as a confirmed physical tread measurement.</p></div></div>
  </div>
}
