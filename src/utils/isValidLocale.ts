import { Language } from "@/types";
import { locales } from "@/i18n/config";

const isValidLocale = (locale: unknown): boolean => {
  return locales.includes(locale as Language);
};

export default isValidLocale;
