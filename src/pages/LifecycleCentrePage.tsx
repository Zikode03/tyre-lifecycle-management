import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gauge,
  MessageCircleMore,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const healthCases = [
  {
    id: 'TY-1003',
    customer: 'Sibusiso Dlamini',
    vehicle: '2020 VW Polo • ND 186-442',
    tread: '2.1 mm',
    evidence: 'Workshop measured • 14 Aug 2026',
    confidence: 'High',
    action: 'Replacement inspection',
    reason: 'Low measured tread and uneven shoulder wear',
    tone: 'Critical',
  },
  {
    id: 'TY-1001',
    customer: 'Thando Mkhize',
    vehicle: '2021 Toyota Corolla • ND 452-871',
    tread: '~3.4 mm',
    evidence: 'Estimated from wear + mileage',
    confidence: 'Medium',
    action: 'Book tread inspection',
    reason: 'Wear trend is approaching the review threshold',
    tone: 'Attention',
  },
  {
    id: 'TY-1004',
    customer: 'Lerato Molefe',
    vehicle: '2022 Hyundai i20 • ND 718-235',
    tread: 'Unknown',
    evidence: 'Last verified reading is stale',
    confidence: 'Low',
    action: 'Request inspection',
    reason: 'Mileage changed but current tread condition is unknown',
    tone: 'Data gap',
  },
];

const tyreSegments = [
  { label: 'Critical', value: 8, tone: 'bg-red-500' },
  { label: 'Attention', value: 15, tone: 'bg-amber-500' },
  { label: 'Rotation due', value: 38, tone: 'bg-brand-orange' },
  { label: 'Healthy', value: 1212, tone: 'bg-emerald-500' },
];

function TyreHealthGraphic() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[310px]">
      <div className="absolute inset-[8%] rounded-full border-[26px] border-zinc-800 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_28px_55px_rgba(0,0,0,0.28)]" />
      <div className="absolute inset-[24%] rounded-full border border-white/10 bg-[#171719]" />
      <div className="absolute inset-[34%] flex items-center justify-center rounded-full bg-brand-orange shadow-[0_0_45px_rgba(249,115,22,0.28)]">
        <Gauge size={44} className="text-white" />
      </div>
      {Array.from({ length: 14 }).map((_, index) => {
        const rotation = index * (360 / 14);
        return <span key={rotation} className="absolute left-1/2 top-1/2 h-[34%] w-[5px] origin-bottom rounded-full bg-zinc-600/50" style={{ transform: `translate(-50%, -100%) rotate(${rotation}deg) translateY(-76%)` }} />;
      })}
      <div className="absolute -right-2 top-[20%] rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 text-right backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Health cases</p>
        <p className="mt-1 text-xl font-black text-white">61</p>
      </div>
      <div className="absolute -left-3 bottom-[18%] rounded-2xl border border-white/10 bg-white/[0.06] px-3 py-2 backdrop-blur">
        <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Data confidence</p>
        <p className="mt-1 text-sm font-black text-emerald-400">92% fresh</p>
      </div>
    </div>
  );
}

