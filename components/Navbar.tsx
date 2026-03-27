"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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
        >
          {loc.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-[#E8E4DC]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="group font-bold text-[#2C2C2C] tracking-tight relative text-sm sm:text-base"
        >
          <span className="transition-colors duration-300 group-hover:text-[#8B7355]">
            Ahmet Hamdi Özen
          </span>
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center gap-1.5 p-1 w-6 h-6"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C] origin-center"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C]"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#2C2C2C] origin-center"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden border-t border-[#E8E4DC] bg-[#FAF9F6] overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              <Link
                href={`/${locale}#projects`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
              >
                {t("projects")}
              </Link>
              <Link
                href={`/${locale}#contact`}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
              >
                {t("contact")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
