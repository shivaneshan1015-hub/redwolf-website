"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layers, CheckCircle2, Building2, Sparkles, X } from "lucide-react";
import siteData from "@/data/site-data.json";

interface SelectedWorkProps {
  onOpenEnquiry?: () => void;
}

export function SelectedWorkSection({ onOpenEnquiry }: SelectedWorkProps) {
  const [activeModalWork, setActiveModalWork] = useState<typeof siteData.selectedWork[0] | null>(null);

  return (
    <section id="work" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" />
            <span>Case Studies & Client Interventions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            Different businesses. Different problems. <br />
            <span className="text-red-500">One way of thinking.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            We don't apply cookie-cutter templates. Here is how Redwolf diagnoses business challenges and builds digital solutions across diverse industries.
          </p>
        </div>

        {/* Selected Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.selectedWork.map((work) => (
            <div
              key={work.id}
              className="group flex flex-col rounded-2xl bg-glass-card border border-slate-800 hover:border-red-500/40 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <span className="text-[11px] font-mono text-red-400 uppercase font-bold tracking-wider">
                  {work.industry}
                </span>
                <Building2 className="h-4 w-4 text-slate-500 group-hover:text-red-400 transition-colors" />
              </div>

              {/* Title & Challenge */}
              <div className="py-5 space-y-3 flex-1">
                <h3 className="text-xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {work.client}
                </h3>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block">
                    BUSINESS CHALLENGE:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {work.challenge}
                  </p>
                </div>
              </div>

              {/* Solution Pill & Action */}
              <div className="pt-4 border-t border-slate-800/80 space-y-4 mt-auto">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-1">
                    REDWOLF SOLUTION:
                  </span>
                  <p className="text-slate-200 font-medium line-clamp-2">
                    {work.solution}
                  </p>
                </div>

                <button
                  onClick={() => setActiveModalWork(work)}
                  className="w-full inline-flex items-center justify-between text-xs font-bold font-mono text-red-400 hover:text-red-300 uppercase tracking-wider py-2 border-t border-slate-800/40 cursor-pointer"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full Modal */}
      <AnimatePresence>
        {activeModalWork && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0d111d] border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModalWork(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div>
                <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
                  {activeModalWork.industry}
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-white mt-1">
                  {activeModalWork.client}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                    01. THE BUSINESS CHALLENGE
                  </span>
                  <p className="text-slate-200">{activeModalWork.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase block">
                    02. REDWOLF THINKING & INTERVENTION
                  </span>
                  <p className="text-slate-200">{activeModalWork.intervention}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                    03. THE SOLUTION & DELIVERABLES
                  </span>
                  <p className="text-slate-200 font-semibold">{activeModalWork.solution}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-mono text-slate-400 font-bold uppercase block">
                    KEY HIGHLIGHTS:
                  </span>
                  <div className="space-y-1.5">
                    {activeModalWork.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Have a similar problem?</span>
                <button
                  onClick={() => {
                    setActiveModalWork(null);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Start a Project</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
