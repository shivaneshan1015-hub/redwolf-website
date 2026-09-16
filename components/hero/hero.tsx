import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { CTAButton } from "@/components/ui/cta-button";

export interface HeroProps {
  eyebrow?: string;
  headline: React.ReactNode;
  supportingCopy: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  diagnosticCTA?: {
    label: string;
    href: string;
  };
  visual?: React.ReactNode;
  className?: string;
}

export function Hero({
  eyebrow,
  headline,
  supportingCopy,
  primaryCTA,
  secondaryCTA,
  diagnosticCTA,
  visual,
  className = "",
}: HeroProps) {
  return (
    <section className={`relative bg-[#0B1220] text-white pt-24 pb-16 sm:pb-24 overflow-hidden border-b border-slate-800/80 ${className}`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 ${visual ? "lg:grid-cols-12 gap-12" : "gap-8 max-w-4xl"} items-center`}>
          {/* Main Hero Content */}
          <div className={`${visual ? "lg:col-span-7" : "w-full"} space-y-6`}>
            {eyebrow && (
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full">
                {eyebrow}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.05]">
              {headline}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              {supportingCopy}
            </p>

            {(primaryCTA || secondaryCTA) && (
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {primaryCTA && (
                  <CTAButton variant="primary" size="lg" href={primaryCTA.href}>
                    {primaryCTA.label}
                  </CTAButton>
                )}

                {secondaryCTA && (
                  <CTAButton variant="secondary" size="lg" href={secondaryCTA.href}>
                    {secondaryCTA.label}
                  </CTAButton>
                )}
              </div>
            )}

            {/* Diagnostic Quick Link */}
            {diagnosticCTA && (
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <Compass className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300">Not sure what you need?</span>
                <Link
                  href={diagnosticCTA.href}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-400/40 hover:decoration-amber-300 transition-all"
                >
                  {diagnosticCTA.label}
                </Link>
              </div>
            )}
          </div>

          {/* Optional Right Visual Component */}
          {visual && <div className="lg:col-span-5">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
