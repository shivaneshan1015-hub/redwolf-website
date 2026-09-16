"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Compass, ChevronDown } from "lucide-react";
import { primaryNavigation, globalCTAs } from "@/data/navigation";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string;
}

export function MobileNavigation({ isOpen, onClose, id = "mobile-menu" }: MobileNavigationProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Solutions: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleGroup = (name: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div
      id={id}
      className="fixed inset-x-0 top-[73px] bottom-0 bg-[#0B1220]/95 backdrop-blur-2xl z-50 overflow-y-auto border-t border-slate-800 animate-in fade-in slide-in-from-top-4 duration-200"
      aria-label="Mobile Navigation"
    >
      <div className="px-4 py-6 sm:px-6 space-y-6 max-w-md mx-auto">
        <nav className="flex flex-col space-y-3">
          {primaryNavigation.map((group) => {
            const hasSub = group.items && group.items.length > 0;
            const isExpanded = !!expandedGroups[group.name];

            return (
              <div key={group.name} className="border-b border-slate-800/80 pb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={group.href}
                    onClick={onClose}
                    className="text-sm font-heading font-extrabold uppercase tracking-wider text-amber-400 hover:text-amber-300 py-1"
                  >
                    {group.name}
                  </Link>

                  {hasSub && (
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.name)}
                      className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
                      aria-label={`Toggle ${group.name} items`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-red-400" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {hasSub && isExpanded && (
                  <div className="pl-3 space-y-2 border-l-2 border-red-500/40 ml-1 pt-1">
                    {group.items?.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={onClose}
                        className="block p-2 rounded-lg hover:bg-slate-900 transition-colors"
                      >
                        <div className="text-xs font-bold text-white">{sub.name}</div>
                        {sub.description && (
                          <div className="text-[11px] text-slate-400 leading-normal mt-0.5">
                            {sub.description}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Diagnostic & Primary CTAs */}
        <div className="pt-4 space-y-3">
          <Link
            href={globalCTAs.diagnostic.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 text-amber-400 text-xs font-bold py-3.5 px-4 rounded-xl w-full hover:bg-slate-800 transition-colors"
          >
            <Compass className="h-4 w-4 shrink-0 text-amber-400" />
            <span>{globalCTAs.diagnostic.labelWithArrow}</span>
          </Link>

          <Link
            href={globalCTAs.primary.href}
            onClick={onClose}
            className="flex items-center justify-center gap-2 bg-[#E53935] hover:bg-[#D32F2F] text-white text-xs font-heading font-extrabold uppercase tracking-wider py-4 px-4 rounded-xl shadow-lg shadow-red-600/30 w-full transition-all"
          >
            <span>{globalCTAs.primary.labelWithArrow}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
