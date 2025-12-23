import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@/lib/supabase";
import { generateIcebreakers } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const { leadId } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Missing leadId" },
        { status: 400 }
      );
    }

    // Fetch the lead from Supabase
    const supabase = createServerClient();
    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Generate icebreakers using Groq
    const icebreakers = await generateIcebreakers(lead.content, lead.niche);

    return NextResponse.json({
      success: true,
      icebreakers,
      lead: {
        id: lead.id,
        platform: lead.platform,
        niche: lead.niche,
        source_url: lead.source_url,
      },
    });
  } catch (error) {
    console.error("Error generating icebreakers:", error);
    return NextResponse.json(
      { error: "Failed to generate icebreakers" },
      { status: 500 }
    );
  }
}

