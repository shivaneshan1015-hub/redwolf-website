import { Metadata } from "next";
import Link from "next/link";
import { Cpu, Play, CheckCircle2, ArrowRight, Activity } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { productsData } from "@/data/products";

export const metadata: Metadata = {
  title: "EasyTrack — FMCG Distribution Management Software | Redwolf Product",
  description:
    "EasyTrack is an enterprise FMCG distribution software engineered by Redwolf for field sales reps, van inventory, beat routes, retailer credit, and live collections.",
  keywords: [
    "EasyTrack SaaS",
    "FMCG distribution software India",
    "van sales tracking app",
    "distributor order taking app",
    "offline route sales software"
  ],
};

export default function EasyTrackProductPage() {
  const easytrack = productsData.easytrack;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EasyTrack Distribution Software",
    "image": "https://redwolf.in/logo.png",
    "description": easytrack.summary,
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
    <div className="pt-24 pb-20 text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            { label: "EasyTrack" },
          ]}
        />

        {/* Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-glass-card border border-red-500/30 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider">
                <Cpu className="h-3.5 w-3.5" />
                <span>REDWOLF PRODUCT • FMCG DISTRIBUTION SOFTWARE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight">
                {easytrack.heroHeadline}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {easytrack.supportingCopy}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://easytrack-app.vercel.app/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E53935] hover:bg-[#D32F2F] text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.01]"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Launch Live App Demo (easytrack-app.vercel.app)</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-extrabold text-xs uppercase tracking-wider px-7 py-4 rounded-xl"
                >
                  <span>Start a conversation →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Activity className="h-4 w-4" /> EASYTRACK SYSTEM
                </span>
                <span className="text-emerald-400 font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded">ONLINE</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Beat Route & Order Capture</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Offline Sync Architecture</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Van Stock & Credit Limit Alerts</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Roles */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
              OPERATIONAL ROLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold">Built for Every Role in FMCG Distribution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {easytrack.userRoles.map((role) => (
              <div key={role.role} className="p-6 rounded-2xl bg-glass-card border border-slate-800 space-y-4">
                <h3 className="text-lg font-heading font-extrabold text-amber-400">{role.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{role.description}</p>
                <ul className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  {role.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
