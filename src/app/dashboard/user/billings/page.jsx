import { getSubscriptions } from "@/lib/api/promts";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const BillingPage = async () => {
  const subscriptions = await getSubscriptions();
  const user = await getUserSession();
  const mySubscription = subscriptions.filter(subscription => subscription.email == user.email);
  return (
    <div>
      { mySubscription.length > 0 ? (
        /* 👑 ১. ইউজার যখন সাবস্ক্রাইবড (Active Subscription State) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {mySubscription.map((sub, index) => (
            <div
              key={sub._id || index}
              className="relative group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-violet-500/30"
            >
              {/* Top Right Decorative Radial Glow */}
              <div className="absolute -top-10 -right-10 size-24 bg-violet-600/10 blur-2xl rounded-full group-hover:bg-violet-600/20 transition-all" />

              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-md border border-violet-500/20">
                    Active Plan
                  </span>
                  <h3 className="text-xl font-black text-slate-100 capitalize mt-2.5 tracking-tight">
                    {sub.planName || "Premium Tier"}
                  </h3>
                </div>

                {/* Crown / Premium Badge */}
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20 shadow-lg shadow-amber-500/5">
                  👑
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Price Paid:</span>
                  <span className="font-semibold text-slate-200">
                    ${sub.price || "19.00"}/mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Renewal Date:</span>
                  <span className="font-semibold text-slate-300 font-mono">
                    {sub.expiryDate
                      ? new Date(sub.expiryDate).toLocaleDateString()
                      : "Next Month"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    Active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ❌ ২. ইউজারের কোনো সাবস্ক্রিপশন না থাকলে (Empty State) */
        <div className="max-w-md mx-auto p-8 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-900/10 backdrop-blur-sm">
          <div className="size-12 rounded-full bg-slate-950 border border-slate-850 flex items-center justify-center mx-auto mb-4 text-slate-500 shadow-inner">
            💎
          </div>
          <h3 className="text-sm font-bold text-slate-200">
            No Active Subscriptions
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 mb-6 max-w-xs mx-auto leading-relaxed">
            Unlock premium AI models, advanced structured prompts, and priority
            community access.
          </p>

          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/20 active:scale-[0.98] transition-all cursor-pointer">
            Explore Premium Plans
          </button>
        </div>
      )}
    </div>
  );
};

export default BillingPage;
