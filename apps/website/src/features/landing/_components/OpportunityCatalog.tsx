"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export function OpportunityCatalog() {
  const opportunityTypes = [
    "Revenue Leakage",
    "Trust Gap",
    "Agency Goldmine",
    "Retention Opportunity",
    "Conversion Optimization",
    "Shopify App Install Target",
    "Missing Email Marketing",
    "No Loyalty Program",
    "Missing Reviews",
  ];

  return (
    <section id="catalog" className="w-full py-20 bg-slate-50/40 border-y border-slate-100 flex flex-col items-center px-6">
      <div className="max-w-4xl text-center mb-12 select-none">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Supported Opportunity Types
        </h2>
        <p className="mt-2 text-slate-500 text-sm sm:text-base">
          Filter and discover stores across a comprehensive catalog of detectable growth gaps.
        </p>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {opportunityTypes.map((opp, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white border border-slate-100/80 p-4 rounded-xl shadow-xs"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" strokeWidth={2} />
            <span className="text-sm font-bold text-slate-800">{opp}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
