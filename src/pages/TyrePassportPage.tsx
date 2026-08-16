import {
  ArrowLeft,
  CalendarClock,
  Camera,
  Gauge,
  History,
  QrCode,
  RotateCcw,
  ShieldCheck,
  TrendingDown,
  Wrench,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/ui/StatusBadge';
import { WheelMap } from '../components/tyres/WheelMap';
import { tyres } from '../data/mock';

export default function TyrePassportPage() {
  const { tyreId } = useParams();
  const tyre = tyres.find((item) => item.id === tyreId) ?? tyres[0];
  const vehicleTyres = tyres.filter((item) => item.vehicle === tyre.vehicle);

  // Frontend-only forecast values. Backend services will eventually calculate
  // these from real tread, odometer, age and inspection history.
  const treadHistory = [
    ['18 Nov 2025', 8.0, '20,000 km'],
    ['02 Apr 2026', 6.4, '29,540 km'],
    ['07 Jun 2026', 4.9, '36,820 km'],
    ['14 Aug 2026', tyre.tread, '48,240 km'],
  ] as const;

  const projectedReview = tyre.tread <= 2.5 ? 'Within 30 days' : tyre.tread <= 3.5 ? 'Within 60–90 days' : 'Monitor at next service';

  return (
    <div className="space-y-6">
      <Link to="/tyres" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-ink">
        <ArrowLeft size={16} /> Back to tyres
      </Link>

      <section className="rounded-3xl bg-brand-graphite p-6 text-white shadow-soft sm:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-brand-orange px-2.5 py-1 text-xs font-bold">DIGITAL TYRE PASSPORT</span>
              <StatusBadge status={tyre.status} />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight">{tyre.brand} {tyre.model}</h1>
            <p className="mt-2 text-sm text-zinc-400">{tyre.size} · {tyre.reference}</p>
          </div>
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-brand-graphite"><QrCode size={42} /></div>
        </div>

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Vehicle', tyre.vehicle],
            ['Position', tyre.position],
            ['Tyre mileage', `${tyre.mileage.toLocaleString('en-ZA')} km`],
            ['Latest tread', `${tyre.tread.toFixed(1)} mm`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-zinc-500">{label}</p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Wear trend</p>
              <h2 className="mt-2 font-bold text-brand-ink">Tread & mileage history</h2>
              <p className="mt-1 text-xs text-brand-muted">Historic readings show how quickly the tyre is wearing between visits.</p>
            </div>
            <TrendingDown size={20} className="text-brand-orange" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {treadHistory.map(([date, tread, odometer]) => (
              <div key={date} className="rounded-xl bg-brand-canvas p-4">
                <p className="text-[11px] font-semibold text-brand-muted">{date}</p>
                <p className="mt-2 text-xl font-black text-brand-ink">{Number(tread).toFixed(1)} mm</p>
                <p className="mt-1 text-[11px] text-brand-muted">{odometer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Projected next action</p>
          <p className="mt-3 text-2xl font-black tracking-tight text-brand-ink">{projectedReview}</p>
          <p className="mt-2 text-sm leading-6 text-brand-muted">Based on the latest tread depth, tyre mileage and recorded wear pattern.</p>
          <div className="mt-5 rounded-xl border border-orange-200 bg-white p-4">
            <p className="text-sm font-bold text-brand-ink">Recommended action</p>
            <p className="mt-1 text-xs leading-5 text-brand-muted">Inspect tread again, confirm alignment condition and prepare the customer for replacement if wear continues at the current rate.</p>
          </div>
          <Link to="/lifecycle" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-orange hover:text-brand-orange-dark">
            View lifecycle centre
          </Link>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div><h2 className="font-bold">Vehicle wheel map</h2><p className="mt-1 text-xs text-brand-muted">Current tyre positions and latest recorded health</p></div>
            <RotateCcw size={18} className="text-zinc-300" />
          </div>
          <div className="mt-5"><WheelMap tyres={vehicleTyres} /></div>
        </section>

        <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
          <h2 className="font-bold">Latest health assessment</h2>
          <p className="mt-1 text-xs text-brand-muted">Inspection recorded 14 Aug 2026</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ['Inner', '2.3 mm'],
              ['Centre', `${tyre.tread.toFixed(1)} mm`],
              ['Outer', '2.4 mm'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-brand-canvas p-3">
                <p className="text-xs text-brand-muted">{label}</p>
                <p className="mt-1 font-bold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-900">Attention required</p>
            <p className="mt-1 text-xs leading-5 text-amber-700">Latest inspection indicates uneven wear. Wheel alignment and tread recheck are recommended.</p>
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
        <h2 className="font-bold">Lifecycle timeline</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {[
            [ShieldCheck, 'Tyre fitted', '18 Nov 2025', 'Started at 20,000 km'],
            [RotateCcw, 'Tyres rotated', '02 Apr 2026', 'Odometer 29,540 km'],
            [Wrench, 'Alignment completed', '07 Jun 2026', 'Front toe corrected'],
            [Camera, 'Inspection completed', '14 Aug 2026', 'Uneven wear observed'],
          ].map(([Icon, title, date, note]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={String(title)} className="rounded-2xl border border-brand-line p-4">
                <I size={19} className="text-brand-orange" />
                <p className="mt-3 text-sm font-bold">{String(title)}</p>
                <p className="mt-1 text-xs text-brand-muted">{String(date)}</p>
                <p className="mt-3 text-xs font-medium text-brand-ink">{String(note)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [History, 'View full history'],
          [Gauge, 'Record odometer'],
          [CalendarClock, 'Schedule follow-up'],
        ].map(([Icon, label]) => {
          const I = Icon as typeof History;
          return (
            <button key={String(label)} className="flex items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-4 py-3 text-sm font-semibold hover:border-orange-200 hover:text-brand-orange">
              <I size={17} />{String(label)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
