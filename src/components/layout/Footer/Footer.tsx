import { version } from "../../../../package.json";
import SyncWords from "@/components/common/SyncWords";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";
import React from "react";

const Footer = () => {
  const tShared = useTranslations("shared");

  return (
    <footer className="relative text-center w-full max-w-2xl mx-auto py-8 mt-16">
      {/* Subtle neon accent border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <nav className="mt-6 flex justify-center text-sm gap-6 flex-wrap">
        <Link
          href="/about"
          className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
        >
          {tShared("about")}
        </Link>
        <Link
          href="/how-to-play"
          className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
        >
          {tShared("howToPlay")}
        </Link>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
        >
          {tShared("blog")}
        </Link>
        <a
          href="https://github.com/behnamazimi/playmime.com"
          target="_blank"
          className="text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
        >
          Github
        </a>
      </nav>

      <div className="flex items-center justify-center gap-2 mt-6">
        <p className="text-muted-foreground text-xs">
          {tShared.rich("copyright", {
            year: new Date().getFullYear(),
            author: (children: React.ReactNode) => (
              <a
                href="https://bhnmzm.com"
                target="_blank"
                className="hover:text-neon-cyan transition-colors duration-300"
              >
                {children}
              </a>
            ),
            version,
          })}
        </p>
        <SyncWords />
      </div>
    </footer>
  );
};

export default Footer;
