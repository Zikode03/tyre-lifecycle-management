import { BarChart3, CalendarDays, MessageCircleMore, RadioTower, ScanLine, Users } from 'lucide-react';

// Shared automotive visuals keep each module recognisable without turning the product into a collection of decorative banners.
export function TyreScanVisual({ compact = false }: { compact?: boolean }) {
  return <div className={`relative shrink-0 ${compact ? 'h-20 w-24' : 'h-28 w-36'}`} aria-hidden="true">
    <div className="absolute bottom-2 left-1/2 h-4 w-[82%] -translate-x-1/2 rounded-full bg-black/25 blur-md" />
    <div className="absolute left-1/2 top-1/2 h-[88%] w-[56%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-[46%] border-[10px] border-zinc-700 bg-[#171719] shadow-[inset_8px_0_12px_rgba(255,255,255,0.05),inset_-8px_0_12px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-[22%] rounded-full border-[5px] border-zinc-500/70 bg-[#27272a]" />
      <div className="absolute inset-[38%] rounded-full bg-[#111113]" />
      {[14,30,46,62,78].map(top => <span key={top} className="absolute left-[7%] right-[7%] h-[4px] -rotate-6 rounded-full bg-zinc-500/45" style={{top:`${top}%`}} />)}
      {[26,48,70].map(left => <span key={left} className="absolute bottom-[7%] top-[7%] w-[3px] rotate-6 rounded-full bg-zinc-600/35" style={{left:`${left}%`}} />)}
    </div>
    <div className="absolute left-1/2 top-1/2 h-[74%] w-px -translate-x-1/2 -translate-y-1/2 bg-brand-orange shadow-[0_0_14px_rgba(249,115,22,.8)]" />
    <div className="absolute right-0 top-3 rounded-lg border border-orange-400/20 bg-orange-500/10 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-orange-300"><ScanLine size={10} className="mr-1 inline"/>Tread scan</div>
  </div>;
}

export function InspectionVisual() {
  return <div className="relative h-24 w-36 shrink-0" aria-hidden="true"><TyreScanVisual compact/><div className="absolute bottom-1 right-0 w-16 rotate-[-10deg] rounded-xl bg-[#ECEAE4] p-2 shadow-lg ring-1 ring-black/10"><div className="rounded-md bg-[#202124] px-2 py-1 text-center text-[9px] font-black text-emerald-400">4.8 mm</div><div className="mx-auto mt-1 h-5 w-2 rounded-b bg-zinc-400"/></div></div>;
}

export function BookingBayVisual() {
  return <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl bg-[#18191b] p-3" aria-hidden="true"><div className="absolute inset-x-4 bottom-3 h-1 rounded-full bg-orange-500/60"/><div className="absolute left-5 top-4 h-14 w-12 rounded-t-xl border-x-2 border-t-2 border-zinc-600"/><div className="absolute right-5 top-4 h-14 w-12 rounded-t-xl border-x-2 border-t-2 border-zinc-600"/><div className="absolute bottom-5 left-8 h-6 w-20 rounded-[50%_50%_30%_30%] bg-zinc-600"><span className="absolute -bottom-2 left-2 h-4 w-4 rounded-full border-4 border-zinc-800 bg-zinc-400"/><span className="absolute -bottom-2 right-2 h-4 w-4 rounded-full border-4 border-zinc-800 bg-zinc-400"/></div><CalendarDays size={16} className="absolute right-3 top-3 text-orange-400"/></div>;
}

export function CommunicationVisual() {
  return <div className="relative h-20 w-32 shrink-0" aria-hidden="true"><div className="absolute left-1 top-2 h-16 w-9 rounded-xl border-2 border-zinc-600 bg-[#18191b] p-1"><div className="h-full rounded-lg bg-zinc-800"/><span className="absolute bottom-1 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-zinc-500"/></div><div className="absolute right-1 top-1 w-20 rounded-2xl rounded-bl-sm bg-orange-500 px-3 py-2 shadow-lg"><span className="block h-1.5 w-12 rounded bg-white/80"/><span className="mt-1.5 block h-1.5 w-8 rounded bg-white/50"/></div><div className="absolute bottom-1 right-4 w-16 rounded-2xl rounded-br-sm bg-white/10 px-3 py-2 ring-1 ring-white/10"><span className="block h-1.5 w-10 rounded bg-zinc-500"/><span className="mt-1.5 block h-1.5 w-7 rounded bg-zinc-600"/></div><MessageCircleMore size={15} className="absolute right-0 top-9 text-orange-300"/></div>;
}

export function TelematicsVisual() {
  return <div className="relative h-24 w-40 shrink-0" aria-hidden="true"><div className="absolute bottom-4 left-2 h-8 w-20 rounded-[55%_55%_25%_25%] bg-zinc-600"><span className="absolute -bottom-2 left-2 h-4 w-4 rounded-full border-4 border-zinc-800 bg-zinc-400"/><span className="absolute -bottom-2 right-2 h-4 w-4 rounded-full border-4 border-zinc-800 bg-zinc-400"/></div><div className="absolute right-2 top-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20"><RadioTower size={22}/></div><svg className="absolute inset-0 h-full w-full"><path d="M80 55 C105 55 105 30 124 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="text-orange-400/70"/></svg><span className="absolute bottom-0 right-0 text-[8px] font-bold uppercase tracking-widest text-zinc-500">Vehicle data</span></div>;
}

export function ReportVisual() {
  return <div className="relative h-24 w-36 shrink-0 rounded-2xl bg-[#18191b] p-4 ring-1 ring-white/5" aria-hidden="true"><div className="flex h-full items-end gap-2">{[38,64,48,82,70].map((height,index)=><span key={index} className={`flex-1 rounded-t ${index===3?'bg-orange-500':'bg-zinc-600'}`} style={{height:`${height}%`}}/>)}</div><BarChart3 size={14} className="absolute right-2 top-2 text-orange-300"/></div>;
}

export function CustomerGarageVisual() {
  return <div className="relative h-20 w-32 shrink-0" aria-hidden="true"><div className="absolute bottom-2 left-1 h-12 w-24 rounded-t-2xl border-x-2 border-t-2 border-zinc-600"><div className="absolute inset-x-3 bottom-0 h-7 rounded-t bg-zinc-700/70"/></div><div className="absolute bottom-2 left-7 h-6 w-16 rounded-[55%_55%_25%_25%] bg-zinc-500"><span className="absolute -bottom-1 left-1 h-3 w-3 rounded-full bg-zinc-800"/><span className="absolute -bottom-1 right-1 h-3 w-3 rounded-full bg-zinc-800"/></div><div className="absolute right-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white"><Users size={14}/></div></div>;
}
