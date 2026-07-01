"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Handle header background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.id);
          }
        },
        {
          rootMargin: "-40% 0px -50% 0px", // Detect when section occupies center of screen
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 border-b border-card-border/80 py-4 glass"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand/Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center space-x-2 group cursor-pointer"
        >
          {/* Cute logo mark */}
          <span className="w-8 h-8 rounded-none bg-accent-neon/10 flex items-center justify-center border-2 border-accent-neon/30 group-hover:border-accent-neon transition-all duration-300">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent-neon transition-transform duration-300 group-hover:scale-110"
            >
              <path
                d="M12 21c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path
                d="M12 9c-.552 0-1-.448-1-1v-2c0-.552.448-1 1-1s1 .448 1 1v2c0 .552-.448 1-1 1zM7.05 10.95c-.39-.39-.39-1.024 0-1.414l1.414-1.414c.39-.39 1.024-.39 1.414 0s.39 1.024 0 1.414l-1.414 1.414c-.39.39-1.024.39-1.414 0zM16.95 10.95l-1.414-1.414c-.39-.39-.39-1.024 0-1.414s1.024-.39 1.414 0l1.414 1.414c.39.39.39 1.024 0 1.414zM12 18c-3.309 0-6-2.691-6-6h2c0 2.206 1.794 4 4 4s4-1.794 4-4h2c0 3.309-2.691 6-6 6z"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="font-mono text-xl font-bold text-white tracking-wider group-hover:text-accent-neon transition-colors duration-300">
            DAVEN<span className="text-accent-neon">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-2 text-xs font-mono transition-colors duration-300 rounded-none hover:text-white ${
                  isActive ? "text-accent-neon font-semibold" : "text-zinc-400"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-zinc-950 border-2 border-accent-neon"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 px-4 py-2 text-[10px] font-mono text-zinc-400 hover:text-white border-2 border-zinc-800 hover:border-accent-neon rounded-none transition-all duration-300 ml-4 bg-zinc-950/20"
          >
            <span>[ RESUME ]</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-zinc-400 hover:text-white p-2 rounded-none hover:bg-zinc-900 border-2 border-zinc-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full border-t border-card-border/80 bg-background/95 mt-4 glass overflow-hidden"
          >
            <nav className="flex flex-col py-4 px-6 space-y-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`py-2 px-3 text-sm font-mono rounded-none transition-all ${
                      isActive
                        ? "bg-accent-neon text-black font-bold border-2 border-white pl-4"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white bg-zinc-950/50 rounded-none border-2 border-zinc-800 transition-colors"
              >
                <span>Download Resume</span>
                <ArrowUpRight className="w-4 h-4 text-accent-neon" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
