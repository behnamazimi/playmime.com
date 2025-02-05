import { useTranslations } from "next-intl";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline";

function RotateDeviceBanner() {
  const t = useTranslations("play.headsUp.play");
  return (
    <div className="flex justify-center space-x-6 p-4 text-sm text-gray-500">
      <span className="inline-flex justify-center items-center ltr:mr-2 rtl:ml-2 animate-rotate-90">
        <DevicePhoneMobileIcon className="h-6 w-6 text-gray-500 rotate-90" />
      </span>
      {t("rotateDevice")}
    </div>
  );
}

export default RotateDeviceBanner;
