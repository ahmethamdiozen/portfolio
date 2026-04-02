"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.33, 1, 0.68, 1] as const;

export default function AnimatedFooter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <footer ref={ref} className="border-t border-[#E8E4DC] py-8 sm:py-10 bg-[#FAF9F6] relative overflow-hidden">
      {/* Subtle gradient accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        <motion.span
          className="text-sm font-bold text-[#2C2C2C]"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          Ahmet Hamdi Özen
        </motion.span>
        <motion.span
          className="text-xs sm:text-sm text-[#9B9589] text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
        >
          © {new Date().getFullYear()} — Built with Next.js & Tailwind CSS
        </motion.span>
      </div>
    </footer>
  );
}
