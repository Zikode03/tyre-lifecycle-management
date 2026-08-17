import { AlertTriangle, Calculator, CheckCircle2, Clock3, Gauge, HelpCircle } from 'lucide-react';

type TreadReadingState = 'measured' | 'stale' | 'estimated' | 'missing';
type TreadHealth = 'Good' | 'Attention' | 'Critical' | 'Unknown';

interface TyrePositionReading {
  position: 'FL' | 'FR' | 'RL' | 'RR';
  depthMm?: number;
  health: TreadHealth;
  state: TreadReadingState;
  capturedAt?: string;
  source?: string;
  technician?: string;
}

const demoReadings: TyrePositionReading[] = [
  {
    position: 'FL',
    depthMm: 5.2,
    health: 'Good',
    state: 'measured',
    capturedAt: '14 Aug 2026',
    source: 'Workshop inspection',
    technician: 'S. Dlamini',
  },
  {
    position: 'FR',
    depthMm: 4.1,
    health: 'Attention',
    state: 'stale',
    capturedAt: '02 Apr 2026',
    source: 'Workshop inspection',
    technician: 'S. Dlamini',
  },
  {
    position: 'RL',
    depthMm: 4.8,
    health: 'Good',
    state: 'estimated',
    capturedAt: 'Estimate from last inspection + mileage',
    source: 'TyreTrack estimate',
  },
  {
    position: 'RR',
    health: 'Unknown',
    state: 'missing',
    source: 'No tread measurement recorded',
  },
];

const statePresentation = {
  measured: {
    label: 'Measured',
    icon: CheckCircle2,
    badge: 'bg-emerald-50 text-emerald-700',
    tyreBorder: 'border-emerald-500',
  },
  stale: {
    label: 'Old reading',
    icon: Clock3,
    badge: 'bg-amber-50 text-amber-700',
    tyreBorder: 'border-amber-500',
  },
  estimated: {
    label: 'Estimated',
    icon: Calculator,
    badge: 'bg-blue-50 text-blue-700',
    tyreBorder: 'border-blue-500',
  },
  missing: {
    label: 'Not measured',
    icon: HelpCircle,
    badge: 'bg-zinc-100 text-zinc-600',
    tyreBorder: 'border-zinc-400 border-dashed',
  },
} as const;

const healthStyles: Record<TreadHealth, string> = {
  Good: 'text-emerald-700',
  Attention: 'text-amber-700',
  Critical: 'text-red-600',
  Unknown: 'text-zinc-500',
};

/**
 * Shows what TyreTrack actually knows about each tyre position.
 * A tread number is never presented without its evidence state: measured,
 * stale, estimated, or not yet measured.
 */
export function CurrentTyreSet({ activeTyres }: { activeTyres: number }) {
  return (
    <section className="rounded-[22px] bg-white p-5 ring-1 ring-black/[0.045]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-brand-ink">Current tyre set</h3>
          <p className="mt-1 text-[11px] leading-5 text-zinc-400">Position, latest tread evidence and measurement freshness</p>
        </div>
        <span className="shrink-0 text-xs font-black text-brand-orange">{activeTyres} active</span>
      </div>

      <div className="mt-5 rounded-[24px] bg-[#F5F4F0] p-4 sm:p-5">
        <div className="relative mx-auto max-w-[360px]">
          <div className="pointer-events-none absolute left-1/2 top-5 h-[205px] w-[96px] -translate-x-1/2 rounded-[42px] border-2 border-dashed border-zinc-300/80" />
          <div className="relative grid grid-cols-2 gap-x-16 gap-y-8 sm:gap-x-24">
            {demoReadings.map((reading) => {
              const presentation = statePresentation[reading.state];
              const StateIcon = presentation.icon;

              return (
                <button
                  key={reading.position}
                  type="button"
                  title={[
                    reading.depthMm !== undefined ? `${reading.depthMm.toFixed(1)} mm` : 'No tread reading',
                    presentation.label,
                    reading.capturedAt,
                    reading.source,
                    reading.technician ? `Technician: ${reading.technician}` : undefined,
                  ].filter(Boolean).join(' • ')}
                  className="group text-center"
                >
                  <div className={`mx-auto flex h-12 w-8 items-center justify-center rounded-lg border-2 bg-[#202124] text-[9px] font-black text-white transition group-hover:-translate-y-0.5 ${presentation.tyreBorder}`}>
                    {reading.position}
                  </div>

                  <p className="mt-2 text-[12px] font-black text-brand-ink">
                    {reading.depthMm !== undefined ? `${reading.state === 'estimated' ? '~' : ''}${reading.depthMm.toFixed(1)} mm` : 'No reading'}
                  </p>
                  <p className={`mt-0.5 text-[9px] font-bold ${healthStyles[reading.health]}`}>{reading.health}</p>

                  <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${presentation.badge}`}>
                    <StateIcon size={10} /> {presentation.label}
                  </span>

                  {reading.state === 'measured' && (
                    <p className="mt-1.5 text-[9px] font-medium text-zinc-400">{reading.capturedAt}</p>
                  )}
                  {reading.state === 'stale' && (
                    <p className="mt-1.5 text-[9px] font-medium text-amber-600">Measured {reading.capturedAt}</p>
                  )}
                  {reading.state === 'estimated' && (
                    <p className="mt-1.5 text-[9px] font-medium leading-4 text-blue-600">Not physically measured</p>
                  )}
                  {reading.state === 'missing' && (
                    <p className="mt-1.5 text-[9px] font-medium text-zinc-400">Inspection required</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="flex gap-2.5 rounded-2xl bg-emerald-50/70 p-3">
          <Gauge size={15} className="mt-0.5 shrink-0 text-emerald-700" />
          <p className="text-[10px] leading-4 text-emerald-800"><strong>Measured</strong> values come from an inspection or supported tread device.</p>
        </div>
        <div className="flex gap-2.5 rounded-2xl bg-amber-50/70 p-3">
          <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-700" />
          <p className="text-[10px] leading-4 text-amber-800"><strong>Estimated or old</strong> readings must not be treated as a current physical measurement.</p>
        </div>
      </div>
    </section>
  );
}
