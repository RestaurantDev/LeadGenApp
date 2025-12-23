import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { TrustBar } from "@/components/landing/trust-bar";
import { LeadPreview } from "@/components/landing/lead-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b]">
      <Navbar />
      <Hero />
      <TrustBar />
      <LeadPreview />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}
