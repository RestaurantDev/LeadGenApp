"use client";

import { useEffect, useState } from "react";
import { TargetIcon, StarsIcon, TimerIcon } from "@/components/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay: number;
  isVisible: boolean;
}

function Stat({ value, label, icon, delay, isVisible }: StatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const startTimeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isVisible, hasAnimated, numericValue, delay]);

  return (
    <div 
      className="flex flex-col items-center gap-3 px-8 py-6 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-[#82C8E5] animate-float" style={{ animationDelay: `${delay * 0.5}ms` }}>
          {icon}
        </div>
        <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
          {count.toLocaleString()}{suffix}
        </span>
      </div>
      <span className="text-sm text-[#6D8196] text-center font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function TrustBar() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section 
      ref={ref}
      className="border-y border-[#1e3a5f]/50 bg-gradient-to-b from-[#0a1628]/50 to-[#030712]/30 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-[#1e3a5f]/50">
          <Stat
            value="2400+"
            label="High-intent leads scraped"
            icon={<TargetIcon className="w-7 h-7" animated />}
            delay={0}
            isVisible={isVisible}
          />
          <Stat
            value="3"
            label="Specialized verticals"
            icon={<StarsIcon className="w-7 h-7" animated />}
            delay={150}
            isVisible={isVisible}
          />
          <Stat
            value="30"
            label="Minute refresh rate"
            icon={<TimerIcon className="w-7 h-7" animated />}
            delay={300}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}
