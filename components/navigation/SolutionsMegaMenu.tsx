"use client";

import React from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { primaryNavigation, globalCTAs } from "@/data/navigation";

interface SolutionsMegaMenuProps {
  onClose?: () => void;
}

export function SolutionsMegaMenu({ onClose }: SolutionsMegaMenuProps) {
  const solutionsGroup = primaryNavigation.find((g) => g.name === "Solutions");

  if (!solutionsGroup || !solutionsGroup.items) return null;

  return (
    <div className="w-full bg-[#0B1220] border-b border-slate-800/80 shadow-2xl backdrop-blur-xl py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            REDWOLF CAPABILITIES
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Problem-first software & growth systems
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutionsGroup.items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="group p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 flex items-center text-[11px] font-mono text-slate-400 group-hover:text-amber-400 transition-colors">
                <span>Explore {item.name} →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Compass className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Not sure which capability fits your friction?</span>
          </div>

          <Link
            href={globalCTAs.diagnostic.href}
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>{globalCTAs.diagnostic.labelWithArrow}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
