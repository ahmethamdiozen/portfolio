"use client";

import { useEffect } from "react";
import { useLenis } from "./SmoothScrollProvider";

const SCROLL_KEY = "home-scroll-y";

/** Call this before navigating away from home to save scroll position */
export function saveHomeScroll() {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
}

/** Mount this on the home page — restores saved scroll position after back navigation */
export function ScrollRestorer() {
  const lenis = useLenis();

  useEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (!saved) return;

    sessionStorage.removeItem(SCROLL_KEY);
    const y = parseInt(saved, 10);
    if (!y) return;

    // Wait for Lenis to be ready, then restore
    const restore = () => {
      if (lenis) {
        lenis.scrollTo(y, { immediate: true });
      } else {
        window.scrollTo(0, y);
      }
    };

    // Two rAF frames ensure layout is complete
    requestAnimationFrame(() => requestAnimationFrame(restore));
  }, [lenis]);

  return null;
}
