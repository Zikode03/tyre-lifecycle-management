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
    <aside className={`fixed inset-y-0 left-0 z-40 hidden bg-[#191A1B] text-white transition-all duration-300 lg:block ${collapsed ? 'w-[88px]' : 'w-[248px]'}`}>
      <div className="surface-grain flex h-full flex-col">
        <div className={`flex h-[88px] items-center ${collapsed ? 'justify-center px-3' : 'px-5'}`}>
          <TyreTrackLogo light compact={collapsed} />
        </div>

        {!collapsed && (
          <div className="px-5 pb-3 pt-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Workspace</p>
          </div>
        )}

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `group relative flex h-11 items-center rounded-xl px-3 text-sm transition ${
                  isActive
                    ? 'bg-white/[0.075] font-semibold text-white'
                    : 'font-medium text-zinc-500 hover:bg-white/[0.045] hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 h-5 w-[3px] rounded-r-full bg-brand-orange" />}
                  <Icon size={18} className={`shrink-0 ${isActive ? 'text-brand-orange' : 'text-zinc-600 group-hover:text-zinc-300'}`} />
                  {!collapsed && <span className="ml-3">{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mx-3 mb-3 rounded-2xl bg-white/[0.035] p-2 ring-1 ring-white/[0.055]">
          {canViewSettings && (
            <NavLink
              to={settingsNavigationItem.path}
              className={({ isActive }) => `flex h-10 items-center rounded-xl px-3 text-sm font-medium transition ${isActive ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200'}`}
            >
              <SettingsIcon size={18} />
              {!collapsed && <span className="ml-3">{settingsNavigationItem.label}</span>}
            </NavLink>
          )}

          <button
            onClick={onToggle}
            className="mt-1 flex h-9 w-full items-center justify-center rounded-xl text-zinc-600 transition hover:bg-white/[0.04] hover:text-white"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
