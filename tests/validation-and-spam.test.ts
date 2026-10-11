import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  validateEnquiry,
  sanitizeString,
  isValidEmail,
  isValidPhone,
} from "../lib/validation/enquiry";

describe("Validation and Spam Prevention Layer", () => {
  test("accepts complete, valid enquiry data", () => {
    const validPayload = {
      problemCategory: "GROW — Organic Search & AI Search Visibility (SEO/AEO/GEO)",
      businessName: "Acme Logistics",
      businessIndustry: "Supply Chain",
      successGoals: "Reduce CPA and increase inbound enterprise leads.",
      contactName: "Sarah Connor",
      contactEmail: "sarah@acmelogistics.com",
      contactPhone: "+1 415-555-0199",
      formStartTime: Date.now() - 5000, // 5 seconds elapsed
    };

    const result = validateEnquiry(validPayload);
    assert.equal(result.isValid, true);
    assert.deepEqual(result.errors, {});
    assert.ok(result.sanitized);
    assert.equal(result.sanitized.contactName, "Sarah Connor");
    assert.equal(result.sanitized.contactEmail, "sarah@acmelogistics.com");
    assert.equal(result.sanitized.contactPhone, "+1 415-555-0199");
  });

  test("rejects payload missing contactName or too short", () => {
    const payload = {
      contactName: "A",
      contactEmail: "valid@example.com",
      formStartTime: Date.now() - 4000,
    };

    const result = validateEnquiry(payload);
    assert.equal(result.isValid, false);
    assert.ok(result.errors.contactName);
  });

  test("rejects invalid email formats", () => {
    const invalidEmails = [
      "",
      "plainaddress",
      "@missingusername.com",
      "username@.com",
      "user@domain..com",
      "user with space@domain.com",
    ];

    for (const email of invalidEmails) {
      assert.equal(isValidEmail(email), false, `Expected ${email} to be invalid`);

      const result = validateEnquiry({
        contactName: "Valid Name",
        contactEmail: email,
        formStartTime: Date.now() - 3000,
      });
      assert.equal(result.isValid, false, `Validation should fail for ${email}`);
      assert.ok(result.errors.contactEmail);
    }
  });

  test("validates phone numbers correctly", () => {
    assert.equal(isValidPhone(""), true); // Optional
    assert.equal(isValidPhone("+91 98765 43210"), true);
    assert.equal(isValidPhone("+1 (555) 234-5678"), true);
    assert.equal(isValidPhone("1234567"), true);
    assert.equal(isValidPhone("invalid-letters-phone"), false);
  });

  test("sanitizes HTML tags and script injections", () => {
    const maliciousInput = '<script>alert("XSS")</script><b>Hello</b> <iframe src="evil.com"></iframe>World';
    const cleaned = sanitizeString(maliciousInput);
    assert.equal(cleaned.includes("<script>"), false);
    assert.equal(cleaned.includes("</script>"), false);
    assert.equal(cleaned.includes("<b>"), false);
    assert.equal(cleaned.includes("<iframe"), false);
    assert.equal(cleaned, 'alert("XSS")Hello World');
  });

  test("detects and rejects honeypot bot trap", () => {
    const botPayload = {
      contactName: "Bot Spammer",
      contactEmail: "bot@spam.com",
      hpWebsite: "https://automated-spam-link.ru", // Bot filled hidden field
      formStartTime: Date.now() - 10000,
    };

    const result = validateEnquiry(botPayload);
    assert.equal(result.isValid, false);
    assert.equal(result.isSpam, true);
    assert.ok(result.spamReason?.includes("Honeypot"));
  });

  test("detects rapid automated bot submissions (< 1.5 seconds)", () => {
    const fastBotPayload = {
      contactName: "Automated Runner",
      contactEmail: "fast@bot.com",
      formStartTime: Date.now() - 300, // Submitted in 300ms
    };

    const result = validateEnquiry(fastBotPayload);
    assert.equal(result.isValid, false);
    assert.equal(result.isSpam, true);
    assert.ok(result.spamReason?.includes("too fast"));
  });
});
