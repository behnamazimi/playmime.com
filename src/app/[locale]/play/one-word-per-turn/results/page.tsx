"use client";

import { useOneWordPerTurnGame } from "@/contexts/games/OneWordPerTurnGameContext";
import PageTitle from "@/components/common/PageTitle";
import ResultItem from "@/components/pages/play/components/ResultItem";
import BackToHomeCTA from "@/components/pages/play/components/BackToHomeCTA";
import { useTranslations } from "next-intl";
import redirect from "@/i18n/routing/redirect";

export default function OneWordPerTurnGameResults() {
  const t = useTranslations("play");

  const {
    state: { status, teams },
  } = useOneWordPerTurnGame();

  if (status !== "finalized") {
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto md:px-4 pt-2 pb-8 animate-fade-in">
      <PageTitle
        title={t("oneWordPerTurn.results.title")}
        subtitle={t("oneWordPerTurn.results.subtitle")}
        backlinkHref="/play"
      />
      <div className="space-y-4">
        {teams.map((team, index) => (
          <ResultItem
            key={team.teamId}
            name={t("shared.teamName", { team: team.teamId })}
            rank={index}
            score={team.score}
            finalScore={team.finalScore}
            correct={team.score}
            timeRemaining={team.timeRemaining}
          />
        ))}
        <BackToHomeCTA />
      </div>
    </div>
  );
}
