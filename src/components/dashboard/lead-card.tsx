"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LockIcon, StarsIcon, CheckIcon } from "@/components/icons";
import { Lead } from "@/lib/supabase";

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

// Additional icons for actions
function BookmarkIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

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

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

interface LeadCardProps {
  lead: Lead;
  isSubscribed: boolean;
  onGenerateIcebreaker: (lead: Lead) => void;
}

export function LeadCard({ lead, isSubscribed, onGenerateIcebreaker }: LeadCardProps) {
  const [status, setStatus] = useState<"saved" | "contacted" | "hidden" | null>(null);

  const handleStatusChange = async (newStatus: "saved" | "contacted" | "hidden") => {
    setStatus(newStatus);
    // In production, you'd call an API here to persist this
  };

  return (
    <div className="bg-gradient-to-b from-[#0a1628]/80 to-[#030712]/50 border border-[#1e3a5f]/50 rounded-xl p-5 hover:border-[#0047AB]/30 transition-all hover-lift">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <PlatformIcon platform={lead.platform} className="w-5 h-5 text-[#6D8196]" />
          <span className="text-sm text-[#6D8196]">{getRelativeTime(lead.created_at)}</span>
          {lead.is_high_signal && (
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">
              High Signal
            </Badge>
          )}
        </div>
        <NicheBadge niche={lead.niche} />
      </div>

      {/* Content */}
      <p className="text-white text-sm leading-relaxed mb-4">
        {lead.content}
      </p>

      {/* Author Section */}
      <div className="flex items-center gap-3 pt-4 border-t border-[#1e3a5f]/50 mb-4">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center ${!isSubscribed ? "blur-sm" : ""}`}>
          {lead.author_avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={lead.author_avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-[#6D8196] text-sm font-medium">
              {lead.author_name?.charAt(0) || "?"}
            </span>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 relative">
          {!isSubscribed && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <LockIcon className="w-4 h-4 text-[#6D8196]" />
            </div>
          )}
          <div className={!isSubscribed ? "blur-sm select-none" : ""}>
            <span className="text-sm font-medium text-white block">
              {lead.author_name || "Unknown"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6D8196]">
                {lead.author_handle || "@unknown"}
              </span>
              <span className="text-xs text-[#1e3a5f]">•</span>
              <span className="text-xs text-[#6D8196]">
                {lead.follower_count.toLocaleString()} followers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {isSubscribed ? (
          <>
            <Button
              onClick={() => onGenerateIcebreaker(lead)}
              variant="glow"
              className="flex-1 text-white rounded-lg h-10 gap-2"
            >
              <StarsIcon className="w-4 h-4" animated />
              Generate Icebreaker
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a5f] hover:bg-[#1e3a5f] h-10 w-10"
              onClick={() => handleStatusChange("saved")}
            >
              <BookmarkIcon className={`w-4 h-4 ${status === "saved" ? "fill-[#82C8E5] text-[#82C8E5]" : "text-[#6D8196]"}`} filled={status === "saved"} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a5f] hover:bg-[#1e3a5f] h-10 w-10"
              onClick={() => handleStatusChange("contacted")}
            >
              <CheckIcon className={`w-4 h-4 ${status === "contacted" ? "text-emerald-400" : "text-[#6D8196]"}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a5f] hover:bg-[#1e3a5f] h-10 w-10"
              onClick={() => handleStatusChange("hidden")}
            >
              <EyeOffIcon className={`w-4 h-4 ${status === "hidden" ? "text-red-400" : "text-[#6D8196]"}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-[#1e3a5f] hover:bg-[#1e3a5f] h-10 w-10"
              onClick={() => window.open(lead.source_url, "_blank")}
            >
              <ExternalLinkIcon className="w-4 h-4 text-[#6D8196]" />
            </Button>
          </>
        ) : (
          <Button
            className="w-full bg-[#1e3a5f] hover:bg-[#2a4a6f] text-white rounded-lg h-10 gap-2"
            onClick={() => window.location.href = "/api/stripe/checkout"}
          >
            <LockIcon className="w-4 h-4" />
            Upgrade to Unlock
          </Button>
        )}
      </div>
    </div>
  );
}
