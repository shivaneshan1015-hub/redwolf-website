"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import siteData from "@/data/site-data.json";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06080f] text-slate-400 py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              {siteData.brand.subheadline}
            </p>
            <div className="text-xs font-mono text-slate-400 font-semibold">
              {siteData.brand.deliveryModel}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#system" className="hover:text-red-400 transition-colors">
                  The Redwolf System
                </Link>
              </li>
              <li>
                <Link href="#problem-finder" className="hover:text-red-400 transition-colors">
                  Problem Finder Tool
                </Link>
              </li>
              <li>
                <Link href="#work" className="hover:text-red-400 transition-colors">
                  Selected Work & Case Studies
                </Link>
              </li>
              <li>
                <Link href="#product" className="hover:text-red-400 transition-colors">
                  Easy Track (Built by Redwolf)
                </Link>
              </li>
              <li>
                <Link href="#methodology" className="hover:text-red-400 transition-colors">
                  Consulting Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-xs text-white uppercase tracking-wider">
              Capabilities
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Strategy</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Brand</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Marketing</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Web App</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">Software</span>
              <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">SaaS</span>
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
  );
}
