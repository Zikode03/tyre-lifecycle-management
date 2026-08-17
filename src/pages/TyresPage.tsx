import { ArrowRight, Filter, Gauge, Plus, QrCode, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { tyres } from '../data/mock';

export default function TyresPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Tyre lifecycle"
        title="Tyre registry"
        description="Every tyre has one digital identity, a current wheel position and a traceable lifecycle record."
        action={
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800">
            <Plus size={16} /> Register tyre
          </button>
        }
      />

      <div className="flex flex-col gap-3 rounded-[22px] bg-white p-3 ring-1 ring-black/[0.045] md:flex-row md:items-center">
        <div className="relative min-w-0 flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            placeholder="Search tyre ID, brand, vehicle or registration"
            className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-zinc-500 transition hover:bg-[#F5F4F0] hover:text-zinc-800">
          <Filter size={16} /> Filters
        </button>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 text-sm font-bold text-brand-orange transition hover:bg-orange-100">
          <QrCode size={16} /> Scan QR
        </button>
      </div>

      <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(24,24,27,0.04),0_16px_36px_rgba(24,24,27,0.04)] ring-1 ring-black/[0.045]">
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Registered inventory</p>
            <h2 className="mt-1.5 text-lg font-black tracking-[-0.02em] text-brand-ink">Active tyre records</h2>
          </div>
          <div className="rounded-full bg-[#F2F1ED] px-3 py-1.5 text-[11px] font-bold text-zinc-500">{tyres.length} records</div>
        </div>

        <div className="px-3 pb-3">
          {tyres.map((tyre) => (
            <Link
              to={`/tyres/${tyre.id}`}
              key={tyre.id}
              className="group grid gap-4 rounded-2xl px-3 py-4 transition hover:bg-[#F6F5F1] md:grid-cols-[1.45fr_0.75fr_0.65fr_0.65fr_0.65fr_auto] md:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F0EFEB] text-zinc-700 transition group-hover:bg-[#202124] group-hover:text-white">
                  <Gauge size={18} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-brand-ink">{tyre.brand} {tyre.model}</p>
                  <p className="mt-1 truncate text-[11px] text-zinc-400">{tyre.reference} · {tyre.size}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Vehicle</p>
                <p className="mt-1 text-xs font-semibold text-zinc-700">{tyre.vehicle}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Position</p>
                <p className="mt-1 text-xs font-semibold text-zinc-700">{tyre.position}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mileage</p>
                <p className="mt-1 text-xs font-bold text-brand-ink">{tyre.mileage.toLocaleString('en-ZA')} km</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tread</p>
                <p className="mt-1 text-xs font-black text-brand-ink">{tyre.tread.toFixed(1)} mm</p>
              </div>
              <div className="flex items-center justify-between gap-3 md:justify-end">
                <StatusBadge status={tyre.status} />
                <ArrowRight size={14} className="text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-brand-orange" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
