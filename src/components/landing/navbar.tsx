"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, MagneticButtonWrapper } from "@/components/ui/button";
import { RadarIcon } from "@/components/icons";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#030712]/90 backdrop-blur-md border-b border-[#1e3a5f]/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo with Cobalt Sky gradient */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#000080] flex items-center justify-center group-hover:from-[#0055cc] group-hover:to-[#0047AB] transition-all duration-300 shadow-lg shadow-[#0047AB]/20">
            <RadarIcon 
              className="w-5 h-5 text-white" 
              animated 
            />
          </div>
          <span className="text-lg font-semibold text-white tracking-tight">
            Intent<span className="text-[#82C8E5]">Radar</span>
          </span>
        </Link>

        {/* Right Side - Auth State Aware */}
        <div className="flex items-center gap-4">
          {/* Signed Out: Show Log In + Get Access */}
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-[#6D8196] hover:text-white transition-colors duration-200"
            >
              Log In
            </Link>
            <MagneticButtonWrapper>
              <Button
                asChild
                variant="glow"
                className="rounded-full px-6 font-medium"
              >
                <Link href="/#pricing">Get Access</Link>
              </Button>
            </MagneticButtonWrapper>
          </SignedOut>

          {/* Signed In: Show Dashboard + User Button */}
          <SignedIn>
            <Button
              asChild
              variant="ghost"
              className="text-[#6D8196] hover:text-white hover:bg-[#1e3a5f]"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 ring-2 ring-[#0047AB]/20 hover:ring-[#0047AB]/40 transition-all",
                  userButtonPopoverCard: "bg-[#0a1628] border-[#1e3a5f]",
                  userButtonPopoverActionButton: "text-[#6D8196] hover:bg-[#1e3a5f]",
                  userButtonPopoverActionButtonText: "text-[#6D8196]",
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
