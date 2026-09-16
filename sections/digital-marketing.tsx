"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Search, 
  Bot, 
  Sparkles, 
  Target, 
  MapPin, 
  FileText, 
  Share2,
  Palette,
  ArrowRight, 
  CheckCircle2,
  Zap
} from "lucide-react";
import siteData from "@/data/site-data.json";

const serviceIconMap: Record<string, React.ElementType> = {
  seo: Search,
  aeo: Bot,
  geo: Sparkles,
  ads: Target,
  smm: Share2,
  branding: Palette,
  localseo: MapPin,
  content: FileText
};

interface DigitalMarketingSectionProps {
  onOpenEnquiry?: () => void;
}

export function DigitalMarketingSection({ onOpenEnquiry }: DigitalMarketingSectionProps) {
  return (
    <section id="marketing" className="py-24 bg-[#0d111d] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Core Digital Marketing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Full-Stack Digital Marketing: <br />
            <span className="text-red-500">SEO, AEO, GEO & Paid Ads</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Redwolf is primarily a high-performance Digital Marketing agency. We drive qualified leads and organic search dominance across Google, Voice Search, AI Engine recommendations, and Meta/Google Ads.
          </p>
        </div>

        {/* 3x2 Marketing Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.marketingServices.map((service, idx) => {
            const Icon = serviceIconMap[service.id] || Zap;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex flex-col p-6 rounded-2xl bg-glass-card border border-slate-800 hover:border-red-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                    {service.badge}
                  </span>
                  <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400 group-hover:text-white group-hover:bg-red-600 transition-all">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Title & Description */}
                <div className="py-4 space-y-2 flex-1">
                  <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 font-semibold">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>

                {/* Feature Bullet Points */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 mt-auto">
                  <div className="grid grid-cols-2 gap-1.5">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="h-3 w-3 text-red-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenEnquiry}
                    className="w-full inline-flex items-center justify-between text-xs font-bold font-mono text-red-400 hover:text-red-300 uppercase tracking-wider pt-3 border-t border-slate-800/40 cursor-pointer"
                  >
                    <span>Get {service.badge} Plan</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* SEO / AEO / GEO High-Impact Feature Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-[#131927] border border-red-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <Sparkles className="h-4 w-4" />
                <span>TRI-ENGINE SEARCH DOMINANCE (SEO + AEO + GEO)</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                Rank on Google, Voice Assistants & AI Search Engines
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Traditional SEO alone is no longer enough. Redwolf optimizes your brand across traditional Google search results (**SEO**), voice search devices (**AEO**), and generative AI assistants like ChatGPT, Perplexity, and Gemini (**GEO**).
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <span>Request SEO / AEO / GEO Audit</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
