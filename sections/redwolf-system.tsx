"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Cpu, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import siteData from "@/data/site-data.json";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Sparkles,
  TrendingUp,
  Globe,
  Cpu,
  Layers
};

interface RedwolfSystemSectionProps {
  onOpenEnquiry?: () => void;
}

export function RedwolfSystemSection({ onOpenEnquiry }: RedwolfSystemSectionProps) {
  const [activeCapId, setActiveCapId] = useState(siteData.capabilities[0].id);

  const activeCap = siteData.capabilities.find((c) => c.id === activeCapId) || siteData.capabilities[0];
  const ActiveIcon = iconMap[activeCap.icon] || Globe;

  return (
    <section id="system" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Integrated Capabilities Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            The <span className="text-red-500">Redwolf System</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            One business problem often requires more than one digital discipline. We combine strategic consulting, brand craft, growth marketing, full-stack web, and custom software under one roof.
          </p>
        </div>

        {/* System Capability Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {siteData.capabilities.map((cap) => {
            const Icon = iconMap[cap.icon] || Globe;
            const isActive = activeCapId === cap.id;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveCapId(cap.id)}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "text-white bg-red-600 shadow-lg shadow-red-600/30 border border-red-500/50"
                    : "text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{cap.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Capability Deep Dive Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCap.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-2xl bg-glass-card border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-48 w-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Name & Description */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <ActiveIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                      {activeCap.name}
                    </h3>
                    <p className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                      {activeCap.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeCap.description}
                </p>
              </div>

              {/* Right Column: Problem Addressed & Solution */}
              <div className="lg:col-span-6 space-y-4 bg-slate-900/80 p-6 rounded-xl border border-slate-800">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold uppercase">
                    <AlertCircle className="h-4 w-4" />
                    <span>Problem Addressed</span>
                  </div>
                  <p className="text-sm text-slate-200 font-medium">
                    {activeCap.problemAddressed}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Redwolf Solution</span>
                  </div>
                  <p className="text-sm text-slate-200 font-medium">
                    {activeCap.solution}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenEnquiry}
                    className="inline-flex items-center gap-2 text-xs font-bold font-mono text-red-400 hover:text-red-300 uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>Discuss {activeCap.name} Solution</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
