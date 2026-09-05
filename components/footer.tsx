"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ChevronUp } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useCurrency } from "@/context/currency-context";
import { CountrySelectorModal } from "@/components/country-selector-modal";
import siteData from "@/data/site-data.json";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const { countryInfo } = useCurrency();

  return (
    <>
      <footer className="bg-[#06080f] text-slate-400 py-16 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand Column */}
            <div className="md:col-span-5 space-y-4">
              <BrandLogo variant="footer" />
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                {siteData.brand.subheadline}
              </p>
              <div className="text-xs font-mono text-slate-400 font-semibold flex items-center gap-2">
                <span>{siteData.brand.deliveryModel}</span>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
                Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/#marketing" className="hover:text-red-400 transition-colors">
                    Digital Marketing Services
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-red-400 transition-colors">
                    Transparent SME Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/#problem-finder" className="hover:text-red-400 transition-colors">
                    Problem Finder Tool
                  </Link>
                </li>
                <li>
                  <Link href="/#work" className="hover:text-red-400 transition-colors">
                    Selected Work & Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="hover:text-red-400 transition-colors">
                    Search & AI Growth Insights
                  </Link>
                </li>
              </ul>
            </div>

            {/* Capabilities & Country Trigger */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
                Region & Capabilities
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="bg-slate-900 border border-slate-800 text-red-400 px-2.5 py-1 rounded font-bold">SEO</span>
                <span className="bg-slate-900 border border-slate-800 text-amber-400 px-2.5 py-1 rounded font-bold">AEO</span>
                <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded font-bold">GEO</span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Meta & Google Ads</span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Local SEO</span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Next.js Web Apps</span>
              </div>

              {/* Country & Currency Switcher Trigger Button in Footer */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCountryModalOpen(true)}
                  className="flex items-center justify-between w-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono transition-all hover:bg-slate-800/80 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-red-500" />
                    <span>Selected Country:</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{countryInfo.flag}</span>
                    <span>{countryInfo.countryName} ({countryInfo.symbol.trim()})</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 text-center sm:text-left">
            <p>&copy; {currentYear} Redwolf. All rights reserved. {siteData.brand.tagline}.</p>
            <p className="text-slate-400">
              Designed & Built by <span className="font-bold text-red-500">Redwolf</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Country Switcher Modal */}
      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
      />
    </>
  );
}

