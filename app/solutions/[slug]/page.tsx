import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  TrendingUp,
  Compass,
  Cpu,
  Box,
  Boxes,
  AlertCircle,
  HelpCircle,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Phone,
  FileText,
  Layers,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  getSolutions,
  getSolutionBySlug,
  getRelatedIndustriesForSolution,
  getRelatedProductsForSolution,
  getRelatedInsightsForSolution,
  getFAQsForSolution,
} from "@/lib/cms";
import { PageContainer, SectionContainer, Grid } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard, InsightCard } from "@/components/ui/cards";
import { CTAButton } from "@/components/ui/cta-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SolutionWorkflowVisualizer } from "@/components/ui/solution-workflow-visualizer";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Compass,
  Cpu,
  Box,
  Boxes,
};

const deliverablesMap: Record<string, Array<{ title: string; description: string }>> = {
  grow: [
    {
      title: "Technical SEO Audits & Crawlability Analysis",
      description:
        "Comprehensive evaluation of indexation, site architecture, metadata, performance bottlenecks, and schema markup.",
    },
    {
      title: "Prioritized Action Plans & Technical Roadmaps",
      description:
        "Sequenced recommendations detailing high-impact fixes, technical priorities, and implementation milestones.",
    },
    {
      title: "High-Intent Content Strategy & Briefs",
      description:
        "Structured content outlines and topic clusters designed to address commercial search intent and buyer questions.",
    },
    {
      title: "Targeted Campaign Architecture Setup",
      description:
        "Structured Google Ads and Meta campaign configurations built around clear audience intent and budget efficiency.",
    },
    {
      title: "Conversion Attribution & Event Tracking",
      description:
        "Accurate server-side and client-side tracking configurations to monitor verified lead inquiries rather than vanity clicks.",
    },
  ],
  define: [
    {
      title: "Discovery Research & Stakeholder Findings",
      description:
        "Structured evaluation of your business model, customer segments, existing operational friction points, and competitive positioning.",
    },
    {
      title: "Strategic Positioning & Messaging Hierarchy",
      description:
        "Clarified core value propositions, customer persona maps, and messaging frameworks so buyers understand your value immediately.",
    },
    {
      title: "Customer Journey Maps & UX Pathways",
      description:
        "Structured site navigation, page hierarchy, and customer pathways designed to eliminate confusion and drop-off.",
    },
    {
      title: "Information Architecture & Wireframe Layouts",
      description:
        "Low-fidelity and high-fidelity page blueprints mapping interface layouts and content structure before committing to software engineering.",
    },
    {
      title: "Requirements Definition & Digital Roadmaps",
      description:
        "Prioritized project boundaries, technical specifications, and phased implementation roadmaps ready for execution.",
    },
  ],
  build: [
    {
      title: "Custom Full-Stack Web Applications",
      description:
        "Server-rendered, performant platforms built with Next.js, React, and TypeScript engineered for speed and reliability.",
    },
    {
      title: "Internal Dashboards & Admin Portals",
      description:
        "Secure, role-based operational tools engineered to digitize workflows and replace chaotic spreadsheets.",
    },
    {
      title: "API & Third-Party System Integrations",
      description:
        "Direct connections between databases, CRMs, payment gateways, messaging tools, and internal services.",
    },
    {
      title: "Secure Database Architecture & Role Controls",
      description:
        "Structured data schemas, automated backup configurations, and robust role-based access management.",
    },
    {
      title: "Production Deployment & Maintenance Setup",
      description:
        "Reliable hosting pipelines, automated CI/CD checks, and long-term code maintainability standards.",
    },
  ],
  productize: [
    {
      title: "Workflow Automation Pipelines",
      description:
        "Trigger-based automation connecting manual operational steps into reliable, automated digital sequences.",
    },
    {
      title: "Multi-Tenant SaaS Architecture",
      description:
        "Scalable cloud database models and authentication frameworks built to serve multiple enterprise clients.",
    },
    {
      title: "Offline-First Mobile & Field Tools",
      description:
        "Resilient field applications engineered to capture data reliably even in low-connectivity environments.",
    },
    {
      title: "Product Discovery & MVP Roadmaps",
      description:
        "Clear minimum-viable-product scoping, feature prioritization, and user story mapping before development.",
    },
    {
      title: "User Onboarding & License Management",
      description:
        "Friction-free onboarding flows, user permission tiers, and subscription licensing architecture.",
    },
  ],
};

