import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  accent?: 'orange' | 'green' | 'amber' | 'red';
}

const accentStyles = {
  orange: 'bg-orange-50 text-brand-orange',
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
};

export function StatCard({ label, value, note, icon: Icon, accent = 'orange' }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-brand-line bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className={`rounded-xl p-2.5 ${accentStyles[accent]}`}><Icon size={20} /></div>
        <ArrowUpRight size={17} className="text-zinc-300" />
      </div>
      <p className="mt-5 text-sm font-medium text-brand-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-brand-ink">{value}</p>
      <p className="mt-2 text-xs text-brand-muted">{note}</p>
    </div>
  );
}
