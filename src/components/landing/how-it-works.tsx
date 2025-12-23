"use client";

import { TargetIcon, StarsIcon, SendIcon } from "@/components/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    icon: TargetIcon,
    title: "We Scrape",
    description: "Our AI monitors X, LinkedIn, and Reddit 24/7 for buying signals in your niche.",
  },
  {
    number: "02",
    icon: StarsIcon,
    title: "We Score",
    description: "Llama 3 categorizes leads by niche and filters out the noise, surfacing only high-intent prospects.",
  },
  {
    number: "03",
    icon: SendIcon,
    title: "You Close",
    description: "Generate personalized icebreakers and reach out in one click. No more cold DMs.",
  },
];

export function HowItWorks() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="py-28 bg-gradient-to-b from-[#0a1628]/30 to-transparent">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section Header */}
        <div 
          className="text-center mb-20 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            From Signal to Signed Client
          </h2>
          <p className="text-[#6D8196] text-lg max-w-2xl mx-auto">
            We do the heavy lifting so you can focus on what you do best—closing deals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const delay = index * 150;
            
            return (
              <div
                key={step.number}
                className="relative bg-gradient-to-b from-[#0a1628]/80 to-[#030712]/40 border border-[#1e3a5f]/50 rounded-2xl p-8 hover:border-[#0047AB]/50 transition-all duration-500 group hover-lift"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${delay + 200}ms`,
                  transitionDuration: "700ms",
                }}
              >
                {/* Step Number - Background */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-[#1e3a5f]/50 group-hover:text-[#0047AB]/20 transition-colors duration-500 select-none">
                  {step.number}
                </div>

                {/* Icon Container */}
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0047AB]/20 to-[#000080]/10 border border-[#0047AB]/30 flex items-center justify-center mb-8 group-hover:from-[#0047AB]/30 group-hover:to-[#82C8E5]/20 transition-all duration-500">
                  <Icon 
                    className="w-8 h-8 text-[#82C8E5] group-hover:text-[#82C8E5] transition-colors" 
                    animated 
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-[#0047AB]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#82C8E5] transition-colors">
                  {step.title}
                </h3>
                <p className="text-[#6D8196] leading-relaxed group-hover:text-[#6D8196] transition-colors">
                  {step.description}
                </p>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#1e3a5f] to-transparent"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      width: isVisible ? "32px" : "0px",
                      transition: "all 0.6s ease-out",
                      transitionDelay: `${delay + 600}ms`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
