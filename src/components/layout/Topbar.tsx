import { Bell, Command, LogOut, Menu, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clearDemoStaffSession, getDemoStaffSession } from '../../auth/demoAuth';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const navigate = useNavigate();
  const user = getDemoStaffSession();

  const handleLogout = () => {
    clearDemoStaffSession();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/[0.045] bg-[#F2F1ED]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onOpenMobileMenu} className="rounded-xl p-2 text-zinc-600 hover:bg-white lg:hidden" aria-label="Open menu">
          <Menu size={20} />
        </button>

        <div className="relative hidden w-[340px] md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="search"
            placeholder="Search people, vehicles or tyres"
            className="h-10 w-full rounded-xl border border-black/[0.055] bg-white/70 pl-10 pr-16 text-sm text-brand-ink outline-none transition placeholder:text-zinc-400 focus:border-orange-200 focus:bg-white focus:ring-4 focus:ring-orange-100/60"
          />
          <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg bg-zinc-100 px-2 py-1 text-[10px] font-semibold text-zinc-400">
            <Command size={10} /> K
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-white" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-orange ring-2 ring-[#F2F1ED]" />
        </button>

        <div className="mx-1 hidden h-7 w-px bg-black/[0.07] sm:block" />

        <div className="flex items-center gap-2 rounded-2xl px-2 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#202124] text-xs font-black text-white shadow-sm">
            {user?.initials ?? 'TT'}
          </div>
          <div className="hidden min-w-[112px] sm:block">
            <p className="text-xs font-bold leading-tight text-brand-ink">{user?.name ?? 'TyreTrack User'}</p>
            <p className="mt-1 text-[10px] font-medium text-zinc-400">{user?.roleLabel ?? 'Staff'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white hover:text-red-600"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
