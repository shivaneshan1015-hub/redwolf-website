import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { POST, GET } from "../app/api/enquiries/route";
import { setTestStorageProvider, LeadRecord } from "../lib/storage/leads";
import { resetRateLimiter } from "../lib/security/rate-limiter";

describe("Enquiry API Security & Access Control (/api/enquiries)", () => {
  let storedLeads: LeadRecord[] = [];
  const TEST_ADMIN_KEY = "test-secret-admin-key-rw992";

  beforeEach(() => {
    storedLeads = [];
    resetRateLimiter();
    process.env.ADMIN_API_KEY = TEST_ADMIN_KEY;

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
    delete process.env.ADMIN_API_KEY;
  });

  test("1. Valid enquiries are persisted with 201 Created", async () => {
    const payload = {
      problemCategory: "BUILD — High-Speed Web Application Engineering",
      businessName: "Redwolf Tech Client",
      businessIndustry: "Logistics",
      successGoals: "Modernize legacy ordering portal",
      contactName: "Alex Rivera",
      contactEmail: "alex@riveralogistics.com",
      contactPhone: "+1 555-0144",
      formStartTime: Date.now() - 3000,
    };

    const request = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.1",
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    assert.equal(response.status, 201);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.ok(data.leadId);
    assert.ok(data.message);

    // Verify lead was stored
    assert.equal(storedLeads.length, 1);
    assert.equal(storedLeads[0].contactName, "Alex Rivera");
    assert.equal(storedLeads[0].contactEmail, "alex@riveralogistics.com");
  });

  test("2. Invalid requests are rejected with 400 Bad Request", async () => {
    const badPayload = {
      contactName: "", // Missing name
      contactEmail: "not-an-email", // Malformed email
      formStartTime: Date.now() - 4000,
    };

    const request = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.2",
      },
      body: JSON.stringify(badPayload),
    });

    const response = await POST(request);
    assert.equal(response.status, 400);

    const data = await response.json();
    assert.ok(data.error);
    assert.equal(storedLeads.length, 0); // Not saved
  });

  test("3. Storage failures return a safe error without leaking internal details", async () => {
    // Inject failing storage provider
    setTestStorageProvider({
      async saveLead() {
        throw new Error("SECRET_DB_PASSWORD_LEAK: Connection terminated at 10.0.0.99");
      },
      async getLeads() {
        return [];
      },
    });

    const payload = {
      contactName: "Safe User",
      contactEmail: "safe@user.com",
      formStartTime: Date.now() - 3000,
    };

    const request = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.3",
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    assert.equal(response.status, 500);

    const data = await response.json();
    assert.ok(data.error);
    // Ensure internal secrets/passwords are NEVER exposed to client
    assert.equal(data.error.includes("SECRET_DB_PASSWORD"), false);
    assert.equal(data.error.includes("10.0.0.99"), false);
  });

  test("4. Unauthenticated users cannot retrieve existing lead records", async () => {
    // Populate an existing lead in the store
    storedLeads.push({
      id: "RW-SECRET-LEAD",
      createdAt: new Date().toISOString(),
      problemCategory: "GROW",
      businessName: "Secret Enterprise",
      businessIndustry: "Finance",
      successGoals: "Confidential",
      contactName: "CEO Jane Doe",
      contactEmail: "jane@private-enterprise.com",
      contactPhone: "+1 555-9999",
      status: "new",
    });

    // Attempt 1: GET without authorization header
    const unauthRequest = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
    });
    const unauthResponse = await GET(unauthRequest);
    assert.equal(unauthResponse.status, 401);
    const unauthData = await unauthResponse.json();
    assert.equal(unauthData.leads, undefined); // No leads leaked

    // Attempt 2: GET with invalid bearer token
    const badTokenRequest = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: {
        Authorization: "Bearer wrong-token-value",
      },
    });
    const badTokenResponse = await GET(badTokenRequest);
    assert.equal(badTokenResponse.status, 401);
    const badTokenData = await badTokenResponse.json();
    assert.equal(badTokenData.leads, undefined);

    // Attempt 3: When ADMIN_API_KEY is not set in environment, endpoint returns 404
    delete process.env.ADMIN_API_KEY;
    const noConfigResponse = await GET(unauthRequest);
    assert.equal(noConfigResponse.status, 404);
  });

  test("5. Sensitive lead data is not returned in public API responses", async () => {
    const payload = {
      contactName: "Private Client",
      contactEmail: "private@company.com",
      contactPhone: "+91 99999 88888",
      formStartTime: Date.now() - 3000,
    };

    const request = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.5",
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    const data = await response.json();

    // Response should be clean receipt only
    assert.equal(data.leads, undefined);
    assert.equal(data.contactEmail, undefined);
    assert.equal(data.contactPhone, undefined);
    assert.equal(data.success, true);
    assert.ok(data.leadId);
  });

  test("6. Rate limiting and spam controls behave as intended", async () => {
    // A: Honeypot rejection
    const botRequest = new Request("http://localhost:3000/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.6",
      },
      body: JSON.stringify({
        contactName: "Bot Name",
        contactEmail: "bot@domain.com",
        hpWebsite: "https://spam.com", // Trigger honeypot
        formStartTime: Date.now() - 4000,
      }),
    });

    const botResponse = await POST(botRequest);
    assert.equal(botResponse.status, 400);

    // B: Rate limit enforcement
    const rateLimitIp = "198.51.100.77";
    const validData = {
      contactName: "Repeated Submitter",
      contactEmail: "repeat@domain.com",
      formStartTime: Date.now() - 5000,
    };

    // Submit 5 times (allowed)
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        new Request("http://localhost:3000/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": rateLimitIp,
          },
          body: JSON.stringify(validData),
        })
      );
      assert.equal(res.status, 201);
    }

    // 6th submission must be rejected with 429
    const blockedRes = await POST(
      new Request("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": rateLimitIp,
        },
        body: JSON.stringify(validData),
      })
    );
    assert.equal(blockedRes.status, 429);
    const blockedData = await blockedRes.json();
    assert.ok(blockedData.error.includes("Too many requests"));
  });

  test("7. Authorized administrator can retrieve leads securely", async () => {
    storedLeads.push({
      id: "RW-AUTH-001",
      createdAt: new Date().toISOString(),
      problemCategory: "BUILD",
      businessName: "Authorized Test Client",
      businessIndustry: "SaaS",
      successGoals: "MVP",
      contactName: "Authorized User",
      contactEmail: "auth@user.com",
      contactPhone: "+1 555-0123",
      status: "new",
    });

    const authRequest = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TEST_ADMIN_KEY}`,
      },
    });

    const response = await GET(authRequest);
    assert.equal(response.status, 200);

    const data = await response.json();
    assert.equal(data.success, true);
    assert.equal(data.count, 1);
    assert.equal(data.leads.length, 1);
    assert.equal(data.leads[0].id, "RW-AUTH-001");
  });

  test("8. Rate limiting bucket binds to trusted x-real-ip even when client forges x-forwarded-for", async () => {
    const trustedIp = "203.0.113.88";
    const payload = {
      contactName: "Rate Limit Tester",
      contactEmail: "tester@domain.com",
      formStartTime: Date.now() - 5000,
    };

    // Attacker rotates X-Forwarded-For across requests while platform x-real-ip remains constant
    for (let i = 1; i <= 5; i++) {
      const res = await POST(
        new Request("http://localhost:3000/api/enquiries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-real-ip": trustedIp,
            "x-forwarded-for": `198.51.100.${i}, 10.0.0.1`, // Forged rotating client IP
          },
          body: JSON.stringify(payload),
        })
      );
      assert.equal(res.status, 201);
    }

    // 6th request with different forged X-Forwarded-For but same x-real-ip must be blocked (429)
    const blockedRes = await POST(
      new Request("http://localhost:3000/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": trustedIp,
          "x-forwarded-for": "198.51.100.999, 10.0.0.1",
        },
        body: JSON.stringify(payload),
      })
    );
    assert.equal(blockedRes.status, 429, "Forging X-Forwarded-For must not evade rate limiting when x-real-ip is present");
  });

  test("9. Timing-safe admin comparison rejects tokens of differing lengths and contents", async () => {
    // Differing length (shorter)
    const shortReq = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: { Authorization: "Bearer short" },
    });
    assert.equal((await GET(shortReq)).status, 401);

    // Differing length (longer)
    const longReq = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: { Authorization: `Bearer ${TEST_ADMIN_KEY}-extra-bytes` },
    });
    assert.equal((await GET(longReq)).status, 401);

    // Same length, single character altered
    const sameLengthBadToken = TEST_ADMIN_KEY.substring(0, TEST_ADMIN_KEY.length - 1) + "X";
    const sameLenReq = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: { Authorization: `Bearer ${sameLengthBadToken}` },
    });
    assert.equal((await GET(sameLenReq)).status, 401);

    // Empty Bearer token
    const emptyBearerReq = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: { Authorization: "Bearer " },
    });
    assert.equal((await GET(emptyBearerReq)).status, 401);

    // Correct token succeeds
    const validReq = new Request("http://localhost:3000/api/enquiries", {
      method: "GET",
      headers: { Authorization: `Bearer ${TEST_ADMIN_KEY}` },
    });
    assert.equal((await GET(validReq)).status, 200);
  });
});
