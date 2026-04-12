"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { saveHomeScroll } from "./ScrollRestorer";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  locale: string;
  github?: string;
  demo?: string;
}

export default function ProjectCard({
  slug,
  title,
  description,
  stack,
  locale,
  github,
  demo,
}: ProjectCardProps) {
  const t = useTranslations("projects");
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), {
    stiffness: 200,
    damping: 20,
  });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  // Spotlight gradient position
  const spotlightX = useTransform(mouseX, [0, 1], [0, 100]);
  const spotlightY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    scale.set(1);
    setHovered(false);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    setHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className="relative bg-[#F5F3EE] border border-[#E8E4DC] rounded-xl flex flex-col overflow-hidden cursor-pointer"
      data-cursor-hover
    >
      {/* Spotlight glow that follows cursor */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(139, 115, 85, 0.08) 0%, transparent 60%)`
          ),
        }}
      />

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl border border-[#8B7355] pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-[#8B7355] rounded-full"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      />

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <motion.h3
          className="text-lg sm:text-xl font-semibold text-[#2C2C2C] mb-3"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#9B9589] mb-5 leading-relaxed flex-1">{description}</p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
          {stack.slice(0, 4).map((tech, i) => (
            <motion.div
              key={tech}
              initial={false}
              animate={hovered ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.7 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            >
              <Badge
                variant="secondary"
                className="bg-[#E8E4DC] text-[#8B7355] text-xs border-0"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
          {stack.length > 4 && (
            <Badge variant="secondary" className="bg-[#E8E4DC] text-[#9B9589] text-xs border-0">
              +{stack.length - 4}
            </Badge>
          )}
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-4 pt-4 border-t border-[#E8E4DC]">
          <Link
            href={`/${locale}/projects/${slug}`}
            onClick={saveHomeScroll}
            className="group/link flex items-center gap-1 text-sm font-medium text-[#8B7355]"
          >
            {t("view_details")}
            <motion.span
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </Link>

          <div className="flex items-center gap-3 ml-auto">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-200 tracking-wide"
              >
                {t("github")} ↗
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-200 tracking-wide"
              >
                {t("demo")} ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
