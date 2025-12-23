"use client";

import { Button, MagneticButtonWrapper } from "@/components/ui/button";
import { LightningIcon, StarsIcon, CrownIcon, CheckIcon, ArrowIcon } from "@/components/icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const plans = [
  {
    id: "day",
    name: "Day Pass",
    price: "$4.99",
    period: "one-time",
    description: "Perfect for trying it out",
    icon: LightningIcon,
    features: [
      "24-hour full access",
      "All lead categories",
      "AI icebreaker generation",
      "Unlimited lead views",
    ],
    cta: "Get Day Pass",
    popular: false,
    bestValue: false,
    highlight: false,
  },
  {
    id: "week",
    name: "Week Pass",
    price: "$9.99",
    period: "one-time",
    description: "Great for active prospecting",
    icon: StarsIcon,
    features: [
      "7-day full access",
      "All lead categories",
      "AI icebreaker generation",
      "Unlimited lead views",
    ],
    cta: "Get Week Pass",
    popular: true,
    bestValue: false,
    highlight: true,
  },
  {
    id: "month",
    name: "Monthly Pro",
    price: "$29",
    period: "/month",
    description: "For serious closers",
    icon: CrownIcon,
    features: [
      "Unlimited access",
      "All lead categories",
      "AI icebreaker generation",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Go Pro",
    popular: false,
    bestValue: true,
    highlight: false,
    savings: "Save $10.72 vs weekly",
  },
];

interface PricingCardProps {
  plan: typeof plans[0];
  isVisible: boolean;
  delay: number;
}

function PricingCard({ plan, isVisible, delay }: PricingCardProps) {
  const Icon = plan.icon;
  
  return (
    <div 
      className={cn(
        "relative bg-gradient-to-b from-[#0a1628]/90 to-[#030712]/50 border rounded-2xl p-6 flex flex-col hover-lift transition-all duration-700",
        plan.highlight 
          ? "border-[#0047AB]/50 shadow-lg shadow-[#0047AB]/10" 
          : "border-[#1e3a5f]/50 hover:border-[#0047AB]/30"
      )}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1) translateX(-50%)" : "scale(0) translateX(-50%)",
            transitionDelay: `${delay + 300}ms`,
            transitionDuration: "400ms",
          }}
        >
          <span className="bg-gradient-to-r from-[#0047AB] to-[#82C8E5] text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg shadow-[#0047AB]/30">
            Most Popular
          </span>
        </div>
      )}
      
      {/* Best Value Badge */}
      {plan.bestValue && (
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1) translateX(-50%)" : "scale(0) translateX(-50%)",
            transitionDelay: `${delay + 300}ms`,
            transitionDuration: "400ms",
          }}
        >
          <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">
            Best Value
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-500",
          plan.highlight 
            ? "bg-gradient-to-br from-[#0047AB]/20 to-[#82C8E5]/10 border border-[#0047AB]/30" 
            : "bg-[#1e3a5f]/30 border border-[#1e3a5f]/50"
        )}>
          <Icon 
            className={cn(
              "w-7 h-7 transition-colors",
              plan.highlight ? "text-[#82C8E5]" : "text-[#6D8196]"
            )} 
            animated 
          />
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-[#6D8196]">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-white">{plan.price}</span>
          <span className="text-[#6D8196]">{plan.period}</span>
        </div>
        {plan.savings && (
          <p className="text-xs text-emerald-400 mt-2 font-medium">{plan.savings}</p>
        )}
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, index) => (
          <div 
            key={feature} 
            className="flex items-center gap-3"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-10px)",
              transitionDelay: `${delay + 100 + index * 50}ms`,
              transitionDuration: "400ms",
            }}
          >
            <div className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              plan.highlight ? "bg-[#0047AB]/20" : "bg-emerald-500/10"
            )}>
              <CheckIcon className={cn(
                "w-3 h-3",
                plan.highlight ? "text-[#82C8E5]" : "text-emerald-400"
              )} />
            </div>
            <span className="text-sm text-[#6D8196]">{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {plan.highlight ? (
        <MagneticButtonWrapper>
          <Button
            asChild
            variant="glow"
            size="xl"
            className="w-full rounded-xl group"
          >
            <Link href={`/sign-up?plan=${plan.id}`}>
              {plan.cta}
              <ArrowIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </MagneticButtonWrapper>
      ) : (
        <Button
          asChild
          variant="outline"
          size="xl"
          className="w-full rounded-xl group"
        >
          <Link href={`/sign-up?plan=${plan.id}`}>
            {plan.cta}
            <ArrowIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      )}
    </div>
  );
}

export function Pricing() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="pricing" className="py-28 scroll-mt-16" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div 
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Simple Pricing. Instant Access.
          </h2>
          <p className="text-[#6D8196] text-lg max-w-xl mx-auto">
            Start with a day pass to test the waters, or go pro for unlimited access.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.id} 
              plan={plan}
              isVisible={isVisible}
              delay={100 + index * 150}
            />
          ))}
        </div>

        {/* Trust Line */}
        <p 
          className="text-center text-sm text-[#6D8196] mt-12 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transitionDelay: "600ms",
          }}
        >
          All plans include instant access. No hidden fees. No recurring charges on passes.
        </p>
      </div>
    </section>
  );
}
