"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Sparkles, Check, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { useCurrency } from "@/context/currency-context";

interface ServiceOption {
  id: string;
  name: string;
  category: "marketing" | "tech";
  basePriceINR: number;
  basePriceUSD: number;
  description: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "seo-geo",
    name: "Tri-Engine SEO + Voice AEO + AI GEO",
    category: "marketing",
    basePriceINR: 25000,
    basePriceUSD: 300,
    description: "Rank #1 on Google Search, Siri/Alexa, ChatGPT & Gemini"
  },
  {
    id: "ads",
    name: "Meta & Google Performance Ads",
    category: "marketing",
    basePriceINR: 20000,
    basePriceUSD: 250,
    description: "High-ROI PPC ad setup, audience targeting & CRO retargeting"
  },
  {
    id: "smm",
    name: "Social Media & Short Reels Production",
    category: "marketing",
    basePriceINR: 18000,
    basePriceUSD: 220,
    description: "Instagram/LinkedIn content calendar & viral video reels"
  },
  {
    id: "branding",
    name: "Branding & Visual Identity System",
    category: "marketing",
    basePriceINR: 15000,
    basePriceUSD: 180,
    description: "Logo, positioning, copywriting & design style guidelines"
  },
  {
    id: "website",
    name: "Next.js High-Speed Website Building",
    category: "tech",
    basePriceINR: 35000,
    basePriceUSD: 450,
    description: "High-performance web app optimized for instant conversions"
  },
  {
    id: "app-dev",
    name: "Custom Mobile / Web App Build",
    category: "tech",
    basePriceINR: 60000,
    basePriceUSD: 750,
    description: "iOS/Android app or custom web portal engineering"
  },
  {
    id: "easytrack-saas",
    name: "EasyTrack SaaS Fleet Integration",
    category: "tech",
    basePriceINR: 15000,
    basePriceUSD: 180,
    description: "Proprietary logistics dispatch & live tracking SaaS setup"
  }
];

interface ProjectEstimatorProps {
  onOpenEnquiry?: () => void;
}

export function ProjectEstimatorSection({ onOpenEnquiry }: ProjectEstimatorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(["seo-geo", "ads", "website"]);
  const { formatPrice } = useCurrency();

  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Calculate totals
  const selectedItems = serviceOptions.filter((opt) => selectedIds.includes(opt.id));
  const totalINR = selectedItems.reduce((acc, curr) => acc + curr.basePriceINR, 0);
  const totalUSD = selectedItems.reduce((acc, curr) => acc + curr.basePriceUSD, 0);

  return (
    <section id="project-estimator" className="py-24 bg-[#0d111d] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Sliders className="h-3.5 w-3.5" />
            <span>Interactive Scope Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Build Your Custom <span className="text-red-500">Project Estimate</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Select the digital marketing services, app development modules, or SaaS tools you need to calculate an instant budget estimation.
          </p>
        </div>

        {/* Main Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Options List */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-slate-300 font-bold uppercase block tracking-wider mb-2">
                01. SELECT YOUR REQUIRED SERVICES & TECH MODULES
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((option) => {
                  const isChecked = selectedIds.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? "bg-red-600/15 border-red-500/80 text-white shadow-md shadow-red-900/10"
                          : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked
                            ? "bg-red-600 border-red-500 text-white"
                            : "border-slate-700 bg-slate-800"
                        }`}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-heading font-extrabold text-white">
                          {option.name}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {option.description}
                        </div>
                        <div className="text-[11px] font-mono text-red-400 font-bold pt-1">
                          +{formatPrice(option.basePriceINR, option.basePriceUSD)} / mo
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Calculation Display */}
            <div className="lg:col-span-5 space-y-6 bg-slate-950/80 p-8 rounded-2xl border border-red-500/30">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                  SELECTED SCOPE SUMMARY
                </span>
                <span className="text-xs font-mono text-red-400 font-bold px-2.5 py-1 rounded bg-red-500/10 border border-red-500/20">
                  {selectedIds.length} Modules Active
                </span>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate max-w-[200px]">
                      {item.name}
                    </span>
                    <span className="font-mono text-slate-400">
                      {formatPrice(item.basePriceINR, item.basePriceUSD)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase">
                    ESTIMATED INVESTMENT:
                  </span>
                  <span className="text-3xl font-heading font-extrabold text-white">
                    {formatPrice(totalINR, totalUSD)}
                    <span className="text-xs text-slate-400 font-normal"> / mo</span>
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  *Includes full account setup, dedicated growth manager, and tech support SLA.
                </p>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Submit This Custom Scope</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
