import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Theory of Change | Technical Challenge",
  description:
    "Mini Theory of Change application built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Technical challenge for full-stack developer position.",
  keywords: [
    "Theory of Change",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Technical Challenge",
    "Frontend Development",
  ],
  authors: [
    {
      name: "Reisel Valle Rojas",
      url: "https://rey-portfolio-phi.vercel.app/",
    },
  ],
  creator: "Technical Assessment",
  openGraph: {
    title: "Theory of Change | Technical Challenge",
    description:
      "Mini Theory of Change application - Technical assessment for developer position",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="min-h-screen py-4">{children}</div>
        <Toaster
          toastOptions={{
            style: {
              background: "#fff",
              color: "#7e1e9b",
              border: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
