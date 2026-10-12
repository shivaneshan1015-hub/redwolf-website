import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Compass,
  Cpu,
  Boxes,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CapabilityComparisonMatrix } from "@/components/ui/capability-comparison";

export const metadata = constructMetadata({
  title: "Digital Solutions & Capabilities | Redwolf Digital",
  description:
    "Explore Redwolf Digital's four core capability areas: GROW (marketing & acquisition), DEFINE (strategy & positioning), BUILD (websites & applications), and PRODUCTIZE (automation & digital products).",
  pathname: "/solutions",
});

export default function SolutionsPage() {
  const capabilities = [
    {
      slug: "grow",
      name: "GROW",
      tagline: "Marketing, discoverability and customer growth.",
      description:
        "Help relevant customers discover and choose your business through targeted search, useful content, and digital marketing.",
      problemStatement:
        "Businesses often struggle to generate predictable customer demand—either because potential buyers cannot find them on search engines, content does not answer high-intent buyer questions, or marketing traffic fails to convert into qualified inquiries.",
      typesOfWork: [
        {
          title: "Search Engine Optimization (SEO)",
          description:
            "Technical SEO, local search presence, and structured content so your business appears when potential buyers search for your services.",
        },
        {
          title: "Content Strategy",
          description:
            "High-intent articles, service explanations, and guides designed to answer customer questions and build commercial trust.",
        },
        {
          title: "Digital Marketing & Acquisition",
          description:
            "Clear customer acquisition funnels connecting search, social channels, and email to your core value proposition.",
        },
        {
          title: "Performance Advertising",
          description:
            "Targeted Google Ads and Meta campaigns structured around intent, customer pain points, and measurable acquisition cost.",
        },
      ],
      keyDeliverables: [
        "Technical SEO & indexation audits",
        "Content strategy & editorial plans",
        "Google & Meta ad campaign setup",
        "Landing page conversion optimization",
        "Conversion tracking & analytics",
      ],
      nextStep:
        "Review our discoverability methodology or discuss your customer acquisition targets with our team.",
      detailHref: "/solutions/grow",
      contactHref: "/contact?solution=grow",
      icon: TrendingUp,
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      slug: "define",
      name: "DEFINE",
      tagline: "Strategy, positioning, research and digital direction.",
      description:
        "Clarify business challenges, customer expectations, and digital priorities before committing budget or technology.",
      problemStatement:
        "Many digital projects run over budget or miss targets because teams jump straight into development without agreeing on what problem they are solving, how the business is positioned in its market, or what users actually require.",
      typesOfWork: [
        {
          title: "Discovery & User Research",
          description:
            "In-depth review of your business model, customer touchpoints, existing operational bottlenecks, and competitive positioning.",
        },
        {
          title: "Strategic Positioning",
          description:
            "Clarifying your core value proposition, messaging hierarchy, and why clients should choose your business over competitors.",
        },
        {
          title: "Information Architecture & UX",
          description:
            "Mapping customer journeys, service navigation, and wireframe structures before writing code or designing visual assets.",
        },
        {
          title: "Digital Direction & Roadmaps",
          description:
            "Clear evaluation of technical feasibility, implementation priorities, scope, and staged execution roadmaps.",
        },
      ],
      keyDeliverables: [
        "Stakeholder discovery sessions",
        "Brand messaging hierarchy",
        "UX wireframes & user flows",
        "Digital roadmap & technical scoping",
        "Design systems & visual direction",
      ],
      nextStep:
        "Review our DEFINE discovery framework or schedule a conversation to clarify your digital priorities.",
      detailHref: "/solutions/define",
      contactHref: "/contact?solution=define",
      icon: Compass,
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      slug: "build",
      name: "BUILD",
      tagline: "Websites, web applications and integrations.",
      description:
        "Engineer responsive websites, custom web applications, and connected digital systems designed around how your business works.",
      problemStatement:
        "Off-the-shelf software and generic website templates often fail to match real-world operations, leaving teams stuck with manual data entry, disconnected spreadsheets, and rigid platforms that cannot scale.",
      typesOfWork: [
        {
          title: "Modern Business Websites",
          description:
            "Fast, server-rendered websites built on Next.js and TypeScript, designed for accessible navigation, mobile responsiveness, and high conversion.",
        },
        {
          title: "Custom Web Applications",
          description:
            "Tailored operational software, internal dashboards, and client portals engineered around your specific business workflows.",
        },
        {
          title: "System Integrations",
          description:
            "Connecting databases, CRMs, payment gateways, WhatsApp, and communication tools into unified, reliable operational flows.",
        },
        {
          title: "Digital Workflow Systems",
          description:
            "Replacing paper clipboards, messy email chains, and manual spreadsheets with structured digital databases and role-based access.",
        },
      ],
      keyDeliverables: [
        "Responsive full-stack web applications",
        "Custom internal tooling & admin portals",
        "API & third-party service integrations",
        "Secure database design & access controls",
        "Production deployment & maintenance setup",
      ],
      nextStep:
        "Examine our engineering standards or discuss the software system your team needs.",
      detailHref: "/solutions/build",
      contactHref: "/contact?solution=build",
      icon: Cpu,
      badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      slug: "productize",
      name: "PRODUCTIZE",
      tagline: "Automation, repeatable systems and digital products.",
      description:
        "Turn manual processes into automated workflows, repeatable operational tools, and scalable digital products.",
      problemStatement:
        "Businesses often repeat the same operational tasks manually every single day, or have built internal tools and domain expertise that have the potential to become standalone digital products.",
      typesOfWork: [
        {
          title: "Workflow Automation",
          description:
            "Automating routine business tasks, notification triggers, order captures, and data synchronization to save team hours.",
        },
        {
          title: "Repeatable Operational Systems",
          description:
            "Standardizing internal operating procedures into reusable digital tools that team members or regional branches can use consistently.",
        },
        {
          title: "Digital Product Development",
          description:
            "From product discovery to MVP engineering—turning domain knowledge into commercial web applications and SaaS platforms.",
        },
        {
          title: "Field & Offline Applications",
          description:
            "Building resilient mobile and web interfaces designed for low-connectivity environments and field operations.",
        },
      ],
      keyDeliverables: [
        "Process automation pipelines",
        "Multi-tenant SaaS architecture",
        "Offline-first field mobile applications",
        "MVP feature scoping & roadmap",
        "User role workflows & operational tooling",
      ],
      nextStep:
        "Explore our PRODUCTIZE approach or discuss an operational workflow you want to automate.",
      detailHref: "/solutions/productize",
      contactHref: "/contact?solution=productize",
      icon: Boxes,
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-20 sm:pt-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1220] text-white pt-8 pb-16 sm:pb-24 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: "Solutions" }]} />

          <div className="mt-8 max-w-4xl space-y-6">
            <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full">
              CAPABILITY ARCHITECTURE · GROW · DEFINE · BUILD · PRODUCTIZE
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Digital capabilities structured around real business challenges.
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
              Redwolf Digital helps businesses address customer acquisition, conversion, digital strategy, and operational efficiency challenges. Rather than pushing pre-packaged templates, we evaluate your primary bottleneck and deliver the right intervention—from search discoverability to custom operational software.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <CTAButton variant="primary" size="lg" href="/contact">
                Discuss Your Business Challenge
              </CTAButton>

              <CTAButton variant="secondary" size="lg" href="#capabilities">
                Explore All Capabilities
              </CTAButton>
            </div>
          </div>

          {/* Quick Capability Overview Grid */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <a
                  key={cap.slug}
                  href={`#${cap.slug}`}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-red-500/40 transition-all group block"
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold ${cap.badgeColor}`}>
                      <Icon className="h-3 w-3" />
                      {cap.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium line-clamp-2">
                    {cap.tagline}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. THE FOUR CAPABILITY AREAS */}
      <div id="capabilities" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-16">
        <SectionHeading
          eyebrow="FOUR CORE CAPABILITIES"
          title="Problem-First Interventions for Growing Businesses"
          subtitle="Every business bottleneck has a different root cause. Select the capability area that matches your current operational or commercial challenge."
        />

        <div className="space-y-12">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <article
                key={cap.slug}
                id={cap.slug}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 scroll-mt-24 transition-all hover:border-slate-700"
              >
                {/* Capability Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold uppercase ${cap.badgeColor}`}>
                        <Icon className="h-4 w-4" />
                        CAPABILITY 0{index + 1} · {cap.name}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                      {cap.name} — {cap.tagline}
                    </h2>
                    <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                      {cap.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={cap.detailHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold font-mono transition-colors border border-slate-700"
                    >
                      <span>Explore {cap.name} Details</span>
                      <ArrowRight className="h-3.5 w-3.5 text-red-400" />
                    </Link>
                  </div>
                </div>

                {/* Problem Statement Box */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-red-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                    <span>The Business Problem This Addresses</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {cap.problemStatement}
                  </p>
                </div>

                {/* Types of Work Delivered */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Types of Work Delivered Under {cap.name}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cap.typesOfWork.map((work) => (
                      <div
                        key={work.title}
                        className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2"
                      >
                        <h4 className="text-sm font-heading font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          {work.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {work.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables & Next Step */}
                <div className="pt-4 border-t border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Primary Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cap.keyDeliverables.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                    <Link
                      href={cap.detailHref}
                      className="text-xs font-mono font-bold text-slate-300 hover:text-white underline underline-offset-4 decoration-red-500/60"
                    >
                      {cap.nextStep}
                    </Link>
                    <CTAButton variant="primary" size="sm" href={cap.contactHref}>
                      Discuss Your Business Challenge
                    </CTAButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* 3. CAPABILITY COMPARISON MATRIX */}
      <section className="py-16 sm:py-24 border-y border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CapabilityComparisonMatrix />
        </div>
      </section>

      {/* 4. SYSTEMS THINKING / HOW CAPABILITIES CONNECT */}
      <section className="py-16 sm:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="SYSTEMS THINKING"
            title="How Our Four Capabilities Connect"
            subtitle="Business initiatives rarely succeed in isolation. See how our capabilities reinforce each other throughout your company's growth."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                Phase 01 · DEFINE
              </span>
              <h3 className="text-base font-heading font-bold text-white">
                Clarify Before Building
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clarify positioning, audience expectations, and functional priorities before committing to software architecture or marketing spend.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-blue-400 uppercase">
                Phase 02 · BUILD
              </span>
              <h3 className="text-base font-heading font-bold text-white">
                Engineer the Foundation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build responsive websites and custom web applications tailored around how your operational team and customers actually interact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Phase 03 · GROW
              </span>
              <h3 className="text-base font-heading font-bold text-white">
                Attract & Convert
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drive qualified search traffic through SEO and targeted campaigns, converting interested visitors into active inquiries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase">
                Phase 04 · PRODUCTIZE
              </span>
              <h3 className="text-base font-heading font-bold text-white">
                Systematize & Scale
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Turn repeatable workflows and domain expertise into automated systems, offline-first field apps, or standalone digital products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT ENGAGEMENT / FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-red-500/30 relative overflow-hidden text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5" />
              DIRECT ENGAGEMENT
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Discuss Your Business Challenge
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Whether you need to attract more customers, clarify your digital strategy, build custom web software, or automate daily operations, we begin with a direct conversation about your goals.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <CTAButton href="/contact" variant="primary" size="lg">
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
        </div>
      </section>
    </main>
  );
}
