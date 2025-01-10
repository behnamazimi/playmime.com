"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { syncWordBank } from "@/utils/syncManager";
import useIsOnline from "@/hooks/useIsOnline";
import { useCookies } from "react-cookie";
import { LOCALE_COOKIE_NAME } from "@/i18n/config";
import { RecentSyncDetails } from "@/types";
import {
  clearAllDataByLanguage,
  getRecentSyncDetails,
  getWordsByLanguage,
} from "@/utils/indexedDb";
import Button from "@/components/shared/Button";
import {
  ArrowPathIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { useFormatter, useTranslations } from "next-intl";
import isValidLocale from "@/utils/isValidLocale";

const SyncWords = () => {
  const t = useTranslations("SyncWords");
  const tLanguageSwitcher = useTranslations("LanguageSwitcher");
  const { isOnline } = useIsOnline();
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastSync, setLastSync] = useState<RecentSyncDetails | null>(null);
  const [wordsCount, setWordsCount] = useState(0);
  const [{ [LOCALE_COOKIE_NAME]: language }] = useCookies([LOCALE_COOKIE_NAME]);
  const syncInProgressRef = useRef(false);
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const format = useFormatter();

  const updateState = useCallback(() => {
    if (isValidLocale(language)) {
      Promise.all([
        getRecentSyncDetails(language),
        getWordsByLanguage(language),
      ])
        .then(([lastSync, words]) => {
          setLastSync(lastSync);
          setWordsCount(words.length);
        })
        .finally(() => setIsSyncing(false));
    }
  }, [language]);

  useEffect(() => {
    if (language) {
      if (!syncInProgressRef.current && isOnline) {
        syncInProgressRef.current = true;

        const controller = new AbortController();
        abortControllerRef.current = controller;

        syncWordBank(language, controller.signal).then(() => {
          syncInProgressRef.current = false;
          updateState();
        });
      } else {
        updateState();
      }
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isOnline, language, updateState]);

  const onReSync = useCallback(async () => {
    // Abort any ongoing sync
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSyncing(true);
    await clearAllDataByLanguage(language);
    syncWordBank(language, controller.signal).finally(() => {
      setIsSyncing(false);
      updateState();
    });
  }, [language, updateState]);

  const isRTL = language === "fa";

  return (
    <div className={"relative"}>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            icon={<InformationCircleIcon />}
            loading={isSyncing}
            variant="ghost"
          />
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

          <Dialog.Positioner className="fixed inset-0 flex items-center justify-center z-50">
            <Dialog.Content className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
              <Dialog.Title
                className="text-lg font-semibold text-gray-800"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {t("title")}
              </Dialog.Title>

              <Dialog.Description
                className="text-sm text-gray-600"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <ul className="space-y-2">
                  <li>
                    <strong>{t("lastSync")}:</strong>{" "}
                    <span>
                      {lastSync?.timestamp
                        ? format.relativeTime(lastSync.timestamp)
                        : "N/A"}
                    </span>
                  </li>
                  <li>
                    <strong>{t("language")}:</strong>{" "}
                    {language && lastSync ? (
                      <span>
                        {tLanguageSwitcher(language)} {lastSync.lastVersion} - (
                        {lastSync.dataStructureVersion})
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </li>
                  <li>
                    <strong>{t("status")}:</strong>{" "}
                    {lastSync?.succeeded ? (
                      <span className="text-green-500">{t("successful")}</span>
                    ) : (
                      <span className="text-red-500">{t("failed")}</span>
                    )}
                  </li>
                  <li>
                    <strong>{t("wordsInBank")}:</strong> {wordsCount || "N/A"}
                  </li>
                </ul>
              </Dialog.Description>

              <div className="flex items-center ltr:justify-end rtl:justify-start mt-4 gap-4">
                <Dialog.CloseTrigger asChild>
                  <Button>{t("close")}</Button>
                </Dialog.CloseTrigger>
                {isOnline && !lastSync?.succeeded && (
                  <Button
                    icon={<ArrowPathIcon />}
                    onClick={onReSync}
                    disabled={isSyncing}
                    color="primary"
                    loading={isSyncing}
                  >
                    {t("syncAgainButton")}
                  </Button>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

export default SyncWords;
