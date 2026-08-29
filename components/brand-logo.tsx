"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "header" | "footer" | "hero";
  className?: string;
}

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const sizeClasses = {
    header: "h-8 sm:h-9",
    footer: "h-8",
    hero: "h-12 sm:h-14"
  };

  return (
    <Link href="/" className={`group inline-flex items-center gap-3 transition-opacity ${className}`}>
      {/* Redwolf C1.5 Wolf + R Master Emblem */}
      <div className="relative flex items-center justify-center">
        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:shadow-red-600/50 transition-all duration-300 group-hover:scale-105 border border-red-500/30">
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 text-white"
          >
            {/* Master Wolf + R Geometric Path */}
            <path
              d="M18 4L7 12L10 22L18 32L26 22L29 12L18 4Z"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M13 14L18 9L23 14L20 23L18 27L16 23L13 14Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
            <circle cx="18" cy="17" r="2.5" fill="#090D16" />
          </svg>
        </div>
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-1 bg-red-600/20 rounded-xl blur-md -z-10 group-hover:bg-red-600/40 transition-all duration-300" />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className="font-heading font-extrabold tracking-wider text-white text-lg sm:text-xl uppercase group-hover:text-red-400 transition-colors">
          RED<span className="text-red-500">WOLF</span>
        </span>
        {variant !== "footer" && (
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1 font-semibold">
            DIGITAL SOLUTIONS
          </span>
        )}
      </div>
    </Link>
  );
}
