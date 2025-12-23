"use client";

const tickerItems = [
  { text: "Looking for a ghostwriter for LinkedIn content", platform: "X", time: "2m ago" },
  { text: "Need a video editor for YouTube shorts", platform: "LinkedIn", time: "5m ago" },
  { text: "Seeking a React developer for dashboard", platform: "Reddit", time: "8m ago" },
  { text: "Hiring newsletter writer for VC digest", platform: "X", time: "12m ago" },
  { text: "Looking for Webflow dev, budget $5k-8k", platform: "Reddit", time: "15m ago" },
  { text: "Need a content strategist ASAP", platform: "LinkedIn", time: "18m ago" },
  { text: "Seeking podcast editor, 4 episodes/month", platform: "X", time: "22m ago" },
  { text: "Looking for Next.js developer, full-time", platform: "LinkedIn", time: "25m ago" },
];

export function LeadTicker() {
  return (
    <div className="bg-gradient-to-r from-[#0a1628]/80 via-[#030712]/50 to-[#0a1628]/80 border-y border-[#1e3a5f]/30 py-3 overflow-hidden">
      <div className="flex animate-marquee">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 px-6 whitespace-nowrap"
          >
            <span className="text-xs font-medium text-[#0047AB] bg-[#0047AB]/10 px-2 py-0.5 rounded-full border border-[#0047AB]/20">
              {item.platform}
            </span>
            <span className="text-sm text-[#6D8196]">
              {item.text}
            </span>
            <span className="text-xs text-[#1e3a5f]">
              {item.time}
            </span>
            <span className="text-[#1e3a5f]">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
