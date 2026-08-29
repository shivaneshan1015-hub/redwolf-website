import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Redwolf | Digital Solutions for All Your Problems",
  description:
    "Redwolf combines strategy, branding, marketing, full-stack web applications, custom business software, and SaaS product engineering to solve complex business problems worldwide.",
  keywords: [
    "Redwolf",
    "Redwolf Digital Solutions",
    "digital transformation partner",
    "custom web applications Next.js",
    "SaaS product development",
    "business automation software",
    "brand strategy and digital marketing",
    "remote technology consulting"
  ],
  authors: [{ name: "Redwolf" }],
  openGraph: {
    title: "Redwolf | Digital Solutions for All Your Problems",
    description:
      "You bring the business problem. Redwolf figures out the digital solution. Strategy, Branding, Marketing, Web, Software & SaaS.",
    url: "https://redwolf.digital",
    siteName: "Redwolf",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redwolf | Digital Solutions for All Your Problems",
    description:
      "You bring the business problem. Redwolf figures out the digital solution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Redwolf",
    "url": "https://redwolf.digital",
    "logo": "https://redwolf.digital/logo.png",
    "description": "Technology + Consulting + Digital Solutions. Digital Solutions for All Your Problems.",
    "sameAs": [
      "https://github.com/redwolf-digital"
    ],
    "knowsAbout": [
      "Digital Transformation",
      "Full-Stack Web Development",
      "SaaS Product Engineering",
      "Business Automation",
      "Brand Strategy & Positioning"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 antialiased selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
