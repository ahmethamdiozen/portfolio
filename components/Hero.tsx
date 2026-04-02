"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useEffect } from "react";

interface HeroProps {
  locale: string;
}

const ease = [0.33, 1, 0.68, 1] as const;

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const name = t("name");

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const orb1X = useTransform(springX, [0, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [0, 1], [-30, 30]);
  const orb2X = useTransform(springX, [0, 1], [20, -20]);
  const orb2Y = useTransform(springY, [0, 1], [20, -20]);
  const orb3X = useTransform(springX, [0, 1], [-15, 15]);
  const orb3Y = useTransform(springY, [0, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="min-h-[92vh] flex items-center justify-center bg-[#FAF9F6] px-4 sm:px-6 relative overflow-hidden">
      {/* Floating gradient orbs */}
      <motion.div
        className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full opacity-[0.07] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #8B7355 0%, transparent 70%)",
          top: "10%",
          right: "10%",
          x: orb1X,
          y: orb1Y,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #9B9589 0%, transparent 70%)",
          bottom: "15%",
          left: "5%",
          x: orb2X,
          y: orb2Y,
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #E8E4DC 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          x: orb3X,
          y: orb3Y,
        }}
        animate={{
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8E4DC] to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.3, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease }}
        />
        <motion.div
          className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8E4DC] to-transparent"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.2, scaleX: 1 }}
          transition={{ duration: 1.5, delay: 1.4, ease }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Greeting */}
        <div className="overflow-hidden mb-3">
          <motion.p
            className="text-[#9B9589] text-base sm:text-lg tracking-wide"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {t("greeting")}
          </motion.p>
        </div>

        {/* Name — char by char */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[#2C2C2C] mb-4 tracking-tight leading-none">
          {name.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%", rotateX: -20 }}
                animate={{ y: "0%", rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: 0.2 + i * 0.028,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Title with accent underline */}
        <div className="overflow-hidden mb-8 relative">
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-medium text-[#8B7355]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            {t("title")}
          </motion.h2>
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#8B7355]/30 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ duration: 0.8, ease, delay: 0.9 }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg text-[#9B9589] max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed px-2 sm:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.72 }}
        >
          {t("tagline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.88 }}
        >
          <MagneticButton strength={0.35}>
            <Link
              href={`/${locale}#projects`}
              className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 bg-[#2C2C2C] text-white rounded-lg font-medium text-sm tracking-wide"
            >
              <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-[130%]">
                {t("cta_projects")}
              </span>
              <span className="absolute inset-0 flex items-center justify-center z-10 translate-y-[130%] transition-transform duration-300 group-hover:translate-y-0">
                {t("cta_projects")}
              </span>
              <span className="absolute inset-0 bg-[#8B7355] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]" />
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.35}>
            <Link
              href={`/${locale}#contact`}
              className="group inline-flex items-center justify-center px-8 py-3.5 border border-[#E8E4DC] text-[#2C2C2C] rounded-lg font-medium text-sm tracking-wide hover:border-[#8B7355] transition-colors duration-300"
            >
              <span className="transition-colors duration-300 group-hover:text-[#8B7355]">
                {t("cta_contact")}
              </span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-[#9B9589]"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[#9B9589] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
