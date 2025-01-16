import type { Viewport } from "next";
import Providers from "@/app/[locale]/providers";
import React, { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { THEME_COLOR } from "@/constants/app";
import { getTranslations } from "next-intl/server";
import isValidLocale from "@/utils/isValidLocale";
import { notFound } from "next/navigation";
import { Locale, locales } from "@/i18n/config";
import LanguageSwitcherModal from "@/components/layout/Header/components/LanguageSwitcherModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Document from "@/components/layout/Document";
import InstallPromptIos from "@/components/layout/InstallPromptIos";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

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
  await setRequestLocale(locale);

  if (!isValidLocale(locale)) {
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
    <Document locale={locale as Locale}>
      <NextIntlClientProvider messages={messages}>
        <Providers cookies={cookiesObject}>
          <Header />
          <main>{children}</main>
          <Footer />
          <LanguageSwitcherModal />
          <InstallPromptIos />
        </Providers>
      </NextIntlClientProvider>
    </Document>
  );
}
