import { useTranslations } from "next-intl";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

function NonMobileMessage() {
  const t = useTranslations("play.shared.nonMobileMessage");
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <DevicePhoneMobileIcon className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-xl font-bold mb-2 text-foreground">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
    </div>
  );
}

export default NonMobileMessage;
