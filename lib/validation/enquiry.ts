/**
 * Redwolf Digital Enquiry Validation & Sanitization Layer
 * Validates, cleans, and protects enquiry submissions from spam and injection.
 */

export interface EnquiryInput {
  problemCategory?: string;
  businessName?: string;
  businessIndustry?: string;
  successGoals?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  hpWebsite?: string; // Honeypot field
  formStartTime?: number; // Timestamp when user opened the form
  source?: string;
}

export const APPROVED_HELP_CATEGORIES = [
  "Marketing and customer growth",
  "Website and conversions",
  "Automation and digital systems",
  "Web application or digital product",
  "Not sure yet",
] as const;

export type HelpCategory = (typeof APPROVED_HELP_CATEGORIES)[number];

export const SOLUTION_PRESELECTION_MAP: Record<string, HelpCategory> = {
  grow: "Marketing and customer growth",
  define: "Website and conversions",
  build: "Automation and digital systems",
  productize: "Web application or digital product",
};

export function resolveHelpCategory(solutionParam?: string | null): HelpCategory {
  if (!solutionParam) return "Not sure yet";
  const normalized = solutionParam.trim().toLowerCase();
  return SOLUTION_PRESELECTION_MAP[normalized] || "Not sure yet";
}

export interface ValidatedEnquiryData {
  problemCategory: string;
  businessName: string;
  businessIndustry: string;
  successGoals: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitized?: ValidatedEnquiryData;
  isSpam?: boolean;
  spamReason?: string;
}

// Basic regex for email validation (RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// E.164 and international phone number format check (allowing digits, spaces, parentheses, hyphens)
const PHONE_REGEX = /^[+]?[\d\s().-]{7,25}$/;

/**
 * Strips HTML tags and potential script injections, trims leading/trailing spaces.
 */
export function sanitizeString(input: string | undefined | null, maxLength = 500): string {
  if (!input || typeof input !== "string") return "";
  
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const clean = email.trim();
  if (clean.length > 254) return false;
  return EMAIL_REGEX.test(clean);
}

/**
 * Validates phone number if provided.
 */
export function isValidPhone(phone: string | undefined | null): boolean {
  if (phone === undefined || phone === null) return true;
  if (typeof phone !== "string") return false;
  const clean = phone.trim();
  if (clean.length === 0) return true; // Optional field
  return PHONE_REGEX.test(clean);
}

export interface EnquiryValidationOptions {
  requireContactJourney?: boolean;
}

/**
 * Main validation and sanitization for enquiry submissions.
 */
export function validateEnquiry(input: unknown, options?: EnquiryValidationOptions): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== "object") {
    return {
      isValid: false,
      errors: { form: "Invalid request payload." }
    };
  }

  const data = input as Record<string, unknown>;
  const isContactJourney = data.source === "contact" || options?.requireContactJourney === true;

  // 1. Honeypot check (bot detection)
  if (data.hpWebsite && typeof data.hpWebsite === "string" && data.hpWebsite.trim().length > 0) {
    return {
      isValid: false,
      isSpam: true,
      spamReason: "Honeypot field triggered.",
      errors: { hpWebsite: "Spam detected." }
    };
  }

  // 2. Submission speed check (bot detection)
  if (data.formStartTime && typeof data.formStartTime === "number") {
    const elapsedMs = Date.now() - data.formStartTime;
    // If completed in under 1.5 seconds, likely automated script
    if (elapsedMs > 0 && elapsedMs < 1500) {
      return {
        isValid: false,
        isSpam: true,
        spamReason: "Submission completed too fast for a human interaction.",
        errors: { form: "Submission received too quickly. Please try again." }
      };
    }
  }

  // 3. Contact Name validation
  const rawName = typeof data.contactName === "string" ? data.contactName : "";
  const contactName = sanitizeString(rawName, 100);
  if (!contactName || contactName.length < 2) {
    errors.contactName = "Please enter your name (minimum 2 characters).";
  }

  // 4. Contact Email validation
  const rawEmail = typeof data.contactEmail === "string" ? data.contactEmail : "";
  const contactEmail = sanitizeString(rawEmail, 255).toLowerCase();
  if (!contactEmail) {
    errors.contactEmail = "Work email address is required.";
  } else if (!isValidEmail(contactEmail)) {
    errors.contactEmail = "Please enter a valid email address.";
  }

  // 5. Contact Phone validation
  const rawPhone = typeof data.contactPhone === "string" ? data.contactPhone : "";
  const contactPhone = sanitizeString(rawPhone, 30);
  if (isContactJourney) {
    if (!contactPhone) {
      errors.contactPhone = "WhatsApp number is required.";
    } else if (!isValidPhone(contactPhone)) {
      errors.contactPhone = "Please enter a valid phone number with country code (e.g. +91 81227 12587).";
    }
  } else {
    if (contactPhone && !isValidPhone(contactPhone)) {
      errors.contactPhone = "Please enter a valid phone number or leave blank.";
    }
  }

  // 6. Problem Category & Context
  let problemCategory = sanitizeString(
    typeof data.problemCategory === "string"
      ? data.problemCategory
      : (isContactJourney ? "Not sure yet" : "General Inquiry"),
    150
  );
  if (isContactJourney && !problemCategory) {
    problemCategory = "Not sure yet";
  }

  const businessName = sanitizeString(typeof data.businessName === "string" ? data.businessName : "", 100);
  const businessIndustry = sanitizeString(typeof data.businessIndustry === "string" ? data.businessIndustry : "", 100);
  const successGoals = sanitizeString(typeof data.successGoals === "string" ? data.successGoals : "", 1000);

  if (isContactJourney) {
    if (!successGoals || successGoals.length < 10) {
      errors.successGoals = "Please briefly describe your business challenge (minimum 10 characters).";
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      isValid: false,
      errors
    };
  }

  return {
    isValid: true,
    errors: {},
    sanitized: {
      problemCategory,
      businessName,
      businessIndustry,
      successGoals,
      contactName,
      contactEmail,
      contactPhone
    }
  };
}
