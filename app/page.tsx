"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/sections/hero";
import { DigitalMarketingSection } from "@/sections/digital-marketing";
import { PricingSection } from "@/sections/pricing";
import { ProjectEstimatorSection } from "@/sections/project-estimator";
import { ROICalculatorSection } from "@/sections/roi-calculator";
import { DeliverablesTimelineSection } from "@/sections/deliverables-timeline";
import { RedwolfSystemSection } from "@/sections/redwolf-system";
import { ProblemFinderSection } from "@/sections/problem-finder";
import { SelectedWorkSection } from "@/sections/selected-work";
import { EasyTrackSection } from "@/sections/easy-track";
import { FaqAeoSection } from "@/sections/faq-aeo-section";
import { MethodologySection } from "@/sections/methodology";
import { WhyRedwolfSection } from "@/sections/why-redwolf";
import { GlobalRemoteSection } from "@/sections/global-remote";
import { EnquirySection } from "@/sections/enquiry-section";
import { Footer } from "@/components/footer";
import { EnquiryModal } from "@/components/enquiry-modal";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

export default function Home() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [initialProblemId, setInitialProblemId] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = () => {
    setInitialProblemId(undefined);
    setIsEnquiryOpen(true);
  };

  const handleOpenEnquiryWithProblem = (probId: string) => {
    setInitialProblemId(probId);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-1">
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />
        <DigitalMarketingSection onOpenEnquiry={handleOpenEnquiry} />
        <PricingSection onOpenEnquiry={handleOpenEnquiry} />
        <ProjectEstimatorSection onOpenEnquiry={handleOpenEnquiry} />
        <ROICalculatorSection onOpenEnquiry={handleOpenEnquiry} />
        <DeliverablesTimelineSection onOpenEnquiry={handleOpenEnquiry} />
        <RedwolfSystemSection onOpenEnquiry={handleOpenEnquiry} />
        <ProblemFinderSection onOpenEnquiryWithProblem={handleOpenEnquiryWithProblem} />
        <SelectedWorkSection onOpenEnquiry={handleOpenEnquiry} />
        <EasyTrackSection onOpenEnquiry={handleOpenEnquiry} />
        <FaqAeoSection />
        <MethodologySection onOpenEnquiry={handleOpenEnquiry} />
        <WhyRedwolfSection />
        <GlobalRemoteSection onOpenEnquiry={handleOpenEnquiry} />
        <EnquirySection onOpenEnquiry={handleOpenEnquiry} />
      </main>

      <Footer />

      <WhatsAppWidget onOpenEnquiry={handleOpenEnquiry} />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProblemId={initialProblemId}
      />
    </div>
  );
}

