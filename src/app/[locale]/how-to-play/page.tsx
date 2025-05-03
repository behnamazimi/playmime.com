import { Locale, locales } from "@/i18n/config";
import Button from "@/components/common/Button";
import Link from "@/i18n/routing/Link";
import getPageContent from "@/utils/getPageContent";
import BlogList from "@/components/common/BlogList";
import { getTranslations } from "next-intl/server";

const getHowToPlayContent = (locale: Locale) => {
  return getPageContent(locale, "how-to-play");
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { metadata } = await getHowToPlayContent((await params).locale);

  return {
    title: metadata.title,
    description: metadata.description,
  };
};

export const dynamicParams = false;

export default async function HowToPlayPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const t = await getTranslations("shared");
  const {
    content: HowToPlayContent,
    metadata: { title, description, startPlayingNowCTA },
  } = await getHowToPlayContent((await params).locale);

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-12 pb-8 animate-fade-in">
      <article className="prose prose-headings:mt-4 prose-headings:font-semibold prose-headings:text-black prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base dark:prose-headings:text-white">
        <div className="mb-12">
          <h1>{title}</h1>
          <h3>{description}</h3>
        </div>

        <HowToPlayContent />
      </article>

      <div className="mt-8 flex justify-center items-center">
        <Button as={Link} href="/play" color="primary">
          {startPlayingNowCTA}
        </Button>
      </div>

      <BlogList title={t("moreResources")} className="mt-12" />
    </div>
  );
}
