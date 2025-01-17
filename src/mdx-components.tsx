import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Button from "@/components/common/Button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        {...(props as ImageProps)}
      />
    ),

    button: ({ children, ...props }) => <Button {...props}>{children}</Button>,
  };
}
