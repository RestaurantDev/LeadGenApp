import { SignIn } from "@clerk/nextjs";
import { RadarIcon } from "@/components/icons";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0047AB]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#82C8E5]/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#000080] flex items-center justify-center group-hover:from-[#0055cc] group-hover:to-[#0047AB] transition-all shadow-lg shadow-[#0047AB]/20">
            <RadarIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">
            Intent<span className="text-[#82C8E5]">Radar</span>
          </span>
        </Link>

        {/* Clerk Sign In Component */}
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-[#0a1628] border border-[#1e3a5f] shadow-2xl shadow-[#0047AB]/10",
              headerTitle: "text-white",
              headerSubtitle: "text-[#6D8196]",
              socialButtonsBlockButton:
                "bg-[#1e3a5f] border-[#1e3a5f] text-white hover:bg-[#2a4a6f]",
              socialButtonsBlockButtonText: "text-white",
              dividerLine: "bg-[#1e3a5f]",
              dividerText: "text-[#6D8196]",
              formFieldLabel: "text-[#6D8196]",
              formFieldInput:
                "bg-[#0a1628] border-[#1e3a5f] text-white placeholder:text-[#6D8196] focus:border-[#0047AB] focus:ring-[#0047AB]/20",
              formButtonPrimary:
                "bg-[#0047AB] hover:bg-[#0055cc] text-white",
              footerActionLink: "text-[#82C8E5] hover:text-white",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-[#82C8E5]",
            },
          }}
        />

        {/* Back to home */}
        <Link
          href="/"
          className="mt-8 text-sm text-[#6D8196] hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
