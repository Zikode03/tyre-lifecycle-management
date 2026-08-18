import { BellRing, CalendarClock, CheckCircle2, Clock3, MessageSquareText, Search, Send, ShieldAlert, TriangleAlert, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { decideNotification, type NotificationReason } from '../lib/notificationEngine';

const now = new Date('2026-08-17T12:24:00+02:00');
const notificationSources = [
  { id:'NTF-1001', name:'Sibusiso Dlamini', subject:'Urgent replacement assessment', channel:'WhatsApp', reason:'TYRE_CRITICAL' as NotificationReason, vehicle:'NU 193-442', tyre:'Rear right', sendCount:1, lastSentAt:'2026-08-17T08:15:00+02:00', message:'Your rear-right tyre has a verified critical condition. Please book an inspection before further operation.' },
  { id:'NTF-1002', name:'Thando Mkhize', subject:'Tread recheck recommended', channel:'WhatsApp', reason:'TYRE_ATTENTION' as NotificationReason, vehicle:'ND 452-981', tyre:'Front right', sendCount:1, lastSentAt:'2026-08-14T09:00:00+02:00', message:'Your latest tyre assessment recommends a tread recheck. TyreTrack will remind you again only if no action is taken after the reminder interval.' },
  { id:'NTF-1003', name:'Lerato Molefe', subject:'Rotation reminder', channel:'SMS', reason:'ROTATION_DUE' as NotificationReason, vehicle:'ND 812-774', tyre:'Front axle', sendCount:0, scheduledFor:'2026-08-17T19:30:00+02:00', message:'Your tyre rotation interval has been reached. A short rotation and balancing visit is recommended.' },
  { id:'NTF-1004', name:'Priya Naidoo', subject:'Mileage update request', channel:'SMS', reason:'MILEAGE_REQUEST' as NotificationReason, vehicle:'ND 667-220', tyre:'Vehicle mileage', sendCount:2, lastSentAt:'2026-08-10T09:00:00+02:00', message:'Please update your current odometer reading so TyreTrack can keep tyre-health estimates current.' },
  { id:'NTF-1005', name:'Ayanda Zulu', subject:'Inspection booked', channel:'WhatsApp', reason:'TYRE_ATTENTION' as NotificationReason, vehicle:'ND 931-556', tyre:'Front left', sendCount:1, customerHasActed:true, message:'Customer has already booked an inspection. Automated follow-up is paused.' },
  { id:'NTF-1006', name:'Thando Mkhize', subject:'Replacement completed', channel:'WhatsApp', reason:'TYRE_CRITICAL' as NotificationReason, vehicle:'ND 452-981', tyre:'Rear right', sendCount:1, issueResolved:true, message:'The linked tyre issue has been resolved. No more reminders will be sent.' },
];
const notifications = notificationSources.map(item => ({ ...item, decision: decideNotification(item, now) }));

type View='All'|'Needs attention'|'Scheduled'|'Resolved';
function stateTone(state:string){
  if(state==='Sent'||state==='Resolved') return 'bg-emerald-50 text-emerald-700 ring-emerald-100';
  if(state==='Scheduled') return 'bg-blue-50 text-blue-700 ring-blue-100';
  if(state==='Suppressed') return 'bg-zinc-100 text-zinc-600 ring-zinc-200';
  if(state==='Waiting for customer') return 'bg-amber-50 text-amber-700 ring-amber-100';
  return 'bg-orange-50 text-brand-orange ring-orange-100';
}
function stateIcon(state:string){
  if(state==='Scheduled') return CalendarClock;
  if(state==='Resolved'||state==='Sent') return CheckCircle2;
  if(state==='Waiting for customer') return Clock3;
  if(state==='Suppressed') return ShieldAlert;
  return BellRing;
}

export default function NotificationsPage(){
  const [selectedId,setSelectedId]=useState(notifications[0].id);
  const [search,setSearch]=useState('');
  const [view,setView]=useState<View>('All');
  const [followUp,setFollowUp]=useState(false);
  const [sent,setSent]=useState(false);

  const filtered=useMemo(()=>{
    const q=search.trim().toLowerCase();
    return notifications.filter(n=>{
      const matchesSearch=!q||[n.name,n.vehicle,n.subject,n.channel,n.tyre].some(v=>v.toLowerCase().includes(q));
      const matchesView=view==='All'||(view==='Needs attention'&&(n.decision.priority==='Urgent'||n.decision.state==='Waiting for customer'))||(view==='Scheduled'&&n.decision.state==='Scheduled')||(view==='Resolved'&&(n.decision.state==='Resolved'||n.issueResolved||n.customerHasActed));
      return matchesSearch&&matchesView;
    });
  },[search,view]);

  const selected=notifications.find(n=>n.id===selectedId)??filtered[0]??notifications[0];
  const StatusIcon=stateIcon(selected.decision.state);

  return <div className="space-y-6">
    <PageHeader eyebrow="Customer communication" title="Notifications" description="See what TyreTrack sent, what is scheduled, what was suppressed and which customers actually need staff follow-up."/>

    {sent&&<div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"><CheckCircle2 size={16}/>Manual follow-up recorded for {selected.name}.</div>}

    <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_10px_32px_rgba(24,24,27,.05)] ring-1 ring-black/[0.05]">
      <div className="border-b border-black/[0.05] bg-[#F7F6F2] p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-[500px]"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer, vehicle or reminder" className="h-11 w-full rounded-xl border border-black/[0.045] bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-100/50"/></div>
          <div className="flex flex-wrap gap-2">{(['All','Needs attention','Scheduled','Resolved'] as View[]).map(item=><button key={item} onClick={()=>setView(item)} className={`h-10 rounded-xl px-3.5 text-xs font-bold transition ${view===item?'bg-[#202124] text-white':'bg-white text-zinc-600 ring-1 ring-black/[0.05] hover:text-brand-orange'}`}>{item}</button>)}</div>
        </div>
      </div>

      <div className="grid min-h-[610px] lg:grid-cols-[360px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)]">
        <div className="border-b border-black/[0.05] lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-3.5"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Communication queue</p><p className="mt-1 text-xs font-semibold text-zinc-500">{filtered.length} records</p></div>{view!=='All'&&<button onClick={()=>setView('All')} className="text-[10px] font-bold text-brand-orange">Clear view</button>}</div>
          <div className="divide-y divide-black/[0.045]">{filtered.map(item=>{const ItemIcon=stateIcon(item.decision.state);const active=selected.id===item.id;return <button onClick={()=>{setSelectedId(item.id);setSent(false)}} key={item.id} className={`relative w-full p-4 text-left transition ${active?'bg-orange-50/45':'hover:bg-[#FBFAF7]'}`}><span className={`absolute inset-y-3 left-0 w-[3px] rounded-r-full ${active?'bg-brand-orange':'bg-transparent'}`}/><div className="flex items-start gap-3"><div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${stateTone(item.decision.state)}`}><ItemIcon size={16}/></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-extrabold text-brand-ink">{item.name}</p><p className="mt-1 truncate text-xs font-semibold text-zinc-500">{item.subject}</p></div>{item.decision.priority==='Urgent'&&<TriangleAlert size={15} className="mt-0.5 shrink-0 text-red-500"/>}</div><div className="mt-3 flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[9px] font-black ring-1 ${stateTone(item.decision.state)}`}>{item.decision.state}</span><span className="text-[10px] font-semibold text-zinc-400">{item.vehicle} · {item.channel}</span></div></div></div></button>})}{filtered.length===0&&<div className="px-5 py-14 text-center"><BellRing size={20} className="mx-auto text-zinc-300"/><p className="mt-2 text-sm font-semibold text-zinc-500">No notifications match this view.</p></div>}</div>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="border-b border-black/[0.05] px-5 py-5 sm:px-6 lg:px-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0"><div className="flex items-center gap-2"><span className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${stateTone(selected.decision.state)}`}><StatusIcon size={16}/></span><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">{selected.channel} communication</p><h2 className="mt-1 text-xl font-extrabold text-brand-ink">{selected.subject}</h2></div></div><p className="mt-3 text-sm text-zinc-500">{selected.name} · {selected.vehicle} · {selected.tyre}</p></div><span className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ring-1 ${stateTone(selected.decision.state)}`}>{selected.decision.state}</span></div></div>

          <div className="flex-1 p-5 sm:p-6 lg:p-7">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-[20px] border border-black/[0.055] bg-[#FAF9F6] p-5 sm:p-6"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><MessageSquareText size={14} className="text-brand-orange"/>Customer message</div><p className="mt-4 text-[15px] leading-7 text-zinc-700">{selected.message}</p></div>

              <div className="mt-6 grid gap-0 overflow-hidden rounded-[18px] border border-black/[0.05] sm:grid-cols-2 xl:grid-cols-4">{[['Priority',selected.decision.priority],['Vehicle',selected.vehicle],['Tyre / reason',selected.tyre],['Automatic sends',String(selected.sendCount)]].map(([label,value],index)=><div key={label} className={`p-4 ${index>0?'border-t border-black/[0.05] sm:border-l sm:border-t-0':''}`}><p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">{label}</p><p className="mt-1.5 text-sm font-extrabold text-brand-ink">{value}</p></div>)}</div>

              <div className="mt-6 rounded-[18px] border-l-4 border-brand-orange bg-orange-50/45 p-4 sm:p-5"><div className="flex items-start gap-3"><Clock3 size={17} className="mt-0.5 shrink-0 text-brand-orange"/><div><p className="text-sm font-extrabold text-brand-ink">Automation reasoning</p><p className="mt-1.5 text-xs leading-6 text-zinc-600">{selected.decision.explanation}</p>{selected.decision.nextEligibleSend&&<p className="mt-2 text-xs font-bold text-zinc-700">Next eligible send: {new Date(selected.decision.nextEligibleSend).toLocaleString('en-ZA',{dateStyle:'medium',timeStyle:'short'})}</p>}</div></div></div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/[0.05] bg-[#FAF9F6] p-4 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-2xl text-xs leading-5 text-zinc-500">TyreTrack handles routine reminders automatically. Manual follow-up is for escalation, questions or unusual cases.</p><button onClick={()=>{setFollowUp(true);setSent(false)}} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#202124] px-4 text-xs font-bold text-white transition hover:bg-brand-orange"><Send size={14}/>Manual follow-up</button></div>
        </div>
      </div>
    </section>

    {followUp&&<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"><div className="w-full max-w-lg rounded-[22px] bg-white p-5 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-orange">Staff communication</p><h3 className="mt-1 text-lg font-extrabold text-brand-ink">Manual follow-up</h3></div><button onClick={()=>setFollowUp(false)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100"><X size={18}/></button></div><p className="mt-3 text-sm text-zinc-500">One-off follow-up for {selected.name}. Automatic reminder rules remain unchanged.</p><textarea defaultValue={`Hi ${selected.name}, we're following up regarding ${selected.subject.toLowerCase()}.`} className="mt-4 min-h-32 w-full rounded-xl border border-black/[0.08] p-3 text-sm outline-none focus:border-orange-200 focus:ring-4 focus:ring-orange-100/50"/><div className="mt-4 flex justify-end gap-2"><button onClick={()=>setFollowUp(false)} className="h-10 rounded-xl px-4 text-xs font-bold text-zinc-500">Cancel</button><button onClick={()=>{setFollowUp(false);setSent(true)}} className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-4 text-xs font-bold text-white"><Send size={14}/>Record follow-up</button></div></div></div>}
  </div>;
}
