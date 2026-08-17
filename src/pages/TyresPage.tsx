import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Boxes, Filter, Gauge, PackageCheck, Plus, QrCode, RefreshCw, Search, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { StatusBadge } from '../components/ui/StatusBadge';
import { tyres } from '../data/mock';
import { getStockStatus, getTyreStock, type TyreStockItem } from '../services/inventoryService';

type TyreView = 'registered' | 'stock';

export default function TyresPage() {
  const [view, setView] = useState<TyreView>('registered');
  const [stock, setStock] = useState<TyreStockItem[]>([]);
  const [stockLoading, setStockLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getTyreStock().then(items => {
      setStock(items);
      setStockLoading(false);
    });
  }, []);

  const filteredStock = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return stock;
    return stock.filter(item => [item.sku, item.brand, item.model, item.size, item.branch].some(value => value.toLowerCase().includes(term)));
  }, [search, stock]);

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Tyre management" title="Tyres" description="Manage registered tyre passports and check replacement stock from the shop's inventory system." action={<button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800"><Plus size={16} /> Register tyre</button>} />

      <div className="flex flex-col gap-3 rounded-[22px] bg-white p-3 ring-1 ring-black/[0.045] md:flex-row md:items-center md:justify-between">
        <div className="inline-flex w-fit rounded-xl bg-[#F3F2EE] p-1">
          <button onClick={() => { setView('registered'); setSearch(''); }} className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${view === 'registered' ? 'bg-white text-brand-ink shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}><Gauge size={14}/>Registered tyres</button>
          <button onClick={() => { setView('stock'); setSearch(''); }} className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${view === 'stock' ? 'bg-white text-brand-ink shadow-sm' : 'text-zinc-500 hover:text-zinc-800'}`}><Boxes size={14}/>Stock</button>
        </div>
        <div className="flex flex-1 flex-col gap-2 md:max-w-2xl md:flex-row md:justify-end">
          <div className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input value={search} onChange={event => setSearch(event.target.value)} placeholder={view === 'registered' ? 'Search tyre ID, brand, vehicle or registration' : 'Search SKU, brand, size or branch'} className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-orange-100"/></div>
          {view === 'registered' ? <><button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-zinc-500 transition hover:bg-[#F5F4F0] hover:text-zinc-800"><Filter size={16}/>Filters</button><button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 text-sm font-bold text-brand-orange transition hover:bg-orange-100"><QrCode size={16}/>Scan QR</button></> : <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white"><RefreshCw size={15}/>Sync stock</button>}
        </div>
      </div>

      {view === 'registered' ? (
        <section className="overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(24,24,27,0.04),0_16px_36px_rgba(24,24,27,0.04)] ring-1 ring-black/[0.045]">
          <div className="flex items-center justify-between px-6 py-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Tyre registry</p><h2 className="mt-1.5 text-lg font-black tracking-[-0.02em] text-brand-ink">Registered tyre records</h2><p className="mt-1 text-xs text-zinc-400">Select a tyre to open its digital passport.</p></div><div className="rounded-full bg-[#F2F1ED] px-3 py-1.5 text-[11px] font-bold text-zinc-500">{tyres.length} records</div></div>
          <div className="px-3 pb-3">{tyres.map(tyre => <Link to={`/tyres/${tyre.id}`} key={tyre.id} className="group grid min-h-[82px] gap-4 rounded-2xl px-3 py-3 transition hover:bg-[#F6F5F1] md:grid-cols-[1.45fr_0.75fr_0.65fr_0.75fr_0.65fr_150px] md:items-center"><div className="flex min-h-12 min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F0EFEB] text-zinc-700 transition group-hover:bg-[#202124] group-hover:text-white"><Gauge size={18}/></div><div className="min-w-0"><p className="truncate text-sm font-bold leading-5 text-brand-ink">{tyre.brand} {tyre.model}</p><p className="mt-0.5 truncate text-xs leading-5 text-zinc-400">{tyre.reference} · {tyre.size}</p></div></div><div className="record-cell"><p className="record-label">Vehicle</p><p className="record-value font-semibold text-zinc-700">{tyre.vehicle}</p></div><div className="record-cell"><p className="record-label">Position</p><p className="record-value font-semibold text-zinc-700">{tyre.position}</p></div><div className="record-cell"><p className="record-label">Mileage</p><p className="record-value font-bold text-brand-ink">{tyre.mileage.toLocaleString('en-ZA')} km</p></div><div className="record-cell"><p className="record-label">Tread</p><p className="record-value font-bold text-brand-ink">{tyre.tread.toFixed(1)} mm</p></div><div className="flex min-h-12 items-center justify-between gap-3 md:justify-end"><StatusBadge status={tyre.status}/><div className="flex items-center gap-1 text-xs font-semibold text-zinc-400 transition group-hover:text-brand-orange">Passport <ArrowRight size={14}/></div></div></Link>)}</div>
        </section>
      ) : (
        <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
          <div className="flex flex-col gap-4 border-b border-black/[0.05] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><div className="flex items-center gap-2"><Warehouse size={17} className="text-brand-orange"/><h2 className="text-lg font-black text-brand-ink">Inventory stock</h2></div><p className="mt-1 text-xs text-zinc-400">Prototype feed shaped for the tyre shop's ordering / POS / ERP integration.</p></div><div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"><PackageCheck size={15}/>Inventory feed connected</div></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left"><thead><tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><th className="px-5 py-3.5">Tyre</th><th className="px-5 py-3.5">SKU</th><th className="px-5 py-3.5">Branch</th><th className="px-5 py-3.5">Available</th><th className="px-5 py-3.5">Selling price</th><th className="px-5 py-3.5">Status</th></tr></thead><tbody className="divide-y divide-black/[0.045]">{stockLoading ? <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-zinc-400">Loading inventory…</td></tr> : filteredStock.map(item => { const status = getStockStatus(item.quantity); return <tr key={item.sku} className="transition hover:bg-[#FBFAF7]"><td className="px-5 py-4"><p className="text-sm font-bold text-brand-ink">{item.brand} {item.model}</p><p className="mt-1 text-xs text-zinc-400">{item.size}</p></td><td className="px-5 py-4 text-sm font-semibold text-zinc-600">{item.sku}</td><td className="px-5 py-4 text-sm text-zinc-600">{item.branch}</td><td className="px-5 py-4"><p className="text-lg font-extrabold text-brand-ink">{item.quantity}</p><p className="mt-0.5 text-[10px] text-zinc-400">units</p></td><td className="px-5 py-4 text-sm font-bold text-brand-ink">R {item.sellingPrice.toLocaleString('en-ZA')}</td><td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${status === 'In stock' ? 'bg-emerald-50 text-emerald-700' : status === 'Low stock' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>{status}</span></td></tr> })}</tbody></table></div>
          <div className="border-t border-black/[0.05] px-5 py-3 text-[10px] text-zinc-400 sm:px-6">Last synced from prototype inventory feed. The real provider API will replace this adapter later.</div>
        </section>
      )}
    </div>
  );
}
