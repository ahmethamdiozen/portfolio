import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
