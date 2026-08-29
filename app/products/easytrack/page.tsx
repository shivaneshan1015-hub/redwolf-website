import { Metadata } from "next";
import Link from "next/link";
import { Cpu, Play, CheckCircle2, ArrowRight, ShieldCheck, Activity, Truck, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "EasyTrack — Enterprise Fleet, Logistics & Dispatch SaaS | Built by Redwolf",
  description:
    "EasyTrack is an enterprise SaaS platform engineered by Redwolf to streamline vehicle route management, automated driver updates, WhatsApp notifications, and trip analytics.",
  keywords: [
    "EasyTrack SaaS",
    "fleet management software India",
    "logistics dispatch tracking platform",
    "distributor trip sheet software",
    "vehicle route tracking app"
  ],
};

export default function EasyTrackProductPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EasyTrack SaaS Platform",
    "image": "https://redwolf.digital/logo.png",
    "description": "Enterprise management, fleet dispatching, and route tracking platform designed and operated by Redwolf.",
    "brand": {
      "@type": "Brand",
      "name": "Redwolf"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://easytrack-app.vercel.app/login",
      "priceCurrency": "INR",
      "price": "1499",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#090d16] text-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-red-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Products</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-red-400 font-bold">EasyTrack SaaS</span>
          </nav>

          {/* Hero Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-red-500/30 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>A SaaS Product Built & Operated by Redwolf</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                  EasyTrack — Enterprise Fleet, Dispatch & Route Management SaaS
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  EasyTrack eliminates operational opacity in distribution, transport, and commercial fleet logistics. Manage routes, drivers, automated WhatsApp customer updates, and digital trip sheets in real time.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://easytrack-app.vercel.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>Launch Live App Demo (easytrack-app.vercel.app)</span>
                  </a>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl"
                  >
                    <span>Request Custom SaaS Architecture</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Activity className="h-4 w-4" /> EASYTRACK LIVE HUB
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">READY</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Route Mapping & Dispatch</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Automated WhatsApp Alerts</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Multi-Tenant Owner & Agent Roles</span>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Core Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-red-400 font-bold uppercase">01. DISPATCH CONSOLE</span>
              <h3 className="text-lg font-heading font-extrabold">Real-Time Fleet Console</h3>
              <p className="text-xs text-slate-300">Track active jobs, vehicle routes, and driver assignments instantly.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">02. WHATSAPP ALERTS</span>
              <h3 className="text-lg font-heading font-extrabold">Automated Customer SMS/WA</h3>
              <p className="text-xs text-slate-300">Automatic dispatch notifications and live ETA updates sent to buyers.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">03. DIGITAL LEDGER</span>
              <h3 className="text-lg font-heading font-extrabold">Trip Sheets & Invoicing</h3>
              <p className="text-xs text-slate-300">Generate digital trip receipts, ledger reports, and revenue analytics.</p>
            </div>

            <div className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">04. PORTAL ACCESS</span>
              <h3 className="text-lg font-heading font-extrabold">Agent & Owner Portals</h3>
              <p className="text-xs text-slate-300">Role-based access routing for company owners, agents, and drivers.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
