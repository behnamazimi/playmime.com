"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Button from "@/components/shared/Button";
import { usePathname } from "next/navigation";
import MainMenu from "@/components/Header/components/MainMenu";
import { useBacklinkHref } from "@/contexts/BacklinkHrefContext";
import { useTranslations } from "next-intl";
import useRouter from "@/i18n/routing/useRouter";
import { locales } from "@/i18n/config";

const Header = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  const { backlinkHref, isBacklinkHidden } = useBacklinkHref();
  const onBackClick = () => {
    router.push(backlinkHref);
  };

  const isHome = locales.map((locale) => `/${locale}`).includes(pathname);

  return (
    <header className="flex items-center w-full max-w-2xl mx-auto md:px-4 py-6">
      {(isBacklinkHidden || isHome) && (
        <div className="flex items-center gap-3">
          <Image
            src="/icons/icon-96x96.png"
            alt={t("Metadata.appName")}
            className="rounded-xl shadow-md"
            width={32}
            height={32}
          />
          <h1 className="text-2xl font-semibold">{t("Metadata.appName")}</h1>
        </div>
      )}

      {!isHome && !isBacklinkHidden && (
        <Button icon={<ChevronLeftIcon />} onClick={onBackClick}>
          {t("shared.backButton")}
        </Button>
      )}
      <div className="flex gap-4 items-center flex-1 justify-end">
        <MainMenu />
      </div>
    </header>
  );
};

export default Header;
