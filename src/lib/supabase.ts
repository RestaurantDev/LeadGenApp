import { createClient } from "@supabase/supabase-js";

// Database types
export interface Lead {
  id: string;
  platform: "x" | "linkedin" | "reddit";
  content: string;
  niche: "writing" | "video" | "dev";
  author_name: string | null;
  author_handle: string | null;
  author_avatar: string | null;
  author_bio: string | null;
  follower_count: number;
  is_high_signal: boolean;
  source_url: string;
  created_at: string;
  updated_at: string;
}

export interface UserLead {
  id: string;
  user_id: string;
  lead_id: string;
  status: "saved" | "contacted" | "hidden";
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Server-side Supabase client (uses service role key)
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Client-side Supabase client (uses anon key for public data)
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Helper: Get leads by niche
export async function getLeadsByNiche(
  niche?: string,
  limit: number = 50
): Promise<Lead[]> {
  const supabase = createServerClient();

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (niche && niche !== "all") {
    query = query.eq("niche", niche);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }

  return data || [];
}

// Helper: Get preview leads for landing page (limited fields)
export async function getPreviewLeads(limit: number = 10): Promise<Lead[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching preview leads:", error);
    return [];
  }

  return data || [];
}

// Helper: Insert a new lead (with deduplication)
export async function insertLead(
  lead: Omit<Lead, "id" | "created_at" | "updated_at">
): Promise<Lead | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("leads")
    .upsert(lead, { onConflict: "source_url", ignoreDuplicates: true })
    .select()
    .single();

  if (error) {
    // Ignore duplicate key errors
    if (error.code === "23505") {
      return null;
    }
    console.error("Error inserting lead:", error);
    return null;
  }

  return data;
}

// Helper: Get user's saved leads
export async function getUserLeads(
  userId: string,
  status?: string
): Promise<(UserLead & { lead: Lead })[]> {
  const supabase = createServerClient();

  let query = supabase
    .from("user_leads")
    .select("*, lead:leads(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching user leads:", error);
    return [];
  }

  return data || [];
}

// Helper: Save a lead for a user
export async function saveLeadForUser(
  userId: string,
  leadId: string,
  status: "saved" | "contacted" | "hidden" = "saved"
): Promise<UserLead | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("user_leads")
    .upsert(
      { user_id: userId, lead_id: leadId, status },
      { onConflict: "user_id,lead_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("Error saving lead for user:", error);
    return null;
  }

  return data;
}

