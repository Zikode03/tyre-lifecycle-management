import { Camera, ClipboardCheck, Filter, Plus, Search } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';

const inspections = [
  ['INS-1048', 'ND 452-981', 'Toyota Corolla Cross', 'Thando Mkhize', 'In progress', 'S. Dlamini', '08:42'],
  ['INS-1047', 'NU 193-442', 'Ford Ranger', 'Sibusiso Dlamini', 'Awaiting technician', 'Unassigned', '08:15'],
  ['INS-1046', 'ND 667-220', 'Hyundai Creta', 'Priya Naidoo', 'Booked', 'T. Mkhize', '09:30'],
  ['INS-1045', 'ND 812-774', 'Volkswagen Polo', 'Lerato Molefe', 'Completed', 'S. Dlamini', '07:55'],
];

export default function InspectionsPage() {
  return (
    <div className="space-y-7">
      <PageHeader eyebrow="Workshop operations" title="Tyre inspections" description="Work through tyre checks, capture evidence and complete technician recommendations." action={<button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white"><Plus size={16}/>Start inspection</button>} />

      <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
        <div className="flex flex-col gap-3 border-b border-black/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative w-full sm:max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input placeholder="Search registration, customer or inspection..." className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-100" />
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600"><Filter size={14}/>Filters</button>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600"><Camera size={14}/>Evidence</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead><tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><th className="px-5 py-3.5">Inspection</th><th className="px-5 py-3.5">Vehicle</th><th className="px-5 py-3.5">Customer</th><th className="px-5 py-3.5">Technician</th><th className="px-5 py-3.5">Started / booked</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5" /></tr></thead>
            <tbody className="divide-y divide-black/[0.045]">
              {inspections.map(([id, reg, vehicle, customer, status, technician, time]) => (
                <tr key={id} className="hover:bg-[#FBFAF7]">
                  <td className="px-5 py-4"><p className="text-sm font-black text-brand-ink">{id}</p></td>
                  <td className="px-5 py-4"><p className="text-sm font-bold text-brand-ink">{reg}</p><p className="mt-1 text-[11px] text-zinc-400">{vehicle}</p></td>
                  <td className="px-5 py-4 text-sm font-semibold text-zinc-700">{customer}</td>
                  <td className="px-5 py-4 text-sm text-zinc-500">{technician}</td>
                  <td className="px-5 py-4 text-sm text-zinc-500">{time}</td>
                  <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black ${status==='Completed'?'bg-emerald-50 text-emerald-700':status==='In progress'?'bg-orange-50 text-brand-orange':status==='Awaiting technician'?'bg-amber-50 text-amber-700':'bg-zinc-100 text-zinc-600'}`}>{status}</span></td>
                  <td className="px-5 py-4 text-right"><button className="inline-flex items-center gap-1.5 text-xs font-black text-brand-orange"><ClipboardCheck size={14}/>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
