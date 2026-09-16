"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";
import { useCurrency } from "@/context/currency-context";
import pricingData from "@/data/pricing-data.json";

interface PricingSectionProps {
  onOpenEnquiry?: () => void;
}

export function PricingSection({ onOpenEnquiry }: PricingSectionProps) {
  const { countryInfo, formatPrice } = useCurrency();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const annualDiscount = 0.85; // 15% discount

  return (
    <section id="pricing" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <DollarSign className="h-3.5 w-3.5" />
            <span>Affordable SME & Industry Growth Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Transparent Pricing Built for <span className="text-red-500">Small & Medium Businesses</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            No expensive retainers or hidden setup fees. High-impact Digital Marketing, SEO/AEO/GEO Search Dominance, and Custom Web Applications priced fairly for scaling industries.
          </p>

          {/* Location Badge + Billing Switcher */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            {/* Active Region Indicator */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300">
              <Globe className="h-4 w-4 text-red-500" />
              <span>Prices localized for:</span>
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>{countryInfo.flag}</span>
                <span>{countryInfo.countryName} ({countryInfo.currency})</span>
              </span>
            </div>

            {/* Monthly vs Annual Toggle */}
            <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono">
              <span className={billingCycle === "monthly" ? "text-white font-bold" : "text-slate-400"}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-11 h-6 rounded-full bg-slate-800 p-1 transition-colors relative cursor-pointer"
                aria-label="Toggle Annual Billing"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-red-500 transition-transform ${
                    billingCycle === "annual" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={billingCycle === "annual" ? "text-white font-bold" : "text-slate-400"}>
                Annual <span className="text-amber-400 font-bold ml-1">(15% OFF)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Digital Marketing & SME Growth Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingData.servicePlans.map((plan, idx) => {
            const baseINR = plan.priceINR;
            const baseUSD = plan.priceUSD;
            const finalINR = billingCycle === "annual" ? Math.round(baseINR * annualDiscount) : baseINR;
            const finalUSD = billingCycle === "annual" ? Math.round(baseUSD * annualDiscount) : baseUSD;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl bg-glass-card border transition-all duration-300 ${
                  plan.popular
                    ? "border-red-500 shadow-2xl shadow-red-900/20 bg-gradient-to-b from-slate-900 via-slate-900 to-red-950/20 scale-105"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-mono text-[10px] uppercase font-extrabold tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR FOR SMES
                  </div>
                )}

                {/* Header info */}
                <div className="pb-6 border-b border-slate-800/80 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-red-400">
                    {plan.badge}
                  </span>
                  <h3 className="text-2xl font-heading font-extrabold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="pt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-heading font-black text-white">
                      {formatPrice(finalINR, finalUSD)}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      /{plan.period}
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <span className="text-[11px] font-mono text-emerald-400 font-bold block">
                      Billed annually (Saved 15%)
                    </span>
                  )}
                </div>

                {/* Feature Checklist */}
                <div className="py-6 flex-1 space-y-3">
                  <span className="text-xs font-mono text-slate-300 font-bold uppercase block">
                    INCLUDED IN PLAN:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <button
                  onClick={onOpenEnquiry}
                  className={`w-full inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-red-600/30"
                      : "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Custom SME Web Application & Engineering Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <Zap className="h-4 w-4" />
              <span>CUSTOM SME WEB APPLICATIONS & AUTOMATION</span>
            </div>
            <h4 className="text-xl font-heading font-extrabold text-white">
              Need a high-converting web platform or custom business software?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              We design and engineer high-speed Next.js web applications, digital catalog portals, and custom lead funnels designed to deliver immediate ROI for small and medium industries.
            </p>
          </div>

          <button
            onClick={onOpenEnquiry}
            className="shrink-0 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Consult Strategy Team</span>
          </button>
        </div>
      </div>
    </section>
  );
}

