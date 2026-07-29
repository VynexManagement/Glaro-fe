"use client";

import React from "react";
import { Check, Info } from "lucide-react";
import { Button } from "@leadflow/ui";

export function PricingGrid() {
  return (
    <section id="pricing" className="w-full py-24 md:py-32 flex flex-col items-center px-6 bg-white">
      <div className="max-w-4xl text-center mb-16 select-none">
        <span className="text-[10px] font-extrabold text-indigo-600 tracking-[0.2em] uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Transparent Dataset Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-4">
          Pay per dataset. No subscription lock-in.
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg">
          Purchase downloadable Shopify opportunity datasets tailored to your target niche.
        </p>
      </div>

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Card 1: 100 Leads */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100/80 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.03)] flex flex-col hover:border-slate-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-900">100 Leads</h3>
          <p className="text-slate-400 text-xs mt-1">Starter opportunity dataset.</p>
          <div className="my-8 flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900">$29</span>
            <span className="text-slate-400 text-xs ml-2">/ one-time</span>
          </div>
          <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>100 Verified Shopify Leads</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Country & Niche Filtering</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Base & Derived Signals</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Instant CSV Download</span>
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-[0.98]"
            onClick={() => (window.location.href = "http://localhost:3001/query")}
          >
            Generate & Download Dataset
          </Button>
        </div>

        {/* Card 2: 250 Leads */}
        <div className="bg-white p-8 rounded-2xl border-2 border-[#6366f1] relative flex flex-col shadow-[0_20px_50px_-12px_rgba(99,102,241,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.15)] transition-all duration-300">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6366f1] text-white text-[9px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-md select-none">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-bold text-slate-900">250 Leads</h3>
          <p className="text-slate-400 text-xs mt-1">Growth agency dataset.</p>
          <div className="my-8 flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900">$59</span>
            <span className="text-slate-400 text-xs ml-2">/ one-time</span>
          </div>
          <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>250 Verified Shopify Leads</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Full Opportunity Signal Filters</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Enriched Tech Stack Data</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Instant CSV Download</span>
            </li>
          </ul>
          <Button
            variant="primary"
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] shadow-lg shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98]"
            onClick={() => (window.location.href = "http://localhost:3001/query")}
          >
            Generate & Download Dataset
          </Button>
        </div>

        {/* Card 3: 500 Leads */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100/80 shadow-[0_10px_35px_-12px_rgba(0,0,0,0.03)] flex flex-col hover:border-slate-200 transition-all duration-300">
          <h3 className="text-xl font-bold text-slate-900">500 Leads</h3>
          <p className="text-slate-400 text-xs mt-1">Scale prospect dataset.</p>
          <div className="my-8 flex items-baseline">
            <span className="text-4xl md:text-5xl font-extrabold text-slate-900">$99</span>
            <span className="text-slate-400 text-xs ml-2">/ one-time</span>
          </div>
          <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>500 Verified Shopify Leads</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>All Base & Derived Signals</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Custom Niche & Country Extractions</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-indigo-600 w-4 h-4 shrink-0" strokeWidth={2.5} />
              <span>Instant CSV Download</span>
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-[0.98]"
            onClick={() => (window.location.href = "http://localhost:3001/query")}
          >
            Generate & Download Dataset
          </Button>
        </div>
      </div>

      {/* Dynamic Pricing Note */}
      <div className="mt-12 max-w-xl text-center bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3 text-xs text-slate-500 font-medium">
        <Info className="w-4 h-4 text-indigo-600 shrink-0" />
        <span>Custom dataset pricing depends dynamically on total Lead Count, selected Opportunity Signals, and Dataset Type.</span>
      </div>
    </section>
  );
}
