"use client";

import React from "react";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";
import siteData from "@/data/site-data.json";

interface MethodologyProps {
  onOpenEnquiry?: () => void;
}

export function MethodologySection({ onOpenEnquiry }: MethodologyProps) {
  return (
    <section id="methodology" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5" />
            <span>How Redwolf Thinks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            We don't start with the solution. <br />
            <span className="text-red-500">We start with the problem.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Our 5-stage consulting and execution framework guarantees that strategy precedes technology, ensuring every build delivers tangible commercial impact.
          </p>
        </div>

        {/* Methodology Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {siteData.methodology.map((m) => (
            <div
              key={m.step}
              className="p-6 rounded-2xl bg-glass-card border border-slate-800 hover:border-red-500/40 flex flex-col justify-between space-y-4 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <span className="text-2xl font-mono font-extrabold text-red-500 group-hover:text-red-400">
                  {m.step}
                </span>
                <h3 className="text-lg font-heading font-extrabold text-white">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {m.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase group-hover:text-slate-400">
                  STAGE {m.step} DISCIPLINE
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-heading font-extrabold text-white">
              Ready to diagnose your business bottleneck?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Start with the problem. Redwolf will map the digital path.
            </p>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer shrink-0"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
