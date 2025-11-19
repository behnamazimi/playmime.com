import { Locale, locales } from "@/i18n/config";
import { getPageContent } from "@/utils/getPageContent";

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
  const { locale } = await params;
  const { metadata } = await getAboutContent(locale);

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
  const { locale } = await params;
  const {
    content: AboutContent,
    metadata: { title, description },
  } = await getAboutContent(locale);

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-12 pb-8 animate-fade-in">
      <article className="prose prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-foreground prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-foreground prose-pre:bg-card prose-blockquote:text-muted-foreground prose-li:text-foreground prose-ul:text-foreground prose-ol:text-foreground">
        <div className="mb-12">
          <h1>{title}</h1>
          <h3 className="text-muted-foreground">{description}</h3>
        </div>

        <AboutContent />
      </article>
    </div>
  );
}
