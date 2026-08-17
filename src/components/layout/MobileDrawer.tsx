import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { getDemoStaffSession } from '../../auth/demoAuth';
import { getNavigationForRole, settingsNavigationItem } from '../../config/navigation';
import { TyreTrackLogo } from '../brand/TyreTrackLogo';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const user = getDemoStaffSession();
  const items = user ? getNavigationForRole(user.role) : [];
  const canViewSettings = user ? settingsNavigationItem.roles.includes(user.role) : false;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} aria-label="Close navigation" />
      <aside className="surface-grain relative h-full w-[86%] max-w-[310px] bg-[#191A1B] text-white shadow-2xl">
        <div className="flex h-[88px] items-center justify-between px-5">
          <TyreTrackLogo light />
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:bg-white/[0.06] hover:text-white" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-3 pt-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Workspace</p>
        </div>

        <nav className="space-y-1 px-3">
          {items.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) => `relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${isActive ? 'bg-white/[0.075] text-white' : 'text-zinc-500 hover:bg-white/[0.045] hover:text-zinc-200'}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 h-5 w-[3px] rounded-r-full bg-brand-orange" />}
                  <Icon size={18} className={isActive ? 'text-brand-orange' : 'text-zinc-600'} />
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {canViewSettings && (() => {
            const SettingsIcon = settingsNavigationItem.icon;
            return (
              <NavLink
                to={settingsNavigationItem.path}
                onClick={onClose}
                className={({ isActive }) => `relative flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition ${isActive ? 'bg-white/[0.075] text-white' : 'text-zinc-500 hover:bg-white/[0.045] hover:text-zinc-200'}`}
              >
                <SettingsIcon size={18} />
                {settingsNavigationItem.label}
              </NavLink>
            );
          })()}
        </nav>
      </aside>
    </div>
  );
}
