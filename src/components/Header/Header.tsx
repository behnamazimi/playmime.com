"use client";

import Image from "next/image";
import MainMenu from "@/components/Header/components/MainMenu";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

const Header = () => {
  const t = useTranslations();

  return (
    <header className="flex items-center w-full max-w-2xl mx-auto md:px-4 py-6">
      <Link className="flex items-center gap-3" href={"/"}>
        <Image
          src="/icons/icon-96x96.png"
          alt={t("Metadata.appName")}
          className="rounded-xl shadow-md"
          width={32}
          height={32}
        />
        <h1 className="text-2xl font-semibold">{t("Metadata.appName")}</h1>
      </Link>
      <div className="flex gap-4 items-center flex-1 justify-end">
        <MainMenu />
      </div>
    </header>
  );
};

export default Header;
