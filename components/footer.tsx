import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { brandData } from "@/data/brand";

export function Footer() {
  const currentYear = new Date().getFullYear();

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
              <div>📍 {brandData.address}</div>
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
              <li>
                <Link href="/solutions/grow" className="hover:text-red-400 transition-colors">
                  GROW
                </Link>
              </li>
              <li>
                <Link href="/solutions/define" className="hover:text-red-400 transition-colors">
                  DEFINE
                </Link>
              </li>
              <li>
                <Link href="/solutions/build" className="hover:text-red-400 transition-colors">
                  BUILD
                </Link>
              </li>
              <li>
                <Link href="/solutions/productize" className="hover:text-red-400 transition-colors">
                  PRODUCTIZE
                </Link>
              </li>
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
              <li>
                <Link href="/industries/fmcg-distribution" className="hover:text-red-400 transition-colors">
                  FMCG & Distribution
                </Link>
              </li>
              <li>
                <Link href="/industries/healthcare" className="hover:text-red-400 transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing" className="hover:text-red-400 transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/industries/travel-hospitality" className="hover:text-red-400 transition-colors">
                  Travel & Hospitality
                </Link>
              </li>
              <li>
                <Link href="/industries/smes" className="hover:text-red-400 transition-colors">
                  SMEs & Growing Businesses
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions Column */}
          <div className="md:col-span-3 space-y-4 bg-slate-900/70 p-5 rounded-2xl border border-slate-800">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Redwolf Diagnostic
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Not sure which capability fits your current friction? Start with your business problem.
            </p>

            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Compass className="h-4 w-4" />
              <span>Find your digital path →</span>
            </Link>

            <div className="pt-2">
              <Link
                href="/contact"
                className="block text-center bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-heading font-extrabold uppercase tracking-wider py-2.5 rounded-xl shadow-md transition-colors"
              >
                Start a conversation →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
          <p>&copy; {currentYear} Redwolf. All rights reserved. {brandData.tagline}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <Link href="/about" className="hover:text-white transition-colors">About Redwolf</Link>
            <Link href="/products/easytrack" className="hover:text-white transition-colors">EasyTrack</Link>
            <Link href="/insights" className="hover:text-white transition-colors">Field Notes</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
