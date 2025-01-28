import { useTranslations } from "next-intl";
import { FC } from "react";

const RemainingTime: FC<{ time: number }> = ({ time }) => {
  const t = useTranslations("play");
  return (
    <div className="pb-8 text-center">
      <h3 className="text-xl font-light">{t("shared.timeRemainingLabel")}</h3>
      <span className="text-2xl font-bold">
        {t("shared.timeRemainingValue", {
          time,
        })}
      </span>
    </div>
  );
};

export default RemainingTime;
