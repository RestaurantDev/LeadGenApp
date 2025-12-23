"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const niches = [
  { id: "all", label: "All Leads" },
  { id: "writing", label: "Ghostwriting" },
  { id: "video", label: "Video Editing" },
  { id: "dev", label: "Development" },
];

export function NicheTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeNiche = searchParams.get("niche") || "all";

  const handleTabClick = (nicheId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nicheId === "all") {
      params.delete("niche");
    } else {
      params.set("niche", nicheId);
    }
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-[#0a1628]/50 rounded-full border border-[#1e3a5f]/50">
      {niches.map((niche) => (
        <button
          key={niche.id}
          onClick={() => handleTabClick(niche.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            activeNiche === niche.id
              ? "bg-[#0047AB] text-white shadow-lg shadow-[#0047AB]/20"
              : "text-[#6D8196] hover:text-white hover:bg-[#1e3a5f]"
          )}
        >
          {niche.label}
        </button>
      ))}
    </div>
  );
}
