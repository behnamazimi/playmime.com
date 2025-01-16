"use client";

import { LOCALE_COOKIE_NAME, rtlLocales } from "@/i18n/config";
import { useCookies } from "react-cookie";

const useIsRtl = () => {
  const [{ [LOCALE_COOKIE_NAME]: locale }] = useCookies();

  if (typeof window === "undefined") {
    return rtlLocales.includes(locale);
  }

  return document.documentElement.dir === "rtl";
};

export default useIsRtl;
