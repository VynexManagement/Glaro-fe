"use client";

import React from "react";
import { Store, Zap, Filter, Layers, Database, Download, Eye, Target } from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      Icon: Store,
      title: "Shopify-Only Intelligence",
      desc: "Exclusively focused on Shopify stores to deliver deeper tech-stack and storefront gap analysis.",
    },
    {
      Icon: Zap,
      title: "Opportunity Signals",
      desc: "Filter stores by real missing capabilities like Revenue Leakage, Trust Gap, or No Email Marketing.",
    },
    {
      Icon: Filter,
      title: "Country & Niche Filters",
      desc: "Target specific geographical markets and ecommerce industry verticals with precise filter options.",
    },
    {
      Icon: Layers,
      title: "Dynamic Dataset Builder",
      desc: "Assemble custom datasets tailored to your exact target customer profile in seconds.",
    },
    {
      Icon: Database,
      title: "High Opportunity Datasets",
      desc: "Receive pre-qualified store lists with verified business gaps rather than raw unsegmented data.",
    },
    {
      Icon: Download,
      title: "CSV Export",
      desc: "Download full enriched datasets formatted for immediate import into outreach platforms.",
    },
    {
      Icon: Eye,
      title: "Public Store Intelligence",
      desc: "Ethically compiled insights derived strictly from publicly accessible storefront signals.",
    },
    {
      Icon: Target,
      title: "Actionable Opportunity Discovery",
      desc: "Pitch prospective stores with specific, verified solutions tailored to their exact missing tools.",
    },
  ];

  return (
    <section id="features" className="w-full py-24 bg-slate-50/20 border-y border-slate-100 flex flex-col items-center px-6">
      <div className="max-w-4xl text-center mb-16 select-none">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Built for Shopify Growth Teams
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg">
          Capabilities designed to turn raw store data into actionable client opportunities.
        </p>
      </div>

      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {features.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            className="group bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_10px_35px_-12px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-12px_rgba(99,102,241,0.05)] hover:border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50/70 border border-indigo-100/50 flex items-center justify-center mb-5 group-hover:bg-indigo-100/60 transition-colors duration-300">
                <Icon className="w-5 h-5 text-indigo-600" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
