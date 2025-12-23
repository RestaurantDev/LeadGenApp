"use client";

import { Radar, Sparkles, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Radar,
    title: "We Scrape",
    description: "Our AI monitors X, LinkedIn, and Reddit 24/7 for buying signals in your niche.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We Score",
    description: "Llama 3 categorizes leads by niche and filters out the noise, surfacing only high-intent prospects.",
  },
  {
    number: "03",
    icon: Send,
    title: "You Close",
    description: "Generate personalized icebreakers and reach out in one click. No more cold DMs.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Signal to Signed Client in 3 Steps
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            We do the heavy lifting so you can focus on what you do best—closing deals.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-all group"
            >
              {/* Step Number */}
              <div className="absolute top-4 right-4 text-4xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <step.icon className="w-7 h-7 text-indigo-400" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-zinc-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

