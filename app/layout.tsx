import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cypherdon One — Enterprise AI Governance Platform",
  description:
    "Secure every AI decision. Enterprise-grade governance, PII detection, prompt injection protection, and auditable AI Security Passports for your organization.",
  keywords: [
    "AI Governance",
    "Enterprise AI Security",
    "PII Detection",
    "Prompt Injection",
    "AI Trust Score",
    "Security Passport",
    "Konsole",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
