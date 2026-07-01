"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, GraduationCap, Milestone, Code2 } from "lucide-react";

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

const timelineData: TimelineItem[] = [
  {
    title: "Computer Science Major",
    subtitle: "Polytechnic State Jember , Management Science University",
    period: "2023 - Present",
    description:
      "Deepening theoretical foundations in algorithms, data structures, database design, and modern software development practices. Maintaining a high academic standard while building self-directed applications.",
    icon: GraduationCap,
    tags: ["Data Structures", "Algorithms", "Software Engineering"],
  },
  {
    title: "Freelance Full-Stack Developer",
    subtitle: "Digital Product Creation",
    period: "2024 - Present",
    description:
      "Designing and implementing scalable, performant web applications for small businesses and clients. Specialized in writing clean, reliable code with Next.js, React, and Laravel frameworks.",
    icon: Briefcase,
    tags: ["Laravel", "Client Deliveries"],
  },
  {
    title: "Internship",
    subtitle: "Aksara Teknologi mandiri",
    period: "February 2026  - June 2026",
    description:
      "Developed microservices and RESTful APIs for a web commerce platform designed to simplify online sales transactions, payment routing, customer billing, and store performance tracking. Collaborated on frontend features using React/Next.js and backend integrations using Laravel, fixing crucial bugs and improving application performance.",
    icon: Code2,
    tags: ["Laravel", "React", "REST APIs", "Vercel", "Web Commerce", "Microservices"],
  },
];

export default function Experience() {
  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: { duration: 1.5, ease: "easeInOut" as const },
    },
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-zinc-950/20">
      {/* Background glow orb */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-accent-neon/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-none border-2 border-zinc-800 bg-zinc-950 text-xs font-mono text-accent-neon mb-4 shadow-[2px_2px_0px_0px_rgba(0,229,255,0.2)]"
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>04 // EXPERIENCE & JOURNEY</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-3xl font-retro font-bold text-white uppercase text-glow-retro"
          >
            Milestone Timeline
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10">
          {/* Vertical Timeline Tracker Line */}
          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="absolute left-[20px] md:left-[24px] top-2 bottom-2 border-l-4 border-dashed border-accent-neon/50 bg-transparent w-0"
          ></motion.div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Icon */}
                  <span className="absolute -left-[32px] md:-left-[38px] top-1.5 w-7 h-7 rounded-none bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:border-accent-neon group-hover:text-accent-neon transition-all duration-300 z-10">
                    <ItemIcon className="w-3.5 h-3.5" />
                  </span>

                  {/* Timeline Content Card */}
                  <div className="p-6 rounded-none border-2 border-zinc-800 bg-zinc-950/40 shadow-[4px_4px_0px_0px_rgba(0,229,255,0.15)] hover:border-accent-neon hover:shadow-[6px_6px_0px_0px_rgba(0,229,255,0.25)] transition-all duration-300 ml-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-accent-neon transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">{item.subtitle}</p>
                      </div>

                      {/* Period Badge */}
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-none bg-zinc-900 border-2 border-zinc-800 text-xs font-mono text-zinc-400 w-fit self-start md:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-accent-neon" />
                        <span>{item.period}</span>
                      </span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Timeline Tech/Scope tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[9px] font-mono rounded-none bg-zinc-900 text-accent-neon border-2 border-zinc-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
