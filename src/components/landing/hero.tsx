"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to sign-up with email pre-filled
    window.location.href = `/sign-up?email=${encodeURIComponent(email)}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-8 animate-fade-in-up opacity-0">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-dot" />
          <span className="text-sm font-medium text-zinc-300 uppercase tracking-wider">
            Lead Intelligence for Freelancers
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up opacity-0 animate-delay-100">
          Stop Hunting.
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
            Start Closing.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up opacity-0 animate-delay-200">
          Real-time buying signals from founders actively looking for 
          <span className="text-white font-medium"> ghostwriters</span>, 
          <span className="text-white font-medium"> video editors</span>, and 
          <span className="text-white font-medium"> developers</span>.
        </p>

        {/* Email Form */}
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6 animate-fade-in-up opacity-0 animate-delay-300"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-zinc-900/80 border-zinc-700 text-white placeholder:text-zinc-500 rounded-full px-5 flex-1"
            required
          />
          <Button
            type="submit"
            className="h-12 bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-6 font-medium transition-all hover:scale-105 group"
          >
            Get Instant Access
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        {/* Trust Line */}
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 animate-fade-in-up opacity-0 animate-delay-400">
          <Zap className="w-4 h-4" />
          <span>Day passes start at just $4.99. Instant access.</span>
        </div>
      </div>
    </section>
  );
}
