import { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Local SEO & Google Maps Pack Optimization | Redwolf Digital Growth",
  description:
    "Optimize Google Maps Pack visibility and local city/district search results with Redwolf's Local Business SEO and multi-branch Google Business Profile optimization.",
  keywords: [
    "Local SEO strategy",
    "Google Business Profile optimization",
    "Google Maps pack visibility",
    "multi-branch local search",
    "local citation building"
  ],
};

export default function LocalSEOPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Capabilities</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-bold">Local SEO & Google Maps</span>
          </nav>

          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" />
              <span>Regional Local Search Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              Optimize for <span className="text-red-500">Google Maps</span> & Local Searches
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              When customers in your city search for services "near me", your business should be clearly discoverable. Redwolf optimizes Google Business Profiles, builds structured local citations, and creates district-focused landing pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-red-400">Google Business Profile Audit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Optimizing categories, business descriptions, geotagged images, and review response workflows.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-amber-400">Multi-District Landing Pages</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Creating high-converting regional landing pages tailored to specific cities, districts, and industrial zones.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-emerald-400">Structured Local Schema</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Embedding precise geolocation coordinates, opening hours, and service radiuses in code for Google crawlers.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Ready to dominate local Google searches?</h3>
              <p className="text-xs text-slate-400">Claim your free local map pack ranking diagnosis.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
            >
              <span>Get Local SEO Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
