"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ArrowRight, Sparkles, CheckCircle, Lightbulb } from "lucide-react";
import siteData from "@/data/site-data.json";

interface ProblemFinderSectionProps {
  onOpenEnquiryWithProblem?: (problemId: string) => void;
}

export function ProblemFinderSection({ onOpenEnquiryWithProblem }: ProblemFinderSectionProps) {
  const [selectedProblemId, setSelectedProblemId] = useState(siteData.problems[2].id);

  const selectedProblem = siteData.problems.find((p) => p.id === selectedProblemId) || siteData.problems[0];

  return (
    <section id="problem-finder" className="py-24 bg-[#0d111d] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs uppercase tracking-wider">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Interactive Diagnostic Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            What are you trying to <span className="text-red-500">solve</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            You don't need to know which technical service or tool you need. Tell us what isn't working in your business, and we'll help map the digital path.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Problem Cards Selector Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {siteData.problems.map((prob) => {
              const isSelected = selectedProblemId === prob.id;
              return (
                <button
                  key={prob.id}
                  onClick={() => setSelectedProblemId(prob.id)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-red-600/15 border-red-500 text-white shadow-lg shadow-red-500/10"
                      : "bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-heading font-bold">{prob.label}</span>
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                      isSelected ? "bg-red-500 text-white" : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Redwolf Response & Solution Blueprint */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProblem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl bg-glass-card border border-red-500/30 shadow-2xl space-y-6 relative overflow-hidden"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-red-400 font-bold uppercase tracking-wider">
                  <Sparkles className="h-4 w-4" />
                  <span>REDWOLF DIAGNOSIS</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                    "{selectedProblem.label}"
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProblem.response}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">RECOMMENDED DIGITAL PATH</div>
                  <div className="text-sm font-bold text-amber-400 font-heading">
                    {selectedProblem.recommendedCapability}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (onOpenEnquiryWithProblem) {
                        onOpenEnquiryWithProblem(selectedProblem.id);
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-red-600/25 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                  >
                    <span>{selectedProblem.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
