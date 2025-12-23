"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { NicheTabs } from "@/components/dashboard/niche-tabs";
import { LeadCard } from "@/components/dashboard/lead-card";
import { IcebreakerSheet } from "@/components/dashboard/icebreaker-sheet";
import { Lead } from "@/lib/supabase";
import { RadarIcon, LightningIcon, TimerIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Loading spinner component
function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Alert icon component
function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

// Sample leads for demo (in production, these come from the API)
const sampleLeads: Lead[] = [
  {
    id: "1",
    platform: "x",
    content: "Looking for a ghostwriter to help with my LinkedIn content. Want to build thought leadership in the AI/ML space. DM if interested.",
    niche: "writing",
    author_name: "Sarah Chen",
    author_handle: "@sarahchen_vc",
    author_avatar: null,
    author_bio: "Partner @ Sequoia | Investing in AI startups",
    follower_count: 12400,
    is_high_signal: true,
    source_url: "https://x.com/sarahchen_vc/status/123",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    platform: "linkedin",
    content: "Our startup is hiring a video editor for YouTube content. Must have experience with B2B SaaS. Remote OK. Budget is $3-5k/month.",
    niche: "video",
    author_name: "Marcus Johnson",
    author_handle: "marcus-johnson-ceo",
    author_avatar: null,
    author_bio: "CEO @ TechFlow | Building the future of work",
    follower_count: 8900,
    is_high_signal: true,
    source_url: "https://linkedin.com/posts/123",
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    platform: "reddit",
    content: "Need a Webflow developer for a complete site redesign. Budget is $5k-8k. Looking to start ASAP. Previous Webflow experience required.",
    niche: "dev",
    author_name: "techfounder2024",
    author_handle: "u/techfounder2024",
    author_avatar: null,
    author_bio: null,
    follower_count: 450,
    is_high_signal: false,
    source_url: "https://reddit.com/r/webflow/comments/123",
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    platform: "x",
    content: "Seeking a newsletter writer for our weekly VC digest. Competitive pay for the right person. Must understand startup ecosystem.",
    niche: "writing",
    author_name: "Alex Rivera",
    author_handle: "@alexrivera_fund",
    author_avatar: null,
    author_bio: "GP @ First Round | Writing about startups",
    follower_count: 23500,
    is_high_signal: true,
    source_url: "https://x.com/alexrivera_fund/status/456",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    platform: "linkedin",
    content: "Looking for a React developer to build our customer dashboard. Full-time or contract. Competitive rates for experienced devs.",
    niche: "dev",
    author_name: "Jennifer Liu",
    author_handle: "jennifer-liu-cto",
    author_avatar: null,
    author_bio: "CTO @ DataSync | Ex-Google",
    follower_count: 15200,
    is_high_signal: true,
    source_url: "https://linkedin.com/posts/456",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    platform: "x",
    content: "Need help editing YouTube shorts for my tech channel. Looking for someone creative who understands viral content. Ongoing work.",
    niche: "video",
    author_name: "Chris Taylor",
    author_handle: "@christaylor_tech",
    author_avatar: null,
    author_bio: "Tech YouTuber | 500K subs",
    follower_count: 45000,
    is_high_signal: true,
    source_url: "https://x.com/christaylor_tech/status/789",
    created_at: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to check user access from client
function useUserAccess() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return { hasAccess: false, isLoading: !isLoaded };
  }

  const metadata = user.publicMetadata as {
    subscriptionStatus?: string;
    accessExpiresAt?: string;
  };

  // Check for active subscription
  if (metadata.subscriptionStatus === "active" || metadata.subscriptionStatus === "trialing") {
    return { hasAccess: true, isLoading: false };
  }

  // Check for day/week pass
  if (metadata.accessExpiresAt) {
    const expiresAt = new Date(metadata.accessExpiresAt);
    const now = new Date();
    return { hasAccess: expiresAt > now, isLoading: false };
  }

  return { hasAccess: false, isLoading: false };
}

function DashboardContent() {
  const { user, isLoaded } = useUser();
  const { hasAccess } = useUserAccess();
  const searchParams = useSearchParams();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const activeNiche = searchParams.get("niche") || "all";
  const success = searchParams.get("success");
  const plan = searchParams.get("plan");

  // Fetch leads (using sample data for now)
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Filter by niche
      let filteredLeads = sampleLeads;
      if (activeNiche !== "all") {
        filteredLeads = sampleLeads.filter((lead) => lead.niche === activeNiche);
      }
      
      setLeads(filteredLeads);
      setIsLoading(false);
    };

    fetchLeads();
  }, [activeNiche]);

  const handleGenerateIcebreaker = (lead: Lead) => {
    setSelectedLead(lead);
    setIsSheetOpen(true);
  };

  const handleBuyPlan = async (planType: string) => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planType }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner className="w-8 h-8 text-[#0047AB]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Success Message */}
      {success === "true" && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <LightningIcon className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-medium">
              {plan === "month" ? "Welcome to Pro!" : `${plan === "day" ? "Day" : "Week"} Pass Activated!`}
            </p>
            <p className="text-[#6D8196] text-sm">
              You now have full access to all leads and features.
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Lead Radar</h1>
          <p className="text-[#6D8196]">
            {leads.length} high-intent leads found
          </p>
        </div>
        <NicheTabs />
      </div>

      {/* Access Notice */}
      {!hasAccess && (
        <div className="bg-[#0047AB]/10 border border-[#0047AB]/20 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <AlertIcon className="w-6 h-6 text-[#82C8E5] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white font-semibold text-lg mb-1">Unlock Full Access</p>
              <p className="text-[#6D8196] text-sm mb-4">
                Get contact info, AI icebreakers, and close more deals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleBuyPlan("day")}
                  variant="outline"
                  className="border-[#1e3a5f] hover:bg-[#1e3a5f] text-white"
                >
                  <TimerIcon className="w-4 h-4 mr-2" />
                  Day Pass - $4.99
                </Button>
                <Button
                  onClick={() => handleBuyPlan("week")}
                  variant="glow"
                  className="text-white"
                >
                  Week Pass - $9.99
                </Button>
                <Button
                  onClick={() => handleBuyPlan("month")}
                  variant="outline"
                  className="border-[#1e3a5f] hover:bg-[#1e3a5f] text-white"
                >
                  Monthly Pro - $29
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner className="w-8 h-8 text-[#0047AB] mb-4" />
          <p className="text-[#6D8196]">Loading leads...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && leads.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#1e3a5f] flex items-center justify-center mb-4">
            <RadarIcon className="w-8 h-8 text-[#6D8196]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No leads found</h3>
          <p className="text-[#6D8196] max-w-sm">
            No leads match this filter. Try selecting a different niche or check back later.
          </p>
        </div>
      )}

      {/* Leads Grid */}
      {!isLoading && leads.length > 0 && (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              isSubscribed={hasAccess}
              onGenerateIcebreaker={handleGenerateIcebreaker}
            />
          ))}
        </div>
      )}

      {/* Icebreaker Sheet */}
      <IcebreakerSheet
        lead={selectedLead}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <svg
            className="animate-spin w-8 h-8 text-[#0047AB]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
