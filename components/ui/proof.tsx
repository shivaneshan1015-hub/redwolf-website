import React from "react";
import { CheckCircle2, Quote } from "lucide-react";

export interface MetricBlockProps {
  label: string;
  value: string;
  context?: string;
  verified?: boolean;
  className?: string;
}

export function MetricBlock({ label, value, context, verified = true, className = "" }: MetricBlockProps) {
  return (
    <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 ${className}`}>
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>{label}</span>
        {verified && (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> VERIFIED
          </span>
        )}
      </div>
      <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white text-red-500">
        {value}
      </div>
      {context && <p className="text-xs text-slate-300 leading-relaxed">{context}</p>}
    </div>
  );
}

export interface QuoteBlockProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  className?: string;
}

export function QuoteBlock({ quote, author, role, company, className = "" }: QuoteBlockProps) {
  return (
    <div className={`p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 ${className}`}>
      <Quote className="h-6 w-6 text-red-500/60" />
      <p className="text-sm sm:text-base font-medium text-slate-200 italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="pt-2 border-t border-slate-800 text-xs">
        <div className="font-heading font-extrabold text-white">{author}</div>
        <div className="text-slate-400 font-mono">
          {role} {company && `• ${company}`}
        </div>
      </div>
    </div>
  );
}

export interface OutcomeBlockProps {
  title: string;
  problemBefore: string;
  solutionAfter: string;
  className?: string;
}

export function OutcomeBlock({ title, problemBefore, solutionAfter, className = "" }: OutcomeBlockProps) {
  return (
    <div className={`p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 ${className}`}>
      <h4 className="text-base font-heading font-extrabold text-white">{title}</h4>
      <div className="space-y-2 text-xs">
        <div className="p-3 rounded-xl bg-slate-950 border border-red-500/20 text-slate-300 space-y-1">
          <span className="text-[10px] font-mono font-bold text-red-400 uppercase">BEFORE (FRICTION)</span>
          <p className="leading-relaxed">{problemBefore}</p>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-slate-300 space-y-1">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">AFTER (DIGITAL SYSTEM)</span>
          <p className="leading-relaxed">{solutionAfter}</p>
        </div>
      </div>
    </div>
  );
}
