"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ArrowRight, Play, CheckCircle2, ShieldCheck, Activity, Truck, Users } from "lucide-react";
import siteData from "@/data/site-data.json";

interface EasyTrackProps {
  onOpenEnquiry?: () => void;
}

export function EasyTrackSection({ onOpenEnquiry }: EasyTrackProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "demo">("overview");
  const [demoFilter, setDemoFilter] = useState("all");

  const sampleDispatchJobs = [
    { id: "JOB-101", vehicle: "Ashok Leyland 12M Coach", status: "In Transit", driver: "Karthik R.", route: "Madurai → Salem", time: "14 mins ago" },
    { id: "JOB-102", vehicle: "Force Traveller 3700", status: "Scheduled", driver: "Murugan P.", route: "Srivilliputhur → Trichy", time: "Direct" },
    { id: "JOB-103", vehicle: "Tata Winger 15-Seater", status: "Delivered", driver: "Senthil K.", route: "Karur → Namakkal", time: "Completed" },
    { id: "JOB-104", vehicle: "Bolero Maxi Truck", status: "In Transit", driver: "Anand M.", route: "Madurai → Coimbatore", time: "42 mins ago" }
  ];

  return (
    <section id="product" className="py-24 bg-[#0d111d] relative border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tag */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>{siteData.productShowcase.tagline}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            We don't just recommend technology. <br />
            <span className="text-red-500">We build it.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {siteData.productShowcase.headline}
          </p>
        </div>

        {/* Main Product Showcase Box */}
        <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-red-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-96 w-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Mode Switch Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 font-heading font-extrabold text-xl">
                ET
              </div>
              <div>
                <h3 className="text-2xl font-heading font-extrabold text-white">
                  {siteData.productShowcase.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Logistics & Operations SaaS Platform
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Product Overview
              </button>
              <button
                onClick={() => setActiveTab("demo")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
                  activeTab === "demo"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Try Live Demo</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Product Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-slate-300 text-base leading-relaxed">
                  {siteData.productShowcase.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                    THE PROBLEM EASY TRACK SOLVES:
                  </span>
                  <p className="text-sm text-slate-200">
                    {siteData.productShowcase.problemAddressed}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400 font-bold uppercase block">
                    KEY CAPABILITIES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {siteData.productShowcase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-200">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab("demo")}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Launch Interactive Demo</span>
                  </button>

                  <button
                    onClick={onOpenEnquiry}
                    className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl cursor-pointer"
                  >
                    <span>Build Similar SaaS for Your Business</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                  <span className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-emerald-400" /> EASY TRACK REALTIME HUB
                  </span>
                  <span className="text-emerald-400 font-bold">ONLINE</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Active Fleet</span>
                    <div className="text-xl font-bold text-white">48 Units</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">On-Time Dispatch</span>
                    <div className="text-xl font-bold text-emerald-400">99.4%</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-bold">Automated WhatsApp Alerts</span>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Passengers & dispatch managers automatically receive GPS location links and ETA updates via WhatsApp API.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Simulation Demo */}
          {activeTab === "demo" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-bold text-white">Easy Track Live Dispatch Console Simulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">Filter Status:</span>
                  <select
                    value={demoFilter}
                    onChange={(e) => setDemoFilter(e.target.value)}
                    className="bg-slate-900 text-white text-xs font-mono p-2 rounded-lg border border-slate-800 focus:outline-none"
                  >
                    <option value="all">All Jobs (4)</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 uppercase">
                    <tr>
                      <th className="p-3">Job ID</th>
                      <th className="p-3">Vehicle Details</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Assigned Driver</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    {sampleDispatchJobs
                      .filter((job) => demoFilter === "all" || job.status === demoFilter)
                      .map((job) => (
                        <tr key={job.id} className="hover:bg-slate-900/60">
                          <td className="p-3 font-bold text-red-400">{job.id}</td>
                          <td className="p-3 font-semibold text-white">{job.vehicle}</td>
                          <td className="p-3 text-slate-300">{job.route}</td>
                          <td className="p-3 text-slate-400">{job.driver}</td>
                          <td className="p-3">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                job.status === "In Transit"
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : job.status === "Delivered"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-slate-800 text-slate-300 border border-slate-700"
                              }`}
                            >
                              {job.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>⚡ Interactive Demo simulation using safe sample data.</span>
                <button
                  onClick={onOpenEnquiry}
                  className="text-red-400 hover:text-red-300 font-bold uppercase tracking-wider font-mono flex items-center gap-1 cursor-pointer"
                >
                  Request Full Product Architecture Consultation <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
