"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 60 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 60 });

  // Ring follows with lag
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const addHover = () => {
      const targets = document.querySelectorAll(
        "a, button, [data-cursor-hover]"
      );
      targets.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Wait for DOM
    const timer = setTimeout(addHover, 500);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovered ? 6 : 8,
            height: hovered ? 6 : 8,
            x: hovered ? -3 : -4,
            y: hovered ? -3 : -4,
            opacity: clicked ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: hovered ? 56 : 36,
            height: hovered ? 56 : 36,
            x: hovered ? -28 : -18,
            y: hovered ? -28 : -18,
            opacity: clicked ? 0.6 : 1,
            borderWidth: hovered ? 1.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </motion.div>
    </>
  );
}
