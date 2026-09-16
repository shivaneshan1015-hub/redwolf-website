import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "GROW — Local SEO & Google Business Profile Systems | Redwolf",
  description:
    "Make your regional business units easier to find and trust with Redwolf's GROW Local SEO & GBP Optimization systems.",
};

export default function LocalSEOPage() {
  return (
    <div className="pt-24 pb-20 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "GROW", href: "/solutions/grow" },
            { label: "Local SEO" },
          ]}
        />

        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
            <MapPin className="h-3.5 w-3.5" />
            <span>GROW CAPABILITY • LOCAL DISCOVERABILITY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
            Local Search & <span className="text-red-500">Google Business Profile</span> Systems
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Help local and multi-location buyers find your branches, service areas, and outlets in regional Google search and Map packs.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-heading font-extrabold text-white">Need local discoverability for your branches?</h3>
            <p className="text-xs text-slate-400">Start a conversation with Redwolf strategy & growth team.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#D32F2F] text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
          >
            <span>Start a conversation →</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
