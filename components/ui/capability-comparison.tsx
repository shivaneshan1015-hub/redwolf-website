import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Compass, Cpu, Box } from "lucide-react";

export function CapabilityComparisonMatrix() {
  const comparisonItems = [
    {
      situation: "Customers aren't finding us or organic leads are low",
      capability: "GROW",
      focus: "Discoverability, AEO/GEO, Google & Meta Ads, Conversion Architecture",
      href: "/solutions/grow",
      icon: TrendingUp,
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      situation: "The business has outgrown its current brand & digital experience",
      capability: "DEFINE",
      focus: "Brand Strategy, Message Hierarchy, Visual Identity, UX/UI Architecture",
      href: "/solutions/define",
      icon: Compass,
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      situation: "Operational processes rely on manual paperwork, calls & spreadsheets",
      capability: "BUILD",
      focus: "Custom Business Web Applications, Operational Automation, Digital Systems",
      href: "/solutions/build",
      icon: Cpu,
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      situation: "An internal operational workflow could become a commercial SaaS product",
      capability: "PRODUCTIZE",
      focus: "Product Strategy, MVP Engineering, Offline-First SaaS, Field Apps",
      href: "/solutions/productize",
      icon: Box,
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          CAPABILITY ALIGNMENT MATRIX
        </span>
        <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Matching Your Business Friction to the Right System
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Redwolf capabilities correspond to specific operational challenges. Identify your primary friction point below to explore the intervention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisonItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.capability}
              href={item.href}
              className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase ${item.badgeColor}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.capability}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                  &ldquo;{item.situation}&rdquo;
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-mono">
                  System Focus: {item.focus}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono font-bold text-slate-300 group-hover:text-red-400 transition-colors">
                <span>Explore {item.capability} Capability</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
