import { Locale, locales } from "@/i18n/config";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Generate alternates metadata for canonical URL and hreflang tags
 * @param locale - Current locale
 * @param path - Path without locale prefix (e.g., "/about", "/blog/my-post")
 */
export function getAlternates(locale: Locale, path: string = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathSuffix = normalizedPath === "/" ? "" : normalizedPath;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${baseUrl}/${loc}${pathSuffix}`;
  }

  return {
    canonical: `${baseUrl}/${locale}${pathSuffix}`,
    languages,
  };
}
