"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";
import MainMenu from "./components/MainMenu";

const Header = () => {
  const t = useTranslations();

  return (
    <header className="relative flex items-center w-full max-w-2xl mx-auto md:px-4 py-6 z-50">
      {/* Subtle neon accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Link className="flex items-center gap-3 group" href={"/"}>
        <div className="relative">
          <Image
            src="/icons/icon-96x96.png"
            alt={t("Metadata.appName")}
            className="rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300"
            width={32}
            height={32}
          />
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: `0 0 15px hsl(var(--neon-cyan) / 0.5)`,
            }}
          />
        </div>
        <h1 className="text-2xl font-bold text-foreground group-hover:text-neon-cyan transition-colors duration-300">
          {t("Metadata.appName")}
        </h1>
      </Link>
      <div className="flex gap-4 items-center flex-1 justify-end">
        <MainMenu />
      </div>
    </header>
  );
};

export default Header;
