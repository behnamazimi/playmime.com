"use client";

import { defaultLocale, LOCALE_COOKIE_NAME } from "@/i18n/config";
import { useCookies } from "react-cookie";
import { useRouter as useNextRouter } from "next/navigation";

type NavigateOptions = {
  scroll?: boolean;
};

const useRouter: typeof useNextRouter = () => {
  const router = useNextRouter();
  const [{ [LOCALE_COOKIE_NAME]: currentLocale }] = useCookies([
    LOCALE_COOKIE_NAME,
  ]);

  const locale = currentLocale || defaultLocale;
  const pushWithLocale = (href: string, options?: NavigateOptions) => {
    const hrefWithLocale = `/${locale}${href}`;
    return router.push(hrefWithLocale, options);
  };

  const replaceWithLocale = (href: string, options?: NavigateOptions) => {
    const hrefWithLocale = `/${locale}${href}`;
    return router.replace(hrefWithLocale, options);
  };

  return {
    ...router,
    push: pushWithLocale,
    replace: replaceWithLocale,
  };
};

export default useRouter;
