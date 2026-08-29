"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/sections/hero";
import { RedwolfSystemSection } from "@/sections/redwolf-system";
import { ProblemFinderSection } from "@/sections/problem-finder";
import { SelectedWorkSection } from "@/sections/selected-work";
import { EasyTrackSection } from "@/sections/easy-track";
import { MethodologySection } from "@/sections/methodology";
import { WhyRedwolfSection } from "@/sections/why-redwolf";
import { GlobalRemoteSection } from "@/sections/global-remote";
import { EnquirySection } from "@/sections/enquiry-section";
import { Footer } from "@/components/footer";
import { EnquiryModal } from "@/components/enquiry-modal";

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
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenEnquiry={handleOpenEnquiry} />

      <main className="flex-1">
        <HeroSection onOpenEnquiry={handleOpenEnquiry} />
        <RedwolfSystemSection onOpenEnquiry={handleOpenEnquiry} />
        <ProblemFinderSection onOpenEnquiryWithProblem={handleOpenEnquiryWithProblem} />
        <SelectedWorkSection onOpenEnquiry={handleOpenEnquiry} />
        <EasyTrackSection onOpenEnquiry={handleOpenEnquiry} />
        <MethodologySection onOpenEnquiry={handleOpenEnquiry} />
        <WhyRedwolfSection />
        <GlobalRemoteSection onOpenEnquiry={handleOpenEnquiry} />
        <EnquirySection onOpenEnquiry={handleOpenEnquiry} />
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        initialProblemId={initialProblemId}
      />
    </div>
  );
}
