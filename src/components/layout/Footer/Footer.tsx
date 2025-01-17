import { version } from "../../../../package.json";
import SyncWords from "@/components/common/SyncWords";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

const Footer = () => {
  const t = useTranslations("Metadata");
  const tShared = useTranslations("shared");

  return (
    <footer className="text-center w-full max-w-2xl mx-auto py-3">
      <nav className="my-4 flex justify-center space-x-4 text-sm">
        <Link href="/about">{tShared("about")}</Link>
        <Link href="/how-to-play">{tShared("howToPlay")}</Link>
        <a href="https://github.com/behnamazimi/playmime.com" target="_blank">
          Github
        </a>
      </nav>

      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {t("appName")}. v{version}
        </p>
        <SyncWords />
      </div>
    </footer>
  );
};

export default Footer;
