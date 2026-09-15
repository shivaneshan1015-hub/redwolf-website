"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { primaryNavigation } from "@/data/navigation";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";

export function DesktopNavigation() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5 relative">
      {primaryNavigation.map((group) => {
        const isSolutions = group.name === "Solutions";
        const hasDropdown = group.items && group.items.length > 0;
        const isActive = pathname === group.href || (pathname?.startsWith(group.href + "/") ?? false);

        if (isSolutions) {
          return (
            <div
              key={group.name}
              className="relative"
              onMouseEnter={() => setActiveMenu("Solutions")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={group.href}
                className={`text-xs font-bold font-heading uppercase tracking-wider transition-colors px-3 py-2 rounded-lg flex items-center gap-1.5 ${
                  isActive || activeMenu === "Solutions"
                    ? "text-red-400 font-extrabold bg-slate-900/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                }`}
                aria-expanded={activeMenu === "Solutions"}
                aria-haspopup="true"
              >
                <span>{group.name}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    activeMenu === "Solutions" ? "rotate-180 text-red-400" : "opacity-70"
                  }`}
                />
              </Link>

              {activeMenu === "Solutions" && (
                <div className="fixed left-0 right-0 top-full pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <SolutionsMegaMenu onClose={() => setActiveMenu(null)} />
                </div>
              )}
            </div>
          );
        }

        if (hasDropdown) {
          return (
            <div
              key={group.name}
              className="relative group/dropdown"
              onMouseEnter={() => setActiveMenu(group.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={group.href}
                className={`text-xs font-bold font-heading uppercase tracking-wider transition-colors px-3 py-2 rounded-lg flex items-center gap-1.5 ${
                  isActive || activeMenu === group.name
                    ? "text-red-400 font-extrabold bg-slate-900/60"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/40"
                }`}
                aria-expanded={activeMenu === group.name}
              >
                <span>{group.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70 group-hover/dropdown:rotate-180 transition-transform duration-200" />
              </Link>

              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 group-hover/dropdown:opacity-100 pointer-events-none group-hover/dropdown:pointer-events-auto transition-all duration-200 z-50">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2.5 space-y-1">
                  {group.items?.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors group/item"
                    >
                      <span className="text-xs font-bold text-white block group-hover/item:text-red-400 transition-colors">
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
  );
}
