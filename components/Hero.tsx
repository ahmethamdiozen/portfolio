"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  locale: string;
}

const ease = [0.33, 1, 0.68, 1] as const;

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations("hero");
  const name = t("name");

  return (
    <section className="min-h-[92vh] flex items-center justify-center bg-[#FAF9F6] px-6 relative overflow-hidden">
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Greeting */}
        <div className="overflow-hidden mb-3">
          <motion.p
            className="text-[#9B9589] text-lg tracking-wide"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            {t("greeting")}
          </motion.p>
        </div>

        {/* Name — char by char */}
        <h1 className="text-6xl md:text-8xl font-bold text-[#2C2C2C] mb-4 tracking-tight leading-none">
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

        {/* Title */}
        <div className="overflow-hidden mb-8">
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-[#8B7355]"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            {t("title")}
          </motion.h2>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-lg text-[#9B9589] max-w-xl mx-auto mb-12 leading-relaxed"
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
