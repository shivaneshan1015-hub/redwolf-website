"use client";

import React from "react";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Globe } from "lucide-react";
import siteData from "@/data/site-data.json";

interface EnquirySectionProps {
  onOpenEnquiry?: () => void;
}

export function EnquirySection({ onOpenEnquiry }: EnquirySectionProps) {
  return (
    <section id="contact" className="py-24 bg-[#090d16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-b from-[#131927] to-[#0d111d] border border-red-500/30 shadow-2xl relative overflow-hidden text-center space-y-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start the Conversation</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
              Tell us what's <span className="text-red-500">not working</span>.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              You don't need to have the solution figured out. Start with the problem, and Redwolf will guide you to the right digital architecture.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider px-10 py-5 rounded-2xl shadow-xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Start a Project</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-red-500" />
              <span>Confidential Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-amber-500" />
              <span>Remote Worldwide Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>Direct Strategy Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
