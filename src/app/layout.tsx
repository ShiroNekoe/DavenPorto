import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  variable: "--font-retro",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-retro-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daven | Computer Science & Full-Stack Web Developer",
  description: "Personal portfolio of Daven, a Computer Science student specializing in Full-Stack Web Development, Frontend & Backend architectures, and Digital Product Development.",
  keywords: ["Daven", "Portfolio", "Computer Science", "Web Developer", "Full-Stack Developer", "Laravel", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
