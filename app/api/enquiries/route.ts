import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/validation/enquiry";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import {
  persistLead,
  retrieveLeadsForAdmin,
  StorageConfigurationError,
  LeadRecord,
} from "@/lib/storage/leads";

/**
 * POST /api/enquiries
 * Secure endpoint for submitting consultation requests.
 * Features:
 * - IP rate limiting
 * - Bot honeypot & timing verification
 * - Server-side sanitization & validation
 * - Safe error handling (no leaked database errors, stack traces, or credentials)
 * - Persistent storage with production enforcement
 */
export async function POST(request: Request) {
  try {
    // 1. IP extraction & rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("x-real-ip") || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a few minutes before submitting again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "600",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    // 2. Parse request body safely
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request." },
        { status: 400 }
      );
    }

    // 3. Validation & Sanitization
    const validation = validateEnquiry(body);
    if (!validation.isValid) {
      const firstErrorMessage =
        Object.values(validation.errors)[0] || "Validation failed.";
      return NextResponse.json(
        {
          error: firstErrorMessage,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const { sanitized } = validation;
    if (!sanitized) {
      return NextResponse.json(
        { error: "Failed to process form input." },
        { status: 400 }
      );
    }

    // 4. Construct Lead Record
    const leadId = `RW-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const lead: LeadRecord = {
      id: leadId,
      createdAt: new Date().toISOString(),
      problemCategory: sanitized.problemCategory,
      businessName: sanitized.businessName,
      businessIndustry: sanitized.businessIndustry,
      successGoals: sanitized.successGoals,
      contactName: sanitized.contactName,
      contactEmail: sanitized.contactEmail,
      contactPhone: sanitized.contactPhone,
      status: "new",
    };

    // 5. Persist to storage
    await persistLead(lead);

    // 6. Safe success response without leaking other data or internal secrets
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        leadId: lead.id,
      },
      {
        status: 201,
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      console.error("[EnquiryAPI] Storage configuration missing in production.");
      return NextResponse.json(
        {
          error:
            "Enquiry service is temporarily undergoing scheduled maintenance. Please email us directly at hello@redwolf.in.",
        },
        { status: 503 }
      );
    }

    // Log internal error safely without PII
    console.error("[EnquiryAPI] Unexpected error during submission processing.");
    return NextResponse.json(
      {
        error:
          "Unable to submit enquiry at this moment. Please try again or reach out to hello@redwolf.in.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/enquiries
 * Restricted administration endpoint.
 * Unauthenticated requests are strictly rejected (401 Unauthorized or 404 Not Found).
 * Only authorized callers presenting a valid Bearer token matching ADMIN_API_KEY can retrieve leads.
 */
export async function GET(request: Request) {
  const adminApiKey = process.env.ADMIN_API_KEY;

  // If no admin key is configured in the environment, do not expose endpoint
  if (!adminApiKey || !adminApiKey.trim()) {
    return NextResponse.json(
      { error: "Endpoint not found." },
      { status: 404 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7).trim();
  if (token !== adminApiKey) {
    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  }

  try {
    const leads = await retrieveLeadsForAdmin();
    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to retrieve records." },
      { status: 500 }
    );
  }
}
