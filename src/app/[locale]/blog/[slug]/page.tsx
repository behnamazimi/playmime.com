import { Locale, locales } from "@/i18n/config";
import Button from "@/components/common/Button";
import Link from "@/i18n/routing/Link";
import { getBlogPageContent } from "@/utils/getPageContent";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { BLOG_ITEMS } from "@/constants/blog";
import BlogList from "@/components/common/BlogList";

// Function to get content based on locale and slug
const getContentBySlug = async (locale: Locale, slug: string) => {
  if (!BLOG_ITEMS[locale].includes(slug)) {
    return null;
  }

  try {
    return await getBlogPageContent(locale, slug);
  } catch (error) {
    console.error(`Failed to load content for ${slug}:`, error);
    return null;
  }
};

// Generate all possible static paths for this dynamic route
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    BLOG_ITEMS[locale].map((slug) => ({
      locale,
      slug,
    }))
  );
}

// Generate metadata for each page
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) => {
  const { locale, slug } = await params;
  const content = await getContentBySlug(locale, slug);

  if (!content) {
    return {
      title: "Not Found",
      description: "The requested content was not found",
    };
  }

  return {
    title: content.metadata.title,
    description: content.metadata.description,
  };
};

// Disable dynamic parameters - only serve pre-built static content
export const dynamicParams = false;

// The page component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("shared");
  const content = await getContentBySlug(locale, slug);

  if (!content) {
    notFound();
  }

  const {
    content: PageContent,
    metadata: { title, description, cta },
  } = content;

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-12 pb-8 animate-fade-in">
      <article className="prose prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base dark:prose-headings:text-white">
        <div className="mb-12 border-b-1 pb-4">
          <h1>{title}</h1>
          <h3>{description}</h3>
        </div>

        <PageContent />
      </article>

      {cta && (
        <div className="mt-8 flex justify-center items-center">
          <Button as={Link} href="/play" color="primary">
            {cta}
          </Button>
        </div>
      )}

      <BlogList
        title={t("moreResources")}
        excludeSlug={slug}
        className="mt-12"
      />
    </div>
  );
}
