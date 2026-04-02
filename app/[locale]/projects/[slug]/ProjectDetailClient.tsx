"use client";

import { motion } from "framer-motion";

const ease = [0.33, 1, 0.68, 1] as const;

export default function ProjectDetailClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {children}
    </motion.div>
  );
}
