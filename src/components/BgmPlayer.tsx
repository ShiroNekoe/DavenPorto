"use client";

import React, { useEffect, useState, useRef } from "react";

export default function BgmPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle play/pause state
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem("daven_portfolio_bgm_enabled", "false");
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        localStorage.setItem("daven_portfolio_bgm_enabled", "true");
      }).catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  // Sync state on mount and register first-interaction listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set comfortable background volume (0.25 = 25%)
    audio.volume = 0.25;

    const savedSetting = localStorage.getItem("daven_portfolio_bgm_enabled");
    
    // Sync UI state to avoid hydration mismatch by deferring to next tick
    if (savedSetting === "false") {
      setTimeout(() => setIsPlaying(false), 0);
    }

    const handleFirstInteraction = () => {
      const currentSetting = localStorage.getItem("daven_portfolio_bgm_enabled");
      // Auto-play if it was previously enabled or if it's the first time visiting
      if (currentSetting === "true" || currentSetting === null) {
        audio.play().then(() => {
          setIsPlaying(true);
          localStorage.setItem("daven_portfolio_bgm_enabled", "true");
        }).catch((err) => {
          console.warn("Autoplay prevented by browser security. Playback will resume on button click.", err);
        });
      }

      // Clean up event listeners once the user interacts with the document
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("pointerdown", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center select-none font-mono group">
      {/* Hidden HTML5 audio element loading the user's music file */}
      <audio ref={audioRef} src="/bgmmusic.weba" loop />

      {/* Retro HUD Hover Tooltip */}
      <div className="absolute bottom-full mb-3 right-0 hidden group-hover:block bg-zinc-950 border-2 border-zinc-800 text-[10px] text-zinc-300 font-mono py-1.5 px-2.5 uppercase whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(0,229,255,0.25)] select-none">
        BGM: {isPlaying ? "PLAYING" : "MUTED"}
      </div>

      {/* Vinyl Player Container */}
      <div 
        onClick={togglePlay}
        className="relative w-16 h-16 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {/* Background base plate */}
        <div className="absolute inset-0 bg-zinc-900 border-2 border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] rounded-none"></div>

        {/* 1. Rotating Vinyl Record Disk */}
        <svg 
          className={`absolute w-12 h-12 transition-transform select-none ${
            isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
          }`}
          viewBox="0 0 64 64" 
          fill="none"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Main vinyl circle */}
          <circle cx="32" cy="32" r="28" fill="#141416" stroke="#000000" strokeWidth="2.5" />
          
          {/* Groove Rings (Stepped concentric dashes) */}
          <circle cx="32" cy="32" r="23" fill="none" stroke="#27272a" strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#27272a" strokeWidth="1.2" strokeDasharray="4 3" />
          <circle cx="32" cy="32" r="13" fill="none" stroke="#3f3f46" strokeWidth="1" />

          {/* Vinyl Shine highlights (simulating reflection lines) */}
          <path d="M12,12 L22,22 M52,52 L42,42" stroke="#27272a" strokeWidth="1.5" strokeLinecap="round" />

          {/* Cyan Center Label */}
          <circle cx="32" cy="32" r="7" fill="#00e5ff" />
          <circle cx="32" cy="32" r="5" fill="#0088ff" opacity="0.3" />
          
          {/* Center spindle hole */}
          <circle cx="32" cy="32" r="2" fill="#09090b" />
        </svg>

        {/* 2. Static / Swinging Tonearm (Stylus) */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-500 origin-[52px_12px]"
          style={{ 
            transform: isPlaying ? "rotate(20deg)" : "rotate(0deg)"
          }}
          viewBox="0 0 64 64" 
          fill="none"
        >
          {/* Pivot Base Mount */}
          <circle cx="52" cy="12" r="4.5" fill="#3f3f46" stroke="#18181b" strokeWidth="1.5" />
          <circle cx="52" cy="12" r="1.5" fill="#18181b" />

          {/* Metal arm stem (Stepped blocky path for retro vibe) */}
          <path 
            d="M 52 12 H 44 V 36 L 38 40" 
            stroke="#d4d4d8" 
            strokeWidth="2" 
            strokeLinecap="square" 
            strokeLinejoin="miter" 
          />

          {/* Headshell / Needle cartridge */}
          <rect x="35" y="38" width="6" height="4" fill="#18181b" stroke="#00e5ff" strokeWidth="1" />
          <circle cx="38" cy="40" r="0.8" fill="#00e5ff" />
        </svg>

        {/* 3. Small Status LED indicator in the player corner */}
        <div className="absolute top-1.5 left-1.5 flex h-1.5 w-1.5">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isPlaying ? "animate-ping bg-accent-neon" : "bg-zinc-700"
          }`}></span>
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
            isPlaying ? "bg-accent-neon" : "bg-zinc-700"
          }`}></span>
        </div>
      </div>
    </div>
  );
}
