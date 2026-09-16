import React from "react";
import { ArrowRight } from "lucide-react";

interface SolutionWorkflowVisualizerProps {
  workflow: string[];
  capabilityName: string;
}

export function SolutionWorkflowVisualizer({
  workflow,
  capabilityName,
}: SolutionWorkflowVisualizerProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          {capabilityName} WORKFLOW SYSTEM
        </span>
        <span className="text-xs text-slate-400 font-mono">
          Sequential Intervention Stages
        </span>
      </div>

      {/* Desktop / Tablet Horizontal Workflow Flow */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        {workflow.map((step, idx) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono font-bold transition-all hover:border-red-500/40 hover:text-white">
              <span className="text-[10px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                0{idx + 1}
              </span>
              <span>{step}</span>
            </div>
            {idx < workflow.length - 1 && (
              <ArrowRight className="h-4 w-4 text-red-500/80 shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Vertical Flow */}
      <div className="grid sm:hidden grid-cols-1 gap-2.5">
        {workflow.map((step, idx) => (
          <div
            key={step}
            className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono font-bold text-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
                STAGE 0{idx + 1}
              </span>
              <span>{step}</span>
            </div>
            {idx < workflow.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 text-red-500 rotate-90" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
