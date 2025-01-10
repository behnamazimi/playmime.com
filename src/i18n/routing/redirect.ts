import { defaultLocale } from "@/i18n/config";
import { redirect as nextRedirect } from "next/navigation";
import getLocaleFromDocumentCookies from "@/utils/getLocaleFromDocumentCookies";

const redirect: typeof nextRedirect = (
  url: string,
  type?: Parameters<typeof nextRedirect>[1]
) => {
  const currentLocale = getLocaleFromDocumentCookies();
  const locale = currentLocale || defaultLocale;
  const urlWithLocale = `/${locale}${url}`;
  return nextRedirect(urlWithLocale, type);
};

export default redirect;
