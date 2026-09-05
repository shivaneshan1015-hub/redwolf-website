import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://redwolf.digital"),
  title: "Redwolf | Affordable Digital Marketing, SEO/AEO/GEO & Web Development for SMEs",
  description:
    "Redwolf is a full-stack digital marketing agency and technology partner for Small and Medium Industries (SMEs). We specialize in Google SEO, Voice AEO, AI GEO (ChatGPT/Perplexity ranking), Meta & Google Ads, and custom Next.js web applications.",
  keywords: [
    "Redwolf",
    "Redwolf Digital Marketing",
    "Affordable digital marketing for SMEs",
    "Small business SEO agency",
    "SEO AEO GEO agency",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Google Maps Local SEO",
    "Meta and Google Ads for small business",
    "Custom Next.js web development"
  ],
  authors: [{ name: "Redwolf Strategy & Engineering" }],
  alternates: {
    canonical: "https://redwolf.digital"
  },
  openGraph: {
    title: "Redwolf | Tri-Engine Search Dominance & Web Software for SMEs",
    description:
      "Affordable digital marketing, SEO, AEO, GEO, performance ads, and high-speed web apps tailored for small and medium industries.",
    url: "https://redwolf.digital",
    siteName: "Redwolf",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwolf | Digital Marketing & Web Engineering for SMEs",
    description:
      "Dominate Google, Voice Search, and AI Search Engines like ChatGPT & Perplexity with Redwolf.",
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
        "@id": "https://redwolf.digital/#organization",
        "name": "Redwolf",
        "url": "https://redwolf.digital",
        "logo": "https://redwolf.digital/logo.png",
        "description": "Full-stack Digital Marketing Agency, SEO/AEO/GEO Growth Specialist, and Custom Software Engineering Partner for Small & Medium Industries.",
        "sameAs": ["https://github.com/redwolf-digital"],
        "knowsAbout": [
          "Digital Marketing for SMEs",
          "Search Engine Optimization (SEO)",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimization (GEO)",
          "Performance PPC Ads",
          "Next.js Web Application Engineering"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://redwolf.digital/#localbusiness",
        "name": "Redwolf Digital Solutions",
        "image": "https://redwolf.digital/logo.png",
        "priceRange": "$$",
        "telephone": "+91-9000000000",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IN"
        },
        "areaServed": ["IN", "US", "GB", "AE", "EU", "CA", "AU", "SG"]
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-red-500 selection:text-white">
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}