const approachStagesMap: Record<
  string,
  Array<{ step: string; title: string; description: string }>
> = {
  grow: [
    {
      step: "01",
      title: "Understand Business & Audience",
      description:
        "We review your business model, customer segments, existing traffic channels, and how prospective buyers actively search for your offerings.",
    },
    {
      step: "02",
      title: "Establish Priorities & Scope",
      description:
        "We identify primary discoverability bottlenecks and agree on a realistic, prioritized scope of work based on your timeline and budget.",
    },
    {
      step: "03",
      title: "Implement Agreed Work",
      description:
        "We execute technical SEO fixes, high-intent content briefs, targeted campaign architectures, and server-side tracking as planned.",
    },
    {
      step: "04",
      title: "Review Measurable Indicators",
      description:
        "We evaluate verified data—such as indexation health, engagement quality, and qualified inquiry submissions—to guide next steps.",
    },
  ],
  define: [
    {
      step: "01",
      title: "Understand Context & Stakeholders",
      description:
        "We review business objectives, conduct stakeholder interviews, and examine customer feedback to uncover root-cause friction in positioning and digital journeys.",
    },
    {
      step: "02",
      title: "Analyze Journeys & Positioning",
      description:
        "We evaluate how prospective clients perceive your offerings, identify where they drop off, and clarify your core competitive differentiation.",
    },
    {
      step: "03",
      title: "Architect Navigation & Wireframes",
      description:
        "We structure information hierarchy, design wireframe blueprints, and map intuitive user flows before any code is written.",
    },
    {
      step: "04",
      title: "Define Roadmaps & Specifications",
      description:
        "We deliver clear functional requirements, scope boundaries, and prioritized implementation roadmaps ready for phased development.",
    },
  ],
  build: [
    {
      step: "01",
      title: "Understand Workflows & Requirements",
      description:
        "We analyze daily operations, staff interactions, and data flows to capture exact business requirements.",
    },
    {
      step: "02",
      title: "Architect Data & Integrations",
      description:
        "We design database schemas, API connections, and authentication models that mirror your operational requirements.",
    },
    {
      step: "03",
      title: "Engineer Full-Stack Solution",
      description:
        "We build responsive, server-rendered applications with TypeScript and modern frameworks, ensuring security and speed.",
    },
    {
      step: "04",
      title: "Review Operational Readiness",
      description:
        "We test edge cases, configure production hosting, verify security boundaries, and ensure staff can operate the platform reliably.",
    },
  ],
  productize: [
    {
      step: "01",
      title: "Understand Internal Expertise",
      description:
        "We evaluate internal workflows and recurring client problems to identify viable opportunities for digital products.",
    },
    {
      step: "02",
      title: "Define MVP Boundaries",
      description:
        "We agree on minimum viable scope to deliver rapid utility without over-engineering speculative features.",
    },
    {
      step: "03",
      title: "Build Scalable Architecture",
      description:
        "We develop multi-tenant software, offline-first field apps, or automation pipelines with resilient data models.",
    },
    {
      step: "04",
      title: "Review User Adoption & Metrics",
      description:
        "We monitor operational usage, field adoption, and feedback to iterate systematically based on real-world usage.",
    },
  ],
};

const suitabilityMap: Record<
  string,
  {
    targetAudience: string[];
    expectations: string[];
    scopingNote: string;
  }
