/**
 * Persistent Storage Layer for Redwolf Digital Enquiries
 * 
 * Supports:
 * 1. Supabase REST (Production-grade persistent cloud PostgreSQL via PostgREST)
 * 2. Webhook / CRM Integration (Optional persistent lead sync)
 * 3. Local filesystem JSON (Restricted to non-production development & automated tests ONLY)
 * 
 * Safety:
 * Prevents volatile local filesystem writes in production (e.g. Vercel serverless).
 * Detects missing storage credentials and reports explicit configuration errors.
 */

import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  createdAt: string;
  problemCategory: string;
  businessName: string;
  businessIndustry: string;
  successGoals: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: "new" | "contacted" | "qualified" | "archived";
}

export class StorageConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageConfigurationError";
  }
}

export interface StorageProvider {
  saveLead(lead: LeadRecord): Promise<void>;
  getLeads(): Promise<LeadRecord[]>;
}

// In-memory or custom provider override for testing
let customTestProvider: StorageProvider | null = null;

export function setTestStorageProvider(provider: StorageProvider | null): void {
  customTestProvider = provider;
}

/**
 * Checks if production persistent storage is configured.
 */
export function isPersistentStorageConfigured(): boolean {
  if (customTestProvider) return true;
  const hasSupabase = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
  const hasWebhook = Boolean(process.env.LEAD_WEBHOOK_URL);
  return hasSupabase || hasWebhook;
}

/**
 * Returns the active storage provider based on environment configuration.
 */
function getStorageProvider(): StorageProvider {
  if (customTestProvider) {
    return customTestProvider;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    return {
      async saveLead(lead: LeadRecord): Promise<void> {
        const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/enquiries`;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            id: lead.id,
            created_at: lead.createdAt,
            problem_category: lead.problemCategory,
            business_name: lead.businessName,
            business_industry: lead.businessIndustry,
            success_goals: lead.successGoals,
            contact_name: lead.contactName,
            contact_email: lead.contactEmail,
            contact_phone: lead.contactPhone,
            status: lead.status,
          }),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "Unknown error");
          throw new Error(`Database persistence failed with HTTP ${res.status}: ${errText}`);
        }
      },

      async getLeads(): Promise<LeadRecord[]> {
        const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/enquiries?order=created_at.desc&limit=100`;
        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch leads from database: HTTP ${res.status}`);
        }

        const data = await res.json();
        return (data || []).map((row: Record<string, unknown>) => ({
          id: String(row.id || ""),
          createdAt: String(row.created_at || ""),
          problemCategory: String(row.problem_category || ""),
          businessName: String(row.business_name || ""),
          businessIndustry: String(row.business_industry || ""),
          successGoals: String(row.success_goals || ""),
          contactName: String(row.contact_name || ""),
          contactEmail: String(row.contact_email || ""),
          contactPhone: String(row.contact_phone || ""),
          status: (row.status as LeadRecord["status"]) || "new",
        }));
      },
    };
  }

  // Webhook persistent forwarder (if configured)
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    return {
      async saveLead(lead: LeadRecord): Promise<void> {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Lead-Source": "redwolf-digital-website",
            ...(process.env.LEAD_WEBHOOK_SECRET ? { "X-Webhook-Secret": process.env.LEAD_WEBHOOK_SECRET } : {}),
          },
          body: JSON.stringify(lead),
        });

        if (!res.ok) {
          throw new Error(`Webhook dispatch failed with HTTP ${res.status}`);
        }
      },
      async getLeads(): Promise<LeadRecord[]> {
        return [];
      },
    };
  }

  // Production check: Reject ephemeral local file storage on Vercel / Production
  const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
  if (isProduction) {
    throw new StorageConfigurationError(
      "Persistent database credentials missing in production environment. " +
      "Configure SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY or LEAD_WEBHOOK_URL."
    );
  }

  // Local development fallback: Store in data/leads.json
  const localFilePath = path.join(process.cwd(), "data", "leads.json");
  return {
    async saveLead(lead: LeadRecord): Promise<void> {
      let currentLeads: LeadRecord[] = [];
      try {
        if (fs.existsSync(localFilePath)) {
          const raw = fs.readFileSync(localFilePath, "utf8");
          if (raw.trim()) {
            currentLeads = JSON.parse(raw);
          }
        }
      } catch {
        currentLeads = [];
      }

      currentLeads.unshift(lead);

      const dir = path.dirname(localFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(localFilePath, JSON.stringify(currentLeads, null, 2), "utf8");
    },

    async getLeads(): Promise<LeadRecord[]> {
      try {
        if (fs.existsSync(localFilePath)) {
          const raw = fs.readFileSync(localFilePath, "utf8");
          if (raw.trim()) {
            return JSON.parse(raw);
          }
        }
      } catch {
        return [];
      }
      return [];
    },
  };
}

/**
 * Persists an enquiry lead record using the configured persistent storage provider.
 */
export async function persistLead(lead: LeadRecord): Promise<void> {
  const provider = getStorageProvider();
  await provider.saveLead(lead);
}

/**
 * Retrieves leads for authorized administrators only.
 */
export async function retrieveLeadsForAdmin(): Promise<LeadRecord[]> {
  const provider = getStorageProvider();
  return await provider.getLeads();
}
