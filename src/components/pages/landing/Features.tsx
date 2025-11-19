"use client";

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
        neonColor: "neon-cyan",
        stagger: "stagger-1",
      },
      {
        title: t("second.title"),
        description: t("second.description"),
        icon: HeartIcon,
        neonColor: "neon-magenta",
        stagger: "stagger-2",
      },
      {
        title: t("third.title"),
        description: t("third.description"),
        icon: ClockIcon,
        neonColor: "neon-blue",
        stagger: "stagger-3",
      },
    ],
    [t]
  );

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-stagger-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-neon-magenta">
            {t("heading")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("subheading")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-dark-strong p-8 rounded-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-stagger-fade-in group relative"
              style={{
                borderColor: `hsl(var(--${feature.neonColor}) / 0.3)`,
                ...(index === 0 && { animationDelay: "0.1s" }),
                ...(index === 1 && { animationDelay: "0.2s" }),
                ...(index === 2 && { animationDelay: "0.3s" }),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--${feature.neonColor}))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `hsl(var(--${feature.neonColor}) / 0.3)`;
              }}
            >
              <div
                className="w-16 h-16 glass-dark rounded-xl flex items-center justify-center mb-6 border transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `hsl(var(--${feature.neonColor}) / 0.3)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `hsl(var(--${feature.neonColor}))`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `hsl(var(--${feature.neonColor}) / 0.3)`;
                }}
              >
                <feature.icon
                  className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: `hsl(var(--${feature.neonColor}))` }}
                />
              </div>
              <h3
                className="text-2xl font-bold mb-3 transition-all duration-300"
                style={{ color: `hsl(var(--${feature.neonColor}))` }}
              >
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 30px hsl(var(--${feature.neonColor}) / 0.2), inset 0 0 30px hsl(var(--${feature.neonColor}) / 0.1)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
