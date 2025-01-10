"use client";

import useInstaller from "@/hooks/useInstaller";
import useIsOnline from "@/hooks/useIsOnline";
import Button from "@/components/shared/Button";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function InstallAppCTA({ className }: { className?: string }) {
  const t = useTranslations("shared");
  const { isOnline } = useIsOnline();

  const { onInstall, isInstallable } = useInstaller();

  return (
    isInstallable &&
    isOnline && (
      <Button
        icon={<ArrowDownOnSquareIcon />}
        onClick={onInstall}
        className={className}
      >
        {t("installNow")}
      </Button>
    )
  );
}
