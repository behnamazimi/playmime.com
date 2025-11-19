import { BLOG_ITEMS } from "@/constants/blog";
import { Locale, locales } from "@/i18n/config";
import Link from "@/i18n/routing/Link";
import { getBlogPageContent } from "@/utils/getPageContent";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

// Function to get content metadata for all valid slugs
const getAllContentMetadata = async (locale: Locale) => {
  const contentList = [];

  for (const slug of BLOG_ITEMS[locale]) {
    try {
      const content = await getBlogPageContent(locale, slug);
      contentList.push({
        slug,
        title: content.metadata.title,
        description: content.metadata.description,
      });
    } catch (error) {
      console.error(`Failed to load content for ${slug}:`, error);
    }
  }

  return contentList;
};

// Generate static params for locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata for the page
export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;
  await setRequestLocale(locale);
  const t = await getTranslations("BlogPage");

  return {
    title: t("title"),
    description: t("description"),
  };
};

export const dynamicParams = false;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  await setRequestLocale(locale);
  const t = await getTranslations("BlogPage");

  const contentList = await getAllContentMetadata(locale);

  return (
    <main className="max-w-3xl mx-auto md:px-4 pt-12 pb-16">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground text-neon-cyan">
          {t("title")}
        </h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Blog Posts List */}
      {contentList.length > 0 ? (
        <div className="space-y-4">
          {contentList.map((content) => (
            <Link
              key={content.slug}
              href={`/blog/${content.slug}`}
              className="group block glass-dark border border-primary/20 rounded-lg p-5 md:p-6 transition-all duration-300 hover:border-primary/50 hover:bg-card/50"
              aria-labelledby={`title-${content.slug}`}
            >
              <h2
                id={`title-${content.slug}`}
                className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
              >
                {content.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {content.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t("noContentAvailable")}</p>
        </div>
      )}
    </main>
  );
}
