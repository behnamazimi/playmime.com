import { Locale, locales } from "@/i18n/config";
import getPageContent from "@/utils/getPageContent";

const getAboutContent = (locale: Locale) => {
  return getPageContent(locale, "about");
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { metadata } = await getAboutContent((await params).locale);

  return {
    title: metadata.title,
    description: metadata.description,
  };
};

export const dynamicParams = false;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const {
    content: AboutContent,
    metadata: { title, description },
  } = await getAboutContent((await params).locale);

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-12 pb-8 animate-fade-in">
      <article className="prose prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base dark:prose-headings:text-white">
        <div className="mb-12">
          <h1>{title}</h1>
          <h3>{description}</h3>
        </div>

        <AboutContent />
      </article>
    </div>
  );
}
