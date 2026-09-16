import React from "react";
import { constructMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import { BasicCard, SolutionCard, WorkCard, ProductCard } from "@/components/ui/cards";
import { RedwolfSystemLine } from "@/components/ui/system-line";
import { ProblemSignalCard } from "@/components/ui/problem-signal";
import { brandData } from "@/data/brand";
import { solutionsData } from "@/data/solutions";

export const metadata = constructMetadata({
  title: "Design System & Foundational Primitives",
  description: "Internal design system validation route for Redwolf UI tokens, typography, buttons, forms, and system components.",
  pathname: "/design-system/",
  noindex: true,
});

export default function DesignSystemPage() {
  return (
    <div className="bg-[#0B1220] min-h-screen text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-8 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
          PHASE 17 FOUNDATION
        </span>
        <h1 className="text-4xl font-heading font-extrabold text-white">Redwolf Design System</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Visual tokens, typography scale, UI primitives, and signature system components for the Redwolf website architecture.
        </p>
      </div>

      {/* 1. COLOR PALETTE */}
      <section className="space-y-6">
        <SectionHeading eyebrow="TOKENS" title="Color Palette & Semantic Ratio" />
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#E53935] text-white border border-red-400/30 space-y-1">
            <span className="font-bold block">Redwolf Red</span>
            <span>#E53935</span>
            <span className="text-[10px] opacity-80 block">Accent (5%)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0B1220] text-white border border-slate-700 space-y-1">
            <span className="font-bold block">Redwolf Navy</span>
            <span>#0B1220</span>
            <span className="text-[10px] opacity-80 block">Dark (25%)</span>
          </div>
          <div className="p-4 rounded-xl bg-[#111827] text-white border border-slate-700 space-y-1">
            <span className="font-bold block">Deep Neutral</span>
            <span>#111827</span>
            <span className="text-[10px] opacity-80 block">Surface</span>
          </div>
          <div className="p-4 rounded-xl bg-[#4B5563] text-white border border-slate-600 space-y-1">
            <span className="font-bold block">Body Neutral</span>
            <span>#4B5563</span>
            <span className="text-[10px] opacity-80 block">Text</span>
          </div>
          <div className="p-4 rounded-xl bg-[#F7F7F5] text-slate-950 border border-slate-300 space-y-1">
            <span className="font-bold block">Light Neutral</span>
            <span>#F7F7F5</span>
            <span className="text-[10px] opacity-80 block">Background (60%)</span>
          </div>
          <div className="p-4 rounded-xl bg-white text-slate-950 border border-slate-300 space-y-1">
            <span className="font-bold block">White</span>
            <span>#FFFFFF</span>
            <span className="text-[10px] opacity-80 block">Card Surface</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 text-slate-300 border border-[#E5E7EB]/20 space-y-1">
            <span className="font-bold block">Border</span>
            <span>#E5E7EB</span>
            <span className="text-[10px] opacity-80 block">Divider</span>
          </div>
        </div>
      </section>

      {/* 2. TYPOGRAPHY SCALE */}
      <section className="space-y-6">
        <SectionHeading eyebrow="TYPOGRAPHY" title="Manrope (Headings) & Inter (Body/UI)" />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-mono text-slate-500 block mb-1">Display XL (72px)</span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight">
              From business problem to digital solution.
            </h1>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 block mb-1">H1 (56px)</span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              Different problems need different systems.
            </h1>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 block mb-1">H2 (44px)</span>
            <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
              Start with the problem. Build from there.
            </h2>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 block mb-1">H3 (32px)</span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Distribution operations, connected.
            </h3>
          </div>
          <div>
            <span className="text-xs font-mono text-slate-500 block mb-1">Body Large (18px Inter)</span>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl">
              Redwolf combines strategy, growth, design and technology to help businesses grow, operate smarter and build what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* 3. BUTTON SYSTEM */}
      <section className="space-y-6">
        <SectionHeading eyebrow="UI PRIMITIVES" title="Button System & Interactive States" />
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-4">
          <CTAButton variant="primary" href="/contact/">
            Start a conversation →
          </CTAButton>

          <CTAButton variant="secondary" href="/work/">
            Explore our work →
          </CTAButton>

          <CTAButton variant="tertiary" href="/diagnostic/">
            Find your digital path →
          </CTAButton>

          <CTAButton variant="phone" href="tel:+919943673790">
            Direct Helpline
          </CTAButton>

          <CTAButton variant="primary" isLoading={true}>
            Processing...
          </CTAButton>

          <CTAButton variant="primary" disabled={true}>
            Disabled State
          </CTAButton>
        </div>
      </section>

      {/* 4. REDWOLF SYSTEM LINE */}
      <section className="space-y-6">
        <SectionHeading eyebrow="SIGNATURE VISUAL" title="Redwolf System Line (6-Stage Methodology)" />
        <RedwolfSystemLine activeStage="diagnose" />
      </section>

      {/* 5. PROBLEM SIGNALS */}
      <section className="space-y-6">
        <SectionHeading eyebrow="DIAGNOSTIC SIGNALS" title="Interactive Problem Signal Primitives" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProblemSignalCard
            category="GROWTH"
            problemStatement="We're doing marketing, but the right customers aren't finding us."
            suggestedCapability="GROW"
            href="/solutions/grow"
          />
          <ProblemSignalCard
            category="OPERATIONS"
            problemStatement="Our team still depends on spreadsheets, calls and manual processes."
            suggestedCapability="BUILD"
            href="/solutions/build"
          />
        </div>
      </section>

      {/* 6. CARDS */}
      <section className="space-y-6">
        <SectionHeading eyebrow="CARD PRIMITIVES" title="Solution & Product Cards" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SolutionCard
            name={solutionsData.grow.name}
            heroHeadline={solutionsData.grow.heroHeadline}
            summary={solutionsData.grow.summary}
            href={`/solutions/${solutionsData.grow.slug}`}
          />
          <ProductCard
            name="EasyTrack"
            category="FMCG Distribution Management Software"
            tagline="Distribution operations, connected."
            summary="Helps FMCG distributors manage field sales, van inventory, routes, orders, credit, and collections from one connected platform."
            href="/products/easytrack"
          />
        </div>
      </section>
    </div>
  );
}
