import React from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { getBrandContent } from "@/lib/cms";
import { primaryNavigation, globalCTAs } from "@/data/navigation";

export function Footer() {
  const brandData = getBrandContent();
  const currentYear = new Date().getFullYear();
  const solutionsGroup = primaryNavigation.find((g) => g.name === "Solutions");
  const industriesGroup = primaryNavigation.find((g) => g.name === "Industries");

  return (
    <footer className="bg-[#070B14] text-slate-400 py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              &ldquo;{brandData.promise}&rdquo;
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {brandData.positioning}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs font-mono text-slate-400">
              <div>📍 {brandData.address.city} &amp; South India Operations</div>
              <div>📞 {brandData.phone}</div>
              <div>✉️ {brandData.email}</div>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              {solutionsGroup?.items?.map((sol) => (
                <li key={sol.name}>
                  <Link href={sol.href} className="hover:text-red-400 transition-colors">
                    {sol.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/solutions" className="hover:text-red-400 font-bold transition-colors">
                  All Solutions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Industries
            </h4>
            <ul className="space-y-2 text-xs">
              {industriesGroup?.items?.map((ind) => (
                <li key={ind.name}>
                  <Link href={ind.href} className="hover:text-red-400 transition-colors">
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagnostic & Conversation Card */}
          <div className="md:col-span-3 space-y-4 bg-slate-900/70 p-5 rounded-2xl border border-slate-800">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Redwolf Diagnostic
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Not sure which capability fits your current friction? Start with your business problem.
            </p>

            <Link
              href={globalCTAs.diagnostic.href}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Compass className="h-4 w-4" />
              <span>{globalCTAs.diagnostic.labelWithArrow}</span>
            </Link>

            <div className="pt-2">
              <Link
                href={globalCTAs.primary.href}
                className="block text-center bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-heading font-extrabold uppercase tracking-wider py-2.5 rounded-xl shadow-md transition-colors"
              >
                {globalCTAs.primary.labelWithArrow}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
          <p>&copy; {currentYear} Redwolf. All rights reserved. {brandData.tagline}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-white transition-colors">About Redwolf</Link>
            <Link href="/work" className="hover:text-white transition-colors">Work</Link>
            <Link href="/products/easytrack" className="hover:text-white transition-colors">EasyTrack</Link>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
