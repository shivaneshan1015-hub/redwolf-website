"use client";

import React from "react";
import { Menu, X } from "lucide-react";

interface MobileNavigationTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
  ariaControlsId?: string;
}

export function MobileNavigationTrigger({
  isOpen,
  onToggle,
  ariaControlsId = "mobile-menu",
}: MobileNavigationTriggerProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:ring-offset-2 focus:ring-offset-slate-950 transition-colors"
      aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
      aria-expanded={isOpen}
      aria-controls={ariaControlsId}
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
