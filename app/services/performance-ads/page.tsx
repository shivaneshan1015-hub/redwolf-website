import { Metadata } from "next";
import Link from "next/link";
import { Target, Zap, TrendingUp, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Performance Ads & PPC Management | Google, Meta & LinkedIn Ads Agency",
  description:
    "Scale qualified lead generation and sales pipeline with Redwolf's high-ROI Performance Ad campaigns across Google Search, Meta (Facebook & Instagram), and LinkedIn Ads.",
  keywords: [
    "Google Ads agency India",
    "Meta Ads agency",
    "PPC management services",
    "Facebook Instagram ads agency",
    "B2B LinkedIn lead generation",
    "conversion rate optimization agency"
  ],
};

export default function PerformanceAdsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Services</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-bold">Performance Ads & PPC</span>
          </nav>

          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
              <Target className="h-3.5 w-3.5" />
              <span>Paid Growth & Conversion Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              Intent-Driven Google, Meta & <span className="text-red-500">LinkedIn Ad Campaigns</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Stop wasting marketing budget on un-targeted ad clicks. Redwolf engineers high-converting ad funnels focused on Cost Per Acquisition (CPA), Return On Ad Spend (ROAS), and real sales pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-red-400">Google Search & Shopping Ads</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Capturing high-intent buyers actively searching for your commercial services on Google Search and Shopping feeds.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-amber-400">Meta (FB & IG) Retargeting</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Engaging prospects with high-converting social creative and full-funnel retargeting to maximize conversion rates.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-emerald-400">LinkedIn B2B Lead Gen</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reaching key decision-makers and enterprise buyers with targeted B2B messaging and lead form campaigns.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Want lower CPA and higher ad ROAS?</h3>
              <p className="text-xs text-slate-400">Schedule an ad audit with Redwolf's performance marketing team.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
            >
              <span>Audit My Ads</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
