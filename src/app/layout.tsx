import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IntentRadar | Lead Intelligence for Freelancers",
  description: "Real-time buying signals from founders actively looking for ghostwriters, video editors, and developers. Stop hunting. Start closing.",
  keywords: ["lead generation", "freelancer", "ghostwriting", "video editing", "web development", "sales intelligence"],
  openGraph: {
    title: "IntentRadar | Lead Intelligence for Freelancers",
    description: "Real-time buying signals from founders actively looking for freelancers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#0a0a0b",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${manrope.variable} ${geistMono.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
