import Button from "@/components/common/Button";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

export const Hero = () => {
  const t = useTranslations("LandingPage.Hero");
  const effectAnimationClasses = "transform transition duration-200 ease-out";

  return (
    <section className="group py-16 flex flex-col items-center justify-center px-4 relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-linear-to-b opacity-75 from-purple-50 to-transparent z-0" />
      <span className="effect absolute w-full h-full left-0 top-0 overflow-hidden z-10">
        <span
          className={`absolute w-72 h-72 bg-orange-200 opacity-20 rounded-full -bottom-16 ltr:-left-8 rtl:-right-8 group-hover:scale-125 ${effectAnimationClasses}`}
        />
        <span
          className={`absolute w-64 h-64 bg-orange-200 opacity-30 rounded-full -bottom-36 ltr:-left-16 rtl:-right-16 group-hover:scale-90 ${effectAnimationClasses}`}
        />
        <span
          className={`absolute w-40 h-40 bg-orange-400 opacity-20 rounded-full -bottom-24 ltr:-left-16 rtl:-right-16 group-hover:scale-75 ${effectAnimationClasses}`}
        />
      </span>
      <div className="text-center max-w-3xl mx-auto space-y-6 z-20">
        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
          {t("tagline")}
        </span>

        <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight rtl:leading-snug">
          {t("heading")}
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("description")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="large" color={"primary"} as={Link} href={"/play"}>
            {t("buttons.start")}
          </Button>
          <Button
            variant="bordered"
            size="large"
            as={Link}
            href={"/how-to-play"}
          >
            {t("buttons.howToPlay")}
          </Button>
        </div>
      </div>
    </section>
  );
};
