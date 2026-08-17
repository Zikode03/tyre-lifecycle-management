import { useMemo, useState } from 'react';
import { ArrowLeft, Camera, CheckCircle2, Gauge, Save, ShieldAlert } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { evaluateTyreHealth } from '../lib/tyreHealthEngine';
import { workflowStore, type DemoInspection } from '../lib/workflowStore';

const inputClass='h-11 w-full rounded-xl border border-black/[0.07] bg-white px-3 text-sm outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-100/50';

export default function InspectionWorkspacePage(){
  const { inspectionId }=useParams();
  const navigate=useNavigate();
  const inspections=workflowStore.inspections();
  const existing=inspections.find(item=>item.id===inspectionId) ?? inspections[0];
  const [form,setForm]=useState<DemoInspection>({...existing,status:'In progress'});
  const [saved,setSaved]=useState(false);
  const average=useMemo(()=>{
    const values=[form.inner,form.centre,form.outer].filter((v):v is number=>typeof v==='number'&&!Number.isNaN(v));
    return values.length?values.reduce((a,b)=>a+b,0)/values.length:undefined;
  },[form.inner,form.centre,form.outer]);
  const health=useMemo(()=>evaluateTyreHealth({measuredTreadMm:average,abnormalWear:form.wearPattern!==undefined&&form.wearPattern!=='Even',severeDefect:(form.defects?.length??0)>0}),[average,form.wearPattern,form.defects]);
  const update=(key:keyof DemoInspection,value:unknown)=>setForm(current=>({...current,[key]:value}));
  const save=(complete=false)=>{
    const next={...form,status:complete?'Completed':'In progress',recommendation:health.action} as DemoInspection;
    workflowStore.saveInspections(inspections.map(item=>item.id===next.id?next:item));
    setForm(next);setSaved(true);window.setTimeout(()=>setSaved(false),2200);
    if(complete) window.setTimeout(()=>navigate('/inspections'),500);
  };
  const canComplete=Boolean(form.odometer&&form.position&&average&&form.pressure&&form.wearPattern);
  return <div className="mx-auto max-w-6xl space-y-6">
    <div className="flex items-center justify-between gap-4"><Link to="/inspections" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-brand-ink"><ArrowLeft size={16}/>Inspections</Link>{saved&&<span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700"><CheckCircle2 size={16}/>Saved</span>}</div>
    <div><p className="text-xs font-bold uppercase tracking-[0.17em] text-brand-orange">Physical tyre evidence</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-brand-ink">{form.id} · {form.registration}</h1><p className="mt-2 text-sm text-zinc-500">Record the physical measurements that will drive tyre-health intelligence.</p></div>
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <section className="space-y-5 rounded-[24px] bg-white p-5 ring-1 ring-black/[0.045] sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold text-zinc-600">Customer<input value={form.customer} onChange={e=>update('customer',e.target.value)} className={`mt-2 ${inputClass}`}/></label><label className="text-xs font-bold text-zinc-600">Technician<input value={form.technician} onChange={e=>update('technician',e.target.value)} className={`mt-2 ${inputClass}`}/></label><label className="text-xs font-bold text-zinc-600">Odometer (km)<input type="number" value={form.odometer??''} onChange={e=>update('odometer',Number(e.target.value)||undefined)} className={`mt-2 ${inputClass}`}/></label><label className="text-xs font-bold text-zinc-600">Tyre position<select value={form.position??''} onChange={e=>update('position',e.target.value)} className={`mt-2 ${inputClass}`}><option value="">Select position</option><option>Front left</option><option>Front right</option><option>Rear left</option><option>Rear right</option></select></label></div>
        <div className="border-t border-black/[0.05] pt-5"><div className="flex items-center gap-2"><Gauge size={17} className="text-brand-orange"/><h2 className="font-extrabold text-brand-ink">Tread measurements</h2></div><p className="mt-1 text-xs text-zinc-400">Enter actual inner, centre and outer readings in millimetres.</p><div className="mt-4 grid grid-cols-3 gap-3">{(['inner','centre','outer'] as const).map(key=><label key={key} className="text-xs font-bold capitalize text-zinc-600">{key}<input type="number" step="0.1" value={form[key]??''} onChange={e=>update(key,Number(e.target.value)||undefined)} className={`mt-2 ${inputClass}`}/></label>)}</div></div>
        <div className="grid gap-4 border-t border-black/[0.05] pt-5 sm:grid-cols-2"><label className="text-xs font-bold text-zinc-600">Pressure (PSI)<input type="number" value={form.pressure??''} onChange={e=>update('pressure',Number(e.target.value)||undefined)} className={`mt-2 ${inputClass}`}/></label><label className="text-xs font-bold text-zinc-600">Wear pattern<select value={form.wearPattern??''} onChange={e=>update('wearPattern',e.target.value)} className={`mt-2 ${inputClass}`}><option value="">Select wear pattern</option><option>Even</option><option>Inner-edge wear</option><option>Outer-edge wear</option><option>Centre wear</option><option>Cupping</option></select></label></div>
        <div className="border-t border-black/[0.05] pt-5"><p className="text-xs font-bold text-zinc-600">Physical defects</p><div className="mt-3 flex flex-wrap gap-2">{['Puncture','Sidewall cut','Bulge','Cracking','Exposed cords'].map(defect=>{const active=form.defects?.includes(defect);return <button type="button" key={defect} onClick={()=>update('defects',active?form.defects?.filter(v=>v!==defect):[...(form.defects??[]),defect])} className={`rounded-full px-3 py-2 text-xs font-bold ${active?'bg-red-50 text-red-700 ring-1 ring-red-200':'bg-[#F5F4F0] text-zinc-500'}`}>{defect}</button>})}</div></div>
        <div className="grid gap-4 border-t border-black/[0.05] pt-5 sm:grid-cols-[1fr_auto]"><label className="text-xs font-bold text-zinc-600">Technician notes<textarea value={form.notes??''} onChange={e=>update('notes',e.target.value)} className="mt-2 min-h-28 w-full rounded-xl border border-black/[0.07] bg-white p-3 text-sm outline-none focus:border-orange-200" placeholder="Describe visible damage, wear or handling concerns..."/></label><button type="button" className="mt-6 flex min-h-28 min-w-36 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-300 bg-[#FAF9F6] text-xs font-bold text-zinc-500"><Camera size={20}/>Add evidence</button></div>
      </section>
      <aside className="space-y-4">
        <section className="rounded-[24px] bg-[#202124] p-5 text-white"><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Live tyre health result</p><p className={`mt-4 text-3xl font-extrabold ${health.status==='Critical'?'text-red-400':health.status==='Attention'?'text-amber-300':health.status==='Healthy'?'text-emerald-400':'text-zinc-300'}`}>{health.status}</p><p className="mt-2 text-sm text-zinc-300">{health.treadLabel} · {health.confidence} confidence</p><div className="mt-5 rounded-xl bg-white/7 p-4"><p className="text-xs font-bold text-white">Recommended action</p><p className="mt-1 text-sm text-orange-300">{health.action}</p><p className="mt-3 text-xs leading-5 text-zinc-400">{health.reason}</p></div></section>
        {!canComplete&&<div className="flex gap-3 rounded-[18px] bg-amber-50 p-4 text-amber-800 ring-1 ring-amber-100"><ShieldAlert size={17} className="mt-0.5 shrink-0"/><p className="text-xs leading-5">Complete odometer, tyre position, tread, pressure and wear pattern before closing the inspection.</p></div>}
        <button onClick={()=>save(false)} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-bold text-brand-ink ring-1 ring-black/[0.07]"><Save size={16}/>Save inspection</button><button disabled={!canComplete} onClick={()=>save(true)} className="h-11 w-full rounded-xl bg-brand-orange text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Complete inspection</button>
      </aside>
    </div>
  </div>;
}
