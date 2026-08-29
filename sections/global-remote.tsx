"use client";

import React from "react";
import { Globe, Shield, Radio, ArrowRight } from "lucide-react";
import siteData from "@/data/site-data.json";

interface GlobalRemoteProps {
  onOpenEnquiry?: () => void;
}

export function GlobalRemoteSection({ onOpenEnquiry }: GlobalRemoteProps) {
  return (
    <section className="py-20 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-slate-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
                <Globe className="h-3.5 w-3.5" />
                <span>Global Remote Delivery Model</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
                {siteData.brand.deliveryModel}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are a startup in North America, an enterprise in Europe, or a commercial brand in Asia, Redwolf delivers seamless digital engineering with real-time remote collaboration.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-red-400 font-bold block">01</span> Remote First
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-amber-400 font-bold block">02</span> Global Standards
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 font-bold block">03</span> Clear Syncs
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-cyan-400 font-bold block">04</span> Production Security
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={onOpenEnquiry}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <span>Start Global Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
