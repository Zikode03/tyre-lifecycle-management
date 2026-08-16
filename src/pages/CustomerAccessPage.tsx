import { ArrowLeft, ArrowRight, MessageSquareText, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerAccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-5 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-9">
        <button onClick={() => navigate('/login')} className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-ink"><ArrowLeft size={16}/>Back to staff login</button>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-brand-orange"><Smartphone size={23}/></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Customer tyre portal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Access your tyre passport</h1>
        <p className="mt-3 text-sm leading-6 text-brand-muted">Enter the mobile number registered by your tyre fitment centre. We’ll send a secure one-time PIN.</p>
        <div className="mt-7">
          <label className="mb-2 block text-sm font-semibold">Mobile number</label>
          <div className="flex h-12 overflow-hidden rounded-xl border border-brand-line focus-within:border-brand-orange focus-within:ring-4 focus-within:ring-orange-100">
            <div className="flex items-center border-r border-brand-line bg-brand-canvas px-3 text-sm font-semibold text-brand-muted">+27</div>
            <input type="tel" placeholder="82 123 4567" className="min-w-0 flex-1 px-4 text-sm outline-none" />
          </div>
        </div>
        <button className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white hover:bg-brand-orange-dark">Send OTP <ArrowRight size={17}/></button>
        <div className="mt-7 flex gap-3 rounded-2xl bg-brand-canvas p-4"><MessageSquareText size={19} className="mt-0.5 shrink-0 text-brand-orange"/><p className="text-xs leading-5 text-brand-muted">No password required. OTP access keeps the customer journey simple while protecting tyre and vehicle records.</p></div>
      </div>
    </div>
  );
}
