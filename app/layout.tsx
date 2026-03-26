import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahmet Hamdiozen",
  description: "Full Stack & AI Engineer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
