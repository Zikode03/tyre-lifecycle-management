import { Bell, ChevronDown, Menu, Search } from 'lucide-react';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-brand-line bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button onClick={onOpenMobileMenu} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden" aria-label="Open menu">
          <Menu size={21} />
        </button>
        <div className="relative hidden w-72 md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
          <input
            type="search"
            placeholder="Search customer, vehicle or tyre..."
            className="h-10 w-full rounded-xl border border-brand-line bg-brand-canvas pl-10 pr-3 text-sm outline-none transition focus:border-brand-orange focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative rounded-xl border border-brand-line bg-white p-2.5 text-zinc-600 hover:bg-zinc-50" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-orange ring-2 ring-white" />
        </button>
        <div className="hidden h-8 w-px bg-brand-line sm:block" />
        <button className="flex items-center gap-3 rounded-xl p-1.5 pr-2 hover:bg-zinc-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-graphite text-sm font-bold text-white">NM</div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold leading-tight text-brand-ink">N. Mthembu</p>
            <p className="mt-0.5 text-[11px] text-brand-muted">Branch Manager</p>
          </div>
          <ChevronDown size={15} className="hidden text-zinc-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
