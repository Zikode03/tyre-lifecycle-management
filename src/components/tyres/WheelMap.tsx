import type { Tyre } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';

interface WheelMapProps {
  tyres: Tyre[];
}

const positions = ['Front Left', 'Front Right', 'Rear Left', 'Rear Right'];

export function WheelMap({ tyres }: WheelMapProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {positions.map((position) => {
        const tyre = tyres.find((item) => item.position === position);
        return (
          <div key={position} className="rounded-2xl border border-brand-line bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-muted">{position}</p>
                <p className="mt-1 text-sm font-semibold text-brand-ink">{tyre?.brand ?? 'No tyre assigned'}</p>
              </div>
              {tyre && <StatusBadge status={tyre.status} />}
            </div>
            {tyre && (
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-brand-muted">Tread</p><p className="mt-1 font-semibold">{tyre.tread.toFixed(1)} mm</p></div>
                <div><p className="text-brand-muted">Mileage</p><p className="mt-1 font-semibold">{tyre.mileage.toLocaleString('en-ZA')} km</p></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
