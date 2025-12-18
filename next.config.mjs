import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkFrontmatter from "remark-frontmatter";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withMDX = createMDX({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {},
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

// Combine the wrappers
export default withSentryConfig(
  withSerwist(withNextIntl(withMDX(nextConfig))),
  {
    org: "sureyoudoio",

    project: "pantomime-five",

    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN,

    silent: false, // Can be used to suppress logs
  }
);
