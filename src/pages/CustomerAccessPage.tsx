import { useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, MessageSquareText, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isRegisteredDemoCustomer, verifyDemoCustomerPin } from '../auth/customerDemoAuth';

export default function CustomerAccessPage() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('0825550147');
  const [pinSent, setPinSent] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSendPin = () => {
    setError('');
    if (!isRegisteredDemoCustomer(mobile)) {
      setError('This mobile number is not registered in the demo customer records.');
      return;
    }
    setPinSent(true);
  };

  const handleVerifyPin = () => {
    setError('');
    if (!verifyDemoCustomerPin(pin)) {
      setError('The one-time PIN is incorrect.');
      return;
    }
    navigate('/customer-portal');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-5 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-brand-line bg-white p-6 shadow-soft sm:p-9">
        <button onClick={() => navigate('/login')} className="mb-8 flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-ink">
          <ArrowLeft size={16} /> Back to staff login
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-brand-orange"><Smartphone size={23} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">Customer tyre portal</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Access your tyre passport</h1>
        <p className="mt-3 text-sm leading-6 text-brand-muted">Enter the mobile number registered by your tyre fitment centre. Workshop staff create customer records before portal access is available.</p>

        {error && (
          <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {!pinSent ? (
          <>
            <div className="mt-7">
              <label className="mb-2 block text-sm font-semibold">Mobile number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                placeholder="082 123 4567"
                className="h-12 w-full rounded-xl border border-brand-line px-4 text-sm outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100"
              />
            </div>
            <button onClick={handleSendPin} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white hover:bg-brand-orange-dark">
              Send one-time PIN <ArrowRight size={17} />
            </button>
          </>
        ) : (
          <>
            <div className="mt-7 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
              <CheckCircle2 size={17} /> One-time PIN sent to {mobile}
            </div>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold">6-digit one-time PIN</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))}
                placeholder="••••••"
                className="h-12 w-full rounded-xl border border-brand-line px-4 text-center text-lg font-bold tracking-[0.35em] outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-orange-100"
              />
            </div>
            <button onClick={handleVerifyPin} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange text-sm font-bold text-white hover:bg-brand-orange-dark">
              Verify & continue <ArrowRight size={17} />
            </button>
            <button onClick={() => { setPinSent(false); setPin(''); setError(''); }} className="mt-3 w-full text-center text-xs font-semibold text-brand-muted hover:text-brand-ink">
              Use a different mobile number
            </button>
          </>
        )}

        <div className="mt-7 flex gap-3 rounded-2xl bg-brand-canvas p-4">
          <MessageSquareText size={19} className="mt-0.5 shrink-0 text-brand-orange" />
          <p className="text-xs leading-5 text-brand-muted">No customer password is required. One-time PIN access keeps the customer journey simple while protecting tyre and vehicle records.</p>
        </div>
      </div>
    </div>
  );
}
