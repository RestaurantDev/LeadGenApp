import { NextResponse } from "next/server";
import { getPreviewLeads, Lead } from "@/lib/supabase";

// Redacted lead type for public preview
interface RedactedLead {
  id: string;
  platform: string;
  content: string;
  niche: string;
  follower_count: number;
  created_at: string;
  // Sensitive fields are redacted
  author_name: string;
  author_handle: string;
}

export async function GET() {
  try {
    const leads = await getPreviewLeads(10);

    // Redact sensitive information for public preview
    const redactedLeads: RedactedLead[] = leads.map((lead: Lead) => ({
      id: lead.id,
      platform: lead.platform,
      content: lead.content,
      niche: lead.niche,
      follower_count: lead.follower_count,
      created_at: lead.created_at,
      // Redact author info
      author_name: "••••••••",
      author_handle: "@••••••••",
    }));

    return NextResponse.json({
      success: true,
      leads: redactedLeads,
    });
  } catch (error) {
    console.error("Error fetching preview leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

