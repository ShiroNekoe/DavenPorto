"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BgmPlayer from "@/components/BgmPlayer";

const IntroScreen = dynamic(() => import("@/components/IntroScreen"), {
  ssr: false,
});

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  // Lock scrolling while the intro screen is active to prevent user from scrolling early
  useEffect(() => {
    const seen = localStorage.getItem("daven_portfolio_intro_seen");
    if (seen === "true") {
      if (!introFinished) {
        const t = setTimeout(() => setIntroFinished(true), 0);
        return () => clearTimeout(t);
      }
      return;
    }

    if (!introFinished) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [introFinished]);

  return (
    <>
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay" />

      {/* Background Music Player */}
      <BgmPlayer />

      {/* Intro Overlay Screen with Pixel Cat Shiroo */}
      <IntroScreen onComplete={() => setIntroFinished(true)} />
      
      {/* Portfolio Main Content - Always in DOM for SEO crawlability */}
      <div 
        className={`flex flex-col min-h-screen bg-background text-foreground selection:bg-accent-neon/20 selection:text-white transition-opacity duration-1000 ${
          introFinished ? "opacity-100" : "opacity-0 pointer-events-none max-h-screen overflow-hidden"
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
