import {
  EyeSlashIcon,
  FireIcon,
  LightBulbIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import Link from "@/i18n/routing/Link";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const GameModes = () => {
  const t = useTranslations("LandingPage.GameModes");

  const modes = useMemo(
    () => [
      {
        title: t("quickPlay.title"),
        description: t("quickPlay.description"),
        icon: RocketLaunchIcon,
        iconBg: "bg-purple-300",
        border: "border-purple-100",
        bg: "bg-purple-50",
        link: "/play/quick-play/setup",
      },
      {
        title: t("oneWordPerTurn.title"),
        description: t("oneWordPerTurn.description"),
        icon: FireIcon,
        iconBg: "bg-orange-300",
        border: "border-orange-100",
        bg: "bg-orange-50",
        link: "/play/one-word-per-turn/setup",
      },
      {
        title: t("headsUp.title"),
        description: t("headsUp.description"),
        icon: EyeSlashIcon,
        iconBg: "bg-green-300",
        border: "border-green-100",
        bg: "bg-green-50",
        link: "/play/heads-up",
      },
      {
        title: t("randomWord.title"),
        description: t("randomWord.description"),
        icon: LightBulbIcon,
        iconBg: "bg-blue-300",
        border: "border-blue-100",
        bg: "bg-blue-50",
        link: "/play/random-word",
      },
    ],
    [t]
  );

  return (
    <section className="py-24 px-4 bg-white overflow-hidden rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("heading")}</h2>
          <p className="text-muted-foreground">{t("subheading")}</p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {modes.map((mode) => (
            <Link
              href={mode.link}
              key={mode.title}
              className={`cursor-pointer group p-6 rounded-2xl backdrop-blur-xs bg-accent/30 border-2 ${mode.bg} ${mode.border} transition duration-300`}
            >
              <div
                className={`w-12 h-12 ${mode.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-90 transition duration-300`}
              >
                <mode.icon className="w-6 h-6 text-primary group-hover:scale-150 transition duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
              <p className="text-muted-foreground">{mode.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
