"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative text-sm text-[#9B9589] hover:text-[#2C2C2C] transition-colors duration-300"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

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
          className="group font-bold text-[#2C2C2C] tracking-tight relative"
        >
          <span className="transition-colors duration-300 group-hover:text-[#8B7355]">
            Ahmet Hamdi Özen
          </span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#8B7355] transition-all duration-300 group-hover:w-full" />
        </Link>

        <div className="flex items-center gap-7">
          <NavLink href={`/${locale}#projects`}>{t("projects")}</NavLink>
          <NavLink href={`/${locale}#contact`}>{t("contact")}</NavLink>

          {/* Locale switcher */}
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
        </div>
      </div>
    </motion.nav>
  );
}
