"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarsIcon, CheckIcon } from "@/components/icons";
import { Lead } from "@/lib/supabase";

// Icon components
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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

function SpinnerIcon({ className }: { className?: string }) {
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

interface IcebreakerSheetProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function IcebreakerSheet({ lead, isOpen, onClose }: IcebreakerSheetProps) {
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateIcebreakers = async () => {
    if (!lead) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/icebreaker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate icebreakers");
      }

      const data = await response.json();
      setIcebreakers(data.icebreakers);
    } catch (err) {
      setError("Failed to generate icebreakers. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleOpenAndCopy = async (text: string, index: number) => {
    await handleCopy(text, index);
    if (lead?.source_url) {
      window.open(lead.source_url, "_blank");
    }
  };

  // Reset state when sheet opens with a new lead
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Reset state after animation
      setTimeout(() => {
        setIcebreakers([]);
        setError(null);
        setCopiedIndex(null);
      }, 300);
    }
  };

  // Generate icebreakers when sheet opens
  const handleSheetOpen = () => {
    if (isOpen && lead && icebreakers.length === 0 && !isLoading) {
      generateIcebreakers();
    }
  };

  // Trigger generation when sheet opens
  if (isOpen && lead && icebreakers.length === 0 && !isLoading && !error) {
    handleSheetOpen();
  }

  const nicheLabels: Record<string, string> = {
    writing: "Ghostwriting",
    video: "Video Editing",
    dev: "Development",
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="bg-[#0a1628] border-[#1e3a5f] w-full sm:max-w-lg">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#0047AB]/20 flex items-center justify-center">
              <StarsIcon className="w-4 h-4 text-[#82C8E5]" animated />
            </div>
            <Badge className="bg-[#0047AB]/10 text-[#82C8E5] border-[#0047AB]/20">
              AI Powered
            </Badge>
          </div>
          <SheetTitle className="text-white text-xl">
            Generate Icebreakers
          </SheetTitle>
          <SheetDescription className="text-[#6D8196]">
            {lead && (
              <>
                Personalized opening messages for this {nicheLabels[lead.niche] || lead.niche} lead.
              </>
            )}
          </SheetDescription>
        </SheetHeader>

        {/* Original Post Preview */}
        {lead && (
          <div className="bg-[#030712]/50 rounded-xl p-4 mb-6 border border-[#1e3a5f]">
            <p className="text-sm text-[#6D8196] line-clamp-3">
              &ldquo;{lead.content}&rdquo;
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <SpinnerIcon className="w-8 h-8 text-[#0047AB] mb-4" />
            <p className="text-[#6D8196] text-sm">Generating personalized icebreakers...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
            <p className="text-red-400 text-sm">{error}</p>
            <Button
              onClick={generateIcebreakers}
              variant="outline"
              className="mt-3 border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Icebreakers List */}
        {!isLoading && icebreakers.length > 0 && (
          <div className="space-y-4">
            {icebreakers.map((icebreaker, index) => (
              <div
                key={index}
                className="bg-[#030712]/50 rounded-xl p-4 border border-[#1e3a5f] hover:border-[#0047AB]/30 transition-colors"
              >
                {/* Option Label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[#6D8196] uppercase tracking-wider">
                    Option {index + 1}
                  </span>
                  <span className="text-xs text-[#6D8196]">
                    {icebreaker.length} characters
                  </span>
                </div>

                {/* Icebreaker Text */}
                <p className="text-white text-sm leading-relaxed mb-4">
                  {icebreaker}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleCopy(icebreaker, index)}
                    variant="outline"
                    className="flex-1 border-[#1e3a5f] hover:bg-[#1e3a5f] text-white h-9"
                  >
                    {copiedIndex === index ? (
                      <>
                        <CheckIcon className="w-4 h-4 mr-2 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleOpenAndCopy(icebreaker, index)}
                    variant="glow"
                    className="flex-1 text-white h-9"
                  >
                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                    Copy & Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regenerate Button */}
        {!isLoading && icebreakers.length > 0 && (
          <Button
            onClick={generateIcebreakers}
            variant="outline"
            className="w-full mt-6 border-[#1e3a5f] hover:bg-[#1e3a5f] text-[#6D8196]"
          >
            <StarsIcon className="w-4 h-4 mr-2" animated />
            Regenerate Icebreakers
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
