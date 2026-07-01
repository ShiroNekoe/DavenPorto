"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Terminal, Cpu, HardDrive, Activity } from "lucide-react";
import ShirooPixelCat from "./ShirooPixelCat";

const shirooQuotes = {
  default: "Meow! Welcome to Daven's space! Let's explore!",
  hover: [
    "Need a modern web application? Daven is your guy!",
    "npm run coffee --extra-caffeine ☕",
    "git commit -m 'fixed bugs' and hope for the best!",
    "Need clean, scalable code? Let's build something amazing!",
    "Shiroo.exe is running at 100% cuteness!",
    "Did you know Daven loves clean, pixel-perfect UI?",
  ],
  click: [
    "Ouch! Don't click me too hard! 🐾",
    "Hahaha, that tickles! 😸 More clicks please!",
    "Error 404: Cat.exe has stopped responding... Just kidding!",
    "Beep boop, you found a secret! Go view Daven's projects below!",
    "Aww, now you've clicked me too much. Time to hire Daven! 🥺", // triggers sad
    "Yay! Back to business! Let's build something awesome!", // resets sad
  ]
};

interface SystemMetricsConsoleProps {
  logs: string[];
}

function SystemMetricsConsole({ logs }: SystemMetricsConsoleProps) {
  const [cpuLoad, setCpuLoad] = useState(12);
  const [ramUsage, setRamUsage] = useState(4.7);
  const [temp, setTemp] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const next = prev + delta;
        return Math.max(8, Math.min(25, next));
      });
      setRamUsage((prev) => {
        const delta = Number((Math.random() * 0.2 - 0.1).toFixed(1)); // -0.1 to +0.1
        const next = Number((prev + delta).toFixed(1));
        return Math.max(4.5, Math.min(5.2, next));
      });
      setTemp((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const next = prev + delta;
        return Math.max(40, Math.min(45, next));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-zinc-900/60 border border-zinc-800 p-3 font-mono text-[10px] text-zinc-400 space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-1">
          <Cpu className="w-3 h-3 text-accent-neon" />
          <span>CPU: {cpuLoad}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <HardDrive className="w-3 h-3 text-accent-neon" />
          <span>RAM: {ramUsage}G</span>
        </div>
        <div className="flex items-center space-x-1">
          <Activity className="w-3 h-3 text-accent-neon animate-pulse" />
          <span>TEMP: {temp}°C</span>
        </div>
      </div>

      {/* Progress Bar (Visual CPU load) */}
      <div className="w-full h-2 bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden flex">
        <div 
          className="bg-accent-neon transition-all duration-500 ease-out" 
          style={{ width: `${(cpuLoad / 25) * 100}%` }}
        ></div>
      </div>

      {/* Dynamic Terminal Activity Logs */}
      <div className="border-t border-zinc-800/80 pt-2 space-y-1">
        <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-wider mb-1">TERMINAL LOGS:</div>
        {logs.map((log, idx) => (
          <div key={idx} className="truncate text-[9px] text-zinc-500 leading-tight">
            &gt; {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  
  // Shiroo states
  const [shirooSad, setShirooSad] = useState(false);
  const [shirooTalking, setShirooTalking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState(shirooQuotes.default);

  const [logs, setLogs] = useState<string[]>([
    "Initializing SHIROO_OS v1.2...",
    "Connected to portfolio_db... OK",
    "Daven profile loaded successfully.",
  ]);

  // Typing effect on mount
  useEffect(() => {
    const welcomeString = `console.log("Welcome to my digital space!");`;
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(welcomeString.substring(0, index));
      index++;
      if (index > welcomeString.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);



  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, `[${time}] ${message}`].slice(-4)); // keep last 4 logs
  };

  // Hover handlers
  const handleShirooHoverStart = () => {
    setIsHovered(true);
    addLog("USER_EVENT: HOVER_SHIROO");
    if (!shirooSad) {
      setShirooTalking(true);
      const randomHoverQuote = shirooQuotes.hover[Math.floor(Math.random() * shirooQuotes.hover.length)];
      setSpeechBubble(randomHoverQuote);
    }
  };

  const handleShirooHoverEnd = () => {
    setIsHovered(false);
    setShirooTalking(false);
    if (!shirooSad) {
      setSpeechBubble(shirooQuotes.default);
    }
  };

  // Click handler
  const handleShirooClick = () => {
    if (isJumping) return;
    setIsJumping(true);
    const nextClickCount = clickCount + 1;
    setClickCount(nextClickCount);
    addLog(`USER_EVENT: CLICK_SHIROO (#${nextClickCount})`);

    // Jump animation trigger
    setTimeout(() => setIsJumping(false), 500);

    // Determine reaction quote
    let nextQuote = "";
    if (nextClickCount === 5) {
      setShirooSad(true);
      setShirooTalking(false);
      nextQuote = shirooQuotes.click[4]; // Sad quote
      addLog("SYS_WARN: SHIROO_SAD_PROTOCOL_ON");
    } else if (nextClickCount === 6) {
      setShirooSad(false);
      setShirooTalking(true);
      setClickCount(0); // Reset clicks
      nextQuote = shirooQuotes.click[5]; // Recover quote
      addLog("SYS_INFO: SHIROO_OS_STABILIZED");
      setTimeout(() => setShirooTalking(false), 2000);
    } else {
      setShirooTalking(true);
      // Pick quote matching index (or random if exceeding)
      const quoteIndex = (nextClickCount - 1) % shirooQuotes.click.length;
      nextQuote = shirooQuotes.click[quoteIndex];
      setTimeout(() => setShirooTalking(false), 1800);
    }
    
    setSpeechBubble(nextQuote);
  };

  const scrollToSection = (id: string) => {
    addLog(`USER_EVENT: NAVIGATE_TO_${id.toUpperCase()}`);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-background"
    >
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,229,255,0.06),rgba(255,255,255,0))] pointer-events-none"></div>
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_75%,transparent_100%)] pointer-events-none"></div>

      {/* Floating Neon Blue Blurry Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-neon/5 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Profile Info & Commands */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 border-2 border-zinc-800 bg-zinc-950/90 text-xs font-mono text-zinc-300 mb-6 hover:border-accent-neon transition-colors duration-300 shadow-[3px_3px_0px_0px_rgba(0,229,255,0.2)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-neon"></span>
              </span>
              <span className="tracking-widest font-bold">SYSTEM // ONLINE</span>
            </motion.div>

            {/* Simulated Console Entry */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center space-x-2 text-accent-neon font-mono text-xs md:text-sm mb-4 bg-zinc-950/60 py-1.5 px-3 border border-zinc-900"
            >
              <Terminal className="w-3.5 h-3.5 text-accent-neon animate-pulse" />
              <span className="text-zinc-500 font-bold">daven@portfolio:~$</span>
              <span className="text-accent-neon tracking-wide">{typedText}</span>
              <span className="w-1.5 h-3.5 bg-accent-neon animate-pulse inline-block"></span>
            </motion.div>

            {/* Name Title with Pixel Deco */}
            <div className="relative mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="select-none leading-none uppercase font-retro font-bold text-5xl sm:text-7xl md:text-8xl text-accent-neon text-glow-retro tracking-wider"
              >
                Daven
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-[3px] bg-accent-neon w-2/3 origin-left mt-1.5"
              />
            </div>

            {/* Structured Subtitle Badge Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mb-8 max-w-xl"
            >
              <span className="px-3 py-1 bg-zinc-950 text-white font-mono text-xs border-2 border-zinc-800 hover:border-accent-neon transition-colors select-none">
                [ 💻 Full-Stack Dev ]
              </span>
              <span className="px-3 py-1 bg-zinc-950 text-white font-mono text-xs border-2 border-zinc-800 hover:border-accent-neon transition-colors select-none">
                [ 🎨 Frontend Eng ]
              </span>
              <span className="px-3 py-1 bg-zinc-950 text-white font-mono text-xs border-2 border-zinc-800 hover:border-accent-neon transition-colors select-none">
                [ ⚙️ Backend & APIs ]
              </span>
              <span className="px-3 py-1 bg-zinc-950 text-white font-mono text-xs border-2 border-zinc-800 hover:border-accent-neon transition-colors select-none">
                [ 🎓 CS Student ]
              </span>
            </motion.div>

            {/* Core Bio Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-2xl bg-zinc-950 border-3 border-zinc-800 p-5 font-mono text-xs sm:text-sm text-zinc-400 mb-10 shadow-[6px_6px_0px_0px_#09090b] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-zinc-900 border-l border-b border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-500 uppercase select-none">
                daven_bio.bin
              </div>
              <p className="leading-relaxed mb-3">
                &gt; <span className="text-white font-bold">INFO:</span> I build high-performance web applications, combining robust backend services with modern responsive frontends to deliver exceptional user experiences.
              </p>
              <p className="leading-relaxed">
                &gt; <span className="text-accent-neon">INTERESTS:</span> Full-Stack Development, API Architecture, Database Optimizations, and Scalable Web Architectures.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="retro-btn-solid group px-8 py-3.5 font-mono cursor-pointer flex items-center justify-center space-x-2 w-full sm:w-auto outline-none"
              >
                <span>[ VIEW PROJECTS ]</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => scrollToSection("contact")}
                className="retro-btn px-8 py-3.5 font-mono cursor-pointer w-full sm:w-auto outline-none"
              >
                [ CONTACT ME ]
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Cyberdeck Console featuring Shiroo Cat */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-md bg-zinc-950 border-3 border-zinc-800 shadow-[8px_8px_0px_0px_rgba(0,229,255,0.15)] hover:shadow-[10px_10px_0px_0px_rgba(0,229,255,0.3)] transition-all duration-300 relative overflow-hidden"
            >
              
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b-3 border-zinc-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 bg-accent-neon rounded-none shadow-[0_0_8px_rgba(0,229,255,0.8)]"></div>
                  <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest">SHIROO_CONSOLE.EXE</span>
                </div>
                <div className="flex space-x-1.5 font-mono text-[10px] font-bold text-zinc-500 select-none">
                  <span>[_]</span>
                  <span>[▢]</span>
                  <span className="hover:text-red-500 cursor-pointer transition-colors" onClick={() => {
                    setShirooSad(true);
                    setSpeechBubble("Hey! Why did you close me? 😿");
                    addLog("SYS_WARN: SHIROO_CONSOLE_FORCE_CLOSED");
                  }}>[X]</span>
                </div>
              </div>

              {/* Console Workspace */}
              <div className="p-5 flex flex-col items-center bg-zinc-950/40 min-h-[350px]">
                
                {/* Speech Bubble Area */}
                <div className="w-full min-h-[70px] mb-4 relative flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={speechBubble}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-zinc-900 border-2 border-accent-neon text-zinc-100 font-mono text-xs p-3 text-center relative rounded-none shadow-[3px_3px_0px_0px_rgba(0,229,255,0.15)]"
                    >
                      {speechBubble}
                      {/* Speech Bubble Arrow */}
                      <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-accent-neon"></div>
                      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-zinc-900"></div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Shiroo Pixel Cat Rendering */}
                <motion.div
                  animate={isJumping ? { y: [-20, 10, -20, 0], scaleY: [1.1, 0.85, 1.05, 1] } : {}}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onMouseEnter={handleShirooHoverStart}
                  onMouseLeave={handleShirooHoverEnd}
                  onClick={handleShirooClick}
                  className="cursor-pointer relative group flex items-center justify-center p-2 mb-4"
                >
                  {/* Subtle Radar Ripple Glow */}
                  <div className="absolute inset-0 rounded-full border border-accent-neon/10 group-hover:border-accent-neon/30 scale-110 pointer-events-none transition-all duration-300"></div>
                  
                  <ShirooPixelCat
                    size={144}
                    sad={shirooSad}
                    talking={shirooTalking}
                    className={`transition-all duration-300 ${isHovered ? "drop-shadow-[0_0_12px_rgba(0,229,255,0.4)]" : ""}`}
                  />
                </motion.div>

                {/* Action / Interaction Tip */}
                <div className="text-[10px] text-zinc-500 font-mono select-none mb-6">
                  [ Hover to Chat | Click to Tickle ]
                </div>

                {/* Cyberdeck System Metrics */}
                <SystemMetricsConsole logs={logs} />

              </div>

            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 tracking-wider mb-2 select-none">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-none border-2 border-zinc-700 group-hover:border-zinc-500 flex justify-center pt-1.5"
        >
          <motion.div className="w-1 h-2 bg-accent-neon text-glow"></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
