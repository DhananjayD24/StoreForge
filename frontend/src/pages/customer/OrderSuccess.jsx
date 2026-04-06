import { useNavigate, useParams } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const { slug } = useParams();

  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in-up">
      <div className="text-center max-w-md px-6 space-y-6">
        {/* Animated checkmark */}
        <div className="relative mx-auto w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
          </div>
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping" />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Order Placed!</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            🎉 Your order has been successfully placed and is being processed. You'll receive it shortly.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Status</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-slate-800">Confirmed</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">Payment</p>
            <p className="text-sm font-bold text-slate-800">Cash on Delivery</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(`/store/${slug}`)}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition shadow-sm"
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
