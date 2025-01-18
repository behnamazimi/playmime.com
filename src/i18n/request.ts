import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/i18n/utils";
import { defaultLocale, Locale, locales } from "@/i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale) {
    // The user is logged in
    locale = await getUserLocale();
  }

  // Ensure that the incoming locale is valid
  if (!locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
