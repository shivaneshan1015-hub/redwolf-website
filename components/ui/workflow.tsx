import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface WorkflowStep {
  stepNumber?: string;
  label: string;
  description?: string;
}

export interface WorkflowProps {
  title?: string;
  subtitle?: string;
  steps: WorkflowStep[] | string[];
  className?: string;
}

export function Workflow({ title, subtitle, steps, className = "" }: WorkflowProps) {
  const formattedSteps: WorkflowStep[] = steps.map((s, idx) => {
    if (typeof s === "string") {
      return {
        stepNumber: `0${idx + 1}`,
        label: s,
      };
    }
    return {
      stepNumber: s.stepNumber || `0${idx + 1}`,
      label: s.label,
      description: s.description,
    };
  });

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 ${className}`}>
      {(title || subtitle) && (
        <div className="space-y-1.5 border-b border-slate-800 pb-4">
          {title && <h3 className="text-xl font-heading font-extrabold text-white">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-400 font-mono">{subtitle}</p>}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {formattedSteps.map((step, idx) => (
          <React.Fragment key={step.label + idx}>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 space-y-1 min-w-[140px] flex-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-red-400 font-bold">
                <span>{step.stepNumber}</span>
                <CheckCircle2 className="h-3 w-3 text-red-500/80" />
              </div>
              <div className="text-xs font-heading font-extrabold uppercase text-white tracking-wider">
                {step.label}
              </div>
              {step.description && (
                <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                  {step.description}
                </p>
              )}
            </div>

            {idx < formattedSteps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-red-500 shrink-0 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
