import withSerwistInit from "@serwist/next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-mdx-frontmatter"],
    rehypePlugins: [],
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {},
};

export default withSerwist(withNextIntl(withMDX(nextConfig)));
