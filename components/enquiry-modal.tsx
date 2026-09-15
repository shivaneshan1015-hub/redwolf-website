"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, CheckCircle2, ArrowLeft, Send } from "lucide-react";
import siteData from "@/data/site-data.json";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProblemId?: string;
}

export function EnquiryModal({ isOpen, onClose, initialProblemId }: EnquiryModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [formData, setFormData] = useState({
    problemCategory: initialProblemId || "website",
    businessName: "",
    businessIndustry: "",
    successGoals: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const problemOptions = [
    "GROW — Organic Search & AI Search Visibility (SEO/AEO/GEO)",
    "GROW — Intent-Driven Performance Ads (Google & Meta Ads)",
    "GROW — Local Search & Google Maps Visibility",
    "DEFINE — Brand Strategy & Visual Identity",
    "BUILD — High-Speed Web Application Engineering",
    "BUILD — Business Workflow Platform & Automation",
    "PRODUCTIZE — SaaS Architecture & Field App Engineering (EasyTrack)",
    "Redwolf Diagnostic Consultation"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else {
      setSubmitted(true);
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0d111d] border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-[11px] uppercase tracking-wider mb-2">
              <Sparkles className="h-3 w-3" />
              <span>Project Consultation Wizard</span>
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-white">
              {submitted ? "Enquiry Received" : "Tell us what's not working."}
            </h3>
            {!submitted && (
              <p className="text-xs text-slate-400 mt-1">
                Step {step} of 4 — Start with the problem. We will identify the right digital path.
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {!submitted && (
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          )}

          {/* Wizard Step 1: Problem Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold block">
                01. What are you trying to solve?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {problemOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData({ ...formData, problemCategory: opt })}
                    className={`p-3 rounded-xl text-left text-xs font-heading font-bold border transition-all cursor-pointer ${
                      formData.problemCategory === opt
                        ? "bg-red-600/20 border-red-500 text-white"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wizard Step 2: Business Info */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold block">
                02. Tell us a little about the business.
              </label>
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Company / Brand Name</span>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Industry / Sector</span>
                  <input
                    type="text"
                    value={formData.businessIndustry}
                    onChange={(e) => setFormData({ ...formData, businessIndustry: e.target.value })}
                    placeholder="e.g. Automotive, Logistics, SaaS, Healthcare"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wizard Step 3: Success Criteria */}
          {step === 3 && (
            <div className="space-y-4">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold block">
                03. What would success look like?
              </label>
              <textarea
                rows={4}
                value={formData.successGoals}
                onChange={(e) => setFormData({ ...formData, successGoals: e.target.value })}
                placeholder="Describe what isn't working currently or what specific business outcome you want to achieve..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
              />
            </div>
          )}

          {/* Wizard Step 4: Contact Details */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold block">
                04. How can we reach you?
              </label>
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Your Name *</span>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Work Email Address *</span>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Phone Number (Optional)</span>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+1 555-0192"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submitted State Confirmation */}
          {submitted && (
            <div className="py-8 text-center space-y-4">
              <div className="h-16 w-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-heading font-extrabold text-white">
                Thank you, {formData.contactName || "partner"}!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your consultation inquiry for <strong>{formData.problemCategory}</strong> has been received by the Redwolf team. We will review your context and get back to you shortly with a digital solution roadmap.
              </p>
              <button
                onClick={handleReset}
                className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {!submitted && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono uppercase cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <span>{step === 4 ? "Start the Conversation" : "Next Step"}</span>
                {step === 4 ? <Send className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
