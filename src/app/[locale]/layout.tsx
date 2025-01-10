import type { Viewport } from "next";
import Providers from "@/app/[locale]/providers";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import { THEME_COLOR } from "@/constants/app";
import { getTranslations } from "next-intl/server";
import Document from "@/components/shared/Document/Document";
import isValidLocale from "@/utils/isValidLocale";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const t = await getTranslations({ namespace: "Metadata" });

  return {
    applicationName: t("appName"),
    title: {
      default: t("defaultTitle"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("defaultTitle"),
      // startUpImage: [],
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: t("appName"),
      title: {
        default: t("defaultTitle"),
        template: t("titleTemplate"),
      },
      description: t("description"),
    },
    twitter: {
      card: "summary",
      title: {
        default: t("defaultTitle"),
        template: t("titleTemplate"),
      },
      description: t("description"),
    },
  };
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (isValidLocale(locale)) {
    await setRequestLocale(locale);
  } else {
    notFound();
  }

  const messages = await getMessages();

  const cookiesObject = (await cookies()).getAll().reduce(
    (acc, { name, value }) => {
      acc[name] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <Document locale={locale}>
      <NextIntlClientProvider messages={messages}>
        <Providers cookies={cookiesObject}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </NextIntlClientProvider>
    </Document>
  );
}
