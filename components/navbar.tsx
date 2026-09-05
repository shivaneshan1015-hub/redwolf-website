"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles, Globe, ChevronDown } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { useCurrency } from "@/context/currency-context";
import { CountrySelectorModal } from "@/components/country-selector-modal";

const navLinks = [
  { name: "Services", href: "/#marketing" },
  { name: "Pricing", href: "/#pricing" },
  { name: "ROI Calculator", href: "/#roi-calculator" },
  { name: "Problem Finder", href: "/#problem-finder" },
  { name: "Work", href: "/#work" },
  { name: "Insights", href: "/insights" },
];

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const { countryInfo } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-2xl shadow-black/60"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo variant="header" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 border border-slate-800/80 rounded-full px-5 py-1.5 backdrop-blur-xl shadow-inner shadow-black/40">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-slate-800/70 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions (Country Switcher + CTA) */}
          <div className="hidden lg:flex items-center gap-3.5">
            {/* Country & Region Switcher Trigger */}
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-full px-3.5 py-1.5 text-xs text-slate-200 font-mono transition-all hover:bg-slate-800/80 active:scale-95 cursor-pointer shadow-sm"
              title="Change Country & Currency"
              aria-label="Select Country"
            >
              <span className="text-base leading-none">{countryInfo.flag}</span>
              <span className="font-bold">{countryInfo.countryCode}</span>
              <span className="text-slate-400 text-[11px]">({countryInfo.symbol.trim()})</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            <button
              onClick={onOpenEnquiry}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-red-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2.5">
            {/* Mobile Country Switcher Trigger */}
            <button
              onClick={() => setIsCountryModalOpen(true)}
              className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono cursor-pointer"
              aria-label="Select Country"
            >
              <span className="text-sm leading-none">{countryInfo.flag}</span>
              <span className="font-bold">{countryInfo.countryCode}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-[#090d16]/95 border-b border-slate-800 backdrop-blur-2xl px-4 py-6 animate-in fade-in slide-in-from-top-4">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-red-400 px-3 py-2.5 rounded-lg hover:bg-slate-900/80 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsCountryModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-mono"
                >
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-red-500" />
                    <span>Country & Currency</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{countryInfo.flag}</span>
                    <span>{countryInfo.countryName} ({countryInfo.symbol.trim()})</span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenEnquiry) onOpenEnquiry();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Start a Project</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Country Switcher Modal */}
      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
      />
    </>
  );
}

