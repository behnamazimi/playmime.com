import { Locale } from "@/i18n/config";
import { MDXContent } from "mdx/types";

const getPageContent = async <Metadata = { [key: string]: string }>(
  locale: Locale,
  slug: string
): Promise<{
  content: MDXContent;
  metadata: Metadata;
}> => {
  const { default: content, frontmatter } = await import(
    `@/content/${locale}/${slug}.mdx`
  );

  return {
    content,
    metadata: frontmatter,
  };
};

export default getPageContent;