> = {
  define: {
    targetAudience: [
      "Established businesses outgrowing an outdated website or legacy digital presence.",
      "Organizations planning a major website redesign, web app, or software project wanting to avoid costly false starts.",
      "Leadership teams with competing internal priorities about what to build or where digital budget should go.",
      "Companies with complex service offerings or multiple client personas that need clearer positioning.",
    ],
    expectations: [
      "Objective, research-backed clarity on customer friction and commercial opportunities.",
      "Actionable information architecture and wireframes instead of speculative code.",
      "Clear technical requirements, scope boundaries, and phased execution roadmaps.",
      "Confident alignment across stakeholders before committing engineering or marketing budgets.",
    ],
    scopingNote:
      "Strategy depth, research activities, stakeholder sessions, and deliverables depend on the agreed project scope. We do not claim that strategy workshops, extensive research methods, or specific deliverables are included in every engagement—scope is explicitly tailored based on your immediate priorities and agreed budget.",
  },
  grow: {
    targetAudience: [
      "Businesses with valuable offerings struggling to generate consistent customer discovery online.",
      "Companies investing in advertising or SEO without clear attribution or measurable return.",
      "Local and regional businesses wanting to improve Google Maps and local search presence.",
      "Websites receiving visitor traffic that fails to convert into qualified inquiries.",
    ],
    expectations: [
      "Systematic identification and resolution of technical indexation and search barriers.",
      "Content strategy structured around real commercial buyer search queries.",
      "Targeted Google and Meta ad campaigns focused on intent rather than vanity impressions.",
      "Reliable conversion tracking configured across all digital inquiry channels.",
    ],
    scopingNote:
      "Services depend on your business's specific needs, baseline data, and agreed project scope. We do not make generic ranking promises, guarantee fixed inquiry volumes, or claim unrealistic revenue returns. Our focus is on removing discoverability friction, attracting relevant prospective customers, and establishing dependable measurement.",
  },
  build: {
    targetAudience: [
      "Businesses constrained by manual spreadsheets, paper notes, and disconnected tools.",
      "Companies needing custom web applications tailored to unique operational floor workflows.",
      "Organizations requiring secure client portals, internal dashboards, or API integrations.",
      "Teams seeking high-performance, accessible, and server-rendered business websites.",
    ],
    expectations: [
      "Production-ready web applications engineered with Next.js, React, and TypeScript.",
      "Custom role-based admin portals eliminating manual data handling.",
      "Unified system integrations connecting databases, CRMs, WhatsApp, and payment gateways.",
      "Documented codebase and deployment pipelines built for maintainability.",
    ],
    scopingNote:
      "Software architecture, features, and integration depth depend on agreed technical specifications. Scope is explicitly phased to deliver verified operational utility without unnecessary complexity.",
  },
  productize: {
    targetAudience: [
      "Companies with proven internal workflows that could become standalone commercial SaaS tools.",
      "Field-heavy businesses needing resilient, offline-first mobile order and route tracking applications.",
      "Domain experts looking to validate and build a minimum viable product (MVP).",
      "Organizations looking to automate recurring operational sequences into repeatable tools.",
    ],
    expectations: [
      "Structured product discovery and MVP feature scoping before code development.",
      "Multi-tenant SaaS database architecture or offline-first field application engines.",
      "User role workflows, permission tiers, and license management models.",
      "Continuous instrumentation to track operational adoption and product metrics.",
    ],
    scopingNote:
      "Product engineering scope depends on the agreed MVP definition, technical complexity, and distribution requirements.",
  },
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
      title: "Solution Not Found | Redwolf Digital",
    };
  }

  const baseUrl = "https://redwolf.in";
  const canonicalUrl = `${baseUrl}/solutions/${solution.slug}`;

  return {
    title: solution.seo.title,
    description: solution.seo.description,
    keywords: solution.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: solution.seo.title,
      description: solution.seo.description,
      type: "article",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: solution.seo.title,
      description: solution.seo.description,
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
  const relatedProducts = getRelatedProductsForSolution(slug);
  const relatedInsights = getRelatedInsightsForSolution(slug);
  const faqs = getFAQsForSolution(slug);

  const deliverables = deliverablesMap[slug] || deliverablesMap.grow;
  const approachStages = approachStagesMap[slug] || approachStagesMap.grow;
  const suitability = suitabilityMap[slug] || suitabilityMap.grow;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-20 sm:pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <SectionContainer className="relative overflow-hidden border-b border-slate-800/80 pb-16 sm:pb-24">
        {/* Ambient Glow */}
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
              SYSTEM CAPABILITY · {solution.name}
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              {solution.heroHeadline}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              {solution.summary}
            </p>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                STRATEGIC FOCUS
              </span>
              <p className="text-sm font-medium text-slate-200">
                {solution.positioning}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CTAButton
                href={`/contact?solution=${solution.slug}`}
                variant="primary"
                size="lg"
              >
                Discuss Your Business Challenge
              </CTAButton>
              <CTAButton href="#services" variant="secondary" size="lg">
                Explore Services & Scope
              </CTAButton>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 2. PROBLEMS SOLVED SECTION */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
        <PageContainer>
          <SectionHeading
            eyebrow="BUSINESS CHALLENGES"
            title="Bottlenecks We Help Address"
            subtitle={`Common discoverability, operational, and commercial friction points that indicate a need for the ${solution.name} capability.`}
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
                    CHALLENGE 0{index + 1}
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

      {/* 3. CAPABILITY DISTINCTION SECTION */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
        <PageContainer>
          <SectionHeading
            eyebrow="CAPABILITY DISTINCTION"
            title={`How ${solution.name} Differs from Other Capabilities`}
            subtitle="Every Redwolf Digital capability addresses a distinct stage of business evolution. Choose the capability that matches your current bottleneck."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`p-6 rounded-2xl bg-slate-900/90 border transition-all ${
                slug === "define"
                  ? "border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                  : "border-slate-800"
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  01 · DEFINE
                </span>
                {slug === "define" && (
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                    CURRENT
                  </span>
                )}
              </div>
              <h4 className="text-base font-heading font-bold text-white">
                Decide What Should Happen
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clarify the business problem, align priorities, research audience expectations, and establish technical direction before committing budget to execution.
              </p>
              <div className="pt-2">
                <Link
                  href="/solutions/define"
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300"
                >
                  <span>Explore DEFINE</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl bg-slate-900/90 border transition-all ${
                slug === "build"
                  ? "border-blue-500/50 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30"
                  : "border-slate-800"
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                  02 · BUILD
                </span>
                {slug === "build" && (
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                    CURRENT
                  </span>
                )}
              </div>
              <h4 className="text-base font-heading font-bold text-white">
                Engineer the Systems
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Create the website, web application, operational dashboard, or system integration engineered around how your team and customers actually interact.
              </p>
              <div className="pt-2">
                <Link
                  href="/solutions/build"
                  className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300"
                >
                  <span>Explore BUILD</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl bg-slate-900/90 border transition-all ${
                slug === "grow"
                  ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30"
                  : "border-slate-800"
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                  03 · GROW
                </span>
                {slug === "grow" && (
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    CURRENT
                  </span>
                )}
              </div>
              <h4 className="text-base font-heading font-bold text-white">
                Attract & Convert
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Improve search discoverability, optimize content, launch targeted performance ads, and convert qualified traffic into active inquiries.
              </p>
              <div className="pt-2">
                <Link
                  href="/solutions/grow"
                  className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                >
                  <span>Explore GROW</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl bg-slate-900/90 border transition-all ${
                slug === "productize"
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/10 ring-1 ring-purple-500/30"
                  : "border-slate-800"
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                  04 · PRODUCTIZE
                </span>
                {slug === "productize" && (
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                    CURRENT
                  </span>
                )}
              </div>
              <h4 className="text-base font-heading font-bold text-white">
                Standardize & Scale
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Develop repeatable workflows, operational software tools, and standalone digital products or SaaS platforms from internal domain expertise.
              </p>
              <div className="pt-2">
                <Link
                  href="/solutions/productize"
                  className="inline-flex items-center gap-1 text-xs font-mono text-purple-400 hover:text-purple-300"
                >
                  <span>Explore PRODUCTIZE</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 4. APPROACH & METHODOLOGY SECTION */}
      <SectionContainer id="approach" className="py-16 sm:py-24 border-b border-slate-800/80">
        <PageContainer>
          <SectionHeading
            eyebrow="OUR APPROACH"
            title="How We Work With You"
            subtitle="A structured, collaborative sequence to ensure digital work is grounded in business reality before implementation."
          />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {approachStages.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3"
              >
                <span className="inline-block text-xs font-mono font-bold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                  STAGE {stage.step}
                </span>
                <h3 className="text-base font-heading font-bold text-white">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <SolutionWorkflowVisualizer
              workflow={solution.workflow}
              capabilityName={solution.name}
            />
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 5. SYSTEMS ARCHITECTURE & SERVICES GRID */}
      <SectionContainer id="services" className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/40">
        <PageContainer>
          <SectionHeading
            eyebrow="CORE SERVICES"
            title={`Services Delivered Under ${solution.name}`}
            subtitle="Specific strategic, technical, and analytical disciplines deployed to establish clear digital direction."
          />

          <Grid columns={2} className="mt-12">
            {solution.systems.map((sys, idx) => (
              <div
                key={sys.title}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20">
                    SERVICE 0{idx + 1}
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

      {/* 6. REALISTIC DELIVERABLES, SUITABILITY & SCOPE */}
      <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80 bg-slate-900/60">
        <PageContainer>
          <SectionHeading
            eyebrow="DELIVERABLES & SCOPE"
            title="What We Deliver & How Scope Is Defined"
            subtitle="Clear, tangible outputs engineered for your business without unverified claims or false guarantees."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Deliverables List & Suitability */}
            <div className="lg:col-span-7 space-y-8">
              {/* Deliverables List */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Representative Deliverables Under {solution.name}
                </h3>

                <div className="space-y-3">
                  {deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-400 shrink-0" />
                        <h4 className="text-sm font-heading font-bold text-white">
                          {deliv.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pl-6">
                        {deliv.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who It Is Suitable For */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  <Users className="h-4 w-4 text-red-400 shrink-0" />
                  <span>Who This Capability Is Suitable For</span>
                </div>

                <div className="space-y-2.5">
                  {suitability.targetAudience.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Fit and Scope Box & Realistic Expectations */}
            <div className="lg:col-span-5 space-y-6">
              {/* Fit and Scope Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Fit and Scope Guidelines</span>
                </div>

                <h4 className="text-lg font-heading font-bold text-white">
                  Realistic Scope Without False Guarantees
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {suitability.scopingNote}
                </p>

                <div className="pt-2">
                  <CTAButton
                    href={`/contact?solution=${solution.slug}`}
                    variant="primary"
                    size="sm"
                  >
                    Discuss Your Business Challenge
                  </CTAButton>
                </div>
              </div>

              {/* What You Can Realistically Expect */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  <Target className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>What You Can Realistically Expect</span>
                </div>
                <div className="space-y-2">
                  {suitability.expectations.map((exp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-red-400 font-bold">•</span>
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Capabilities Pill Grid */}
              <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Disciplines & Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {solution.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>

      {/* 7. CMS RELATIONSHIPS: INDUSTRIES */}
      {relatedIndustries.length > 0 && (
        <SectionContainer className="py-16 sm:py-24 border-b border-slate-800/80">
          <PageContainer>
            <SectionHeading
              eyebrow="RELEVANT SECTORS"
              title={`Sectors Commonly Utilizing ${solution.name}`}
              subtitle="Tailored strategic, architectural, and operational systems across core business categories."
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
              subtitle="In-depth articles and tactical guides prepared by our engineering team."
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
                  className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
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

      {/* 11. DIRECT ENGAGEMENT BANNER */}
      <SectionContainer className="py-16 sm:py-24">
        <PageContainer>
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-red-500/30 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              <IconComponent className="h-3.5 w-3.5 text-red-500" />
              DIRECT TECHNICAL CONSULTATION
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Discuss Your Business Challenge
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Whether you need to clarify strategic positioning, resolve friction in your digital user journeys, or draft technical specifications before building, we begin with a direct technical conversation.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton
                href={`/contact?solution=${solution.slug}`}
                variant="primary"
                size="lg"
              >
                Discuss Your Business Challenge
              </CTAButton>

              <CTAButton href="tel:+918122712587" variant="secondary" size="lg">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-400" />
                  +91 81227 12587
                </span>
              </CTAButton>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Direct engineer consultation
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Clear project scope before commitment
              </span>
            </div>
          </div>
        </PageContainer>
      </SectionContainer>
    </main>
  );
}
