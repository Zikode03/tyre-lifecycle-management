import {
  Activity,
  Bell,
  CalendarDays,
  Car,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Customers', path: '/customers', icon: Users },
  { label: 'Vehicles', path: '/vehicles', icon: Car },
  { label: 'Tyres', path: '/tyres', icon: Gauge },
  { label: 'Inspections', path: '/inspections', icon: ClipboardCheck },
  { label: 'Bookings', path: '/bookings', icon: CalendarDays },
  { label: 'Warranty', path: '/warranty', icon: ShieldCheck },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Reports', path: '/reports', icon: Activity },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-zinc-800 bg-brand-graphite text-white transition-all duration-300 lg:block ${collapsed ? 'w-[84px]' : 'w-[264px]'}`}>
      <div className="flex h-full flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange shadow-lg shadow-orange-950/20">
            <span className="text-lg font-black tracking-tighter">TT</span>
          </div>
          {!collapsed && (
            <div className="ml-3 min-w-0">
              <p className="truncate text-sm font-bold tracking-wide">TyreTrack Pro</p>
              <p className="truncate text-[11px] text-zinc-400">Lifecycle Management</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-md shadow-orange-950/10'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={19} className="shrink-0" />
              {!collapsed && <span className="ml-3">{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <NavLink
            to="/settings"
            className={({ isActive }) => `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Settings size={19} />
            {!collapsed && <span className="ml-3">Settings</span>}
          </NavLink>

          <button
            onClick={onToggle}
            className="mt-2 flex w-full items-center justify-center rounded-xl border border-white/10 py-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
