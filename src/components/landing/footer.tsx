"use client";

import Link from "next/link";
import { Button, MagneticButtonWrapper } from "@/components/ui/button";
import { RadarIcon, ArrowIcon } from "@/components/icons";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Footer() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div ref={ref}>
      {/* Final CTA Section */}
      <section 
        className="py-28 bg-cta-gradient relative overflow-hidden transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#82C8E5] rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Ready to Stop Hunting?
          </h2>
          <p className="text-[#82C8E5]/80 text-lg mb-10 max-w-xl mx-auto">
            Join hundreds of freelancers who are closing more deals with less effort.
          </p>
          <MagneticButtonWrapper>
            <Button
              asChild
              size="xl"
              className="bg-white hover:bg-[#f8fafc] text-[#0047AB] rounded-full px-10 font-semibold shadow-xl shadow-black/20 group"
            >
              <Link href="/#pricing">
                Get Access Now
                <ArrowIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </MagneticButtonWrapper>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-10 border-t border-[#1e3a5f]/50 bg-[#030712] transition-all duration-700"
        style={{
          opacity: isVisible ? 1 : 0,
          transitionDelay: "200ms",
        }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0047AB] to-[#000080] flex items-center justify-center">
                <RadarIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-[#6D8196]">
                Intent<span className="text-white">Radar</span>
              </span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-[#6D8196]">
              © {new Date().getFullYear()} IntentRadar. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link 
                href="/privacy" 
                className="text-sm text-[#6D8196] hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-[#6D8196] hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
