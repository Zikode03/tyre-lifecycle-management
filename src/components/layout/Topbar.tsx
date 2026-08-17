import { Bell, ChevronDown, Command, LogOut, Menu, Search, Settings, UserRound } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearDemoStaffSession, getDemoStaffSession } from '../../auth/demoAuth';

interface TopbarProps { onOpenMobileMenu: () => void; }

const destinations = [
  { terms: ['customer','customers','people'], path: '/customers' },
  { terms: ['vehicle','vehicles','car','registration'], path: '/vehicles' },
  { terms: ['tyre','tyres','tire','stock'], path: '/tyres' },
  { terms: ['inspection','inspections'], path: '/inspections' },
  { terms: ['booking','bookings','appointment'], path: '/bookings' },
  { terms: ['warranty','claim'], path: '/warranty' },
  { terms: ['notification','notifications','message'], path: '/notifications' },
  { terms: ['report','reports','analytics'], path: '/reports' },
  { terms: ['integration','integrations','mileage'], path: '/integrations' },
];

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const navigate = useNavigate();
  const user = getDemoStaffSession();
  const [search, setSearch] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => { clearDemoStaffSession(); navigate('/login', { replace: true }); };
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = search.trim().toLowerCase();
    if (!value) return;
    const match = destinations.find(item => item.terms.some(term => value.includes(term)));
    navigate(match?.path ?? '/dashboard');
    setSearch('');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.045] bg-[#F2F1ED]/94 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-full max-w-[1680px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button onClick={onOpenMobileMenu} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-white lg:hidden" aria-label="Open menu"><Menu size={20} /></button>
          <form onSubmit={handleSearch} className="relative hidden w-full max-w-[520px] md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
            <input value={search} onChange={e=>setSearch(e.target.value)} type="search" placeholder="Search customers, vehicles, tyres..." className="h-11 w-full rounded-[14px] border border-black/[0.055] bg-white pl-11 pr-16 text-sm text-brand-ink shadow-[0_1px_1px_rgba(24,24,27,.02)] outline-none transition placeholder:text-zinc-400 focus:border-orange-200 focus:ring-4 focus:ring-orange-100/60" />
            <button type="submit" className="absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-black/[0.04] bg-[#F5F4F0] px-2 py-1 text-[10px] font-semibold text-zinc-400"><Command size={10} /> Enter</button>
          </form>
        </div>
        <div className="relative flex shrink-0 items-center gap-2 sm:gap-3">
          <button onClick={()=>navigate('/notifications')} className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-zinc-500 transition hover:border-black/[0.05] hover:bg-white hover:text-brand-ink" aria-label="Notifications"><Bell size={18} strokeWidth={1.9} /><span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full bg-brand-orange ring-[3px] ring-[#F2F1ED]" /></button>
          <button onClick={()=>setProfileOpen(v=>!v)} className="group flex items-center gap-3 rounded-[16px] border border-black/[0.045] bg-white px-2.5 py-2 shadow-[0_1px_2px_rgba(24,24,27,.03)] transition hover:border-black/[0.08] hover:shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#202124] text-xs font-extrabold tracking-wide text-white">{user?.initials ?? 'TT'}</div>
            <div className="hidden min-w-0 text-left sm:block sm:min-w-[118px]"><p className="truncate text-[13px] font-bold leading-4 text-brand-ink">{user?.name ?? 'TyreTrack User'}</p><p className="mt-1 truncate text-[10px] font-medium leading-3 text-zinc-400">{user?.roleLabel ?? 'Staff'}</p></div>
            <ChevronDown size={15} className="hidden text-zinc-400 transition group-hover:text-zinc-600 sm:block" />
          </button>
          {profileOpen && <div className="absolute right-12 top-14 w-52 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.08]"><button onClick={()=>{setProfileOpen(false);navigate('/settings')}} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-[#F7F6F2]"><UserRound size={16}/>Profile & account</button><button onClick={()=>{setProfileOpen(false);navigate('/settings')}} className="flex w-full items-center gap-3 border-t border-black/[0.05] px-4 py-3 text-sm font-semibold text-zinc-700 hover:bg-[#F7F6F2]"><Settings size={16}/>System settings</button></div>}
          <button onClick={handleLogout} className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-red-50 hover:text-red-600" title="Sign out" aria-label="Sign out"><LogOut size={17} strokeWidth={1.9} /></button>
        </div>
      </div>
    </header>
  );
}
