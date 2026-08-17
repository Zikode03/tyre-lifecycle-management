import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Car,
  CheckCircle2,
  Clock3,
  Gauge,
  History,
  Plus,
  RadioTower,
  RefreshCw,
  Search,
  Send,
  UserRound,
  Wrench,
  X,
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { mileageReadings, vehicles } from '../data/mock';
import type { MileageReading, MileageSource } from '../types';

const sourceStyles: Record<MileageSource, string> = {
  Telematics: 'bg-emerald-50 text-emerald-700',
  Workshop: 'bg-orange-50 text-brand-orange',
  Customer: 'bg-blue-50 text-blue-700',
  GPS: 'bg-violet-50 text-violet-700',
  Estimated: 'bg-zinc-100 text-zinc-600',
};

const sourceIcons = {
  Telematics: RadioTower,
  Workshop: Wrench,
  Customer: UserRound,
  GPS: Gauge,
  Estimated: Clock3,
};

function getVehicleMileageReadings(vehicleId: string) {
  return mileageReadings.filter((reading) => reading.vehicleId === vehicleId);
}

function isReadingStale(reading?: MileageReading) {
  return !reading || reading.vehicleId === 'VEH-2004';
}

export default function VehiclesPage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId),
    [selectedVehicleId],
  );
  const selectedHistory = selectedVehicle ? getVehicleMileageReadings(selectedVehicle.id) : [];

  const handleDemoAction = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Vehicle registry"
        title="Vehicles"
        description="Monitor vehicle mileage freshness, tyre coverage and the source behind every odometer reading."
        action={
          <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800">
            <Plus size={16} /> Register vehicle
          </button>
        }
      />

      {feedback && (
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100">
          <CheckCircle2 size={17} /> {feedback}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-[22px] bg-white p-3 ring-1 ring-black/[0.045] md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            placeholder="Search registration, vehicle or customer"
            className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-100"
          />
        </div>
        <div className="flex items-center gap-2 px-1 text-[11px] font-semibold text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live mileage sources enabled
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {vehicles.map((vehicle) => {
          const readings = getVehicleMileageReadings(vehicle.id);
          const latest = readings[0];
          const stale = isReadingStale(latest);
          const SourceIcon = latest ? sourceIcons[latest.source] : Clock3;

          return (
            <article key={vehicle.id} className="overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(24,24,27,0.04),0_16px_36px_rgba(24,24,27,0.04)] ring-1 ring-black/[0.045]">
              <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F0EFEB] text-zinc-700">
                    <Car size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-base font-black tracking-[-0.02em] text-brand-ink">{vehicle.make} {vehicle.model}</p>
                    <p className="mt-1 truncate text-xs text-zinc-400">{vehicle.year} · {vehicle.customer}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-xl bg-[#202124] px-3 py-1.5 text-[11px] font-black tracking-wide text-white">{vehicle.registration}</span>
              </div>

              <div className="mx-5 rounded-[20px] bg-[#F5F4F0] p-4 sm:mx-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Current odometer</p>
                    <p className="mt-2 text-[30px] font-black leading-none tracking-[-0.045em] text-brand-ink">{vehicle.mileage.toLocaleString('en-ZA')} <span className="text-sm font-bold tracking-normal text-zinc-400">km</span></p>
                  </div>
                  {latest && (
                    <div className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-[11px] font-bold ${sourceStyles[latest.source]}`}>
                      <SourceIcon size={13} /> {latest.source}
                    </div>
                  )}
                </div>

                <div className="mt-4 grid gap-2 text-[11px] text-zinc-500 sm:grid-cols-3">
                  <div><span className="text-zinc-400">Verification</span><p className="mt-1 font-semibold text-zinc-700">{latest?.verification ?? 'Not available'}</p></div>
                  <div><span className="text-zinc-400">Provider</span><p className="mt-1 font-semibold text-zinc-700">{latest?.provider ?? 'Manual source'}</p></div>
                  <div><span className="text-zinc-400">Last update</span><p className="mt-1 font-semibold text-zinc-700">{latest?.capturedAt ?? 'No reading'}</p></div>
                </div>
              </div>

              {stale && (
                <div className="mx-5 mt-4 flex gap-3 rounded-2xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100 sm:mx-6">
                  <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-700" />
                  <div>
                    <p className="text-xs font-bold text-amber-900">Mileage needs an update</p>
                    <p className="mt-1 text-[11px] leading-5 text-amber-700">Prediction confidence is reduced until a newer reading is received.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 px-5 py-5 sm:px-6">
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tyres</p><p className="mt-1.5 text-sm font-black text-brand-ink">{vehicle.activeTyres} active</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mileage</p><p className={`mt-1.5 text-sm font-bold ${stale ? 'text-amber-700' : 'text-emerald-700'}`}>{stale ? 'Update needed' : 'Current'}</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Monitoring</p><p className="mt-1.5 text-sm font-bold text-brand-ink">Active</p></div>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.045] px-5 py-4 sm:px-6">
                <button onClick={() => setSelectedVehicleId(vehicle.id)} className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold text-zinc-500 transition hover:bg-[#F5F4F0] hover:text-zinc-800">
                  <History size={14} /> History
                </button>
                <button onClick={() => handleDemoAction(`Mileage update request queued for ${vehicle.customer}.`)} className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold text-zinc-500 transition hover:bg-[#F5F4F0] hover:text-brand-orange">
                  <Send size={14} /> Request mileage
                </button>
                <button onClick={() => handleDemoAction(`Manual mileage capture opened for ${vehicle.registration}.`)} className="ml-auto inline-flex h-9 items-center gap-2 rounded-xl bg-[#202124] px-3 text-xs font-bold text-white transition hover:bg-zinc-800">
                  <RefreshCw size={14} /> Record mileage <ArrowRight size={13} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-5">
          <button className="absolute inset-0" onClick={() => setSelectedVehicleId(null)} aria-label="Close mileage history" />
          <section className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-[30px] bg-[#F8F7F4] p-6 shadow-2xl sm:rounded-[30px] sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">Mileage audit trail</p>
                <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-brand-ink">{selectedVehicle.registration}</h2>
                <p className="mt-1 text-sm text-zinc-500">{selectedVehicle.make} {selectedVehicle.model} · {selectedVehicle.customer}</p>
              </div>
              <button onClick={() => setSelectedVehicleId(null)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-500 ring-1 ring-black/[0.05] hover:text-brand-ink">
                <X size={17} />
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.045]">
              {selectedHistory.map((reading, index) => {
                const SourceIcon = sourceIcons[reading.source];
                return (
                  <div key={reading.id} className="flex gap-4 border-b border-black/[0.045] p-4 last:border-b-0">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sourceStyles[reading.source]}`}>
                      <SourceIcon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-black text-brand-ink">{reading.odometerKm.toLocaleString('en-ZA')} km</p>
                          <p className="mt-1 text-[11px] text-zinc-400">{reading.source} · {reading.verification}</p>
                        </div>
                        <span className="text-[11px] font-medium text-zinc-400">{reading.capturedAt}</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-zinc-500">{reading.note}</p>
                      {reading.provider && <p className="mt-1 text-[11px] font-semibold text-zinc-700">Provider: {reading.provider}</p>}
                      {index === 0 && <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Current reading</span>}
                    </div>
                  </div>
                );
              })}

              {selectedHistory.length === 0 && (
                <div className="p-6 text-center text-sm text-zinc-500">No mileage readings recorded yet.</div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
