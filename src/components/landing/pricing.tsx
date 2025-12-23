"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "day",
    name: "Day Pass",
    price: "$4.99",
    period: "one-time",
    description: "Perfect for trying it out",
    icon: Zap,
    features: [
      "24-hour full access",
      "All lead categories",
      "AI icebreaker generation",
      "Unlimited lead views",
    ],
    cta: "Get Day Pass",
    popular: false,
    highlight: false,
  },
  {
    id: "week",
    name: "Week Pass",
    price: "$9.99",
    period: "one-time",
    description: "Great for active prospecting",
    icon: Sparkles,
    features: [
      "7-day full access",
      "All lead categories",
      "AI icebreaker generation",
      "Unlimited lead views",
    ],
    cta: "Get Week Pass",
    popular: true,
    highlight: true,
  },
  {
    id: "month",
    name: "Monthly Pro",
    price: "$29",
    period: "/month",
    description: "Best value for serious closers",
    icon: Crown,
    features: [
      "Unlimited access",
      "All lead categories",
      "AI icebreaker generation",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Go Pro",
    popular: false,
    highlight: false,
    savings: "Save $10.72 vs weekly",
  },
];

interface PricingCardProps {
  plan: typeof plans[0];
}

function PricingCard({ plan }: PricingCardProps) {
  const Icon = plan.icon;

  return (
    <div
      className={cn(
        "relative bg-gradient-to-b from-zinc-900 to-zinc-950 border rounded-2xl p-6 flex flex-col",
        plan.highlight
          ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10"
          : "border-zinc-800"
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4",
            plan.highlight
              ? "bg-indigo-500/20 border border-indigo-500/30"
              : "bg-zinc-800/50 border border-zinc-700/50"
          )}
        >
          <Icon
            className={cn(
              "w-6 h-6",
              plan.highlight ? "text-indigo-400" : "text-zinc-400"
            )}
          />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-zinc-500">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-zinc-500">{plan.period}</span>
        </div>
        {plan.savings && (
          <p className="text-xs text-emerald-400 mt-2">{plan.savings}</p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 mb-6 flex-1">
        {plan.features.map((feature) => (
          <div key={feature} className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                plan.highlight ? "bg-indigo-500/10" : "bg-emerald-500/10"
              )}
            >
              <Check
                className={cn(
                  "w-3 h-3",
                  plan.highlight ? "text-indigo-400" : "text-emerald-400"
                )}
              />
            </div>
            <span className="text-sm text-zinc-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        asChild
        className={cn(
          "w-full rounded-xl h-12 font-medium group",
          plan.highlight
            ? "bg-indigo-500 hover:bg-indigo-400 text-white"
            : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
        )}
      >
        <Link href={`/sign-up?plan=${plan.id}`}>
          {plan.cta}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple Pricing. Instant Access.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Start with a day pass to test the waters, or go pro for unlimited access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust Line */}
        <p className="text-center text-sm text-zinc-500 mt-8">
          All plans include instant access. No hidden fees. No recurring charges on passes.
        </p>
      </div>
    </section>
  );
}
