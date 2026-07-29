"use client";

import React from "react";
import { Building2, Code2, LineChart, UserCheck } from "lucide-react";

export function AudienceSection() {
  const audiences = [
    {
      Icon: Building2,
      title: "Shopify Agencies",
      desc: "Quickly identify stores with clear optimization opportunities to pitch audits, redesigns, and growth packages.",
    },
    {
      Icon: Code2,
      title: "Shopify App Developers",
      desc: "Find stores missing the exact category of app you provide (reviews, loyalty, upsells, chat) for high-conversion outreach.",
    },
    {
      Icon: LineChart,
      title: "Ecommerce Consultants",
      desc: "Identify merchant stores requiring conversion rate optimization, lifecycle marketing, branding, or operational upgrades.",
    },
    {
      Icon: UserCheck,
      title: "Growth Freelancers",
      desc: "Generate targeted, signal-validated prospect lists in minutes instead of manually researching store tech stacks.",
    },
  ];

  return (
    <section id="audience" className="w-full py-24 bg-white flex flex-col items-center px-6">
      <div className="max-w-4xl text-center mb-16 select-none">
        <span className="text-[10px] font-extrabold text-indigo-600 tracking-[0.2em] uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
          Target Audience
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-4">
          Who Is Glaro For?
        </h2>
        <p className="mt-3 text-slate-500 text-base md:text-lg max-w-xl mx-auto">
          Tailored intelligence datasets for specialized B2B ecommerce service providers.
        </p>
      </div>

      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {audiences.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100/60 flex items-center justify-center mb-5 text-indigo-600">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
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
