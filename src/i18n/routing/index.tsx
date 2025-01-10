import { defaultLocale, locales } from "@/i18n/config";
import { defineRouting } from "next-intl/routing";

const routing = defineRouting({
  locales,
  defaultLocale,
});

export default routing;
