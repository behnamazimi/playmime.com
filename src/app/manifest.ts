import type { MetadataRoute } from "next";
import { THEME_COLOR } from "@/constants/app";
import { getTranslations } from "next-intl/server";
import { getUserLocale } from "@/i18n/utils";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({ namespace: "Metadata" });
  const locale = await getUserLocale();

  return {
    name: t("appName"),
    short_name: t("appName"),
    description: t("descriptionPwa"),
    id: "playmime-app",
    icons: [
      {
        src: "icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR,
    dir: "auto",
    start_url: "/pwa-landing-page",
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },
    prefer_related_applications: false,
    display: "standalone",
    orientation: "any",
    screenshots: [
      {
        src: `screenshots/${locale}/desktop-1.png`,
        sizes: "1148x800",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `screenshots/${locale}/desktop-2.png`,
        sizes: "1148x800",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `screenshots/${locale}/desktop-3.png`,
        sizes: "1148x800",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `screenshots/${locale}/desktop-4.png`,
        sizes: "1148x800",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `screenshots/${locale}/desktop-5.png`,
        sizes: "1148x800",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: `screenshots/${locale}/mobile-1.png`,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: `screenshots/${locale}/mobile-2.png`,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: `screenshots/${locale}/mobile-3.png`,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: `screenshots/${locale}/mobile-4.png`,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: `screenshots/${locale}/mobile-5.png`,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
      },
    ],
    categories: ["games"],
  };
}
