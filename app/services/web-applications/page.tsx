import { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Next.js Web Applications & Digital Platforms | Redwolf Engineering",
  description:
    "High-converting Next.js App Router web applications engineered for speed, SEO, conversion rate optimization, and seamless user experience.",
  keywords: [
    "Next.js web application developers",
    "custom web development agency",
    "React full stack web app",
    "high conversion landing page development"
  ],
};

export default function WebApplicationsPage() {
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
            <span className="text-red-400 font-bold">Web Applications</span>
          </nav>

          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5" />
              <span>Full-Stack Web Engineering Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight">
              Next.js Web Applications Built for <span className="text-red-500">Conversion</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Your website shouldn't just exist—it should work as hard as your business. We engineer full-stack Next.js web platforms with lightning-fast load times, responsive glassmorphic UI, and frictionless conversion paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-red-400">Next.js 15 App Router</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Production-grade React 19 architecture with Server Components, dynamic static rendering, and instant client hydration.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-amber-400">Conversion Rate Optimization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Frictionless lead forms, pre-filled WhatsApp action buttons, and clear visual hierarchy designed to turn visitors into buyers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-emerald-400">SEO & Speed Optimization</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                100/100 Google Lighthouse speed scores, responsive WebP image optimization, and structured metadata out of the box.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-red-950/40 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-heading font-extrabold text-white">Need a website that actually drives revenue?</h3>
              <p className="text-xs text-slate-400">Consult with Redwolf's senior web engineering team.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-red-600/30 shrink-0"
            >
              <span>Build My Web App</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
