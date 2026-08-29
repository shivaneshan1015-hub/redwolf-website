"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, ShieldCheck, Cpu, Layers } from "lucide-react";
import siteData from "@/data/site-data.json";

interface HeroSectionProps {
  onOpenEnquiry?: () => void;
}

export function HeroSection({ onOpenEnquiry }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center bg-grid-pattern bg-radial-glow overflow-hidden">
      {/* Background Decorative Signal Nodes */}
      <div className="absolute top-1/4 left-10 h-72 w-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-red-pulse" />
      <div className="absolute bottom-10 right-10 h-96 w-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Position Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-widest"
            >
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span>{siteData.brand.positioning}</span>
            </motion.div>

            {/* Master Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]"
            >
              Your business has a problem.{" "}
              <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-400 bg-clip-text text-transparent block mt-1">
                We build the digital solution.
              </span>
            </motion.h1>

            {/* Supporting Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal"
            >
              {siteData.brand.subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-xl transition-all"
              >
                <span>Explore Our Work</span>
              </a>
            </motion.div>

            {/* Global Trust Signal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400 border-t border-slate-800/80 mt-6"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-500" />
                <span className="font-semibold text-slate-200">Digital Marketing • SEO/AEO/GEO • Ads • SaaS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                <span>{siteData.brand.deliveryModel}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive Path Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-glass-card border border-slate-800 shadow-2xl space-y-6 overflow-hidden">
              {/* Graphic Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-red-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-bold">
                    REDWOLF GROWTH ARCHITECTURE
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              {/* Dynamic Path Steps */}
              <div className="space-y-4 relative">
                {/* Connecting Line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-red-500 via-amber-500 to-emerald-500 opacity-40" />

                {/* Node 1: Problem */}
                <div className="relative flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="h-7 w-7 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    01
                  </div>
                  <div>
                    <div className="text-xs font-mono text-red-400 font-bold uppercase">DIAGNOSTIC</div>
                    <div className="text-sm font-semibold text-white">Low Search Traffic & Zero AI Visibility</div>
                  </div>
                </div>

                {/* Node 2: Intelligence */}
                <div className="relative flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="h-7 w-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    02
                  </div>
                  <div>
                    <div className="text-xs font-mono text-amber-400 font-bold uppercase">MARKETING & TECH ENGINE</div>
                    <div className="text-sm font-semibold text-white">SEO + AEO + GEO + Paid Ad Funnel</div>
                  </div>
                </div>

                {/* Node 3: Solution */}
                <div className="relative flex items-start gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    03
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase">REVENUE & PRODUCT RESULT</div>
                    <div className="text-sm font-semibold text-white">#1 Rankings + EasyTrack SaaS Stack</div>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-red-500" /> System Active
                </span>
                <span className="text-emerald-400 font-semibold">100% Remote Global Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
