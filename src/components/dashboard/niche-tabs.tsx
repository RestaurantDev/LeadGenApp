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
    <div className="flex items-center gap-2 p-1 bg-zinc-900/50 rounded-full border border-zinc-800">
      {niches.map((niche) => (
        <button
          key={niche.id}
          onClick={() => handleTabClick(niche.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            activeNiche === niche.id
              ? "bg-indigo-500 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
          )}
        >
          {niche.label}
        </button>
      ))}
    </div>
  );
}

