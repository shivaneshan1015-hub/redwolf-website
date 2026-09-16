import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://redwolf.in",
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.label,
        "item": item.href ? `https://redwolf.in${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-xs font-mono text-slate-400 py-2 ${className}`}>
        <Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-1">
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <React.Fragment key={item.label + idx}>
              <ChevronRight className="h-3 w-3 text-slate-600 shrink-0" />
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-red-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-red-400 font-bold line-clamp-1">{item.label}</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </>
  );
}
