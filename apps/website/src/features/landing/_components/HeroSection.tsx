"use client";

import React from "react";
import { Button } from "@leadflow/ui";

export function HeroSection() {
  const datasetRows = [
    {
      name: "Glow Beauty",
      country: "USA",
      opportunity: "Revenue Leakage",
      signals: ["No Email", "No Upsell"],
      signalBg: "bg-purple-50 text-purple-700 border border-purple-100",
    },
    {
      name: "Urban Pets",
      country: "United Kingdom",
      opportunity: "Trust Gap",
      signals: ["No Reviews", "Missing Refund Policy"],
      signalBg: "bg-indigo-50 text-indigo-700 border border-indigo-100",
    },
    {
      name: "Skin Aura",
      country: "Canada",
      opportunity: "Agency Goldmine",
      signals: ["No Email", "No Live Chat", "No Loyalty"],
      signalBg: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    },
  ];

  return (
    <section className="w-full pt-20 md:pt-28 pb-16 flex flex-col items-center px-6 max-w-6xl mx-auto">
      {/* Hero Content */}
      <div className="text-center flex flex-col items-center max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] max-w-3xl">
          Find Shopify Stores with Real Growth Opportunities.
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
          Generate downloadable Shopify datasets filtered by country, niche, and opportunity signals like Revenue Leakage, Trust Gap, Agency Goldmine, and Missing Email Marketing.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto px-8 py-3.5 text-base shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] bg-[#6366f1] hover:bg-[#4f46e5]"
            onClick={() => (window.location.href = "http://localhost:3001/query")}
          >
            Generate Dataset
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8 py-3.5 text-base transition-all hover:scale-[1.01] active:scale-[0.99] border-slate-200 text-indigo-600 hover:bg-slate-50"
            onClick={() => (window.location.href = "http://localhost:3001/signup")}
          >
            Explore Datasets
          </Button>
        </div>
      </div>

      {/* Dataset Preview Card */}
      <div className="mt-16 w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Browser header bar */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-white select-none">
            <div className="flex gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase font-mono">
              SHOPIFY OPPORTUNITY DATASET PREVIEW
            </div>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="w-1 h-1 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none bg-slate-50/20">
                  <th className="px-6 py-4.5 font-semibold">Store Name</th>
                  <th className="px-6 py-4.5 font-semibold">Country</th>
                  <th className="px-6 py-4.5 font-semibold">Opportunity</th>
                  <th className="px-6 py-4.5 font-semibold">Detected Signals</th>
                  <th className="px-6 py-4.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {datasetRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-900">{row.name}</td>
                    <td className="px-6 py-5 text-slate-500 font-medium">{row.country}</td>
                    <td className="px-6 py-5 font-bold text-indigo-600">{row.opportunity}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5">
                        {row.signals.map((sig, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${row.signalBg}`}
                          >
                            {sig}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <a
                        href="http://localhost:3001/query"
                        className="text-[#6366f1] hover:text-[#4f46e5] font-bold text-sm transition-colors"
                      >
                        Preview Dataset
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
