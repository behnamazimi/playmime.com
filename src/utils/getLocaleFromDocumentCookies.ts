import { LOCALE_COOKIE_NAME } from "@/i18n/config";
import { Cookies } from "react-cookie";

const getLocaleFromDocumentCookies = () => {
  const cookies = new Cookies(document ? document.cookie : null);
  return cookies.get(LOCALE_COOKIE_NAME);
};

export default getLocaleFromDocumentCookies;
