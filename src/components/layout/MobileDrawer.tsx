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
      <button className="absolute inset-0 bg-black/45" onClick={onClose} aria-label="Close navigation" />
      <aside className="relative h-full w-[86%] max-w-[320px] bg-brand-graphite text-white shadow-2xl">
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <TyreTrackLogo light />
          <button onClick={onClose} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Close menu">
            <X size={19} />
          </button>
        </div>

        <nav className="space-y-1 p-3">
          {items.map(({ label, path, icon: Icon }) => (
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

          {canViewSettings && (() => {
            const SettingsIcon = settingsNavigationItem.icon;
            return (
              <NavLink
                to={settingsNavigationItem.path}
                onClick={onClose}
                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive ? 'bg-brand-orange text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
              >
                <SettingsIcon size={19} />
                {settingsNavigationItem.label}
              </NavLink>
            );
          })()}
        </nav>
      </aside>
    </div>
  );
}
