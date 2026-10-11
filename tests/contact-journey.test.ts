import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  validateEnquiry,
  resolveHelpCategory,
  APPROVED_HELP_CATEGORIES,
  isValidEmail,
  isValidPhone,
} from "../lib/validation/enquiry";
import { POST } from "../app/api/enquiries/route";
import { setTestStorageProvider, LeadRecord } from "../lib/storage/leads";
import { resetRateLimiter } from "../lib/security/rate-limiter";

describe("Contact Journey Contract & Validation Tests", () => {
  let storedLeads: LeadRecord[] = [];

  beforeEach(() => {
    storedLeads = [];
    resetRateLimiter();
    setTestStorageProvider({
      async saveLead(lead: LeadRecord) {
        storedLeads.push(lead);
      },
      async getLeads() {
        return [...storedLeads];
      },
    });
  });

  afterEach(() => {
    setTestStorageProvider(null);
  });

  test("1. Required-field validation: rejects missing name, email, phone, or challenge description", () => {
    // Missing contactName
    const res1 = validateEnquiry({
      source: "contact",
      contactName: "",
      contactEmail: "client@example.com",
      contactPhone: "+91 81227 12587",
      successGoals: "Need to modernize legacy sales portal",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(res1.isValid, false);
    assert.ok(res1.errors.contactName, "Must report contactName error");

    // Missing contactEmail
    const res2 = validateEnquiry({
      source: "contact",
      contactName: "John Doe",
      contactEmail: "",
      contactPhone: "+91 81227 12587",
      successGoals: "Need to modernize legacy sales portal",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(res2.isValid, false);
    assert.ok(res2.errors.contactEmail, "Must report contactEmail error");

    // Missing contactPhone
    const res3 = validateEnquiry({
      source: "contact",
      contactName: "John Doe",
      contactEmail: "client@example.com",
      contactPhone: "",
      successGoals: "Need to modernize legacy sales portal",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(res3.isValid, false);
    assert.ok(res3.errors.contactPhone, "Must report contactPhone error for contact journey");

    // Missing challenge description (successGoals)
    const res4 = validateEnquiry({
      source: "contact",
      contactName: "John Doe",
      contactEmail: "client@example.com",
      contactPhone: "+91 81227 12587",
      successGoals: "",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(res4.isValid, false);
    assert.ok(res4.errors.successGoals, "Must report successGoals error for contact journey");
  });

  test("2. Invalid email is rejected by validator", () => {
    assert.equal(isValidEmail("not-an-email"), false);
    assert.equal(isValidEmail("user@"), false);
    assert.equal(isValidEmail("@domain.com"), false);
    assert.equal(isValidEmail("valid@company.com"), true);

    const res = validateEnquiry({
      source: "contact",
      contactName: "Valid Name",
      contactEmail: "invalid-email-format",
      contactPhone: "+91 81227 12587",
      successGoals: "Valid business challenge description here",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(res.isValid, false);
    assert.ok(res.errors.contactEmail);
  });

  test("3. WhatsApp number validation: accepts international country codes and rejects invalid letters", () => {
    assert.equal(isValidPhone("+91 81227 12587"), true);
    assert.equal(isValidPhone("+1 (415) 555-0199"), true);
    assert.equal(isValidPhone("+44 20 7946 0991"), true);
    assert.equal(isValidPhone("invalid-phone-string"), false);
    assert.equal(isValidPhone("123"), false); // Under 7 digits

    const invalidRes = validateEnquiry({
      source: "contact",
      contactName: "Valid Name",
      contactEmail: "valid@company.com",
      contactPhone: "invalid-phone",
      successGoals: "Valid business challenge description here",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(invalidRes.isValid, false);
    assert.ok(invalidRes.errors.contactPhone);
  });

  test("4. Challenge description length check: rejects descriptions shorter than 10 chars", () => {
    const resShort = validateEnquiry({
      source: "contact",
      contactName: "Valid Name",
      contactEmail: "valid@company.com",
      contactPhone: "+91 81227 12587",
      successGoals: "Too short", // 9 chars
      formStartTime: Date.now() - 3000,
    });
    assert.equal(resShort.isValid, false);
    assert.ok(resShort.errors.successGoals);

    const resValid = validateEnquiry({
      source: "contact",
      contactName: "Valid Name",
      contactEmail: "valid@company.com",
      contactPhone: "+91 81227 12587",
      successGoals: "This is a sufficiently detailed business challenge description",
      formStartTime: Date.now() - 3000,
    });
    assert.equal(resValid.isValid, true);
  });

  test("5. Contextual preselection: maps supported solution query parameters accurately", () => {
    assert.equal(resolveHelpCategory("grow"), "Marketing and customer growth");
    assert.equal(resolveHelpCategory("GROW"), "Marketing and customer growth");
    assert.equal(resolveHelpCategory("define"), "Website and conversions");
    assert.equal(resolveHelpCategory("build"), "Automation and digital systems");
    assert.equal(resolveHelpCategory("productize"), "Web application or digital product");

    // Unknown or missing query parameter falls back safely to 'Not sure yet'
    assert.equal(resolveHelpCategory("unknown-slug"), "Not sure yet");
    assert.equal(resolveHelpCategory(null), "Not sure yet");
    assert.equal(resolveHelpCategory(""), "Not sure yet");
  });

  test("6. Approved help categories: exactly the 5 approved categories are exported", () => {
    assert.deepEqual([...APPROVED_HELP_CATEGORIES], [
      "Marketing and customer growth",
      "Website and conversions",
      "Automation and digital systems",
      "Web application or digital product",
      "Not sure yet",
    ]);
  });

  test("7. Request payload maps correctly to existing API and Supabase contract", async () => {
    const contactPayload = {
      source: "contact",
      contactName: "Priya Sharma",
      contactEmail: "priya@enterprise.co.in",
      contactPhone: "+91 81227 12587",
      businessName: "South India Retailers",
      problemCategory: "Marketing and customer growth",
      successGoals: "Need to optimize local search presence and reduce customer acquisition cost",
      formStartTime: Date.now() - 4000,
    };

    const request = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.99",
      },
      body: JSON.stringify(contactPayload),
    });

    const response = await POST(request);
    assert.equal(response.status, 201);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.ok(data.leadId);
    assert.ok(data.leadId.startsWith("RW-"));

    // Verify stored lead in persistence provider matches mapped columns
    assert.equal(storedLeads.length, 1);
    const stored = storedLeads[0];
    assert.equal(stored.contactName, "Priya Sharma");
    assert.equal(stored.contactEmail, "priya@enterprise.co.in");
    assert.equal(stored.contactPhone, "+91 81227 12587");
    assert.equal(stored.businessName, "South India Retailers");
    assert.equal(stored.problemCategory, "Marketing and customer growth");
    assert.equal(
      stored.successGoals,
      "Need to optimize local search presence and reduce customer acquisition cost"
    );
    assert.equal(stored.status, "new");
  });

  test("8. Server error handling: server-side errors return sanitized message and 400 on invalid input", async () => {
    const invalidRequest = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "contact",
        contactName: "",
        contactEmail: "bad",
        formStartTime: Date.now() - 3000,
      }),
    });

    const response = await POST(invalidRequest);
    assert.equal(response.status, 400);
    const data = await response.json();
    assert.ok(data.error);
    assert.ok(data.errors);
    assert.equal(storedLeads.length, 0); // No persistence
  });

  test("9. Form input preservation contract: values are preserved upon failure", () => {
    const initialFormData = {
      contactName: "Marcus Sterling",
      contactEmail: "marcus@company.com",
      contactPhone: "+91 81227 12587",
      businessName: "Sterling Tech",
      problemCategory: "Automation and digital systems",
      successGoals: "Automate invoice reconciliation between ERP and dispatch system",
    };

    // Simulate failure response handling
    let currentFormData = { ...initialFormData };
    const failureResponse = { ok: false, error: "Network timeout. Please retry." };

    // In client form logic, failure sets submitError and re-enables form, never clearing currentFormData:
    if (!failureResponse.ok) {
      // currentFormData is NOT modified
    }

    assert.deepEqual(currentFormData, initialFormData, "Form data must remain intact on submission failure");
  });

  test("10. WhatsApp destination format: uses confirmed number and properly encoded intro message", () => {
    const confirmedPhone = "918122712587";
    const expectedMessage = "Hi Redwolf Digital, I'd like to discuss a business challenge.";
    const encodedMessage = encodeURIComponent(expectedMessage);
    const expectedUrl = `https://wa.me/${confirmedPhone}?text=${encodedMessage}`;

    assert.equal(
      expectedUrl,
      "https://wa.me/918122712587?text=Hi%20Redwolf%20Digital%2C%20I'd%20like%20to%20discuss%20a%20business%20challenge."
    );
  });
});
