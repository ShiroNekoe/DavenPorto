"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ShirooPixelCat from "@/components/ShirooPixelCat";
import { Skull, RotateCcw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080b11] text-zinc-300 font-mono select-none px-6 retro-grid-bg">
      {/* CRT Scanline Overlay */}
      <div className="crt-overlay opacity-50"></div>

      {/* Retro Arcade Bezel Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full border-4 border-red-950 bg-[#0b0f19] p-8 shadow-[12px_12px_0px_0px_rgba(239,68,68,0.15)] relative overflow-hidden"
      >
        {/* Glow background accent */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-red-900/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 text-[10px] text-red-800 font-bold font-mono">┌ [ERR_500]</div>
        <div className="absolute top-2 right-2 text-[10px] text-red-800 font-bold font-mono">[FATAL] ┐</div>
        <div className="absolute bottom-2 left-2 text-[10px] text-red-800 font-bold font-mono">└ [SYSTEM]</div>
        <div className="absolute bottom-2 right-2 text-[10px] text-red-800 font-bold font-mono">[CRASH] ┘</div>

        {/* Dynamic Crying Shiroo */}
        <div className="flex justify-center mb-6 pt-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <ShirooPixelCat sad={true} size={150} className="drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]" />
          </motion.div>
        </div>

        {/* Bezel Terminal Header */}
        <div className="flex items-center space-x-3 text-red-500 border-b-2 border-red-950 pb-4 mb-6">
          <Skull className="w-5 h-5 text-red-500 animate-pulse" />
          <h1 className="text-sm md:text-base font-bold uppercase tracking-wider text-shadow-[2px_2px_0px_rgba(239,68,68,0.3)]">
            System Error (500)
          </h1>
        </div>

        {/* Diagnostic Status Box */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-black/40 border border-red-950/40 p-4 mb-6 text-[10px] md:text-xs text-red-700/80 font-mono">
          <div>[SECTOR] : <span className="text-red-500">0x000500</span></div>
          <div>[STATUS] : <span className="text-red-600 font-bold">FATAL_CRASH</span></div>
          <div>[THREAD] : <span className="text-zinc-500">CRITICAL_ERR</span></div>
          <div>[SHIROO] : <span className="text-zinc-500">CRYING_TEARS</span></div>
        </div>

        {/* Exception Message Block */}
        <div className="space-y-4 mb-8 text-xs md:text-sm">
          <div>
            <span className="text-red-500 font-bold">CRITICAL_MSG: </span>
            <span className="text-zinc-400">An unexpected application exception occurred.</span>
          </div>
          {error.digest && (
            <div>
              <span className="text-zinc-500">DIGEST_ID: </span>
              <span className="text-zinc-400 font-bold font-mono">{error.digest}</span>
            </div>
          )}
          <div className="bg-red-950/20 border border-red-900/30 p-3 text-red-400 font-mono text-[11px] break-all max-h-24 overflow-y-auto">
            {error.message || "Unknown Runtime Exception"}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => reset()}
            className="flex items-center space-x-2 px-6 py-2.5 bg-[#0b0f19] border-3 border-red-500 text-red-400 font-bold text-xs uppercase cursor-pointer hover:bg-red-500 hover:text-black shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>[ Reboot System ]</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
