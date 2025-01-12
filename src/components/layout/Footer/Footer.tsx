import { version } from "../../../../package.json";
import SyncWords from "@/components/common/SyncWords";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Metadata");
  return (
    <footer className="text-center w-full max-w-2xl mx-auto py-3">
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
