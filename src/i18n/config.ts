export const locales = ["en", "fa"] as const;
export const rtlLocales: Locale[] = ["fa"];
export type Locale = (typeof locales)[number];

export const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
export const defaultLocale: Locale = "en";
