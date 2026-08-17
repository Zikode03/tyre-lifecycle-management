import { CheckCircle2, Clock3, Search, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';

const claims = [
  { id:'WAR-2041', tyreId:'TYR-3004', tyre:'Continental UltraContact', reference:'TTP-8H4L95', vehicle:'ND 452-981', customer:'Thando Mkhize', type:'Manufacturer warranty', issue:'Sidewall separation', status:'Evidence review', supplier:'Continental', opened:'15 Aug 2026', eligibility:'Likely eligible' },
  { id:'WAR-2038', tyreId:'TYR-3010', tyre:'Bridgestone Turanza', reference:'TTP-KQ1192', vehicle:'ND 812-774', customer:'Lerato Molefe', type:'Road-hazard plan', issue:'Pothole impact', status:'Awaiting supplier', supplier:'Bridgestone', opened:'12 Aug 2026', eligibility:'Plan dependent' },
  { id:'WAR-2031', tyreId:'TYR-3002', tyre:'Continental UltraContact', reference:'TTP-8H4L93', vehicle:'ND 452-981', customer:'Thando Mkhize', type:'Manufacturer warranty', issue:'Premature casing defect', status:'Approved', supplier:'Continental', opened:'06 Aug 2026', eligibility:'Eligible' },
];

export default function WarrantyPage(){
  return <div className="space-y-6">
    <PageHeader eyebrow="After-sale protection" title="Warranty" description="Review tyre warranty coverage, inspection evidence and supplier claim decisions." />

    <section className="overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.045]">
      <div className="flex flex-col gap-3 border-b border-black/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative w-full sm:max-w-md"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"/><input placeholder="Search claim, tyre, vehicle or customer" className="h-11 w-full rounded-xl bg-[#F5F4F0] pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-orange-100"/></div>
        <select className="h-10 rounded-xl bg-[#F5F4F0] px-3 text-xs font-bold text-zinc-600 outline-none"><option>All claim statuses</option><option>Evidence review</option><option>Awaiting supplier</option><option>Approved</option><option>Rejected</option></select>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left"><thead><tr className="bg-[#FAF9F6] text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400"><th className="px-5 py-3.5">Claim / tyre</th><th className="px-5 py-3.5">Customer</th><th className="px-5 py-3.5">Cover type</th><th className="px-5 py-3.5">Issue</th><th className="px-5 py-3.5">Eligibility</th><th className="px-5 py-3.5">Status</th><th className="px-5 py-3.5">Opened</th></tr></thead><tbody className="divide-y divide-black/[0.045]">{claims.map(claim=><tr key={claim.id} className="hover:bg-[#FBFAF7]"><td className="px-5 py-4"><Link to={`/tyres/${claim.tyreId}`} className="font-black text-brand-ink hover:text-brand-orange">{claim.id}</Link><p className="mt-1 text-xs text-zinc-500">{claim.tyre} · {claim.reference}</p><p className="mt-0.5 text-[10px] text-zinc-400">{claim.vehicle}</p></td><td className="px-5 py-4 text-sm font-semibold text-zinc-700">{claim.customer}</td><td className="px-5 py-4 text-sm text-zinc-600">{claim.type}</td><td className="px-5 py-4 text-sm text-zinc-600">{claim.issue}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${claim.eligibility==='Eligible'?'bg-emerald-50 text-emerald-700':claim.eligibility==='Likely eligible'?'bg-orange-50 text-brand-orange':'bg-zinc-100 text-zinc-600'}`}>{claim.eligibility}</span></td><td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black ${claim.status==='Approved'?'bg-emerald-50 text-emerald-700':claim.status==='Awaiting supplier'?'bg-blue-50 text-blue-700':'bg-amber-50 text-amber-700'}`}>{claim.status==='Approved'?<CheckCircle2 size={11}/>:claim.status==='Awaiting supplier'?<Clock3 size={11}/>:<TriangleAlert size={11}/>} {claim.status}</span></td><td className="px-5 py-4 text-xs text-zinc-500">{claim.opened}</td></tr>)}</tbody></table></div>
    </section>

    <div className="flex flex-col gap-2 border-t border-black/[0.06] pt-4 text-xs leading-5 text-zinc-500 sm:flex-row sm:items-center sm:justify-between"><p>Claims should begin from the tyre passport after inspection confirms the likely cause of failure.</p><p className="font-semibold text-zinc-600">Inspect → check cover → submit evidence → supplier decision</p></div>
  </div>
}
