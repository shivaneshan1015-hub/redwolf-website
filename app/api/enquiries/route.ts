import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { problemCategory, businessName, businessIndustry, successGoals, contactName, contactEmail, contactPhone } = body;

    if (!contactName || !contactEmail) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead = {
      id: `RW-LEAD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      problemCategory: problemCategory || "General Inquiry",
      businessName: businessName || "N/A",
      businessIndustry: businessIndustry || "N/A",
      successGoals: successGoals || "N/A",
      contactName,
      contactEmail,
      contactPhone: contactPhone || "N/A",
      status: "New"
    };

    const filePath = path.join(process.cwd(), "data/leads.json");
    let leads = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      if (fileData.trim()) {
        leads = JSON.parse(fileData);
      }
    }

    leads.unshift(lead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), "utf8");

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
      leadId: lead.id
    });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data/leads.json");
    let leads = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      if (fileData.trim()) {
        leads = JSON.parse(fileData);
      }
    }
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leads." }, { status: 500 });
  }
}
