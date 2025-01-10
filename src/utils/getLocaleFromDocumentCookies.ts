import { LOCALE_COOKIE_NAME } from "@/i18n/config";
import { Cookies } from "react-cookie";

const getLocaleFromDocumentCookies = () => {
  const cookies = new Cookies(document.cookie);
  return cookies.get(LOCALE_COOKIE_NAME);
};

export default getLocaleFromDocumentCookies;
