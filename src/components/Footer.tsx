"use client";

import React from "react";
import { RefreshCw, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleReplayIntro = () => {
    localStorage.removeItem("daven_portfolio_intro_seen");
    window.location.reload();
  };

  return (
    <footer className="border-t-4 border-zinc-800 bg-zinc-950 py-12 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left Column: copyright */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-zinc-300 font-medium">
            <span>Designed & Built by Daven</span>
            <span className="text-zinc-600">|</span>
            <span className="font-mono text-zinc-400">© {currentYear}</span>
          </div>
          <p className="text-xs text-zinc-500 font-mono flex items-center justify-center md:justify-start gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500/30" />
            <span>& caffeine. All rights reserved.</span>
          </p>
        </div>

        {/* Right Column: stack details & replay trigger */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <p className="text-xs font-mono text-zinc-500">
            Powered by <span className="text-white">Next.js 15</span> &{" "}
            <span className="text-white">Tailwind CSS 4</span>
          </p>

          <button
            onClick={handleReplayIntro}
            className="retro-btn px-3 py-1.5 font-mono text-[9px] rounded-none cursor-pointer flex items-center space-x-1.5"
          >
            <RefreshCw className="w-3 h-3 transition-transform duration-500" />
            <span>[ REPLAY INTRO 🐾 ]</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
