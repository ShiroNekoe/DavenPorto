"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Layers,
  Server,
  Database,
  GitBranch,
  Terminal,
  Bot,
  Sparkles,
  Cpu
} from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Layers,
    skills: [
      { name: "Next.js", level: "Intermediate", icon: Code },
      { name: "React", level: "Intermediate", icon: Code },
      { name: "Tailwind CSS", level: "Intermediate", icon: Layers },
    ],
  },
  {
    title: "Backend & Database",
    icon: Server,
    skills: [
      { name: "Node.js", level: "Intermediate", icon: Server },
      { name: "Laravel", level: "Intermediate", icon: Server },
      { name: "MySQL", level: "Intermediate", icon: Database },
    ],
  },
  {
    title: "AI Partners",
    icon: Sparkles,
    skills: [
      { name: "Antigravity", level: "Active Partner", icon: Bot },
      { name: "Claude", level: "Co-Pilot", icon: Bot },
      { name: "Gemini Flash", level: "Co-Pilot", icon: Bot },
      { name: "Copilot", level: "Assistant", icon: Bot },
    ],
  },
  {
    title: "Tools & Collaboration",
    icon: Terminal,
    skills: [
      { name: "Git & GitHub", level: "Intermediate", icon: GitBranch },
    ],
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-950/20">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

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
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // TECH STACK</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-3xl font-retro font-bold text-white uppercase text-glow-retro"
          >
            Core Competencies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-500 max-w-md mx-auto mt-3 text-sm md:text-base"
          >
            Technologies I use to bring modern web interfaces and robust applications to life.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skillCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={categoryVariants}
                className="p-6 rounded-none border-2 border-zinc-800 bg-zinc-950/40 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.1)] flex flex-col justify-between hover:border-accent-neon transition-all"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 mb-6 pb-3 border-b-2 border-zinc-800">
                    <span className="p-2 rounded-none bg-zinc-900 border-2 border-zinc-800 text-accent-neon">
                      <CategoryIcon className="w-4 h-4" />
                    </span>
                    <h3 className="font-retro text-xs font-bold text-white tracking-wide uppercase">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="group p-3 rounded-none border-2 border-zinc-800 bg-zinc-950 hover:border-accent-neon hover:shadow-[3px_3px_0px_0px_rgba(0,229,255,0.2)] transition-all duration-300 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <SkillIcon className="w-4 h-4 text-zinc-500 group-hover:text-accent-neon transition-colors duration-300" />
                            <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors duration-300">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 group-hover:text-accent-neon/70 transition-colors duration-300">
                            {skill.level}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end text-zinc-600 hover:text-accent-neon/60 transition-colors cursor-pointer group/footer">
                  <span className="text-[10px] font-mono tracking-wider uppercase select-none">
                    Status: active
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
