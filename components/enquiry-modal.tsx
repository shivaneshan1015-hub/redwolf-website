"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, CheckCircle2, ArrowLeft, Send, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { isValidEmail, isValidPhone } from "@/lib/validation/enquiry";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProblemId?: string;
}

export function EnquiryModal({ isOpen, onClose, initialProblemId }: EnquiryModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [formData, setFormData] = useState({
    problemCategory: initialProblemId || "GROW — Organic Search & AI Search Visibility (SEO/AEO/GEO)",
    businessName: "",
    businessIndustry: "",
    successGoals: "",
    contactName: "",
    contactEmail: "",
    contactPhone: ""
  });

  // Security: Honeypot & interaction start time
  const [hpWebsite, setHpWebsite] = useState("");
  const [formStartTime, setFormStartTime] = useState<number>(Date.now());

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmedLeadId, setConfirmedLeadId] = useState<string | null>(null);

  // Reset timing when opened
  useEffect(() => {
    if (isOpen) {
      setFormStartTime(Date.now());
      setSubmitError(null);
      setFieldErrors({});
    }
  }, [isOpen]);

  const problemOptions = [
    "GROW — Organic Search & AI Search Visibility (SEO/AEO/GEO)",
    "GROW — Intent-Driven Performance Ads (Google & Meta Ads)",
    "GROW — Local Search & Google Maps Visibility",
    "DEFINE — Brand Strategy & Visual Identity",
    "BUILD — High-Speed Web Application Engineering",
    "BUILD — Business Workflow Platform & Automation",
    "PRODUCTIZE — SaaS Architecture & Field App Engineering (EasyTrack)",
    "Redwolf Digital Diagnostic Consultation"
  ];

  // Client-side validation for Step 4
  const validateStep4 = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errors.contactName = "Please enter your name (at least 2 characters).";
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = "Work email address is required.";
    } else if (!isValidEmail(formData.contactEmail.trim())) {
      errors.contactEmail = "Please enter a valid email address.";
    }

    if (formData.contactPhone.trim() && !isValidPhone(formData.contactPhone.trim())) {
      errors.contactPhone = "Please enter a valid phone number (e.g. +91 98765 43210).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = async () => {
    setSubmitError(null);

    if (step < 4) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
      return;
    }

    // On Step 4: Validate inputs before sending
    if (!validateStep4()) {
      return;
    }

    // Genuine backend submission to /api/enquiries
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hpWebsite,
          formStartTime,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        // Preserve user entered values in formData, show error
        const message = data.error || "Unable to submit enquiry. Please check your connection and try again.";
        setSubmitError(message);
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setIsSubmitting(false);
        return;
      }

      // Submission confirmed by server!
      setConfirmedLeadId(data.leadId || null);
      setSubmitted(true);
      setStep(5);
    } catch {
      // Network or fetch failure: Preserve user-entered values
      setSubmitError("Network connection error. Your entered details have been saved; please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1 && !isSubmitting) {
      setSubmitError(null);
      setFieldErrors({});
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setSubmitError(null);
    setFieldErrors({});
    setConfirmedLeadId(null);
    setFormData({
      problemCategory: initialProblemId || "GROW — Organic Search & AI Search Visibility (SEO/AEO/GEO)",
      businessName: "",
      businessIndustry: "",
      successGoals: "",
      contactName: "",
      contactEmail: "",
      contactPhone: ""
    });
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
          {/* Honeypot field (hidden from real users) */}
          <div aria-hidden="true" style={{ display: "none" }}>
            <input
              type="text"
              name="hpWebsite"
              tabIndex={-1}
              autoComplete="off"
              value={hpWebsite}
              onChange={(e) => setHpWebsite(e.target.value)}
            />
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer disabled:opacity-50"
            aria-label="Close consultation modal"
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
              {submitted ? "Enquiry Confirmed" : "Tell us what's not working."}
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

          {/* Global Submission Error Alert */}
          {submitError && !submitted && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
              <div className="space-y-0.5">
                <span className="font-bold block text-white">Submission Issue</span>
                <span>{submitError}</span>
              </div>
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
                    maxLength={100}
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
                    maxLength={100}
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
                maxLength={1000}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-red-500 focus:outline-none resize-none"
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
                    disabled={isSubmitting}
                    value={formData.contactName}
                    onChange={(e) => {
                      setFormData({ ...formData, contactName: e.target.value });
                      if (fieldErrors.contactName) {
                        setFieldErrors({ ...fieldErrors, contactName: "" });
                      }
                    }}
                    placeholder="John Doe"
                    maxLength={100}
                    className={`w-full bg-slate-900 border rounded-xl p-3 text-xs text-white focus:outline-none transition-colors ${
                      fieldErrors.contactName ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-red-500"
                    }`}
                  />
                  {fieldErrors.contactName && (
                    <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.contactName}</span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Work Email Address *</span>
                  <input
                    type="email"
                    disabled={isSubmitting}
                    value={formData.contactEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, contactEmail: e.target.value });
                      if (fieldErrors.contactEmail) {
                        setFieldErrors({ ...fieldErrors, contactEmail: "" });
                      }
                    }}
                    placeholder="john@company.com"
                    maxLength={255}
                    className={`w-full bg-slate-900 border rounded-xl p-3 text-xs text-white focus:outline-none transition-colors ${
                      fieldErrors.contactEmail ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-red-500"
                    }`}
                  />
                  {fieldErrors.contactEmail && (
                    <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.contactEmail}</span>
                  )}
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Phone Number (Optional)</span>
                  <input
                    type="tel"
                    disabled={isSubmitting}
                    value={formData.contactPhone}
                    onChange={(e) => {
                      setFormData({ ...formData, contactPhone: e.target.value });
                      if (fieldErrors.contactPhone) {
                        setFieldErrors({ ...fieldErrors, contactPhone: "" });
                      }
                    }}
                    placeholder="+91 98765 43210"
                    maxLength={30}
                    className={`w-full bg-slate-900 border rounded-xl p-3 text-xs text-white focus:outline-none transition-colors ${
                      fieldErrors.contactPhone ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-red-500"
                    }`}
                  />
                  {fieldErrors.contactPhone && (
                    <span className="text-[11px] text-red-400 mt-1 block">{fieldErrors.contactPhone}</span>
                  )}
                </div>

                {/* Privacy & Consent Notice */}
                <div className="pt-2 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/60">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong>Privacy Assurance:</strong> We collect only the information necessary to evaluate your inquiry. Your details are encrypted in transit and will never be shared, sold, or used for unsolicited marketing.
                  </span>
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
                Your consultation inquiry for <strong>{formData.problemCategory}</strong> has been received and securely logged by the Redwolf Digital engineering team. We will review your context and reach out within 24 hours.
              </p>
              {confirmedLeadId && (
                <div className="inline-block px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
                  Reference ID: <span className="text-white font-bold">{confirmedLeadId}</span>
                </div>
              )}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {!submitted && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-mono uppercase cursor-pointer disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 4 ? "Start the Conversation" : "Next Step"}</span>
                    {step === 4 ? <Send className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
