import { Language } from "@/types";
import { locales } from "@/i18n/config";

const isValidLocale = (language: unknown): boolean => {
  return locales.includes(language as Language);
};

export default isValidLocale;
