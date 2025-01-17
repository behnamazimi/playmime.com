import { version } from "../../../../package.json";
import SyncWords from "@/components/common/SyncWords";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

const Footer = () => {
  const tShared = useTranslations("shared");

  return (
    <footer className="text-center w-full max-w-2xl mx-auto py-3">
      <nav className="mt-4 flex justify-center text-sm gap-4 text-gray-500">
        <Link href="/about" className="hover:underline">
          {tShared("about")}
        </Link>
        <Link href="/how-to-play" className="hover:underline">
          {tShared("howToPlay")}
        </Link>
        <a
          href="https://github.com/behnamazimi/playmime.com"
          target="_blank"
          className="hover:underline"
        >
          Github
        </a>
      </nav>

      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-400 text-xs">
          {tShared.rich("copyright", {
            year: new Date().getFullYear(),
            author: (children) => (
              <a
                href="https://bhnmzm.com"
                target="_blank"
                className="hover:underline"
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
