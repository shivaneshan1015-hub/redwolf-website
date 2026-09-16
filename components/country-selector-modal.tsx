"use client";

import React from "react";
import { X, Globe, Check } from "lucide-react";
import { useCurrency, CountryCode } from "@/context/currency-context";
import pricingData from "@/data/pricing-data.json";

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CountrySelectorModal({ isOpen, onClose }: CountrySelectorModalProps) {
  const { country, setCountry } = useCurrency();

  if (!isOpen) return null;

  const countriesList = Object.values(pricingData.countries);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#0b0f19] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-white">Select Region & Country</h3>
              <p className="text-xs text-slate-400">Prices & currency will automatically adapt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {countriesList.map((c) => {
            const isSelected = country === c.countryCode;
            return (
              <button
                key={c.countryCode}
                onClick={() => {
                  setCountry(c.countryCode as CountryCode);
                  onClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-red-950/40 to-slate-900 border-red-500/60 text-white shadow-lg shadow-red-950/30 ring-1 ring-red-500/50"
                    : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={c.countryName}>
                    {c.flag}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{c.countryName}</div>
                    <div className="text-[11px] font-mono text-slate-400">
                      {c.currency} ({c.symbol.trim()})
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-center border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
          Auto-detected based on your IP & browser locale. Localized billing options available.
        </div>
      </div>
    </div>
  );
}
