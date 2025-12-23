import { SignIn } from "@clerk/nextjs";
import { Radar } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-400 transition-colors">
          <Radar className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-semibold text-white">IntentRadar</span>
      </Link>

      {/* Clerk Sign In Component */}
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-zinc-400",
            socialButtonsBlockButton:
              "bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700",
            socialButtonsBlockButtonText: "text-white",
            dividerLine: "bg-zinc-700",
            dividerText: "text-zinc-500",
            formFieldLabel: "text-zinc-300",
            formFieldInput:
              "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500",
            formButtonPrimary:
              "bg-indigo-500 hover:bg-indigo-400 text-white",
            footerActionLink: "text-indigo-400 hover:text-indigo-300",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-indigo-400",
          },
        }}
      />

      {/* Back to home */}
      <Link
        href="/"
        className="mt-8 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  );
}

