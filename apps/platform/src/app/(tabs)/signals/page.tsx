"use client";

import React, { useEffect, useState } from "react";
import { Compass } from "lucide-react";
import { API_URL } from "@/lib/api";
import {
  PageHeader,
  SearchInput,
  FilterChips,
  DataCard,
  Badge,
  EmptyState,
  SkeletonCardGrid,
  StatusDot,
} from "@leadflow/ui";

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
  "Operations",
];

// Helper to map DB category strings to frontend filter options
const mapCategory = (dbCat: string): string => {
  const cat = (dbCat || "").toLowerCase();
  if (cat === "marketing" || cat === "branding") return "Marketing";
  if (cat === "conversion" || cat === "app_install") return "Conversion";
  if (cat === "retention") return "Retention";
  if (cat === "trust") return "Trust";
  if (cat === "growth") return "Growth";
  return "Operations";
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
        return matched
          ? matched.name
          : depSlug.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      })
      .join(", ");
  };

  return (
    <div className="p-6 md:p-10 space-y-8 select-none max-w-7xl mx-auto">
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <PageHeader
        title="Signal Library"
        description="Learn what every opportunity signal means, why it matters, and how you can use it to identify high-value Shopify stores."
        icon={<Compass className="text-indigo-600 w-8 h-8" />}
      />

      {/* ── SEARCH & FILTERS ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search signals by name..."
        />

        <FilterChips
          categories={FILTER_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* ── SIGNAL CARDS GRID ────────────────────────────────────────────── */}
      {loading ? (
        <SkeletonCardGrid count={6} />
      ) : error ? (
        <EmptyState title="Error Loading Signals" description={error} />
      ) : filteredSignals.length === 0 ? (
        <EmptyState
          title="No Signals Found"
          description="We couldn't find any signals matching your search criteria. Try modifying your filters or search keywords."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignals.map((sig) => {
            const isDerived = sig.type === "derived";
            return (
              <DataCard key={sig.id}>
                <div className="space-y-3.5">
                  {/* Top Tags/Badges */}
                  <div className="flex justify-between items-center gap-2">
                    <Badge variant={isDerived ? "purple" : "indigo"}>
                      {isDerived ? "Derived" : "Base"}
                    </Badge>
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
              </DataCard>
            );
          })}
        </div>
      )}

      {/* ── FOOTER STATUS BAR ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 pt-4 text-xs text-slate-400 font-semibold">
        <StatusDot variant="emerald" />
        <span>Signal Catalog Active</span>
      </div>
    </div>
  );
}
