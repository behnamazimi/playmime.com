import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ alt, ...props }: ImageProps) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt={alt}
        {...props}
      />
    ),
  };
}
