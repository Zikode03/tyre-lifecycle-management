import { MessageCircleMore, Search, Send, TriangleAlert } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';

const messages = [
  ['Thando Mkhize', 'Tread recheck recommended', 'WhatsApp', 'Due now', 'High'],
  ['Lerato Molefe', 'Rotation due in 500 km', 'SMS', 'Today 19:30', 'Normal'],
  ['Sibusiso Dlamini', 'Urgent replacement assessment', 'WhatsApp', 'Due now', 'Critical'],
  ['Priya Naidoo', 'Mileage update requested', 'SMS', 'Tomorrow', 'Normal'],
];

export default function NotificationsPage() {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Customer communication" title="Notifications" description="Manage tyre reminders, safety messages and customer follow-up from one communication queue." />

      <section className="grid min-h-[560px] overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045] lg:grid-cols-[360px_1fr]">
        <div className="border-b border-black/[0.05] lg:border-b-0 lg:border-r">
          <div className="border-b border-black/[0.05] p-4">
            <div className="relative"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search customer or message" className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-100"/></div>
          </div>
          <div className="divide-y divide-black/[0.045]">
            {messages.map(([name, subject, channel, due, priority], index) => (
              <button key={`${name}-${subject}`} className={`w-full p-4 text-left transition hover:bg-[#FBFAF7] ${index===0?'bg-orange-50/40':''}`}>
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-black text-brand-ink">{name}</p><p className="mt-1 text-xs text-zinc-500">{subject}</p></div>{priority==='Critical'&&<TriangleAlert size={15} className="shrink-0 text-red-500"/>}</div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-bold"><span className="text-zinc-400">{channel}</span><span className={due==='Due now'?'text-brand-orange':'text-zinc-400'}>{due}</span></div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-b border-black/[0.05] px-5 py-5 sm:px-6"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Selected communication</p><h2 className="mt-2 text-xl font-black text-brand-ink">Thando Mkhize</h2><p className="mt-1 text-sm text-zinc-500">Tread recheck recommended · WhatsApp</p></div>
          <div className="flex-1 p-5 sm:p-6">
            <div className="max-w-2xl rounded-[22px] bg-[#F5F4F0] p-5"><MessageCircleMore size={18} className="text-brand-orange"/><p className="mt-4 text-sm leading-7 text-zinc-700">Hi Thando, your latest tyre inspection recommends a tread recheck. Please book a short tyre-health inspection so the workshop can confirm the current condition before further advice is given.</p></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Reason</p><p className="mt-1 text-sm font-bold text-brand-ink">Tread recheck</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Due</p><p className="mt-1 text-sm font-bold text-brand-orange">Now</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Linked vehicle</p><p className="mt-1 text-sm font-bold text-brand-ink">ND 452-981</p></div></div>
          </div>
          <div className="flex justify-end gap-2 border-t border-black/[0.05] p-4"><button className="h-10 rounded-xl bg-[#F5F4F0] px-4 text-xs font-bold text-zinc-600">Mark complete</button><button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#202124] px-4 text-xs font-bold text-white"><Send size={14}/>Send message</button></div>
        </div>
      </section>
    </div>
  );
}
