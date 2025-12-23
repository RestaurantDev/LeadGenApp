"use client";

import { Button, MagneticButtonWrapper } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LockIcon, ArrowIcon } from "@/components/icons";
import { LeadTicker } from "./lead-ticker";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Platform icons
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

// Sample leads for preview
const sampleLeads = [
  {
    id: 1,
    platform: "x",
    content: "Looking for a ghostwriter to help with my LinkedIn content. Want to build thought leadership in the AI/ML space. DM if interested.",
    niche: "writing",
    author_name: "Sarah Chen",
    author_handle: "@sarahchen_vc",
    follower_count: 12400,
    created_at: "2 hours ago",
  },
  {
    id: 2,
    platform: "linkedin",
    content: "Our startup is hiring a video editor for YouTube content. Must have experience with B2B SaaS. Remote OK.",
    niche: "video",
    author_name: "Marcus Johnson",
    author_handle: "marcus-johnson-ceo",
    follower_count: 8900,
    created_at: "3 hours ago",
  },
  {
    id: 3,
    platform: "reddit",
    content: "Need a Webflow developer for a complete site redesign. Budget is $5k-8k. Looking to start ASAP.",
    niche: "dev",
    author_name: "techfounder2024",
    author_handle: "u/techfounder2024",
    follower_count: 450,
    created_at: "4 hours ago",
  },
  {
    id: 4,
    platform: "x",
    content: "Seeking a newsletter writer for our weekly VC digest. Competitive pay for the right person.",
    niche: "writing",
    author_name: "Alex Rivera",
    author_handle: "@alexrivera_fund",
    follower_count: 23500,
    created_at: "5 hours ago",
  },
  {
    id: 5,
    platform: "linkedin",
    content: "Looking for a React developer to build our customer dashboard. Full-time or contract.",
    niche: "dev",
    author_name: "Jennifer Liu",
    author_handle: "jennifer-liu-cto",
    follower_count: 15200,
    created_at: "6 hours ago",
  },
];

function PlatformIcon({ platform, className }: { platform: string; className?: string }) {
  switch (platform) {
    case "x":
      return <XIcon className={className} />;
    case "linkedin":
      return <LinkedInIcon className={className} />;
    case "reddit":
      return <RedditIcon className={className} />;
    default:
      return null;
  }
}

function NicheBadge({ niche }: { niche: string }) {
  const labels: Record<string, string> = {
    writing: "Ghostwriting",
    video: "Video Editing",
    dev: "Development",
  };

  const colors: Record<string, string> = {
    writing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    video: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dev: "bg-[#0047AB]/10 text-[#82C8E5] border-[#0047AB]/20",
  };

  return (
    <Badge variant="outline" className={`${colors[niche]} text-xs font-medium`}>
      {labels[niche]}
    </Badge>
  );
}

interface LeadCardProps {
  lead: typeof sampleLeads[0];
  blurred?: boolean;
  isVisible: boolean;
  delay: number;
}

function LeadCard({ lead, blurred = false, isVisible, delay }: LeadCardProps) {
  return (
    <div 
      className="bg-gradient-to-b from-[#0a1628]/80 to-[#030712]/50 border border-[#1e3a5f]/50 rounded-xl p-5 hover:border-[#0047AB]/30 transition-all duration-500 hover-lift"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <PlatformIcon platform={lead.platform} className="w-5 h-5 text-[#6D8196]" />
          <span className="text-sm text-[#6D8196]">{lead.created_at}</span>
        </div>
        <NicheBadge niche={lead.niche} />
      </div>

      {/* Content */}
      <p className="text-white text-sm leading-relaxed mb-4">
        {lead.content}
      </p>

      {/* Author - Blurred or Visible */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#1e3a5f]/50">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] ${blurred ? "blur-sm" : ""}`} />
        <div className="flex-1">
          <div className={`flex items-center gap-2 ${blurred ? "relative" : ""}`}>
            <span className={`text-sm font-medium text-white ${blurred ? "blur-sm select-none" : ""}`}>
              {lead.author_name}
            </span>
            {blurred && (
              <LockIcon className="w-3 h-3 text-[#6D8196] absolute left-1/2 -translate-x-1/2" />
            )}
          </div>
          <div className={`flex items-center gap-2 ${blurred ? "relative" : ""}`}>
            <span className={`text-xs text-[#6D8196] ${blurred ? "blur-sm select-none" : ""}`}>
              {lead.author_handle}
            </span>
            <span className="text-xs text-[#1e3a5f]">•</span>
            <span className="text-xs text-[#6D8196]">
              {lead.follower_count.toLocaleString()} followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeadPreview() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div 
          className="flex items-center justify-center gap-3 mb-10 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
            See What&apos;s Happening Right Now
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="text-xs font-medium text-emerald-400">Live</span>
          </div>
        </div>

        {/* Lead Ticker */}
        <div 
          className="mb-10 rounded-xl overflow-hidden transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "100ms",
          }}
        >
          <LeadTicker />
        </div>

        {/* Lead Cards with Overlay */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="space-y-4">
            {sampleLeads.map((lead, index) => (
              <LeadCard 
                key={lead.id} 
                lead={lead} 
                blurred={true}
                isVisible={isVisible}
                delay={200 + index * 100}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/80 to-transparent pointer-events-none" />

          {/* CTA Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 pointer-events-none">
            <div 
              className="glass rounded-2xl p-8 text-center max-w-md pointer-events-auto transition-all duration-700"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                transitionDelay: "500ms",
              }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0047AB]/20 to-[#000080]/20 border border-[#0047AB]/30 flex items-center justify-center mx-auto mb-5">
                <LockIcon className="w-7 h-7 text-[#82C8E5]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Unlock 2,400+ Verified Leads
              </h3>
              <p className="text-[#6D8196] text-sm mb-6">
                Get instant access to contact info and AI-powered icebreakers. Day passes start at $4.99.
              </p>
              <MagneticButtonWrapper>
                <Button
                  asChild
                  variant="glow"
                  size="xl"
                  className="w-full rounded-full group"
                >
                  <Link href="/#pricing">
                    View Pricing
                    <ArrowIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButtonWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
