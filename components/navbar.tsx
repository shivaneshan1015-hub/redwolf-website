"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown, Compass, Search } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const navGroups = [
  {
    name: "Solutions",
    href: "/solutions",
    items: [
      { name: "GROW", href: "/solutions/grow", description: "Make your business easier to find, trust and choose." },
      { name: "DEFINE", href: "/solutions/define", description: "Make your business clear before you make it bigger." },
      { name: "BUILD", href: "/solutions/build", description: "Turn business processes into digital systems." },
      { name: "PRODUCTIZE", href: "/solutions/productize", description: "Turn ideas and workflows into software products." },
    ],
  },
  {
    name: "Industries",
    href: "/industries",
    items: [
      { name: "FMCG & Distribution", href: "/industries/fmcg-distribution", description: "Field sales, van inventory & beat routes" },
      { name: "Healthcare", href: "/industries/healthcare", description: "Patient booking & clinical trust portals" },
      { name: "Manufacturing", href: "/industries/manufacturing", description: "Custom quote systems & dealer portals" },
      { name: "Travel & Hospitality", href: "/industries/travel-hospitality", description: "Tour discovery & instant WhatsApp bookings" },
      { name: "SMEs & Growing Businesses", href: "/industries/smes", description: "Enterprise digital transformation for SMEs" },
    ],
  },
  {
    name: "Work",
    href: "/work",
  },
  {
    name: "Products",
    href: "/products",
    items: [
      { name: "EasyTrack", href: "/products/easytrack", description: "FMCG Distribution Management Software" },
    ],
  },
  {
    name: "Insights",
    href: "/insights",
  },
  {
    name: "About",
    href: "/about",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
        <nav className="hidden lg:flex items-center gap-1.5">
          {navGroups.map((group) => {
            const hasDropdown = group.items && group.items.length > 0;
            const isActive = pathname?.startsWith(group.href);

            if (hasDropdown) {
              return (
                <div
                  key={group.name}
                  className="relative group/dropdown"
                  onMouseEnter={() => setActiveDropdown(group.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={group.href}
                    className={`text-xs font-bold font-heading uppercase tracking-wider transition-colors px-3 py-2 rounded-lg flex items-center gap-1 ${
                      isActive
                        ? "text-red-400 font-extrabold bg-slate-900/60"
                        : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                    }`}
                  >
                    <span>{group.name}</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover/dropdown:rotate-180 transition-transform" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-2 w-72 opacity-0 group-hover/dropdown:opacity-100 pointer-events-none group-hover/dropdown:pointer-events-auto transition-all duration-200 z-50">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2.5 space-y-1">
                      {group.items?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group/item"
                        >
                          <span className="text-xs font-bold text-white block group-hover/item:text-red-400">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="text-[11px] text-slate-400 block line-clamp-1 mt-0.5">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={group.name}
                href={group.href}
                className={`text-xs font-bold font-heading uppercase tracking-wider transition-colors px-3 py-2 rounded-lg ${
                  isActive
                    ? "text-red-400 font-extrabold bg-slate-900/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                }`}
              >
                {group.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3.5">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-amber-400 text-xs font-semibold tracking-normal transition-colors"
          >
            <Compass className="h-4 w-4 text-amber-400" />
            <span>Find your digital path →</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-heading font-extrabold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02]"
          >
            <span>Start a conversation</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B1220]/95 border-b border-slate-800 backdrop-blur-2xl px-4 py-6 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-4">
            {navGroups.map((group) => (
              <div key={group.name} className="space-y-1">
                <Link
                  href={group.href}
                  className="text-sm font-bold text-amber-400 px-3 py-1.5 block uppercase tracking-wider"
                  onClick={() => setIsOpen(false)}
                >
                  {group.name}
                </Link>

                {group.items && (
                  <div className="pl-4 space-y-1 border-l-2 border-slate-800 ml-3">
                    {group.items.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block text-xs font-medium text-slate-300 hover:text-white py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <Link
                href="/diagnostic"
                className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold py-3 rounded-xl w-full"
                onClick={() => setIsOpen(false)}
              >
                <Compass className="h-4 w-4" />
                <span>Find your digital path →</span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#E53935] text-white text-xs font-extrabold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-600/30 w-full"
                onClick={() => setIsOpen(false)}
              >
                <span>Start a conversation →</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
