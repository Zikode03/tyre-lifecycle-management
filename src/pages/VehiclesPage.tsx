import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CarFront,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Gauge,
  History,
  MoreHorizontal,
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

/**
 * A restrained vehicle silhouette gives the detail drawer a clear automotive identity
 * without turning the registry into an illustration-heavy marketing page.
 */
function VehicleSilhouette() {
  return (
    <svg viewBox="0 0 420 170" className="h-auto w-full" role="img" aria-label="Vehicle side profile">
      <defs>
        <linearGradient id="vehicleBody" x1="30" y1="55" x2="380" y2="145" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3F3F46" />
          <stop offset="1" stopColor="#18181B" />
        </linearGradient>
      </defs>
      <path d="M55 116c12-31 36-48 73-52l49-7c18-25 39-38 66-38h45c16 0 32 8 42 22l28 39 28 8c17 5 26 17 26 36v8H28v-8c0-16 10-27 27-28Z" fill="url(#vehicleBody)" />
      <path d="M193 57l18-24c8-10 19-15 31-15h42c11 0 20 5 27 14l21 29-139-4Z" fill="#D6D3D1" opacity="0.92" />
      <path d="M221 33v25M287 31l19 29" stroke="#A8A29E" strokeWidth="3" />
      <path d="M70 112h248" stroke="#52525B" strokeWidth="2" opacity="0.7" />
      <circle cx="116" cy="132" r="29" fill="#111113" stroke="#52525B" strokeWidth="5" />
      <circle cx="116" cy="132" r="12" fill="#F97316" />
      <circle cx="322" cy="132" r="29" fill="#111113" stroke="#52525B" strokeWidth="5" />
      <circle cx="322" cy="132" r="12" fill="#F97316" />
      <path d="M358 85h31" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function VehiclesPage() {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedVehicleId),
    [selectedVehicleId],
  );

  const selectedHistory = selectedVehicle ? getVehicleMileageReadings(selectedVehicle.id) : [];

  const filteredVehicles = useMemo(() => {
    const value = searchTerm.trim().toLowerCase();
    if (!value) return vehicles;

    return vehicles.filter((vehicle) =>
      [vehicle.registration, vehicle.make, vehicle.model, vehicle.customer]
        .some((field) => field.toLowerCase().includes(value)),
    );
  }, [searchTerm]);

  const handleDemoAction = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(null), 2600);
  };

  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Vehicle registry"
        title="Vehicles"
        description="Search and monitor every customer or fleet vehicle linked to tyre lifecycle records."
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

      <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(24,24,27,0.03),0_18px_45px_rgba(24,24,27,0.035)] ring-1 ring-black/[0.045]">
        <div className="flex flex-col gap-3 border-b border-black/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search registration, customer, make or model"
              className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600 transition hover:bg-zinc-100">
              <Filter size={14} /> Filters
            </button>
            <div className="hidden items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold text-zinc-400 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Mileage sources live
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                <th className="px-5 py-3.5">Registration</th>
                <th className="px-5 py-3.5">Customer / account</th>
                <th className="px-5 py-3.5">Vehicle</th>
                <th className="px-5 py-3.5">Odometer</th>
                <th className="px-5 py-3.5">Source</th>
                <th className="px-5 py-3.5">Tyres</th>
                <th className="px-5 py-3.5">Last update</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="w-14 px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.045]">
              {filteredVehicles.map((vehicle) => {
                const readings = getVehicleMileageReadings(vehicle.id);
                const latest = readings[0];
                const stale = isReadingStale(latest);
                const SourceIcon = latest ? sourceIcons[latest.source] : Clock3;

                return (
                  <tr
                    key={vehicle.id}
                    onClick={() => setSelectedVehicleId(vehicle.id)}
                    className="group cursor-pointer bg-white transition hover:bg-[#FBFAF7]"
                  >
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-[#202124] px-2.5 py-1 text-[11px] font-black tracking-wide text-white">
                        {vehicle.registration}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-brand-ink">{vehicle.customer}</p>
                      <p className="mt-1 text-[11px] text-zinc-400">Customer record linked</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EFEB] text-zinc-600">
                          <CarFront size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-brand-ink">{vehicle.make} {vehicle.model}</p>
                          <p className="mt-1 text-[11px] text-zinc-400">{vehicle.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-black text-brand-ink">{vehicle.mileage.toLocaleString('en-ZA')} km</p>
                      <p className="mt-1 text-[11px] text-zinc-400">Current reading</p>
                    </td>
                    <td className="px-5 py-4">
                      {latest ? (
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${sourceStyles[latest.source]}`}>
                          <SourceIcon size={12} /> {latest.source}
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-400">No source</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-brand-ink">{vehicle.activeTyres}</td>
                    <td className="px-5 py-4 text-xs font-medium text-zinc-500">{latest?.capturedAt ?? 'No reading'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${stale ? 'text-amber-700' : 'text-emerald-700'}`}>
                        <span className={`h-2 w-2 rounded-full ${stale ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        {stale ? 'Mileage stale' : 'Current'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedVehicleId(vehicle.id);
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white hover:text-brand-ink hover:shadow-sm"
                        aria-label={`Open ${vehicle.registration}`}
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-black/[0.045] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-400">Showing 1–{filteredVehicles.length} of 2,047 vehicles</p>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-[#F5F4F0] hover:text-brand-ink"><ChevronLeft size={15} /></button>
            {[1, 2, 3].map((page) => (
              <button key={page} className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold ${page === 1 ? 'bg-[#202124] text-white' : 'text-zinc-500 hover:bg-[#F5F4F0]'}`}>{page}</button>
            ))}
            <span className="px-1 text-xs text-zinc-400">…</span>
            <button className="flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold text-zinc-500 hover:bg-[#F5F4F0]">41</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-[#F5F4F0] hover:text-brand-ink"><ChevronRight size={15} /></button>
          </div>
        </div>
      </section>

      {selectedVehicle && (() => {
        const latest = selectedHistory[0];
        const stale = isReadingStale(latest);
        const SourceIcon = latest ? sourceIcons[latest.source] : Clock3;

        return (
          <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]">
            <button className="absolute inset-0" onClick={() => setSelectedVehicleId(null)} aria-label="Close vehicle details" />

            <aside className="absolute inset-y-0 right-0 z-10 w-full max-w-[520px] overflow-y-auto bg-[#F7F6F2] shadow-2xl">
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-black/[0.05] bg-[#F7F6F2]/95 px-5 py-4 backdrop-blur sm:px-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Vehicle quick view</p>
                  <p className="mt-1 text-sm font-black text-brand-ink">{selectedVehicle.registration}</p>
                </div>
                <button onClick={() => setSelectedVehicleId(null)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-500 ring-1 ring-black/[0.05] hover:text-brand-ink">
                  <X size={17} />
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <section className="overflow-hidden rounded-[26px] bg-[#202124] text-white">
                  <div className="relative px-5 pt-5">
                    <div className="absolute right-4 top-3 h-28 w-28 rounded-full bg-brand-orange/10 blur-3xl" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold text-zinc-400">{selectedVehicle.year}</p>
                        <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">{selectedVehicle.make} {selectedVehicle.model}</h2>
                        <p className="mt-2 text-sm text-zinc-400">{selectedVehicle.customer}</p>
                      </div>
                      <span className="rounded-xl bg-white/10 px-3 py-1.5 text-[11px] font-black tracking-wide ring-1 ring-white/10">{selectedVehicle.registration}</span>
                    </div>
                    <div className="relative mt-2 -mb-1">
                      <VehicleSilhouette />
                    </div>
                  </div>
                </section>

                <section className="rounded-[22px] bg-white p-5 ring-1 ring-black/[0.045]">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Current odometer</p>
                      <p className="mt-2 text-3xl font-black tracking-[-0.045em] text-brand-ink">{selectedVehicle.mileage.toLocaleString('en-ZA')} <span className="text-sm font-bold tracking-normal text-zinc-400">km</span></p>
                    </div>
                    {latest && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${sourceStyles[latest.source]}`}>
                        <SourceIcon size={12} /> {latest.source}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-black/[0.045] pt-4 text-xs">
                    <div><p className="text-zinc-400">Verification</p><p className="mt-1 font-bold text-brand-ink">{latest?.verification ?? 'Not available'}</p></div>
                    <div><p className="text-zinc-400">Last update</p><p className="mt-1 font-bold text-brand-ink">{latest?.capturedAt ?? 'No reading'}</p></div>
                  </div>
                </section>

                {stale && (
                  <div className="flex gap-3 rounded-[18px] bg-amber-50 p-4 ring-1 ring-amber-100">
                    <AlertTriangle size={17} className="mt-0.5 shrink-0 text-amber-700" />
                    <div>
                      <p className="text-xs font-black text-amber-900">Mileage needs an update</p>
                      <p className="mt-1 text-[11px] leading-5 text-amber-700">Tyre-life prediction confidence is reduced until a newer reading is received.</p>
                    </div>
                  </div>
                )}

                <section className="rounded-[22px] bg-white p-5 ring-1 ring-black/[0.045]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-brand-ink">Current tyre set</h3>
                      <p className="mt-1 text-[11px] text-zinc-400">Latest tyre positions and tread condition</p>
                    </div>
                    <span className="text-xs font-black text-brand-orange">{selectedVehicle.activeTyres} active</span>
                  </div>

                  <div className="relative mx-auto mt-5 max-w-[300px] rounded-[24px] bg-[#F5F4F0] px-7 py-8">
                    <div className="absolute left-1/2 top-7 h-[150px] w-[86px] -translate-x-1/2 rounded-[36px] border-2 border-dashed border-zinc-300" />
                    <div className="relative grid grid-cols-2 gap-x-20 gap-y-16">
                      {[
                        ['FL', '5.2 mm', 'Good'],
                        ['FR', '4.1 mm', 'Attention'],
                        ['RL', '5.8 mm', 'Good'],
                        ['RR', '2.1 mm', 'Critical'],
                      ].map(([position, tread, status]) => (
                        <div key={position} className="text-center">
                          <div className={`mx-auto flex h-12 w-8 items-center justify-center rounded-lg border-2 bg-[#202124] text-[9px] font-black text-white ${status === 'Critical' ? 'border-red-500' : status === 'Attention' ? 'border-amber-500' : 'border-zinc-600'}`}>
                            {position}
                          </div>
                          <p className="mt-2 text-[11px] font-black text-brand-ink">{tread}</p>
                          <p className={`mt-0.5 text-[9px] font-bold ${status === 'Critical' ? 'text-red-600' : status === 'Attention' ? 'text-amber-700' : 'text-emerald-700'}`}>{status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="rounded-[22px] bg-white p-5 ring-1 ring-black/[0.045]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Next attention</p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-brand-ink">Rotation due in 1,240 km</p>
                      <p className="mt-1 text-[11px] leading-5 text-zinc-500">Rear-right tread is also approaching the replacement threshold.</p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Gauge size={17} /></div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleDemoAction(`Mileage update request queued for ${selectedVehicle.customer}.`)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-600 ring-1 ring-black/[0.06] hover:text-brand-orange">
                    <Send size={14} /> Request mileage
                  </button>
                  <button onClick={() => handleDemoAction(`Manual mileage capture opened for ${selectedVehicle.registration}.`)} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#202124] text-xs font-bold text-white hover:bg-zinc-800">
                    <RefreshCw size={14} /> Record mileage
                  </button>
                  <button className="col-span-2 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange text-xs font-bold text-white hover:bg-brand-orange-dark">
                    Open full vehicle record <ArrowRight size={14} />
                  </button>
                </div>

                <section className="rounded-[22px] bg-white p-5 ring-1 ring-black/[0.045]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-brand-ink">Mileage history</h3>
                      <p className="mt-1 text-[11px] text-zinc-400">Latest captured readings</p>
                    </div>
                    <History size={16} className="text-zinc-300" />
                  </div>

                  <div className="mt-4 divide-y divide-black/[0.045]">
                    {selectedHistory.slice(0, 3).map((reading, index) => {
                      const HistorySourceIcon = sourceIcons[reading.source];
                      return (
                        <div key={reading.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${sourceStyles[reading.source]}`}>
                            <HistorySourceIcon size={15} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-xs font-black text-brand-ink">{reading.odometerKm.toLocaleString('en-ZA')} km</p>
                                <p className="mt-1 text-[10px] text-zinc-400">{reading.source} · {reading.verification}</p>
                              </div>
                              <p className="text-[10px] font-semibold text-zinc-400">{reading.capturedAt}</p>
                            </div>
                            {index === 0 && <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">Current</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </aside>
          </div>
        );
      })()}
    </div>
  );
}
