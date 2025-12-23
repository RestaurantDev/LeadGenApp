"use client";

// Sample leads for the ticker - in production, these come from the API
const sampleLeads = [
  { niche: "Ghostwriting", text: "Founder looking for a LinkedIn ghostwriter" },
  { niche: "Video", text: "CEO needs help with YouTube content" },
  { niche: "Development", text: "Startup hiring Webflow developer" },
  { niche: "Ghostwriting", text: "Tech exec seeking newsletter writer" },
  { niche: "Video", text: "Brand looking for video editor" },
  { niche: "Development", text: "Agency needs React developer ASAP" },
  { niche: "Ghostwriting", text: "Investor wants thought leadership content" },
  { niche: "Video", text: "Creator looking for shorts editor" },
];

export function LeadTicker() {
  const doubledLeads = [...sampleLeads, ...sampleLeads];

  return (
    <div className="w-full overflow-hidden bg-zinc-900/50 border-y border-zinc-800/50 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubledLeads.map((lead, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mx-6 text-sm"
          >
            <span className="text-zinc-500">•</span>
            <span className="text-indigo-400 font-medium">{lead.niche}:</span>
            <span className="text-zinc-300">{lead.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

