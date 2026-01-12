
import React from 'react';
import { useAdmin } from '../context/AdminContext';

interface SubscriptionPlansProps {
  onSelectPlan: (planName: string) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = () => {
  const { settings } = useAdmin();

  const handleRedirect = (isTrial: boolean) => {
    const url = isTrial ? settings.redirectUrls.trial : settings.redirectUrls.premium;
    window.location.href = url;
  };

  const plans = [
    {
      name: "Free Trial",
      price: settings.prices.trial,
      duration: "One-time",
      features: ["5 Minutes duration", "HD Video Quality", "Instant Access", "Claim Trial Now"],
      cta: "Claim Trial",
      highlight: false,
      icon: "fa-bolt",
      isTrial: true
    },
    {
      name: "Weekly Connect",
      price: settings.prices.weekly,
      duration: "/week",
      features: ["5 Total Video Calls", "Valid for 7 days", "Up to 20 mins per call", "Subscribe Now"],
      cta: "Subscribe Now",
      highlight: false,
      icon: "fa-calendar-week",
      isTrial: false
    },
    {
      name: "Unlimited Month",
      price: settings.prices.monthly,
      duration: "/month",
      features: ["Unlimited Video Calls", "No duration limits", "Unlimited Messaging", "Subscribe Now"],
      cta: "Subscribe Now",
      highlight: true,
      icon: "fa-crown",
      isTrial: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-stone-900 mb-4 font-serif italic">Buy Video Call Subscription</h2>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">Pick the perfect plan for your desired connection depth.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col p-10 rounded-[2.5rem] transition-all duration-500 ${
              plan.highlight 
              ? 'bg-stone-900 text-white shadow-2xl scale-105 z-10 ring-4 ring-rose-500/20' 
              : 'bg-white text-stone-900 shadow-xl border border-stone-100 hover:shadow-2xl hover:-translate-y-2'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                Best Value Plan
              </div>
            )}
            
            <div className="mb-10 text-center">
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl ${
                plan.highlight ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-600'
              }`}>
                <i className={`fa-solid ${plan.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{plan.name}</h3>
              <div className="flex items-center justify-center">
                <span className="text-5xl font-black">${plan.price}</span>
                <span className={`text-sm ml-2 font-medium ${plan.highlight ? 'text-stone-400' : 'text-stone-400'}`}>
                  {plan.duration}
                </span>
              </div>
            </div>

            <ul className="flex-grow space-y-5 mb-10">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    plan.highlight ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'
                  }`}>
                    <i className="fa-solid fa-check text-[10px]"></i>
                  </div>
                  <span className="text-base font-medium opacity-90">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleRedirect(plan.isTrial)}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg ${
                plan.highlight 
                ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-900/20' 
                : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
