import type { Metadata } from "next";
import { VentureSignature } from "@/components/VentureSignature";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { MotionBoot } from "@/components/motion/MotionBoot";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2" }],
  },

  manifest: "/site.webmanifest?v=2",

  title: "FastProcure AI",
  description: "Procurement acceleration platform for enterprise AI pilots.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="premium-motion">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <MotionBoot />
        <div className="motion-nav"><SiteNav /></div>
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
      
        <VentureSignature tone="dark" variant="finance" />
      </body>
    </html>
  );
}
