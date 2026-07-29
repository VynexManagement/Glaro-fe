"use client";

import React from "react";
import { Globe, Layers, Zap, Eye, ShoppingCart, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      Icon: Globe,
      title: "Choose Country",
      desc: "Select your target geographical market for prospecting.",
    },
    {
      number: "02",
      Icon: Layers,
      title: "Choose Niche",
      desc: "Filter stores by specific ecommerce industry verticals.",
    },
    {
      number: "03",
      Icon: Zap,
      title: "Choose Opportunity Signals",
      desc: "Target stores with specific detectable business gaps.",
    },
    {
      number: "04",
      Icon: Eye,
      title: "Preview Dataset",
      desc: "Inspect sample lead records and verified match counts.",
    },
    {
      number: "05",
      Icon: ShoppingCart,
      title: "Purchase",
      desc: "Unlock your dataset with transparent pay-per-list pricing.",
    },
    {
      number: "06",
      Icon: Download,
      title: "Download CSV",
      desc: "Export enriched lead data directly to CSV for outreach.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-24 bg-white border-y border-slate-100 flex flex-col items-center px-6">
      <div className="max-w-4xl text-center mb-16 select-none">
        <span className="text-[10px] font-extrabold text-indigo-600 tracking-[0.2em] uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Simple 6-Step Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4">
          How Glaro Works
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg max-w-xl mx-auto">
          Generate targeted Shopify opportunity datasets in minutes with no recurring software bloat.
        </p>
      </div>

      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {steps.map(({ number, Icon, title, desc }, i) => (
          <div
            key={i}
            className="group bg-white border border-slate-100 p-8 rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.05)] hover:border-slate-200 transition-all duration-300 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-50/70 border border-indigo-100/50 flex items-center justify-center group-hover:bg-indigo-100/60 transition-colors duration-300">
                <Icon className="w-5.5 h-5.5 text-indigo-600" strokeWidth={1.75} />
              </div>
              <span className="text-xs font-extrabold text-slate-300 tracking-widest font-mono">
                {number}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
