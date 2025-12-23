import { NextRequest, NextResponse } from "next/server";
import { insertLead } from "@/lib/supabase";
import { categorizePost } from "@/lib/groq";

// Interface for incoming Apify data
interface ApifyPost {
  content: string;
  author_name?: string;
  author_handle?: string;
  author_avatar?: string;
  author_bio?: string;
  follower_count?: number;
  source_url: string;
  platform: "x" | "linkedin" | "reddit";
}

interface ApifyWebhookPayload {
  posts: ApifyPost[];
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const webhookSecret = process.env.APIFY_WEBHOOK_SECRET;
    const authHeader = request.headers.get("authorization");

    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the incoming data
    const body: ApifyWebhookPayload = await request.json();

    if (!body.posts || !Array.isArray(body.posts)) {
      return NextResponse.json(
        { error: "Invalid payload: expected { posts: [...] }" },
        { status: 400 }
      );
    }

    let processed = 0;
    let inserted = 0;
    let skipped = 0;

    // Process each post
    for (const post of body.posts) {
      processed++;

      // Validate required fields
      if (!post.content || !post.source_url || !post.platform) {
        skipped++;
        continue;
      }

      // Use Groq to categorize the post
      const { hasIntent, niche, isHighSignal } = await categorizePost(
        post.content
      );

      // Skip posts without buying intent
      if (!hasIntent || niche === "none") {
        skipped++;
        continue;
      }

      // Insert the lead into Supabase
      const lead = await insertLead({
        platform: post.platform,
        content: post.content,
        niche,
        author_name: post.author_name || null,
        author_handle: post.author_handle || null,
        author_avatar: post.author_avatar || null,
        author_bio: post.author_bio || null,
        follower_count: post.follower_count || 0,
        is_high_signal: isHighSignal,
        source_url: post.source_url,
      });

      if (lead) {
        inserted++;
      }
    }

    return NextResponse.json({
      success: true,
      processed,
      inserted,
      skipped,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "ingest webhook" });
}

