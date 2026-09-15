import React from "react";
import { brandData } from "@/data/brand";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface SystemLineProps {
  className?: string;
  activeStage?: string;
}

export function RedwolfSystemLine({ className = "", activeStage }: SystemLineProps) {
  return (
    <div className={`w-full py-6 ${className}`}>
      <div className="relative">
        {/* Connecting System Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500/20 via-red-500 to-red-500/20 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {brandData.systemStages.map((stg) => {
            const isActive = activeStage === stg.id;

            return (
              <div
                key={stg.id}
                className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 border-red-500 shadow-lg shadow-red-500/10 scale-[1.02]"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    {stg.step}
                  </span>
                  {isActive && <CheckCircle2 className="h-4 w-4 text-red-500 animate-pulse" />}
                </div>

                <h4 className="text-sm font-heading font-extrabold text-white tracking-wider">
                  {stg.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal line-clamp-3">
                  {stg.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
