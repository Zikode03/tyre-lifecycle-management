import {
  Activity,
  Bell,
  CalendarDays,
  Car,
  ClipboardCheck,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  ['Dashboard', '/dashboard', LayoutDashboard],
  ['Customers', '/customers', Users],
  ['Vehicles', '/vehicles', Car],
  ['Tyres', '/tyres', Gauge],
  ['Inspections', '/inspections', ClipboardCheck],
  ['Bookings', '/bookings', CalendarDays],
  ['Warranty', '/warranty', ShieldCheck],
  ['Notifications', '/notifications', Bell],
  ['Reports', '/reports', Activity],
  ['Settings', '/settings', Settings],
] as const;

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button className="absolute inset-0 bg-black/45" onClick={onClose} aria-label="Close navigation" />
      <aside className="relative h-full w-[86%] max-w-[320px] bg-brand-graphite text-white shadow-2xl">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-orange font-black">TT</div>
            <div>
              <p className="text-sm font-bold">TyreTrack Pro</p>
              <p className="text-[11px] text-zinc-400">Lifecycle Management</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Close menu">
            <X size={19} />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {items.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive ? 'bg-brand-orange text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
