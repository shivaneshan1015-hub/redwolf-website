"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, ArrowRight, TrendingUp, DollarSign, Target, ShieldCheck } from "lucide-react";

interface ROICalculatorProps {
  onOpenEnquiry?: () => void;
}

export function ROICalculatorSection({ onOpenEnquiry }: ROICalculatorProps) {
  const [budget, setBudget] = useState(50000);
  const [visitors, setVisitors] = useState(5000);
  const [serviceType, setServiceType] = useState<"marketing" | "ads" | "seo" | "web">("marketing");

  // Dynamic calculations based on inputs
  const estimatedLeads = Math.round((budget / 1000) * 1.4 + (visitors * 0.04));
  const trafficGrowth = Math.round(visitors * 2.4);
  const roasMultiplier = (3.2 + (budget > 100000 ? 1.5 : 0.8)).toFixed(1);
  const costReduction = Math.min(45, Math.round(15 + (budget / 5000)));

  return (
    <section id="roi-calculator" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Growth Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Calculate Your <span className="text-red-500">Digital ROI</span> Potential
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Adjust your monthly marketing budget and site traffic to simulate projected lead growth, traffic expansion, and CPA reduction with Redwolf.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Controls Column */}
            <div className="lg:col-span-6 space-y-8">
              {/* Service Selection */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider block">
                  01. Select Primary Growth Objective
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setServiceType("marketing")}
                    className={`p-3 rounded-xl text-xs font-heading font-bold border transition-all cursor-pointer ${
                      serviceType === "marketing"
                        ? "bg-red-600/20 border-red-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Full Digital Marketing
                  </button>
                  <button
                    onClick={() => setServiceType("seo")}
                    className={`p-3 rounded-xl text-xs font-heading font-bold border transition-all cursor-pointer ${
                      serviceType === "seo"
                        ? "bg-red-600/20 border-red-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    SEO / AEO / GEO Search
                  </button>
                  <button
                    onClick={() => setServiceType("ads")}
                    className={`p-3 rounded-xl text-xs font-heading font-bold border transition-all cursor-pointer ${
                      serviceType === "ads"
                        ? "bg-red-600/20 border-red-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Meta & Google Ads
                  </button>
                  <button
                    onClick={() => setServiceType("web")}
                    className={`p-3 rounded-xl text-xs font-heading font-bold border transition-all cursor-pointer ${
                      serviceType === "web"
                        ? "bg-red-600/20 border-red-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    Web App & Conversion
                  </button>
                </div>
              </div>

              {/* Slider 1: Monthly Budget */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase">02. Monthly Marketing / Ad Budget</span>
                  <span className="text-red-400 font-bold text-sm">₹{budget.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>₹10,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000+</span>
                </div>
              </div>

              {/* Slider 2: Monthly Visitors */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase">03. Monthly Website Visitors</span>
                  <span className="text-amber-400 font-bold text-sm">{visitors.toLocaleString()} visitors</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>500</span>
                  <span>50,000</span>
                  <span>100,000+</span>
                </div>
              </div>
            </div>

            {/* Right Output Results Column */}
            <div className="lg:col-span-6 bg-slate-950 p-8 rounded-2xl border border-red-500/30 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono text-red-400 font-bold uppercase flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> ESTIMATED REDWOLF GROWTH OUTPUT
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded font-bold">
                  PROJECTED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly Lead Volume</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    +{estimatedLeads} <span className="text-xs font-normal text-slate-400">leads/mo</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Organic Search Lift</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                    +{trafficGrowth.toLocaleString()} <span className="text-xs font-normal text-slate-400">visits</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Target ROAS Multiplier</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">
                    {roasMultiplier}x <span className="text-xs font-normal text-slate-400">return</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">CPA Cost Reduction</span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-heading">
                    -{costReduction}% <span className="text-xs font-normal text-slate-400">lower CPA</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenEnquiry}
                  className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Claim This Growth Plan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-red-500" />
                <span>Custom digital marketing audit & growth roadmap included.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
