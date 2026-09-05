"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Rocket, BarChart3, Lock } from "lucide-react";

interface DeliverablesTimelineProps {
  onOpenEnquiry?: () => void;
}

const roadmapSteps = [
  {
    month: "MONTH 01",
    phase: "Audit & Architecture",
    title: "Technical Foundation & Schema Setup",
    description: "Deep audit of technical site health, Google Business Profile optimization, Schema.org AI markup, and ad audience targeting.",
    deliverables: [
      "Full Technical SEO & Speed Audit Report",
      "Schema.org JSON-LD (AEO / Voice Search)",
      "Meta & Google Ad Funnel Strategy",
      "Next.js App / Web Architecture Blueprint"
    ],
    status: "Foundation Phase"
  },
  {
    month: "MONTH 02",
    phase: "Execution & Launch",
    title: "Campaign Go-Live & App Deployment",
    description: "Publishing high-converting ad copy, deploying high-speed web/mobile applications, and running local map pack campaigns.",
    deliverables: [
      "Meta & Google Search Ads Live Launch",
      "District Landing Pages & GMB Rankings",
      "Next.js Web / Mobile Application Deploy",
      "EasyTrack SaaS Fleet Dispatch Setup"
    ],
    status: "Growth Phase"
  },
  {
    month: "MONTH 03+",
    phase: "Dominance & Scale",
    title: "AI Search Dominance & ROAS Scale",
    description: "Indexing entity knowledge graphs across ChatGPT, Perplexity & Gemini while scaling ad budgets for maximum revenue.",
    deliverables: [
      "Generative Engine Optimization (GEO Citations)",
      "Ad Retargeting Funnel Scale & CPA Cut",
      "Monthly Organic Ranking & Lead Analytics",
      "24/7 Tech Support & Feature Upgrades"
    ],
    status: "Scale Phase"
  }
];

export function DeliverablesTimelineSection({ onOpenEnquiry }: DeliverablesTimelineProps) {
  return (
    <section id="deliverables" className="py-24 bg-[#090d16] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Clock className="h-3.5 w-3.5" />
            <span>Execution Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            What Happens When You <span className="text-red-500">Partner With Redwolf</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            No guesswork. Here is the exact 90-day roadmap we follow to deliver organic search dominance, high-ROI ads, and custom software builds.
          </p>
        </div>

        {/* 3-Column Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roadmapSteps.map((step, idx) => (
            <motion.div
              key={step.month}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative flex flex-col p-8 rounded-3xl bg-glass-card border border-slate-800 hover:border-red-500/40 shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <span className="text-xs font-mono font-bold uppercase text-red-400 px-3 py-1 rounded bg-red-500/10 border border-red-500/20">
                  {step.month}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {step.phase}
                </span>
              </div>

              <div className="py-6 space-y-2 flex-1">
                <h3 className="text-xl font-heading font-extrabold text-white">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-3 mt-auto">
                <span className="text-xs font-mono text-slate-400 font-bold uppercase block">
                  KEY DELIVERABLES:
                </span>
                <ul className="space-y-2">
                  {step.deliverables.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenEnquiry}
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            <span>Start Your 90-Day Growth Cycle</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
