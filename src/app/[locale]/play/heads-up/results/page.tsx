"use client";

import PageTitle from "@/components/common/PageTitle";
import ResultItem from "@/components/pages/play/components/ResultItem";
import BackToHomeCTA from "@/components/pages/play/components/BackToHomeCTA";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";
import { useHeadsUpGame } from "@/contexts/games/HeadsUpGameContext";

export default function HeadsUpGameResults() {
  const t = useTranslations("play");
  const {
    state: { status, players },
  } = useHeadsUpGame();

  if (status !== "finalized") {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in">
      <PageTitle
        title={t("headsUp.results.title")}
        subtitle={t("headsUp.results.subtitle")}
        backlinkHref="/play"
      />
      <div className="space-y-4">
        {players.map((player, index) => (
          <ResultItem
            key={player.playerId}
            name={t("shared.playerName", { player: player.playerId })}
            rank={index}
            score={player.score}
            quickPlayResult
          />
        ))}
        <BackToHomeCTA />
      </div>
    </div>
  );
}
