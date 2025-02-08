"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Toast from "@/components/common/Toast";

const PROMPT_STORAGE_KEY = "install-prompt-ios";

const isIosDevice = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isInStandaloneMode = () =>
  "standalone" in window.navigator && window.navigator.standalone;

const InstallPromptIos = () => {
  const t = useTranslations("shared");
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const isShownBefore = localStorage.getItem(PROMPT_STORAGE_KEY);
    if (isIosDevice() && !isInStandaloneMode() && !isShownBefore) {
      setShowInstallMessage(true);
      localStorage.setItem(PROMPT_STORAGE_KEY, "true");
    }
  }, [showInstallMessage, setShowInstallMessage]);

  if (!showInstallMessage) return null;

  return (
    <Toast
      visible={showInstallMessage}
      onClose={() => {
        setShowInstallMessage(false);
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
