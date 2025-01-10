"use client";

import BaseButton from "@/components/shared/Button/BaseButton";
import { setUserLocale } from "@/i18n/utils";
import { Locale, locales } from "@/i18n/config";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useBacklinkHref } from "@/contexts/BacklinkHrefContext";
import useRouter from "@/i18n/routing/useRouter";

export default function LanguageSwitcher() {
  useBacklinkHref({ backlinkHref: "/" });

  const t = useTranslations("LanguageSwitcher");
  const [lngBtnClicked, setLngBtnClicked] = useState(false);

  const router = useRouter();

  const onLanguageSelect = (locale: Locale) => {
    setLngBtnClicked(true);
    setUserLocale(locale);
    // intentionally delay the redirection to avoid flickering
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <div
      className={`max-w-2xl mx-auto md:px-4 pt-12 pb-8 transition-opacity ${lngBtnClicked ? "opacity-0" : ""}`}
    >
      <div className="mb-12">
        <h2 className="text-5xl mb-2 font-light">{t("title")}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {locales.map((locale) => (
          <BaseButton
            key={locale}
            variant={"ghost"}
            size={"large"}
            className="flex items-center justify-center h-32 w-full bg-gray-100 rounded-md font-bold text-xl"
            onClick={() => {
              onLanguageSelect(locale);
            }}
            vibrateOnTap
          >
            {t(locale)}
          </BaseButton>
        ))}
      </div>
    </div>
  );
}
