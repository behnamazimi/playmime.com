import {
  GlobeAltIcon,
  ClockIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

export const Features = () => {
  const t = useTranslations("LandingPage.Features");

  const features = useMemo(
    () => [
      {
        title: t("first.title"),
        description: t("first.description"),
        icon: GlobeAltIcon,
      },
      {
        title: t("second.title"),
        description: t("second.description"),
        icon: HeartIcon,
      },
      {
        title: t("third.title"),
        description: t("third.description"),
        icon: ClockIcon,
      },
    ],
    [t]
  );

  return (
    <section className="py-24 px-4 bg-accent/30 overflow-hidden rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("heading")}</h2>
          <p className="text-muted-foreground">{t("subheading")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white shadow-sm transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
