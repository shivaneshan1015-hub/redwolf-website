import React, { Suspense } from "react";
import { Metadata } from "next";
import { MessageSquare, Mail, MapPin, ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageContainer } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = constructMetadata({
  title: "Contact Redwolf Digital — Tell Us What Your Business Needs to Solve",
  description:
    "Share the challenge you are facing. We'll review your enquiry and determine the most useful next step.",
  pathname: "/contact",
});

export default function ContactPage() {
  const whatsappUrl =
    "https://wa.me/918122712587?text=Hi%20Redwolf%20Digital%2C%20I'd%20like%20to%20discuss%20a%20business%20challenge.";

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <PageContainer size="lg" className="space-y-10">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        {/* Header Section */}
        <div className="space-y-4 max-w-3xl">
          <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            LET&apos;S TALK
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Tell us what your business needs to solve.
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Share the challenge you are facing. We&apos;ll review your enquiry and determine the most useful next step.
          </p>
        </div>

        {/* 2-Column Layout: Form on Left, Direct Contact / WhatsApp on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 animate-pulse min-h-[500px]" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Sidebar: WhatsApp Action & Direct Channels */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct WhatsApp Action Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#0d1526] border border-emerald-500/30 shadow-xl space-y-4">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="h-5 w-5" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-heading font-extrabold text-white">
                  Prefer WhatsApp?
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Message Redwolf Digital on WhatsApp to discuss your business challenge.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-heading font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-[11px] font-mono text-emerald-400/90 text-center mt-2">
                  +91 81227 12587
                </p>
              </div>
            </div>

            {/* Direct Communication Channels Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5 text-xs">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300">
                Direct Contact
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white hover:text-red-400 font-medium transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-mono text-slate-400 uppercase">
                      Location
                    </span>
                    <span className="text-white">
                      {siteConfig.address.city}, {siteConfig.address.region}, {siteConfig.address.country}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      We work on digital challenges across marketing, websites, automation, and digital products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
