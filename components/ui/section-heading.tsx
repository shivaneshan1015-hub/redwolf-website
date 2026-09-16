import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl space-y-3 mb-10 ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
            light
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : "bg-red-500/10 text-red-500 border-red-500/20"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-4xl font-heading font-extrabold tracking-tight leading-tight ${
          light ? "text-white" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-sm sm:text-base leading-relaxed ${
            light ? "text-slate-300" : "text-slate-400"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
