"use client";

import BaseButton from "@/components/shared/Button/BaseButton";
import { useCallback, useEffect, useState } from "react";
import { Word } from "@/types";
import { useTranslations } from "next-intl";
import { LOCALE_COOKIE_NAME } from "@/i18n/config";
import { useCookies } from "react-cookie";
import { getRandomWord } from "@/utils/indexedDb";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import PageTitle from "@/components/shared/PageTitle";
import { useHideLanguageSwitcherToggle } from "@/contexts/LanguageSwitcherContext";

export default function RandomWordPage() {
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("RandomWord");
  useHideLanguageSwitcherToggle();
  const [{ [LOCALE_COOKIE_NAME]: language }] = useCookies([LOCALE_COOKIE_NAME]);

  const getWord = useCallback(async () => {
    await getRandomWord(language)
      .then((word) => setWord(word))
      .finally(() => setLoading(false));
  }, [language]);

  useEffect(() => {
    getWord();
  }, [getWord]);

  return (
    <div className={`max-w-2xl mx-auto md:px-4 pt-8 pb-8 animate-fade-in`}>
      <PageTitle
        title={t("title")}
        subtitle={t("subtitle")}
        backlinkHref="/play"
      />

      <div className="space-y-8">
        <div
          className={`relative flex justify-center items-center p-2 py-12 w-full text-gray-500 h-40 rounded-sm bg-blue-50`}
        >
          <span className="absolute w-full p-2 flex items-center justify-center text-3xl font-semibold">
            {word?.word}
            {loading && "..."}
          </span>
        </div>

        <div className="flex justify-center gap-4">
          <BaseButton
            size="large"
            color="secondary"
            icon={<ArrowPathIcon />}
            onClick={getWord}
            className="justify-center"
            vibrateOnTap
          >
            {t("getNewWordButton")}
          </BaseButton>
        </div>
      </div>
    </div>
  );
}
