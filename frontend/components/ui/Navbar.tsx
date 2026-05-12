"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
];

export function Navbar() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200/30 dark:border-stone-800/30 shadow-sm dark:shadow-none flex justify-between items-center px-8 h-16 max-w-full mx-auto">
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.18, ease: "easeOut" }}>
        <Link
          href="/"
          className="font-inter tracking-tight"
          style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          <span className="text-green-900 dark:text-green-100">Leaf</span>
          <span style={{ color: "#22c55e" }}>Scan</span>
        </Link>
      </motion.div>

      <div className="hidden md:flex items-center gap-16 font-inter tracking-tight headline-lg">
        {navLinks.map((link) => {
          const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));

          return (
            <Link
              key={link.path}
              href={link.path}
              onMouseEnter={() => setHoveredPath(link.path)}
              onMouseLeave={() => setHoveredPath(null)}
              className="relative px-2 py-1 transition-colors duration-300"
            >
              <span
                className={`relative z-10 transition-colors duration-300 ${isActive
                  ? "text-[#22c55e] font-semibold"
                  : "text-stone-600 dark:text-stone-400 hover:text-[#22c55e]"
                  }`}
              >
                {link.name}
              </span>

              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#22c55e]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {!isActive && hoveredPath === link.path && (
                <motion.div
                  layoutId="navbar-hover"
                  className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#22c55e]/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      <div className="w-[84px]"></div>
    </nav>
  );
}
