"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function WhyGlaro() {
  return (
    <section id="why-glaro" className="w-full py-24 bg-white flex flex-col items-center px-6">
      <div className="max-w-4xl w-full bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 rounded-3xl border border-indigo-100/60 p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(99,102,241,0.06)] relative overflow-hidden">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/60 border border-indigo-200/50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            The Glaro Advantage
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Most lead databases tell you who to contact. <br />
            <span className="text-[#6366f1]">Glaro tells you who actually needs your services.</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            We analyze publicly available Shopify storefronts to identify real business opportunities, helping agencies and app developers focus on stores where they can create value instead of cold prospecting blindly.
          </p>
        </div>
      </div>
    </section>
  );
}
