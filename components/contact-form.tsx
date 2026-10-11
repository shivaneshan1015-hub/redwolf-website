"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import {
  isValidEmail,
  isValidPhone,
  APPROVED_HELP_CATEGORIES,
  resolveHelpCategory,
  HelpCategory,
} from "@/lib/validation/enquiry";

export function ContactForm() {
  const searchParams = useSearchParams();
  const solutionParam = searchParams.get("solution");

  const [formData, setFormData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    businessName: "",
    problemCategory: "Not sure yet" as HelpCategory,
    successGoals: "",
  });

  // Security: Honeypot & interaction start time
  const [hpWebsite, setHpWebsite] = useState("");
  const formStartTimeRef = useRef<number>(Date.now());

  // UI status states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedLeadId, setConfirmedLeadId] = useState<string | null>(null);

  // Apply contextual preselection from ?solution= query param
  useEffect(() => {
    formStartTimeRef.current = Date.now();
    if (solutionParam) {
      const resolved = resolveHelpCategory(solutionParam);
      setFormData((prev) => ({
        ...prev,
        problemCategory: resolved,
      }));
    }
  }, [solutionParam]);

  const validateClientForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.contactName.trim() || formData.contactName.trim().length < 2) {
      errors.contactName = "Please enter your full name (minimum 2 characters).";
    }

    if (!formData.contactEmail.trim()) {
      errors.contactEmail = "Business email address is required.";
    } else if (!isValidEmail(formData.contactEmail.trim())) {
      errors.contactEmail = "Please enter a valid email address (e.g. name@company.com).";
    }

    if (!formData.contactPhone.trim()) {
      errors.contactPhone = "WhatsApp number is required.";
    } else if (!isValidPhone(formData.contactPhone.trim())) {
      errors.contactPhone = "Please enter a valid phone number with country code (e.g. +91 81227 12587).";
    }

    if (!formData.successGoals.trim()) {
      errors.successGoals = "Please describe the business challenge you are facing.";
    } else if (formData.successGoals.trim().length < 10) {
      errors.successGoals = "Please provide a brief description (minimum 10 characters).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setSubmitError(null);

    // Client-side validation before network request
    if (!validateClientForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "contact",
          contactName: formData.contactName.trim(),
          contactEmail: formData.contactEmail.trim().toLowerCase(),
          contactPhone: formData.contactPhone.trim(),
          businessName: formData.businessName.trim(),
          problemCategory: formData.problemCategory,
          successGoals: formData.successGoals.trim(),
          hpWebsite,
          formStartTime: formStartTimeRef.current,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        // User-entered values are strictly preserved in formData state
        const errorMessage =
          data.error || "Unable to submit enquiry at this moment. Please check your details and try again.";
        setSubmitError(errorMessage);
        if (data.errors && typeof data.errors === "object") {
          setFieldErrors(data.errors);
        }
        setIsSubmitting(false);
        return;
      }

      // Successful persistence confirmed by server
      setConfirmedLeadId(data.leadId || null);
      setIsSubmitted(true);
    } catch {
      // Network failure: preserve all user-entered values
      setSubmitError(
        "Network connection error. Your details have been preserved; please try submitting again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setConfirmedLeadId(null);
    setSubmitError(null);
    setFieldErrors({});
    formStartTimeRef.current = Date.now();
    setFormData({
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      businessName: "",
      problemCategory: "Not sure yet",
      successGoals: "",
    });
  };

  if (isSubmitted) {
    return (
      <div
        id="contact-confirmation"
        className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center space-y-6"
      >
        <div className="h-16 w-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/30">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            Enquiry Received
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Thank you, <span className="text-white font-semibold">{formData.contactName}</span>. Your enquiry has been received and securely logged. We will review your challenge and follow up with the most useful next step.
          </p>
        </div>

        {confirmedLeadId && (
          <div className="inline-block px-4 py-2 rounded-xl bg-[#070B14] border border-slate-800 text-xs font-mono text-slate-400">
            Reference ID: <span className="text-white font-bold ml-1">{confirmedLeadId}</span>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="contact-enquiry-form"
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6"
    >
      {/* Hidden honeypot field for bot deterrence */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="hpWebsite">Leave this field blank</label>
        <input
          type="text"
          id="hpWebsite"
          name="hpWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={hpWebsite}
          onChange={(e) => setHpWebsite(e.target.value)}
        />
      </div>

      {/* Global Submission Error Banner */}
      {submitError && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-400"
        >
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
          <div className="space-y-1">
            <span className="font-bold block text-white">Submission Issue</span>
            <p className="leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contactName"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2"
          >
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            disabled={isSubmitting}
            autoComplete="name"
            maxLength={100}
            value={formData.contactName}
            onChange={(e) => {
              setFormData({ ...formData, contactName: e.target.value });
              if (fieldErrors.contactName) setFieldErrors({ ...fieldErrors, contactName: "" });
            }}
            placeholder="John Doe"
            aria-invalid={Boolean(fieldErrors.contactName)}
            aria-describedby={fieldErrors.contactName ? "contactName-error" : undefined}
            className={`w-full bg-[#070B14] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80 ${
              fieldErrors.contactName ? "border-red-500/80" : "border-slate-800 focus:border-red-500"
            }`}
          />
          {fieldErrors.contactName && (
            <p id="contactName-error" className="text-xs text-red-400 mt-1.5 font-medium">
              {fieldErrors.contactName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contactEmail"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2"
          >
            Business email <span className="text-red-500">*</span>
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            required
            disabled={isSubmitting}
            autoComplete="email"
            maxLength={255}
            value={formData.contactEmail}
            onChange={(e) => {
              setFormData({ ...formData, contactEmail: e.target.value });
              if (fieldErrors.contactEmail) setFieldErrors({ ...fieldErrors, contactEmail: "" });
            }}
            placeholder="name@company.com"
            aria-invalid={Boolean(fieldErrors.contactEmail)}
            aria-describedby={fieldErrors.contactEmail ? "contactEmail-error" : undefined}
            className={`w-full bg-[#070B14] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80 ${
              fieldErrors.contactEmail ? "border-red-500/80" : "border-slate-800 focus:border-red-500"
            }`}
          />
          {fieldErrors.contactEmail && (
            <p id="contactEmail-error" className="text-xs text-red-400 mt-1.5 font-medium">
              {fieldErrors.contactEmail}
            </p>
          )}
        </div>
      </div>

      {/* Grid: WhatsApp Phone & Company Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contactPhone"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2"
          >
            WhatsApp number <span className="text-red-500">*</span>
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            required
            disabled={isSubmitting}
            autoComplete="tel"
            maxLength={30}
            value={formData.contactPhone}
            onChange={(e) => {
              setFormData({ ...formData, contactPhone: e.target.value });
              if (fieldErrors.contactPhone) setFieldErrors({ ...fieldErrors, contactPhone: "" });
            }}
            placeholder="+91 81227 12587"
            aria-invalid={Boolean(fieldErrors.contactPhone)}
            aria-describedby={
              fieldErrors.contactPhone ? "contactPhone-error" : "contactPhone-hint"
            }
            className={`w-full bg-[#070B14] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80 ${
              fieldErrors.contactPhone ? "border-red-500/80" : "border-slate-800 focus:border-red-500"
            }`}
          />
          <p id="contactPhone-hint" className="text-[11px] text-slate-500 mt-1">
            Include international country code (e.g. +91 81227 12587 or +1 415 555 0199)
          </p>
          {fieldErrors.contactPhone && (
            <p id="contactPhone-error" className="text-xs text-red-400 mt-1 font-medium">
              {fieldErrors.contactPhone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="businessName"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2"
          >
            Business or company name <span className="text-slate-500 font-normal normal-case">(optional)</span>
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            disabled={isSubmitting}
            autoComplete="organization"
            maxLength={100}
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            placeholder="Acme Corp or Studio Name"
            className="w-full bg-[#070B14] border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80"
          />
        </div>
      </div>

      {/* Field: What do you need help with? */}
      <div>
        <label
          htmlFor="problemCategory"
          className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2"
        >
          What do you need help with? <span className="text-slate-500 font-normal normal-case">(optional)</span>
        </label>
        <div className="relative">
          <select
            id="problemCategory"
            name="problemCategory"
            disabled={isSubmitting}
            value={formData.problemCategory}
            onChange={(e) =>
              setFormData({
                ...formData,
                problemCategory: e.target.value as HelpCategory,
              })
            }
            className="w-full bg-[#070B14] border border-slate-800 focus:border-red-500 rounded-xl px-4 py-3 text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80 appearance-none cursor-pointer"
          >
            {APPROVED_HELP_CATEGORIES.map((category) => (
              <option key={category} value={category} className="bg-[#070B14] text-white">
                {category}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Field: Business Challenge */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="successGoals"
            className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300"
          >
            Briefly describe your business challenge <span className="text-red-500">*</span>
          </label>
          <span className="text-[11px] font-mono text-slate-500">
            {formData.successGoals.length} / 1000
          </span>
        </div>
        <textarea
          id="successGoals"
          name="successGoals"
          rows={4}
          required
          disabled={isSubmitting}
          maxLength={1000}
          value={formData.successGoals}
          onChange={(e) => {
            setFormData({ ...formData, successGoals: e.target.value });
            if (fieldErrors.successGoals) setFieldErrors({ ...fieldErrors, successGoals: "" });
          }}
          placeholder="What isn't working currently, or what specific digital or operational outcome are you looking to achieve?"
          aria-invalid={Boolean(fieldErrors.successGoals)}
          aria-describedby={fieldErrors.successGoals ? "successGoals-error" : undefined}
          className={`w-full bg-[#070B14] border rounded-xl p-4 text-sm text-white placeholder-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/80 resize-none ${
            fieldErrors.successGoals ? "border-red-500/80" : "border-slate-800 focus:border-red-500"
          }`}
        />
        {fieldErrors.successGoals && (
          <p id="successGoals-error" className="text-xs text-red-400 mt-1.5 font-medium">
            {fieldErrors.successGoals}
          </p>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80">
        <ShieldCheck className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
        <p>
          <strong>Privacy message:</strong> Your information will be used to respond to your enquiry and discuss your business needs.
        </p>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E53935] hover:bg-[#D32F2F] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-red-500/80 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <span>Send Enquiry</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
