import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Redwolf | From Business Problem to Digital Solution",
  description: siteConfig.positioning,
  keywords: [
    "Redwolf",
    "Digital growth and technology company",
    "Business digital transformation",
    "Custom web application engineering",
    "SaaS product development",
    "FMCG distribution software",
    "Technical SEO and local search",
    "Redwolf System"
  ],
  authors: [{ name: "Redwolf Strategy & Engineering" }],
  alternates: {
    canonical: siteConfig.url
  },
  openGraph: {
    title: "Redwolf | From Business Problem to Digital Solution",
    description: siteConfig.positioning,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwolf | Digital Growth & Technology Company",
    description: siteConfig.positioning,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}/logo.png`,
        "description": siteConfig.positioning,
        "sameAs": [siteConfig.social.github, siteConfig.social.linkedin],
        "knowsAbout": [
          "Digital Growth & Strategy",
          "Brand & User Experience Architecture",
          "Web Application & Software Engineering",
          "SaaS Product Engineering",
          "Search Engine Optimization (SEO)",
          "FMCG Distribution Software"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        "name": "Redwolf",
        "image": `${siteConfig.url}/logo.png`,
        "telephone": siteConfig.phone,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": siteConfig.address.city,
          "addressRegion": siteConfig.address.region,
          "addressCountry": siteConfig.address.country
        },
        "areaServed": ["IN", "US", "GB", "AE", "EU", "CA", "AU", "SG"]
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B1220] text-[#F7F7F5] antialiased selection:bg-red-500 selection:text-white">
        <CurrencyProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}
