import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  persistLead,
  retrieveLeadsForAdmin,
  setTestStorageProvider,
  LeadRecord,
  StorageConfigurationError,
} from "../lib/storage/leads";

describe("Storage Persistence Layer", () => {
  let inMemoryStore: LeadRecord[] = [];

  beforeEach(() => {
    inMemoryStore = [];
    setTestStorageProvider({
      async saveLead(lead: LeadRecord) {
        inMemoryStore.unshift(lead);
      },
      async getLeads() {
        return [...inMemoryStore];
      },
    });
  });

  afterEach(() => {
    setTestStorageProvider(null);
  });

  test("persists valid lead record successfully", async () => {
    const lead: LeadRecord = {
      id: "RW-TEST-001",
      createdAt: new Date().toISOString(),
      problemCategory: "GROW — Organic Search",
      businessName: "Test Corp",
      businessIndustry: "Technology",
      successGoals: "Scale pipeline",
      contactName: "John Doe",
      contactEmail: "john@testcorp.com",
      contactPhone: "+1 555-0100",
      status: "new",
    };

    await persistLead(lead);

    const savedLeads = await retrieveLeadsForAdmin();
    assert.equal(savedLeads.length, 1);
    assert.equal(savedLeads[0].id, "RW-TEST-001");
    assert.equal(savedLeads[0].contactName, "John Doe");
    assert.equal(savedLeads[0].contactEmail, "john@testcorp.com");
  });

  test("detects missing production storage credentials and disallows local disk write", async () => {
    // Unset test provider to test environment checking
    setTestStorageProvider(null);

    const originalNodeEnv = process.env.NODE_ENV;
    const originalVercel = process.env.VERCEL;
    const originalSupabaseUrl = process.env.SUPABASE_URL;

    try {
      (process.env as Record<string, string | undefined>).NODE_ENV = "production";
      process.env.VERCEL = "1";
      delete process.env.SUPABASE_URL;
      delete process.env.SUPABASE_SERVICE_ROLE_KEY;
      delete process.env.LEAD_WEBHOOK_URL;

      const lead: LeadRecord = {
        id: "RW-TEST-PROD-FAIL",
        createdAt: new Date().toISOString(),
        problemCategory: "GROW",
        businessName: "Prod Test",
        businessIndustry: "Tech",
        successGoals: "Goals",
        contactName: "Prod User",
        contactEmail: "prod@user.com",
        contactPhone: "",
        status: "new",
      };

      await assert.rejects(
        async () => {
          await persistLead(lead);
        },
        StorageConfigurationError,
        "Should throw StorageConfigurationError in production when database is unconfigured"
      );
    } finally {
      (process.env as Record<string, string | undefined>).NODE_ENV = originalNodeEnv;
      process.env.VERCEL = originalVercel;
      if (originalSupabaseUrl) process.env.SUPABASE_URL = originalSupabaseUrl;
    }
  });
});
