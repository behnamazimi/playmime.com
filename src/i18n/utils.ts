"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale, LOCALE_COOKIE_NAME } from "@/i18n/config";
import isValidLocale from "@/utils/isValidLocale";

export async function getUserLocale() {
  const localCookie = (await cookies()).get(LOCALE_COOKIE_NAME)?.value;
  return isValidLocale(localCookie) ? localCookie : defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE_NAME, locale);
}
