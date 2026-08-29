"use client";

import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import siteData from "@/data/site-data.json";

export function WhyRedwolfSection() {
  return (
    <section className="py-24 bg-[#0d111d] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Why <span className="text-red-500">Redwolf</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We avoid generic agency claims. Our work is driven by strict operational principles.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.principles.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-3 hover:border-red-500/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-red-500 shrink-0" />
                <h3 className="text-lg font-heading font-extrabold text-white">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
