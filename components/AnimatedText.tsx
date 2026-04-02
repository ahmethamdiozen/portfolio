"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

const ease = [0.33, 1, 0.68, 1] as const;

export function AnimatedWords({
  text,
  className,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.65,
              ease,
              delay: delay + i * 0.055,
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function AnimatedChars({
  text,
  className,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className ?? ""}`}>
      {chars.map((char, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -30 }}
            animate={
              inView
                ? { y: "0%", rotateX: 0 }
                : { y: "110%", rotateX: -30 }
            }
            transition={{
              duration: 0.55,
              ease,
              delay: delay + i * 0.03,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  once = true,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{
        duration: 0.7,
        ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxSection({
  children,
  className,
  speed = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50 * speed, -50 * speed]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
          y: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: "0%" } : { y: "100%" }}
        transition={{ duration: 0.7, ease, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
