"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      q: "What data do I receive in a generated dataset?",
      a: "Every dataset includes store names, website URLs, store country, primary niche, verified opportunity signals, detected third-party tech stacks, and publicly available contact points.",
    },
    {
      q: "Is the store data publicly collected?",
      a: "Yes. Glaro strictly analyzes publicly accessible storefront signals, metadata, and tech footprints in compliance with web standards.",
    },
    {
      q: "How are opportunity signals generated?",
      a: "Our detection engine scans store codebases for presence or absence of key ecommerce tools (e.g. email popups, reviews, loyalty apps, chat widgets). Derived signals combine multiple base gaps into high-value opportunities like Revenue Leakage or Trust Gap.",
    },
    {
      q: "Can I filter datasets by niche and country?",
      a: "Absolutely. You can filter store datasets by country (USA, UK, Canada, Australia, etc.), niche (Beauty, Apparel, Electronics, Fitness), and specific opportunity signals.",
    },
    {
      q: "Do I receive an instant CSV download?",
      a: "Yes. As soon as you preview and purchase your generated dataset, your CSV file is prepared for instant download from your account dashboard.",
    },
    {
      q: "Are these live CRM leads or downloadable datasets?",
      a: "Glaro delivers structured, downloadable opportunity datasets (CSV files). It is not a bloated monthly CRM or cold emailing platform—you own the downloaded datasets outright.",
    },
    {
      q: "Can I request custom dataset extractions?",
      a: "Yes! If you require specialized criteria or higher volume extractions, you can build custom query datasets directly inside the Glaro platform.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section id="faq" className="w-full py-24 bg-white border-t border-slate-100 flex flex-col items-center px-6">
      <div className="max-w-3xl text-center mb-16 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-slate-500 text-base">
          Everything you need to know about Glaro Shopify opportunity datasets.
        </p>
      </div>

      <div className="max-w-3xl w-full space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs transition-all duration-200"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 text-base hover:text-indigo-600 transition-colors cursor-pointer select-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-indigo-600" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed font-medium border-t border-slate-50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
