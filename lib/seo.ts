import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export interface SEOProps {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
  noindex?: boolean;
}

export function constructMetadata({
  title,
  description,
  pathname,
  ogImage = siteConfig.ogImage,
  noindex = false,
}: SEOProps): Metadata {
  const baseUrl = siteConfig.url;
  const canonicalUrl = `${baseUrl}${pathname}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
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
      title: `${title} | ${siteConfig.name}`,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
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
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage],
    },
  };
}
