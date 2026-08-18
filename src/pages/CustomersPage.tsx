import { useMemo, useState } from 'react';
import { ArrowRight, Download, Mail, Phone, Plus, Search, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui/PageHeader';
import { workflowStore } from '../lib/workflowStore';

export default function CustomersPage(){
  const customers=workflowStore.customers();
  const vehicles=workflowStore.vehicles();
  const bookings=workflowStore.bookings();
  const [search,setSearch]=useState('');

  const rows=useMemo(()=>customers.map(customer=>{
    const linkedVehicles=vehicles.filter(v=>v.customerId===customer.id);
    const registrations=new Set(linkedVehicles.map(v=>v.registration));
    const nextBooking=bookings.filter(b=>registrations.has(b.registration)&&!['Cancelled','Completed'].includes(b.status)).sort((a,b)=>`${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))[0];
    return {customer,linkedVehicles,nextBooking};
  }).filter(({customer,linkedVehicles})=>{
    const q=search.trim().toLowerCase();
    if(!q)return true;
    return [customer.name,customer.mobile,customer.email,...linkedVehicles.map(v=>v.registration),...linkedVehicles.map(v=>`${v.make} ${v.model}`)].some(v=>v.toLowerCase().includes(q));
  }),[customers,vehicles,bookings,search]);

  const exportCsv=()=>{
    const lines=['Customer,Mobile,Email,Vehicles,Status',...rows.map(({customer,linkedVehicles})=>`"${customer.name}","${customer.mobile}","${customer.email}","${linkedVehicles.length}","${customer.status}"`)];
    const blob=new Blob([lines.join('\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='tyretrack-customers.csv';a.click();URL.revokeObjectURL(url);
  };

  return <div className="space-y-6">
    <PageHeader eyebrow="Customer relationships" title="Customers" description="Find a customer, open their garage and continue into vehicles, tyres, bookings and service history." action={<Link to="/customers/new" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white transition hover:bg-black"><Plus size={16}/>Add customer</Link>}/>

    <section className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.045]">
      <div className="flex flex-col gap-3 border-b border-black/[0.05] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="relative w-full sm:max-w-xl"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customer, registration, vehicle or mobile" className="h-12 w-full rounded-2xl bg-[#F5F4F0] pl-11 pr-4 text-sm outline-none transition focus:bg-white focus:ring-4 focus:ring-orange-100/60"/></div>
        <button onClick={exportCsv} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F5F4F0] px-4 text-sm font-bold text-zinc-600 transition hover:bg-orange-50 hover:text-brand-orange"><Download size={15}/>Export</button>
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-[minmax(230px,1.2fr)_minmax(250px,1.25fr)_160px_160px_44px] items-center gap-4 bg-[#202124] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
          <span>Customer</span><span>Garage</span><span>Next booking</span><span>Contact</span><span/>
        </div>
        <div className="divide-y divide-black/[0.05]">{rows.map(({customer,linkedVehicles,nextBooking})=><Link to={`/customers/${customer.id}`} key={customer.id} className="grid min-h-[94px] grid-cols-[minmax(230px,1.2fr)_minmax(250px,1.25fr)_160px_160px_44px] items-center gap-4 px-5 py-4 transition hover:bg-[#FAF9F6]">
          <div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-brand-orange">{customer.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div className="min-w-0"><div className="flex items-center gap-2"><p className="truncate text-sm font-extrabold text-brand-ink">{customer.name}</p><span className={`h-2 w-2 rounded-full ${customer.status==='Active'?'bg-emerald-500':'bg-zinc-300'}`}/></div><p className="mt-1 truncate text-xs text-zinc-400">{customer.email}</p></div></div>
          <div className="min-w-0">{linkedVehicles.length?<><p className="truncate text-sm font-bold text-zinc-700">{linkedVehicles[0].make} {linkedVehicles[0].model}</p><p className="mt-1 truncate text-xs text-zinc-400">{linkedVehicles[0].registration}{linkedVehicles.length>1?` · +${linkedVehicles.length-1} more`:''}</p></>:<p className="text-sm font-semibold text-zinc-400">No vehicle linked</p>}</div>
          <div>{nextBooking?<><p className="text-sm font-bold text-brand-ink">{nextBooking.date}</p><p className="mt-1 text-xs text-zinc-400">{nextBooking.time} · {nextBooking.service}</p></>:<p className="text-xs font-semibold text-zinc-400">Nothing scheduled</p>}</div>
          <div className="space-y-1.5"><p className="flex items-center gap-2 text-xs font-semibold text-zinc-600"><Phone size={13} className="text-brand-orange"/>{customer.mobile}</p><p className="flex items-center gap-2 truncate text-xs text-zinc-400"><Mail size={13}/>{customer.email}</p></div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5F4F0] text-zinc-400 transition group-hover:text-brand-orange"><ArrowRight size={15}/></div>
        </Link>)}</div>
      </div>

      <div className="divide-y divide-black/[0.05] md:hidden">{rows.map(({customer,linkedVehicles,nextBooking})=><Link to={`/customers/${customer.id}`} key={customer.id} className="block p-4 transition hover:bg-[#FAF9F6]"><div className="flex items-start gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-sm font-black text-brand-orange">{customer.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-extrabold text-brand-ink">{customer.name}</p><ArrowRight size={15} className="text-zinc-300"/></div><p className="mt-1 text-xs text-zinc-400">{customer.mobile}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-lg bg-[#F5F4F0] px-2.5 py-1.5 text-[10px] font-bold text-zinc-600">{linkedVehicles.length} vehicle{linkedVehicles.length===1?'':'s'}</span>{nextBooking&&<span className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-[10px] font-bold text-brand-orange">Next {nextBooking.date} · {nextBooking.time}</span>}</div></div></div></Link>)}</div>

      {rows.length===0&&<div className="py-16 text-center"><UsersRound size={26} className="mx-auto text-zinc-300"/><p className="mt-3 text-sm font-bold text-zinc-500">No customers match your search</p></div>}
    </section>
  </div>;
}
