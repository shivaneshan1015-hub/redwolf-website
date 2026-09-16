"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { globalCTAs } from "@/data/navigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigationTrigger } from "./MobileNavigationTrigger";
import { MobileNavigation } from "./MobileNavigation";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1220]/95 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/60"
          : "bg-[#0B1220]/80 backdrop-blur-md py-4 border-b border-slate-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo variant="header" />

        {/* Desktop Navigation */}
        <DesktopNavigation />

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href={globalCTAs.diagnostic.href}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-xs font-semibold tracking-normal transition-colors"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>{globalCTAs.diagnostic.labelWithArrow}</span>
          </Link>

          <Link
            href={globalCTAs.primary.href}
            className="inline-flex items-center gap-1.5 bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-heading font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <span>{globalCTAs.primary.label}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle Trigger */}
        <div className="flex lg:hidden items-center">
          <MobileNavigationTrigger
            isOpen={isMobileOpen}
            onToggle={() => setIsMobileOpen(!isMobileOpen)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileNavigation
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </header>
  );
}
