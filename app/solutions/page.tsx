import React from "react";
import { Metadata } from "next";
import { CheckCircle2, HelpCircle, ShieldCheck, Zap } from "lucide-react";
import { getSolutions, getFeaturedCaseStudies, getProducts } from "@/lib/cms";
import { PageContainer, SectionContainer, Grid } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SolutionCard, WorkCard, ProductCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CapabilityComparisonMatrix } from "@/components/ui/capability-comparison";

export const metadata: Metadata = {
  title: "Digital Solutions Architecture | GROW, DEFINE, BUILD, PRODUCTIZE | Redwolf",
  description:
    "Explore Redwolf's 4 core capability systems: GROW (acquisition), DEFINE (brand & UX), BUILD (custom software), and PRODUCTIZE (SaaS creation). Turn business problems into digital systems.",
  keywords: [
    "Redwolf solutions",
    "Digital growth strategy",
    "Brand positioning",
    "Custom web applications",
    "SaaS product development",
    "Business automation",
  ],
  openGraph: {
    title: "Digital Solutions Architecture | Redwolf",
    description: "Different problems need different systems. Discover how Redwolf turns business problems into digital systems.",
    type: "website",
    url: "https://redwolf.in/solutions",
  },
};

export default function SolutionsIndexPage() {
  const solutions = getSolutions();
  const featuredWork = getFeaturedCaseStudies();
  const products = getProducts();
  const easytrack = products.find((p) => p.slug === "easytrack");

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <SectionContainer className="relative overflow-hidden border-b border-slate-800/80 pb-16 sm:pb-24">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

        <PageContainer>
          <Breadcrumbs items={[{ label: "Solutions" }]} />

          <div className="mt-8 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
              <Zap className="h-3.5 w-3.5 text-red-500" />
              SOLUTIONS ARCHITECTURE
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-none">
              Different problems need <span className="text-red-500">different systems.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              We don&apos;t build one-size-fits-all websites. We turn business growth, positioning, operational friction, and product vision into four distinct, resilient digital systems.
            </p>

            {/* Core Operating Principle Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  REDWOLF OPERATING SYSTEM
                </span>
                <p className="text-sm font-heading font-bold text-slate-200">
                  DISCOVER → DIAGNOSE → DESIGN → BUILD → DEPLOY → EVOLVE
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <CTAButton href="/diagnostic" variant="primary" size="sm">
                  Run Diagnostic
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" size="sm">
                  Talk to Team
                </CTAButton>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 2. THE 4 CAPABILITY SYSTEMS */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
        <PageContainer>
          <SectionHeading
            eyebrow="CAPABILITY ARCHITECTURE"
            title="Four Specialized Systems Built for Real Outcomes"
            subtitle="Whether you need to generate demand, clarify your enterprise message, digitize paper workflows, or create a SaaS product, select the capability that matches your current business bottleneck."
          />

          <Grid columns={2} className="mt-12">
            {solutions.map((sol) => (
              <SolutionCard
                key={sol.id}
                name={sol.name}
                heroHeadline={sol.heroHeadline}
                summary={sol.summary}
                href={sol.cta.href}
                iconName={sol.iconName}
              />
            ))}
          </Grid>
        </PageContainer>
      </SectionContainer>

      {/* 3. CAPABILITY COMPARISON MATRIX */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
        <PageContainer>
          <SectionHeading
            eyebrow="STRATEGIC ALIGNMENT"
            title="Which System Fits Your Current Business Phase?"
            subtitle="Clear comparison matrix showing how GROW, DEFINE, BUILD, and PRODUCTIZE differ in business situation, core bottleneck, outcome, and primary deliverables."
          />

          <div className="mt-12">
            <CapabilityComparisonMatrix />
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 4. PROOF OF EXECUTION */}
      {featuredWork.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
          <PageContainer>
            <SectionHeading
              eyebrow="PROVED IN PRODUCTION"
              title="Real Interventions for Enterprise & Regional Businesses"
              subtitle="See how our capability systems solve operational, visibility, and commercial bottlenecks in practice."
            />

            <Grid columns={2} className="mt-12">
              {featuredWork.slice(0, 2).map((work) => (
                <WorkCard
                  key={work.id}
                  client={work.client}
                  category={work.category}
                  industry={work.industry}
                  summary={work.summary}
                  href={`/work/${work.slug}`}
                  capabilitiesUsed={work.capabilitiesUsed}
                />
              ))}
            </Grid>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 5. PRODUCT HIGHLIGHT: EASYTRACK */}
      {easytrack && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/60">
          <PageContainer>
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                eyebrow="FLAGSHIP PRODUCTIZE SYSTEM"
                title="Built from Real Field Operations"
                subtitle="Our PRODUCTIZE capability in action—EasyTrack is a commercial field order tracking platform engineered for FMCG distributors."
              />

              <div className="mt-8">
                <ProductCard
                  name={easytrack.name}
                  category={easytrack.category}
                  tagline={easytrack.tagline}
                  summary={easytrack.summary}
                  href={`/products/${easytrack.slug}`}
                />
              </div>
            </div>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 6. DIAGNOSTIC PATHWAY & FINAL CONVERSION BANNER */}
      <SectionContainer className="py-16 sm:py-24">
        <PageContainer>
          <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-red-500/30 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400">
              <HelpCircle className="h-3.5 w-3.5" />
              NOT SURE WHICH SYSTEM YOU NEED?
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Run the Redwolf Diagnostic Engine
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Answer 4 quick operational questions to clarify whether your business needs a GROW, DEFINE, BUILD, or PRODUCTIZE intervention.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/diagnostic" variant="primary" size="lg">
                Start 60-Second Diagnostic
              </CTAButton>

              <CTAButton href="/contact" variant="secondary" size="lg">
                Schedule Strategy Call
              </CTAButton>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Free System Recommendation
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Direct Engineer Consultation
              </span>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>
    </main>
  );
}
