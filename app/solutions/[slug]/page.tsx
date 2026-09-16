import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  TrendingUp,
  Compass,
  Cpu,
  Box,
  AlertCircle,
  Layers,
  HelpCircle,
  Building2,
  CheckCircle2,
} from "lucide-react";
import {
  getSolutions,
  getSolutionBySlug,
  getRelatedIndustriesForSolution,
  getRelatedWorkForSolution,
  getRelatedProductsForSolution,
  getRelatedInsightsForSolution,
  getFAQsForSolution,
} from "@/lib/cms";
import { PageContainer, SectionContainer, Grid } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkCard, ProductCard, InsightCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SolutionWorkflowVisualizer } from "@/components/ui/solution-workflow-visualizer";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Compass,
  Cpu,
  Box,
};

export async function generateStaticParams() {
  const solutions = getSolutions();
  return solutions.map((sol) => ({
    slug: sol.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | Redwolf",
    };
  }

  return {
    title: solution.seo.title,
    description: solution.seo.description,
    keywords: solution.seo.keywords,
    openGraph: {
      title: solution.seo.title,
      description: solution.seo.description,
      type: "article",
      url: `https://redwolf.in/solutions/${solution.slug}`,
    },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const IconComponent = solution.iconName ? iconMap[solution.iconName] || Layers : Layers;
  const relatedIndustries = getRelatedIndustriesForSolution(slug);
  const relatedWork = getRelatedWorkForSolution(slug);
  const relatedProducts = getRelatedProductsForSolution(slug);
  const relatedInsights = getRelatedInsightsForSolution(slug);
  const faqs = getFAQsForSolution(slug);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <SectionContainer className="relative overflow-hidden border-b border-slate-800/80 pb-16 sm:pb-24">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

        <PageContainer>
          <Breadcrumbs
            items={[
              { label: "Solutions", href: "/solutions" },
              { label: solution.name },
            ]}
          />

          <div className="mt-8 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
              <IconComponent className="h-4 w-4 text-red-500" />
              SYSTEM CAPABILITY: {solution.name}
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {solution.heroHeadline}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              {solution.summary}
            </p>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                STRATEGIC POSITIONING
              </span>
              <p className="text-sm font-medium text-slate-200">
                {solution.positioning}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CTAButton href={`/diagnostic?solution=${solution.slug}`} variant="primary" size="lg">
                Diagnose {solution.name} Readiness
              </CTAButton>
              <CTAButton href={`/contact?solution=${solution.slug}`} variant="secondary" size="lg">
                Consult on {solution.name}
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 2. PROBLEMS SOLVED SECTION */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
        <PageContainer>
          <SectionHeading
            eyebrow="BUSINESS SIGNALS"
            title="Does Your Business Experience Any of These Bottlenecks?"
            subtitle={`Common operational, digital, and commercial challenges that signal a need for the ${solution.name} system intervention.`}
          />

          <Grid columns={2} className="mt-12">
            {solution.problemsSolved.map((problem, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider">
                    BOTTLENECK SIGNAL 0{index + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    &ldquo;{problem}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </Grid>
        </PageContainer>
      </SectionContainer>

      {/* 3. OPERATING WORKFLOW VISUALIZER */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
        <PageContainer>
          <SectionHeading
            eyebrow="SYSTEM WORKFLOW"
            title={`The ${solution.name} Execution Sequence`}
            subtitle="Our structured, step-by-step operating methodology to ensure predictable deployment."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <SolutionWorkflowVisualizer workflow={solution.workflow} capabilityName={solution.name} />
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 4. SYSTEMS ARCHITECTURE GRID */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
        <PageContainer>
          <SectionHeading
            eyebrow="CORE ARCHITECTURE"
            title={`Four Internal Systems of ${solution.name}`}
            subtitle="Specific technical and operational modules deployed as part of this solution."
          />

          <Grid columns={2} className="mt-12">
            {solution.systems.map((sys, idx) => (
              <div
                key={sys.title}
                className="p-6 sm:p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20">
                    MODULE 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-extrabold text-white">
                  {sys.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {sys.description}
                </p>
              </div>
            ))}
          </Grid>
        </PageContainer>
      </SectionContainer>

      {/* 5. CAPABILITIES LIST & TARGET OUTCOMES */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/60">
        <PageContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Capabilities */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                  TECHNICAL CAPABILITIES
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  What We Engineer
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solution.capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Outcomes */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                  COMMERCIAL OUTCOMES
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Measurable Business Impact
                </h2>
              </div>

              {solution.outcomes && solution.outcomes.length > 0 ? (
                <div className="space-y-4">
                  {solution.outcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/20 flex items-start gap-4"
                    >
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shrink-0">
                        RESULT 0{idx + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-200 leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  Structured commercial outcomes delivered with every system deployment.
                </p>
              )}
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 6. CMS RELATIONSHIPS: INDUSTRIES */}
      {relatedIndustries.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
          <PageContainer>
            <SectionHeading
              eyebrow="RELEVANT SECTORS"
              title={`Industries Benefiting from ${solution.name}`}
              subtitle="Tailored digital system implementations across key market sectors."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              {relatedIndustries.map((ind) => (
                <div
                  key={ind.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3"
                >
                  <Building2 className="h-5 w-5 text-red-400" />
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">{ind.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{ind.heroHeadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 7. CMS RELATIONSHIPS: CASE STUDIES / PROOF */}
      {relatedWork.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
          <PageContainer>
            <SectionHeading
              eyebrow="PROVED IN PRODUCTION"
              title={`System Interventions using ${solution.name}`}
              subtitle="Explore real case studies showing how we applied this capability."
            />

            <Grid columns={2} className="mt-12">
              {relatedWork.map((work) => (
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

      {/* 8. CMS RELATIONSHIPS: RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
          <PageContainer>
            <SectionHeading
              eyebrow="COMMERCIAL PRODUCT RESULT"
              title={`Software Products Built under ${solution.name}`}
              subtitle="Turn internal operational expertise into market-ready SaaS products."
            />

            <div className="mt-12 max-w-4xl mx-auto space-y-8">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  name={prod.name}
                  category={prod.category}
                  tagline={prod.tagline}
                  summary={prod.summary}
                  href={`/products/${prod.slug}`}
                />
              ))}
            </div>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 9. CMS RELATIONSHIPS: INSIGHTS */}
      {relatedInsights.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
          <PageContainer>
            <SectionHeading
              eyebrow="FIELD NOTES & GUIDES"
              title={`Strategic Reading on ${solution.name}`}
              subtitle="Deep-dive articles and tactical playbooks from our engineering team."
            />

            <Grid columns={3} className="mt-12">
              {relatedInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  title={insight.title}
                  excerpt={insight.excerpt}
                  category={insight.category}
                  type={insight.type}
                  readTime={insight.readTime}
                  publishedAt={insight.publishedAt}
                  href={`/insights/${insight.slug}`}
                />
              ))}
            </Grid>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 10. CAPABILITY FAQS */}
      {faqs.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
          <PageContainer>
            <SectionHeading
              eyebrow="FREQUENTLY ASKED QUESTIONS"
              title={`Questions About ${solution.name}`}
              subtitle="Clear answers regarding scope, deliverables, timelines, and technical stack."
            />

            <div className="mt-12 max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <h4 className="text-base font-heading font-bold text-white">
                      {faq.question}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </PageContainer>
        </SectionContainer>
      )}

      {/* 11. CONTEXTUAL DIAGNOSTIC & CONTACT BANNER */}
      <SectionContainer className="py-16 sm:py-24">
        <PageContainer>
          <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-red-500/30 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400">
              <IconComponent className="h-3.5 w-3.5 text-red-500" />
              READY TO IMPLEMENT {solution.name}?
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Turn Business Problems into Digital Systems
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Start by running our 60-second diagnostic or speak directly with our engineering lead to map your solution.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href={`/diagnostic?solution=${solution.slug}`} variant="primary" size="lg">
                Run {solution.name} Diagnostic
              </CTAButton>

              <CTAButton href={`/contact?solution=${solution.slug}`} variant="secondary" size="lg">
                Schedule Technical Consultation
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>
    </main>
  );
}
