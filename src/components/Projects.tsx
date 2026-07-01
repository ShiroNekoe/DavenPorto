"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FolderGit2, Briefcase, ShoppingBag, Gamepad2, Search, Compass, Car, Lock } from "lucide-react";

interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  playUrl?: string;
  isLocked?: boolean;
  renderThumbnail: () => React.ReactNode;
}

const projects: ProjectItem[] = [
  {
    title: "Job Application System",
    description:
      "A web-based portal designed to simplify job application processes, allowing candidates to search and apply for jobs while helping recruiters manage candidate pipelines.",
    techStack: ["PHP", "Tailwind CSS", "MySQL", "JavaScript"],
    githubUrl: "https://github.com/iniLintang/projekweb",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-indigo-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:border-indigo-400 group-hover:shadow-neon transition-all duration-300">
            <Briefcase className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Job Portal</span>
        </div>
      </div>
    ),
  },
  {
    title: "Biinscart",
    description:
      "A commerce platform designed to simplify online sales transactions, payment routing, customer billing, and store performance tracking.",
    techStack: ["React", "Laravel", "MySQL", "Inertia.js"],
    githubUrl: "https://github.com/Steggowastleft/clone-mayar",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-blue-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:border-blue-400 group-hover:shadow-neon transition-all duration-300">
            <ShoppingBag className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">E-Commerce Billing</span>
        </div>
      </div>
    ),
  },
  {
    title: "Werewolf Board Game",
    description:
      "A web-based interactive multiplayer card game of Werewolf. Features dynamic role distributions, phase tracking (night/day cycles), and room lobby management.",
    techStack: ["Next.js", "React", "Tailwind CSS", "WebSockets"],
    githubUrl: "https://github.com/ShiroNekoe/warewolf-game",
    playUrl: "https://warewolf-game.vercel.app/",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-red-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:border-red-400 group-hover:shadow-neon transition-all duration-300">
            <Gamepad2 className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Party Game</span>
        </div>
      </div>
    ),
  },
  {
    title: "Who's The Spy Game",
    description:
      "An interactive party game implementation of 'Who's the Spy?'. Manages hidden keyword assignments, round rotations, and voting mechanisms for groups.",
    techStack: ["React", "Node.js", "Tailwind CSS", "State Management"],
    githubUrl: "https://github.com/ShiroNekoe/whos-the-spy",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-amber-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:border-amber-400 group-hover:shadow-neon transition-all duration-300">
            <Search className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Group Board Game</span>
        </div>
      </div>
    ),
  },
  {
    title: "Hype Radar Analytics",
    description:
  "A comprehensive digital asset intelligence platform designed for market monitoring, trend discovery, and automated trading workflows. Integrates real-time analytics, AI-powered signal generation, and early-stage token detection within a centralized ecosystem.",
  techStack: ["Next.js", "TypeScript", "Tailwind CSS", "API Integration"],
    githubUrl: "https://github.com/ShiroNekoe/hype-radar",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-teal-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:border-teal-400 group-hover:shadow-neon transition-all duration-300">
            <Compass className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Trend Tracking</span>
        </div>
      </div>
    ),
  },
  {
    title: "RentVehicle Management",
    description:
      "An online vehicle rental booking application. Manages fleet availability, customer bookings, rental schedules, and handles digital invoice generation and validation.",
    techStack: ["PHP", "Laravel", "MySQL", "Bootstrap"],
    githubUrl: "https://github.com/ShiroNekoe/RentVehicle/",
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-zinc-950/40 to-slate-900/60 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-zinc-500/10 border border-zinc-550/20 text-zinc-400 group-hover:border-zinc-400 group-hover:shadow-neon transition-all duration-300">
            <Car className="w-10 h-10 text-glow" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Rental Management</span>
        </div>
      </div>
    ),
  },
  {
    title: "Sumber Makmur Project",
    description:
      "A full-stack trading telemetry platform currently under development, featuring a FastAPI backend and a Vite React frontend. Closed source until launch.",
    techStack: ["Python", "Sqlite", "React", "Private API"],
    githubUrl: "https://github.com/ShiroNekoe/sumber_makmur_projek",
    isLocked: true,
    renderThumbnail: () => (
      <div className="w-full h-48 bg-gradient-to-br from-yellow-950/25 to-slate-900/80 flex items-center justify-center relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 group-hover:border-amber-400 group-hover:shadow-neon transition-all duration-300">
            <Lock className="w-10 h-10 text-glow animate-pulse" />
          </span>
          <span className="mt-3 font-mono text-[10px] text-amber-500/80 uppercase tracking-widest">[ DEPLOYMENT LOCKED ]</span>
        </div>
      </div>
    ),
  },
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background">
      {/* Background neon light */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-accent-neon/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-none border-2 border-zinc-800 bg-zinc-950 text-xs font-mono text-accent-neon mb-4 shadow-[2px_2px_0px_0px_rgba(0,229,255,0.2)]"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>03 // PORTFOLIO PROJECTS</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-3xl font-retro font-bold text-white uppercase text-glow-retro"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 max-w-md mx-auto mt-3 text-sm md:text-base"
          >
            A collection of my web applications and interactive multiplayer board games.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className={`group rounded-none border-4 bg-zinc-950 overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                project.isLocked 
                  ? "border-zinc-800 shadow-[6px_6px_0px_0px_rgba(245,158,11,0.1)] hover:border-amber-500 hover:shadow-[8px_8px_0px_0px_rgba(245,158,11,0.25)]" 
                  : "border-zinc-800 shadow-[6px_6px_0px_0px_rgba(0,229,255,0.15)] hover:border-accent-neon hover:shadow-[8px_8px_0px_0px_rgba(0,229,255,0.3)] hover:-translate-y-1"
              }`}
            >
              <div>
                {project.renderThumbnail()}

                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 capitalize ${
                    project.isLocked ? "text-zinc-300 group-hover:text-amber-500" : "text-white group-hover:text-accent-neon"
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 h-20 overflow-hidden text-ellipsis line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[9px] font-mono rounded-none bg-zinc-900 text-zinc-400 border-2 border-zinc-800 group-hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 border-t-2 border-zinc-800 pt-4">
                  {project.isLocked ? (
                    <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500 py-1 select-none">
                      <Lock className="w-3.5 h-3.5 text-amber-500" />
                      <span>[ PRIVATE & UNDER DEVELOPMENT ]</span>
                    </div>
                  ) : (
                    <>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors group/link"
                      >
                        <svg className="w-3.5 h-3.5 group-hover/link:text-accent-neon transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        <span>[ CODE BASE ]</span>
                      </a>
                      
                      {project.playUrl && (
                        project.playUrl.startsWith("http") ? (
                          <a
                            href={project.playUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs font-mono text-accent-neon hover:text-white transition-colors group/link ml-auto"
                          >
                            <span className="group-hover/link:scale-110 transition-transform">🎮</span>
                            <span>[ PLAY GAME ]</span>
                          </a>
                        ) : (
                          <Link
                            href={project.playUrl}
                            className="flex items-center space-x-1 text-xs font-mono text-accent-neon hover:text-white transition-colors group/link ml-auto"
                          >
                            <span className="group-hover/link:scale-110 transition-transform">🎮</span>
                            <span>[ PLAY GAME ]</span>
                          </Link>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secret Easter Egg Link */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/shirooman"
            className="group flex items-center space-x-2 text-[10px] font-mono text-zinc-700 hover:text-accent-neon transition-colors duration-300 select-none cursor-pointer"
          >
            <span>🐾</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Play Shiroo-Man?</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
