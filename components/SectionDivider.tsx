"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "line" | "dot" | "gradient";
}

export default function SectionDivider({ variant = "line" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (variant === "dot") {
    return (
      <div ref={ref} className="flex justify-center py-2">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#E8E4DC]"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div ref={ref} className="relative h-16 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#E8E4DC] to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="flex justify-center">
      <motion.div
        className="w-12 h-px bg-[#E8E4DC]"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      />
    </div>
  );
}
