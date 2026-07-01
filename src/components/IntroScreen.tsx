"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShirooPixelCat from "./ShirooPixelCat";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [catStage, setCatStage] = useState<
    "walking-in" | "greeting" | "intro-daven" | "ready" | "walking-out" | "fade-out"
  >("walking-in");
  
  const [warpActive, setWarpActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Check localStorage and handle mounting on mount only
  useEffect(() => {
    const seen = localStorage.getItem("daven_portfolio_intro_seen");
    if (seen === "true") {
      const t = setTimeout(() => {
        setShowIntro(false);
        onComplete();
      }, 0);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle stage transitions
  useEffect(() => {
    if (!showIntro) return;

    if (catStage === "walking-in") {
      // Fade in for 2 seconds
      const timer = setTimeout(() => {
        setCatStage("greeting");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (catStage === "greeting") {
      // Show greeting text, then move to next text after 2.2 seconds
      const timer = setTimeout(() => {
        setCatStage("intro-daven");
      }, 2200);
      return () => clearTimeout(timer);
    }

    if (catStage === "intro-daven") {
      // Show daven text, then show button after 2.5 seconds
      const timer = setTimeout(() => {
        setCatStage("ready");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [catStage, showIntro]);

  // ASCII Starfield Animation Loop
  useEffect(() => {
    if (!showIntro) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let centerX = width / 2;
    let centerY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
    };
    window.addEventListener("resize", handleResize);

    // Star configuration
    const numStars = 160;
    const maxDepth = 1000;
    const fov = 260; // 3D projection scaling factor

    interface Star {
      x: number;
      y: number;
      z: number;
      char: string;
      color: string;
    }

    const stars: Star[] = [];
    const chars = [".", "*", "+", "o", "x", "O"];
    // Cyberpunk/neon space palette
    const colors = ["#00e5ff", "#0088ff", "#ffffff", "#8b5cf6", "#00ffd5"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * maxDepth,
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let baseSpeed = 1.6;
    let speedFactor = 1.0;

    const animate = () => {
      // Clear with alpha to create retro motion trailing trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
      ctx.fillRect(0, 0, width, height);

      // Accelerate starfield during warp speed transition
      if (warpActive) {
        speedFactor = Math.min(speedFactor * 1.13, 38);
        baseSpeed = 3.0;
      }

      stars.forEach((star) => {
        const prevZ = star.z;
        star.z -= baseSpeed * speedFactor;

        // Reset star if it passes the camera or goes out of bounds
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          return;
        }

        // Project 3D coordinate to 2D screen coordinate
        const k = fov / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        // If coordinates lie outside bounds, skip drawing but wrap them eventually
        if (px < 0 || px > width || py < 0 || py > height) {
          return;
        }

        if (warpActive && speedFactor > 4) {
          // Draw hyper-drive stretch lines
          const prevK = fov / prevZ;
          const prevPx = star.x * prevK + centerX;
          const prevPy = star.y * prevK + centerY;

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = (1 - star.z / maxDepth) * 3 + 0.6;
          ctx.stroke();
        } else {
          // Draw standard ASCII stars
          const size = (1 - star.z / maxDepth) * 11 + 5;
          ctx.font = `${size}px monospace`;
          ctx.fillStyle = star.color;
          ctx.fillText(star.char, px, py);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [warpActive, showIntro]);

  const handleEnterPortfolio = () => {
    setCatStage("walking-out");
    setWarpActive(true); // Trigger space warp!
    
    // Zoom/stretch warp speed for 1.4 seconds before fading out completely
    setTimeout(() => {
      setCatStage("fade-out");
      setTimeout(() => {
        localStorage.setItem("daven_portfolio_intro_seen", "true");
        setShowIntro(false);
        onComplete();
      }, 600);
    }, 1400);
  };

  if (!showIntro) {
    return null;
  }

  // Animation variants
  const screenVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6, ease: "easeInOut" as const } },
  };

  const catVariants = {
    "walking-in": {
      scale: 0.7,
      opacity: 0,
    },
    greeting: {
      scale: 1.0,
      opacity: 1,
      y: [0, -6, 0],
      transition: {
        scale: { duration: 1.2, ease: "easeOut" as const },
        opacity: { duration: 1.2, ease: "easeOut" as const },
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut" as const,
        },
      },
    },
    "intro-daven": {
      scale: 1.0,
      opacity: 1,
      y: [0, -6, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut" as const,
        },
      },
    },
    ready: {
      scale: 1.0,
      opacity: 1,
      y: [0, -6, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut" as const,
        },
      },
    },
    "walking-out": {
      scale: 0.45,
      opacity: 0,
      transition: { duration: 1.2, ease: "easeIn" as const },
    },
    "fade-out": {
      scale: 0,
      opacity: 0,
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <AnimatePresence>
      {catStage !== "fade-out" && (
        <motion.div
          variants={screenVariants}
          initial="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
          {/* ASCII Starfield canvas background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ mixBlendMode: "screen" }}
          />

          {/* Shiroo Container */}
          <div className="relative flex flex-col items-center justify-center min-h-[300px] z-10">
            <motion.div
              variants={catVariants}
              animate={catStage}
              initial="walking-in"
              className="flex justify-center"
            >
              <ShirooPixelCat
                talking={catStage === "greeting" || catStage === "intro-daven"}
                size={160}
                className="text-glow animate-pulse-subtle"
              />
            </motion.div>

            {/* Speeches & Texts */}
            <div className="h-28 mt-8 flex flex-col items-center justify-center text-center px-6">
              <AnimatePresence mode="wait">
                {(catStage === "greeting" ||
                  catStage === "intro-daven" ||
                  catStage === "ready") && (
                  <motion.p
                    key="text1"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-xl md:text-2xl font-semibold text-zinc-100 font-mono tracking-wide"
                  >
                    Halo, aku Shiroo.
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="h-4"></div>

              <AnimatePresence mode="wait">
                {(catStage === "intro-daven" || catStage === "ready") && (
                  <motion.p
                    key="text2"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-lg md:text-xl text-zinc-400 font-mono"
                  >
                    Aku akan mengenalkanmu ke Daven.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Enter Portfolio CTA */}
            <div className="h-16 mt-6">
              <AnimatePresence>
                {catStage === "ready" && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnterPortfolio}
                    className="px-8 py-3 bg-zinc-950 border-2 border-accent-neon text-accent-neon font-mono rounded-none cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,229,255,0.35)] hover:bg-accent-neon hover:text-black transition-all duration-300 outline-none select-none"
                  >
                    [ Enter Portfolio ]
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Skip button in top right */}
          <button
            onClick={() => {
              localStorage.setItem("daven_portfolio_intro_seen", "true");
              setShowIntro(false);
              onComplete();
            }}
            className="absolute top-6 right-6 text-zinc-500 hover:text-zinc-300 text-xs font-mono border border-zinc-800 hover:border-zinc-600 rounded-none px-2.5 py-1 transition-colors z-20"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
