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
import { 
  Sparkles, 
  Copy, 
  ExternalLink, 
  Check,
  Loader2 
} from "lucide-react";
import { Lead } from "@/lib/supabase";

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
      <SheetContent className="bg-zinc-900 border-zinc-800 w-full sm:max-w-lg">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
              AI Powered
            </Badge>
          </div>
          <SheetTitle className="text-white text-xl">
            Generate Icebreakers
          </SheetTitle>
          <SheetDescription className="text-zinc-400">
            {lead && (
              <>
                Personalized opening messages for this {nicheLabels[lead.niche] || lead.niche} lead.
              </>
            )}
          </SheetDescription>
        </SheetHeader>

        {/* Original Post Preview */}
        {lead && (
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6 border border-zinc-700">
            <p className="text-sm text-zinc-300 line-clamp-3">
              &ldquo;{lead.content}&rdquo;
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
            <p className="text-zinc-400 text-sm">Generating personalized icebreakers...</p>
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
                className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                {/* Option Label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Option {index + 1}
                  </span>
                  <span className="text-xs text-zinc-500">
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
                    className="flex-1 border-zinc-700 hover:bg-zinc-700 text-white h-9"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleOpenAndCopy(icebreaker, index)}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white h-9"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
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
            className="w-full mt-6 border-zinc-700 hover:bg-zinc-800 text-zinc-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Regenerate Icebreakers
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}

