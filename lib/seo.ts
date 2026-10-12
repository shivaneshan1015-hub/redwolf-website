import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export interface SEOProps {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
  exactTitle?: boolean;
}

export function constructMetadata({
  title,
  description,
  pathname,
  ogImage = siteConfig.ogImage,
  noindex = false,
  keywords,
  type = "website",
  exactTitle = false,
}: SEOProps): Metadata {
  const baseUrl = siteConfig.url;
  const canonicalUrl = `${baseUrl}${pathname}`;
  const finalTitle = exactTitle ? title : `${title} | ${siteConfig.name}`;

  return {
    title: finalTitle,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: finalTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} - ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description,
      images: [ogImage],
    },
  };
}
