"use client";

import React from "react";
import { Zap, Sparkles } from "lucide-react";

export function OpportunitySignals() {
  const baseSignals = [
    { title: "No Email Marketing", desc: "Stores lacking email capture popups or automated email marketing flows." },
    { title: "No Reviews", desc: "Product pages lacking social proof badges or customer review widgets." },
    { title: "No Loyalty Program", desc: "Active brands missing customer retention, rewards, or loyalty software." },
    { title: "No Live Chat", desc: "Storefronts lacking real-time support chat widgets or automated helpdesk tools." },
    { title: "No Upsell Tools", desc: "Checkout flows lacking cart drawer upsells or post-purchase offer tools." },
    { title: "Missing Refund Policy", desc: "Storefronts lacking visible or linked refund policy disclosures." },
  ];

  const derivedSignals = [
    { title: "Revenue Leakage", desc: "High-value store missing email marketing, upsell tools, and loyalty programs simultaneously." },
    { title: "Trust Gap", desc: "High SKU store lacking product reviews, trust seals, and transparent policy pages." },
    { title: "Agency Goldmine", desc: "Under-optimized store missing email, reviews, loyalty, and live chat—ideal for full-service agencies." },
    { title: "Retention Opportunity", desc: "High acquisition store missing lifecycle email marketing and loyalty retention systems." },
    { title: "Conversion Optimization Opportunity", desc: "High traffic store with low conversion infrastructure (missing reviews, badges, and upsells)." },
    { title: "Shopify App Install Target", desc: "Active store missing the specific software app category your product provides." },
  ];

  return (
    <section id="signals" className="w-full py-24 bg-slate-50/30 border-y border-slate-100 flex flex-col items-center px-6">
      <div className="max-w-4xl text-center mb-16 select-none">
        <span className="text-[10px] font-extrabold text-purple-700 tracking-[0.2em] uppercase bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
          Product Differentiator
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4">
          Opportunity Signals Intelligence
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
          We don't just show Shopify stores. We help you discover stores that actually need your services.
        </p>
      </div>

      <div className="max-w-6xl w-full space-y-12">
        {/* Base Signals Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Base Storefront Signals</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {baseSignals.map((sig, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-indigo-100 transition-all duration-200"
              >
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider bg-indigo-50 text-indigo-700 border-indigo-100 mb-3">
                  Base Signal
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{sig.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{sig.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Derived Signals Grid */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Derived Intelligence Signals</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {derivedSignals.map((sig, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:border-purple-100 transition-all duration-200"
              >
                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider bg-purple-50 text-purple-700 border-purple-100 mb-3">
                  Derived Signal
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-2">{sig.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed font-semibold">{sig.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
