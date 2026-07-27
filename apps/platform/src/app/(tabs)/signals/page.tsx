"use client";

import React, { useEffect, useState } from "react";
import { Search, Loader2, Info, Compass, HelpCircle } from "lucide-react";
import { API_URL } from "@/lib/api";

interface Signal {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  type: string; // "base" | "derived"
  dependencies: string[] | null;
}

const FILTER_CATEGORIES = [
  "All",
  "Marketing",
  "Conversion",
  "Retention",
  "Trust",
  "Growth",
  "Operations"
];

// Helper to map DB category strings to frontend filter options
const mapCategory = (dbCat: string): string => {
  const cat = (dbCat || "").toLowerCase();
  if (cat === "marketing" || cat === "branding") return "Marketing";
  if (cat === "conversion" || cat === "app_install") return "Conversion";
  if (cat === "retention") return "Retention";
  if (cat === "trust") return "Trust";
  if (cat === "growth") return "Growth";
  return "Operations"; // support, product, agency, etc.
};

export default function SignalLibrary() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const res = await fetch(`${API_URL}/api/signals`);
        if (!res.ok) {
          throw new Error("Failed to load signals");
        }
        const data = await res.json();
        setSignals(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load the signal catalog. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchSignals();
  }, []);

  // Filter signals based on search query and category chip
  const filteredSignals = signals.filter((sig) => {
    const matchesSearch = sig.name.toLowerCase().includes(searchQuery.toLowerCase());
    const mappedCat = mapCategory(sig.category);
    const matchesCategory = activeCategory === "All" || mappedCat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Resolve slug to human-readable signal name
  const getDependencyNames = (deps: string[] | null) => {
    if (!deps || !deps.length) return "None";
    return deps
      .map((depSlug) => {
        const matched = signals.find((s) => s.slug === depSlug);
        return matched ? matched.name : depSlug.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      })
      .join(", ");
  };

  return (
    <div className="p-6 md:p-10 space-y-8 select-none max-w-7xl mx-auto">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="space-y-2 border-b border-slate-100 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Compass className="text-indigo-600 w-8 h-8" />
          Signal Library
        </h1>
        <p className="text-slate-500 text-sm max-w-3xl leading-relaxed font-medium">
          Learn what every opportunity signal means, why it matters, and how you can use it to identify high-value Shopify stores.
        </p>
      </div>

      {/* ── SEARCH & FILTERS ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search signals by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-4 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:border-indigo-500 transition-all shadow-sm"
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-indigo-600 border-indigo-700 text-white shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── SIGNAL CARDS GRID ────────────────────────────────────────────── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4 shadow-sm animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-32 bg-slate-100 rounded-lg"></div>
                <div className="h-5 w-16 bg-slate-100 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-50 rounded-lg"></div>
                <div className="h-4 w-5/6 bg-slate-50 rounded-lg"></div>
              </div>
              <div className="h-5 w-40 bg-slate-100 rounded-lg pt-2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
          <HelpCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <p className="text-slate-600 font-bold">{error}</p>
        </div>
      ) : filteredSignals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 p-8 shadow-sm max-w-lg mx-auto">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-base">No Signals Found</h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed font-semibold">
            We couldn't find any signals matching your search criteria. Try modifying your filters or search keywords.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((sig) => {
            const isDerived = sig.type === "derived";
            return (
              <div
                key={sig.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Top Tags/Badges */}
                  <div className="flex justify-between items-center gap-2">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider ${
                        isDerived
                          ? "bg-purple-50 text-purple-700 border-purple-100"
                          : "bg-indigo-50 text-indigo-700 border-indigo-100"
                      }`}
                    >
                      {isDerived ? "Derived" : "Base"}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-md capitalize">
                      {mapCategory(sig.category)}
                    </span>
                  </div>

                  {/* Signal Name */}
                  <h3 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                    {sig.name}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                    {sig.description || "No description provided."}
                  </p>
                </div>

                {/* Derived Signal Dependencies Info */}
                {isDerived && sig.dependencies && sig.dependencies.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-50 text-[10px] text-slate-500 leading-normal font-semibold">
                    <div className="text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Derived From
                    </div>
                    <div className="text-slate-700 flex flex-wrap items-center gap-1 font-bold">
                      {getDependencyNames(sig.dependencies)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── FOOTER STATUS BAR ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 pt-4 text-xs text-slate-400 font-semibold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shrink-0"></span>
        <span>Signal Catalog Active</span>
      </div>
    </div>
  );
}
