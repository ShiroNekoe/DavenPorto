"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Cpu, Sparkles, Terminal } from "lucide-react";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle background light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent-neon/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-none border-2 border-zinc-800 bg-zinc-950 text-xs font-mono text-accent-neon mb-4 shadow-[2px_2px_0px_0px_rgba(0,229,255,0.2)]"
          >
            <User className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-3xl font-retro font-bold text-white uppercase text-glow-retro"
          >
            My Story & Focus
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Column 1: Story Text */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <h3 className="text-xl md:text-2xl font-semibold text-zinc-100 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-accent-neon" />
              <span>Crafting Modern & High-Performance Web Apps</span>
            </h3>
            
            <p className="text-zinc-400 leading-relaxed">
              I am a Computer Science student with a deep-seated passion for constructing efficient, developer-friendly web applications and robust digital products. I believe in software that solves actual problems, with clean code under the hood and an intuitive experience on top.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              My core interests lie in **Full-Stack Web Development**. I specialize in creating responsive frontends and highly performant backend architectures, utilizing modern frameworks like Next.js, React, and Laravel to build clean, secure, and user-centric web applications.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Whether building an e-learning platform, e-commerce applications, or custom SaaS solutions, I prioritize speed, accessibility, and neat design. I&apos;m always looking for ways to optimize database queries, construct clean APIs, and create beautiful user experiences.
            </p>

            {/* Micro Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-none border-2 border-zinc-800 bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.15)] hover:border-accent-neon transition-all">
                <Cpu className="w-5 h-5 text-accent-neon mb-2" />
                <h4 className="font-retro text-xs text-white font-bold mb-2 uppercase">Frontend Engineering</h4>
                <p className="text-xs text-zinc-400">Crafting beautiful, responsive, and interactive user interfaces using React, Next.js, and modern styling.</p>
              </div>
              <div className="p-4 rounded-none border-2 border-zinc-800 bg-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.15)] hover:border-accent-neon transition-all">
                <Terminal className="w-5 h-5 text-accent-neon mb-2" />
                <h4 className="font-retro text-xs text-white font-bold mb-2 uppercase">Backend & Database</h4>
                <p className="text-xs text-zinc-400">Designing clean API architectures, managing server logic, and optimizing database schemas with Laravel or Node.js.</p>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Code Window Mockup */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 w-full font-mono text-xs sm:text-sm text-zinc-300"
          >
            <div className="rounded-none border-4 border-zinc-800 bg-zinc-950 shadow-[6px_6px_0px_0px_rgba(0,229,255,0.2)] overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b-4 border-zinc-800">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-none bg-rose-500/80"></span>
                  <span className="w-3 h-3 rounded-none bg-amber-500/80"></span>
                  <span className="w-3 h-3 rounded-none bg-emerald-500/80"></span>
                </div>
                <div className="text-[10px] text-zinc-500 select-none font-mono font-bold">daven.json</div>
                <div className="w-12"></div> {/* spacing */}
              </div>

              <div className="p-5 overflow-x-auto leading-relaxed select-text bg-zinc-950/30">
                <pre className="text-zinc-400">
                  <span className="text-zinc-500">1</span>{" "}
                  <span className="text-accent-neon">const</span> profile ={" "}
                  <span className="text-white">&#123;</span>
                  {"\n"}
                  <span className="text-zinc-500">2</span>   name:{" "}
                  <span className="text-amber-300">{'"Daven Al Khalwarizmy"'}</span>,{"\n"}
                  <span className="text-zinc-500">3</span>   education:{" "}
                  <span className="text-amber-300">{'"Computer Science"'}</span>,{"\n"}
                  <span className="text-zinc-500">4</span>   skills: <span className="text-zinc-500">[</span>
                  {"\n"}
                  <span className="text-zinc-500">5</span>     <span className="text-amber-300">{'"Frontend Engineering"'}</span>,{"\n"}
                  <span className="text-zinc-500">6</span>     <span className="text-amber-300">{'"Backend Development"'}</span>,{"\n"}
                  <span className="text-zinc-500">7</span>     <span className="text-amber-300">{'"Database Design"'}</span>,{"\n"}
                  <span className="text-zinc-500">8</span>     <span className="text-amber-300">{'"API Architecture"'}</span>{"\n"}
                  <span className="text-zinc-500">9</span>   <span className="text-zinc-500">]</span>,{"\n"}
                  <span className="text-zinc-500">10</span>  loves: <span className="text-zinc-500">[</span>
                  {"\n"}
                  <span className="text-zinc-500">11</span>    <span className="text-amber-300">{'"Clean Architecture"'}</span>,{"\n"}
                  <span className="text-zinc-500">12</span>    <span className="text-amber-300">{'"Cats 🐾"'}</span>,{"\n"}
                  <span className="text-zinc-500">13</span>    <span className="text-amber-300">{'"VibeCoder"'}</span>{"\n"}
                  <span className="text-zinc-500">14</span>    <span className="text-amber-300">{'"Optimized DBs"'}</span>{"\n"}
                  <span className="text-zinc-500">15</span>  <span className="text-zinc-500">]</span>,{"\n"}
                  <span className="text-zinc-500">16</span>  status:{" "}
                  <span className="text-emerald-400">{'"Building neat tools"'}</span>{"\n"}
                  <span className="text-zinc-500">17</span> <span className="text-white">&#125;</span>;
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
