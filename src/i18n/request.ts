import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/i18n/utils";
import { hasLocale } from "next-intl";
import routing from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let requested = await requestLocale;

  if (!requested) {
    // The user is logged in
    requested = await getUserLocale();
  }

  // Ensure that the incoming locale is valid
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}.json`)).default,
  };
});
