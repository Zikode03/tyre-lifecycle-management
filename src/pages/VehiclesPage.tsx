import { useMemo, useState } from 'react';
import {
  AlertTriangle,
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
  Telematics: 'bg-green-50 text-green-700',
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
  // Prototype rule: specific seeded vehicles demonstrate fresh vs stale states until dates come from the backend.
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
    <div className="space-y-6">
      <PageHeader
        eyebrow="Vehicle registry"
        title="Vehicles"
        description="View customer vehicles, current odometer readings, mileage sources and active tyre sets."
        action={
          <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white">
            <Plus size={17} /> Register vehicle
          </button>
        }
      />

      {feedback && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          <CheckCircle2 size={17} /> {feedback}
        </div>
      )}

      <div className="relative max-w-md">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          placeholder="Search registration, make or customer..."
          className="h-11 w-full rounded-xl border border-brand-line bg-white pl-10 pr-4 text-sm outline-none focus:border-brand-orange"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {vehicles.map((vehicle) => {
          const readings = getVehicleMileageReadings(vehicle.id);
          const latest = readings[0];
          const stale = isReadingStale(latest);
          const SourceIcon = latest ? sourceIcons[latest.source] : Clock3;

          return (
            <div key={vehicle.id} className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-canvas text-brand-orange">
                    <Car size={20} />
                  </div>
                  <div>
                    <p className="font-bold">{vehicle.make} {vehicle.model}</p>
                    <p className="mt-0.5 text-xs text-brand-muted">{vehicle.year} · {vehicle.customer}</p>
                  </div>
                </div>
                <span className="rounded-lg bg-brand-graphite px-2.5 py-1 text-xs font-bold text-white">{vehicle.registration}</span>
              </div>

              <div className="mt-5 rounded-2xl bg-brand-canvas p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Current odometer</p>
                    <p className="mt-1 text-2xl font-black text-brand-ink">{vehicle.mileage.toLocaleString('en-ZA')} km</p>
                  </div>
                  {latest && (
                    <div className={`inline-flex items-center gap-2 self-start rounded-full px-3 py-1.5 text-xs font-bold ${sourceStyles[latest.source]}`}>
                      <SourceIcon size={14} /> {latest.source}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted">
                  <span>{latest?.verification ?? 'No verification'}</span>
                  {latest?.provider && <span>Provider: <strong className="text-brand-ink">{latest.provider}</strong></span>}
                  {latest && <span>Updated: <strong className="text-brand-ink">{latest.capturedAt}</strong></span>}
                </div>
              </div>

              {stale && (
                <div className="mt-4 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber-700" />
                  <div>
                    <p className="text-sm font-bold text-amber-900">Mileage data is stale</p>
                    <p className="mt-1 text-xs leading-5 text-amber-700">Replacement predictions should use lower confidence until a newer odometer reading is received.</p>
                  </div>
                </div>
              )}

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-brand-line pt-4 text-sm sm:grid-cols-3">
                <div><p className="text-xs text-brand-muted">Active tyres</p><p className="mt-1 font-semibold">{vehicle.activeTyres}</p></div>
                <div><p className="text-xs text-brand-muted">Mileage status</p><p className={`mt-1 font-semibold ${stale ? 'text-amber-700' : 'text-green-700'}`}>{stale ? 'Update needed' : 'Current'}</p></div>
                <div><p className="text-xs text-brand-muted">Health</p><p className="mt-1 font-semibold text-green-700">Monitored</p></div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand-line px-3 text-sm font-semibold text-brand-muted hover:border-orange-200 hover:text-brand-orange"
                >
                  <History size={16} /> Mileage history
                </button>
                <button
                  onClick={() => handleDemoAction(`Mileage update request queued for ${vehicle.customer}.`)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand-line px-3 text-sm font-semibold text-brand-muted hover:border-orange-200 hover:text-brand-orange"
                >
                  <Send size={16} /> Request mileage
                </button>
                <button
                  onClick={() => handleDemoAction(`Manual mileage capture opened for ${vehicle.registration}.`)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-graphite px-3 text-sm font-bold text-white hover:bg-zinc-800"
                >
                  <RefreshCw size={16} /> Record mileage
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-5">
          <button className="absolute inset-0" onClick={() => setSelectedVehicleId(null)} aria-label="Close mileage history" />
          <section className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Mileage audit trail</p>
                <h2 className="mt-2 text-2xl font-black text-brand-ink">{selectedVehicle.registration}</h2>
                <p className="mt-1 text-sm text-brand-muted">{selectedVehicle.make} {selectedVehicle.model} · {selectedVehicle.customer}</p>
              </div>
              <button onClick={() => setSelectedVehicleId(null)} className="rounded-xl border border-brand-line p-2 text-brand-muted hover:bg-zinc-50">
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {selectedHistory.map((reading, index) => {
                const SourceIcon = sourceIcons[reading.source];
                return (
                  <div key={reading.id} className="flex gap-4 rounded-2xl border border-brand-line p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sourceStyles[reading.source]}`}>
                      <SourceIcon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-bold text-brand-ink">{reading.odometerKm.toLocaleString('en-ZA')} km</p>
                          <p className="mt-1 text-xs text-brand-muted">{reading.source} · {reading.verification}</p>
                        </div>
                        <span className="text-xs font-medium text-brand-muted">{reading.capturedAt}</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-brand-muted">{reading.note}</p>
                      {reading.provider && <p className="mt-1 text-xs font-semibold text-brand-ink">Provider: {reading.provider}</p>}
                      {index === 0 && <span className="mt-3 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700">Current reading</span>}
                    </div>
                  </div>
                );
              })}

              {selectedHistory.length === 0 && (
                <div className="rounded-2xl bg-brand-canvas p-6 text-center text-sm text-brand-muted">No mileage readings recorded yet.</div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
