import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { RadarIcon, CrownIcon, TimerIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { getUserAccess, getTimeRemaining } from "@/lib/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const access = await getUserAccess();

  const isActive = access.status === "active";

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-md border-b border-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0047AB] to-[#000080] flex items-center justify-center group-hover:from-[#0055cc] group-hover:to-[#0047AB] transition-all shadow-lg shadow-[#0047AB]/20">
              <RadarIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">
              Intent<span className="text-[#82C8E5]">Radar</span>
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Access Status */}
            {isActive ? (
              <div className="flex items-center gap-2">
                {access.isSubscription ? (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1.5">
                    <CrownIcon className="w-3 h-3" />
                    Pro Member
                  </Badge>
                ) : (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 gap-1.5">
                    <TimerIcon className="w-3 h-3" />
                    {access.expiresAt
                      ? getTimeRemaining(access.expiresAt)
                      : `${access.planType === "day" ? "Day" : "Week"} Pass`}
                  </Badge>
                )}
              </div>
            ) : (
              <Link href="/#pricing">
                <Badge className="bg-[#0047AB]/10 text-[#82C8E5] border-[#0047AB]/20 hover:bg-[#0047AB]/20 transition-colors cursor-pointer">
                  Get Access
                </Badge>
              </Link>
            )}

            {/* User Button */}
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
