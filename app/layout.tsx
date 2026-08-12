import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RDX Assistant - Next-Gen AI Chatbot Platform for E-Commerce & SaaS",
  description: "Production-grade AI chatbot platform unifying integrations, RAG knowledge sources, custom models, and real-time live support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col antialiased bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
