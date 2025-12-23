"use client";

import { Button } from "@/components/ui/button";
import { Radar, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <>
      {/* Final CTA Section */}
      <section className="py-24 bg-cta-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Stop Hunting?
          </h2>
          <p className="text-indigo-100/80 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of freelancers who are closing more deals with less effort.
          </p>
          <Button
            asChild
            className="bg-white hover:bg-zinc-100 text-indigo-600 rounded-full h-14 px-8 text-lg font-medium group"
          >
            <Link href="/#pricing">
              Get Access Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center">
                <Radar className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-zinc-400">IntentRadar</span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} IntentRadar. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
