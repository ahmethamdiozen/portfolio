"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  as: Tag = "div",
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const props = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick,
    ...(href ? { href, target, rel } : {}),
    className: `relative inline-block cursor-pointer ${className}`,
    "data-cursor-hover": true,
  };

  return (
    <motion.div
      {...(props as React.ComponentProps<typeof motion.div>)}
      style={{ x, y }}
    >
      <motion.span
        className="block"
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
