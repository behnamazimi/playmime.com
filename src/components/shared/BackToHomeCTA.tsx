import Button from "@/components/shared/Button";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";

const BackToHomeCTA = () => {
  const t = useTranslations("BackToHomeCTA");
  return (
    <div className="flex justify-center items-center">
      <Button className="justify-center" onClick={() => redirect("/")}>
        {t("text")}
      </Button>
    </div>
  );
};

export default BackToHomeCTA;