export default function LifecycleCentrePage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Tyre intelligence"
        title="Tyre Health Centre"
        description="A focused work queue showing which tyres need attention, how strong the evidence is, and what action should happen next."
      />

      <section className="overflow-hidden rounded-[30px] bg-[#202124] text-white shadow-[0_20px_60px_rgba(24,24,27,0.14)]">
        <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-zinc-300">
              <Sparkles size={13} className="text-brand-orange" /> Evidence-led tyre decisions
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-black tracking-[-0.045em] sm:text-4xl">Know what needs attention before the customer notices.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">The Health Centre combines measured tread, tyre mileage, age, inspection history and data freshness. It separates verified facts from estimates so staff can act with the right level of confidence.</p>

            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
              {tyreSegments.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${item.tone}`} /><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">{item.label}</p></div>
                  <p className="mt-2 text-2xl font-black">{item.value.toLocaleString('en-ZA')}</p>
                </div>
              ))}
            </div>
          </div>

          <TyreHealthGraphic />
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
        <div className="flex flex-col gap-2 border-b border-black/[0.045] px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-black tracking-[-0.02em] text-brand-ink">Priority tyre health cases</h2>
            <p className="mt-1 text-xs text-zinc-400">Ordered by safety risk, evidence quality and urgency.</p>
          </div>
          <span className="text-[11px] font-bold text-zinc-400">3 highest-priority cases</span>
        </div>

        <div className="divide-y divide-black/[0.045]">
          {healthCases.map((item) => (
            <div key={item.id} className="grid gap-4 px-5 py-5 transition hover:bg-[#FBFAF7] sm:px-6 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.tone === 'Critical' ? 'bg-red-500' : item.tone === 'Attention' ? 'bg-amber-500' : 'bg-zinc-400'}`} />
                  <p className="text-sm font-black text-brand-ink">{item.customer}</p>
                </div>
                <p className="mt-1.5 text-xs text-zinc-400">{item.vehicle}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">Tread evidence</p>
                <p className="mt-1.5 text-sm font-black text-brand-ink">{item.tread}</p>
                <p className="mt-1 text-[10px] text-zinc-400">{item.evidence}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">Confidence</p>
                <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${item.confidence === 'High' ? 'bg-emerald-50 text-emerald-700' : item.confidence === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-600'}`}>{item.confidence}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400">Next action</p>
                <p className="mt-1.5 text-sm font-black text-brand-ink">{item.action}</p>
                <p className="mt-1 text-[10px] leading-4 text-zinc-400">{item.reason}</p>
              </div>
              <Link to={`/tyres/${item.id}`} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#202124] px-3 text-[11px] font-bold text-white hover:bg-zinc-800">Open tyre <ArrowRight size={13} /></Link>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[26px] bg-white p-5 ring-1 ring-black/[0.045] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Inspection work</p><h2 className="mt-2 text-lg font-black tracking-[-0.02em] text-brand-ink">Tyres needing physical checks</h2></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><CalendarClock size={18} /></div>
          </div>
          <div className="mt-5 divide-y divide-black/[0.045]">
            {[
              ['ND 452-871', 'Rear tread recheck', 'Overdue 3 days', 'red'],
              ['ND 186-442', 'Safety inspection', 'Due today', 'amber'],
              ['ND 718-235', 'Rotation inspection', 'Due in 6 days', 'zinc'],
            ].map(([registration, action, due, tone]) => (
              <div key={registration} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="text-sm font-black text-brand-ink">{registration}</p><p className="mt-1 text-xs text-zinc-400">{action}</p></div><span className={`text-xs font-bold ${tone === 'red' ? 'text-red-600' : tone === 'amber' ? 'text-amber-600' : 'text-zinc-500'}`}>{due}</span></div>
            ))}
          </div>
        </section>

        <section className="rounded-[26px] bg-white p-5 ring-1 ring-black/[0.045] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Customer retention</p><h2 className="mt-2 text-lg font-black tracking-[-0.02em] text-brand-ink">Follow-up opportunities</h2></div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0EFEB] text-zinc-700"><MessageCircleMore size={18} /></div>
          </div>
          <div className="mt-5 divide-y divide-black/[0.045]">
            {[
              ['Thando Mkhize', 'Tread recheck', '3 days overdue'],
              ['Lerato Molefe', 'Rotation reminder', 'Due in 500 km'],
              ['Sibusiso Dlamini', 'Replacement assessment', 'Urgent'],
            ].map(([customer, action, due]) => (
              <div key={`${customer}-${action}`} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"><div><p className="text-sm font-black text-brand-ink">{customer}</p><p className="mt-1 text-xs text-zinc-400">{action}</p></div><span className={`text-xs font-bold ${due === 'Urgent' || due.includes('overdue') ? 'text-red-600' : 'text-brand-orange'}`}>{due}</span></div>
            ))}
          </div>
          <Link to="/notifications" className="mt-5 inline-flex items-center gap-2 text-xs font-black text-brand-orange hover:text-brand-orange-dark">Open communication queue <ArrowRight size={14} /></Link>
        </section>
      </div>

      <section className="flex flex-col gap-4 rounded-[24px] bg-[#ECEAE4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-sm"><ShieldCheck size={19} /></div><div><p className="text-sm font-black text-brand-ink">Health decisions should follow the evidence.</p><p className="mt-1 text-xs leading-5 text-zinc-500">Measured tread supports stronger action. Estimated or stale data should normally trigger an inspection before replacement advice is treated as confirmed.</p></div></div>
        <Link to="/inspections" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#202124] px-4 text-xs font-bold text-white hover:bg-zinc-800">Open inspections <ArrowRight size={14} /></Link>
      </section>
    </div>
  );
}
