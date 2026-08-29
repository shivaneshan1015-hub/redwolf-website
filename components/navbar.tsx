"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const navLinks = [
  { name: "System", href: "#system" },
  { name: "Problem Finder", href: "#problem-finder" },
  { name: "Selected Work", href: "#work" },
  { name: "Easy Track", href: "#product" },
  { name: "Methodology", href: "#methodology" },
];

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
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
          ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <BrandLogo variant="header" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 bg-slate-900/60 border border-slate-800/80 rounded-full px-6 py-2 backdrop-blur-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-red-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Action */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-red-600/25 transition-all active:scale-95 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#090d16]/95 border-b border-slate-800 backdrop-blur-xl px-4 py-6 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-200 hover:text-red-400 px-3 py-2 rounded-md hover:bg-slate-900/60"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg shadow-red-600/30"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start a Project</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
