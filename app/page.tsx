import React from "react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTAButton } from "@/components/ui/cta-button";
import { InsightCard } from "@/components/ui/cards";
import { getInsights } from "@/lib/cms";
import {
  ArrowRight,
  Search,
  Layers,
  Workflow,
  TrendingUp,
  Compass,
  Cpu,
  Boxes,
} from "lucide-react";

export const metadata = constructMetadata({
  title: "Redwolf Digital — From Business Problem to Digital Solution",
  description:
    "Redwolf Digital helps growing businesses attract the right customers, turn interest into action, and build smarter digital systems.",
  pathname: "/",
});

export default function HomePage() {
  const insights = getInsights();

  const capabilities = [
    {
      slug: "grow",
      name: "GROW",
      supportingLine: "Marketing, discoverability and customer growth.",
      description:
        "Help relevant customers discover and choose your business through targeted search, useful content, and digital marketing.",
      items: "SEO · Content strategy · Digital marketing · Performance ads",
      deliverables: [
        "Technical SEO & indexation audits",
        "High-intent content strategy & briefs",
        "Targeted campaign architecture",
        "Conversion tracking & attribution",
      ],
      icon: TrendingUp,
    },
    {
      slug: "define",
      name: "DEFINE",
      supportingLine: "Strategy, positioning, research and digital direction.",
      description:
        "Clarify business challenges, customer expectations, and digital priorities before committing budget or technology.",
      items: "Discovery · Strategy · Planning · Digital roadmaps",
      deliverables: [
        "Discovery findings & friction analysis",
        "Strategic positioning & messaging hierarchy",
        "Information architecture & UX wireframes",
        "Requirements scoping & technical roadmaps",
      ],
      icon: Compass,
    },
    {
      slug: "build",
      name: "BUILD",
      supportingLine: "Websites, web applications and integrations.",
      description:
        "Engineer responsive websites, custom web applications, and connected digital systems designed around how your business works.",
      items: "Websites · Web applications · Integrations · Workflows",
      deliverables: [
        "Responsive web applications (Next.js & TypeScript)",
        "Custom internal portals & dashboards",
        "System integrations (APIs, CRM, WhatsApp)",
        "Structured operational database design",
      ],
      icon: Cpu,
    },
    {
      slug: "productize",
      name: "PRODUCTIZE",
      supportingLine: "Automation, repeatable systems and digital products.",
      description:
        "Turn manual processes into automated workflows, repeatable operational tools, and scalable digital products.",
      items: "Digital products · Reusable workflows · Operational software",
      deliverables: [
        "Process & workflow automation pipelines",
        "Repeatable internal tools & admin portals",
        "MVP feature scoping & software architecture",
        "Multi-tenant SaaS & offline-first field apps",
      ],
      icon: Boxes,
    },
  ];

  const workSteps = [
    {
      step: "01",
      title: "Understand",
      description:
        "We listen to your challenges, learn how your business operates, and clarify what you want to achieve.",
    },
    {
      step: "02",
      title: "Define",
      description:
        "We identify priorities, evaluate practical options, and agree on the right scope and approach.",
    },
    {
      step: "03",
      title: "Build & Deliver",
      description:
        "We engineer the agreed digital solution, keeping the work aligned with established business requirements.",
    },
    {
      step: "04",
      title: "Review & Next Steps",
      description:
        "We review the delivered solution against your goals, verify operational readiness, and clarify future direction.",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 pt-20 sm:pt-24">
      {/* SECTION 1 — HERO */}
      <section className="relative bg-[#0B1220] text-white pt-8 pb-20 sm:pb-28 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-1.5 rounded-full">
                STRATEGY · GROWTH · DIGITAL SYSTEMS
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.05]">
                From business problem to digital solution.
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Redwolf Digital helps growing businesses attract the right customers, turn interest into action, and build smarter digital systems.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <CTAButton variant="primary" size="lg" href="/contact">
                  Discuss Your Business Challenge
                </CTAButton>

                <CTAButton variant="secondary" size="lg" href="/solutions">
                  Explore How We Help
                </CTAButton>
              </div>

              <p className="text-xs text-slate-400 pt-1 leading-relaxed max-w-xl">
                From your first growth challenge to a more connected digital operation, we help you identify the right next step.
              </p>
            </div>

            {/* Right Visual Diagram */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span>OPERATIONAL MODEL</span>
                  <span className="text-red-400 font-bold">REDWOLF DIGITAL SYSTEM</span>
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
                    <span className="font-bold text-white">02. REDWOLF DIGITAL INTERVENTION</span>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-28">
        {/* SECTION 2 — PROBLEMS WE HELP SOLVE */}
        <section aria-labelledby="problems-heading">
          <SectionHeading
            id="problems-heading"
            eyebrow="PROBLEMS WE HELP SOLVE"
            title="Help for your business challenges."
            subtitle="Recognize what is getting in the way before choosing a technology or service."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 text-red-400 rounded-xl w-fit border border-red-500/20">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block pb-1">
                    Getting discovered
                  </span>
                  <h3 className="text-xl font-heading font-extrabold text-white">
                    Attract the right customers.
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  <p>Your business has something valuable to offer. Are the right people finding it?</p>
                  <p className="text-slate-400">
                    Improve how potential customers discover and understand your business through search, useful content, and targeted digital marketing.
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 space-y-1.5 text-xs text-slate-400">
                    <span className="font-mono text-[10px] text-slate-300 font-bold uppercase tracking-wider block">
                      Common scenarios:
                    </span>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Potential buyers search for your services, but find competitors instead.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Website visits rarely turn into qualified enquiries or inbound calls.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Advertising spend generates clicks without reaching decision-makers.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Relevant capabilities:</span>
                <p className="text-xs font-semibold text-slate-200">
                  SEO · Content strategy · Digital marketing · Performance advertising
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 text-red-400 rounded-xl w-fit border border-red-500/20">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block pb-1">
                    Turning interest into action
                  </span>
                  <h3 className="text-xl font-heading font-extrabold text-white">
                    Make every interaction clearer.
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  <p>Getting attention is only part of the job. What happens next?</p>
                  <p className="text-slate-400">
                    Help visitors understand your offer, navigate the next step, and take meaningful action with clearer websites, landing pages, and conversion journeys.
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 space-y-1.5 text-xs text-slate-400">
                    <span className="font-mono text-[10px] text-slate-300 font-bold uppercase tracking-wider block">
                      Common scenarios:
                    </span>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Visitors land on your pages but leave without reaching out or booking.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Offer details, pricing, or scope are unclear to first-time buyers.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Prospects lose interest before completing enquiry or onboarding forms.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Relevant capabilities:</span>
                <p className="text-xs font-semibold text-slate-200">
                  Website design and development · UX · Landing pages · Conversion measurement
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 text-red-400 rounded-xl w-fit border border-red-500/20">
                  <Workflow className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 block pb-1">
                    Making work run better
                  </span>
                  <h3 className="text-xl font-heading font-extrabold text-white">
                    Build more connected operations.
                  </h3>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
                  <p>Are repetitive tasks and disconnected tools making work harder than it needs to be?</p>
                  <p className="text-slate-400">
                    Identify opportunities to simplify workflows, connect systems, and build digital tools around the way your business operates.
                  </p>
                  <div className="pt-2 border-t border-slate-800/60 space-y-1.5 text-xs text-slate-400">
                    <span className="font-mono text-[10px] text-slate-300 font-bold uppercase tracking-wider block">
                      Common scenarios:
                    </span>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Operations rely on scattered spreadsheets, paper notes, or messaging chats.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Staff re-enter the same business data manually across disconnected tools.</span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <span className="text-red-400 font-bold shrink-0">•</span>
                      <span>Off-the-shelf software doesn’t fit how your team or field staff actually work.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">Relevant capabilities:</span>
                <p className="text-xs font-semibold text-slate-200">
                  Workflow automation · Integrations · Web applications · Digital products
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-center text-xs sm:text-sm text-slate-300 font-mono">
            You don&apos;t need to start with a specific technology or service. Start with the problem you need to solve.
          </div>
        </section>

        {/* SECTION 3 — HOW REDWOLF HELPS */}
        <section aria-labelledby="how-redwolf-helps-heading">
          <SectionHeading
            id="how-redwolf-helps-heading"
            eyebrow="HOW REDWOLF HELPS"
            title="The right solution starts with the right problem."
            subtitle="Every business has different challenges. We bring together strategy, marketing, design and technology to help you identify what needs to change and choose a practical way forward."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <Link
                  key={cap.slug}
                  href={`/solutions/${cap.slug}`}
                  className="group p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                          {cap.name}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
                        {cap.supportingLine}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                        {cap.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block mb-1">Services:</span>
                      <p className="text-xs font-semibold text-slate-200">{cap.items}</p>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-400 block mb-1.5">What you receive:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {cap.deliverables.map((deliv) => (
                          <div key={deliv} className="flex items-center gap-1.5 text-xs text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                            <span className="line-clamp-1">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center text-xs font-bold text-red-400 group-hover:text-red-300">
                      <span>Explore {cap.name} capability →</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-center sm:text-left">
              <h3 className="text-xl font-heading font-extrabold text-white">Not sure where to start?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tell us what is getting in the way. We&apos;ll start by understanding the challenge and discussing a suitable next step.
              </p>
            </div>
            <CTAButton variant="primary" size="md" href="/contact" className="shrink-0">
              Discuss Your Business Challenge
            </CTAButton>
          </div>
        </section>

        {/* SECTION 4 — HOW WE WORK */}
        <section aria-labelledby="how-we-work-heading">
          <SectionHeading
            id="how-we-work-heading"
            eyebrow="HOW WE WORK"
            title="Good work starts with understanding the problem."
            subtitle="We begin by understanding your business, clarifying what needs to change, and identifying a practical way forward. From there, the scope and next steps depend on the solution your business needs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((ws) => (
              <div
                key={ws.step}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md inline-block">
                    {ws.step}
                  </span>
                  <h3 className="text-lg font-heading font-extrabold text-white">
                    {ws.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {ws.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-extrabold text-white">
              Every project starts with a conversation.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              You don&apos;t need a complete brief or a ready-made solution. Start by telling us what&apos;s holding your business back.
            </p>
            <div className="pt-2">
              <CTAButton variant="primary" size="md" href="/contact">
                Discuss Your Business Challenge
              </CTAButton>
            </div>
          </div>
        </section>

        {/* SECTION 5 — INSIGHTS */}
        <section aria-labelledby="insights-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <SectionHeading
              id="insights-heading"
              eyebrow="INSIGHTS & FIELD NOTES"
              title="Ideas for your next digital move."
              subtitle="Explore practical perspectives on digital visibility, customer conversion and better business systems."
              className="mb-0"
            />
            <Link
              href="/insights"
              className="text-xs font-mono font-bold text-red-400 hover:text-red-300 uppercase tracking-wider shrink-0 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <span>Explore All Insights →</span>
            </Link>
          </div>

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

          <div className="text-center pt-6 sm:hidden">
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-400 hover:text-red-300 uppercase tracking-wider"
            >
              <span>Explore All Insights →</span>
            </Link>
          </div>
        </section>

        {/* SECTION 6 — FINAL CTA */}
        <section aria-labelledby="final-cta-heading" className="bg-slate-900 text-white p-8 sm:p-14 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
              START A CONVERSATION
            </span>
            <h2 id="final-cta-heading" className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
              Have a business challenge to solve?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Start a conversation with Redwolf Digital.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <CTAButton variant="primary" size="lg" href="/contact">
              Discuss Your Business Challenge
            </CTAButton>
          </div>
        </section>
      </div>
    </div>
  );
}
