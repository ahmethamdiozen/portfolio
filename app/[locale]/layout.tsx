import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmet Hamdi Özen — Full Stack & AI Engineer",
  description:
    "Personal portfolio of Ahmet Hamdi Özen, a Full Stack & AI Engineer building intelligent web applications.",
};

const locales = ["en", "tr"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
      >
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <CustomCursor />
            <Navbar />
            <main>{children}</main>
            <footer className="border-t border-[#E8E4DC] py-10 bg-[#FAF9F6]">
              <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-bold text-[#2C2C2C]">
                  Ahmet Hamdi Özen
                </span>
                <span className="text-sm text-[#9B9589]">
                  © {new Date().getFullYear()} — Built with Next.js & Tailwind
                  CSS
                </span>
              </div>
            </footer>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
