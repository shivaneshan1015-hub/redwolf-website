import React from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, HelpCircle } from "lucide-react";

export interface ProblemSignalProps {
  category: string;
  problemStatement: string;
  suggestedCapability: string;
  href: string;
  className?: string;
}

export function ProblemSignalCard({
  category,
  problemStatement,
  suggestedCapability,
  href,
  className = "",
}: ProblemSignalProps) {
  return (
    <Link
      href={href}
      className={`group p-6 rounded-2xl bg-glass-card hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 ${className}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-full">
            {category} SIGNAL
          </span>
          <AlertCircle className="h-4 w-4 text-slate-500 group-hover:text-red-400 transition-colors" />
        </div>

        <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed italic group-hover:text-white transition-colors">
          &ldquo;{problemStatement}&rdquo;
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="font-mono text-slate-400">
          Redwolf Capability: <strong className="text-amber-400 font-bold">{suggestedCapability}</strong>
        </span>
        <ArrowRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
