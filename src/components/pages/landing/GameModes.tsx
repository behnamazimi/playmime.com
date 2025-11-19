"use client";

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
        neonColor: "neon-cyan",
        borderColor: "border-neon-cyan",
        textColor: "text-neon-cyan",
        link: "/play/quick-play/setup",
        stagger: "stagger-1",
      },
      {
        title: t("oneWordPerTurn.title"),
        description: t("oneWordPerTurn.description"),
        icon: FireIcon,
        neonColor: "neon-magenta",
        borderColor: "border-neon-magenta",
        textColor: "text-neon-magenta",
        link: "/play/one-word-per-turn/setup",
        stagger: "stagger-2",
      },
      {
        title: t("headsUp.title"),
        description: t("headsUp.description"),
        icon: EyeSlashIcon,
        neonColor: "neon-green",
        borderColor: "border-neon-green",
        textColor: "text-neon-green",
        link: "/play/heads-up",
        stagger: "stagger-3",
      },
      {
        title: t("randomWord.title"),
        description: t("randomWord.description"),
        icon: LightBulbIcon,
        neonColor: "neon-blue",
        borderColor: "border-neon-blue",
        textColor: "text-neon-blue",
        link: "/play/random-word",
        stagger: "stagger-4",
      },
    ],
    [t]
  );

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-stagger-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-neon-cyan">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("subheading")}</p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {modes.map((mode, index) => (
            <Link
              href={mode.link}
              key={mode.title}
              className="cursor-pointer group glass-dark-strong p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-stagger-fade-in relative"
              style={{
                borderColor: `hsl(var(--${mode.neonColor}) / 0.5)`,
                ...(index === 0 && { animationDelay: "0.1s" }),
                ...(index === 1 && { animationDelay: "0.2s" }),
                ...(index === 2 && { animationDelay: "0.3s" }),
                ...(index === 3 && { animationDelay: "0.4s" }),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--${mode.neonColor}))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--${mode.neonColor}) / 0.5)`;
              }}
            >
              <div
                className="w-14 h-14 glass-dark rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border"
                style={{
                  borderColor: `hsl(var(--${mode.neonColor}) / 0.3)`,
                }}
              >
                <mode.icon
                  className="w-7 h-7 group-hover:scale-125 transition-transform duration-300"
                  style={{ color: `hsl(var(--${mode.neonColor}))` }}
                />
              </div>
              <h3
                className="text-xl font-bold mb-2 transition-all duration-300"
                style={{ color: `hsl(var(--${mode.neonColor}))` }}
              >
                {mode.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {mode.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 20px hsl(var(--${mode.neonColor}) / 0.3), inset 0 0 20px hsl(var(--${mode.neonColor}) / 0.1)`,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
