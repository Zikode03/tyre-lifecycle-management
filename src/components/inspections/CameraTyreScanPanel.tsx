import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, CheckCircle2, ImagePlus, ScanLine, ShieldCheck, Smartphone, TriangleAlert } from 'lucide-react';
import { tyres } from '../../data/mock';
import { workflowStore, type DemoTyreScan } from '../../lib/workflowStore';

type Props={
  inspectionId:string;
  registration:string;
  position?:string;
  onApplied?:(scan:DemoTyreScan)=>void;
};

type Analysis={estimatedTreadMm?:number;wearPattern:DemoTyreScan['wearPattern'];defects:string[];confidence:number;recommendation:string};

const normalise=(value?:string)=>value?.trim().toLowerCase().replace(/\s+/g,' ')??'';

export function CameraTyreScanPanel({inspectionId,registration,position,onApplied}:Props){
  const inputRef=useRef<HTMLInputElement>(null);
  const [file,setFile]=useState<File|null>(null);
  const [preview,setPreview]=useState('');
  const [analysis,setAnalysis]=useState<Analysis|null>(null);
  const [saved,setSaved]=useState(false);

  const tyre=useMemo(()=>tyres.find(item=>normalise(item.vehicle)===normalise(registration)&&normalise(item.position)===normalise(position)),[registration,position]);

  useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview)},[preview]);

  const capture=(next:File|null)=>{
    if(preview)URL.revokeObjectURL(preview);
    setFile(next);setAnalysis(null);setSaved(false);setPreview(next?URL.createObjectURL(next):'');
  };

  const analyse=()=>{
    if(!file||!tyre)return;
    const critical=tyre.status==='Critical';
    const attention=tyre.status==='Attention';
    const result:Analysis={
      estimatedTreadMm:Math.max(1.6,Number((tyre.tread+(critical?0.2:attention?0.15:0.1)).toFixed(1))),
      wearPattern:critical?'Inner-edge wear':attention?'Outer-edge wear':'Even',
      defects:critical?['Possible excessive wear']:[],
      confidence:critical?86:attention?82:88,
      recommendation:critical?'Physical tread measurement required before release. Prepare replacement assessment.':attention?'Confirm tread with a gauge and inspect alignment before closing the inspection.':'No obvious visual defect flagged. Confirm with physical tread and pressure measurements.',
    };
    setAnalysis(result);
  };

  const transfer=()=>{
    if(!analysis||!file||!tyre)return;
    const scan:DemoTyreScan={
      id:`SCN-${Date.now()}`,
      tyreId:tyre.id,
      inspectionId,
      registration,
      position:position??tyre.position,
      capturedAt:new Date().toISOString(),
      source:'Phone camera',
      analysisMode:'Prototype AI analysis',
      fileName:file.name,
      estimatedTreadMm:analysis.estimatedTreadMm,
      wearPattern:analysis.wearPattern,
      defects:analysis.defects,
      confidence:analysis.confidence,
      verification:'Pending technician review',
      recommendation:analysis.recommendation,
    };
    workflowStore.saveTyreScans([scan,...workflowStore.tyreScans()]);
    setSaved(true);onApplied?.(scan);
  };

  return <section className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-[#F7F6F2]">
    <div className="flex items-start gap-3 border-b border-black/[0.05] bg-white p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Smartphone size={19}/></div><div><h2 className="text-lg font-extrabold text-brand-ink">Scan tyre with phone camera</h2><p className="mt-1 text-xs leading-5 text-zinc-500">Capture visible tread and sidewall evidence, review the structured result, then transfer it to the matched tyre passport.</p></div></div>
    <div className="grid gap-4 p-5 lg:grid-cols-[240px_1fr]">
      <div><input ref={inputRef} className="hidden" type="file" accept="image/*" capture="environment" onChange={event=>capture(event.target.files?.[0]??null)}/>{preview?<button type="button" onClick={()=>inputRef.current?.click()} className="group relative h-52 w-full overflow-hidden rounded-2xl bg-black"><img src={preview} alt="Tyre camera capture preview" className="h-full w-full object-cover opacity-90"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-left text-xs font-bold text-white">Retake photo</div></button>:<button type="button" onClick={()=>inputRef.current?.click()} className="flex h-52 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-300 bg-white text-zinc-500 transition hover:border-orange-300 hover:text-brand-orange"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50"><Camera size={21}/></div><span className="text-sm font-extrabold">Open camera</span><span className="max-w-[170px] text-center text-xs leading-5">On phones this requests the rear camera. Desktop can upload a photo.</span></button>}</div>
      <div className="space-y-4"><div className={`rounded-2xl p-4 ${tyre?'bg-emerald-50 text-emerald-800':'bg-amber-50 text-amber-800'}`}><div className="flex items-start gap-3">{tyre?<CheckCircle2 size={18} className="mt-0.5 shrink-0"/>:<TriangleAlert size={18} className="mt-0.5 shrink-0"/>}<div><p className="text-sm font-extrabold">{tyre?`Matched to ${tyre.id} · ${tyre.brand} ${tyre.model}`:'Select a registered vehicle and tyre position first'}</p><p className="mt-1 text-xs leading-5">{tyre?`${tyre.vehicle} · ${tyre.position} · ${tyre.reference}`:'TyreTrack will not transfer camera evidence until it can identify the exact tyre record.'}</p></div></div></div>
        {!analysis?<button type="button" disabled={!file||!tyre} onClick={analyse} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#202124] px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-35"><ScanLine size={17}/>Run prototype camera analysis</button>:<div className="rounded-2xl bg-white p-4 ring-1 ring-black/[0.05]"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.12em] text-brand-orange">Structured scan result</p><p className="mt-1 text-sm font-extrabold text-brand-ink">{analysis.confidence}% visual confidence</p></div><span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">Needs verification</span></div><div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-xl bg-[#F5F4F0] p-3"><p className="text-xs font-bold text-zinc-400">Tread estimate</p><p className="mt-1 text-lg font-extrabold">{analysis.estimatedTreadMm?.toFixed(1)} mm</p></div><div className="rounded-xl bg-[#F5F4F0] p-3"><p className="text-xs font-bold text-zinc-400">Wear pattern</p><p className="mt-1 text-sm font-extrabold">{analysis.wearPattern}</p></div></div><div className="mt-3 rounded-xl bg-[#F5F4F0] p-3"><p className="text-xs font-bold text-zinc-400">Visible findings</p><p className="mt-1 text-sm font-semibold text-brand-ink">{analysis.defects.length?analysis.defects.join(', '):'No obvious visible defect flagged'}</p></div><p className="mt-3 text-xs leading-5 text-zinc-500">{analysis.recommendation}</p><div className="mt-4 flex gap-2"><button type="button" onClick={analyse} className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F5F4F0] text-xs font-bold text-zinc-600"><ImagePlus size={15}/>Reanalyse</button><button type="button" onClick={transfer} className="inline-flex h-10 flex-[1.4] items-center justify-center gap-2 rounded-xl bg-brand-orange px-3 text-xs font-bold text-white"><ShieldCheck size={15}/>{saved?'Transferred to tyre':'Transfer to tyre record'}</button></div></div>}
        <p className="text-xs leading-5 text-zinc-400">Prototype note: this frontend currently demonstrates capture, tyre matching, structured results and data transfer. A production computer-vision service will replace the prototype analyser without changing this workflow.</p>
      </div>
    </div>
  </section>;
}
