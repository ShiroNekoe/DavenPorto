"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ShirooPixelCat from "@/components/ShirooPixelCat";
import { Terminal, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080b11] text-zinc-300 font-mono select-none px-6 retro-grid-bg">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay opacity-50"></div>

      {/* Retro Arcade Bezel Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full border-4 border-zinc-800 bg-[#0b0f19] p-8 shadow-[12px_12px_0px_0px_rgba(0,229,255,0.15)] relative overflow-hidden"
      >
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 text-[10px] text-zinc-700 font-bold font-mono">┌ [404]</div>
        <div className="absolute top-2 right-2 text-[10px] text-zinc-700 font-bold font-mono">[SECTOR] ┐</div>
        <div className="absolute bottom-2 left-2 text-[10px] text-zinc-700 font-bold font-mono">└ [SYSTEM]</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-zinc-700 font-bold font-mono">[LOST] ┘</div>

        {/* Dynamic Crying Shiroo */}
        <div className="flex justify-center mb-6 pt-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ShirooPixelCat sad={true} size={150} className="text-glow-cyan drop-shadow-[0_0_10px_rgba(0,229,255,0.2)]" />
          </motion.div>
        </div>

        {/* Bezel Terminal Header */}
        <div className="flex items-center space-x-3 text-accent-neon border-b-2 border-zinc-800 pb-4 mb-6">
          <Terminal className="w-5 h-5 text-accent-neon animate-pulse" />
          <h1 className="text-sm md:text-base font-bold uppercase tracking-wider text-glow-retro">
            Lost in Space (404)
          </h1>
        </div>

        {/* Diagnostic Status Box */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-black/40 border border-zinc-800/80 p-4 mb-6 text-[10px] md:text-xs text-zinc-500 font-mono">
          <div>[SECTOR] : <span className="text-accent-neon">0x000404</span></div>
          <div>[STATUS] : <span className="text-red-500 font-bold">ROUTE_LOST</span></div>
          <div>[THREAD] : <span className="text-zinc-400">UNRESOLVED</span></div>
          <div>[SHIROO] : <span className="text-zinc-400">CRYING_TEARS</span></div>
        </div>

        {/* Console Text block */}
        <div className="space-y-4 mb-8 text-xs md:text-sm leading-relaxed">
          <p className="text-zinc-300">
            Shiroo searched everywhere, but this sector does not exist or has been deleted from memory.
            <span className="inline-block w-2.5 h-4 bg-accent-neon ml-1.5 animate-pulse align-middle"></span>
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <Link
            href="/"
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#0b0f19] border-3 border-accent-neon text-accent-neon font-bold text-xs uppercase cursor-pointer hover:bg-accent-neon hover:text-black shadow-[4px_4px_0px_0px_rgba(0,229,255,0.3)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <Home className="w-4 h-4" />
            <span>[ Return to Home ]</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
