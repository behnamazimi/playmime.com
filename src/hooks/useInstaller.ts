"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const useInstaller = () => {
  const deferredEventRef = useRef<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault();
      deferredEventRef.current = e;
      if (isMounted.current) {
        setIsInstallable(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      isMounted.current = false; // Set it to false when the component unmounts
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const onInstall = useCallback(() => {
    if (deferredEventRef.current) {
      const e = deferredEventRef.current;
      if ("prompt" in e && typeof e.prompt === "function") {
        e.prompt();
      }
    }
  }, []);

  return {
    onInstall,
    isInstallable,
  };
};

export default useInstaller;
