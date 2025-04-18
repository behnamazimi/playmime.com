import { defaultLocale, locales } from "@/i18n/config";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales,
  defaultLocale,
  localeCookie: {
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365,
  },
});

export default routing;
