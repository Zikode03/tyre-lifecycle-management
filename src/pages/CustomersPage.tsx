import { Download, MoreHorizontal, Plus, Search } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { customers } from '../data/mock';

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Customer management" title="Customers" description="Manage customer contact details, vehicles and tyre service relationships." action={<button className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-orange px-4 text-sm font-bold text-white hover:bg-brand-orange-dark"><Plus size={17}/>Add customer</button>} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1"><Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search name, mobile or email..." className="h-11 w-full rounded-xl border border-brand-line bg-white pl-10 pr-4 text-sm outline-none focus:border-brand-orange"/></div>
        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-brand-line bg-white px-4 text-sm font-semibold text-brand-muted hover:bg-zinc-50"><Download size={16}/>Export</button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-soft">
        <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-brand-canvas text-[11px] uppercase tracking-wider text-brand-muted"><tr><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Mobile</th><th className="px-5 py-3">Vehicles</th><th className="px-5 py-3">Last visit</th><th className="px-5 py-3">Status</th><th className="px-5 py-3"></th></tr></thead><tbody className="divide-y divide-brand-line">{customers.map((customer) => <tr key={customer.id} className="hover:bg-zinc-50/70"><td className="px-5 py-4"><p className="font-semibold">{customer.name}</p><p className="mt-0.5 text-xs text-brand-muted">{customer.email}</p></td><td className="px-5 py-4">{customer.mobile}</td><td className="px-5 py-4">{customer.vehicles}</td><td className="px-5 py-4 text-brand-muted">{customer.lastVisit}</td><td className="px-5 py-4"><span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">Active</span></td><td className="px-5 py-4"><button className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-brand-ink"><MoreHorizontal size={18}/></button></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}
