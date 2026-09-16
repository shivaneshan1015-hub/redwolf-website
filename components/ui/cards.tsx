import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface BasicCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ElementType;
  className?: string;
}

export function BasicCard({ title, description, href, icon: Icon, className = "" }: BasicCardProps) {
  const CardContent = (
    <div className={`p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-slate-700 transition-all space-y-3 ${className}`}>
      {Icon && (
        <div className="p-3 bg-red-500/10 text-red-400 rounded-xl w-fit">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <h3 className="text-lg font-heading font-bold text-white">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}

export interface SolutionCardProps {
  name: string;
  heroHeadline: string;
  summary: string;
  href: string;
  iconName?: string;
  className?: string;
}

export function SolutionCard({ name, heroHeadline, summary, href, className = "" }: SolutionCardProps) {
  return (
    <Link
      href={href}
      className={`group p-6 sm:p-8 rounded-2xl bg-glass-card hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between space-y-6 ${className}`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
            {name}
          </span>
          <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
          {heroHeadline}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {summary}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center text-xs font-bold text-slate-300 group-hover:text-white">
        <span>Explore {name} System</span>
        <ArrowRight className="h-4 w-4 ml-1.5 text-red-500" />
      </div>
    </Link>
  );
}

export interface WorkCardProps {
  client: string;
  category: string;
  industry: string;
  summary: string;
  href: string;
  capabilitiesUsed: string[];
  heroImage?: string;
  className?: string;
}

export function WorkCard({ client, category, industry, summary, href, capabilitiesUsed, className = "" }: WorkCardProps) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl overflow-hidden bg-glass-card border border-slate-800 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      <div className="p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">
            {industry}
          </span>
          {capabilitiesUsed.map((cap) => (
            <span key={cap} className="text-[10px] font-mono font-bold uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              {cap}
            </span>
          ))}
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
          {client}
        </h3>

        <p className="text-xs text-amber-400 font-semibold">{category}</p>

        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
          {summary}
        </p>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
        <span>View System Intervention</span>
        <ArrowRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}

export interface ProductCardProps {
  name: string;
  category: string;
  tagline: string;
  summary: string;
  href: string;
  className?: string;
}

export function ProductCard({ name, category, tagline, summary, href, className = "" }: ProductCardProps) {
  return (
    <div className={`p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
          REDWOLF PRODUCT
        </span>
        <span className="text-xs font-semibold text-slate-400">{category}</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-3xl font-heading font-extrabold text-white">{name}</h3>
        <p className="text-base font-medium text-amber-400">&ldquo;{tagline}&rdquo;</p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">{summary}</p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-4">
        <Link
          href={href}
          className="inline-flex items-center justify-center font-heading font-extrabold text-xs uppercase tracking-wider bg-[#E53935] hover:bg-[#D32F2F] text-white px-6 py-3 rounded-xl shadow-md transition-colors"
        >
          <span>Explore {name}</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}

export interface InsightCardProps {
  title: string;
  excerpt: string;
  category: string;
  type: string;
  readTime: string;
  publishedAt: string;
  href: string;
  className?: string;
}

export function InsightCard({ title, excerpt, type, readTime, href, className = "" }: InsightCardProps) {
  return (
    <Link
      href={href}
      className={`group p-6 rounded-2xl bg-glass-card border border-slate-800/80 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between ${className}`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono">
          <span className="text-red-400 font-bold uppercase tracking-wider">{type}</span>
          <span className="text-slate-500">{readTime}</span>
        </div>

        <h3 className="text-lg font-heading font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
        <span>Read Field Note</span>
        <ArrowRight className="h-4 w-4 text-red-500 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
