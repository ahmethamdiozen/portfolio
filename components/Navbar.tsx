"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const ease = [0.33, 1, 0.68, 1] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(250, 249, 246, 0.6)", "rgba(250, 249, 246, 0.95)"]
  );
  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(232, 228, 220, 0)", "rgba(232, 228, 220, 1)"]
  );

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const LocaleSwitcher = () => (
    <div className="flex items-center gap-1 border border-[#E8E4DC] rounded-lg p-1">
      {(["en", "tr"] as const).map((loc) => (
        <motion.button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors duration-200 ${
            locale === loc
              ? "bg-[#8B7355] text-white"
              : "text-[#9B9589] hover:text-[#2C2C2C]"
          }`}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {loc.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: navBg,
        borderBottom: useTransform(navBorder, (v) => `1px solid ${v}`),
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="group font-bold text-[#2C2C2C] tracking-tight relative text-sm sm:text-base"
        >
          <motion.span
            className="transition-colors duration-300 group-hover:text-[#8B7355] inline-block"
            whileHover={{ scale: 1.02 }}
          >
            Ahmet Hamdi Özen
          </motion.span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-7">
          <Link
            href={`/${locale}#projects`}
            className="group relative text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
          >
            {t("projects")}
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="group relative text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
          >
            {t("contact")}
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
          </Link>
          <LocaleSwitcher />
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-3">
          <LocaleSwitcher />
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center gap-1.5 p-1 w-6 h-6"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C] origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.3, ease }}
            />
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C]"
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C] origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.3, ease }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden border-t border-[#E8E4DC] bg-[#FAF9F6]/95 backdrop-blur-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3, ease }}
              >
                <Link
                  href={`/${locale}#projects`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
                >
                  {t("projects")}
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3, ease }}
              >
                <Link
                  href={`/${locale}#contact`}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
                >
                  {t("contact")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
