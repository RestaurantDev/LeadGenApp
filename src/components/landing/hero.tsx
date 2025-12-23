"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LightningIcon, ArrowIcon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/sign-up?email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient - Cobalt Sky */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2382C8E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs for depth - Cobalt Sky colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0047AB]/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#82C8E5]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#000080]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        {/* Eyebrow */}
        <Reveal direction="up" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1628]/80 border border-[#1e3a5f] mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="text-sm font-medium text-[#6D8196] uppercase tracking-wider">
              Lead Intelligence for Freelancers
            </span>
          </div>
        </Reveal>

        {/* Main Headline */}
        <Reveal direction="up" delay={100}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Stop Hunting.
            <br />
            <span className="bg-gradient-to-r from-[#0047AB] via-[#82C8E5] to-[#0047AB] bg-clip-text text-transparent bg-[length:200%_auto]">
              Start Closing.
            </span>
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal direction="up" delay={200}>
          <p className="text-xl text-[#6D8196] max-w-2xl mx-auto mb-10 leading-relaxed">
            Real-time buying signals from founders actively looking for 
            <span className="text-white font-medium"> ghostwriters</span>, 
            <span className="text-white font-medium"> video editors</span>, and 
            <span className="text-white font-medium"> developers</span>.
          </p>
        </Reveal>

        {/* Email Form */}
        <Reveal direction="up" delay={300}>
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-[#0a1628]/80 border-[#1e3a5f] text-white placeholder:text-[#6D8196] rounded-full px-5 flex-1 focus:border-[#0047AB] focus:ring-[#0047AB]/20 transition-all"
              required
            />
            <Button
              type="submit"
              variant="glow"
              size="xl"
              ripple
              className="rounded-full group"
            >
              Get Instant Access
              <ArrowIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </Reveal>

        {/* Trust Line */}
        <Reveal direction="up" delay={400}>
          <div className="flex items-center justify-center gap-2 text-sm text-[#6D8196]">
            <LightningIcon className="w-4 h-4 text-[#82C8E5]" animated />
            <span>Day passes start at just $4.99. Instant access.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
