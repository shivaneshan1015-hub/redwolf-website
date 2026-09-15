"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  variant?: "header" | "footer" | "hero" | "light";
  className?: string;
}

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const isLight = variant === "light";
  const src = isLight ? "/logo-light.png" : "/logo.png";

  return (
    <Link href="/" className={`group inline-flex items-center gap-2 transition-opacity ${className}`}>
      <div className="relative h-10 w-auto flex items-center shrink-0">
        <Image
          src={src}
          alt="Redwolf - Digital Solutions For All Your Problems"
          width={220}
          height={52}
          priority
          className="h-9 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  );
}
