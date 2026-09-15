import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import insights from "@/data/insights.json";

export const metadata: Metadata = {
  title: "Redwolf Insights — Digital Growth & Technology Knowledge Hub",
  description:
    "Explore strategic articles and field notes on AI Search (AEO/GEO), custom web application engineering, SaaS product development, and digital transformation.",
  keywords: [
    "Redwolf insights",
    "Generative Engine Optimization guide",
    "AEO voice search guide",
    "digital growth strategy blog",
    "SaaS engineering notes"
  ],
};

export default function InsightsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: "Insights" }]} />

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Redwolf Field Notes</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight text-white">
            Practical Thinking on <span className="text-red-500">Digital Growth & Technology</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Observations, experiments, and field notes from the intersection of business strategy, software engineering, and digital growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((article) => (
            <div
              key={article.id}
              className="group flex flex-col p-6 rounded-2xl bg-glass-card border border-slate-800 hover:border-red-500/40 shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-red-400 font-bold uppercase pb-3 border-b border-slate-800">
                <span>{article.category}</span>
                <span className="text-slate-500">{article.readTime}</span>
              </div>

              <div className="py-4 space-y-2 flex-1">
                <h2 className="text-xl font-heading font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {article.title}
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-auto">
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold font-mono text-red-400 hover:text-red-300 uppercase tracking-wider"
                >
                  <span>Read Field Note</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
