"use client";

import { useEffect, useState } from "react";
import { Radar, Sparkles, Zap } from "lucide-react";

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

function Stat({ value, label, icon }: StatProps) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className="flex flex-col items-center gap-2 px-8 py-4">
      <div className="flex items-center gap-3">
        <div className="text-indigo-400">{icon}</div>
        <span className="text-3xl md:text-4xl font-bold text-white">
          {count.toLocaleString()}{suffix}
        </span>
      </div>
      <span className="text-sm text-zinc-400 text-center">{label}</span>
    </div>
  );
}

export function TrustBar() {
  return (
    <section className="border-y border-zinc-800 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-zinc-800">
          <Stat
            value="2400+"
            label="High-intent leads scraped"
            icon={<Radar className="w-6 h-6" />}
          />
          <Stat
            value="3"
            label="Specialized verticals"
            icon={<Sparkles className="w-6 h-6" />}
          />
          <Stat
            value="30"
            label="Minute refresh rate"
            icon={<Zap className="w-6 h-6" />}
          />
        </div>
      </div>
    </section>
  );
}

