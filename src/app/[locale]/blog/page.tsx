import { BLOG_ITEMS } from "@/constants/blog";
import { Locale, locales } from "@/i18n/config";
import Link from "@/i18n/routing/Link";
import { getBlogPageContent } from "@/utils/getPageContent";
import { getTranslations } from "next-intl/server";

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
  const t = (await getTranslations({
    locale: (await params).locale,
    namespace: "BlogPage",
  })) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

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
  const resolvedParams = await params;
  const t = (await getTranslations({
    locale: resolvedParams.locale,
    namespace: "BlogPage",
  })) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

  const contentList = await getAllContentMetadata(resolvedParams.locale);

  return (
    <main className="max-w-2xl mx-auto md:px-4 pt-8 pb-8 animate-fade-in">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="text-gray-600">{t("description")}</p>
      </div>

      <ul className="space-y-6 mt-8 list-none p-0">
        {contentList.map((content) => (
          <li key={content.slug} className="group">
            <Link
              href={`/blog/${content.slug}`}
              className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-labelledby={`title-${content.slug}`}
            >
              <h2
                id={`title-${content.slug}`}
                className="text-xl font-semibold mb-2 text-primary group-hover:underline"
              >
                {content.title}
              </h2>
              <p className="text-gray-600 mb-4">{content.description}</p>
              <div className="text-primary font-medium inline-flex items-center">
                <span>{t("readMore")}</span>
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}

        {contentList.length === 0 && (
          <div className="text-center py-12 text-gray-500" role="status">
            {t("noContentAvailable")}
          </div>
        )}
      </ul>
    </main>
  );
}
