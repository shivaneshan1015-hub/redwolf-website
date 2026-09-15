"use client";

import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  variant?: "header" | "footer" | "hero";
  className?: string;
}

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 transition-opacity ${className}`}>
      {/* Redwolf C1.5 Wolf + R Master Emblem */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Left Wolf Outer Face & Ear (White) */}
          <path
            d="M 50 14 L 28 8 L 32 38 L 18 38 L 32 64 L 50 90 L 50 78 L 38 60 L 36 44 L 44 44 L 50 28 Z"
            fill="#FFFFFF"
          />
          {/* Left Red Eye */}
          <polygon points="32,36 40,38 36,44 30,42" fill="#E53935" />

          {/* Right Integrated Red 'R' (Red #E53935) */}
          {/* Top Ear & Stem */}
          <path
            d="M 50 14 L 72 8 L 68 34 L 50 28 Z"
            fill="#E53935"
          />
          {/* R Body & Loop */}
          <path
            d="M 48 32 H 72 C 82 32 88 38 88 46 C 88 54 82 60 72 60 H 58 V 86 H 48 V 32 Z M 58 40 V 52 H 70 C 74 52 78 50 78 46 C 78 42 74 40 70 40 H 58 Z"
            fill="#E53935"
          />
          {/* R Leg extending downward */}
          <path
            d="M 66 58 L 88 90 H 74 L 54 60 Z"
            fill="#E53935"
          />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span className="font-heading font-extrabold tracking-wider text-white text-lg sm:text-xl uppercase group-hover:text-red-400 transition-colors">
          <span className="text-[#E53935]">RED</span>WOLF
        </span>
      </div>
    </Link>
  );
}
