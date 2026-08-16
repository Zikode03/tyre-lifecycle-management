import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getDemoStaffSession } from '../../auth/demoAuth';
import { getNavigationForRole, settingsNavigationItem } from '../../config/navigation';
import { TyreTrackLogo } from '../brand/TyreTrackLogo';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const user = getDemoStaffSession();
  const navItems = user ? getNavigationForRole(user.role) : [];
  const canViewSettings = user ? settingsNavigationItem.roles.includes(user.role) : false;
  const SettingsIcon = settingsNavigationItem.icon;

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 hidden border-r border-zinc-800 bg-brand-graphite text-white transition-all duration-300 lg:block ${collapsed ? 'w-[84px]' : 'w-[264px]'}`}>
      <div className="flex h-full flex-col">
        <div className={`flex h-20 items-center border-b border-white/10 ${collapsed ? 'justify-center px-3' : 'px-5'}`}>
          <TyreTrackLogo light compact={collapsed} />
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
          {canViewSettings && (
            <NavLink
              to={settingsNavigationItem.path}
              className={({ isActive }) => `flex items-center rounded-xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
            >
              <SettingsIcon size={19} />
              {!collapsed && <span className="ml-3">{settingsNavigationItem.label}</span>}
            </NavLink>
          )}

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
