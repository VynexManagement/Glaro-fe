"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "./utils";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onClear?: () => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
  inputClassName,
  onClear,
}: SearchInputProps) {
  return (
    <div className={cn("relative max-w-md w-full", className)}>
      <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full bg-white border border-slate-200 hover:border-slate-300 rounded-xl pl-11 pr-10 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm",
          inputClassName
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            onClear?.();
          }}
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
