"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { cn } from "./utils";

export interface MultiSelectDropdownProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function MultiSelectDropdown({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Search options...",
  icon,
  className,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()));

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter((v) => v !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const handleSelectAll = () => onChange([...options]);
  const handleClearAll = () => onChange([]);

  return (
    <div ref={containerRef} className={cn("relative w-full select-none", className)}>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          {selectedValues.length === 0 ? (
            <span className="text-slate-400">Select {label.toLowerCase()}...</span>
          ) : (
            <span className="font-bold text-slate-900">{selectedValues.length} Selected</span>
          )}
        </div>
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between text-[10px] font-bold px-1 text-slate-400 border-b border-slate-100 pb-2">
            <button type="button" onClick={handleSelectAll} className="hover:text-indigo-600 transition-colors">
              Select All
            </button>
            <button type="button" onClick={handleClearAll} className="hover:text-red-600 transition-colors">
              Clear All
            </button>
          </div>

          {/* Option List */}
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filtered.length === 0 ? (
              <div className="p-3 text-center text-xs text-slate-400 font-semibold">No options found</div>
            ) : (
              filtered.map((opt) => {
                const isChecked = selectedValues.includes(opt);
                return (
                  <div
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors",
                      isChecked ? "bg-indigo-50/60 text-indigo-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <span className="truncate">{opt}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-2" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
