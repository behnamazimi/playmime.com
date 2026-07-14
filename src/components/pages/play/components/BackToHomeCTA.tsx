import Button from "@/components/common/Button";
import { useTranslations } from "next-intl";
import useRouter from "@/i18n/routing/useRouter";

const BackToHomeCTA = () => {
  const t = useTranslations("BackToHomeCTA");
  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <Button className="justify-center" onClick={() => router.push("/play")}>
        {t("text")}
      </Button>
    </div>
  );
};

export default BackToHomeCTA;
