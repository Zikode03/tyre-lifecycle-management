import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent?: 'orange' | 'green' | 'amber' | 'red';
}

const accentStyles = {
  orange: 'bg-orange-50 text-brand-orange',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
};

/** Compact KPI tile used across dashboards without the heavy card chrome from V1. */
export function StatCard({ label, value, note, icon: Icon, accent = 'orange' }: StatCardProps) {
  return (
    <div className="group rounded-[22px] bg-white px-5 py-5 shadow-[0_1px_0_rgba(24,24,27,0.04),0_12px_28px_rgba(24,24,27,0.035)] ring-1 ring-black/[0.045] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(24,24,27,0.07)]">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentStyles[accent]}`}><Icon size={17} /></div>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <p className="text-[32px] font-black leading-none tracking-[-0.045em] text-brand-ink">{value}</p>
        <span className="mb-0.5 h-1.5 w-8 rounded-full bg-zinc-100 transition-all group-hover:w-12" />
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-500">{note}</p>
    </div>
  );
}
