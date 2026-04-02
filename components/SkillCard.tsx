"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import TechIcon from "./TechIcon";

interface SkillCardProps {
  name: string;
}

export default function SkillCard({ name }: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 600,
      }}
      className="group flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4DC] transition-shadow duration-300 cursor-default relative overflow-hidden"
      data-cursor-hover
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 30px rgba(139, 115, 85, 0.08), 0 4px 20px rgba(139, 115, 85, 0.1)"
            : "inset 0 0 0px transparent, 0 0px 0px transparent",
          borderColor: hovered ? "#8B7355" : "#E8E4DC",
        }}
        transition={{ duration: 0.3 }}
        style={{ border: "1px solid" }}
      />

      <motion.span
        className="text-[#2C2C2C] relative z-10"
        animate={{
          scale: hovered ? 1.2 : 1,
          y: hovered ? -2 : 0,
          color: hovered ? "#8B7355" : "#2C2C2C",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <TechIcon name={name} size={26} />
      </motion.span>
      <motion.span
        className="text-xs font-medium text-center relative z-10"
        animate={{
          color: hovered ? "#8B7355" : "#2C2C2C",
        }}
        transition={{ duration: 0.3 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
}
