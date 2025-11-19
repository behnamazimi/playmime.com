"use client";

import Button from "@/components/common/Button";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "@/i18n/routing/Link";

export const Hero = () => {
  const t = useTranslations("LandingPage.Hero");

  return (
    <section className="group py-24 md:py-32 flex flex-col items-center justify-center px-4 relative overflow-hidden min-h-[70vh]">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl -top-48 ltr:-left-48 rtl:-right-48 animate-orb-float"
          style={{ backgroundColor: "hsl(var(--primary) / 0.2)" }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl top-1/2 ltr:right-0 rtl:left-0 animate-orb-float"
          style={{
            backgroundColor: "hsl(var(--neon-magenta) / 0.2)",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl bottom-0 ltr:left-1/4 rtl:right-1/4 animate-orb-float"
          style={{
            backgroundColor: "hsl(var(--neon-blue) / 0.15)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, hsl(var(--neon-cyan) / 0.1) 25%, hsl(var(--neon-cyan) / 0.1) 26%, transparent 27%, transparent 74%, hsl(var(--neon-magenta) / 0.1) 75%, hsl(var(--neon-magenta) / 0.1) 76%, transparent 77%, transparent)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="text-center max-w-4xl mx-auto space-y-8 z-20 relative">
        {/* Tagline badge */}
        <div className="animate-stagger-fade-in stagger-1">
          <span className="inline-block px-4 py-2 text-sm font-semibold glass-dark border border-primary/50 text-primary rounded-full">
            {t("tagline")}
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight rtl:leading-snug animate-stagger-fade-in stagger-2">
          <span className="text-neon-cyan">{t("heading")}</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-stagger-fade-in stagger-3">
          {t("description")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-stagger-fade-in stagger-4">
          <Button
            size="large"
            color={"primary"}
            variant="fill"
            as={Link}
            href={"/play"}
          >
            {t("buttons.start")}
          </Button>
          <Button
            variant="bordered"
            size="large"
            color="primary"
            as={Link}
            href={"/how-to-play"}
          >
            {t("buttons.howToPlay")}
          </Button>
        </div>
      </div>

      {/* Decorative neon lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 z-10" />
    </section>
  );
};
