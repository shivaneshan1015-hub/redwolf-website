import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import { SolutionCard, WorkCard, InsightCard } from "@/components/ui/cards";
import { RedwolfSystemLine } from "@/components/ui/system-line";
import { ProblemSignalCard } from "@/components/ui/problem-signal";
import {
  getBrandContent,
  getSolutionBySlug,
  getIndustries,
  getCaseStudies,
  getProductBySlug,
  getInsights,
} from "@/lib/cms";
import { Compass, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "Redwolf — From Business Problem to Digital Solution",
  description:
    "Redwolf is a digital growth and technology company that helps businesses solve growth, operational and product challenges through strategy, design, marketing and software.",
  pathname: "/",
});

export default function HomePage() {
  const brandData = getBrandContent();
  const easytrack = getProductBySlug("easytrack")!;
  const works = getCaseStudies();
  const insights = getInsights();
  const industries = getIndustries();

  const growSol = getSolutionBySlug("grow")!;
  const defineSol = getSolutionBySlug("define")!;
  const buildSol = getSolutionBySlug("build")!;
  const productizeSol = getSolutionBySlug("productize")!;

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 pt-20 sm:pt-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1220] text-white pt-8 pb-20 sm:pb-28 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full">
                DIGITAL GROWTH × TECHNOLOGY × PRODUCTS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.05]">
                From business problem to digital solution.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Redwolf combines strategy, growth, design and technology to help businesses grow, operate smarter and build what comes next.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <CTAButton variant="primary" size="lg" href="/contact">
                  Start a conversation
                </CTAButton>

                <CTAButton variant="secondary" size="lg" href="/work">
                  Explore our work
                </CTAButton>
              </div>

              {/* Diagnostic Quick Link */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                <Compass className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-300">Not sure what you need?</span>
                <Link
                  href="/diagnostic"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 underline decoration-amber-400/40 hover:decoration-amber-300 transition-all"
                >
                  Find your digital path →
                </Link>
              </div>
            </div>

            {/* Right Visual Diagram */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>OPERATIONAL MODEL</span>
                  <span className="text-red-400 font-bold">REDWOLF SYSTEM</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                    <span className="font-bold text-red-400">01. BUSINESS PROBLEM</span>
                    <span className="text-[10px] text-slate-500">Manual / Friction</span>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-red-500 rotate-90" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-red-500/40 text-white flex items-center justify-between shadow-lg shadow-red-500/10">
                    <span className="font-bold text-white">02. REDWOLF INTERVENTION</span>
                    <span className="text-[10px] text-amber-400">Discover → Build</span>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-red-500 rotate-90" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-between">
                    <span className="font-bold text-emerald-400">03. DIGITAL SYSTEM</span>
                    <span className="text-[10px] text-slate-500">Growth / Software</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
                  &ldquo;We turn business problems into digital systems.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* 2. PROBLEM SIGNALS SECTION */}
        <section>
          <SectionHeading
            eyebrow="PROBLEM-FIRST APPROACH"
            title="Your business doesn't need another vendor."
            subtitle="It needs someone who understands what's actually getting in the way."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <ProblemSignalCard
              category="BRAND"
              problemStatement="Our website doesn't represent the business we've become."
              suggestedCapability="DEFINE"
              href="/solutions/define"
            />

            <ProblemSignalCard
              category="TECHNOLOGY"
              problemStatement="We know what we want to build, but don't know where to start."
              suggestedCapability="BUILD"
              href="/solutions/build"
            />

            <ProblemSignalCard
              category="PRODUCT"
              problemStatement="We have a workflow that could become software."
              suggestedCapability="PRODUCTIZE"
              href="/solutions/productize"
            />

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  REDWOLF DIAGNOSTIC
                </span>
                <h3 className="text-lg font-heading font-bold text-white">Not sure which problem is primary?</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Take our diagnostic questionnaire to identify your core digital path.
                </p>
              </div>

              <CTAButton variant="phone" size="sm" href="/diagnostic">
                Start Diagnostic →
              </CTAButton>
            </div>
          </div>
        </section>

        {/* 3. REDWOLF SYSTEM (6-STAGE METHODOLOGY) */}
        <section className="bg-slate-900/90 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
          <SectionHeading
            eyebrow="OPERATING SYSTEM"
            title="Start with the problem. Build from there."
            subtitle="Every engagement starts by understanding the business, identifying what is actually getting in the way, and designing the right path forward."
            light={true}
          />

          <RedwolfSystemLine />

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center text-xs text-slate-400 font-mono">
            The solution is different every time. The thinking stays consistent.
          </div>
        </section>

        {/* 4. CAPABILITY MODEL (SOLUTIONS) */}
        <section>
          <SectionHeading
            eyebrow="CAPABILITY MODEL"
            title="Different problems need different systems."
            subtitle="Explore how our four core capabilities combine to solve specific growth and operational friction."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SolutionCard
              name={growSol.name}
              heroHeadline={growSol.heroHeadline}
              summary={growSol.summary}
              href={`/solutions/${growSol.slug}`}
            />

            <SolutionCard
              name={defineSol.name}
              heroHeadline={defineSol.heroHeadline}
              summary={defineSol.summary}
              href={`/solutions/${defineSol.slug}`}
            />

            <SolutionCard
              name={buildSol.name}
              heroHeadline={buildSol.heroHeadline}
              summary={buildSol.summary}
              href={`/solutions/${buildSol.slug}`}
            />

            <SolutionCard
              name={productizeSol.name}
              heroHeadline={productizeSol.heroHeadline}
              summary={productizeSol.summary}
              href={`/solutions/${productizeSol.slug}`}
            />
          </div>
        </section>

        {/* 5. CORE PRINCIPLES */}
        <section className="bg-slate-900/80 p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
          <SectionHeading
            eyebrow="OUR PHILOSOPHY"
            title="The way we solve matters as much as what we build."
            subtitle="Five core principles that guide every strategy, line of code, and digital experience."
            light={true}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandData.principles.map((pr, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-red-400">0{idx + 1}.</span>
                <h3 className="text-base font-heading font-bold text-white">{pr.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{pr.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. SELECTED WORK */}
        <section>
          <SectionHeading
            eyebrow="REAL BUSINESS INTERVENTIONS"
            title="Built around real business problems."
            subtitle="Explore case studies showing how Redwolf turns operational friction into scalable digital systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {works.map((wk) => (
              <WorkCard
                key={wk.id}
                client={wk.client}
                category={wk.category}
                industry={wk.industry}
                summary={wk.summary}
                href={`/work/${wk.slug}`}
                capabilitiesUsed={wk.capabilitiesUsed}
              />
            ))}
          </div>
        </section>

        {/* 7. EASYTRACK FEATURE */}
        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
              REDWOLF PRODUCT
            </span>
            <span className="text-xs font-mono text-slate-400">FMCG Distribution Management Software</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              {easytrack.heroHeadline}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {easytrack.summary}
            </p>
          </div>

          {/* Workflow Diagram */}
          <div className="p-6 bg-slate-950/90 rounded-2xl border border-slate-800 space-y-4">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              OFFLINE-FIRST DISTRIBUTION WORKFLOW
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {easytrack.workflow.map((wf, idx) => (
                <React.Fragment key={wf}>
                  <span className="bg-slate-900 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-800 font-semibold">
                    {wf}
                  </span>
                  {idx < easytrack.workflow.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <CTAButton variant="primary" href="/products/easytrack">
              Explore EasyTrack →
            </CTAButton>
            <CTAButton variant="secondary" href="/solutions/productize">
              Build a product with Redwolf
            </CTAButton>
          </div>
        </section>

        {/* 8. TARGET INDUSTRIES */}
        <section>
          <SectionHeading
            eyebrow="TARGET INDUSTRIES"
            title="Industry Workflows We Systemize"
            subtitle="Tailored digital solutions built around the unique operational realities of specific industry sectors."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group p-6 rounded-2xl bg-glass-card border border-slate-800 hover:border-red-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-heading font-bold text-white group-hover:text-red-400 transition-colors">
                      {ind.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="text-sm font-heading font-bold text-slate-200">{ind.heroHeadline}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {ind.businessReality}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Explore {ind.name} →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 9. INSIGHTS / FIELD NOTES */}
        <section>
          <SectionHeading
            eyebrow="REDWOLF FIELD NOTES"
            title="Practical thinking from digital battlegrounds."
            subtitle="Observations, experiments and field notes from the intersection of business, technology, growth and digital systems."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((ins) => (
              <InsightCard
                key={ins.slug}
                title={ins.title}
                excerpt={ins.excerpt}
                category={ins.category}
                type={ins.type}
                readTime={ins.readTime}
                publishedAt={ins.publishedAt}
                href={`/insights/${ins.slug}`}
              />
            ))}
          </div>
        </section>

        {/* 10. DIAGNOSTIC CTA BANNER */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              REDWOLF DIAGNOSTIC
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
              You don&apos;t need to know the solution. Start with the problem.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Answer diagnostic questions regarding your business friction and receive a personalized capability recommendation and digital path.
            </p>
          </div>

          <CTAButton variant="phone" size="lg" href="/diagnostic" className="shrink-0">
            Find your digital path →
          </CTAButton>
        </section>

        {/* 11. FINAL CONTACT CTA SECTION */}
        <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">START A CONVERSATION</span>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">Let&apos;s start with the problem.</h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Tell us what&apos;s getting in the way of your business growth or operations. We&apos;ll help you design the right digital system.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <CTAButton variant="primary" size="lg" href="/contact">
              Start a conversation →
            </CTAButton>
            <CTAButton variant="secondary" size="lg" href="tel:+919943673790">
              Call +91 99436 73790
            </CTAButton>
          </div>
        </section>
      </div>
    </div>
  );
}
