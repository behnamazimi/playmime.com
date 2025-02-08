"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import useLocalStorage from "@/hooks/useLocalStorage";
import Toast from "@/components/common/Toast";

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
    <Toast
      visible={showInstallMessage === "visible"}
      onClose={() => {
        setShowInstallMessage("hidden");
      }}
    >
      {t.rich("installPromptIos", {
        bold: (children) => (
          <strong className="font-semibold">{children}</strong>
        ),
      })}
    </Toast>
  );
};

export default InstallPromptIos;
