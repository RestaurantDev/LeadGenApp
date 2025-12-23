import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Radar, Crown, Clock } from "lucide-react";
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
    <div className="min-h-screen bg-[#0a0a0b]">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0b]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center group-hover:bg-indigo-400 transition-colors">
              <Radar className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-white">IntentRadar</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Access Status */}
            {isActive ? (
              <div className="flex items-center gap-2">
                {access.isSubscription ? (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 gap-1.5">
                    <Crown className="w-3 h-3" />
                    Pro Member
                  </Badge>
                ) : (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 gap-1.5">
                    <Clock className="w-3 h-3" />
                    {access.expiresAt
                      ? getTimeRemaining(access.expiresAt)
                      : `${access.planType === "day" ? "Day" : "Week"} Pass`}
                  </Badge>
                )}
              </div>
            ) : (
              <Link href="/#pricing">
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer">
                  Get Access
                </Badge>
              </Link>
            )}

            {/* User Button */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
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
