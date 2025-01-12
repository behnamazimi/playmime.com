import { useTranslations } from "next-intl";
import {
  FireIcon,
  LightBulbIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import GameCard from "@/components/pages/play/components/GameCard";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-12 pb-8 animate-fade-in">
      <div className="mb-12">
        <h2 className="text-4xl mb-2 font-light">{t(`title`)}</h2>
        <h2 className="text-4xl font-bold">{t("subtitle")}</h2>
      </div>

      <div className="space-y-4">
        <GameCard
          href="/play/quick-play/setup"
          icon={<RocketLaunchIcon className={"stroke-1 w-full h-full"} />}
          title={t("cards.quickPlay.title")}
          description={t("cards.quickPlay.description")}
          color="purple"
        />
        <GameCard
          href={"/play/one-word-per-turn/setup"}
          icon={<FireIcon className={"stroke-1 w-full h-full"} />}
          title={t("cards.oneWordPerTurn.title")}
          description={t("cards.oneWordPerTurn.description")}
          color="orange"
        />
        <GameCard
          href={"/play/random-word"}
          icon={<LightBulbIcon className={"stroke-1 w-full h-full"} />}
          title={t("cards.randomWord.title")}
          description={t("cards.randomWord.description")}
          color="blue"
        />
      </div>
    </div>
  );
}
