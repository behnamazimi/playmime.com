"use client";

import React, { useEffect } from "react";
import Button from "@/components/common/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";

type Visibility = "none" | "visible" | "hidden";

const PROMPT_STORAGE_KEY = "install-prompt-ios";

const isIosDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

const InstallPromptIos = () => {
  const t = useTranslations("shared");
  const [showInstallMessage, setShowInstallMessage] =
    useLocalStorage<Visibility>(PROMPT_STORAGE_KEY, "none");

  useEffect(() => {
    if (
      isIosDevice() &&
      !isInStandaloneMode() &&
      showInstallMessage !== "hidden"
    ) {
      setShowInstallMessage("visible");
    }
  }, [showInstallMessage, setShowInstallMessage]);

  if (showInstallMessage !== "visible") return null;

  return (
    <div
      className="fixed bottom-4 ltr:left-1/2 ltr:right-0 rtl:right-1/2 rtl:left-0 w-10/12 mx-auto bg-white shadow-md rounded-lg p-4 transform ltr:-translate-x-1/2 rtl:translate-x-1/2 transition-all duration-300 ease-in-out"
      role="dialog"
      aria-live="polite"
      aria-labelledby="install-prompt-title"
    >
      <div className="flex gap-4 items-center">
        <p
          id="install-prompt-title"
          className="text-gray-800 text-sm flex-grow"
        >
          {t.rich("installPromptIos", {
            bold: (children) => (
              <strong className="font-semibold">{children}</strong>
            ),
          })}
        </p>
        <Button
          onClick={() => {
            setShowInstallMessage("hidden");
          }}
          icon={<XMarkIcon />}
          aria-label="Close installation prompt"
        />
      </div>
    </div>
  );
};

export default InstallPromptIos;
