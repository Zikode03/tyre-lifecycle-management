import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Gauge,
  History,
  MessageCircleMore,
  RotateCcw,
  TrendingDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const replacementForecast = [
  {
    id: 'TY-1003',
    customer: 'Sibusiso Dlamini',
    vehicle: '2020 VW Polo • ND 186-442',
    tread: '2.1 mm',
    mileage: '42,870 km',
    estimate: '0–30 days',
    reason: 'Low tread + uneven shoulder wear',
    priority: 'Critical',
  },
  {
    id: 'TY-1001',
    customer: 'Thando Mkhize',
    vehicle: '2021 Toyota Corolla • ND 452-871',
    tread: '2.4 mm',
    mileage: '48,240 km',
    estimate: '30–60 days',
    reason: 'Wear trend approaching review threshold',
    priority: 'Due soon',
  },
  {
    id: 'TY-1004',
    customer: 'Lerato Molefe',
    vehicle: '2022 Hyundai i20 • ND 718-235',
    tread: '3.1 mm',
    mileage: '36,110 km',
    estimate: '60–90 days',
    reason: 'Mileage and tread trend',
    priority: 'Monitor',
  },
];

const followUps = [
  ['Thando Mkhize', 'Tread recheck', '3 days overdue', 'WhatsApp'],
  ['Lerato Molefe', 'Rotation reminder', 'Due in 500 km', 'SMS'],
  ['Sibusiso Dlamini', 'Replacement assessment', 'Urgent', 'WhatsApp'],
];

const inspectionQueue = [
  ['ND 452-871', 'Toyota Corolla', 'Rear tread recheck', 'Overdue 3 days'],
  ['ND 186-442', 'VW Polo', 'Safety inspection', 'Due today'],
  ['ND 718-235', 'Hyundai i20', 'Rotation inspection', 'Due in 6 days'],
];

/**
 * The lifecycle centre turns historic tyre data into operational actions.
 * Values are mock data for the frontend prototype; backend rules will later
 * calculate the forecasts from odometer, tread, age and inspection history.
 */
export default function LifecycleCentrePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Proactive tyre management"
        title="Tyre Lifecycle Centre"
        description="See which tyres need attention next, why they were flagged and which customers should be contacted."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Replacement forecast', '23', 'Likely within 90 days', TrendingDown, 'text-red-600 bg-red-50'],
          ['Overdue inspections', '11', 'Customer action required', AlertTriangle, 'text-amber-600 bg-amber-50'],
          ['Rotation due', '38', 'Based on mileage since rotation', RotateCcw, 'text-brand-orange bg-orange-50'],
          ['Healthy lifecycle', '1,212', 'No current action required', CheckCircle2, 'text-green-600 bg-green-50'],
        ].map(([label, value, note, Icon, tone]) => {
          const I = Icon as typeof Gauge;
          return (
            <section key={String(label)} className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${String(tone)}`}><I size={19} /></div>
              <p className="mt-4 text-3xl font-black tracking-tight text-brand-ink">{String(value)}</p>
              <p className="mt-1 text-sm font-bold text-brand-ink">{String(label)}</p>
              <p className="mt-1 text-xs leading-5 text-brand-muted">{String(note)}</p>
            </section>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
        <div className="flex flex-col gap-3 border-b border-brand-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-brand-ink">Replacement forecast</h2>
            <p className="mt-1 text-xs text-brand-muted">Prioritised from mileage, tread depth and latest recorded condition.</p>
          </div>
          <span className="w-fit rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold text-brand-orange">Next 90 days</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-brand-canvas text-[11px] uppercase tracking-wider text-brand-muted">
              <tr>
                <th className="px-5 py-3">Customer / vehicle</th>
                <th className="px-5 py-3">Tread</th>
                <th className="px-5 py-3">Tyre mileage</th>
                <th className="px-5 py-3">Forecast</th>
                <th className="px-5 py-3">Why flagged</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-line">
              {replacementForecast.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/70">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-brand-ink">{item.customer}</p>
                    <p className="mt-1 text-xs text-brand-muted">{item.vehicle}</p>
                  </td>
                  <td className="px-5 py-4 font-bold">{item.tread}</td>
                  <td className="px-5 py-4 text-brand-muted">{item.mileage}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${item.priority === 'Critical' ? 'bg-red-50 text-red-700' : item.priority === 'Due soon' ? 'bg-amber-50 text-amber-700' : 'bg-zinc-100 text-zinc-600'}`}>
                      {item.estimate}
                    </span>
                  </td>
                  <td className="max-w-[260px] px-5 py-4 text-xs leading-5 text-brand-muted">{item.reason}</td>
                  <td className="px-5 py-4">
                    <Link to={`/tyres/${item.id}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-dark">
                      Passport <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-brand-ink">Inspection queue</h2>
              <p className="mt-1 text-xs text-brand-muted">Vehicles that need a tyre-health check or recheck.</p>
            </div>
            <CalendarClock size={19} className="text-brand-orange" />
          </div>
          <div className="mt-5 divide-y divide-brand-line">
            {inspectionQueue.map(([registration, vehicle, action, due]) => (
              <div key={registration} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-brand-ink">{registration} · {vehicle}</p>
                  <p className="mt-1 text-xs text-brand-muted">{action}</p>
                </div>
                <span className={`whitespace-nowrap text-xs font-bold ${due.startsWith('Overdue') ? 'text-red-600' : due === 'Due today' ? 'text-amber-600' : 'text-brand-muted'}`}>{due}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-brand-ink">Customer follow-up</h2>
              <p className="mt-1 text-xs text-brand-muted">Close the gap between tyre service and the customer’s next visit.</p>
            </div>
            <MessageCircleMore size={19} className="text-brand-orange" />
          </div>
          <div className="mt-5 divide-y divide-brand-line">
            {followUps.map(([customer, action, due, channel]) => (
              <div key={`${customer}-${action}`} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-bold text-brand-ink">{customer}</p>
                  <p className="mt-1 text-xs text-brand-muted">{action} · {channel}</p>
                </div>
                <span className={`whitespace-nowrap text-xs font-bold ${due === 'Urgent' || due.includes('overdue') ? 'text-red-600' : 'text-brand-orange'}`}>{due}</span>
              </div>
            ))}
          </div>
          <Link to="/notifications" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark">
            Open communication queue <ArrowRight size={15} />
          </Link>
        </section>
      </div>

      <section className="rounded-2xl border border-brand-line bg-brand-graphite p-5 text-white shadow-soft sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange"><History size={20} /></div>
            <div>
              <h2 className="font-bold">From sale to lifecycle relationship</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">Every new odometer reading, tread measurement, rotation and inspection improves the next-action recommendation for that tyre and gives the branch a reason to reconnect with the customer.</p>
            </div>
          </div>
          <Link to="/tyres" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold hover:bg-white/10">
            Browse tyre passports <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
