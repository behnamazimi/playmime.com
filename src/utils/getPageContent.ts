import { Locale } from "@/i18n/config";
import { MDXContent } from "mdx/types";

type PageContent<T> = {
  content: MDXContent;
  metadata: T;
};

export const getPageContent = async <T = { [key: string]: string }>(
  locale: Locale,
  slug: string
): Promise<PageContent<T>> => {
  try {
    const { default: content, frontmatter } = await import(
      `@/content/${locale}/${slug}.mdx`
    );
    return { content, metadata: frontmatter };
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error);
    throw new Error(`Content not found for slug: ${slug}`);
  }
};

export const getBlogPageContent = async <T = { [key: string]: string }>(
  locale: Locale,
  slug: string
): Promise<PageContent<T>> => {
  try {
    const { default: content, frontmatter } = await import(
      `@/content/${locale}/blog/${slug}.mdx`
    );
    return { content, metadata: frontmatter };
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    throw new Error(`Blog content not found for slug: ${slug}`);
  }
};
