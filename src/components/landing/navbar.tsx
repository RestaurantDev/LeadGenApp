"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radar } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0b]/90 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-400 transition-colors">
            <Radar className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">IntentRadar</span>
        </Link>

        {/* Right Side - Auth State Aware */}
        <div className="flex items-center gap-4">
          {/* Signed Out: Show Log In + Get Access */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Button
              asChild
              className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-full px-6 font-medium transition-all hover:scale-105"
            >
              <Link href="/#pricing">Get Access</Link>
            </Button>
          </SignedOut>

          {/* Signed In: Show Dashboard + User Button */}
          <SignedIn>
            <Button
              asChild
              variant="ghost"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "bg-zinc-900 border-zinc-800",
                  userButtonPopoverActionButton: "text-zinc-300 hover:bg-zinc-800",
                  userButtonPopoverActionButtonText: "text-zinc-300",
                  userButtonPopoverFooter: "hidden",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
